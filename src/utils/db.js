/* ============================================
   LANGY — DATABASE (IndexedDB)
   Local persistence · Auth · Progress · Textbooks
   ============================================ */

const LangyDB = {
    DB_NAME: 'LangyDB',
    DB_VERSION: 1,
    db: null,
    currentUser: null,
    autoSaveInterval: null,

    /* ========== INITIALISATION ========== */

    init() {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                console.warn('IndexedDB not supported');
                return resolve();
            }

            const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

            request.onupgradeneeded = e => {
                const db = e.target.result;

                if (!db.objectStoreNames.contains('users')) {
                    db.createObjectStore('users', { keyPath: 'email' });
                }
                if (!db.objectStoreNames.contains('progress')) {
                    db.createObjectStore('progress', { keyPath: 'email' });
                }
                if (!db.objectStoreNames.contains('textbooks')) {
                    const tbStore = db.createObjectStore('textbooks', {
                        keyPath: 'id',
                        autoIncrement: true,
                    });
                    tbStore.createIndex('userEmail', 'userEmail', { unique: false });
                    tbStore.createIndex('level', 'level', { unique: false });
                }
                if (!db.objectStoreNames.contains('session')) {
                    db.createObjectStore('session', { keyPath: 'key' });
                }
            };

            request.onsuccess = e => {
                this.db = e.target.result;
                resolve();
            };

            request.onerror = e => {
                console.error('IndexedDB error:', e.target.error);
                reject(e.target.error);
            };
        });
    },

    /* ========== IDB HELPER ========== */

    _req(storeName, mode, fn) {
        return new Promise((resolve, reject) => {
            try {
                const tx = this.db.transaction(storeName, mode);
                const store = tx.objectStore(storeName);
                const request = fn(store);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            } catch (e) {
                reject(e);
            }
        });
    },

    /* ========== PASSWORD HASHING ========== */

    _randomSalt(bytes = 16) {
        if (window.crypto?.getRandomValues) {
            const arr = new Uint8Array(bytes);
            window.crypto.getRandomValues(arr);
            return Array.from(arr)
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }
        return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
    },

    async hashPassword(password, salt) {
        const userSalt = salt || '_legacy_langy_salt_2026';

        // PBKDF2 (preferred)
        if (window.crypto?.subtle) {
            try {
                const enc = new TextEncoder();
                const keyMaterial = await window.crypto.subtle.importKey(
                    'raw',
                    enc.encode(password),
                    { name: 'PBKDF2' },
                    false,
                    ['deriveBits']
                );
                const bits = await window.crypto.subtle.deriveBits(
                    {
                        name: 'PBKDF2',
                        hash: 'SHA-256',
                        salt: enc.encode(userSalt),
                        iterations: 150000,
                    },
                    keyMaterial,
                    256
                );
                return Array.from(new Uint8Array(bits))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
            } catch (e) {
                /* fallback below */
            }
        }

        // Fallback for limited environments
        const salted = `${password}::${userSalt}`;
        let hash = 0;
        for (let i = 0; i < salted.length; i++) {
            hash = (hash << 5) - hash + salted.charCodeAt(i);
            hash |= 0;
        }
        return 'fb_' + Math.abs(hash).toString(36);
    },

    /* ========== AUTHENTICATION ========== */

    async register(name, email, password) {
        if (!this.db) throw new Error('База данных недоступна');

        const existing = await this._req('users', 'readonly', s => s.get(email));
        if (existing) throw new Error('Этот email уже зарегистрирован');

        if (!name || !name.trim()) throw new Error('Введите имя');
        if (!email || !email.trim()) throw new Error('Введите email');
        if (!password || password.length < 6) throw new Error('Пароль — минимум 6 символов');

        const passwordSalt = this._randomSalt();
        const passwordHash = await this.hashPassword(password, passwordSalt);
        const user = {
            email: email.trim().toLowerCase(),
            name: name.trim(),
            passwordHash,
            passwordSalt,
            avatar: null,
            hasCompletedPlacement: false,
            level: 'Testing...',
            joinDate: new Date().toISOString().split('T')[0],
        };

        await this._req('users', 'readwrite', s => s.put(user));

        // Create initial progress from defaults
        const defaults = getDefaultState();
        defaults.user.name = user.name;
        defaults.user.email = user.email;
        defaults.user.joinDate = user.joinDate;
        defaults.user.level = 'Pending Test';
        defaults.user.hasCompletedPlacement = false;

        // Zero out initial progress for new users
        defaults.progress.overall = 0;
        defaults.progress.topicsCompleted = 0;
        defaults.progress.currentUnitId = 1;
        defaults.progress.currentLessonIdx = 0;
        defaults.progress.skipsRemaining = 2;
        defaults.progress.lessonHistory = [];
        Object.keys(defaults.progress.skills).forEach(s => (defaults.progress.skills[s] = 0));
        defaults.progress.recentTopics = [];
        defaults.tests = { listening: [], speaking: [], reading: [], grammar: [] };

        await this._req('progress', 'readwrite', s =>
            s.put({
                email: user.email,
                data: defaults,
                savedAt: Date.now(),
            })
        );

        await this._setSession(user.email);
        this.currentUser = user;
        loadFromSnapshot(defaults);

        return user;
    },

    async login(email, password) {
        if (!this.db) throw new Error('База данных недоступна');
        if (!email) throw new Error('Введите email');
        if (!password) throw new Error('Введите пароль');

        const cleanEmail = email.trim().toLowerCase();
        const user = await this._req('users', 'readonly', s => s.get(cleanEmail));
        if (!user) throw new Error('Пользователь не найден');

        const passwordHash = await this.hashPassword(password, user.passwordSalt);

        // Legacy compatibility: users created before per-user salt migration
        if (user.passwordHash !== passwordHash) {
            const legacyHash = await this.hashPassword(password, '_langy_salt_2026');
            if (user.passwordHash !== legacyHash) throw new Error('Неверный пароль');

            // Transparent migration to per-user salt
            const nextSalt = this._randomSalt();
            const nextHash = await this.hashPassword(password, nextSalt);
            user.passwordSalt = nextSalt;
            user.passwordHash = nextHash;
            await this._req('users', 'readwrite', s => s.put(user));
        }

        await this._setSession(cleanEmail);
        this.currentUser = user;
        await this.loadProgress(cleanEmail);

        return user;
    },

    async logout() {
        try {
            await this.saveProgress();
        } catch (e) {
            /* ok */
        }
        await this._clearSession();
        this.currentUser = null;
        this.stopAutoSave();
        resetState();
    },

    async getCurrentUser() {
        if (!this.db) return null;
        try {
            const session = await this._req('session', 'readonly', s => s.get('current'));
            if (!session) return null;
            return await this._req('users', 'readonly', s => s.get(session.email));
        } catch (e) {
            return null;
        }
    },

    async _setSession(email) {
        await this._req('session', 'readwrite', s => s.put({ key: 'current', email }));
    },

    async _clearSession() {
        try {
            await this._req('session', 'readwrite', s => s.delete('current'));
        } catch (e) {
            /* ok */
        }
    },

    /* ========== PROGRESS SYNC ========== */

    async saveProgress() {
        if (!this.currentUser || !this.db) return;
        const snapshot = getStateSnapshot();
        await this._req('progress', 'readwrite', s =>
            s.put({
                email: this.currentUser.email,
                data: snapshot,
                savedAt: Date.now(),
            })
        );
    },

    async loadProgress(email) {
        const record = await this._req('progress', 'readonly', s => s.get(email));
        if (record && record.data) {
            loadFromSnapshot(record.data);
        }
    },

    /* ========== TEXTBOOKS ========== */

    async addTextbook(metadata, file) {
        if (!this.currentUser) throw new Error('Необходима авторизация');

        let extractedText = '';
        if (file) {
            try {
                extractedText = await this.extractText(file, metadata.format);
            } catch (e) {
                console.warn('Text extraction failed:', e);
            }
        }

        const record = {
            ...metadata,
            userEmail: this.currentUser.email,
            fileData: file ? await file.arrayBuffer() : null,
            fileName: file ? file.name : '',
            fileType: file ? file.type : '',
            fileSize: file ? file.size : 0,
            extractedText,
            createdAt: Date.now(),
        };

        return this._req('textbooks', 'readwrite', s => s.add(record));
    },

    async getTextbooks() {
        if (!this.currentUser) return [];
        return new Promise((resolve, reject) => {
            try {
                const tx = this.db.transaction('textbooks', 'readonly');
                const store = tx.objectStore('textbooks');
                const index = store.index('userEmail');
                const req = index.getAll(this.currentUser.email);
                req.onsuccess = () => resolve(req.result || []);
                req.onerror = () => reject(req.error);
            } catch (e) {
                resolve([]);
            }
        });
    },

    async getTextbook(id) {
        return this._req('textbooks', 'readonly', s => s.get(id));
    },

    async deleteTextbook(id) {
        return this._req('textbooks', 'readwrite', s => s.delete(id));
    },

    /* ========== TEXT EXTRACTION ========== */

    async extractText(file, format) {
        const fmt = (format || '').toLowerCase();

        // Plain text formats
        if (['txt', 'csv', 'rtf'].includes(fmt)) {
            return await file.text();
        }

        // HTML
        if (['html', 'htm'].includes(fmt)) {
            const html = await file.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            return doc.body.textContent || '';
        }

        // PDF (lazy-load pdf.js)
        if (fmt === 'pdf') {
            const pdfLib = await this._loadPdfJs();
            if (!pdfLib) return '';
            const arrayBuf = await file.arrayBuffer();
            const pdf = await pdfLib.getDocument({ data: arrayBuf }).promise;
            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map(item => item.str).join(' ') + '\n';
            }
            return text;
        }

        // DOCX (lazy-load mammoth.js)
        if (fmt === 'docx') {
            const mammothLib = await this._loadMammoth();
            if (!mammothLib) return '';
            const arrayBuf = await file.arrayBuffer();
            const result = await mammothLib.extractRawText({ arrayBuffer: arrayBuf });
            return result.value || '';
        }

        // EPUB (lazy-load JSZip)
        if (fmt === 'epub') {
            const jszipLib = await this._loadJSZip();
            if (!jszipLib) return '';
            const arrayBuf = await file.arrayBuffer();
            const zip = await jszipLib.loadAsync(arrayBuf);
            let text = '';
            const htmlFiles = Object.keys(zip.files).filter(
                p => p.endsWith('.html') || p.endsWith('.xhtml') || p.endsWith('.htm')
            );
            for (const path of htmlFiles) {
                const content = await zip.files[path].async('text');
                const doc = new DOMParser().parseFromString(content, 'text/html');
                text += (doc.body.textContent || '') + '\n';
            }
            return text;
        }

        // Images & unsupported — no text extraction
        return '';
    },

    async _ensureScript(src, globalName) {
        if (typeof window[globalName] !== 'undefined') return window[globalName];
        if (document.querySelector(`script[data-langy-lib="${globalName}"]`)) {
            return new Promise(resolve => {
                const wait = () => {
                    if (typeof window[globalName] !== 'undefined') return resolve(window[globalName]);
                    setTimeout(wait, 30);
                };
                wait();
            });
        }
        return new Promise(resolve => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.dataset.langyLib = globalName;
            script.onload = () => resolve(window[globalName]);
            script.onerror = () => resolve(undefined);
            document.head.appendChild(script);
        });
    },

    async _loadPdfJs() {
        const lib = await this._ensureScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', 'pdfjsLib');
        if (lib?.GlobalWorkerOptions) {
            lib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
        return lib;
    },

    async _loadMammoth() {
        return this._ensureScript('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js', 'mammoth');
    },

    async _loadJSZip() {
        return this._ensureScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', 'JSZip');
    },

    /* ========== AUTO-SAVE ========== */

    // Update user record (name, avatar) in the users store
    async updateUserRecord(updates) {
        if (!this.currentUser || !this.db) return;
        const user = await this._req('users', 'readonly', s => s.get(this.currentUser.email));
        if (!user) return;
        Object.assign(user, updates);
        await this._req('users', 'readwrite', s => s.put(user));
        this.currentUser = user;
    },

    startAutoSave() {
        this.stopAutoSave();
        this.autoSaveInterval = setInterval(() => {
            this.saveProgress().catch(e => console.warn('Auto-save:', e));
        }, 30000); // every 30 sec
    },

    stopAutoSave() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
            this.autoSaveInterval = null;
        }
    },
};

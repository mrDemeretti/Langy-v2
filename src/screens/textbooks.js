/* ============================================
   SCREEN: TEXTBOOKS & METHODS
   Upload, view, and manage learning materials
   ============================================ */

function renderTextbooks(container) {
    const activeLevel = window._textbookLevel || 'all';
    const levels = ['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="textbooks-back">←</div>
                <div class="nav-header__title">Textbooks</div>
                <div class="nav-header__action" id="textbook-add-btn"
                     style="width:36px; height:36px; border-radius:50%; background:var(--primary);
                            color:white; display:flex; align-items:center; justify-content:center;
                            font-size:20px; font-weight:var(--fw-black); cursor:pointer;
                            box-shadow:0 4px 12px rgba(124,108,246,0.3);">+</div>
            </div>

            <div style="padding: 0 var(--sp-6) var(--sp-4); overflow-x:auto;">
                <div class="tabs" id="textbook-levels" style="flex-wrap:nowrap; min-width:max-content;">
                    ${levels.map(l => `
                        <button class="tabs__tab ${activeLevel === l ? 'tabs__tab--active' : ''}" data-level="${l}">
                            ${l === 'all' ? 'All' : l}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="textbooks__list" id="textbooks-list">
                <div class="textbooks__loading">Loading textbooks...</div>
            </div>
        </div>
    `;

    // Load textbooks async
    _loadTextbooksList(container, activeLevel);

    // Back nav
    container.querySelector('#textbooks-back')?.addEventListener('click', () => Router.navigate('home'));

    // Level tabs
    container.querySelectorAll('.tabs__tab').forEach(tab => {
        tab.addEventListener('click', () => {
            window._textbookLevel = tab.dataset.level;
            renderTextbooks(container);
        });
    });

    // Add button
    container.querySelector('#textbook-add-btn')?.addEventListener('click', () => {
        _showAddTextbookModal();
    });
}

/* ---------- Textbook List ---------- */

async function _loadTextbooksList(container, level) {
    const listEl = container.querySelector('#textbooks-list');
    if (!listEl) return;

    try {
        let textbooks = await LangyDB.getTextbooks();
        if (level !== 'all') {
            textbooks = textbooks.filter(t => t.level === level);
        }

        if (!textbooks.length) {
            listEl.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state__icon">${LangyIcons.book}</div>
                    <div class="empty-state__title">No textbooks yet</div>
                    <div class="empty-state__text">Tap + to add your first textbook</div>
                </div>
            `;
            return;
        }

        const fmtIcons = {
            pdf: LangyIcons.fileText, docx: LangyIcons.fileText, txt: LangyIcons.fileText, csv: LangyIcons.barChart,
            html: LangyIcons.globe, htm: LangyIcons.globe, epub: LangyIcons.book, rtf: LangyIcons.fileText,
            png: LangyIcons.image, jpg: LangyIcons.image, jpeg: LangyIcons.image, gif: LangyIcons.image, webp: LangyIcons.image
        };

        listEl.innerHTML = textbooks.map(tb => `
            <div class="textbook-card" data-id="${tb.id}">
                <div class="textbook-card__icon">${fmtIcons[tb.format] || LangyIcons.fileText}</div>
                <div class="textbook-card__info">
                    <div class="textbook-card__title">${_esc(tb.title)}</div>
                    <div class="textbook-card__meta">
                        ${_esc(tb.author || 'Unknown author')} · ${(tb.format || '').toUpperCase()}
                        ${tb.fileSize ? ' · ' + _fmtSize(tb.fileSize) : ''}
                    </div>
                </div>
                <div class="badge badge--primary">${tb.level}</div>
            </div>
        `).join('');

        // Click to view details
        listEl.querySelectorAll('.textbook-card').forEach(card => {
            card.addEventListener('click', () => {
                _showTextbookDetail(parseInt(card.dataset.id));
            });
        });

        setTimeout(() => Anim.staggerChildren(container, '.textbook-card'), 80);
    } catch (e) {
        console.error('Loading textbooks failed:', e);
        listEl.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon">${LangyIcons.alertTriangle}</div>
                <div class="empty-state__title">Error loading textbooks</div>
                <div class="empty-state__text">${e.message || ''}</div>
            </div>
        `;
    }
}

/* ---------- Add Textbook Modal ---------- */

function _showAddTextbookModal() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="max-height:85vh; overflow-y:auto;">
            <div class="overlay__handle"></div>
            <h3 style="margin-bottom:var(--sp-4);">${LangyIcons.bookOpen} Add Textbook</h3>

            <form id="textbook-form" style="display:flex; flex-direction:column; gap:var(--sp-4);">
                <div class="input-group">
                    <label>Title *</label>
                    <input class="input" type="text" id="tb-title"
                           placeholder="e.g. English File Pre-Intermediate" required>
                </div>
                <div class="input-group">
                    <label>Author</label>
                    <input class="input" type="text" id="tb-author"
                           placeholder="e.g. Christina Latham-Koenig">
                </div>
                <div class="input-group">
                    <label>Level *</label>
                    <select class="input" id="tb-level">
                        <option value="A1">A1 — Beginner</option>
                        <option value="A2">A2 — Elementary</option>
                        <option value="B1" selected>B1 — Intermediate</option>
                        <option value="B2">B2 — Upper-Intermediate</option>
                        <option value="C1">C1 — Advanced</option>
                        <option value="C2">C2 — Proficient</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Methodology & Notes</label>
                    <textarea class="input" id="tb-desc" rows="3"
                              placeholder="Teaching approach, key topics covered..."></textarea>
                </div>
                <div class="input-group">
                    <label>File</label>
                    <div class="upload-zone" id="upload-zone">
                        <div class="upload-zone__content">
                            <span style="font-size:32px;">${LangyIcons.folder}</span>
                            <span>Tap to select or drag a file</span>
                            <span class="upload-zone__formats">PDF · DOCX · TXT · CSV · HTML · EPUB · RTF · Images</span>
                            <span id="upload-filename" style="color:var(--primary); font-weight:var(--fw-bold);"></span>
                        </div>
                        <input type="file" id="tb-file"
                               accept=".pdf,.docx,.txt,.csv,.html,.htm,.epub,.rtf,.png,.jpg,.jpeg,.gif,.webp"
                               style="display:none;">
                    </div>
                </div>

                <div class="auth__error" id="tb-error"></div>

                <button type="submit" class="btn btn--primary btn--full btn--lg" id="tb-submit">
                    Upload Textbook
                </button>
            </form>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    // File picker
    const uploadZone = overlay.querySelector('#upload-zone');
    const fileInput = overlay.querySelector('#tb-file');
    const filenameEl = overlay.querySelector('#upload-filename');
    let selectedFile = null;

    uploadZone.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('dragover', e => {
        e.preventDefault();
        uploadZone.classList.add('upload-zone--active');
    });
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('upload-zone--active');
    });
    uploadZone.addEventListener('drop', e => {
        e.preventDefault();
        uploadZone.classList.remove('upload-zone--active');
        if (e.dataTransfer.files.length) {
            selectedFile = e.dataTransfer.files[0];
            filenameEl.textContent = selectedFile.name;
        }
    });
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            selectedFile = fileInput.files[0];
            filenameEl.textContent = selectedFile.name;
        }
    });

    // Submit
    overlay.querySelector('#textbook-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const errorEl = overlay.querySelector('#tb-error');
        const submitBtn = overlay.querySelector('#tb-submit');

        const title = overlay.querySelector('#tb-title').value.trim();
        const author = overlay.querySelector('#tb-author').value.trim();
        const level = overlay.querySelector('#tb-level').value;
        const description = overlay.querySelector('#tb-desc').value.trim();

        if (!title) {
            errorEl.textContent = 'Please enter a title';
            errorEl.style.display = 'block';
            return;
        }

        const format = selectedFile
            ? selectedFile.name.split('.').pop().toLowerCase()
            : '';

        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading...';
        errorEl.style.display = 'none';

        try {
            await LangyDB.addTextbook({
                title, author, level, description, format,
                methodology: description
            }, selectedFile);

            overlay.remove();
            Anim.showToast(`Textbook added! ${LangyIcons.book}`);
            renderTextbooks(document.getElementById('screen-container'));
        } catch (err) {
            errorEl.textContent = err.message;
            errorEl.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Upload Textbook';
        }
    });
}

/* ---------- Textbook Detail Modal ---------- */

async function _showTextbookDetail(id) {
    const tb = await LangyDB.getTextbook(id);
    if (!tb) return;

    const fmtIcons = {
        pdf: LangyIcons.fileText, docx: LangyIcons.fileText, txt: LangyIcons.fileText, csv: LangyIcons.barChart,
        html: LangyIcons.globe, htm: LangyIcons.globe, epub: LangyIcons.book, rtf: LangyIcons.fileText,
        png: LangyIcons.image, jpg: LangyIcons.image, jpeg: LangyIcons.image, gif: LangyIcons.image, webp: LangyIcons.image
    };
    const fmtNames = {
        pdf: 'PDF Document', docx: 'Word Document', txt: 'Text File',
        csv: 'CSV Spreadsheet', html: 'HTML Page', htm: 'HTML Page',
        epub: 'E-Book (EPUB)', rtf: 'Rich Text',
        png: 'Image', jpg: 'Image', jpeg: 'Image', gif: 'Image', webp: 'Image'
    };

    const hasText = tb.extractedText && tb.extractedText.trim().length > 0;
    const textPreview = hasText
        ? _esc(tb.extractedText.substring(0, 500)) + (tb.extractedText.length > 500 ? '…' : '')
        : '';

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="max-height:85vh; overflow-y:auto;">
            <div class="overlay__handle"></div>

            <div style="text-align:center; margin-bottom:var(--sp-4);">
                <div style="font-size:48px; margin-bottom:var(--sp-2);">${fmtIcons[tb.format] || LangyIcons.fileText}</div>
                <h3>${_esc(tb.title)}</h3>
                <div style="color:var(--text-secondary); font-size:var(--fs-sm); margin-top:var(--sp-1);">
                    ${_esc(tb.author || 'Unknown author')}
                </div>
                <div style="margin-top:var(--sp-2);">
                    <span class="badge badge--primary" style="margin-right:var(--sp-1);">${tb.level}</span>
                    <span class="badge">${fmtNames[tb.format] || (tb.format || '').toUpperCase()}</span>
                </div>
            </div>

            ${(tb.description || tb.methodology) ? `
                <div class="card" style="margin-bottom:var(--sp-3); padding:var(--sp-4);">
                    <h4 style="margin-bottom:var(--sp-2);">${LangyIcons.clipboard} Methodology</h4>
                    <p style="color:var(--text-secondary); font-size:var(--fs-sm); line-height:1.6; white-space:pre-wrap;">${_esc(tb.description || tb.methodology)}</p>
                </div>
            ` : ''}

            ${hasText ? `
                <div class="card" style="margin-bottom:var(--sp-3); padding:var(--sp-4);">
                    <h4 style="margin-bottom:var(--sp-2);">${LangyIcons.bookOpen} Content Preview</h4>
                    <p style="color:var(--text-secondary); font-size:var(--fs-xs); line-height:1.5;
                              max-height:200px; overflow-y:auto; white-space:pre-wrap;">${textPreview}</p>
                    <div style="font-size:var(--fs-xs); color:var(--text-tertiary); margin-top:var(--sp-2);">
                        ${tb.extractedText.length.toLocaleString()} characters extracted for AI
                    </div>
                </div>
            ` : `
                <div class="card" style="margin-bottom:var(--sp-3); padding:var(--sp-4); text-align:center;">
                    <div style="color:var(--text-tertiary); font-size:var(--fs-sm);">
                        ${LangyIcons.image} No text extracted (image or unsupported format)
                    </div>
                </div>
            `}

            ${tb.fileName ? `
                <div style="font-size:var(--fs-xs); color:var(--text-tertiary); text-align:center; margin-bottom:var(--sp-3);">
                    ${LangyIcons.paperclip} ${_esc(tb.fileName)} · ${_fmtSize(tb.fileSize || 0)}
                </div>
            ` : ''}

            <div style="display:flex; gap:var(--sp-3);">
                ${tb.fileData ? `<button class="btn btn--primary btn--full" id="tb-download">Open File</button>` : ''}
                <button class="btn btn--ghost btn--full" id="tb-delete" style="color:var(--danger);">Delete</button>
            </div>
            <button class="btn btn--ghost btn--full" id="tb-close" style="margin-top:var(--sp-2);">Close</button>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector('#tb-close')?.addEventListener('click', () => overlay.remove());

    // Download / open file
    overlay.querySelector('#tb-download')?.addEventListener('click', () => {
        if (tb.fileData) {
            const blob = new Blob([tb.fileData], { type: tb.fileType || 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = tb.fileName || 'file';
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 500);
        }
    });

    // Delete
    overlay.querySelector('#tb-delete')?.addEventListener('click', async () => {
        if (confirm(`Delete "${tb.title}"?`)) {
            await LangyDB.deleteTextbook(id);
            overlay.remove();
            Anim.showToast('Textbook deleted');
            renderTextbooks(document.getElementById('screen-container'));
        }
    });
}

/* ---------- Helpers ---------- */

function _esc(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
}

function _fmtSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
}

Router.register('textbooks', renderTextbooks);

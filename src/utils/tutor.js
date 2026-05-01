/* ============================================
   LANGY — DEEPTUTOR GLOBAL WIDGET
   ============================================ */

const DeepTutor = {
    overlay: null,
    badge: null,
    messages: null,
    isOpen: false,

    init() {
        // Create the Widget (Peeking Badge)
        this.badge = document.createElement('div');
        this.badge.className = 'tutor-widget';
        this.badge.id = 'tutor-widget';

        const mascotNames = ['luna', 'rex', 'pixel', 'omar'];
        const chosenIdx = LangyState.mascot.selected || 0;

        this.badge.innerHTML = `
            <div class="tutor-widget__badge">
                <img src="assets/mascots/${mascotNames[chosenIdx]}.png" alt="Mascot">
            </div>
        `;

        this.badge.onclick = () => this.open();
        document.body.appendChild(this.badge);

        // Hidden by default until show() is called by the router
        // CSS already sets display:none, no need for inline style

        // Create the Overlay (Chat Window)
        this.overlay = document.createElement('div');
        this.overlay.className = 'tutor-overlay';
        // Build curriculum-aware header and placeholder
        const cefrBadge = this._getCefrBadge();
        const inputPlaceholder = this._getInputPlaceholder();

        this.overlay.innerHTML = `
            <div class="tutor-chat-window">
                <header class="tutor-chat__header">
                    <strong>DeepTutor</strong>
                    ${cefrBadge}
                    <span class="tutor-chat__close" id="tutor-close">✕</span>
                </header>
                <div class="tutor-chat__messages" id="tutor-messages"></div>
                <div class="tutor-chat__input">
                    <input type="text" class="input" id="tutor-input" placeholder="${inputPlaceholder}" autocomplete="off">
                    <button class="btn btn--primary btn--icon" id="tutor-send">↑</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.overlay);
        this.messages = this.overlay.querySelector('#tutor-messages');

        // Handlers
        this.overlay.querySelector('#tutor-close').onclick = () => this.close();
        this.overlay.querySelector('#tutor-send').onclick = () => this.handleSend();
        this.overlay.querySelector('#tutor-input').onkeypress = e => {
            if (e.key === 'Enter') this.handleSend();
        };

        // Load History
        this.loadHistory();
    },

    open() {
        this.isOpen = true;
        this.overlay.classList.add('is-active');
        this.badge.style.opacity = '0';
        this.overlay.querySelector('#tutor-input').focus();
    },

    close() {
        this.isOpen = false;
        this.overlay.classList.remove('is-active');
        this.badge.style.opacity = '1';
    },

    loadHistory() {
        const history = LangyState.aiMemory.conversationContext;
        if (history.length === 0) {
            this.addMessage(this._getGreeting(), 'ai');
        } else {
            history.forEach(m => this.addMessage(m.content, m.role, false));
        }
    },

    addMessage(text, role, save = true) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble chat-bubble--${role === 'ai' ? 'ai' : 'user'}`;
        bubble.textContent = text;
        this.messages.appendChild(bubble);
        this.messages.scrollTop = this.messages.scrollHeight;

        if (save) {
            LangyState.aiMemory.conversationContext.push({
                role,
                content: text,
                timestamp: Date.now(),
            });
        }
    },

    async handleSend(directText, silent = false) {
        const input = this.overlay.querySelector('#tutor-input');
        const val = directText || (input ? input.value.trim() : '');
        if (!val) return;

        if (input && !directText) input.value = '';
        if (!silent) this.addMessage(val, 'user');

        // Prepare AI response bubble (empty for streaming)
        const aiBubble = this.createMessageBubble('', 'ai');
        this.messages.appendChild(aiBubble);
        this.setEmotion('thinking');

        try {
            await LangyAI.askDeepTutor(
                val,
                (chunk, full) => {
                    // Update the bubble in real-time
                    aiBubble.textContent = full;
                    this.messages.scrollTop = this.messages.scrollHeight;
                },
                finalResponse => {
                    // Save to persistent memory once complete
                    LangyState.aiMemory.conversationContext.push({
                        role: 'ai',
                        content: finalResponse,
                        timestamp: Date.now(),
                    });
                    this.setEmotion('neutral');
                }
            );
        } catch (err) {
            aiBubble.textContent =
                "Sorry, I'm having trouble connecting. Please check your internet connection and try again.";
            this.setEmotion('neutral');
        }
    },

    show() {
        if (!this.badge) this.init();
        this.badge.style.display = ''; // Remove any inline display override
        this.badge.classList.add('is-visible');
    },

    hide() {
        if (this.badge) {
            this.badge.classList.remove('is-visible');
            this.close();
        }
    },

    resetChat() {
        this.messages.innerHTML = '';
        LangyAI.chatSessionId = null; // Forces DeepTutor to start a fresh backend session
        this.loadHistory();
    },

    createMessageBubble(text, role) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble chat-bubble--${role === 'ai' ? 'ai' : 'user'}`;
        bubble.textContent = text;
        return bubble;
    },

    setEmotion(emotion) {
        if (!this.badge) return;
        const img = this.badge.querySelector('img');
        const emotions = ['happy', 'thinking', 'encouraging', 'surprised', 'neutral'];

        emotions.forEach(e => this.badge.classList.remove(`mascot--${e}`));
        if (emotion !== 'neutral') {
            this.badge.classList.add(`mascot--${emotion}`);
        }
    },

    // ─── Curriculum-aware helpers ───

    /** Build a curriculum-grounded greeting for the tutor */
    _getGreeting() {
        const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
        const targetCode = typeof LangyTarget !== 'undefined' ? LangyTarget.getCode() : 'en';

        // English: curriculum-rich greeting
        if (targetCode === 'en' && typeof LangyCurriculum !== 'undefined') {
            const tb = LangyCurriculum.getActive();
            if (tb) {
                const cefr = tb.cefr || '';
                const unitId = typeof LangyState !== 'undefined' ? LangyState.progress?.currentUnitId : null;
                const unit = unitId && tb.units ? tb.units.find(u => u.id === unitId) : null;
                const unitName = unit ? unit.title : '';
                const canDo = tb.canDo && tb.canDo.length ? tb.canDo[0] : '';

                if (lang === 'ru') {
                    let g = `Привет! Я твой AI-репетитор по английскому.`;
                    if (cefr) g += ` Ты на уровне CEFR ${cefr}.`;
                    if (unitName) g += ` Сейчас мы работаем над: «${unitName}».`;
                    if (canDo) g += ` Цель: ${canDo}.`;
                    g += ` Спрашивай что угодно — грамматику, лексику, или попроси объяснить задание.`;
                    return g;
                }
                if (lang === 'es') {
                    let g = `¡Hola! Soy tu tutor AI de inglés.`;
                    if (cefr) g += ` Estás en el nivel CEFR ${cefr}.`;
                    if (unitName) g += ` Ahora trabajamos en: "${unitName}".`;
                    if (canDo) g += ` Objetivo: ${canDo}.`;
                    g += ` Pregunta lo que quieras — gramática, vocabulario, o pide que explique un ejercicio.`;
                    return g;
                }
                // English UI
                let g = `Hi! I'm your English tutor.`;
                if (cefr) g += ` You're at CEFR ${cefr}.`;
                if (unitName) g += ` We're working on: "${unitName}".`;
                if (canDo) g += ` Goal: ${canDo}.`;
                g += ` Ask me about grammar, vocabulary, or any exercise you need help with.`;
                return g;
            }
        }

        // Non-English or no curriculum: simple greeting
        const greetings = {
            en: "Hi! I'm your language tutor. Ask me anything about your current lesson.",
            ru: 'Привет! Я твой языковой репетитор. Спрашивай что угодно по текущему уроку.',
            es: '¡Hola! Soy tu tutor de idiomas. Pregúntame lo que quieras sobre tu lección actual.',
        };
        return greetings[lang] || greetings.en;
    },

    /** CEFR badge for the chat header */
    _getCefrBadge() {
        const targetCode = typeof LangyTarget !== 'undefined' ? LangyTarget.getCode() : 'en';
        if (targetCode === 'en' && typeof LangyCurriculum !== 'undefined') {
            const tb = LangyCurriculum.getActive();
            if (tb && tb.cefr) {
                return `<span style="font-size:10px; font-weight:700; background:var(--primary); color:#fff; padding:1px 6px; border-radius:4px; margin-left:auto; margin-right:8px;">${tb.cefr}</span>`;
            }
        }
        return '<span style="margin-left:auto;"></span>';
    },

    /** Context-aware input placeholder */
    _getInputPlaceholder() {
        const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
        const targetCode = typeof LangyTarget !== 'undefined' ? LangyTarget.getCode() : 'en';
        if (targetCode === 'en') {
            return {
                en: 'Ask about grammar, vocabulary, or exercises...',
                ru: 'Спроси о грамматике, лексике или заданиях...',
                es: 'Pregunta sobre gramática, vocabulario o ejercicios...',
            }[lang] || 'Ask about grammar, vocabulary, or exercises...';
        }
        return {
            en: 'Ask your tutor anything...',
            ru: 'Спроси репетитора...',
            es: 'Pregunta a tu tutor...',
        }[lang] || 'Ask your tutor anything...';
    },
};

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
        this.overlay.innerHTML = `
            <div class="tutor-chat-window">
                <header class="tutor-chat__header">
                    <strong>DeepTutor</strong>
                    <span class="tutor-chat__close" id="tutor-close">✕</span>
                </header>
                <div class="tutor-chat__messages" id="tutor-messages"></div>
                <div class="tutor-chat__input">
                    <input type="text" class="input" id="tutor-input" placeholder="Ask Langy anything..." autocomplete="off">
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
            this.addMessage("Hi! I'm your DeepTutor. How can I help you today?", 'ai');
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
};

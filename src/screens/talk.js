/* ============================================
   SCREEN: LANGY TALK — Voice Conversation
   Real-time voice chat with mascot tutors
   ============================================ */

function renderTalk(container) {
    // Check if we have a session going or need to show selection
    if (window._talkView === 'call') {
        renderTalkCall(container);
    } else if (window._talkView === 'summary') {
        renderTalkSummary(container);
    } else {
        renderTalkSelect(container);
    }
}

// ═══════════════════════════════════════
// SCREEN 1: Mascot & Scenario Selection
// ═══════════════════════════════════════
function renderTalkSelect(container) {
    const mascotId = LangyState.mascot?.selected || 0;
    const mascots = Object.entries(TalkEngine.personas);
    const scenarios = TalkEngine.scenarios;

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="talk-back">←</div>
                <div class="nav-header__title">Langy Talk</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: var(--sp-4) var(--sp-5); overflow-y:auto; flex:1;">

                <!-- Hero -->
                <div style="text-align:center; margin-bottom:var(--sp-5);">
                    <div style="font-size:48px; margin-bottom:var(--sp-2);">🎙️</div>
                    <h2>Talk with a Native Speaker</h2>
                    <p style="color:var(--text-secondary); font-size:var(--fs-sm); margin-top:var(--sp-1);">Practice real conversations using your voice</p>
                </div>

                <!-- Mascot Selection -->
                <h4 style="margin-bottom:var(--sp-3); display:flex; align-items:center; gap:8px;">
                    ${LangyIcons.users} Choose Your Partner
                </h4>
                <div class="talk-mascots" id="talk-mascots">
                    ${mascots.map(([id, m]) => {
                        const colors = { 0: '#7C6CF6', 1: '#4ADE80', 2: '#F59E0B', 3: '#06B6D4' };
                        const imgs = { 0: 'luna', 1: 'rex', 2: 'pixel', 3: 'omar' };
                        const isSelected = parseInt(id) === (window._talkMascot ?? mascotId);
                        return `
                            <div class="talk-mascot ${isSelected ? 'talk-mascot--active' : ''}" 
                                 data-id="${id}" style="--mascot-color: ${colors[id]};">
                                <div class="talk-mascot__avatar">
                                    <img src="assets/mascots/${imgs[id]}.png" alt="${m.name}" 
                                         onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=font-size:28px>${m.name[0]}</span>';">
                                </div>
                                <div class="talk-mascot__name">${m.name}</div>
                                <div class="talk-mascot__style">${m.style}</div>
                                ${isSelected ? '<div class="talk-mascot__check">✓</div>' : ''}
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Scenario Selection -->
                <h4 style="margin:var(--sp-5) 0 var(--sp-3); display:flex; align-items:center; gap:8px;">
                    ${LangyIcons.map} Choose a Scenario
                </h4>
                <div class="talk-scenarios" id="talk-scenarios">
                    ${scenarios.map((s, i) => {
                        const isSelected = (window._talkScenario || 'free') === s.id;
                        return `
                            <div class="talk-scenario ${isSelected ? 'talk-scenario--active' : ''}" data-id="${s.id}">
                                <span class="talk-scenario__icon">${s.icon}</span>
                                <div class="talk-scenario__info">
                                    <div class="talk-scenario__title">${s.title}</div>
                                    <div class="talk-scenario__desc">${s.desc}</div>
                                </div>
                                ${isSelected ? `<span style="color:var(--primary);">${LangyIcons.check}</span>` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- Start Button -->
                <div style="margin-top:var(--sp-5); padding-bottom:var(--sp-6);">
                    <button class="btn btn--primary btn--xl btn--full" id="talk-start" 
                            style="box-shadow: 0 4px 0 var(--primary-dark); font-size:var(--fs-lg); display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">
                        ${LangyIcons.mic} Start Conversation
                    </button>
                    <p style="text-align:center; font-size:var(--fs-xs); color:var(--text-tertiary); margin-top:var(--sp-2);">
                        Requires microphone access · Works in Chrome/Edge/Safari
                    </p>
                </div>
            </div>
        </div>
    `;

    // ── Event Handlers ──
    container.querySelector('#talk-back')?.addEventListener('click', () => {
        window._talkView = null;
        Router.navigate('home');
    });

    container.querySelectorAll('.talk-mascot').forEach(el => {
        el.addEventListener('click', () => {
            window._talkMascot = parseInt(el.dataset.id);
            if (typeof AudioUtils !== 'undefined') AudioUtils.playPop();
            renderTalkSelect(container);
        });
    });

    container.querySelectorAll('.talk-scenario').forEach(el => {
        el.addEventListener('click', () => {
            window._talkScenario = el.dataset.id;
            if (typeof AudioUtils !== 'undefined') AudioUtils.playPop();
            renderTalkSelect(container);
        });
    });

    container.querySelector('#talk-start')?.addEventListener('click', () => {
        window._talkView = 'call';
        renderTalk(container);
    });

    setTimeout(() => Anim.staggerChildren(container, '.talk-mascot'), 50);
    setTimeout(() => Anim.staggerChildren(container, '.talk-scenario'), 100);
}

// ═══════════════════════════════════════
// SCREEN 2: Live Call UI
// ═══════════════════════════════════════
function renderTalkCall(container) {
    const mascotId = window._talkMascot ?? LangyState.mascot?.selected ?? 0;
    const scenarioId = window._talkScenario || 'free';
    const session = TalkEngine.startSession(mascotId, scenarioId);
    const persona = session.persona;
    const scenario = session.scenario;
    const colors = { 0: '#7C6CF6', 1: '#4ADE80', 2: '#F59E0B', 3: '#06B6D4' };
    const imgs = { 0: 'luna', 1: 'rex', 2: 'pixel', 3: 'omar' };
    const color = colors[mascotId] || '#10B981';

    container.innerHTML = `
        <div class="screen screen--no-pad talk-call" style="background:var(--bg); display:flex; flex-direction:column;">
            
            <!-- Top Bar -->
            <div style="display:flex; align-items:center; justify-content:space-between; padding:var(--sp-4) var(--sp-5);">
                <div style="font-size:var(--fs-xs); color:var(--text-tertiary);">
                    <span id="talk-timer">0:00</span> · ${scenario.icon} ${scenario.title}
                </div>
                <button class="btn btn--ghost btn--sm" id="talk-end-top" style="color:var(--danger);">End</button>
            </div>

            <!-- Mascot Area -->
            <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:var(--sp-4);">
                
                <!-- Avatar with pulse ring -->
                <div class="talk-call__avatar-ring" id="mascot-ring" style="--ring-color: ${color};">
                    <div class="talk-call__avatar" style="background:${color}15;">
                        <img src="assets/mascots/${imgs[mascotId]}.png" alt="${persona.name}" 
                             style="width:100%; height:100%; object-fit:cover; border-radius:50%;"
                             onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=font-size:48px;color:${color}>${persona.name[0]}</span>';">
                    </div>
                </div>

                <div style="margin-top:var(--sp-3); text-align:center;">
                    <h2 style="color:${color};">${persona.name}</h2>
                    <div id="talk-status" class="talk-call__status">Connecting...</div>
                </div>

                <!-- Subtitles Area -->
                <div class="talk-call__subtitles" id="talk-subtitles">
                    <div id="mascot-subtitle" class="talk-call__subtitle talk-call__subtitle--mascot" style="display:none;">
                    </div>
                    <div id="user-subtitle" class="talk-call__subtitle talk-call__subtitle--user" style="display:none;">
                    </div>
                </div>

                <!-- Correction hint -->
                <div id="talk-correction" class="talk-call__correction" style="display:none;">
                </div>
            </div>

            <!-- Controls -->
            <div class="talk-call__controls">
                <button class="talk-call__btn talk-call__btn--mute" id="talk-mute" title="Mute subtitles">
                    <span style="font-size:20px;">📝</span>
                    <span style="font-size:10px;">Subs</span>
                </button>
                <button class="talk-call__btn talk-call__btn--mic" id="talk-mic" style="--btn-color: ${color};">
                    <span style="font-size:28px;" id="mic-icon">${LangyIcons.mic}</span>
                </button>
                <button class="talk-call__btn talk-call__btn--end" id="talk-end">
                    <span style="font-size:20px;">⏹</span>
                    <span style="font-size:10px;">End</span>
                </button>
            </div>
        </div>
    `;

    // ── State Machine ──
    let state = 'init'; // init → mascot_speaking → listening → thinking → mascot_speaking → ...
    let showSubs = true;
    let timerInterval = null;
    let seconds = 0;

    const statusEl = container.querySelector('#talk-status');
    const mascotSub = container.querySelector('#mascot-subtitle');
    const userSub = container.querySelector('#user-subtitle');
    const correctionEl = container.querySelector('#talk-correction');
    const micBtn = container.querySelector('#talk-mic');
    const ringEl = container.querySelector('#mascot-ring');

    function setStatus(text) { if (statusEl) statusEl.textContent = text; }
    function setMascotSub(text) {
        if (mascotSub) {
            mascotSub.textContent = text;
            mascotSub.style.display = showSubs && text ? 'block' : 'none';
        }
    }
    function setUserSub(text) {
        if (userSub) {
            userSub.textContent = text;
            userSub.style.display = text ? 'block' : 'none';
        }
    }

    // Timer
    timerInterval = setInterval(() => {
        seconds++;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        const timerEl = container.querySelector('#talk-timer');
        if (timerEl) timerEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    }, 1000);

    // Mascot speaks
    function mascotSpeak(text) {
        state = 'mascot_speaking';
        setStatus(`${persona.name} is speaking...`);
        setMascotSub(text);
        setUserSub('');
        ringEl?.classList.add('talk-call__avatar-ring--active');
        micBtn?.classList.remove('talk-call__btn--mic-active');

        TalkEngine.addToHistory('mascot', text);

        TalkEngine.speak(text, persona, null, () => {
            // When speech ends
            ringEl?.classList.remove('talk-call__avatar-ring--active');
            state = 'waiting';
            setStatus('Your turn — tap 🎤 to speak');
            micBtn?.classList.add('talk-call__btn--mic-pulse');
        });
    }

    // User speaks → AI responds
    async function processUserSpeech(text) {
        if (!text || text.trim().length === 0) {
            setStatus('I didn\'t catch that. Try again!');
            state = 'waiting';
            return;
        }

        setUserSub(`"${text}"`);
        state = 'thinking';
        setStatus(`${persona.name} is thinking...`);
        ringEl?.classList.add('talk-call__avatar-ring--thinking');

        try {
            const response = await TalkEngine.getAIResponse(text, mascotId, scenarioId);
            TalkEngine.addToHistory('user', text);
            ringEl?.classList.remove('talk-call__avatar-ring--thinking');

            // Check for corrections in AI response
            detectCorrections(text, response);

            mascotSpeak(response);
        } catch (err) {
            ringEl?.classList.remove('talk-call__avatar-ring--thinking');
            mascotSpeak("Sorry, I had a little hiccup. What were you saying?");
        }
    }

    function detectCorrections(userText, aiResponse) {
        // Simple pattern: AI rephrased something the user said → possibly a correction
        const userWords = userText.toLowerCase().split(/\s+/);
        const hasGrammarHint = aiResponse.toLowerCase().includes('actually') ||
                               aiResponse.toLowerCase().includes('you mean') ||
                               aiResponse.toLowerCase().includes('more natural');
        
        if (hasGrammarHint && correctionEl) {
            correctionEl.style.display = 'block';
            correctionEl.innerHTML = `💡 <span style="color:var(--text-secondary); font-size:var(--fs-xs);">Tip: Listen to how ${persona.name} rephrases your words</span>`;
            setTimeout(() => { if (correctionEl) correctionEl.style.display = 'none'; }, 5000);
        }
    }

    // ── Mic Button ──
    micBtn?.addEventListener('click', () => {
        if (state === 'mascot_speaking') {
            // Stop mascot and let user talk
            TalkEngine.stopSpeaking();
            ringEl?.classList.remove('talk-call__avatar-ring--active');
        }

        if (state === 'listening') {
            // Stop listening
            TalkEngine.stopListening();
            micBtn.classList.remove('talk-call__btn--mic-active');
            return;
        }

        // Start listening
        state = 'listening';
        setStatus('Listening...');
        micBtn.classList.add('talk-call__btn--mic-active');
        micBtn.classList.remove('talk-call__btn--mic-pulse');
        setUserSub('');
        setMascotSub('');

        const sttSupported = TalkEngine.startListening(
            // onResult (final)
            null,
            // onEnd
            (finalText) => {
                micBtn.classList.remove('talk-call__btn--mic-active');
                if (finalText) {
                    processUserSpeech(finalText);
                } else {
                    state = 'waiting';
                    setStatus('Your turn — tap 🎤 to speak');
                }
            },
            // onInterim
            (interim) => {
                setUserSub(`🎤 ${interim}...`);
            }
        );

        if (!sttSupported) {
            showManualInput();
        }
    });

    // Manual text input fallback
    function showManualInput() {
        micBtn.classList.remove('talk-call__btn--mic-active');
        const input = prompt(`Type your response to ${persona.name}:`);
        if (input) {
            processUserSpeech(input);
        } else {
            state = 'waiting';
            setStatus('Your turn — tap 🎤 to speak');
        }
    }

    // ── Subs Toggle ──
    container.querySelector('#talk-mute')?.addEventListener('click', () => {
        showSubs = !showSubs;
        Anim.showToast(showSubs ? 'Subtitles ON' : 'Subtitles OFF');
        if (!showSubs) mascotSub.style.display = 'none';
    });

    // ── End Call ──
    function endCall() {
        clearInterval(timerInterval);
        TalkEngine.stopSpeaking();
        TalkEngine.stopListening();
        window._talkSummary = TalkEngine.endSession();
        window._talkView = 'summary';
        renderTalk(container);
    }

    container.querySelector('#talk-end')?.addEventListener('click', endCall);
    container.querySelector('#talk-end-top')?.addEventListener('click', endCall);

    // ── Start the conversation ──
    setTimeout(() => {
        setStatus('Connected!');
        // Preload voices
        if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
        setTimeout(() => mascotSpeak(scenario.opener), 500);
    }, 800);
}

// ═══════════════════════════════════════
// SCREEN 3: Post-Call Summary
// ═══════════════════════════════════════
function renderTalkSummary(container) {
    const summary = window._talkSummary || {};
    const mins = Math.floor((summary.duration || 0) / 60);
    const secs = (summary.duration || 0) % 60;

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div style="padding: var(--sp-6) var(--sp-5); overflow-y:auto; flex:1;">

                <!-- Result Header -->
                <div style="text-align:center; margin-bottom:var(--sp-6);">
                    <div style="font-size:56px; margin-bottom:var(--sp-2);">🎉</div>
                    <h2>Great Conversation!</h2>
                    <p style="color:var(--text-secondary); margin-top:var(--sp-1);">
                        You talked with ${summary.mascot || 'your mascot'} about ${summary.scenario || 'English'}
                    </p>
                </div>

                <!-- Stats Grid -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--sp-3); margin-bottom:var(--sp-5);">
                    <div class="card" style="text-align:center; padding:var(--sp-4);">
                        <div style="font-size:28px; font-weight:var(--fw-black); color:var(--primary);">${mins}:${secs.toString().padStart(2, '0')}</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">Duration</div>
                    </div>
                    <div class="card" style="text-align:center; padding:var(--sp-4);">
                        <div style="font-size:28px; font-weight:var(--fw-black); color:var(--accent-dark);">${summary.turns || 0}</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">Your Turns</div>
                    </div>
                    <div class="card" style="text-align:center; padding:var(--sp-4);">
                        <div style="font-size:28px; font-weight:var(--fw-black); color:var(--reward-gold);">+${summary.xpEarned || 0}</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">XP Earned</div>
                    </div>
                    <div class="card" style="text-align:center; padding:var(--sp-4);">
                        <div style="font-size:28px; font-weight:var(--fw-black); color:var(--info);">+${summary.dangyEarned || 0}</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">Dangy Earned</div>
                    </div>
                </div>

                <!-- Skills Improved -->
                <div class="card" style="padding:var(--sp-4); margin-bottom:var(--sp-4); background:linear-gradient(135deg, rgba(16,185,129,0.04), rgba(74,222,128,0.04)); border: 1px solid rgba(16,185,129,0.15);">
                    <h4 style="margin-bottom:var(--sp-2); display:flex; align-items:center; gap:8px;">
                        ${LangyIcons.trendingUp} Skills Improved
                    </h4>
                    <div style="display:flex; gap:var(--sp-3);">
                        <div class="badge badge--accent">${LangyIcons.mic} Speaking</div>
                        <div class="badge badge--primary">${LangyIcons.headphones} Listening</div>
                    </div>
                </div>

                <!-- Transcript Preview -->
                ${summary.userMessages && summary.userMessages.length > 0 ? `
                <div class="card" style="padding:var(--sp-4); margin-bottom:var(--sp-4);">
                    <h4 style="margin-bottom:var(--sp-2);">Your Phrases</h4>
                    <div style="display:flex; flex-direction:column; gap:var(--sp-2); max-height:150px; overflow-y:auto;">
                        ${summary.userMessages.slice(-5).map(msg => `
                            <div style="font-size:var(--fs-sm); color:var(--text-secondary); padding:var(--sp-2); background:var(--bg-alt); border-radius:var(--radius-md);">
                                "${msg}"
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Actions -->
                <div style="display:flex; gap:var(--sp-2); margin-bottom:var(--sp-3);">
                    <button class="btn btn--primary btn--full" id="talk-again">
                        ${LangyIcons.refreshCw} Talk Again
                    </button>
                    <button class="btn btn--secondary btn--full" id="talk-change">
                        ${LangyIcons.users} Change Partner
                    </button>
                </div>
                <button class="btn btn--ghost btn--full" id="talk-done">
                    Back to Home
                </button>
            </div>
        </div>
    `;

    // Play victory sound
    if (typeof AudioUtils !== 'undefined') AudioUtils.playVictory();

    // Event handlers
    container.querySelector('#talk-again')?.addEventListener('click', () => {
        window._talkView = 'call';
        renderTalk(container);
    });

    container.querySelector('#talk-change')?.addEventListener('click', () => {
        window._talkView = 'select';
        renderTalk(container);
    });

    container.querySelector('#talk-done')?.addEventListener('click', () => {
        window._talkView = null;
        Router.navigate('home');
    });
}

Router.register('talk', renderTalk);

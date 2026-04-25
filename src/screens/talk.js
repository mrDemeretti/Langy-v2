/* ============================================
   SCREEN: LANGY TALK — Voice Conversation v2
   Real-time voice chat with mascot tutors
   ============================================ */

function renderTalk(container) {
    // ─── First Talk Session: show warm intro before jumping into call ───
    if (ScreenState.get('firstTalkSession')) {
        renderFirstTalkIntro(container);
    } else if (ScreenState.get('talkView') === 'call') {
        renderTalkCall(container);
    } else if (ScreenState.get('talkView') === 'summary') {
        renderTalkSummary(container);
    } else {
        renderTalkSelect(container);
    }
}

// ═══════════════════════════════════════
// FIRST SESSION: Warm intro before first call
// ═══════════════════════════════════════
function renderFirstTalkIntro(container) {
    const mascotId = ScreenState.get('talkMascot') ?? LangyState.mascot?.selected ?? 0;
    const scenarioId = ScreenState.get('talkScenario', 'coffee');
    const scenario = TalkEngine.scenarios.find(s => s.id === scenarioId) || TalkEngine.scenarios[0];
    const persona = TalkEngine.personas[mascotId] || TalkEngine.personas[0];
    const imgs = { 0: 'zendaya', 1: 'travis', 2: 'matthew', 3: 'omar' };
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const confidence = LangyState.user.confidenceLevel || 'intermediate';

    const tipText = {
        zero: {
            en: "Don't worry about mistakes — just try! I'll help you along the way.",
            ru: 'Не волнуйся из-за ошибок — просто попробуй! Я помогу по ходу.',
            es: 'No te preocupes por los errores — ¡solo intenta! Te ayudaré.',
        },
        basic: {
            en: "Use simple phrases. I'll guide the conversation and help when you get stuck.",
            ru: 'Используй простые фразы. Я буду вести разговор и помогу, если застрянешь.',
            es: 'Usa frases simples. Yo guiaré la conversación y te ayudaré.',
        },
        intermediate: {
            en: "Just talk naturally. I'll gently correct any mistakes as we go.",
            ru: 'Просто говори естественно. Я мягко исправлю ошибки по ходу.',
            es: 'Solo habla con naturalidad. Corregiré suavemente tus errores.',
        },
        advanced: {
            en: "Let's have a real conversation. I'll challenge you with idioms and nuance.",
            ru: 'Давай поговорим по-настоящему. Буду использовать идиомы и нюансы.',
            es: 'Tengamos una conversación real. Te retaré con modismos y matices.',
        },
    };

    const tip = (tipText[confidence] || tipText.intermediate)[lang];

    container.innerHTML = `
        <div class="screen" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:var(--sp-6); text-align:center; animation:fadeInUp 0.5s ease-out;">
            
            <div style="width:100px; height:100px; border-radius:50%; overflow:hidden; margin-bottom:var(--sp-4);
                        box-shadow:0 8px 32px rgba(0,0,0,0.15); border:3px solid var(--primary);">
                <img src="assets/mascots/${imgs[mascotId]}.png" alt="${persona.name}"
                     style="width:100%; height:100%; object-fit:contain;"
                     onerror="this.parentElement.innerHTML='<span style=font-size:48px>${persona.name[0]}</span>'">
            </div>

            <h2 style="margin-bottom:var(--sp-2);">${{
                en: `${persona.name} is ready`,
                ru: `${persona.name} готов${mascotId === 0 ? 'а' : ''}`,
                es: `${persona.name} está list${mascotId === 0 ? 'a' : 'o'}`,
            }[lang]}</h2>

            <p style="color:var(--text-secondary); margin-bottom:var(--sp-2); max-width:300px;">
                ${{ en: 'Your first conversation:', ru: 'Твой первый разговор:', es: 'Tu primera conversación:' }[lang]}
                <strong style="color:var(--primary);">${scenario.title}</strong>
            </p>

            <div class="card" style="padding:var(--sp-4); margin:var(--sp-4) 0; text-align:left; max-width:340px; width:100%;">
                <div style="display:flex; align-items:flex-start; gap:var(--sp-3);">
                    <span style="color:var(--primary); font-size:20px; flex-shrink:0;">${LangyIcons.info}</span>
                    <p style="font-size:var(--fs-sm); color:var(--text-secondary); line-height:1.5; margin:0;">
                        ${tip}
                    </p>
                </div>
            </div>

            <div style="display:flex; gap:var(--sp-2); font-size:var(--fs-xs); color:var(--text-tertiary); margin-bottom:var(--sp-6);">
                <span>${LangyIcons.mic} ${{ en: 'Tap mic to talk', ru: 'Нажми на микрофон', es: 'Toca el micrófono' }[lang]}</span>
                <span>·</span>
                <span>${LangyIcons.headphones} ${{ en: 'Listen & respond', ru: 'Слушай и отвечай', es: 'Escucha y responde' }[lang]}</span>
            </div>

            <button class="btn btn--primary btn--xl btn--full" id="first-talk-start"
                    style="max-width:340px; font-size:var(--fs-lg); display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">
                ${LangyIcons.mic} ${{ en: "Let's talk!", ru: 'Поговорим!', es: '¡Hablemos!' }[lang]}
            </button>

            <button class="btn btn--ghost" id="first-talk-skip"
                    style="margin-top:var(--sp-3); font-size:var(--fs-sm);">
                ${{ en: 'Skip to home', ru: 'Перейти на главную', es: 'Ir al inicio' }[lang]}
            </button>
        </div>
    `;

    container.querySelector('#first-talk-start')?.addEventListener('click', () => {
        ScreenState.remove('firstTalkSession');
        ScreenState.set('talkView', 'call');
        renderTalk(container);
    });

    container.querySelector('#first-talk-skip')?.addEventListener('click', () => {
        ScreenState.remove('firstTalkSession');
        ScreenState.remove('talkView');
        Router.navigate('home');
    });
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
                <div class="nav-header__back" id="talk-back">${LangyIcons.back}</div>
                <div class="nav-header__title">${i18n('talk.title')}</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: var(--sp-4) var(--sp-5); overflow-y:auto; flex:1;">

                <!-- Hero -->
                <div style="text-align:center; margin-bottom:var(--sp-5);">
                    <div style="font-size:48px; margin-bottom:var(--sp-2); color:var(--primary);">${LangyIcons.mic}</div>
                    <h2>${i18n('talk.hero_title')}</h2>
                    <p style="color:var(--text-secondary); font-size:var(--fs-sm); margin-top:var(--sp-1);">${i18n('talk.hero_desc')}</p>
                </div>

                <!-- Mascot Selection -->
                <h4 style="margin-bottom:var(--sp-3); display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--primary);">${LangyIcons.users}</span> ${i18n('talk.choose_partner')}
                </h4>
                <div class="talk-mascots" id="talk-mascots">
                    ${mascots
                        .map(([id, m]) => {
                            const colors = { 0: '#7C6CF6', 1: '#4ADE80', 2: '#F59E0B', 3: '#06B6D4' };
                            const imgs = { 0: 'zendaya', 1: 'travis', 2: 'matthew', 3: 'omar' };
                            const isSelected = parseInt(id) === (ScreenState.get('talkMascot') ?? mascotId);
                            return `
                            <div class="talk-mascot ${isSelected ? 'talk-mascot--active' : ''}" 
                                 data-id="${id}" style="--mascot-color: ${colors[id]};">
                                <div class="talk-mascot__avatar">
                                    <img src="assets/mascots/${imgs[id]}.png" alt="${m.name}" 
                                         onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=font-size:28px>${m.name[0]}</span>';">
                                </div>
                                <div class="talk-mascot__name">${m.name}</div>
                                <div class="talk-mascot__style">${m.style}</div>
                                ${isSelected ? `<div class="talk-mascot__check">${LangyIcons.check}</div>` : ''}
                            </div>
                        `;
                        })
                        .join('')}
                </div>

                <!-- Scenario Selection -->
                <h4 style="margin:var(--sp-5) 0 var(--sp-3); display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--accent-dark);">${LangyIcons.map}</span> ${i18n('talk.choose_scenario')}
                </h4>
                <div class="talk-scenarios" id="talk-scenarios">
                    ${scenarios
                        .map((s, i) => {
                            const isSelected = ScreenState.get('talkScenario', 'free') === s.id;
                            return `
                            <div class="talk-scenario ${isSelected ? 'talk-scenario--active' : ''}" data-id="${s.id}">
                                <span class="talk-scenario__icon" style="color:${s.color};">${LangyIcons[s.icon] || LangyIcons.messageCircle}</span>
                                <div class="talk-scenario__info">
                                    <div class="talk-scenario__title">${s.title}</div>
                                    <div class="talk-scenario__desc">${s.desc}</div>
                                </div>
                                ${isSelected ? `<span style="color:var(--primary);">${LangyIcons.check}</span>` : ''}
                            </div>
                        `;
                        })
                        .join('')}
                </div>

                <!-- Start Button -->
                <div style="margin-top:var(--sp-5); padding-bottom:var(--sp-6);">
                    <button class="btn btn--primary btn--xl btn--full" id="talk-start" 
                            style="box-shadow: 0 4px 0 var(--primary-dark); font-size:var(--fs-lg); display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">
                        ${LangyIcons.mic} ${i18n('talk.start')}
                    </button>
                    <p style="text-align:center; font-size:var(--fs-xs); color:var(--text-tertiary); margin-top:var(--sp-2);">
                        ${i18n('talk.mic_hint')} · Works in Chrome/Edge/Safari
                    </p>
                </div>
            </div>
        </div>
    `;

    // ── Event Handlers ──
    container.querySelector('#talk-back')?.addEventListener('click', () => {
        ScreenState.remove('talkView');
        Router.navigate('home');
    });

    container.querySelectorAll('.talk-mascot').forEach(el => {
        el.addEventListener('click', () => {
            ScreenState.set('talkMascot', parseInt(el.dataset.id));
            if (typeof AudioUtils !== 'undefined') AudioUtils.playPop();
            renderTalkSelect(container);
        });
    });

    container.querySelectorAll('.talk-scenario').forEach(el => {
        el.addEventListener('click', () => {
            ScreenState.set('talkScenario', el.dataset.id);
            if (typeof AudioUtils !== 'undefined') AudioUtils.playPop();
            renderTalkSelect(container);
        });
    });

    container.querySelector('#talk-start')?.addEventListener('click', () => {
        ScreenState.set('talkView', 'call');
        renderTalk(container);
    });

    setTimeout(() => Anim.staggerChildren(container, '.talk-mascot'), 50);
    setTimeout(() => Anim.staggerChildren(container, '.talk-scenario'), 100);
}

// ═══════════════════════════════════════
// SCREEN 2: Live Call UI
// ═══════════════════════════════════════
function renderTalkCall(container) {
    const mascotId = ScreenState.get('talkMascot') ?? LangyState.mascot?.selected ?? 0;
    const scenarioId = ScreenState.get('talkScenario', 'free');
    const session = TalkEngine.startSession(mascotId, scenarioId);
    const persona = session.persona;
    const scenario = session.scenario;
    const colors = { 0: '#7C6CF6', 1: '#4ADE80', 2: '#F59E0B', 3: '#06B6D4' };
    const imgs = { 0: 'zendaya', 1: 'travis', 2: 'matthew', 3: 'omar' };
    const color = colors[mascotId] || '#10B981';
    const minTurns = TalkEngine.REWARD_MIN_TURNS;

    container.innerHTML = `
        <div class="screen screen--no-pad talk-call" style="background:var(--bg); display:flex; flex-direction:column;">
            
            <!-- Top Bar -->
            <div style="display:flex; align-items:center; justify-content:space-between; padding:var(--sp-4) var(--sp-5);">
                <div style="font-size:var(--fs-xs); color:var(--text-tertiary);">
                    <span id="talk-timer">0:00</span> · <span style="color:${scenario.color || 'var(--text-secondary)'};">${LangyIcons[scenario.icon] || ''}</span> ${scenario.title}
                </div>
                <button class="btn btn--ghost btn--sm" id="talk-end-top" style="color:var(--danger);">End</button>
            </div>

            <!-- Progress Bar -->
            <div class="talk-progress" id="talk-progress" style="padding:0 var(--sp-5); margin-bottom:var(--sp-2);">
                <div style="display:flex; align-items:center; gap:var(--sp-2); font-size:var(--fs-xs); color:var(--text-tertiary);">
                    <div style="display:flex; gap:6px;" id="progress-dots">
                        ${[0, 1, 2].map(i => `<div class="talk-progress__dot" id="prog-dot-${i}"></div>`).join('')}
                    </div>
                    <span id="progress-text">0/${minTurns} exchanges to earn rewards</span>
                </div>
            </div>

            <!-- Mascot Area -->
            <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:var(--sp-4);">
                
                <!-- Avatar with pulse ring -->
                <div class="talk-call__avatar-ring" id="mascot-ring" style="--ring-color: ${color};">
                    <div class="talk-call__avatar" id="mascot-avatar" style="background:${color}15;">
                        <img src="assets/mascots/${imgs[mascotId]}.png" alt="${persona.name}" 
                             style="width:100%; height:100%; object-fit:cover; border-radius:50%;"
                             onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=font-size:48px;color:${color}>${persona.name[0]}</span>';">
                    </div>
                </div>

                <div style="margin-top:var(--sp-3); text-align:center;">
                    <h2 style="color:${color};">${persona.name}</h2>
                    <div id="talk-status" class="talk-call__status">Connecting...</div>
                </div>

                <!-- Typing indicator (hidden by default) -->
                <div id="talk-typing" class="talk-typing" style="display:none;">
                    <span></span><span></span><span></span>
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

                <!-- Auto-hint (shown after 30s silence) -->
                <div id="talk-hint" class="talk-hint" style="display:none;">
                    <div style="font-size:var(--fs-xs); color:var(--text-tertiary); margin-bottom:var(--sp-2);">Not sure what to say? Try:</div>
                    <div id="hint-text" style="font-weight:var(--fw-semibold); font-size:var(--fs-sm); margin-bottom:var(--sp-2);"></div>
                    <button class="btn btn--secondary btn--sm" id="hint-use">Use this phrase</button>
                </div>
            </div>

            <!-- Controls -->
            <div class="talk-call__controls">
                <button class="talk-call__btn talk-call__btn--mute" id="talk-mute" title="Toggle subtitles">
                    <span style="font-size:20px; color:var(--text-tertiary);">${LangyIcons.fileText}</span>
                    <span style="font-size:10px;">Subs</span>
                </button>
                <button class="talk-call__btn talk-call__btn--mic" id="talk-mic" style="--btn-color: ${color};">
                    <span style="font-size:28px;" id="mic-icon">${LangyIcons.mic}</span>
                </button>
                <button class="talk-call__btn talk-call__btn--end" id="talk-end">
                    <span style="font-size:20px; color:var(--danger);">${LangyIcons.x}</span>
                    <span style="font-size:10px;">End</span>
                </button>
            </div>
        </div>
    `;

    // ── State Machine ──
    let state = 'init';
    let showSubs = true;
    let timerInterval = null;
    let seconds = 0;
    let hintTimeout = null;
    let turnCount = 0;

    const statusEl = container.querySelector('#talk-status');
    const mascotSub = container.querySelector('#mascot-subtitle');
    const userSub = container.querySelector('#user-subtitle');
    const correctionEl = container.querySelector('#talk-correction');
    const micBtn = container.querySelector('#talk-mic');
    const ringEl = container.querySelector('#mascot-ring');
    const avatarEl = container.querySelector('#mascot-avatar');
    const typingEl = container.querySelector('#talk-typing');
    const hintEl = container.querySelector('#talk-hint');
    const hintTextEl = container.querySelector('#hint-text');

    function setStatus(text) {
        if (statusEl) statusEl.textContent = text;
    }
    // Escape user text to prevent XSS when using innerHTML
    function escapeHtml(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }
    function setMascotSub(text) {
        if (mascotSub) {
            mascotSub.textContent = text;
            mascotSub.style.display = showSubs && text ? 'block' : 'none';
        }
    }
    function setUserSub(html) {
        if (userSub) {
            userSub.innerHTML = html;
            userSub.style.display = html ? 'block' : 'none';
        }
    }

    // Progress bar update
    function updateProgress() {
        for (let i = 0; i < 3; i++) {
            const dot = container.querySelector(`#prog-dot-${i}`);
            if (dot) {
                dot.classList.toggle('talk-progress__dot--filled', i < turnCount);
                dot.classList.toggle('talk-progress__dot--done', turnCount >= minTurns);
            }
        }
        const textEl = container.querySelector('#progress-text');
        if (textEl) {
            if (turnCount >= minTurns) {
                textEl.innerHTML = `<span style="color:var(--primary);">${LangyIcons.check} Rewards unlocked!</span>`;
            } else {
                textEl.textContent = `${turnCount}/${minTurns} exchanges to earn rewards`;
            }
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

    // Auto-hint timer
    function startHintTimer() {
        clearTimeout(hintTimeout);
        hideHint();
        hintTimeout = setTimeout(() => {
            if (state === 'waiting') {
                const hint = TalkEngine.getRandomHint(scenarioId);
                if (hintTextEl) hintTextEl.textContent = `"${hint}"`;
                if (hintEl) hintEl.style.display = 'block';
            }
        }, 30000); // 30 seconds
    }

    function hideHint() {
        if (hintEl) hintEl.style.display = 'none';
    }

    // Mascot speaks
    function mascotSpeak(text) {
        state = 'mascot_speaking';
        setStatus(`${persona.name} is speaking...`);
        setMascotSub(text);
        setUserSub('');
        hideHint();
        ringEl?.classList.add('talk-call__avatar-ring--active');
        avatarEl?.classList.add('talk-call__avatar--bounce');
        micBtn?.classList.remove('talk-call__btn--mic-active');
        if (typingEl) typingEl.style.display = 'none';

        TalkEngine.addToHistory('mascot', text);

        TalkEngine.speak(text, persona, null, () => {
            ringEl?.classList.remove('talk-call__avatar-ring--active');
            avatarEl?.classList.remove('talk-call__avatar--bounce');
            state = 'waiting';
            setStatus('Your turn \u2014 tap mic to speak');
            micBtn?.classList.add('talk-call__btn--mic-pulse');
            startHintTimer();
        });
    }

    // User speaks → AI responds
    async function processUserSpeech(text) {
        if (!text || text.trim().length === 0) {
            setStatus("I didn't catch that. Try again!");
            state = 'waiting';
            startHintTimer();
            return;
        }

        turnCount++;
        updateProgress();
        setUserSub(`"${escapeHtml(text)}"`);
        state = 'thinking';
        setStatus(`${persona.name} is thinking...`);
        hideHint();
        ringEl?.classList.add('talk-call__avatar-ring--thinking');
        if (typingEl) typingEl.style.display = 'flex';

        try {
            const response = await TalkEngine.getAIResponse(text, mascotId, scenarioId);
            TalkEngine.addToHistory('user', text);
            ringEl?.classList.remove('talk-call__avatar-ring--thinking');

            detectCorrections(text, response);
            mascotSpeak(response);
        } catch (err) {
            ringEl?.classList.remove('talk-call__avatar-ring--thinking');
            if (typingEl) typingEl.style.display = 'none';
            mascotSpeak('Sorry, I had a little hiccup. What were you saying?');
        }
    }

    function detectCorrections(userText, aiResponse) {
        const hasGrammarHint =
            aiResponse.toLowerCase().includes('actually') ||
            aiResponse.toLowerCase().includes('you mean') ||
            aiResponse.toLowerCase().includes('more natural');

        if (hasGrammarHint && correctionEl) {
            correctionEl.style.display = 'block';
            correctionEl.innerHTML = `<span style="color:#F59E0B;">${LangyIcons.zap}</span> <span style="color:var(--text-secondary); font-size:var(--fs-xs);">Tip: Listen to how ${persona.name} rephrases your words</span>`;
            setTimeout(() => {
                if (correctionEl) correctionEl.style.display = 'none';
            }, 5000);
        }
    }

    // ── Mic Button ──
    micBtn?.addEventListener('click', () => {
        if (state === 'mascot_speaking') {
            TalkEngine.stopSpeaking();
            ringEl?.classList.remove('talk-call__avatar-ring--active');
            avatarEl?.classList.remove('talk-call__avatar--bounce');
        }

        if (state === 'listening') {
            TalkEngine.stopListening();
            micBtn.classList.remove('talk-call__btn--mic-active');
            return;
        }

        state = 'listening';
        setStatus('Listening...');
        micBtn.classList.add('talk-call__btn--mic-active');
        micBtn.classList.remove('talk-call__btn--mic-pulse');
        setUserSub('');
        setMascotSub('');
        hideHint();
        clearTimeout(hintTimeout);

        const sttSupported = TalkEngine.startListening(
            null,
            (finalText, confidence) => {
                micBtn.classList.remove('talk-call__btn--mic-active');
                if (finalText) {
                    processUserSpeech(finalText);
                } else {
                    state = 'waiting';
                    setStatus('Your turn \u2014 tap mic to speak');
                    startHintTimer();
                }
            },
            interim => {
                setUserSub(`${LangyIcons.mic} ${escapeHtml(interim)}...`);
            }
        );

        if (!sttSupported) {
            showManualInput();
        }
    });

    // Hint "Use this phrase" button
    container.querySelector('#hint-use')?.addEventListener('click', () => {
        const phrase = hintTextEl?.textContent?.replace(/"/g, '') || '';
        if (phrase) {
            hideHint();
            processUserSpeech(phrase);
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
            setStatus('Your turn \u2014 tap mic to speak');
            startHintTimer();
        }
    }

    // ── Subs Toggle ──
    container.querySelector('#talk-mute')?.addEventListener('click', () => {
        showSubs = !showSubs;
        Anim.showToast(showSubs ? 'Subtitles ON' : 'Subtitles OFF');
        if (!showSubs) mascotSub.style.display = 'none';
    });

    // ── End Call with Confirm ──
    function endCall() {
        if (turnCount < minTurns) {
            showEndConfirm();
        } else {
            doEndCall();
        }
    }

    function showEndConfirm() {
        const overlay = document.createElement('div');
        overlay.className = 'talk-confirm__overlay';
        overlay.innerHTML = `
            <div class="talk-confirm">
                <div style="font-size:24px; color:var(--primary); margin-bottom:var(--sp-3);">${LangyIcons.alertCircle}</div>
                <h3>End conversation?</h3>
                <p style="color:var(--text-secondary); font-size:var(--fs-sm); margin:var(--sp-2) 0 var(--sp-4);">
                    You need ${minTurns}+ exchanges to earn XP and Dangy. You've made ${turnCount} so far.
                </p>
                <div style="display:flex; gap:var(--sp-2); width:100%;">
                    <button class="btn btn--primary btn--full" id="confirm-keep">Keep Talking</button>
                    <button class="btn btn--ghost btn--full" id="confirm-end" style="color:var(--danger);">End Call</button>
                </div>
            </div>
        `;
        container.appendChild(overlay);

        overlay.querySelector('#confirm-keep')?.addEventListener('click', () => overlay.remove());
        overlay.querySelector('#confirm-end')?.addEventListener('click', () => {
            overlay.remove();
            doEndCall();
        });
    }

    function doEndCall() {
        clearInterval(timerInterval);
        clearTimeout(hintTimeout);

        // Get AI feedback before ending (if qualified)
        const feedbackPromise = turnCount >= minTurns ? TalkEngine.getAIFeedback() : Promise.resolve(null);

        feedbackPromise
            .then(feedback => {
                ScreenState.set('talkAIFeedback', feedback);
                TalkEngine.stopSpeaking();
                TalkEngine.stopListening();
                ScreenState.set('talkSummary', TalkEngine.endSession());
                ScreenState.set('talkView', 'summary');
                renderTalk(container);
            })
            .catch(() => {
                ScreenState.set('talkAIFeedback', null);
                TalkEngine.stopSpeaking();
                TalkEngine.stopListening();
                ScreenState.set('talkSummary', TalkEngine.endSession());
                ScreenState.set('talkView', 'summary');
                renderTalk(container);
            });
    }

    container.querySelector('#talk-end')?.addEventListener('click', endCall);
    container.querySelector('#talk-end-top')?.addEventListener('click', endCall);

    // ── Start the conversation ──
    setTimeout(() => {
        setStatus('Connected!');
        if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
        setTimeout(() => mascotSpeak(scenario.opener), 500);
    }, 800);

    updateProgress();
}

// ═══════════════════════════════════════
// SCREEN 3: Post-Call Summary
// ═══════════════════════════════════════
function renderTalkSummary(container) {
    const summary = ScreenState.get('talkSummary', {});
    const feedback = ScreenState.get('talkAIFeedback', null);
    const qualified = summary.qualifiedForRewards;
    const mins = Math.floor((summary.duration || 0) / 60);
    const secs = (summary.duration || 0) % 60;
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const isFirstSession = !LangyState.talkHistory || LangyState.talkHistory.length <= 1;
    const sessionCount = (LangyState.talkHistory || []).length || 1;
    const mascotId = summary.mascotId ?? LangyState.mascot?.selected ?? 0;
    const mascotName = summary.mascot || ['Zendaya', 'Travis', 'Matthew', 'Omar'][mascotId] || 'Your coach';
    const imgs = { 0: 'zendaya', 1: 'travis', 2: 'matthew', 3: 'omar' };
    const mascotColors = { 0: '#7C6CF6', 1: '#4ADE80', 2: '#F59E0B', 3: '#06B6D4' };
    const mascotColor = mascotColors[mascotId] || 'var(--primary)';

    // Structured vs plain feedback
    const isStructured = feedback && feedback._structured;
    const praise = isStructured ? feedback.praise : null;
    const corrections = isStructured ? (feedback.corrections || []) : [];
    const tip = isStructured ? feedback.tip : null;
    const plainFeedback = !isStructured && typeof feedback === 'string' ? feedback : null;

    // Pronunciation
    const pronLabels = { excellent: 'Excellent', good: 'Good', fair: 'Fair', needs_work: 'Needs Work' };
    const pronColors = { excellent: 'var(--primary)', good: '#4ADE80', fair: '#F59E0B', needs_work: '#EF4444' };
    const pronLevel = summary.pronunciationLevel || null;

    // Coaching next-step (personalized, not generic)
    const goal = LangyState.user?.goal || 'speak';
    const nextScenario = (() => {
        const scenarioSuggestions = {
            speak: { en: 'Coffee Shop', ru: 'Кофейня', es: 'Cafetería' },
            work: { en: 'Job Interview', ru: 'Собеседование', es: 'Entrevista' },
            travel: { en: 'At the Airport', ru: 'В аэропорту', es: 'En el aeropuerto' },
            exam: { en: 'Free Talk', ru: 'Свободный разговор', es: 'Charla libre' },
        };
        const current = summary.scenario || '';
        const suggestions = Object.values(scenarioSuggestions);
        const different = suggestions.find(s => s.en !== current) || suggestions[0];
        return different[lang];
    })();

    const nextStep = (() => {
        if (!qualified) {
            return {
                en: `Try talking a bit longer next time — ${mascotName} needs 3+ exchanges to give proper feedback.`,
                ru: `Попробуй поговорить дольше — ${mascotName} нужно 3+ реплики для полноценного фидбэка.`,
                es: `Intenta hablar un poco más — ${mascotName} necesita 3+ intercambios para dar feedback.`,
            }[lang];
        }
        if (isFirstSession) {
            return {
                en: `Come back tomorrow and try "${nextScenario}" — ${mascotName} will remember your progress.`,
                ru: `Возвращайся завтра и попробуй «${nextScenario}» — ${mascotName} запомнит твой прогресс.`,
                es: `Vuelve mañana y prueba "${nextScenario}" — ${mascotName} recordará tu progreso.`,
            }[lang];
        }
        if (corrections.length === 0) {
            return {
                en: `You nailed it! Try "${nextScenario}" next — ${mascotName} thinks you're ready for a challenge.`,
                ru: `Безупречно! Попробуй «${nextScenario}» — ${mascotName} считает, что ты готов к вызову.`,
                es: `¡Perfecto! Prueba "${nextScenario}" — ${mascotName} cree que estás listo para más.`,
            }[lang];
        }
        return {
            en: `Practice the corrections above, then try again — ${mascotName} will check your progress.`,
            ru: `Запомни исправления выше и попробуй ещё — ${mascotName} проверит твой прогресс.`,
            es: `Practica las correcciones y vuelve a intentar — ${mascotName} revisará tu progreso.`,
        }[lang];
    })();

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div style="padding: var(--sp-5) var(--sp-5) var(--sp-4); overflow-y:auto; flex:1;">

                <!-- Coach Header -->
                <div style="text-align:center; margin-bottom:var(--sp-5); animation:fadeInUp 0.5s var(--ease-out);">
                    <div style="position:relative; display:inline-block; margin-bottom:var(--sp-3);">
                        <div style="width:72px; height:72px; border-radius:50%; overflow:hidden; margin:0 auto;
                                    border:3px solid ${mascotColor}; box-shadow:0 4px 20px ${mascotColor}33;">
                            <img src="assets/mascots/${imgs[mascotId]}.png" alt="${mascotName}"
                                 style="width:100%; height:100%; object-fit:contain;"
                                 onerror="this.parentElement.innerHTML='<span style=font-size:32px>${mascotName[0]}</span>'">
                        </div>
                        <div style="position:absolute; bottom:-4px; right:-4px; width:24px; height:24px;
                                    border-radius:50%; background:var(--primary); color:white;
                                    display:flex; align-items:center; justify-content:center; font-size:14px;
                                    box-shadow:var(--shadow-sm);">
                            ${qualified ? LangyIcons.check : LangyIcons.messageCircle}
                        </div>
                    </div>
                    <div style="font-size:var(--fs-xs); color:${mascotColor}; font-weight:var(--fw-bold); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:var(--sp-1);">
                        ${{ en: `Session #${sessionCount}`, ru: `Сессия #${sessionCount}`, es: `Sesión #${sessionCount}` }[lang]}
                    </div>
                    <h2 style="font-size:var(--fs-xl); margin-bottom:var(--sp-1);">${{
                        en: `${mascotName}'s notes`,
                        ru: `Заметки от ${mascotName}`,
                        es: `Notas de ${mascotName}`,
                    }[lang]}</h2>
                    <p style="color:var(--text-tertiary); font-size:var(--fs-sm);">
                        ${mins}:${secs.toString().padStart(2, '0')} · ${summary.turns || 0} ${{ en: 'exchanges', ru: 'реплик', es: 'intercambios' }[lang]}
                    </p>
                </div>

                ${praise ? `
                <!-- What you did well -->
                <div style="padding:var(--sp-4); margin-bottom:var(--sp-3); border-radius:var(--radius-md);
                    background:linear-gradient(135deg, ${mascotColor}08, ${mascotColor}04);
                    border:1px solid ${mascotColor}20; animation:fadeInUp 0.5s var(--ease-out) 0.1s both;">
                    <div style="display:flex; align-items:flex-start; gap:var(--sp-3);">
                        <div style="width:32px; height:32px; border-radius:50%; background:${mascotColor}15;
                                    display:flex; align-items:center; justify-content:center; flex-shrink:0;
                                    color:${mascotColor}; font-size:16px;">
                            ${LangyIcons.sparkles}
                        </div>
                        <div>
                            <div style="font-weight:var(--fw-bold); font-size:var(--fs-sm); color:${mascotColor}; margin-bottom:4px;">
                                ${{ en: 'What you did well', ru: 'Что получилось', es: 'Lo que hiciste bien' }[lang]}
                            </div>
                            <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin:0; line-height:1.6;">
                                ${escapeHTML(praise)}
                            </p>
                        </div>
                    </div>
                </div>
                ` : ''}

                ${corrections.length > 0 ? `
                <!-- Corrections -->
                <div style="padding:var(--sp-4); margin-bottom:var(--sp-3); border-radius:var(--radius-md);
                    background:var(--bg-card); border:1px solid var(--border);
                    animation:fadeInUp 0.5s var(--ease-out) 0.2s both;">
                    <div style="font-weight:var(--fw-bold); font-size:var(--fs-sm); margin-bottom:var(--sp-3); display:flex; align-items:center; gap:8px;">
                        <div style="width:32px; height:32px; border-radius:50%; background:rgba(245,158,11,0.1);
                                    display:flex; align-items:center; justify-content:center; flex-shrink:0;
                                    color:#F59E0B; font-size:16px;">
                            ${LangyIcons.pencil}
                        </div>
                        ${{ en: 'Key corrections', ru: 'Исправления', es: 'Correcciones clave' }[lang]}
                    </div>
                    ${corrections.map(c => `
                        <div style="padding:var(--sp-3); margin-bottom:var(--sp-2); border-radius:var(--radius-sm);
                                    background:var(--bg-alt);">
                            <div style="display:flex; align-items:center; gap:var(--sp-2); margin-bottom:6px;">
                                <span style="color:var(--danger); font-size:var(--fs-sm); text-decoration:line-through; opacity:0.7;">${escapeHTML(c.said || '')}</span>
                            </div>
                            <div style="display:flex; align-items:center; gap:var(--sp-2); margin-bottom:4px;">
                                <span style="color:var(--primary); font-size:13px;">→</span>
                                <span style="color:var(--primary); font-size:var(--fs-sm); font-weight:var(--fw-bold);">${escapeHTML(c.better || '')}</span>
                            </div>
                            ${c.why ? `<div style="font-size:var(--fs-xs); color:var(--text-tertiary); font-style:italic; padding-left:22px;">${escapeHTML(c.why)}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${tip ? `
                <!-- Coach tip -->
                <div style="padding:var(--sp-4); margin-bottom:var(--sp-3); border-radius:var(--radius-md);
                    background:rgba(124,108,246,0.04); border:1px solid rgba(124,108,246,0.15);
                    animation:fadeInUp 0.5s var(--ease-out) 0.3s both;">
                    <div style="display:flex; align-items:flex-start; gap:var(--sp-3);">
                        <div style="width:32px; height:32px; border-radius:50%; background:rgba(124,108,246,0.1);
                                    display:flex; align-items:center; justify-content:center; flex-shrink:0;
                                    color:#7C6CF6; font-size:16px;">
                            ${LangyIcons.brain}
                        </div>
                        <div>
                            <div style="font-weight:var(--fw-bold); font-size:var(--fs-sm); color:#7C6CF6; margin-bottom:4px;">
                                ${{ en: `${mascotName}'s tip`, ru: `Совет от ${mascotName}`, es: `Consejo de ${mascotName}` }[lang]}
                            </div>
                            <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin:0; line-height:1.6;">
                                ${escapeHTML(tip)}
                            </p>
                        </div>
                    </div>
                </div>
                ` : ''}

                ${plainFeedback ? `
                <div style="padding:var(--sp-4); margin-bottom:var(--sp-3); border-radius:var(--radius-md);
                    border-left:3px solid #7C6CF6; background:rgba(124,108,246,0.04);">
                    <div style="display:flex; align-items:flex-start; gap:var(--sp-3);">
                        <span style="color:#7C6CF6; font-size:20px; flex-shrink:0;">${LangyIcons.brain}</span>
                        <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin:0; line-height:1.6;">
                            ${escapeHTML(plainFeedback)}
                        </p>
                    </div>
                </div>
                ` : ''}

                ${pronLevel ? `
                <div style="display:flex; align-items:center; gap:var(--sp-3); padding:var(--sp-3) var(--sp-4);
                    background:var(--bg-card); border-radius:var(--radius-md); margin-bottom:var(--sp-3);
                    border:1px solid var(--border); animation:fadeInUp 0.5s var(--ease-out) 0.35s both;">
                    <span style="color:${pronColors[pronLevel]}; font-size:18px;">${LangyIcons.mic}</span>
                    <span style="font-size:var(--fs-sm); color:var(--text-secondary);">
                        ${{ en: 'Pronunciation', ru: 'Произношение', es: 'Pronunciación' }[lang]}
                    </span>
                    <span style="margin-left:auto; font-weight:var(--fw-bold); color:${pronColors[pronLevel]};">
                        ${Math.round((summary.avgPronunciation || 0) * 100)}% · ${pronLabels[pronLevel]}
                    </span>
                </div>
                ` : ''}

                ${!isFirstSession && qualified && (summary.xpEarned || summary.dangyEarned) ? `
                <div style="display:flex; align-items:center; gap:var(--sp-3); padding:var(--sp-3) var(--sp-4);
                    background:var(--bg-card); border-radius:var(--radius-md); margin-bottom:var(--sp-3);
                    border:1px solid var(--border);">
                    <span style="color:var(--reward-gold); font-size:18px;">${LangyIcons.zap}</span>
                    <span style="font-size:var(--fs-sm); color:var(--text-secondary);">
                        ${{ en: 'Earned', ru: 'Получено', es: 'Ganado' }[lang]}
                    </span>
                    <span style="margin-left:auto; font-size:var(--fs-sm); color:var(--text-secondary);">
                        <strong style="color:var(--reward-gold);">+${summary.xpEarned || 0}</strong> XP
                        ${summary.dangyEarned ? ` · <strong style="color:var(--info);">+${summary.dangyEarned}</strong> Dangy` : ''}
                    </span>
                </div>
                ` : ''}

                <!-- Next step (coaching CTA) -->
                <div style="text-align:center; padding:var(--sp-4) var(--sp-3); margin:var(--sp-2) 0 var(--sp-4);
                    background:linear-gradient(135deg, var(--primary-bg), rgba(16,185,129,0.03));
                    border-radius:var(--radius-md); border:1px dashed var(--primary);
                    animation:fadeInUp 0.5s var(--ease-out) 0.4s both;">
                    <div style="font-weight:var(--fw-bold); font-size:var(--fs-sm); color:var(--primary); margin-bottom:var(--sp-2); display:flex; align-items:center; justify-content:center; gap:6px;">
                        ${LangyIcons.target} ${{ en: 'Your next step', ru: 'Твой следующий шаг', es: 'Tu siguiente paso' }[lang]}
                    </div>
                    <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin:0; max-width:300px; margin-left:auto; margin-right:auto; line-height:1.5;">
                        ${nextStep}
                    </p>
                </div>

                ${(() => {
                    const _isCoach = ['coach', 'pro', 'premium'].includes(LangyState.subscription?.plan);
                    // Coach: rich memory card via CoachIntel
                    if (_isCoach && typeof CoachIntel !== 'undefined') {
                        return CoachIntel.renderSummaryMemory(corrections, lang);
                    }
                    // Free: soft coach prompt on session 2+ only
                    if (!_isCoach && !isFirstSession && sessionCount >= 2 && qualified) {
                        const firstWhy = corrections.length > 0 && corrections[0].why ? corrections[0].why : null;
                        const _promptText = firstWhy
                            ? {
                                en: `You made corrections in ${firstWhy} today. With Coach, your AI would track this across sessions and build targeted practice.`,
                                ru: `Сегодня были исправления: ${firstWhy}. С Coach твой ИИ будет отслеживать это между сессиями и создавать целенаправленную практику.`,
                                es: `Hoy hubo correcciones en ${firstWhy}. Con Coach, tu IA rastreará esto entre sesiones y creará práctica enfocada.`,
                            }[lang]
                            : {
                                en: `You've completed ${sessionCount} sessions. With Coach, your AI would remember all of them and help you improve faster.`,
                                ru: `Ты завершил ${sessionCount} сессий. С Coach твой ИИ запомнит их все и поможет прогрессировать быстрее.`,
                                es: `Has completado ${sessionCount} sesiones. Con Coach, tu IA recordaría todas y te ayudaría a mejorar más rápido.`,
                            }[lang];
                        return `
                <div id="coach-upsell" style="padding:var(--sp-4); margin-bottom:var(--sp-3); border-radius:var(--radius-md);
                    background:var(--bg-card); border-left:3px solid var(--primary);
                    animation:fadeInUp 0.5s var(--ease-out) 0.45s both; cursor:pointer;"
                    onclick="Router.navigate('subscription')">
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:var(--sp-2);">
                        <span style="color:var(--primary); font-size:16px;">${LangyIcons.brain}</span>
                        <span style="font-weight:var(--fw-bold); font-size:var(--fs-sm); color:var(--primary);">
                            ${{ en: 'Session insight', ru: 'Наблюдение', es: 'Observación' }[lang]}
                        </span>
                    </div>
                    <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin:0 0 var(--sp-2); line-height:1.5;">
                        ${_promptText}
                    </p>
                    <span style="font-size:var(--fs-xs); color:var(--primary); font-weight:var(--fw-bold);">
                        ${{ en: 'Learn more →', ru: 'Подробнее →', es: 'Más info →' }[lang]}
                    </span>
                </div>`;
                    }
                    return '';
                })()}

                <!-- Actions -->
                <div style="display:flex; gap:var(--sp-2); margin-bottom:var(--sp-3);">
                    <button class="btn btn--primary btn--full" id="talk-again">
                        ${LangyIcons.refreshCw} ${isFirstSession
                            ? { en: 'Try another topic', ru: 'Другая тема', es: 'Otro tema' }[lang]
                            : { en: 'Talk Again', ru: 'Ещё раз', es: 'Hablar de nuevo' }[lang]}
                    </button>
                </div>
                <button class="btn btn--ghost btn--full" id="talk-done">
                    ${{ en: 'Done for now', ru: 'На этом всё', es: 'Listo por ahora' }[lang]}
                </button>
            </div>
        </div>
    `;

    if (qualified && typeof AudioUtils !== 'undefined') AudioUtils.playVictory();

    container.querySelector('#talk-again')?.addEventListener('click', () => {
        if (isFirstSession) {
            ScreenState.set('talkView', 'select');
        } else {
            ScreenState.set('talkView', 'call');
        }
        renderTalk(container);
    });

    container.querySelector('#talk-done')?.addEventListener('click', () => {
        ScreenState.remove('talkView');
        Router.navigate('home');
    });
}

Router.register('talk', renderTalk);

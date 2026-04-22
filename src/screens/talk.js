/* ============================================
   SCREEN: LANGY TALK — Voice Conversation v2
   Real-time voice chat with mascot tutors
   ============================================ */

function renderTalk(container) {
    if (ScreenState.get('talkView') === 'call') {
        renderTalkCall(container);
    } else if (ScreenState.get('talkView') === 'summary') {
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

    // Pronunciation display
    const pronLabels = { excellent: 'Excellent', good: 'Good', fair: 'Fair', needs_work: 'Needs Work' };
    const pronColors = { excellent: 'var(--primary)', good: '#4ADE80', fair: '#F59E0B', needs_work: '#EF4444' };
    const pronLevel = summary.pronunciationLevel || null;

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div style="padding: var(--sp-6) var(--sp-5); overflow-y:auto; flex:1;">

                <!-- Result Header -->
                <div style="text-align:center; margin-bottom:var(--sp-6);">
                    <div style="font-size:56px; margin-bottom:var(--sp-2); color:${qualified ? 'var(--reward-gold)' : 'var(--text-tertiary)'};">
                        ${qualified ? LangyIcons.trophy : LangyIcons.messageCircle}
                    </div>
                    <h2>${qualified ? 'Great Conversation!' : 'Keep Practicing!'}</h2>
                    <p style="color:var(--text-secondary); margin-top:var(--sp-1);">
                        ${
                            qualified
                                ? `You talked with ${summary.mascot || 'your mascot'} about ${summary.scenario || 'English'}`
                                : summary.reason || 'Have a longer conversation to earn rewards'
                        }
                    </p>
                </div>

                <!-- Stats Grid -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--sp-3); margin-bottom:var(--sp-5);">
                    <div class="card" style="text-align:center; padding:var(--sp-4);">
                        <div style="font-size:28px; font-weight:var(--fw-black); color:var(--primary);">${mins}:${secs.toString().padStart(2, '0')}</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">${LangyIcons.clock} Duration</div>
                    </div>
                    <div class="card" style="text-align:center; padding:var(--sp-4);">
                        <div style="font-size:28px; font-weight:var(--fw-black); color:var(--accent-dark);">${summary.turns || 0}</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">${LangyIcons.messageCircle} Your Turns</div>
                    </div>
                    ${
                        qualified
                            ? `
                    <div class="card" style="text-align:center; padding:var(--sp-4);">
                        <div style="font-size:28px; font-weight:var(--fw-black); color:var(--reward-gold);">+${summary.xpEarned || 0}</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">${LangyIcons.zap} XP Earned</div>
                    </div>
                    <div class="card" style="text-align:center; padding:var(--sp-4);">
                        <div style="font-size:28px; font-weight:var(--fw-black); color:var(--info);">+${summary.dangyEarned || 0}</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">${LangyIcons.diamond} Dangy</div>
                    </div>
                    `
                            : ''
                    }
                </div>

                ${
                    qualified
                        ? `
                <!-- Skills Improved -->
                <div class="card" style="padding:var(--sp-4); margin-bottom:var(--sp-4); background:linear-gradient(135deg, rgba(16,185,129,0.04), rgba(74,222,128,0.04)); border: 1px solid rgba(16,185,129,0.15);">
                    <h4 style="margin-bottom:var(--sp-2); display:flex; align-items:center; gap:8px;">
                        <span style="color:var(--primary);">${LangyIcons.trendingUp}</span> Skills Improved
                    </h4>
                    <div style="display:flex; gap:var(--sp-3);">
                        <div class="badge badge--accent">${LangyIcons.mic} Speaking</div>
                        <div class="badge badge--primary">${LangyIcons.headphones} Listening</div>
                    </div>
                </div>
                `
                        : `
                <!-- Tip for unqualified -->
                <div class="card" style="padding:var(--sp-4); margin-bottom:var(--sp-4); border: 1px solid rgba(245,158,11,0.2); background:rgba(245,158,11,0.04);">
                    <div style="display:flex; align-items:flex-start; gap:var(--sp-3);">
                        <span style="color:#F59E0B; flex-shrink:0;">${LangyIcons.zap}</span>
                        <div>
                            <div style="font-weight:var(--fw-semibold); font-size:var(--fs-sm);">Tip</div>
                            <div style="font-size:var(--fs-xs); color:var(--text-secondary); margin-top:2px;">
                                Tap the mic button and try answering your partner's questions. Have at least 3 exchanges to earn rewards!
                            </div>
                        </div>
                    </div>
                </div>
                `
                }

                ${
                    pronLevel
                        ? `
                <!-- Pronunciation -->
                <div class="card" style="padding:var(--sp-4); margin-bottom:var(--sp-4);">
                    <h4 style="margin-bottom:var(--sp-2); display:flex; align-items:center; gap:8px;">
                        <span style="color:${pronColors[pronLevel]};">${LangyIcons.mic}</span> Pronunciation
                    </h4>
                    <div style="display:flex; align-items:center; gap:var(--sp-3);">
                        <div style="font-size:28px; font-weight:var(--fw-black); color:${pronColors[pronLevel]};">${Math.round((summary.avgPronunciation || 0) * 100)}%</div>
                        <div>
                            <div style="font-weight:var(--fw-semibold); color:${pronColors[pronLevel]};">${pronLabels[pronLevel]}</div>
                            <div style="font-size:var(--fs-xs); color:var(--text-tertiary);">Speech clarity</div>
                        </div>
                    </div>
                </div>
                `
                        : ''
                }

                ${
                    feedback
                        ? `
                <!-- AI Feedback -->
                <div class="card" style="padding:var(--sp-4); margin-bottom:var(--sp-4); border:1px solid rgba(124,108,246,0.2); background:rgba(124,108,246,0.03);">
                    <h4 style="margin-bottom:var(--sp-2); display:flex; align-items:center; gap:8px;">
                        <span style="color:#7C6CF6;">${LangyIcons.brain}</span> AI Feedback
                    </h4>
                    <p style="font-size:var(--fs-sm); color:var(--text-secondary); line-height:1.6;">${escapeHTML(feedback)}</p>
                </div>
                `
                        : ''
                }

                <!-- Transcript Preview -->
                ${
                    summary.userMessages && summary.userMessages.length > 0
                        ? `
                <div class="card" style="padding:var(--sp-4); margin-bottom:var(--sp-4);">
                    <h4 style="margin-bottom:var(--sp-2);">Your Phrases</h4>
                    <div style="display:flex; flex-direction:column; gap:var(--sp-2); max-height:150px; overflow-y:auto;">
                        ${summary.userMessages
                            .slice(-5)
                            .map(
                                msg => `
                            <div style="font-size:var(--fs-sm); color:var(--text-secondary); padding:var(--sp-2); background:var(--bg-alt); border-radius:var(--radius-md);">
                                "${escapeHTML(msg)}"
                            </div>
                        `
                            )
                            .join('')}
                    </div>
                </div>
                `
                        : ''
                }

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

    // Play victory sound ONLY if qualified
    if (qualified && typeof AudioUtils !== 'undefined') AudioUtils.playVictory();

    // Event handlers
    container.querySelector('#talk-again')?.addEventListener('click', () => {
        ScreenState.set('talkView', 'call');
        renderTalk(container);
    });

    container.querySelector('#talk-change')?.addEventListener('click', () => {
        ScreenState.set('talkView', 'select');
        renderTalk(container);
    });

    container.querySelector('#talk-done')?.addEventListener('click', () => {
        ScreenState.remove('talkView');
        Router.navigate('home');
    });
}

Router.register('talk', renderTalk);

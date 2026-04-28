/* ============================================
   SCREEN: HOME (Core Hub)
   ============================================ */

// Build dynamic week calendar from activeDays
function buildWeekDays() {
    const today = new Date();
    const dayNames_i18n = {
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    };
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const dayNames = dayNames_i18n[lang] || dayNames_i18n.en;
    const activeDays = LangyState.streakData.activeDays || [];
    const todayISO = today.toISOString().split('T')[0];

    // Get Monday of current week
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    let html = '';
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const iso = d.toISOString().split('T')[0];
        const dayName = dayNames[d.getDay()];
        const isDone = activeDays.includes(iso);
        const isToday = iso === todayISO;
        const isSunday = d.getDay() === 0;

        let stateClass = '';
        if (isDone) stateClass = 'streak-day--done';
        else if (isToday) stateClass = 'streak-day--active';

        const dot = isSunday && !isDone ? LangyIcons.gift : '';

        html += `<div class="streak-day ${stateClass}"><div class="streak-day__dot">${dot}</div><span>${dayName}</span></div>`;
    }
    return html;
}

function buildWeekProgress() {
    const today = new Date();
    const activeDays = LangyState.streakData.activeDays || [];

    // Get Monday of current week
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    let completed = 0;
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const iso = d.toISOString().split('T')[0];
        if (activeDays.includes(iso)) completed++;
    }
    return Math.round((completed / 7) * 100);
}

// Compact streak dots for inline row
function buildWeekDots() {
    const today = new Date();
    const activeDays = LangyState.streakData.activeDays || [];
    const todayISO = today.toISOString().split('T')[0];
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    let html = '';
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const iso = d.toISOString().split('T')[0];
        const isDone = activeDays.includes(iso);
        const isToday = iso === todayISO;

        let bg = 'var(--border-light)';
        if (isDone) bg = 'var(--primary)';
        else if (isToday) bg = 'var(--danger)';

        html += `<span style="width:8px; height:8px; border-radius:50%; background:${bg};${isToday && !isDone ? ' box-shadow:0 0 0 2px rgba(239,68,68,0.2);' : ''}"></span>`;
    }
    return html;
}

function renderHome(container) {
    const { currencies, streakData, user } = LangyState;
    if (typeof user.firstSessionCompleted !== 'boolean') {
        user.firstSessionCompleted = (LangyState.talkHistory || []).length > 0;
    }
    if (typeof user.firstSpeakingScenarioStarted !== 'boolean') {
        user.firstSpeakingScenarioStarted = user.firstSessionCompleted;
    }
    if (!user.firstSpeakingScenarioId) {
        user.firstSpeakingScenarioId = 'coffee';
    }

    const talkSessions = (LangyState.talkHistory || []).length;
    const isFirstJourney = !user.hasCompletedOnboarding && !user.firstSessionCompleted;
    const isBeforeFirstSession = !user.firstSessionCompleted;
    const isEarlyJourney = isFirstJourney || isBeforeFirstSession || talkSessions < 3;
    const firstScenario = user.firstSpeakingScenarioId || 'coffee';
    const nextScenarioByGoal = {
        speak: 'coffee',
        work: 'interview',
        travel: 'airport',
        exam: 'free',
    };
    const recommendedScenario = isBeforeFirstSession
        ? firstScenario
        : nextScenarioByGoal[user.goal] || 'coffee';

    container.innerHTML = `
        <div class="screen screen--no-pad home">
            <!-- Top Bar -->
            <div class="home__topbar">
                <div class="home__coins">
                    <div class="coin" id="coin-langy" style="cursor:pointer; transition:transform 0.2s;" onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'">
                        <div class="coin__icon coin__icon--gold" style="color:white; font-size:12px;">${LangyIcons.coins}</div>
                        <span id="langy-count">${currencies.langy}</span>
                        <span style="color:var(--primary); font-weight:var(--fw-bold); margin-left:var(--sp-1);">+</span>
                    </div>
                    <div class="coin" id="coin-dangy" style="cursor:pointer; transition:transform 0.2s;" onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'">
                        <div class="coin__icon coin__icon--silver" style="color:white; font-size:12px;">${LangyIcons.diamond}</div>
                        <span id="dangy-count">${currencies.dangy}</span>
                        <span style="color:var(--primary); font-weight:var(--fw-bold); margin-left:var(--sp-1);">+</span>
                    </div>
                </div>
                <div class="header-stat" id="home-profile" title="Profile" style="width:40px;height:40px;border-radius:50%;background:var(--primary);display:flex;align-items:center;justify-content:center;color:white;cursor:pointer;font-weight:var(--fw-black);font-size:var(--fs-lg);">
                ${(user.name || 'U')[0].toUpperCase()}
            </div>
            </div>

            <!-- Hero Stage -->
            <div class="home__stage">
                <!-- Mascot Stage -->
                <div class="home__mascot-stage" id="home-mascot">
                    <img 
                        id="mascot-img"
                        src="assets/mascots/${['zendaya', 'travis', 'matthew', 'omar'][LangyState.mascot.selected || 0]}.png" 
                        alt="Langy Mascot" 
                        style="width: 100%; height: 100%; object-fit: contain; transform: scale(1.1); animation: mascotIdle 4s ease-in-out infinite;"
                    >
                    <!-- Speech Bubble -->
                    <div class="mascot-bubble" id="mascot-bubble" style="display:none;">
                        <span id="mascot-bubble-text"></span>
                    </div>
                    <!-- Tap zone -->
                    <div style="position:absolute; inset:0; z-index:10; cursor:pointer;" title="Tap to Talk!" id="mascot-tap-zone"></div>
                </div>

                <!-- Streak Row (minimal) -->
                <div class="home__streak-row" id="home-streak">
                    <span class="fire-animated ${streakData.days > 0 ? 'fire-animated--active' : 'fire-animated--inactive'}" style="font-size:18px;">${LangyIcons.flame}</span>
                    <span style="font-weight:var(--fw-black); font-size:var(--fs-md);">${streakData.days > 0 ? streakData.days : '0'}</span>
                    <div class="home__streak-dots">
                        ${buildWeekDots()}
                    </div>
                    <span style="color:var(--text-tertiary); font-size:var(--fs-xs); margin-left:auto;">${LangyIcons.arrow}</span>
                </div>
            </div>

            <!-- Next Action Zone -->
            <div class="home__next-action">
                ${
                    isEarlyJourney
                        ? `
                <div class="card" style="margin:0 var(--sp-5) var(--sp-3); padding:var(--sp-3) var(--sp-4); border:1px solid var(--border); background:var(--bg-card);">
                    <div style="display:flex; align-items:center; justify-content:space-between; gap:var(--sp-3);">
                        <div>
                            <div style="font-size:var(--fs-xs); color:var(--text-tertiary);">
                                ${isBeforeFirstSession
                                    ? ({ en: 'First speaking session', ru: 'Первая разговорная сессия', es: 'Primera sesión de speaking' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en'])
                                    : ({ en: 'First-week momentum', ru: 'Фокус первой недели', es: 'Impulso de la primera semana' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en'])}
                            </div>
                            <div style="font-weight:var(--fw-bold);">
                                ${isBeforeFirstSession
                                    ? ({ en: 'Step 1/3', ru: 'Шаг 1/3', es: 'Paso 1/3' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en'])
                                    : ({ en: `Session ${Math.max(1, talkSessions + 1)} of 3`, ru: `Сессия ${Math.max(1, talkSessions + 1)} из 3`, es: `Sesión ${Math.max(1, talkSessions + 1)} de 3` }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en'])}
                            </div>
                        </div>
                        <span style="font-size:var(--fs-xs); color:var(--text-tertiary);">${LangyIcons.target}</span>
                    </div>
                </div>
                `
                        : `
                ${typeof DailySpeaking !== 'undefined' && user.hasCompletedPlacement ? DailySpeaking.renderCard() : ''}
                `
                }

                <!-- Main CTA -->
                <div style="padding: 0 var(--sp-5) var(--sp-2);">
                    <button id="nav-learning" class="btn btn--primary btn--xl btn--full" style="font-size: var(--fs-lg); display: flex; align-items: center; justify-content: center; gap: var(--sp-2); flex-direction: ${user.hasCompletedPlacement ? 'column' : 'row'}; padding: ${user.hasCompletedPlacement ? '14px 24px' : ''};">
                        ${isEarlyJourney
                            ? `<div style="display:flex; align-items:center; gap:var(--sp-2);"><span style="font-size: 22px; display:flex;">${LangyIcons.mic}</span> ${
                                  isBeforeFirstSession
                                      ? ({ en: 'Start guided speaking', ru: 'Начать guided speaking', es: 'Iniciar speaking guiado' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en'])
                                      : ({ en: 'Do your next speaking session', ru: 'Сделать следующую разговорную сессию', es: 'Haz tu siguiente sesión de speaking' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en'])
                              }</div>
                               <div style="font-size:var(--fs-xs); opacity:0.8; font-weight:var(--fw-medium);">${
                                   isBeforeFirstSession
                                       ? ({ en: 'Short guided path', ru: 'Короткий guided путь', es: 'Ruta guiada corta' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en'])
                                       : ({ en: 'Keep momentum with one focused talk', ru: 'Сохрани темп: одна фокусная сессия', es: 'Mantén el ritmo con una sesión enfocada' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en'])
                               }</div>`
                            : !user.hasCompletedPlacement
                              ? i18n('learn.title') + ' ' + LangyIcons.fileText
                              : `<div style="display:flex; align-items:center; gap:var(--sp-2);"><span style="font-size: 22px; display:flex;">${LangyIcons.rocket}</span> ${i18n('home.continue')}</div><div style="font-size:var(--fs-xs); opacity:0.8; font-weight:var(--fw-medium);">${LangyState.progress.currentUnit || i18n('learn.next_lesson')}</div>`}
                    </button>
                </div>
            </div>

            <!-- Action Grid -->
            <div class="home__actions ${!user.hasCompletedPlacement ? 'home__actions--locked' : ''}">
                <div class="action-card ${!user.hasCompletedPlacement ? 'action-card--locked' : ''}" id="nav-homework">
                    <div class="action-card__icon action-card__icon--purple">${LangyIcons.book}</div>
                    <div class="action-card__title">${i18n('home.homework')} ${!user.hasCompletedPlacement ? LangyIcons.lock : ''}</div>
                    <div class="action-card__desc">${!user.hasCompletedPlacement ? LangyIcons.lock : i18n('home.homework_desc')}</div>
                </div>
                <div class="action-card ${!user.hasCompletedPlacement ? 'action-card--locked' : ''}" id="nav-tests">
                    <div class="action-card__icon action-card__icon--green">${LangyIcons.fileText}</div>
                    <div class="action-card__title">${i18n('home.tests')} ${!user.hasCompletedPlacement ? LangyIcons.lock : ''}</div>
                    <div class="action-card__desc">${!user.hasCompletedPlacement ? LangyIcons.lock : i18n('home.tests_desc')}</div>
                </div>
                <div class="action-card ${!user.hasCompletedPlacement ? 'action-card--locked' : ''}" id="nav-results">
                    <div class="action-card__icon action-card__icon--blue">${LangyIcons.barChart}</div>
                    <div class="action-card__title">Results ${!user.hasCompletedPlacement ? LangyIcons.lock : ''}</div>
                    <div class="action-card__desc">${!user.hasCompletedPlacement ? LangyIcons.lock : 'Course progress'}</div>
                </div>
                <div class="action-card ${!user.hasCompletedPlacement ? 'action-card--locked' : ''}" id="nav-daily">
                    <div class="action-card__icon action-card__icon--gold">${LangyIcons.target}</div>
                    <div class="action-card__title">${i18n('home.daily')} ${!user.hasCompletedPlacement ? LangyIcons.lock : ''}</div>
                    <div class="action-card__desc">${!user.hasCompletedPlacement ? LangyIcons.lock : i18n('home.events_desc')}</div>
                </div>
                <div class="action-card" id="nav-inventory">
                    <div class="action-card__icon action-card__icon--gold">${LangyIcons.briefcase}</div>
                    <div class="action-card__title">Inventory</div>
                    <div class="action-card__desc">Your items</div>
                </div>
                <div class="action-card" id="nav-duels">
                    <div class="action-card__icon" style="background:rgba(239,68,68,0.08); color:#EF4444;">${LangyIcons.swords}</div>
                    <div class="action-card__title">Duels</div>
                    <div class="action-card__desc">Compete</div>
                </div>
                <div class="action-card" id="nav-events">
                    <div class="action-card__icon" style="background:rgba(139,92,246,0.08); color:#8B5CF6;">${LangyIcons.sparkles}</div>
                    <div class="action-card__title">Events</div>
                    <div class="action-card__desc">Challenges</div>
                </div>
                <div class="action-card" id="nav-shop">
                    <div class="action-card__icon action-card__icon--blue">${LangyIcons.shoppingBag}</div>
                    <div class="action-card__title">Shop</div>
                    <div class="action-card__desc">Get rewards</div>
                </div>
            </div>
        </div>
    `;

    // Navigation handlers
    const navMap = {
        'nav-homework': 'homework',
        'nav-tests': 'tests',
        'nav-results': 'results',
        'nav-daily': 'daily',
        'nav-inventory': 'inventory',
        'nav-duels': 'duels',
        'nav-events': 'events',
        'nav-shop': 'shop',
        'home-profile': 'profile',
    };

    // Main CTA button
    container.querySelector('#nav-learning')?.addEventListener('click', e => {
        Anim.ripple(e);
        if (isEarlyJourney) {
            ScreenState.set('talkScenario', recommendedScenario);
            ScreenState.set('talkMascot', LangyState.mascot.selected || 0);
            if (isBeforeFirstSession) {
                ScreenState.set('firstTalkSession', true);
                ScreenState.remove('firstTalkStep');
                ScreenState.remove('firstTalkResponses');
            } else {
                ScreenState.remove('firstTalkSession');
                ScreenState.set('talkView', 'call');
            }
            Router.navigate('talk');
        } else if (!user.hasCompletedPlacement) {
            Router.navigate('placement-test');
        } else {
            const actionCards = container.querySelectorAll('.action-card');
            Anim.flyOut([...actionCards]);
            setTimeout(() => Router.navigate('learning'), 500);
        }
    });

    Object.entries(navMap).forEach(([id, route]) => {
        const el = container.querySelector(`#${id}`);
        if (el) {
            el.addEventListener('click', e => {
                if (!user.hasCompletedPlacement && ['homework', 'tests', 'results', 'daily'].includes(route)) {
                    Anim.showToast('Please complete your Placement Test first!');
                    setTimeout(() => Router.navigate('placement-test'), 1000);
                    return;
                }
                Anim.ripple(e);
                Router.navigate(route);
            });
        }
    });

    // Daily Speaking card → launch talk
    container.querySelector('#daily-speak-card')?.addEventListener('click', () => {
        if (typeof DailySpeaking !== 'undefined' && !DailySpeaking.isDoneToday()) {
            DailySpeaking.launchDaily();
        }
    });

    // Streak tap → overlay
    container.querySelector('#home-streak')?.addEventListener('click', () => {
        Router.navigate('streak');
    });

    // Buy currencies from main screen
    container.querySelector('#coin-langy')?.addEventListener('click', () => {
        Router.navigate('donation', { plan: 'langy_pack' });
    });
    container.querySelector('#coin-dangy')?.addEventListener('click', () => {
        Router.navigate('donation', { plan: 'dangy_pack' });
    });

    // Mascot tap → bounce reaction + speech bubble, then learning
    let mascotTapCount = 0;

    // Signature phrases come FIRST, then generic
    const mascotId = LangyState.mascot.selected || 0;
    const signaturePhrases = {
        3: ['Yellaaaaaaaaaa!', "Yella habibi, let's go!", 'Listen to my story...'],
        1: ["It's lit!", 'Straight up!', 'La Flame says LEARN!'],
        2: ['Alright, alright, alright.', "Just keep livin'.", "Let's get learnin'."],
        0: ['You look amazing today!', "Let's serve some English!", 'Slay this lesson!'],
    };
    const genericPhrases = [
        'Wanna chat?',
        'Tap again to talk!',
        "Let's have a conversation!",
        'Practice speaking with me!',
    ];
    // First tap = always signature, then mix
    let usedSignature = false;

    container.querySelector('#mascot-tap-zone')?.addEventListener('click', () => {
        mascotTapCount++;
        const img = container.querySelector('#mascot-img');
        const bubble = container.querySelector('#mascot-bubble');
        const bubbleText = container.querySelector('#mascot-bubble-text');

        let phrase;
        const sigs = signaturePhrases[mascotId] || [];
        if (!usedSignature && sigs.length > 0) {
            phrase = sigs[0]; // Always show THE signature phrase first
            usedSignature = true;
        } else {
            const allPhrases = [...sigs, ...genericPhrases];
            phrase = allPhrases[Math.floor(Math.random() * allPhrases.length)];
        }

        // Bounce animation
        if (img) {
            img.style.animation = 'none';
            img.offsetHeight; // trigger reflow
            img.style.animation = 'mascotBounce 0.6s ease';
            setTimeout(() => {
                img.style.animation = 'mascotIdle 4s ease-in-out infinite';
            }, 600);
        }

        // Show speech bubble
        if (bubble && bubbleText) {
            bubbleText.textContent = phrase;
            bubble.style.display = 'block';
            bubble.style.animation = 'none';
            bubble.offsetHeight;
            bubble.style.animation = 'bubblePop 0.4s ease-out';

            // Auto-hide after 2s
            clearTimeout(ScreenState.get('bubbleTimeout'));
            ScreenState.set(
                'bubbleTimeout',
                setTimeout(() => {
                    bubble.style.animation = 'bubbleFade 0.3s ease-in forwards';
                    setTimeout(() => {
                        bubble.style.display = 'none';
                    }, 300);
                }, 2000)
            );
        }

        // On second tap → go to Langy Talk
        if (mascotTapCount >= 2) {
            mascotTapCount = 0;
            ScreenState.set('talkMascot', mascotId); // Pre-select current mascot
            ScreenState.remove('talkView'); // Start at selection screen
            const actionCards = container.querySelectorAll('.action-card');
            Anim.flyOut([...actionCards]);
            setTimeout(() => Router.navigate('talk'), 500);
        }
    });

    // Animate entry
    if (!isEarlyJourney) {
        setTimeout(() => {
            Anim.staggerChildren(container, '.action-card', 80);
        }, 100);
    }

    // Pull-to-refresh
    const homeScreen = container.querySelector('.home');
    if (homeScreen && typeof Anim !== 'undefined') {
        Anim.initPullToRefresh(homeScreen, () => {
            return new Promise(resolve => {
                renderHome(container);
                resolve();
            });
        });
    }

    // ─── First-Time Onboarding Tooltips ───
    if (!isEarlyJourney && !localStorage.getItem('langy_onboarding_done')) {
        setTimeout(() => showOnboardingTooltips(container), 800);
    }
}

// ─── ONBOARDING TOOLTIP TOUR ───
function showOnboardingTooltips(container) {
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const tips = {
        en: [
            { sel: '.home__streak', text: 'This is your streak! Visit daily to keep it going.', pos: 'bottom' },
            { sel: '.action-card', text: 'Tap here to start your first lesson!', pos: 'top' },
            { sel: '#bottom-nav', text: 'Swipe or tap to navigate between screens.', pos: 'top' },
        ],
        ru: [
            { sel: '.home__streak', text: 'Это твой стрик! Заходи каждый день, чтобы не потерять.', pos: 'bottom' },
            { sel: '.action-card', text: 'Нажми сюда, чтобы начать первый урок!', pos: 'top' },
            { sel: '#bottom-nav', text: 'Свайпай или нажимай для навигации.', pos: 'top' },
        ],
        es: [
            { sel: '.home__streak', text: '¡Esta es tu racha! Entra cada día para mantenerla.', pos: 'bottom' },
            { sel: '.action-card', text: '¡Toca aquí para empezar tu primera lección!', pos: 'top' },
            { sel: '#bottom-nav', text: 'Desliza o toca para navegar entre pantallas.', pos: 'top' },
        ],
    };

    const localTips = tips[lang] || tips.en;
    const currentTip = 0;

    function showTip(idx) {
        // Remove previous
        document.querySelectorAll('.onboarding-tooltip, .onboarding-overlay').forEach(e => e.remove());

        if (idx >= localTips.length) {
            localStorage.setItem('langy_onboarding_done', '1');
            return;
        }

        const tip = localTips[idx];
        const target = document.querySelector(tip.sel);
        if (!target) {
            showTip(idx + 1);
            return;
        }

        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'onboarding-overlay';
        document.body.appendChild(overlay);

        // Tooltip
        const tooltip = document.createElement('div');
        tooltip.className = `onboarding-tooltip onboarding-tooltip--${tip.pos}`;

        const stepLabel =
            lang === 'ru'
                ? `${idx + 1} из ${localTips.length}`
                : lang === 'es'
                  ? `${idx + 1} de ${localTips.length}`
                  : `${idx + 1} of ${localTips.length}`;
        const nextLabel =
            idx < localTips.length - 1
                ? lang === 'ru'
                    ? 'Далее'
                    : lang === 'es'
                      ? 'Siguiente'
                      : 'Next'
                : lang === 'ru'
                  ? 'Готово!'
                  : lang === 'es'
                    ? '¡Listo!'
                    : 'Done!';

        tooltip.innerHTML = `
            <div class="onboarding-tooltip__text">${tip.text}</div>
            <div class="onboarding-tooltip__footer">
                <span class="onboarding-tooltip__step">${stepLabel}</span>
                <button class="onboarding-tooltip__btn">${nextLabel}</button>
            </div>
        `;
        document.body.appendChild(tooltip);

        // Position tooltip near target
        const rect = target.getBoundingClientRect();
        if (tip.pos === 'bottom') {
            tooltip.style.top = `${rect.bottom + 12}px`;
        } else {
            tooltip.style.bottom = `${window.innerHeight - rect.top + 12}px`;
        }
        tooltip.style.left = `${Math.max(16, Math.min(rect.left, window.innerWidth - 300))}px`;

        // Highlight target
        target.style.position = 'relative';
        target.style.zIndex = '10001';

        // Next button
        tooltip.querySelector('.onboarding-tooltip__btn').addEventListener('click', () => {
            target.style.zIndex = '';
            Anim.haptic('light');
            showTip(idx + 1);
        });

        // Clicking overlay skips all
        overlay.addEventListener('click', () => {
            target.style.zIndex = '';
            document.querySelectorAll('.onboarding-tooltip, .onboarding-overlay').forEach(e => e.remove());
            localStorage.setItem('langy_onboarding_done', '1');
        });
    }

    showTip(0);
}

Router.register('home', renderHome);

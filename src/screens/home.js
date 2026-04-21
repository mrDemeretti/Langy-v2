/* ============================================
   SCREEN: HOME (Core Hub)
   ============================================ */

// Build dynamic week calendar from activeDays
function buildWeekDays() {
    const today = new Date();
    const dayNames_i18n = {
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
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

function renderHome(container) {
    const { currencies, streakData, user } = LangyState;

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

            <!-- Center Area with Mascot and Side Icons -->
            <div class="home__center">
                <!-- Left Side Icons -->
                <div class="home__side-icons home__side-icons--left">
                    <div class="circle-btn" id="nav-inventory" title="Inventory" style="color:#F59E0B;">
                        ${LangyIcons.briefcase}
                    </div>
                    <div class="circle-btn" id="nav-events" title="Events" style="color:#8B5CF6;">
                        ${LangyIcons.sparkles}
                    </div>
                </div>

                <!-- Mascot Area (Dynamic PNG fallback) -->
                <div class="home__mascot-area" id="home-mascot" style="position:relative; display:flex; justify-content:center; align-items:center;">
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
                    <!-- Transparent overlay to safely capture clicks -->
                    <div style="position:absolute; inset:0; z-index:10; cursor:pointer;" title="Tap to Talk!" id="mascot-tap-zone"></div>
                </div>

                <!-- Right Side Icons -->
                <div class="home__side-icons home__side-icons--right">
                    <div class="circle-btn" id="nav-duels" title="Duels" style="color:#EF4444;">
                        ${LangyIcons.swords}
                    </div>
                    <div class="circle-btn" id="nav-shop" title="Shop" style="color:#3B82F6;">
                        ${LangyIcons.shoppingBag}
                    </div>
                </div>
            </div>

            <!-- Streak Block -->
            <div class="home__streak" id="home-streak">
                <div class="home__streak-top">
                    <div class="home__streak-header">
                        <span class="fire-animated ${streakData.days > 0 ? 'fire-animated--active' : 'fire-animated--inactive'}">${LangyIcons.flame}</span>
                        <span style="font-size: var(--fs-lg); font-weight: var(--fw-black);">${streakData.days > 0 ? streakData.days + ' ' + i18n('home.streak') : i18n('general.start') + '!'}</span>
                    </div>
                    <div class="badge badge--accent">${i18n('general.details')} ${LangyIcons.arrow}</div>
                </div>
                
                <div class="streak-week">
                    <div class="streak-week__track">
                        <div class="streak-week__fill" style="width: ${buildWeekProgress()}%;"></div>
                    </div>
                    <div class="streak-week__days">
                        ${buildWeekDays()}
                    </div>
                </div>
            </div>

            <!-- Main CTA -->
            <div class="home__main-cta" style="padding: 0 var(--sp-5) var(--sp-2);">
                <button id="nav-learning" class="btn btn--primary btn--xl btn--full" style="box-shadow: 0 4px 0 var(--primary-dark), 0 8px 16px rgba(16, 185, 129, 0.2); font-size: var(--fs-lg); display: flex; align-items: center; justify-content: center; gap: var(--sp-2); flex-direction: ${user.hasCompletedPlacement ? 'column' : 'row'}; padding: ${user.hasCompletedPlacement ? '12px 24px' : ''};">
                    ${!user.hasCompletedPlacement ? i18n('learn.title') + ' ' + LangyIcons.fileText : `<div style="display:flex; align-items:center; gap:var(--sp-2);"><span style="font-size: 24px; display:flex;">${LangyIcons.rocket}</span> ${i18n('home.continue')}</div><div style="font-size:var(--fs-xs); opacity:0.85; font-weight:var(--fw-medium);">${LangyState.progress.currentUnit || i18n('learn.next_lesson')}</div>`}
                </button>
            </div>

            <!-- Action Buttons -->
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
    container.querySelector('#nav-learning')?.addEventListener('click', (e) => {
        Anim.ripple(e);
        if (!user.hasCompletedPlacement) {
            Router.navigate('placement-test');
        } else {
            const sideIcons = container.querySelectorAll('.circle-btn');
            const actionCards = container.querySelectorAll('.action-card, .home__main-cta');
            Anim.flyOut([...sideIcons, ...actionCards]);
            setTimeout(() => Router.navigate('learning'), 500);
        }
    });

    Object.entries(navMap).forEach(([id, route]) => {
        const el = container.querySelector(`#${id}`);
        if (el) {
            el.addEventListener('click', (e) => {
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
        3: ["Yellaaaaaaaaaa!", "Yella habibi, let's go!", "Listen to my story..."],
        1: ["It's lit!", "Straight up!", "La Flame says LEARN!"],
        2: ["Alright, alright, alright.", "Just keep livin'.", "Let's get learnin'."],
        0: ["You look amazing today!", "Let's serve some English!", "Slay this lesson!"],
    };
    const genericPhrases = [
        "Wanna chat?",
        "Tap again to talk!",
        "Let's have a conversation!",
        "Practice speaking with me!",
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
            clearTimeout(window._bubbleTimeout);
            window._bubbleTimeout = setTimeout(() => {
                bubble.style.animation = 'bubbleFade 0.3s ease-in forwards';
                setTimeout(() => { bubble.style.display = 'none'; }, 300);
            }, 2000);
        }

        // On second tap → go to Langy Talk
        if (mascotTapCount >= 2) {
            mascotTapCount = 0;
            window._talkMascot = mascotId;  // Pre-select current mascot
            window._talkView = null;  // Start at selection screen
            const sideIcons = container.querySelectorAll('.circle-btn');
            const actionCards = container.querySelectorAll('.action-card');
            Anim.flyOut([...sideIcons, ...actionCards]);
            setTimeout(() => Router.navigate('talk'), 500);
        }
    });

    // Animate entry
    setTimeout(() => {
        Anim.staggerChildren(container, '.action-card, .circle-btn', 80);
    }, 100);

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
    if (!localStorage.getItem('langy_onboarding_done')) {
        setTimeout(() => showOnboardingTooltips(container), 800);
    }
}

// ─── ONBOARDING TOOLTIP TOUR ───
function showOnboardingTooltips(container) {
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const tips = {
        en: [
            { sel: '.home__streak', text: 'This is your streak! Visit daily to keep it going 🔥', pos: 'bottom' },
            { sel: '.action-card', text: 'Tap here to start your first lesson! 📚', pos: 'top' },
            { sel: '#bottom-nav', text: 'Swipe or tap to navigate between screens ←→', pos: 'top' },
        ],
        ru: [
            { sel: '.home__streak', text: 'Это твой стрик! Заходи каждый день, чтобы не потерять 🔥', pos: 'bottom' },
            { sel: '.action-card', text: 'Нажми сюда, чтобы начать первый урок! 📚', pos: 'top' },
            { sel: '#bottom-nav', text: 'Свайпай или нажимай для навигации ←→', pos: 'top' },
        ],
        es: [
            { sel: '.home__streak', text: '¡Esta es tu racha! Entra cada día para mantenerla 🔥', pos: 'bottom' },
            { sel: '.action-card', text: '¡Toca aquí para empezar tu primera lección! 📚', pos: 'top' },
            { sel: '#bottom-nav', text: 'Desliza o toca para navegar entre pantallas ←→', pos: 'top' },
        ]
    };

    const localTips = tips[lang] || tips.en;
    let currentTip = 0;

    function showTip(idx) {
        // Remove previous
        document.querySelectorAll('.onboarding-tooltip, .onboarding-overlay').forEach(e => e.remove());
        
        if (idx >= localTips.length) {
            localStorage.setItem('langy_onboarding_done', '1');
            return;
        }

        const tip = localTips[idx];
        const target = document.querySelector(tip.sel);
        if (!target) { showTip(idx + 1); return; }

        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'onboarding-overlay';
        document.body.appendChild(overlay);

        // Tooltip
        const tooltip = document.createElement('div');
        tooltip.className = `onboarding-tooltip onboarding-tooltip--${tip.pos}`;
        
        const stepLabel = lang === 'ru' ? `${idx + 1} из ${localTips.length}` 
                        : lang === 'es' ? `${idx + 1} de ${localTips.length}` 
                        : `${idx + 1} of ${localTips.length}`;
        const nextLabel = idx < localTips.length - 1 
                        ? (lang === 'ru' ? 'Далее' : lang === 'es' ? 'Siguiente' : 'Next')
                        : (lang === 'ru' ? 'Готово!' : lang === 'es' ? '¡Listo!' : 'Done!');
        
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

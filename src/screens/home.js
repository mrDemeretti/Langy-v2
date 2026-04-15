/* ============================================
   SCREEN: HOME (Core Hub)
   ============================================ */

function renderHome(container) {
    const { currencies, streakData, user } = LangyState;

    container.innerHTML = `
        <div class="screen screen--no-pad home">
            <!-- Top Bar -->
            <div class="home__topbar">
                <div class="home__coins">
                    <div class="coin" id="coin-langy" style="cursor:pointer; transition:transform 0.2s;" onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'">
                        <div class="coin__icon coin__icon--gold">L</div>
                        <span id="langy-count">${currencies.langy}</span>
                        <span style="color:var(--primary); font-weight:var(--fw-bold); margin-left:var(--sp-1);">+</span>
                    </div>
                    <div class="coin" id="coin-dangy" style="cursor:pointer; transition:transform 0.2s;" onmousedown="this.style.transform='scale(0.95)'" onmouseup="this.style.transform='scale(1)'">
                        <div class="coin__icon coin__icon--silver">D</div>
                        <span id="dangy-count">${currencies.dangy}</span>
                        <span style="color:var(--primary); font-weight:var(--fw-bold); margin-left:var(--sp-1);">+</span>
                    </div>
                </div>
                <div class="avatar" id="home-profile" title="Profile">${user.avatar}</div>
            </div>

            <!-- Center Area with Mascot and Side Icons -->
            <div class="home__center">
                <!-- Left Side Icons -->
                <div class="home__side-icons home__side-icons--left">
                    <div class="circle-btn" id="nav-inventory" title="Inventory">
                        🎒
                    </div>
                    <div class="circle-btn" id="nav-events" title="Events">
                        🎉
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
                    <div style="position:absolute; inset:0; z-index:10; cursor:pointer;" title="Tap to Learn!" id="mascot-tap-zone"></div>
                </div>

                <!-- Right Side Icons -->
                <div class="home__side-icons home__side-icons--right">
                    <div class="circle-btn" id="nav-duels" title="Duels">
                        ⚔️
                    </div>
                    <div class="circle-btn" id="nav-shop" title="Shop">
                        🛍️
                    </div>
                </div>
            </div>

            <!-- Streak Block -->
            <div class="home__streak" id="home-streak">
                <div class="home__streak-top">
                    <div class="home__streak-header">
                        <span class="fire-animated">🔥</span>
                        <span style="font-size: var(--fs-lg); font-weight: var(--fw-black);">${streakData.days} Day Streak!</span>
                    </div>
                    <div class="badge badge--accent">Details →</div>
                </div>
                
                <div class="streak-week">
                    <div class="streak-week__track">
                        <div class="streak-week__fill" style="width: 35%;"></div>
                    </div>
                    <div class="streak-week__days">
                        <div class="streak-day streak-day--done"><div class="streak-day__dot"></div><span>Mon</span></div>
                        <div class="streak-day streak-day--done"><div class="streak-day__dot"></div><span>Tue</span></div>
                        <div class="streak-day streak-day--active"><div class="streak-day__dot"></div><span>Wed</span></div>
                        <div class="streak-day"><div class="streak-day__dot"></div><span>Thu</span></div>
                        <div class="streak-day"><div class="streak-day__dot"></div><span>Fri</span></div>
                        <div class="streak-day"><div class="streak-day__dot"></div><span>Sat</span></div>
                        <div class="streak-day streak-day--reward"><div class="streak-day__dot">🎁</div><span>Sun</span></div>
                    </div>
                </div>
            </div>

            <!-- Main CTA -->
            <div class="home__main-cta" style="padding: 0 var(--sp-5) var(--sp-2);">
                <button id="nav-learning" class="btn btn--primary btn--xl btn--full" style="box-shadow: 0 4px 0 var(--primary-dark), 0 8px 16px rgba(16, 185, 129, 0.2); font-size: var(--fs-lg); display: flex; align-items: center; justify-content: center; gap: var(--sp-2);">
                    ${!user.hasCompletedPlacement ? 'Take Placement Test 📝' : '<span style="font-size: 24px;">🚀</span> Continue Course'}
                </button>
            </div>

            <!-- Action Buttons -->
            <div class="home__actions ${!user.hasCompletedPlacement ? 'home__actions--locked' : ''}">
                <div class="action-card ${!user.hasCompletedPlacement ? 'action-card--locked' : ''}" id="nav-homework">
                    <div class="action-card__icon action-card__icon--purple">📚</div>
                    <div class="action-card__title">Homework ${!user.hasCompletedPlacement ? '🔒' : ''}</div>
                    <div class="action-card__desc">${!user.hasCompletedPlacement ? 'Complete test to unlock' : 'Tasks & practice'}</div>
                </div>
                <div class="action-card ${!user.hasCompletedPlacement ? 'action-card--locked' : ''}" id="nav-tests">
                    <div class="action-card__icon action-card__icon--green">📝</div>
                    <div class="action-card__title">Tests ${!user.hasCompletedPlacement ? '🔒' : ''}</div>
                    <div class="action-card__desc">${!user.hasCompletedPlacement ? 'Complete test to unlock' : 'Scores & progress'}</div>
                </div>
                <div class="action-card ${!user.hasCompletedPlacement ? 'action-card--locked' : ''}" id="nav-results">
                    <div class="action-card__icon action-card__icon--blue">📊</div>
                    <div class="action-card__title">Results ${!user.hasCompletedPlacement ? '🔒' : ''}</div>
                    <div class="action-card__desc">${!user.hasCompletedPlacement ? 'Complete test to unlock' : 'Course progress'}</div>
                </div>
                <div class="action-card ${!user.hasCompletedPlacement ? 'action-card--locked' : ''}" id="nav-daily">
                    <div class="action-card__icon action-card__icon--gold">🎯</div>
                    <div class="action-card__title">Daily Challenge ${!user.hasCompletedPlacement ? '🔒' : ''}</div>
                    <div class="action-card__desc">${!user.hasCompletedPlacement ? 'Complete test to unlock' : 'Earn rewards'}</div>
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
                    Anim.showToast('Please complete your Placement Test first! 📝');
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
        3: ["Yellaaaaaaaaaa! 🕺", "Yella habibi, let's go! 🎶", "Listen to my story... ☕"],
        1: ["It's lit! 🔥", "Straight up! 🦅", "La Flame says LEARN! 🌵"],
        2: ["Alright, alright, alright. 🎬", "Just keep livin'. 🥃", "Let's get learnin'. 🤠"],
        0: ["You look amazing today! ✨", "Let's serve some English! 💅", "Slay this lesson! 👑"],
    };
    const genericPhrases = [
        "Let's learn something new! 📚",
        "Ready for a lesson? 🚀",
        "Tap again to start! ✨",
        "You're doing great! 💪",
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

        // On second tap → go to learning
        if (mascotTapCount >= 2) {
            mascotTapCount = 0;
            const sideIcons = container.querySelectorAll('.circle-btn');
            const actionCards = container.querySelectorAll('.action-card');
            Anim.flyOut([...sideIcons, ...actionCards]);
            setTimeout(() => Router.navigate('learning'), 500);
        }
    });

    // Animate entry
    setTimeout(() => {
        Anim.staggerChildren(container, '.action-card, .circle-btn', 80);
    }, 100);
}

Router.register('home', renderHome);

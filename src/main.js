/* ============================================
   LANGY — MAIN ENTRY POINT
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
    // Apply saved theme preference
    if (typeof localStorage !== 'undefined') {
        const savedTheme = localStorage.getItem('langy_theme');
        if (savedTheme) {
            const isDark = savedTheme === 'dark';
            if (typeof LangyState !== 'undefined') LangyState.settings.darkMode = isDark;
            if (typeof toggleDarkMode === 'function') toggleDarkMode(isDark);
        }
    }

    // Global UI Interaction Sound Listener
    document.body.addEventListener('click', (e) => {
        // Find if the click hit an interactive element
        const isInteractive = e.target.closest('.btn, .circle-btn, .profile__option, .action-card, .card--interactive, .home__streak, .coin, .nav-header__back');
        if (isInteractive && typeof AudioUtils !== 'undefined') {
            AudioUtils.playPop();
        }
    });

    // Initialize database & restore session
    let startRoute = null;

    if (typeof LangyDB !== 'undefined') {
        try {
            await LangyDB.init();
            const user = await LangyDB.getCurrentUser();
            if (user) {
                LangyDB.currentUser = user;
                await LangyDB.loadProgress(user.email);
                
                // Re-apply theme from loaded state
                if (typeof toggleDarkMode === 'function') {
                    toggleDarkMode(LangyState.settings.darkMode);
                }
                
                // Initialize Daily Streak Logic
                const today = new Date().toISOString().split('T')[0];
                const lastDate = LangyState.streakData.lastSession.date;
                
                if (lastDate !== today) {
                    // New day — check streak continuity
                    if (lastDate) {
                        const last = new Date(lastDate);
                        const curr = new Date(today);
                        const diffMs = curr.getTime() - last.getTime();
                        const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
                        
                        if (diffDays === 1) {
                            // Consecutive day → streak continues
                            // (don't increment yet — wait for a lesson to be completed)
                        } else if (diffDays > 1) {
                            // Missed day(s) → streak resets
                            LangyState.streakData.days = 0;
                            LangyState.user.streak = 0;
                        }
                    }
                    
                    // Mark today as not yet completed
                    LangyState.streakData.todayCompleted = false;
                    LangyState.dailyChallenge.tasks.forEach(t => t.done = false);
                }

                LangyDB.startAutoSave();

                // Restore active textbook from saved state
                if (typeof LangyCurriculum !== 'undefined') {
                    LangyCurriculum.restoreFromState();
                }

                startRoute = 'home';
            }
        } catch (e) {
            console.error('DB init error:', e);
        }
    }

    // Set initial route
    if (startRoute) {
        window.location.hash = startRoute;
    } else if (!window.location.hash) {
        window.location.hash = 'auth';
    }

    // Initialize router (all screens already registered)
    Router.init();

    // Initialize DeepTutor Global Widget
    if (typeof DeepTutor !== 'undefined') {
        DeepTutor.init();
    }

    // Save progress before page close
    window.addEventListener('beforeunload', () => {
        if (typeof LangyDB !== 'undefined' && LangyDB.currentUser) {
            LangyDB.saveProgress().catch(() => {});
        }
    });
});

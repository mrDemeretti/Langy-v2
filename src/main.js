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
                
                // ─── STREAK MIGRATION ───
                // Detect old users with fake hardcoded data
                const sd = LangyState.streakData;
                if (!sd._migrated) {
                    // Old user — reset fake streak data
                    sd._migrated = true;
                    sd.days = 0;
                    sd.totalSessions = 0;
                    sd.totalMinutes = 0;
                    sd.wordsLearned = 0;
                    sd.accuracy = 0;
                    sd.todayCompleted = false;
                    sd.activeDays = [];
                    sd.longestStreak = 0;
                    sd.streakFreezes = 0;
                    sd.freezeUsedDates = [];
                    sd.freezePrice = 200;
                    sd.maxFreezes = 3;
                    sd.timeBreakdown = { vocabulary: 0, grammar: 0, listening: 0, speaking: 0, writing: 0 };
                    sd.lastSession = { date: null, wordsLearned: 0, accuracy: 0, duration: 0 };
                    LangyState.user.streak = 0;
                    console.log('[Langy] Migrated old user — streak reset to 0');
                }

                // ─── DAILY STREAK CHECK ───
                const today = new Date().toISOString().split('T')[0];
                const lastDate = sd.lastSession.date;
                
                if (lastDate && lastDate !== today) {
                    const last = new Date(lastDate);
                    const curr = new Date(today);
                    const diffMs = curr.getTime() - last.getTime();
                    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
                    
                    if (diffDays === 1) {
                        // Consecutive day → streak continues (increment on lesson completion)
                    } else if (diffDays > 1) {
                        // Missed day(s) — try to use Streak Freeze
                        const missedDays = diffDays - 1;
                        const availableFreezes = sd.streakFreezes || 0;
                        
                        if (availableFreezes >= missedDays) {
                            // Freeze covers the gap!
                            sd.streakFreezes -= missedDays;
                            if (!sd.freezeUsedDates) sd.freezeUsedDates = [];
                            // Record freeze dates
                            for (let i = 1; i <= missedDays; i++) {
                                const freezeDate = new Date(last);
                                freezeDate.setDate(freezeDate.getDate() + i);
                                sd.freezeUsedDates.push(freezeDate.toISOString().split('T')[0]);
                            }
                            setTimeout(() => {
                                if (typeof Anim !== 'undefined') {
                                    Anim.showToast(`🛡️ Streak Freeze used! ${sd.streakFreezes} left`);
                                }
                            }, 1500);
                        } else {
                            // No freezes — streak lost
                            const lostDays = sd.days;
                            sd.days = 0;
                            LangyState.user.streak = 0;
                            if (lostDays > 0) {
                                setTimeout(() => {
                                    if (typeof Anim !== 'undefined') {
                                        Anim.showToast(`💔 ${lostDays}-day streak lost! Start a new one today!`);
                                    }
                                }, 1500);
                            }
                        }
                    }
                }
                
                // Mark today as not yet completed
                if (lastDate !== today) {
                    sd.todayCompleted = false;
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

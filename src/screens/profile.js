/* ============================================
   SCREEN: PROFILE & SETTINGS
   ============================================ */

function buildCefrBadges() {
    const badges = LangyState.progress.cefrBadges || {};
    const levels = [
        { code: 'A1', name: 'Beginner', color: '#10B981' },
        { code: 'A2', name: 'Elementary', color: '#34D399' },
        { code: 'B1', name: 'Intermediate', color: '#3B82F6' },
        { code: 'B2', name: 'Upper-Int.', color: '#8B5CF6' },
        { code: 'C1', name: 'Advanced', color: '#F59E0B' },
        { code: 'C2', name: 'Proficiency', color: '#EF4444' }
    ];

    const currentLevel = LangyState.settings.languageLevel || 'A1';

    return levels.map(lv => {
        const badge = badges[lv.code];
        const isEarned = badge && badge.earned;
        const isActive = lv.code === currentLevel && !isEarned;
        const stateClass = isEarned ? 'cefr-badge--earned' : isActive ? 'cefr-badge--active' : 'cefr-badge--locked';

        // Calculate progress for active level
        let progressPct = 0;
        if (isActive && typeof LangyCurriculum !== 'undefined') {
            const tb = LangyCurriculum.getByLevel(lv.code);
            if (tb) {
                const mastery = LangyState.progress.mastery;
                const passed = tb.units.filter(u => {
                    const key = tb.id + ':' + u.id;
                    return mastery[key] && mastery[key].passed;
                }).length;
                progressPct = Math.round((passed / tb.units.length) * 100);
            }
        }

        return `
            <div class="cefr-badge ${stateClass}" style="--badge-color: ${lv.color};">
                <div class="cefr-badge__level">${lv.code}</div>
                <div class="cefr-badge__icon">${isEarned ? (badge.badge || '🏅') : isActive ? '🔓' : '🔒'}</div>
                <div class="cefr-badge__name">${lv.name}</div>
                ${isEarned ? `<div class="cefr-badge__date">${badge.date || ''}</div>` : ''}
                ${isActive ? `<div class="cefr-badge__progress">${progressPct}%</div>` : ''}
            </div>
        `;
    }).join('');
}

function buildAchievements() {
    const { streakData, dailyChallenge } = LangyState;
    const days = streakData?.days || 0;
    const words = streakData?.wordsLearned || 0;
    const perfectDate = dailyChallenge?._perfectLessonDate;
    
    const achievements = [
        {
            id: 'early_bird', title: 'Early Bird', desc: 'Study before 8 AM',
            icon: '🌅', unlocked: true // Just a placeholder for now to show an unlocked one
        },
        {
            id: 'unstoppable', title: 'Unstoppable', desc: '7 Day Streak',
            icon: '🔥', unlocked: days >= 7
        },
        {
            id: 'vocab_master', title: 'Vocab Master', desc: '50 Words',
            icon: '🧠', unlocked: words >= 50
        },
        {
            id: 'perfectionist', title: 'Perfectionist', desc: '100% Lesson',
            icon: '🎯', unlocked: perfectDate !== null && perfectDate !== undefined
        }
    ];

    return achievements.map(ach => `
        <div class="achievement-card ${!ach.unlocked ? 'achievement-card--locked' : ''}">
            <div class="achievement-card__icon">${ach.icon}</div>
            <div class="achievement-card__title">${ach.title}</div>
            <div class="achievement-card__desc">${ach.desc}</div>
        </div>
    `).join('');
}

function renderProfile(container) {
    const { user, settings, streakData, currencies } = LangyState;

    container.innerHTML = `
        <div class="screen screen--no-pad profile">
            <!-- Header -->
            <div class="profile__header">
                <div class="nav-header__back" id="profile-back" style="position:absolute; top:var(--sp-4); left:var(--sp-4); background:rgba(255,255,255,0.15); border:none; color:white;">←</div>

                <div class="profile__avatar-large" id="prof-avatar">${user.avatar}</div>
                <div class="profile__name">${user.name}</div>
                <div class="profile__level" style="margin-bottom:var(--sp-1);">${user.level}</div>
                
                <!-- XP Progress Bar -->
                <div class="profile__xp-container">
                    <div class="profile__xp-fill" style="width: ${(user.xp / 500) * 100}%;"></div>
                </div>
                <div style="font-size:10px; opacity:0.8; margin-bottom:var(--sp-2);">${user.xp} / 500 XP</div>

                <div class="profile__stats-row">
                    <div class="profile__stat">
                        <div class="profile__stat-value">${streakData.days}</div>
                        <div class="profile__stat-label">Streak</div>
                    </div>
                    <div class="profile__stat">
                        <div class="profile__stat-value">${streakData.wordsLearned}</div>
                        <div class="profile__stat-label">Words</div>
                    </div>
                    <div class="profile__stat">
                        <div class="profile__stat-value">${Math.round(streakData.totalMinutes / 60)}h</div>
                        <div class="profile__stat-label">Study Time</div>
                    </div>
                    <div class="profile__stat">
                        <div class="profile__stat-value">${streakData.accuracy}%</div>
                        <div class="profile__stat-label">Accuracy</div>
                    </div>
                </div>
            </div>

            <!-- Premium Banner -->
            ${LangyState.subscription.plan !== 'premium' ? `
            <div class="profile__premium-banner" id="prof-premium-banner">
                <div>
                    <h3 style="margin:0; font-size:var(--fs-lg);">Langy Pro 👑</h3>
                    <p style="margin:0; font-size:var(--fs-xs); opacity:0.9;">Unlock all premium features</p>
                </div>
                <button class="btn" style="background:white; color:#b45309; padding:4px 12px; font-weight:var(--fw-bold); border-radius:var(--radius-full);">GET</button>
            </div>
            ` : ''}

            <!-- Settings Sections -->
            <div class="profile__sections">

                <!-- Mini Achievements -->
                <div class="profile__section">
                    <div class="profile__section-title">✨ Achievements</div>
                    <div class="achievements-row">
                        ${buildAchievements()}
                    </div>
                </div>

                <!-- CEFR Certificates -->
                <div class="profile__section">
                    <div class="profile__section-title">🏆 My Certificates</div>
                    <div class="cefr-badges">
                        ${buildCefrBadges()}
                    </div>
                </div>
                <!-- Account -->
                <div class="profile__section">
                    <div class="profile__section-title">Account</div>
                    <div class="profile__option" id="prof-edit">
                        <div class="profile__option-icon" style="background:var(--primary-bg);">👤</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">Edit Profile</div>
                            <div class="profile__option-desc">Name, avatar, email</div>
                        </div>
                        <div class="profile__option-arrow">→</div>
                    </div>
                    <div class="profile__option" id="prof-level">
                        <div class="profile__option-icon" style="background:var(--accent-bg);">📊</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">Language Level</div>
                            <div class="profile__option-desc">${settings.languageLevel}</div>
                        </div>
                        <div class="profile__option-arrow">→</div>
                    </div>
                </div>

                <!-- Preferences -->
                <div class="profile__section">
                    <div class="profile__section-title">Preferences</div>

                    <div class="profile__option" id="prof-theme">
                        <div class="profile__option-icon" style="background:rgba(99,102,241,0.1);">${settings.darkMode ? '🌙' : '☀️'}</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">${settings.darkMode ? 'Dark Mode' : 'White Mode'}</div>
                            <div class="profile__option-desc">Current theme</div>
                        </div>
                        <div class="toggle ${settings.darkMode ? 'toggle--active' : ''}" id="toggle-dark"></div>
                    </div>

                    <div class="profile__option" id="prof-notif">
                        <div class="profile__option-icon" style="background:rgba(239,68,68,0.1);">🔔</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">Notifications</div>
                            <div class="profile__option-desc">Daily reminders</div>
                        </div>
                        <div class="toggle ${settings.notifications ? 'toggle--active' : ''}" id="toggle-notif"></div>
                    </div>

                    <div class="profile__option" id="prof-sound">
                        <div class="profile__option-icon" style="background:rgba(245,158,11,0.1);">🔊</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">Sound Effects</div>
                            <div class="profile__option-desc">In-app sounds</div>
                        </div>
                        <div class="toggle ${settings.sound ? 'toggle--active' : ''}" id="toggle-sound"></div>
                    </div>

                    <div class="profile__option" id="prof-haptics">
                        <div class="profile__option-icon" style="background:rgba(74,222,128,0.1);">📳</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">Haptic Feedback</div>
                            <div class="profile__option-desc">Vibration on interactions</div>
                        </div>
                        <div class="toggle ${settings.haptics ? 'toggle--active' : ''}" id="toggle-haptics"></div>
                    </div>
                </div>

                <!-- Learning -->
                <div class="profile__section">
                    <div class="profile__section-title">Learning</div>
                    <div class="profile__option" id="prof-goals">
                        <div class="profile__option-icon" style="background:var(--primary-bg);">🎯</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">Daily Goal</div>
                            <div class="profile__option-desc">15 minutes per day</div>
                        </div>
                        <div class="profile__option-arrow">→</div>
                    </div>
                    <div class="profile__option" id="prof-reminder">
                        <div class="profile__option-icon" style="background:rgba(59,130,246,0.1);">⏰</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">Reminder Time</div>
                            <div class="profile__option-desc">${settings.dailyReminder}</div>
                        </div>
                        <div class="profile__option-arrow">→</div>
                    </div>
                </div>

                <!-- Support -->
                <div class="profile__section">
                    <div class="profile__section-title">Support</div>
                    <div class="profile__option" id="prof-help">
                        <div class="profile__option-icon" style="background:rgba(59,130,246,0.1);">❓</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">Help & FAQ</div>
                        </div>
                        <div class="profile__option-arrow">→</div>
                    </div>
                    <div class="profile__option" id="prof-feedback">
                        <div class="profile__option-icon" style="background:rgba(74,222,128,0.1);">💬</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">Send Feedback</div>
                        </div>
                        <div class="profile__option-arrow">→</div>
                    </div>
                    <div class="profile__option" id="prof-about">
                        <div class="profile__option-icon" style="background:rgba(156,163,175,0.1);">ℹ️</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">About Langy</div>
                            <div class="profile__option-desc">Version 1.0.0</div>
                        </div>
                        <div class="profile__option-arrow">→</div>
                    </div>
                </div>

                <!-- Community -->
                <div class="profile__section">
                    <div class="profile__section-title">Community</div>
                    <div class="profile__option" id="prof-invite">
                        <div class="profile__option-icon" style="background:rgba(236,72,153,0.1);">🎁</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">Invite Friends</div>
                            <div class="profile__option-desc">Get 500 Dangy</div>
                        </div>
                        <div class="profile__option-arrow">→</div>
                    </div>
                </div>

                <!-- Danger Zone -->
                <div class="profile__section">
                    <div class="profile__option" id="prof-logout">
                        <div class="profile__option-icon" style="background:var(--danger-bg);">🚪</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label" style="color:var(--danger);">Log Out</div>
                        </div>
                    </div>
                </div>

                <div style="height: var(--sp-8);"></div>
            </div>
        </div>
    `;

    // Back
    container.querySelector('#profile-back')?.addEventListener('click', () => Router.navigate('home'));

    // Toggles
    function setupToggle(id, key) {
        container.querySelector(`#${id}`)?.addEventListener('click', () => {
            settings[key] = !settings[key];
            if (key === 'darkMode') {
                toggleDarkMode(settings.darkMode);
            }
            Anim.showToast(`Theme changed to ${settings.darkMode ? 'Dark' : 'White'} Mode`);
            renderProfile(container);
        });
    }

    setupToggle('prof-theme', 'darkMode');
    setupToggle('prof-notif', 'notifications');
    setupToggle('prof-sound', 'sound');
    setupToggle('prof-haptics', 'haptics');

    // Navigation / Modals
    container.querySelector('#prof-premium-banner')?.addEventListener('click', () => {
        if (typeof showSubscription === 'function') {
            showSubscription();
        } else {
            Anim.showToast('Premium Plans coming soon!');
        }
    });

    // Avatar interaction
    const avatarEl = container.querySelector('#prof-avatar');
    if (avatarEl) {
        avatarEl.addEventListener('click', () => {
            avatarEl.classList.remove('bounce');
            void avatarEl.offsetWidth; // trigger reflow
            avatarEl.classList.add('bounce');
            if (typeof LangyState.settings.haptics && navigator.vibrate) navigator.vibrate(50);
        });
    }

    container.querySelector('#prof-logout')?.addEventListener('click', async () => {
        if (typeof LangyDB !== 'undefined') {
            try { await LangyDB.logout(); } catch(e) {}
        }
        Anim.showToast('Logged out. See you soon! 👋');
        setTimeout(() => Router.navigate('auth'), 800);
    });

    container.querySelector('#prof-invite')?.addEventListener('click', () => {
        Anim.showToast('Invite link copied to clipboard! 📋');
    });

    container.querySelector('#prof-level')?.addEventListener('click', () => showLevelPicker());
    container.querySelector('#prof-edit')?.addEventListener('click', () => showEditProfile());
    container.querySelector('#prof-reminder')?.addEventListener('click', () => showReminderPicker());
    
    container.querySelector('#prof-goals')?.addEventListener('click', () => showGoalsPicker());
    container.querySelector('#prof-help')?.addEventListener('click', () => showHelp());
    container.querySelector('#prof-feedback')?.addEventListener('click', () => showFeedback());
    container.querySelector('#prof-about')?.addEventListener('click', () => showAbout());

    setTimeout(() => Anim.staggerChildren(container, '.profile__option'), 40);
}

function toggleDarkMode(isDark) {
    const root = document.documentElement;
    localStorage.setItem('langy_theme', isDark ? 'dark' : 'light');
    if (isDark) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
}

function showLevelPicker() {
    const levels = ['A1 Beginner', 'A2 Elementary', 'B1 Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced', 'C2 Proficient'];
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet">
            <div class="overlay__handle"></div>
            <h3 style="margin-bottom:var(--sp-4);">Select Your Level</h3>
            <div style="display:flex; flex-direction:column; gap:var(--sp-2);">
                ${levels.map(level => `
                    <div class="profile__option" data-level="${level}" style="background:${LangyState.settings.languageLevel === level.split(' ')[0] ? 'var(--primary-bg)' : 'transparent'}; border-radius:var(--radius-lg); cursor:pointer;">
                        <div style="flex:1; font-weight:var(--fw-medium);">${level}</div>
                        ${LangyState.settings.languageLevel === level.split(' ')[0] ? '<span style="color:var(--primary);">✓</span>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    overlay.querySelectorAll('[data-level]').forEach(el => {
        el.addEventListener('click', () => {
            const cefrCode = el.dataset.level.split(' ')[0]; // e.g. "B2"
            LangyState.settings.languageLevel = cefrCode;

            // Switch the active textbook to match
            if (typeof LangyCurriculum !== 'undefined') {
                LangyCurriculum.selectTextbookByLevel(cefrCode);
            }

            // Persist
            if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});

            overlay.remove();
            Anim.showToast(`Level set to ${el.dataset.level}`);
            renderProfile(document.getElementById('screen-container'));
        });
    });
}

function showEditProfile() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="padding-bottom:var(--sp-6);">
            <div class="overlay__handle"></div>
            <h3 style="margin-bottom:var(--sp-4);">Edit Profile</h3>
            <div style="display:flex; flex-direction:column; gap:var(--sp-4);">
                <div class="input-group">
                    <label>Nickname</label>
                    <input type="text" id="edit-name" class="input" value="${LangyState.user.name}">
                </div>
                <div class="input-group">
                    <label>Email Address</label>
                    <input type="email" id="edit-email" class="input" value="${LangyState.user.email}">
                </div>
                <button class="btn btn--primary btn--full" id="save-profile" style="margin-top:var(--sp-2);">Save Changes</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    
    overlay.querySelector('#save-profile').addEventListener('click', async () => {
        const newName = overlay.querySelector('#edit-name').value;
        const newEmail = overlay.querySelector('#edit-email').value;
        if(newName) LangyState.user.name = newName;
        if(newEmail) LangyState.user.email = newEmail;
        overlay.remove();
        Anim.showToast('Profile updated!');
        if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
        if(typeof renderProfile === 'function') {
            const container = document.getElementById('screen-container');
            if(container) renderProfile(container);
        }
    });
}

function showReminderPicker() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="padding-bottom:var(--sp-6);">
            <div class="overlay__handle"></div>
            <h3 style="margin-bottom:var(--sp-4);">Set Daily Reminder</h3>
            <div style="display:flex; flex-direction:column; gap:var(--sp-4);">
                <p style="color:var(--text-secondary); font-size:var(--fs-sm);">When should we remind you to practice?</p>
                <div class="input-group">
                    <input type="time" id="edit-time" class="input" value="${LangyState.settings.dailyReminder}">
                </div>
                <button class="btn btn--primary btn--full" id="save-reminder" style="margin-top:var(--sp-2);">Save</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    
    overlay.querySelector('#save-reminder').addEventListener('click', () => {
        const newTime = overlay.querySelector('#edit-time').value;
        if(newTime) LangyState.settings.dailyReminder = newTime;
        overlay.remove();
        Anim.showToast('Reminder set for ' + newTime);
        if(typeof renderProfile === 'function') {
            const container = document.getElementById('screen-container');
            if(container) renderProfile(container);
        }
    });
}

function showGoalsPicker() {
    const goals = [
        { label: 'Relaxed', time: '5 min/day', icon: '☕' },
        { label: 'Normal', time: '15 min/day', icon: '🚶' },
        { label: 'Serious', time: '30 min/day', icon: '🏃' },
        { label: 'Intense', time: '60 min/day', icon: '🔥' }
    ];
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet">
            <div class="overlay__handle"></div>
            <h3 style="margin-bottom:var(--sp-4);">Select Daily Goal</h3>
            <div style="display:flex; flex-direction:column; gap:var(--sp-2);">
                ${goals.map(g => `
                    <div class="profile__option" style="cursor:pointer;" onclick="Anim.showToast('Goal changed to ${g.label}'); this.closest('.overlay').remove();">
                        <div class="profile__option-icon" style="background:var(--bg-alt);">${g.icon}</div>
                        <div class="profile__option-text">
                            <div class="profile__option-label">${g.label}</div>
                            <div class="profile__option-desc">${g.time}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

function showHelp() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="padding-bottom:var(--sp-6);">
            <div class="overlay__handle"></div>
            <h3 style="margin-bottom:var(--sp-4);">Help & FAQ</h3>
            <div style="display:flex; flex-direction:column; gap:var(--sp-3); overflow-y:auto; max-height: 50vh;">
                <div class="card" style="padding:var(--sp-4);">
                    <strong style="color:var(--text); font-size:var(--fs-md);">How to earn Dangy?</strong>
                    <p style="color:var(--text-secondary); font-size:var(--fs-sm); margin-top:var(--sp-1);">You earn Dangy (D) by completing daily lessons, keeping your streak alive, and winning duels.</p>
                </div>
                <div class="card" style="padding:var(--sp-4);">
                    <strong style="color:var(--text); font-size:var(--fs-md);">How does the Streak work?</strong>
                    <p style="color:var(--text-secondary); font-size:var(--fs-sm); margin-top:var(--sp-1);">A streak requires you to meet your active daily learning goal. Missing a day resets the count.</p>
                </div>
                <div class="card" style="padding:var(--sp-4);">
                    <strong style="color:var(--text); font-size:var(--fs-md);">Subscription Benefits?</strong>
                    <p style="color:var(--text-secondary); font-size:var(--fs-sm); margin-top:var(--sp-1);">Premium members get no ads, unlimited duels, and exclusive avatar items in the Shop.</p>
                </div>
                <button class="btn btn--secondary" onclick="this.closest('.overlay').remove();">Got it</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

function showFeedback() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="padding-bottom:var(--sp-6);">
            <div class="overlay__handle"></div>
            <h3 style="margin-bottom:var(--sp-4);">Send Feedback</h3>
            <div style="display:flex; flex-direction:column; gap:var(--sp-4);">
                <p style="color:var(--text-secondary); font-size:var(--fs-sm);">Tell us what you love or what we can improve!</p>
                <textarea class="input" rows="4" placeholder="Your experience..."></textarea>
                <button class="btn btn--primary" onclick="Anim.showToast('Thank you for improving Langy!'); this.closest('.overlay').remove();">Submit Feedback</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

function showAbout() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="padding-bottom:var(--sp-6); text-align:center;">
            <div class="overlay__handle"></div>
            <h1 style="color:var(--primary); font-size: 42px; margin-bottom:var(--sp-2);">Langy</h1>
            <p style="color:var(--text-secondary); font-weight:var(--fw-bold); margin-bottom:var(--sp-4);">Version 1.0.0 (Beta)</p>
            <p style="color:var(--text-secondary); font-size:var(--fs-sm); margin-bottom:var(--sp-6); padding: 0 var(--sp-4);">
                A premium gameified language learning app designed to make your journey immersive, fun, and unstoppable. 
            </p>
            <button class="btn btn--primary" onclick="this.closest('.overlay').remove();">Close</button>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

function showSubscription() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="padding-bottom:var(--sp-6); text-align:center;">
            <div class="overlay__handle"></div>
            <div style="font-size: 50px; margin-bottom:var(--sp-2);">⭐</div>
            <h2 style="margin-bottom:var(--sp-2);">Langy Premium</h2>
            <p style="color:var(--text-secondary); font-size:var(--fs-sm); margin-bottom:var(--sp-4);">Unlock limitless learning.</p>
            
            <div class="card" style="text-align:left; padding:var(--sp-4); margin-bottom:var(--sp-4); border: 2px solid var(--reward-gold);">
                <div style="font-weight:var(--fw-bold); margin-bottom:var(--sp-2);">Includes:</div>
                <ul style="color:var(--text-secondary); font-size:var(--fs-sm); padding-left: var(--sp-4); line-height:1.6;">
                    <li>No Ads</li>
                    <li>Infinite Duel Energy</li>
                    <li>Exclusive Mascot Items</li>
                    <li>AI Grammar Assistant</li>
                </ul>
            </div>
            
            <button class="btn btn--primary btn--full" style="background:var(--reward-gold); color:white; border:none; box-shadow:0 4px 0 #b47306;" onclick="Anim.showToast('Premium Activated! You are amazing. 🎉'); this.closest('.overlay').remove();">
                Subscribe for $9.99/mo
            </button>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

Router.register('profile', renderProfile);

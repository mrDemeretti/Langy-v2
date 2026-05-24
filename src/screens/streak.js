/* ============================================
   SCREEN: STREAK DETAIL (Overlay)
   Real-time streak tracking + Streak Freeze + Rewards Roadmap
   ============================================ */

function buyStreakFreeze() {
    const sd = LangyState.streakData;
    const price = sd.freezePrice || 200;
    const max = sd.maxFreezes || 3;
    const current = sd.streakFreezes || 0;
    
    if (current >= max) {
        if (typeof Anim !== 'undefined') Anim.showToast(`${LangyIcons.shield} Max freezes reached!`);
        return false;
    }
    if (LangyState.currencies.dangy < price) {
        if (typeof Anim !== 'undefined') Anim.showToast(`${LangyIcons.alertCircle} Not enough Dangy!`);
        return false;
    }
    
    LangyState.currencies.dangy -= price;
    sd.streakFreezes = current + 1;
    
    if (typeof Anim !== 'undefined') Anim.showToast(`${LangyIcons.shield} Streak Freeze bought! (${sd.streakFreezes}/${max})`);
    if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
    
    return true;
}

function buildStreakCalendar() {
    const sd = LangyState.streakData;
    const activeDays = sd.activeDays || [];
    const freezeDays = sd.freezeUsedDates || [];
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];
    
    // Build last 28 days (4 weeks)
    let html = '';
    const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    
    // Header row
    html += '<div class="streak-cal__header">';
    dayLabels.forEach(d => { html += `<span>${d}</span>`; });
    html += '</div>';
    
    // Get start date (28 days ago, aligned to Monday)
    const start = new Date(today);
    start.setDate(start.getDate() - 27);
    // Align to Monday
    while (start.getDay() !== 1) {
        start.setDate(start.getDate() - 1);
    }
    
    html += '<div class="streak-cal__grid">';
    const totalDays = Math.ceil((today - start) / (1000 * 60 * 60 * 24)) + 1;
    
    for (let i = 0; i < Math.max(totalDays, 28); i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const iso = d.toISOString().split('T')[0];
        
        if (d > today) {
            html += '<div class="streak-cal__day streak-cal__day--future"></div>';
        } else if (activeDays.includes(iso)) {
            html += '<div class="streak-cal__day streak-cal__day--active">${LangyIcons.flame}</div>';
        } else if (freezeDays.includes(iso)) {
            html += '<div class="streak-cal__day streak-cal__day--freeze">${LangyIcons.shield}</div>';
        } else if (iso === todayISO) {
            html += `<div class="streak-cal__day streak-cal__day--today">${sd.todayCompleted ? LangyIcons.flame : '•'}</div>`;
        } else {
            html += '<div class="streak-cal__day streak-cal__day--missed"></div>';
        }
    }
    html += '</div>';
    
    return html;
}

function buildRewardsRoadmap(currentDays) {
    const milestones = [
        { days: 3,   emoji: LangyIcons.star, reward: '25 Dangy', label: '3 Days' },
        { days: 7,   emoji: LangyIcons.star, reward: '50 Dangy + 5 Langy', label: 'Week' },
        { days: 14,  emoji: LangyIcons.award, reward: '100 Dangy + 10 Langy', label: '2 Weeks' },
        { days: 30,  emoji: LangyIcons.trophy, reward: '200 Dangy + 25 Langy', label: 'Month' },
        { days: 60,  emoji: LangyIcons.diamond, reward: '400 Dangy + 50 Langy', label: '2 Months' },
        { days: 90,  emoji: LangyIcons.crown, reward: '600 Dangy + 100 Langy', label: '3 Months' },
        { days: 180, emoji: LangyIcons.flame, reward: '1000 Dangy + 200 Langy', label: '6 Months' },
        { days: 365, emoji: LangyIcons.medal, reward: '2000 Dangy + 500 Langy', label: '1 Year' },
    ];
    
    return milestones.map(m => {
        const isEarned = currentDays >= m.days;
        const isNext = !isEarned && (currentDays < m.days);
        const progress = isEarned ? 100 : Math.round((currentDays / m.days) * 100);
        
        return `
            <div class="reward-milestone ${isEarned ? 'reward-milestone--earned' : ''} ${isNext ? 'reward-milestone--next' : ''}">
                <div class="reward-milestone__icon">${m.emoji}</div>
                <div class="reward-milestone__info">
                    <div class="reward-milestone__label">${m.label}</div>
                    <div class="reward-milestone__reward">${m.reward}</div>
                    ${!isEarned ? `
                        <div class="reward-milestone__bar">
                            <div class="reward-milestone__fill" style="width:${progress}%"></div>
                        </div>
                    ` : '<span class="reward-milestone__check">${LangyIcons.check} Earned</span>'}
                </div>
            </div>
        `;
    }).join('');
}

function renderStreak(container) {
    const sd = LangyState.streakData;
    const totalMinutes = sd.totalMinutes || 0;
    const breakdown = sd.timeBreakdown || {};
    const maxTime = Math.max(...Object.values(breakdown), 1);
    const freezes = sd.streakFreezes || 0;
    const maxFreezes = sd.maxFreezes || 3;
    const freezePrice = sd.freezePrice || 200;

    const colors = {
        vocabulary: 'var(--primary)',
        grammar: 'var(--info)',
        listening: 'var(--accent-dark)',
        speaking: 'var(--reward-gold)',
        writing: 'var(--warning)'
    };

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="streak-back">${LangyIcons.back}</div>
                <div class="nav-header__title">${i18n('streak.title')}</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: 0 var(--sp-6) var(--sp-6); overflow-y: auto;">
                <!-- Big streak display -->
                <div class="streak-detail__stats">
                    <div class="streak-detail__big-stat">
                        <div class="value">
                            <span style="font-size:36px; animation: streakFire 1.5s ease-in-out infinite;">${LangyIcons.flame}</span>
                            <span id="streak-count">${sd.days}</span>
                        </div>
                        <div class="label">${sd.days === 0 ? {en:'Start your streak today!',ru:'Начните стрик сегодня!',es:'¡Empieza tu racha hoy!'}[typeof LangyI18n!=='undefined'?LangyI18n.currentLang:'en'] : i18n('home.streak')}</div>
                        ${sd.longestStreak > 0 ? `<div class="label" style="color:var(--reward-gold); margin-top:var(--sp-1);">${LangyIcons.trophy} Best: ${sd.longestStreak} days</div>` : ''}
                    </div>

                    <!-- Quick stats grid -->
                    <div class="streak-detail__grid">
                        <div class="streak-detail__item">
                            <div class="value" style="color:var(--primary);">${sd.totalSessions}</div>
                            <div class="label">${i18n('streak.total_sessions')}</div>
                        </div>
                        <div class="streak-detail__item">
                            <div class="value" style="color:var(--accent-dark);">${totalMinutes >= 60 ? Math.floor(totalMinutes / 60) + 'h ' + (totalMinutes % 60) + 'm' : totalMinutes + 'm'}</div>
                            <div class="label">${i18n('streak.total_time')}</div>
                        </div>
                        <div class="streak-detail__item">
                            <div class="value" style="color:var(--reward-gold);">${sd.wordsLearned}</div>
                            <div class="label">${i18n('streak.words_learned')}</div>
                        </div>
                        <div class="streak-detail__item">
                            <div class="value" style="color:${(sd.accuracy || 0) >= 75 ? 'var(--accent-dark)' : 'var(--danger)'};">${sd.accuracy || 0}%</div>
                            <div class="label">${i18n('streak.avg_accuracy')}</div>
                        </div>
                    </div>
                </div>

                <!-- Streak Freeze Section -->
                <div class="card streak-freeze-card" style="margin-top:var(--sp-4);">
                    <div class="streak-freeze__header">
                        <div>
                            <h4 style="margin:0;">${LangyIcons.shield} ${i18n('streak.freeze')}</h4>
                            <p style="color:var(--text-muted); font-size:var(--fs-xs); margin:var(--sp-1) 0 0;">Protects your streak when you miss a day</p>
                        </div>
                        <div class="streak-freeze__count">
                            ${Array.from({length: maxFreezes}, (_, i) => 
                                `<span class="freeze-shield ${i < freezes ? 'freeze-shield--active' : ''}">${i < freezes ? LangyIcons.shield : LangyIcons.circle}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <button class="btn btn--primary btn--full" id="buy-freeze" 
                        ${freezes >= maxFreezes ? 'disabled style="opacity:0.5;"' : ''}
                        ${LangyState.currencies.dangy < freezePrice ? 'disabled style="opacity:0.5;"' : ''}>
                        ${freezes >= maxFreezes ? `${LangyIcons.shield} Max Freezes!` : `${LangyIcons.shield} Buy Freeze — ${freezePrice} Dangy`}
                    </button>
                    <div style="text-align:center; margin-top:var(--sp-2); font-size:var(--fs-xs); color:var(--text-muted);">
                        You have <strong style="color:var(--primary);">${LangyState.currencies.dangy}</strong> Dangy
                    </div>
                </div>

                <!-- 28-Day Calendar -->
                <div class="card" style="margin-top:var(--sp-4);">
                    <h4 style="margin-bottom:var(--sp-3);">${LangyIcons.calendar} Activity Calendar</h4>
                    <div class="streak-calendar">
                        ${buildStreakCalendar()}
                    </div>
                    <div class="streak-cal__legend">
                        <span>${LangyIcons.flame} Active</span>
                        <span style="display:flex;align-items:center;gap:4px;">${LangyIcons.shield} Freeze</span>
                        <span class="streak-cal__legend-missed">Missed</span>
                    </div>
                    <button class="btn btn--ghost btn--full" id="open-full-calendar" style="margin-top:var(--sp-3); font-size:var(--fs-sm);">
                        ${LangyIcons.barChart} Full Calendar & Stats
                    </button>
                </div>

                <!-- Time breakdown chart -->
                ${totalMinutes > 0 ? `
                <div class="card" style="margin-top:var(--sp-4);">
                    <h4 style="margin-bottom:var(--sp-4);">Time by Category</h4>
                    <div class="streak-detail__time-chart">
                        ${Object.entries(breakdown).map(([key, minutes]) => `
                            <div class="time-bar">
                                <div class="time-bar__label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                                <div class="time-bar__track">
                                    <div class="time-bar__fill" style="width:${(minutes / maxTime) * 100}%; background:${colors[key] || 'var(--primary)'};"></div>
                                </div>
                                <div class="time-bar__value">${minutes >= 60 ? Math.floor(minutes / 60) + 'h' : minutes + 'm'}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Rewards Roadmap -->
                <div class="card" style="margin-top:var(--sp-4);">
                    <h4 style="margin-bottom:var(--sp-3);">${LangyIcons.gift} Streak Rewards</h4>
                    <div class="rewards-roadmap">
                        ${buildRewardsRoadmap(sd.days)}
                    </div>
                </div>

                <!-- Last session -->
                ${sd.lastSession.date ? `
                <div class="card" style="margin-top:var(--sp-4); margin-bottom:var(--sp-6);">
                    <h4 style="margin-bottom:var(--sp-3);">Last Session</h4>
                    <div style="display:flex; justify-content:space-around;">
                        <div class="stat">
                            <div class="stat__value">${sd.lastSession.wordsLearned}</div>
                            <div class="stat__label">Words</div>
                        </div>
                        <div class="stat">
                            <div class="stat__value">${sd.lastSession.accuracy}%</div>
                            <div class="stat__label">Accuracy</div>
                        </div>
                        <div class="stat">
                            <div class="stat__value">${sd.lastSession.duration}m</div>
                            <div class="stat__label">Duration</div>
                        </div>
                    </div>
                </div>
                ` : `
                <div class="card" style="margin-top:var(--sp-4); margin-bottom:var(--sp-6); text-align:center; padding: var(--sp-8);">
                    <div style="font-size:48px; margin-bottom:var(--sp-3);">${LangyIcons.book}</div>
                    <h4>No sessions yet!</h4>
                    <p style="color:var(--text-muted); margin-top:var(--sp-2);">Complete a lesson to start tracking your progress</p>
                    <button class="btn btn--primary" id="streak-start-lesson" style="margin-top:var(--sp-4);">${LangyIcons.rocket} Start Learning</button>
                </div>
                `}
            </div>
        </div>
    `;

    // Event listeners
    container.querySelector('#streak-back')?.addEventListener('click', () => Router.navigate('home'));
    container.querySelector('#streak-start-lesson')?.addEventListener('click', () => Router.navigate('learning'));
    container.querySelector('#open-full-calendar')?.addEventListener('click', () => Router.navigate('calendar'));
    
    container.querySelector('#buy-freeze')?.addEventListener('click', (e) => {
        if (buyStreakFreeze()) {
            // Re-render to update UI
            renderStreak(container);
        }
    });

    // Animate time bars
    setTimeout(() => {
        container.querySelectorAll('.time-bar__fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => { bar.style.width = width; }, 100);
        });
    }, 200);

    // Animate reward milestone bars
    setTimeout(() => {
        container.querySelectorAll('.reward-milestone__fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => { bar.style.width = width; }, 150);
        });
    }, 400);

    setTimeout(() => Anim.staggerChildren(container, '.streak-detail__item, .time-bar, .reward-milestone'), 80);
}

Router.register('streak', renderStreak);

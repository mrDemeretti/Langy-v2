/* ============================================
   SCREEN: STREAK DETAIL (Overlay)
   ============================================ */

function renderStreak(container) {
    const { streakData } = LangyState;
    const totalMinutes = streakData.totalMinutes;
    const breakdown = streakData.timeBreakdown;

    // Calculate max for bar chart scaling
    const maxTime = Math.max(...Object.values(breakdown));

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
                <div class="nav-header__back" id="streak-back">←</div>
                <div class="nav-header__title">Streak & Stats</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: 0 var(--sp-6) var(--sp-6);">
                <div class="streak-detail__stats">
                    <!-- Big streak display -->
                    <div class="streak-detail__big-stat">
                        <div class="value">
                            <span style="font-size:36px; animation: streakFire 1.5s ease-in-out infinite;">🔥</span>
                            <span id="streak-count">${streakData.days}</span>
                        </div>
                        <div class="label">Day Streak</div>
                    </div>

                    <!-- Quick stats grid -->
                    <div class="streak-detail__grid">
                        <div class="streak-detail__item">
                            <div class="value" style="color:var(--primary);">${streakData.totalSessions}</div>
                            <div class="label">Total Sessions</div>
                        </div>
                        <div class="streak-detail__item">
                            <div class="value" style="color:var(--accent-dark);">${Math.round(totalMinutes / 60)}h ${totalMinutes % 60}m</div>
                            <div class="label">Total Time</div>
                        </div>
                        <div class="streak-detail__item">
                            <div class="value" style="color:var(--reward-gold);">${streakData.wordsLearned}</div>
                            <div class="label">Words Learned</div>
                        </div>
                        <div class="streak-detail__item">
                            <div class="value" style="color:${streakData.accuracy >= 75 ? 'var(--accent-dark)' : 'var(--danger)'};">${streakData.accuracy}%</div>
                            <div class="label">Avg Accuracy</div>
                        </div>
                    </div>

                    <!-- Time breakdown chart -->
                    <div class="card" style="margin-top:var(--sp-2);">
                        <h4 style="margin-bottom:var(--sp-4);">Time by Category</h4>
                        <div class="streak-detail__time-chart">
                            ${Object.entries(breakdown).map(([key, minutes]) => `
                                <div class="time-bar">
                                    <div class="time-bar__label">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
                                    <div class="time-bar__track">
                                        <div class="time-bar__fill" style="width:${(minutes / maxTime) * 100}%; background:${colors[key] || 'var(--primary)'};"></div>
                                    </div>
                                    <div class="time-bar__value">${Math.round(minutes / 60)}h</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Last session -->
                    <div class="card">
                        <h4 style="margin-bottom:var(--sp-3);">Last Session</h4>
                        <div style="display:flex; justify-content:space-around;">
                            <div class="stat">
                                <div class="stat__value">${streakData.lastSession.wordsLearned}</div>
                                <div class="stat__label">Words</div>
                            </div>
                            <div class="stat">
                                <div class="stat__value">${streakData.lastSession.accuracy}%</div>
                                <div class="stat__label">Accuracy</div>
                            </div>
                            <div class="stat">
                                <div class="stat__value">${streakData.lastSession.duration}m</div>
                                <div class="stat__label">Duration</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    container.querySelector('#streak-back')?.addEventListener('click', () => Router.navigate('home'));

    // Animate time bars
    setTimeout(() => {
        container.querySelectorAll('.time-bar__fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => { bar.style.width = width; }, 100);
        });
    }, 200);

    setTimeout(() => Anim.staggerChildren(container, '.streak-detail__item, .time-bar'), 80);
}

Router.register('streak', renderStreak);

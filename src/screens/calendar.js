/* ============================================
   SCREEN: ACTIVITY CALENDAR
   Full calendar view with daily/weekly/monthly/yearly stats
   ============================================ */

function renderCalendar(container) {
    const sd = LangyState.streakData;
    const dailyStats = sd.dailyStats || {};
    const activeDays = sd.activeDays || [];
    const freezeDays = sd.freezeUsedDates || [];

    // State
    let viewDate = new Date(); // Current month being viewed
    let selectedDate = null;   // Currently selected day
    let period = 'month';      // 'week' | 'month' | 'year'

    function render() {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const monthName = viewDate.toLocaleString('en', { month: 'long', year: 'numeric' });

        // Period stats
        const stats = getPeriodStats(period, viewDate);

        container.innerHTML = `
            <div class="screen screen--no-pad">
                <div class="nav-header">
                    <div class="nav-header__back" id="cal-back">←</div>
                    <div class="nav-header__title">Activity</div>
                    <div style="width:36px;"></div>
                </div>

                <div style="padding: 0 var(--sp-4) var(--sp-6); overflow-y: auto;">

                    <!-- Period Toggle -->
                    <div class="cal-period-toggle">
                        ${['week', 'month', 'year'].map(p => `
                            <button class="cal-period-btn ${period === p ? 'cal-period-btn--active' : ''}" data-period="${p}">
                                ${p.charAt(0).toUpperCase() + p.slice(1)}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Summary Cards -->
                    <div class="cal-summary">
                        <div class="cal-summary__card cal-summary__card--primary">
                            <div class="cal-summary__value">${stats.sessions}</div>
                            <div class="cal-summary__label">Sessions</div>
                        </div>
                        <div class="cal-summary__card cal-summary__card--accent">
                            <div class="cal-summary__value">${stats.minutes >= 60 ? Math.floor(stats.minutes / 60) + 'h ' + (stats.minutes % 60) + 'm' : stats.minutes + 'm'}</div>
                            <div class="cal-summary__label">Study Time</div>
                        </div>
                        <div class="cal-summary__card cal-summary__card--gold">
                            <div class="cal-summary__value">${stats.words}</div>
                            <div class="cal-summary__label">Words</div>
                        </div>
                        <div class="cal-summary__card cal-summary__card--info">
                            <div class="cal-summary__value">${stats.accuracy}%</div>
                            <div class="cal-summary__label">Accuracy</div>
                        </div>
                    </div>

                    <!-- Activity Trend -->
                    ${renderActivityBar(stats)}

                    <!-- Month Navigator -->
                    <div class="cal-month-nav">
                        <button class="cal-month-btn" id="cal-prev">‹</button>
                        <span class="cal-month-title">${monthName}</span>
                        <button class="cal-month-btn" id="cal-next">›</button>
                    </div>

                    <!-- Calendar Grid -->
                    <div class="cal-grid">
                        <div class="cal-grid__header">
                            ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d =>
                                `<div class="cal-grid__day-label">${d}</div>`
                            ).join('')}
                        </div>
                        <div class="cal-grid__body">
                            ${buildMonthGrid(year, month)}
                        </div>
                    </div>

                    <!-- Legend -->
                    <div class="cal-legend">
                        <span class="cal-legend__item"><span class="cal-legend__dot cal-legend__dot--none"></span>No activity</span>
                        <span class="cal-legend__item"><span class="cal-legend__dot cal-legend__dot--low"></span>Light</span>
                        <span class="cal-legend__item"><span class="cal-legend__dot cal-legend__dot--mid"></span>Medium</span>
                        <span class="cal-legend__item"><span class="cal-legend__dot cal-legend__dot--high"></span>Heavy</span>
                        <span class="cal-legend__item"><span class="cal-legend__dot cal-legend__dot--freeze"></span>Freeze</span>
                    </div>

                    <!-- Selected Day Detail -->
                    <div id="cal-day-detail">
                        ${selectedDate ? renderDayDetail(selectedDate) : renderDayPlaceholder()}
                    </div>

                </div>
            </div>
        `;

        // Events
        container.querySelector('#cal-back')?.addEventListener('click', () => Router.navigate('streak'));
        container.querySelector('#cal-prev')?.addEventListener('click', () => {
            viewDate.setMonth(viewDate.getMonth() - 1);
            render();
        });
        container.querySelector('#cal-next')?.addEventListener('click', () => {
            const now = new Date();
            if (viewDate.getFullYear() < now.getFullYear() || viewDate.getMonth() < now.getMonth()) {
                viewDate.setMonth(viewDate.getMonth() + 1);
                render();
            }
        });
        container.querySelectorAll('.cal-period-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                period = btn.dataset.period;
                render();
            });
        });
        container.querySelectorAll('.cal-grid__cell--has-data, .cal-grid__cell--today').forEach(cell => {
            cell.addEventListener('click', () => {
                selectedDate = cell.dataset.date;
                const detail = container.querySelector('#cal-day-detail');
                if (detail) detail.innerHTML = renderDayDetail(selectedDate);
                // Highlight selected
                container.querySelectorAll('.cal-grid__cell--selected').forEach(c => c.classList.remove('cal-grid__cell--selected'));
                cell.classList.add('cal-grid__cell--selected');
            });
        });

        setTimeout(() => {
            if (typeof Anim !== 'undefined') Anim.staggerChildren(container, '.cal-summary__card');
        }, 80);
    }

    function buildMonthGrid(year, month) {
        const firstDay = new Date(year, month, 1);
        let startDay = firstDay.getDay() - 1; // Monday = 0
        if (startDay < 0) startDay = 6;

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date().toISOString().split('T')[0];
        let html = '';

        // Empty cells before month starts
        for (let i = 0; i < startDay; i++) {
            html += '<div class="cal-grid__cell cal-grid__cell--empty"></div>';
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const isToday = iso === today;
            const isFuture = new Date(iso) > new Date();
            const dayData = dailyStats[iso];
            const isFreeze = freezeDays.includes(iso);
            const isActive = activeDays.includes(iso);

            let level = '';
            let content = String(d);

            if (isFuture) {
                level = 'future';
            } else if (isFreeze) {
                level = 'freeze';
                content = `<span class="cal-cell-num">${d}</span><span class="cal-cell-icon">🛡️</span>`;
            } else if (dayData) {
                const mins = dayData.minutes || 0;
                if (mins >= 30) level = 'high';
                else if (mins >= 15) level = 'mid';
                else if (mins > 0) level = 'low';
                else level = isActive ? 'low' : 'none';
                content = `<span class="cal-cell-num">${d}</span>${mins > 0 ? `<span class="cal-cell-mins">${mins}m</span>` : ''}`;
            } else if (isActive) {
                level = 'low';
                content = `<span class="cal-cell-num">${d}</span>`;
            } else {
                level = 'none';
            }

            const classes = [
                'cal-grid__cell',
                `cal-grid__cell--${level}`,
                isToday ? 'cal-grid__cell--today' : '',
                (dayData || isActive) ? 'cal-grid__cell--has-data' : '',
                selectedDate === iso ? 'cal-grid__cell--selected' : ''
            ].filter(Boolean).join(' ');

            html += `<div class="${classes}" data-date="${iso}">${content}</div>`;
        }

        return html;
    }

    function getPeriodStats(period, refDate) {
        const now = new Date();
        let startDate, endDate;

        if (period === 'week') {
            const d = new Date(now);
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            startDate = new Date(d.setDate(diff));
            endDate = now;
        } else if (period === 'month') {
            startDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
            endDate = new Date(refDate.getFullYear(), refDate.getMonth() + 1, 0);
        } else {
            startDate = new Date(refDate.getFullYear(), 0, 1);
            endDate = new Date(refDate.getFullYear(), 11, 31);
        }

        const startISO = startDate.toISOString().split('T')[0];
        const endISO = endDate.toISOString().split('T')[0];

        let sessions = 0, minutes = 0, words = 0, accuracySum = 0, accuracyCount = 0;
        let dailyMinutes = []; // For activity bar

        Object.entries(dailyStats).forEach(([date, data]) => {
            if (date >= startISO && date <= endISO) {
                sessions += data.sessions || 0;
                minutes += data.minutes || 0;
                words += data.words || 0;
                if (data.accuracy > 0) {
                    accuracySum += data.accuracy;
                    accuracyCount++;
                }
                dailyMinutes.push({ date, minutes: data.minutes || 0 });
            }
        });

        // Also count activeDays without dailyStats entries
        activeDays.forEach(date => {
            if (date >= startISO && date <= endISO && !dailyStats[date]) {
                sessions++;
            }
        });

        return {
            sessions,
            minutes,
            words,
            accuracy: accuracyCount > 0 ? Math.round(accuracySum / accuracyCount) : 0,
            dailyMinutes: dailyMinutes.sort((a, b) => a.date.localeCompare(b.date)),
            activeDays: activeDays.filter(d => d >= startISO && d <= endISO).length
        };
    }

    function renderActivityBar(stats) {
        if (stats.dailyMinutes.length === 0) return '';
        const maxMins = Math.max(...stats.dailyMinutes.map(d => d.minutes), 1);
        
        return `
            <div class="card" style="margin-bottom:var(--sp-4);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--sp-3);">
                    <h4 style="margin:0;">📊 Activity Trend</h4>
                    <span style="font-size:var(--fs-xs); color:var(--text-muted);">${stats.activeDays} active days</span>
                </div>
                <div class="cal-activity-bar">
                    ${stats.dailyMinutes.map(d => {
                        const height = Math.max(4, (d.minutes / maxMins) * 100);
                        const dateObj = new Date(d.date);
                        const label = dateObj.getDate();
                        return `
                            <div class="cal-bar-col" title="${d.date}: ${d.minutes}m">
                                <div class="cal-bar" style="height:${height}%;"></div>
                                <span class="cal-bar-label">${label}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    function renderDayDetail(dateStr) {
        const data = dailyStats[dateStr];
        const isActive = activeDays.includes(dateStr);
        const isFreeze = freezeDays.includes(dateStr);
        const dateObj = new Date(dateStr + 'T12:00:00');
        const formatted = dateObj.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

        if (!data && !isActive && !isFreeze) {
            return `
                <div class="card cal-day-card" style="margin-top:var(--sp-4); text-align:center;">
                    <div style="font-size:32px; margin-bottom:var(--sp-2);">😴</div>
                    <h4>${formatted}</h4>
                    <p style="color:var(--text-muted); margin-top:var(--sp-1);">No activity on this day</p>
                </div>
            `;
        }

        if (isFreeze && !data) {
            return `
                <div class="card cal-day-card" style="margin-top:var(--sp-4); text-align:center; border-left: 3px solid rgba(99, 102, 241, 0.5);">
                    <div style="font-size:32px; margin-bottom:var(--sp-2);">🛡️</div>
                    <h4>${formatted}</h4>
                    <p style="color:var(--info); margin-top:var(--sp-1);">Streak Freeze was used</p>
                </div>
            `;
        }

        const d = data || { sessions: 1, minutes: 0, words: 0, accuracy: 0, categories: {} };
        const cats = d.categories || {};
        const maxCat = Math.max(...Object.values(cats), 1);

        const catColors = {
            vocabulary: 'var(--primary)',
            grammar: 'var(--info)',
            listening: 'var(--accent-dark)',
            speaking: 'var(--reward-gold)',
            writing: 'var(--warning)'
        };

        return `
            <div class="card cal-day-card" style="margin-top:var(--sp-4); border-left: 3px solid var(--primary);">
                <h4 style="margin-bottom:var(--sp-3);">📅 ${formatted}</h4>
                <div class="cal-day-stats">
                    <div class="cal-day-stat">
                        <span class="cal-day-stat__val" style="color:var(--primary);">${d.sessions}</span>
                        <span class="cal-day-stat__lbl">Sessions</span>
                    </div>
                    <div class="cal-day-stat">
                        <span class="cal-day-stat__val" style="color:var(--accent-dark);">${d.minutes}m</span>
                        <span class="cal-day-stat__lbl">Time</span>
                    </div>
                    <div class="cal-day-stat">
                        <span class="cal-day-stat__val" style="color:var(--reward-gold);">${d.words}</span>
                        <span class="cal-day-stat__lbl">Words</span>
                    </div>
                    <div class="cal-day-stat">
                        <span class="cal-day-stat__val" style="color:${d.accuracy >= 75 ? 'var(--primary)' : 'var(--danger)'};">${d.accuracy}%</span>
                        <span class="cal-day-stat__lbl">Accuracy</span>
                    </div>
                </div>

                ${Object.keys(cats).length > 0 ? `
                    <div style="margin-top:var(--sp-3);">
                        <div style="font-size:var(--fs-xs); color:var(--text-muted); margin-bottom:var(--sp-2);">Breakdown</div>
                        ${Object.entries(cats).map(([cat, mins]) => `
                            <div style="display:flex; align-items:center; gap:var(--sp-2); margin-bottom:var(--sp-1);">
                                <span style="font-size:var(--fs-xs); width:70px; text-transform:capitalize;">${cat}</span>
                                <div style="flex:1; height:8px; background:var(--bg-alt); border-radius:var(--radius-full); overflow:hidden;">
                                    <div style="height:100%; width:${(mins / maxCat) * 100}%; background:${catColors[cat] || 'var(--primary)'}; border-radius:var(--radius-full); transition:width 0.6s ease;"></div>
                                </div>
                                <span style="font-size:var(--fs-xs); color:var(--text-muted); width:30px; text-align:right;">${mins}m</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    function renderDayPlaceholder() {
        return `
            <div class="card" style="margin-top:var(--sp-4); text-align:center; padding:var(--sp-6); opacity:0.7;">
                <div style="font-size:28px; margin-bottom:var(--sp-2);">👆</div>
                <p style="color:var(--text-muted); font-size:var(--fs-sm);">Tap a day to see details</p>
            </div>
        `;
    }

    render();
}

Router.register('calendar', renderCalendar);

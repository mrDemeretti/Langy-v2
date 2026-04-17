/* ============================================
   SCREEN: EVENTS
   ============================================ */

function renderEvents(container) {
    const { events } = LangyState;

    // Initialize event progress tracking
    if (!LangyState._eventProgress) LangyState._eventProgress = {};

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="events-back">${LangyIcons.back}</div>
                <div class="nav-header__title">Events</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: var(--sp-2) var(--sp-6) var(--sp-4);">
                <p class="text-secondary text-sm">Special challenges and rewards!</p>
            </div>

            <div class="events__list">
                ${events.map(event => {
                    const progress = LangyState._eventProgress[event.id] || 0;
                    const maxProgress = event.id === 1 ? 20 : event.id === 2 ? 30 : 50;
                    const pct = Math.min(100, Math.round((progress / maxProgress) * 100));
                    const isDone = pct >= 100;
                    return `
                    <div class="event-card ${isDone ? 'event-card--done' : ''}" data-id="${event.id}">
                        <div class="event-card__banner" style="background:${event.bg};">
                            <span style="display:flex; align-items:center; justify-content:center; width:48px; height:48px; color:white; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.1));">${event.emoji}</span>
                        </div>
                        <div class="event-card__content">
                            <div class="event-card__title">${event.title} ${isDone ? `<span style="color:var(--accent-dark); font-size:var(--fs-xs);">${LangyIcons.check} Completed</span>` : ''}</div>
                            <p class="text-sm text-secondary" style="margin-top:var(--sp-1);">${event.desc}</p>
                            <!-- Progress bar -->
                            <div class="progress" style="margin-top:var(--sp-2); height:6px;">
                                <div class="progress__fill" style="width:${pct}%; background:${isDone ? 'var(--accent-dark)' : 'white'}; opacity:${isDone ? 1 : 0.8};"></div>
                            </div>
                            <div class="event-card__meta">
                                <span style="display:flex;align-items:center;gap:4px;">${LangyIcons.clock} ${isDone ? 'Completed!' : event.timeLeft + ' left'}</span>
                                <span class="badge badge--gold" style="display:flex;align-items:center;gap:4px;">${LangyIcons.gift} ${event.reward}</span>
                            </div>
                        </div>
                    </div>
                `}).join('')}
            </div>
        </div>
    `;

    container.querySelector('#events-back')?.addEventListener('click', () => Router.navigate('home'));

    container.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            const eventId = parseInt(card.dataset.id);
            const event = events.find(e => e.id === eventId);
            if (!event) return;
            showEventDetail(event);
        });
    });

    setTimeout(() => Anim.staggerChildren(container, '.event-card'), 100);
}

function showEventDetail(event) {
    const progress = LangyState._eventProgress?.[event.id] || 0;
    const maxProgress = event.id === 1 ? 20 : event.id === 2 ? 30 : 50;
    const pct = Math.min(100, Math.round((progress / maxProgress) * 100));
    const isDone = pct >= 100;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet">
            <div class="overlay__handle"></div>
            <div style="text-align:center; padding:var(--sp-4) 0;">
                <div style="display:flex; align-items:center; justify-content:center; width:64px; height:64px; border-radius:50%; background:${event.bg}; margin:0 auto var(--sp-3); color:white;">${event.emoji}</div>
                <h3 style="margin-bottom:var(--sp-1);">${event.title}</h3>
                <p class="text-sm text-secondary">${event.desc}</p>
            </div>

            <div class="card" style="margin-bottom:var(--sp-3);">
                <div style="display:flex; justify-content:space-between; margin-bottom:var(--sp-2);">
                    <span style="font-weight:var(--fw-bold);">Progress</span>
                    <span style="color:var(--primary); font-weight:var(--fw-bold);">${progress}/${maxProgress}</span>
                </div>
                <div class="progress" style="height:8px;">
                    <div class="progress__fill" style="width:${pct}%;"></div>
                </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding:var(--sp-3); background:var(--bg-card); border-radius:var(--radius-lg); margin-bottom:var(--sp-4);">
                <div>
                    <div style="font-size:var(--fs-xs); color:var(--text-tertiary);">Reward</div>
                    <div style="font-weight:var(--fw-bold); color:var(--reward-gold);">${event.reward}</div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:var(--fs-xs); color:var(--text-tertiary);">Time Left</div>
                    <div style="font-weight:var(--fw-bold);">${event.timeLeft}</div>
                </div>
            </div>

            ${isDone ? `
                <div style="text-align:center; padding:var(--sp-3); background:rgba(16,185,129,0.08); border-radius:var(--radius-lg); margin-bottom:var(--sp-3);">
                    <div style="color:var(--accent-dark); font-weight:var(--fw-bold); display:flex; align-items:center; justify-content:center; gap:8px;">
                        ${LangyIcons.check} Event Completed! Reward claimed.
                    </div>
                </div>
            ` : `
                <button class="btn btn--primary btn--full" id="event-participate">
                    ${LangyIcons.rocket} Start Challenge
                </button>
            `}
            <button class="btn btn--ghost btn--full" id="event-close" style="margin-top:var(--sp-2);">Close</button>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector('#event-close')?.addEventListener('click', () => overlay.remove());

    overlay.querySelector('#event-participate')?.addEventListener('click', () => {
        overlay.remove();
        Anim.showToast(`${LangyIcons.sparkles} Challenge started! Complete lessons to earn progress.`);
        // Simulate participation — in real app, this connects to lesson completion
        if (!LangyState._eventProgress) LangyState._eventProgress = {};
        LangyState._eventProgress[event.id] = (LangyState._eventProgress[event.id] || 0) + 1;
        Router.navigate('learning');
    });
}

Router.register('events', renderEvents);

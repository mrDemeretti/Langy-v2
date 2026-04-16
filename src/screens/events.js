/* ============================================
   SCREEN: EVENTS
   ============================================ */

function renderEvents(container) {
    const { events } = LangyState;

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="events-back">←</div>
                <div class="nav-header__title">Events</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: var(--sp-2) var(--sp-6) var(--sp-4);">
                <p class="text-secondary text-sm">Special challenges and rewards!</p>
            </div>

            <div class="events__list">
                ${events.map(event => `
                    <div class="event-card" data-id="${event.id}">
                        <div class="event-card__banner" style="background:${event.bg};">
                            <span style="font-size:48px; color:white; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.1));">${event.emoji}</span>
                        </div>
                        <div class="event-card__content">
                            <div class="event-card__title">${event.title}</div>
                            <p class="text-sm text-secondary" style="margin-top:var(--sp-1);">${event.desc}</p>
                            <div class="event-card__meta">
                                <span style="display:flex;align-items:center;gap:4px;">${LangyIcons.clock} ${event.timeLeft} left</span>
                                <span class="badge badge--gold" style="display:flex;align-items:center;gap:4px;">${LangyIcons.gift} ${event.reward}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.querySelector('#events-back')?.addEventListener('click', () => Router.navigate('home'));

    container.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
            Anim.showToast(`Event details coming soon! ${LangyIcons.sparkles}`);
        });
    });

    setTimeout(() => Anim.staggerChildren(container, '.event-card'), 100);
}

Router.register('events', renderEvents);

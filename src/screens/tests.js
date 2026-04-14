/* ============================================
   SCREEN: TESTS
   ============================================ */

function renderTests(container) {
    const { tests } = LangyState;

    const categories = [
        { key: 'listening', name: 'Listening', icon: '🎧', color: 'var(--primary-bg)' },
        { key: 'speaking', name: 'Speaking', icon: '🎤', color: 'var(--accent-bg)' },
        { key: 'reading', name: 'Reading', icon: '📖', color: 'var(--reward-gold-bg)' },
        { key: 'grammar', name: 'Grammar', icon: '✏️', color: 'rgba(59,130,246,0.1)' },
    ];

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="tests-back">←</div>
                <div class="nav-header__title">Tests & Scores</div>
                <div style="width:36px;"></div>
            </div>

            <div class="tests__categories" id="tests-list">
                ${categories.map(cat => {
                    const items = tests[cat.key] || [];
                    const avgScore = items.length ? Math.round(items.reduce((s, t) => s + t.score, 0) / items.length) : 0;
                    return `
                        <div class="test-category" data-cat="${cat.key}">
                            <div class="test-category__header">
                                <div class="test-category__icon" style="background:${cat.color};">${cat.icon}</div>
                                <div style="flex:1;">
                                    <div style="font-weight:var(--fw-bold);">${cat.name}</div>
                                    <div style="font-size:var(--fs-xs); color:var(--text-secondary);">${items.length} test${items.length !== 1 ? 's' : ''} completed</div>
                                </div>
                                <div style="text-align:right;">
                                    <div style="font-size:var(--fs-lg); font-weight:var(--fw-black); color:${avgScore >= 80 ? 'var(--accent-dark)' : avgScore >= 60 ? 'var(--reward-gold)' : 'var(--danger)'};">${avgScore}%</div>
                                    <div style="font-size:var(--fs-xs); color:var(--text-secondary);">avg</div>
                                </div>
                            </div>
                            ${items.length ? `
                                <div class="test-category__scores">
                                    ${items.map(t => `
                                        <div class="test-score">
                                            <span style="color:${t.score >= 80 ? 'var(--accent-dark)' : t.score >= 60 ? 'var(--reward-gold)' : 'var(--danger)'};">${t.grade}</span>
                                            ${t.score}%
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <div style="font-size:var(--fs-xs); color:var(--text-tertiary); padding:var(--sp-2) 0;">No tests taken yet</div>
                            `}
                        </div>
                    `;
                }).join('')}
            </div>

            <div style="padding: var(--sp-5) var(--sp-6);">
                <button class="btn btn--primary btn--full btn--lg" id="tests-new">Take a New Test</button>
            </div>
        </div>
    `;

    container.querySelector('#tests-back')?.addEventListener('click', () => Router.navigate('home'));

    container.querySelector('#tests-new')?.addEventListener('click', () => {
        Anim.showToast('Starting new test... 📝');
        setTimeout(() => Router.navigate('learning'), 600);
    });

    // Tap category for detail
    container.querySelectorAll('.test-category').forEach(cat => {
        cat.addEventListener('click', () => {
            const key = cat.dataset.cat;
            showTestDetails(key);
        });
    });

    setTimeout(() => Anim.staggerChildren(container, '.test-category'), 80);
}

function showTestDetails(catKey) {
    const tests = LangyState.tests[catKey] || [];
    const catNames = { listening: 'Listening', speaking: 'Speaking', reading: 'Reading', grammar: 'Grammar' };

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet">
            <div class="overlay__handle"></div>
            <h3 style="margin-bottom: var(--sp-4);">${catNames[catKey]} Tests</h3>

            ${tests.length ? tests.map(t => `
                <div class="card" style="margin-bottom:var(--sp-3); padding:var(--sp-4);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <div style="font-weight:var(--fw-semibold);">${t.name}</div>
                            <div style="font-size:var(--fs-xs); color:var(--text-secondary);">${t.date}</div>
                        </div>
                        <div style="text-align:right;">
                            <div style="font-size:var(--fs-xl); font-weight:var(--fw-black); color:${t.score >= 80 ? 'var(--accent-dark)' : 'var(--reward-gold)'};">${t.score}%</div>
                            <div class="badge ${t.score >= 80 ? 'badge--accent' : 'badge--gold'}">${t.grade}</div>
                        </div>
                    </div>
                    <div class="progress" style="margin-top:var(--sp-3);">
                        <div class="progress__fill" style="width:${t.score}%;"></div>
                    </div>
                </div>
            `).join('') : `
                <div class="empty-state">
                    <div class="empty-state__icon">📭</div>
                    <div class="empty-state__title">No tests yet</div>
                </div>
            `}

            <button class="btn btn--ghost btn--full" style="margin-top:var(--sp-2);" id="test-detail-close">Close</button>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    overlay.querySelector('#test-detail-close')?.addEventListener('click', () => overlay.remove());
}

Router.register('tests', renderTests);

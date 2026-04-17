/* ============================================
   SCREEN: TESTS
   ============================================ */

function renderTests(container) {
    const { tests } = LangyState;

    const categories = [
        { key: 'listening', name: 'Listening', icon: LangyIcons.headphones, color: 'var(--primary-bg)' },
        { key: 'speaking', name: 'Speaking', icon: LangyIcons.mic, color: 'var(--accent-bg)' },
        { key: 'reading', name: 'Reading', icon: LangyIcons.bookOpen, color: 'var(--reward-gold-bg)' },
        { key: 'grammar', name: 'Grammar', icon: LangyIcons.pencil, color: 'rgba(59,130,246,0.1)' },
    ];

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="tests-back">${LangyIcons.back}</div>
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
        // Show skill picker
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        const cats = [
            { key: 'grammar', name: 'Grammar', icon: LangyIcons.pencil },
            { key: 'vocabulary', name: 'Vocabulary', icon: LangyIcons.book },
            { key: 'listening', name: 'Listening', icon: LangyIcons.headphones },
            { key: 'reading', name: 'Reading', icon: LangyIcons.bookOpen }
        ];
        overlay.innerHTML = `
            <div class="overlay__sheet">
                <div class="overlay__handle"></div>
                <h3 style="margin-bottom:var(--sp-4);">Choose Test Category</h3>
                <div style="display:flex; flex-direction:column; gap:var(--sp-2);">
                    ${cats.map(c => `
                        <div class="profile__option test-cat-pick" data-cat="${c.key}" style="cursor:pointer;">
                            <div class="profile__option-icon" style="background:var(--primary-bg);">${c.icon}</div>
                            <div class="profile__option-text">
                                <div class="profile__option-label">${c.name} Test</div>
                                <div class="profile__option-desc">10 questions · ${LangyState.settings.languageLevel || 'B1'} level</div>
                            </div>
                            <div class="profile__option-arrow">${LangyIcons.arrow}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
        overlay.querySelectorAll('.test-cat-pick').forEach(el => {
            el.addEventListener('click', () => {
                const catKey = el.dataset.cat;
                overlay.remove();
                runSkillTest(catKey, container);
            });
        });
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
                    <div class="empty-state__icon">${LangyIcons.inbox}</div>
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

// ─── Run a skill test with real exercises ───
function runSkillTest(catKey, container) {
    const level = LangyState.settings.languageLevel || 'B1';
    const TOTAL = 10;
    let exercises = [];

    // Generate exercises using ExerciseGenerator if available
    if (typeof ExerciseGenerator !== 'undefined') {
        exercises = ExerciseGenerator.generateBatch(level, TOTAL, { noRepeatTypes: true });
    } else {
        // Fallback: use static curriculum exercises
        const tb = typeof LangyCurriculum !== 'undefined' ? LangyCurriculum.getActive() : null;
        if (tb) {
            const allEx = tb.units.flatMap(u => u.exercises || []);
            exercises = [...allEx].sort(() => Math.random() - 0.5).slice(0, TOTAL);
        }
    }

    if (exercises.length === 0) {
        Anim.showToast('No exercises available');
        return;
    }

    let idx = 0;
    let correct = 0;
    const startTime = Date.now();

    function renderQuestion() {
        if (idx >= exercises.length) {
            finishTest();
            return;
        }

        const ex = exercises[idx];
        container.innerHTML = `
            <div class="screen screen--no-pad">
                <div class="nav-header">
                    <div class="nav-header__back" id="test-abort">${LangyIcons.back}</div>
                    <div class="nav-header__title">${catKey.charAt(0).toUpperCase() + catKey.slice(1)} Test</div>
                    <div class="badge badge--primary">${idx + 1}/${exercises.length}</div>
                </div>
                <div class="progress" style="margin:0 var(--sp-6) var(--sp-4); border-radius:0;">
                    <div class="progress__fill" style="width:${(idx / exercises.length) * 100}%; transition:width 0.3s ease;"></div>
                </div>
                <div style="padding:0 var(--sp-6) var(--sp-6);" id="test-widget-area"></div>
            </div>
        `;

        container.querySelector('#test-abort')?.addEventListener('click', () => {
            renderTests(container);
        });

        const widgetArea = container.querySelector('#test-widget-area');
        const widgetType = ex.widgetType || ex.type || 'fill-bubble';
        const widgetData = ex.widgetData || ex.data || { sentence: ex.prompt || 'Choose the answer', options: ex.options || ['A', 'B', 'C'], correct: ex.correct || 0 };

        if (typeof LangyWidgets !== 'undefined') {
            LangyWidgets.render(widgetArea, widgetType, widgetData, (isCorrect) => {
                if (isCorrect === true) correct++;
                idx++;
                setTimeout(() => renderQuestion(), 1200);
            });
        }
    }

    function finishTest() {
        const score = Math.round((correct / exercises.length) * 100);
        const duration = Math.round((Date.now() - startTime) / 60000);
        const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';

        // Save to state
        if (!LangyState.tests[catKey]) LangyState.tests[catKey] = [];
        LangyState.tests[catKey].push({
            name: `${catKey.charAt(0).toUpperCase() + catKey.slice(1)} Test`,
            score, grade,
            date: new Date().toISOString().split('T')[0]
        });
        if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();

        container.innerHTML = `
            <div class="screen screen--center" style="gap:var(--sp-6); text-align:center;">
                <div style="font-size:72px;">${score >= 70 ? LangyIcons.trophy : LangyIcons.target}</div>
                <h2 style="color:${score >= 70 ? 'var(--accent-dark)' : 'var(--danger)'};">
                    ${score >= 80 ? 'Excellent!' : score >= 70 ? 'Good Job!' : 'Keep Practicing!'}
                </h2>
                <div style="display:flex; gap:var(--sp-8);">
                    <div class="stat">
                        <div class="stat__value" style="color:${score >= 70 ? 'var(--accent-dark)' : 'var(--danger)'};">${score}%</div>
                        <div class="stat__label">Score</div>
                    </div>
                    <div class="stat">
                        <div class="stat__value">${grade}</div>
                        <div class="stat__label">Grade</div>
                    </div>
                    <div class="stat">
                        <div class="stat__value">${correct}/${exercises.length}</div>
                        <div class="stat__label">Correct</div>
                    </div>
                </div>
                <button class="btn btn--primary btn--xl btn--full" id="test-done" style="max-width:300px;">
                    ${LangyIcons.check} Done
                </button>
            </div>
        `;

        container.querySelector('#test-done')?.addEventListener('click', () => renderTests(container));
    }

    renderQuestion();
}

Router.register('tests', renderTests);

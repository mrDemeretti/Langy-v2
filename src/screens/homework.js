/* ============================================
   SCREEN: HOMEWORK — Generated from lessons
   Saves & tracks homework completion
   ============================================ */

function renderHomework(container) {
    const { homework, progress } = LangyState;
    const activeTab = window._homeworkTab || 'current';

    // Auto-generate homework if empty and lessons have been done
    if (homework.current.length === 0 && progress.lessonHistory.length > 0) {
        autoGenerateHomework();
    }

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="homework-back">←</div>
                <div class="nav-header__title">Homework</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: 0 var(--sp-6) var(--sp-4);">
                <div class="tabs" id="homework-tabs">
                    <button class="tabs__tab ${activeTab === 'current' ? 'tabs__tab--active' : ''}" data-tab="current">Current (${homework.current.length})</button>
                    <button class="tabs__tab ${activeTab === 'completed' ? 'tabs__tab--active' : ''}" data-tab="completed">Completed (${progress.lessonHistory.length})</button>
                </div>
            </div>

            <div class="homework__list" id="homework-list">
                ${activeTab === 'current' ? renderCurrentHomework(homework.current) : renderCompletedHomework(progress.lessonHistory)}
            </div>
        </div>
    `;

    // Tab switching
    container.querySelectorAll('.tabs__tab').forEach(tab => {
        tab.addEventListener('click', () => {
            window._homeworkTab = tab.dataset.tab;
            renderHomework(container);
        });
    });

    container.querySelector('#homework-back')?.addEventListener('click', () => Router.navigate('home'));

    // Click on homework card
    container.querySelectorAll('.homework-card').forEach(card => {
        card.addEventListener('click', () => {
            const status = card.dataset.status;
            const unitId = card.dataset.unitId;
            const id = card.dataset.id;

            if (status === 'pending') {
                Anim.showToast(`Starting Homework with DeepTutor... ${LangyIcons.book}`);
                setTimeout(() => Router.navigate('learning', { mode: 'homework', active: true, unitId: parseInt(unitId) }), 600);
            } else if (status === 'error' || status === 'done') {
                showHomeworkErrors(id);
            }
        });
    });

    setTimeout(() => Anim.staggerChildren(container, '.homework-card'), 80);
}

// ─── Auto-generate homework from completed lessons ───
function autoGenerateHomework() {
    const activeTb = typeof LangyCurriculum !== 'undefined' ? LangyCurriculum.getActive() : null;
    if (!activeTb) return;

    const completedUnitIds = new Set(LangyState.progress.lessonHistory.map(l => l.unitId));
    const existingHwUnitIds = new Set(LangyState.homework.current.map(h => h.unitId));

    activeTb.units.forEach(unit => {
        if (completedUnitIds.has(unit.id) && !existingHwUnitIds.has(unit.id)) {
            // Check if already completed homework for this unit
            const alreadyDone = LangyState.progress.lessonHistory.some(
                l => l.unitId === unit.id && l.status === 'done'
            );
            
            // Generate homework for units that need review (scored below 90%)
            const lessonResult = LangyState.progress.lessonHistory.find(l => l.unitId === unit.id);
            if (lessonResult && lessonResult.score < 90) {
                LangyState.homework.current.push({
                    id: Date.now() + unit.id,
                    unitId: unit.id,
                    title: `${unit.title} — Review`,
                    desc: unit.homework?.prompt || `Review ${unit.grammar?.join(', ') || 'this lesson'}.`,
                    icon: LangyIcons.fileText,
                    createdAt: new Date().toISOString()
                });
            }
        }
    });

    if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
}

function renderCurrentHomework(items) {
    if (!items.length) {
        return `<div class="empty-state">
            <div class="empty-state__icon">${LangyIcons.sparkles}</div>
            <div class="empty-state__title">All Done!</div>
            <div class="empty-state__text">No homework right now. Complete more lessons to get assignments!</div>
        </div>`;
    }
    return items.map(item => `
        <div class="homework-card" data-id="${item.id}" data-status="pending" data-unit-id="${item.unitId}">
            <div class="homework-card__icon" style="background: var(--primary-bg);">${item.icon || LangyIcons.fileText}</div>
            <div class="homework-card__info">
                <div class="homework-card__title">${item.title}</div>
                <div class="homework-card__meta">${item.desc || 'Review the previous lesson.'}</div>
            </div>
            <div class="homework-card__status homework-card__status--pending">Start →</div>
        </div>
    `).join('');
}

function renderCompletedHomework(items) {
    if (!items.length) {
        return `<div class="empty-state">
            <div class="empty-state__icon">${LangyIcons.inbox}</div>
            <div class="empty-state__title">No completed tasks yet</div>
            <div class="empty-state__text">Complete lessons and homework to see results here</div>
        </div>`;
    }
    return items.slice().reverse().map(item => `
        <div class="homework-card" data-id="${item.id}" data-status="${item.status}" data-unit-id="${item.unitId}">
            <div class="homework-card__icon" style="background: ${item.status === 'error' ? 'var(--danger-bg)' : 'var(--accent-bg)'};">${item.icon || LangyIcons.fileText}</div>
            <div class="homework-card__info">
                <div class="homework-card__title">${item.title}</div>
                <div class="homework-card__meta">Score: ${item.score}% · ${item.date || ''} ${item.errors > 0 ? `· ${item.errors} error${item.errors !== 1 ? 's' : ''}` : ''}</div>
            </div>
            <div class="homework-card__status homework-card__status--${item.status}">
                ${item.status === 'error' ? `<span style="display:flex;align-items:center;gap:4px;">Review ${LangyIcons.alertTriangle}</span>` : `<span style="display:flex;align-items:center;gap:4px;">Done ${LangyIcons.check}</span>`}
            </div>
        </div>
    `).join('');
}

function showHomeworkErrors(itemId) {
    const item = LangyState.progress.lessonHistory.find(h => h.id == itemId);
    if (!item) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet">
            <div class="overlay__handle"></div>
            <h3 style="margin-bottom: var(--sp-4);">${item.title}</h3>
            <div style="display:flex; gap:var(--sp-4); margin-bottom:var(--sp-4);">
                <div class="stat">
                    <div class="stat__value" style="color: ${item.score >= 80 ? 'var(--accent-dark)' : 'var(--danger)'};">${item.score}%</div>
                    <div class="stat__label">Score</div>
                </div>
                <div class="stat">
                    <div class="stat__value">${item.grade || '-'}</div>
                    <div class="stat__label">Grade</div>
                </div>
                <div class="stat">
                    <div class="stat__value">${item.errors || 0}</div>
                    <div class="stat__label">Errors</div>
                </div>
            </div>

            <h4 style="margin-bottom: var(--sp-3);">Feedback</h4>
            <div style="display:flex; flex-direction:column; gap:var(--sp-2);">
                <div class="card card--flat" style="padding:var(--sp-3); border-left:4px solid var(--primary);">
                    <div style="font-size:var(--fs-sm); line-height:1.5;">${item.feedback || "Good work on this unit! Keep practicing to improve your score."}</div>
                </div>
            </div>

            <button class="btn btn--primary btn--full" style="margin-top:var(--sp-5);" id="error-close">Got it!</button>
            ${item.score < 70 ? `<button class="btn btn--ghost btn--full" style="margin-top:var(--sp-2); display:flex; align-items:center; justify-content:center; gap:8px;" id="error-retry">${LangyIcons.refresh} Retry This Lesson</button>` : ''}
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
    overlay.querySelector('#error-close')?.addEventListener('click', () => overlay.remove());
    overlay.querySelector('#error-retry')?.addEventListener('click', () => {
        overlay.remove();
        Router.navigate('learning', { mode: 'homework', unitId: item.unitId });
    });
}

Router.register('homework', renderHomework);

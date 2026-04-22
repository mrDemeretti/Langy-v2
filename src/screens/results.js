/* ============================================
   SCREEN: RESULTS (Course Progress + CEFR Roadmap)
   Full redesign: learning path + quick unit check
   ============================================ */

function renderResults(container) {
    const { progress, user } = LangyState;
    const activeTb = typeof LangyCurriculum !== 'undefined' ? LangyCurriculum.getActive() : null;
    const totalUnits = typeof LangyCurriculum !== 'undefined' ? LangyCurriculum.getTotalUnits() : 1;
    const completedLessons = progress.lessonHistory.filter(l => l.status === 'done');
    const failedLessons = progress.lessonHistory.filter(l => l.status === 'error');
    const avgScore =
        progress.lessonHistory.length > 0
            ? Math.round(progress.lessonHistory.reduce((s, l) => s + (l.score || 0), 0) / progress.lessonHistory.length)
            : 0;

    // Extract CEFR code from level string like "B2 Upper Intermediate / Выше среднего"
    const userCefr = (user.level || 'A1').substring(0, 2);

    // Get real current unit name from curriculum
    let currentUnitName = progress.currentUnit || 'Unit 1';
    let currentUnitCefr = userCefr;
    if (activeTb) {
        const unit = activeTb.units.find(u => u.id === progress.currentUnitId);
        if (unit) {
            currentUnitName = 'Unit ' + unit.id + ': ' + unit.title;
            currentUnitCefr = activeTb.cefr;
        }
    }

    // Get CEFR level statuses for the roadmap
    const levelStatuses = typeof LangyCurriculum !== 'undefined' ? LangyCurriculum.getLevelStatus(userCefr) : [];

    // Status config
    const statusConfig = {
        completed: {
            label: 'Completed',
            icon: LangyIcons.checkCircle,
            color: 'var(--accent-dark)',
            bg: 'rgba(16,185,129,0.08)',
        },
        active: { label: 'In Progress', icon: LangyIcons.rocket, color: 'var(--primary)', bg: 'rgba(16,185,129,0.1)' },
        mastered: {
            label: 'Mastered',
            icon: LangyIcons.star,
            color: 'var(--reward-gold)',
            bg: 'rgba(245,158,11,0.08)',
        },
        locked: { label: 'Locked', icon: LangyIcons.lock, color: 'var(--text-tertiary)', bg: 'var(--bg-card)' },
    };

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="results-back">${LangyIcons.back}</div>
                <div class="nav-header__title">${{ en: 'My Progress', ru: 'Мой прогресс', es: 'Mi Progreso' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en']}</div>
                <div style="width:36px;"></div>
            </div>

            <div class="results__content">
                <!-- Overall Level Card -->
                <div class="results__overall">
                    <div style="font-size:var(--fs-sm); opacity:0.8;">Current Level</div>
                    <div class="results__level">${user.level}</div>
                    <div style="margin-top:var(--sp-3);">
                        <div style="display:flex; justify-content:space-between; font-size:var(--fs-xs); margin-bottom:var(--sp-1); opacity:0.8;">
                            <span>Overall Progress</span>
                            <span>${progress.overall}%</span>
                        </div>
                        <div class="progress" style="background:rgba(255,255,255,0.2);">
                            <div class="progress__fill" style="width:${progress.overall}%; background: linear-gradient(90deg, #4ADE80, #FCD34D);"></div>
                        </div>
                    </div>
                    <div style="display:flex; justify-content:center; gap:var(--sp-8); margin-top:var(--sp-4);">
                        <div><span style="font-size:var(--fs-xl); font-weight:var(--fw-black);">${completedLessons.length}</span><br><span style="font-size:var(--fs-xs); opacity:0.7;">Lessons Done</span></div>
                        <div><span style="font-size:var(--fs-xl); font-weight:var(--fw-black);">${totalUnits}</span><br><span style="font-size:var(--fs-xs); opacity:0.7;">Total Units</span></div>
                        <div><span style="font-size:var(--fs-xl); font-weight:var(--fw-black);">${user.xp}</span><br><span style="font-size:var(--fs-xs); opacity:0.7;">XP Earned</span></div>
                    </div>
                </div>

                <!-- Fixed Current Unit Card -->
                <div class="card">
                    <div style="font-size:var(--fs-xs); color:var(--text-secondary); font-weight:var(--fw-semibold); text-transform:uppercase; letter-spacing:0.5px;">Current Unit</div>
                    <div style="font-weight:var(--fw-bold); margin-top:var(--sp-1);">${currentUnitName}</div>
                    <div style="font-size:var(--fs-xs); color:var(--text-tertiary); margin-top:var(--sp-1); display:flex; align-items:center; gap:4px;">
                        ${LangyIcons.book} ${currentUnitCefr} — ${activeTb ? activeTb.title : 'Langy Course'}
                    </div>
                </div>

                <!-- ═══════════════════════════════════ -->
                <!-- CEFR LEARNING PATH                  -->
                <!-- ═══════════════════════════════════ -->
                <div>
                    <h4 style="margin-bottom:var(--sp-3); padding-left:var(--sp-1); display:flex; align-items:center; gap:8px;">
                        ${LangyIcons.map} Learning Path
                    </h4>
                    <div class="cefr-path" id="cefr-path">
                        ${levelStatuses
                            .map((lvl, idx) => {
                                const cfg = statusConfig[lvl.status] || statusConfig.locked;
                                const isExpanded = lvl.status === 'active';
                                return `
                                <div class="cefr-level cefr-level--${lvl.status} ${isExpanded ? 'cefr-level--expanded' : ''}" data-tb-id="${lvl.id}" data-cefr="${lvl.cefr}">
                                    <div class="cefr-level__header" data-idx="${idx}">
                                        <div class="cefr-level__connector">
                                            <div class="cefr-level__dot" style="border-color:${cfg.color}; ${lvl.status === 'active' ? 'background:' + cfg.color : ''}"></div>
                                            ${idx < levelStatuses.length - 1 ? '<div class="cefr-level__line"></div>' : ''}
                                        </div>
                                        <div class="cefr-level__info" style="flex:1;">
                                            <div class="cefr-level__title">
                                                <span class="cefr-level__badge" style="background:${cfg.color}; color:white;">${lvl.cefr}</span>
                                                <span>${lvl.title.split(' — ')[1] || lvl.title}</span>
                                            </div>
                                            <div class="cefr-level__meta">
                                                <span style="color:${cfg.color}; display:flex; align-items:center; gap:4px;">${cfg.icon} ${cfg.label}</span>
                                                <span>${lvl.completedUnits}/${lvl.unitCount} units</span>
                                            </div>
                                            ${
                                                lvl.status !== 'locked'
                                                    ? `
                                                <div class="progress" style="height:4px; margin-top:6px;">
                                                    <div class="progress__fill" style="width:${lvl.status === 'mastered' ? 100 : lvl.progress}%; background:${cfg.color};"></div>
                                                </div>
                                            `
                                                    : ''
                                            }
                                        </div>
                                        <div class="cefr-level__arrow" style="color:${cfg.color};">${LangyIcons.chevronDown}</div>
                                    </div>
                                    <div class="cefr-level__units" style="${isExpanded ? '' : 'display:none;'}">
                                        <!-- units loaded dynamically -->
                                    </div>
                                </div>
                            `;
                            })
                            .join('')}
                    </div>
                </div>

                <!-- Average Score -->
                <div class="card" style="display:flex; align-items:center; gap:var(--sp-4);">
                    <div style="font-size:36px; color:${avgScore >= 80 ? 'var(--accent-dark)' : avgScore >= 60 ? 'var(--primary)' : 'var(--warning)'};">${avgScore >= 80 ? LangyIcons.trophy : avgScore >= 60 ? LangyIcons.barChart : LangyIcons.award}</div>
                    <div>
                        <div style="font-size:var(--fs-xl); font-weight:var(--fw-black); color:${avgScore >= 80 ? 'var(--accent-dark)' : avgScore >= 60 ? 'var(--primary)' : 'var(--warning)'};">${avgScore}%</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">Average Score</div>
                    </div>
                    <div style="margin-left:auto; text-align:right;">
                        <div style="color:var(--accent-dark); font-weight:var(--fw-bold); display:flex; align-items:center; gap:4px;">${completedLessons.length} ${LangyIcons.check}</div>
                        <div style="color:var(--danger); font-size:var(--fs-xs);">${failedLessons.length} needs review</div>
                    </div>
                </div>

                <!-- Skills Breakdown -->
                <div>
                    <h4 style="margin-bottom:var(--sp-3); padding-left: var(--sp-1);">Skills Breakdown</h4>
                    <div class="results__skills">
                        ${Object.entries(progress.skills)
                            .map(([skill, value]) => {
                                const icons = {
                                    vocabulary: LangyIcons.book,
                                    grammar: LangyIcons.pencil,
                                    listening: LangyIcons.headphones,
                                    speaking: LangyIcons.mic,
                                    writing: LangyIcons.fileText,
                                    reading: LangyIcons.bookOpen,
                                };
                                const colors = {
                                    vocabulary: 'var(--primary)',
                                    grammar: 'var(--info)',
                                    listening: 'var(--accent-dark)',
                                    speaking: 'var(--reward-gold)',
                                    writing: 'var(--warning)',
                                    reading: 'var(--primary-dark)',
                                };
                                return `
                                <div class="skill-bar">
                                    <div class="skill-bar__header">
                                        <span style="display:flex;align-items:center;gap:8px;">${icons[skill] || LangyIcons.barChart} ${skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                                        <span style="color:${colors[skill]}; font-weight:var(--fw-bold);">${value}%</span>
                                    </div>
                                    <div class="progress">
                                        <div class="progress__fill" style="width:${value}%; background:${colors[skill]};"></div>
                                    </div>
                                </div>
                            `;
                            })
                            .join('')}
                    </div>
                </div>

                <!-- Lesson History -->
                <div>
                    <h4 style="margin-bottom:var(--sp-3); padding-left: var(--sp-1);">Lesson History</h4>
                    <div style="display:flex; flex-direction:column; gap:var(--sp-2);">
                        ${
                            progress.lessonHistory.length > 0
                                ? progress.lessonHistory
                                      .slice()
                                      .reverse()
                                      .slice(0, 10)
                                      .map(
                                          lesson => `
                                <div class="card" style="display:flex; align-items:center; justify-content:space-between; padding:var(--sp-3) var(--sp-4);">
                                    <div style="display:flex; align-items:center; gap:var(--sp-2);">
                                        <span style="font-size:16px;">${lesson.status === 'done' ? LangyIcons.checkCircle : LangyIcons.alertTriangle}</span>
                                        <div>
                                            <div style="font-weight:var(--fw-medium);">${lesson.title}</div>
                                            <div style="font-size:var(--fs-xs); color:var(--text-tertiary);">${lesson.date || ''} · ${lesson.grade || ''}</div>
                                        </div>
                                    </div>
                                    <span class="badge ${lesson.score >= 70 ? 'badge--accent' : 'badge--danger'}">${lesson.score}%</span>
                                </div>
                            `
                                      )
                                      .join('')
                                : `<div class="text-center text-xs text-secondary" style="padding:var(--sp-4); display:flex; flex-direction:column; align-items:center; gap:8px;">${LangyIcons.book} No lessons completed yet. Start learning to see your progress!</div>`
                        }
                    </div>
                </div>

                <!-- Weak Areas (from AI memory) -->
                ${
                    LangyState.aiMemory.mistakes.length > 0
                        ? `
                <div>
                    <h4 style="margin-bottom:var(--sp-3); padding-left:var(--sp-1); display:flex; align-items:center; gap:8px;">${LangyIcons.alertTriangle} Areas to Improve</h4>
                    <div class="card" style="display:flex; flex-direction:column; gap:var(--sp-2);">
                        ${LangyState.aiMemory.mistakes
                            .slice(-5)
                            .map(
                                m => `
                            <div style="font-size:var(--fs-sm); padding:var(--sp-2); border-bottom:1px solid var(--border-light);">
                                <span style="color:var(--danger);">${LangyIcons.x}</span> ${m.question || m.context || 'Grammar mistake'}
                            </div>
                        `
                            )
                            .join('')}
                    </div>
                </div>`
                        : ''
                }

                <!-- Weekly Activity Chart -->
                <div>
                    <h4 style="margin-bottom:var(--sp-3); padding-left:var(--sp-1); display:flex; align-items:center; gap:8px;">${LangyIcons.barChart2} Weekly Activity</h4>
                    <div class="card" style="padding:var(--sp-4);">
                        <div class="weekly-chart" id="weekly-chart">
                            ${buildWeeklyChart()}
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:var(--fs-xs); color:var(--text-tertiary); margin-top:var(--sp-2);">
                            <span>${LangyState.streakData.totalSessions || 0} total sessions</span>
                            <span>${Math.round(LangyState.streakData.totalMinutes || 0)} min studied</span>
                        </div>
                    </div>
                </div>

                <!-- Review Weak Units -->
                ${
                    failedLessons.length > 0
                        ? `
                <div>
                    <div class="card" style="padding:var(--sp-4); background:linear-gradient(135deg, rgba(239,68,68,0.04), rgba(245,158,11,0.04)); border: 1px dashed rgba(239,68,68,0.2);">
                        <div style="display:flex; align-items:center; gap:var(--sp-3); margin-bottom:var(--sp-3);">
                            <div style="width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg, #EF4444, #F59E0B); display:flex; align-items:center; justify-content:center; color:white; flex-shrink:0;">${LangyIcons.refreshCw}</div>
                            <div>
                                <div style="font-weight:var(--fw-bold);">Review Weak Units</div>
                                <div style="font-size:var(--fs-xs); color:var(--text-secondary);">${failedLessons.length} unit${failedLessons.length > 1 ? 's' : ''} need${failedLessons.length === 1 ? 's' : ''} practice</div>
                            </div>
                        </div>
                        <button class="btn btn--primary btn--full" id="review-weak" style="background:linear-gradient(135deg, #EF4444, #F59E0B); box-shadow: 0 4px 0 #B91C1C;">
                            ${LangyIcons.rocket} Start Review Session
                        </button>
                    </div>
                </div>
                `
                        : ''
                }
            </div>
        </div>
    `;

    // ── Back button ──
    container.querySelector('#results-back')?.addEventListener('click', () => Router.navigate('home'));

    // ── Review Weak Units ──
    container.querySelector('#review-weak')?.addEventListener('click', () => {
        const weakUnits = LangyState.progress.lessonHistory.filter(l => l.status === 'error');
        if (weakUnits.length > 0) {
            const randomWeak = weakUnits[Math.floor(Math.random() * weakUnits.length)];
            Anim.showToast(`${LangyIcons.rocket} Starting review of weak areas...`);
            setTimeout(() => Router.navigate('learning', { mode: 'review', unitId: randomWeak.unitId }), 500);
        }
    });

    // ── CEFR Accordion ──
    container.querySelectorAll('.cefr-level__header').forEach(header => {
        header.addEventListener('click', () => {
            const level = header.closest('.cefr-level');
            const unitsContainer = level.querySelector('.cefr-level__units');
            const arrow = level.querySelector('.cefr-level__arrow');
            const isExpanded = level.classList.contains('cefr-level--expanded');

            if (isExpanded) {
                level.classList.remove('cefr-level--expanded');
                unitsContainer.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            } else {
                level.classList.add('cefr-level--expanded');
                unitsContainer.style.display = 'block';
                arrow.style.transform = 'rotate(180deg)';
                // Load units if not loaded
                if (!unitsContainer.dataset.loaded) {
                    loadLevelUnits(level.dataset.tbId, unitsContainer);
                    unitsContainer.dataset.loaded = 'true';
                }
            }
        });
    });

    // Load units for initially expanded levels
    container.querySelectorAll('.cefr-level--expanded').forEach(level => {
        const unitsContainer = level.querySelector('.cefr-level__units');
        if (!unitsContainer.dataset.loaded) {
            loadLevelUnits(level.dataset.tbId, unitsContainer);
            unitsContainer.dataset.loaded = 'true';
        }
    });

    // Animate
    setTimeout(() => Anim.staggerChildren(container, '.skill-bar, .card, .cefr-level'), 80);
}

// ── Load units for a CEFR level ──
function loadLevelUnits(textbookId, container) {
    if (typeof LangyCurriculum === 'undefined') return;

    const units = LangyCurriculum.getUnitStatusMap(textbookId);
    const unitTypeIcons = {
        grammar: LangyIcons.book,
        situational: LangyIcons.messageCircle,
        pronunciation: LangyIcons.mic,
        review: LangyIcons.refreshCw,
    };

    const unitStatusIcons = {
        completed: { icon: LangyIcons.checkCircle, color: 'var(--accent-dark)', label: 'Done' },
        current: { icon: LangyIcons.rocket, color: 'var(--primary)', label: 'Current' },
        mastered: { icon: LangyIcons.star, color: 'var(--reward-gold)', label: 'Mastered' },
        locked: { icon: LangyIcons.lock, color: 'var(--text-tertiary)', label: 'Locked' },
    };

    container.innerHTML = units
        .map(u => {
            const st = unitStatusIcons[u.status] || unitStatusIcons.locked;
            const typeIcon = unitTypeIcons[u.unitType] || LangyIcons.book;
            const canQuickCheck = u.status === 'mastered';
            const cleanTitle = u.title.replace(/^[🗣️🎤🔄📗]+\s*/, '');
            const isCheckpoint = u.unitType === 'review';

            return `
            <div class="cefr-unit cefr-unit--${u.status} ${isCheckpoint ? 'cefr-unit--checkpoint' : ''}" data-unit-id="${u.id}" data-tb-id="${textbookId}" ${canQuickCheck ? 'data-quick-check="true"' : ''}>
                <div class="cefr-unit__status" style="color:${isCheckpoint ? 'var(--info)' : st.color};">${isCheckpoint ? LangyIcons.clipboard : st.icon}</div>
                <div class="cefr-unit__info">
                    <div class="cefr-unit__title" style="${u.status === 'locked' ? 'opacity:0.5;' : ''}">
                        ${isCheckpoint ? `<span class="cefr-unit__checkpoint-badge">CHECKPOINT</span>` : `<span style="color:var(--text-tertiary); font-size:var(--fs-xs);">${u.id}.</span>`}
                        ${cleanTitle}
                    </div>
                    <div class="cefr-unit__type">
                        <span style="display:flex;align-items:center;gap:4px;">${typeIcon} ${isCheckpoint ? 'Review Test' : u.unitType}</span>
                        ${u.score !== null ? `<span class="badge ${u.score >= 70 ? 'badge--accent' : 'badge--danger'}" style="font-size:10px; padding:1px 6px;">${u.score}%</span>` : ''}
                    </div>
                </div>
                ${
                    canQuickCheck
                        ? `<div class="cefr-unit__check" title="Quick Check">
                    ${LangyIcons.target}
                </div>`
                        : ''
                }
            </div>
        `;
        })
        .join('');

    // Quick Check click handler
    container.querySelectorAll('.cefr-unit[data-quick-check="true"]').forEach(unitEl => {
        unitEl.addEventListener('click', () => {
            const tbId = unitEl.dataset.tbId;
            const unitId = parseInt(unitEl.dataset.unitId);
            startQuickCheck(tbId, unitId);
        });
    });
}

// ── Quick Unit Check: mini-quiz overlay ──
function startQuickCheck(textbookId, unitId) {
    if (typeof LangyCurriculum === 'undefined') return;

    const tb = LangyCurriculum.textbooks.find(t => t.id === textbookId);
    if (!tb) return;
    const unit = tb.units.find(u => u.id === unitId);
    if (!unit || !unit.exercises || unit.exercises.length === 0) {
        Anim.showToast('No exercises available for this unit');
        return;
    }

    // Pick 4 random exercises (skip speak-aloud for speed)
    const eligible = unit.exercises.filter(e => e.type !== 'speak-aloud' && e.type !== 'listen-type');
    const shuffled = eligible.sort(() => Math.random() - 0.5).slice(0, 4);
    if (shuffled.length === 0) {
        Anim.showToast('No checkable exercises for this unit');
        return;
    }

    let currentIdx = 0;
    let correctCount = 0;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet" style="max-height:90vh; overflow-y:auto;">
            <div class="overlay__handle"></div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--sp-4);">
                <h3 style="display:flex; align-items:center; gap:8px;">${LangyIcons.target} Quick Check</h3>
                <button class="btn btn--ghost" id="qc-close" style="padding:4px 8px;">${LangyIcons.x}</button>
            </div>
            <div style="font-size:var(--fs-sm); color:var(--text-secondary); margin-bottom:var(--sp-3);">
                Unit ${unitId}: ${unit.title.replace(/^[🗣️🎤🔄📗]+\s*/, '')}
            </div>
            <div class="progress" style="height:4px; margin-bottom:var(--sp-4);">
                <div class="progress__fill" id="qc-progress" style="width:0%; background:var(--primary); transition:width 0.3s;"></div>
            </div>
            <div id="qc-widget-area"></div>
        </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('#qc-close')?.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.remove();
    });

    function renderQuestion() {
        if (currentIdx >= shuffled.length) {
            showQuickCheckResults();
            return;
        }

        const ex = shuffled[currentIdx];
        const widgetArea = overlay.querySelector('#qc-widget-area');
        const progressBar = overlay.querySelector('#qc-progress');
        widgetArea.innerHTML = '';
        progressBar.style.width = Math.round((currentIdx / shuffled.length) * 100) + '%';

        LangyWidgets.render(widgetArea, ex.type, ex.data, isCorrect => {
            if (isCorrect === true) correctCount++;
            currentIdx++;
            setTimeout(renderQuestion, 1400);
        });
    }

    function showQuickCheckResults() {
        const score = Math.round((correctCount / shuffled.length) * 100);
        const passed = score >= 60;
        const widgetArea = overlay.querySelector('#qc-widget-area');
        const progressBar = overlay.querySelector('#qc-progress');
        progressBar.style.width = '100%';
        progressBar.style.background = passed ? 'var(--accent-dark)' : 'var(--danger)';

        widgetArea.innerHTML = `
            <div style="text-align:center; padding:var(--sp-6) 0;">
                <div style="font-size:48px; margin-bottom:var(--sp-3); color:${passed ? 'var(--accent-dark)' : 'var(--danger)'};">
                    ${passed ? LangyIcons.checkCircle : LangyIcons.alertTriangle}
                </div>
                <div style="font-size:var(--fs-2xl); font-weight:var(--fw-black); color:${passed ? 'var(--accent-dark)' : 'var(--danger)'};">
                    ${score}%
                </div>
                <div style="font-size:var(--fs-sm); color:var(--text-secondary); margin-top:var(--sp-2);">
                    ${correctCount}/${shuffled.length} correct
                </div>
                <div style="font-size:var(--fs-sm); margin-top:var(--sp-3); font-weight:var(--fw-semibold); color:${passed ? 'var(--accent-dark)' : 'var(--warning)'};">
                    ${passed ? `Mastery confirmed! ${LangyIcons.checkCircle}` : 'Needs review — consider revisiting this unit'}
                </div>
                ${
                    !passed
                        ? `
                    <div style="margin-top:var(--sp-4);">
                        <button class="btn btn--primary btn--full" id="qc-start-unit">Start This Unit</button>
                    </div>
                `
                        : ''
                }
                <button class="btn btn--ghost btn--full" id="qc-done" style="margin-top:var(--sp-2);">Close</button>
            </div>
        `;

        // If failed → mark unit as needing review in mastery
        if (!passed) {
            const key = textbookId + ':' + unitId;
            if (!LangyState.progress.mastery[key]) {
                LangyState.progress.mastery[key] = {};
            }
            LangyState.progress.mastery[key].needsReview = true;
            LangyState.progress.mastery[key].passed = false;

            overlay.querySelector('#qc-start-unit')?.addEventListener('click', () => {
                overlay.remove();
                // Switch to this textbook and unit
                LangyCurriculum.activeTextbookId = textbookId;
                LangyState.progress.currentUnitId = unitId;
                LangyState.aiMemory.currentTextbookId = textbookId;
                if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
                Router.navigate('learning');
            });
        }

        overlay.querySelector('#qc-done')?.addEventListener('click', () => {
            overlay.remove();
            // Refresh results screen
            renderResults(document.getElementById('screen-container'));
        });
    }

    renderQuestion();
}

// ─── Weekly Activity Chart Builder ───
function buildWeeklyChart() {
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const todayDay = today.getDay(); // 0=Sun
    const activeDays = LangyState.streakData.activeDays || [];

    // Get Monday of this week
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

    const weekData = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const iso = d.toISOString().split('T')[0];
        // Count sessions for this day (each activeDays entry = 1 session)
        const count = activeDays.filter(a => a === iso).length;
        // Simulate minutes (10-30 min per session)
        const mins = count > 0 ? Math.floor(Math.random() * 20 + 10) * count : 0;
        const isToday = d.toISOString().split('T')[0] === today.toISOString().split('T')[0];
        weekData.push({ day: dayNames[i], mins, count, isToday, active: count > 0 });
    }

    const maxMins = Math.max(...weekData.map(d => d.mins), 1);

    return weekData
        .map(d => {
            const heightPct = d.mins > 0 ? Math.max(10, Math.round((d.mins / maxMins) * 100)) : 5;
            return `
            <div class="weekly-chart__bar-wrap">
                ${d.mins > 0 ? `<div class="weekly-chart__value">${d.mins}m</div>` : ''}
                <div class="weekly-chart__bar ${d.isToday ? 'weekly-chart__bar--today' : ''} ${!d.active ? 'weekly-chart__bar--empty' : ''}" style="height:${heightPct}%;"></div>
                <div class="weekly-chart__label" style="${d.isToday ? 'color:var(--primary); font-weight:var(--fw-bold);' : ''}">${d.day}</div>
            </div>
        `;
        })
        .join('');
}

Router.register('results', renderResults);

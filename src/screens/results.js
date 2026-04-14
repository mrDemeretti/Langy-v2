/* ============================================
   SCREEN: RESULTS (Course Progress)
   Shows real lesson history and skill data
   ============================================ */

function renderResults(container) {
    const { progress, user } = LangyState;
    const activeTb = typeof LangyCurriculum !== 'undefined' ? LangyCurriculum.getActive() : null;
    const totalUnits = activeTb?.units?.length || 1;
    const completedLessons = progress.lessonHistory.filter(l => l.status === 'done');
    const failedLessons = progress.lessonHistory.filter(l => l.status === 'error');
    const avgScore = progress.lessonHistory.length > 0
        ? Math.round(progress.lessonHistory.reduce((s, l) => s + (l.score || 0), 0) / progress.lessonHistory.length)
        : 0;

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="results-back">←</div>
                <div class="nav-header__title">My Progress</div>
                <div style="width:36px;"></div>
            </div>

            <div class="results__content">
                <!-- Overall Level -->
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

                <!-- Current Unit -->
                <div class="card">
                    <div style="font-size:var(--fs-xs); color:var(--text-secondary); font-weight:var(--fw-semibold); text-transform:uppercase; letter-spacing:0.5px;">Current Unit</div>
                    <div style="font-weight:var(--fw-bold); margin-top:var(--sp-1);">${progress.currentUnit || 'Unit 1'}</div>
                    ${activeTb ? `<div style="font-size:var(--fs-xs); color:var(--text-tertiary); margin-top:var(--sp-1);">📘 ${activeTb.title}</div>` : ''}
                </div>

                <!-- Average Score -->
                <div class="card" style="display:flex; align-items:center; gap:var(--sp-4);">
                    <div style="font-size:36px;">${avgScore >= 80 ? '🏆' : avgScore >= 60 ? '📊' : '💪'}</div>
                    <div>
                        <div style="font-size:var(--fs-xl); font-weight:var(--fw-black); color:${avgScore >= 80 ? 'var(--accent-dark)' : avgScore >= 60 ? 'var(--primary)' : 'var(--warning)'};">${avgScore}%</div>
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary);">Average Score</div>
                    </div>
                    <div style="margin-left:auto; text-align:right;">
                        <div style="color:var(--accent-dark); font-weight:var(--fw-bold);">${completedLessons.length} ✅</div>
                        <div style="color:var(--danger); font-size:var(--fs-xs);">${failedLessons.length} needs review</div>
                    </div>
                </div>

                <!-- Skills Breakdown -->
                <div>
                    <h4 style="margin-bottom:var(--sp-3); padding-left: var(--sp-1);">Skills Breakdown</h4>
                    <div class="results__skills">
                        ${Object.entries(progress.skills).map(([skill, value]) => {
                            const icons = { vocabulary: '📚', grammar: '✏️', listening: '🎧', speaking: '🎤', writing: '📝', reading: '📖' };
                            const colors = { vocabulary: 'var(--primary)', grammar: 'var(--info)', listening: 'var(--accent-dark)', speaking: 'var(--reward-gold)', writing: 'var(--warning)', reading: 'var(--primary-dark)' };
                            return `
                                <div class="skill-bar">
                                    <div class="skill-bar__header">
                                        <span>${icons[skill] || '📊'} ${skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                                        <span style="color:${colors[skill]}; font-weight:var(--fw-bold);">${value}%</span>
                                    </div>
                                    <div class="progress">
                                        <div class="progress__fill" style="width:${value}%; background:${colors[skill]};"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Lesson History -->
                <div>
                    <h4 style="margin-bottom:var(--sp-3); padding-left: var(--sp-1);">Lesson History</h4>
                    <div style="display:flex; flex-direction:column; gap:var(--sp-2);">
                        ${progress.lessonHistory.length > 0 ? 
                            progress.lessonHistory.slice().reverse().slice(0, 10).map(lesson => `
                                <div class="card" style="display:flex; align-items:center; justify-content:space-between; padding:var(--sp-3) var(--sp-4);">
                                    <div style="display:flex; align-items:center; gap:var(--sp-2);">
                                        <span style="font-size:16px;">${lesson.icon || (lesson.status === 'done' ? '✅' : '⚠️')}</span>
                                        <div>
                                            <div style="font-weight:var(--fw-medium);">${lesson.title}</div>
                                            <div style="font-size:var(--fs-xs); color:var(--text-tertiary);">${lesson.date || ''} · ${lesson.grade || ''}</div>
                                        </div>
                                    </div>
                                    <span class="badge ${lesson.score >= 70 ? 'badge--accent' : 'badge--danger'}">${lesson.score}%</span>
                                </div>
                            `).join('') 
                            : '<div class="text-center text-xs text-secondary" style="padding:var(--sp-4);">No lessons completed yet. Start learning to see your progress! 📘</div>'
                        }
                    </div>
                </div>

                <!-- Weak Areas (from AI memory) -->
                ${LangyState.aiMemory.mistakes.length > 0 ? `
                <div>
                    <h4 style="margin-bottom:var(--sp-3); padding-left:var(--sp-1);">⚠️ Areas to Improve</h4>
                    <div class="card" style="display:flex; flex-direction:column; gap:var(--sp-2);">
                        ${LangyState.aiMemory.mistakes.slice(-5).map(m => `
                            <div style="font-size:var(--fs-sm); padding:var(--sp-2); border-bottom:1px solid var(--border-light);">
                                <span style="color:var(--danger);">✗</span> ${m.question || m.context || 'Grammar mistake'}
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
            </div>
        </div>
    `;

    container.querySelector('#results-back')?.addEventListener('click', () => Router.navigate('home'));
    setTimeout(() => Anim.staggerChildren(container, '.skill-bar, .card'), 80);
}

Router.register('results', renderResults);

/* ============================================
   COACH INTELLIGENCE — visible coaching memory
   Analyzes coachData.mistakePatterns + sessionLog
   and generates user-facing coaching surfaces.
   Coach-only. Language-agnostic.
   ============================================ */

const CoachIntel = (() => {
    'use strict';

    const COACH_PLANS = ['coach', 'pro', 'premium'];

    function isCoach() {
        return COACH_PLANS.includes(LangyState?.subscription?.plan);
    }

    function _getPatterns() {
        return (LangyState?.coachData?.mistakePatterns || []).filter(p => p.count > 0);
    }

    function _getSessionLog() {
        return LangyState?.coachData?.sessionLog || [];
    }

    // ─── Pattern Status ───
    function patternStatus(p) {
        if (!p) return 'new';
        if (p.count === 1) return 'new';

        const log = _getSessionLog();
        const recent3 = log.slice(-3);
        const older3 = log.slice(-6, -3);
        const recentHits = recent3.filter(s => s.tags.includes(p.tag)).length;
        const olderHits = older3.filter(s => s.tags.includes(p.tag)).length;

        if (olderHits > 0 && recentHits === 0) return 'improving';
        if (recentHits >= 2) return 'recurring';
        if (p.count >= 3) return 'needs_work';
        return 'new';
    }

    // ─── Top Patterns ───
    function topPatterns(max = 3) {
        return _getPatterns()
            .slice(0, max)
            .map(p => ({
                tag: p.tag,
                label: _humanizeTag(p.tag),
                count: p.count,
                example: p.example || '',
                status: patternStatus(p),
                firstSeen: p.firstSeen || p.lastSeen,
                lastSeen: p.lastSeen,
            }));
    }

    // ─── Recommended Focus ───
    function recommendedFocus(lang = 'en') {
        const patterns = _getPatterns();
        if (patterns.length === 0) return null;

        const withStatus = patterns.map(p => ({ ...p, status: patternStatus(p) }));
        const focus =
            withStatus.find(p => p.status === 'recurring') ||
            withStatus.find(p => p.status === 'needs_work') ||
            withStatus[0];

        const label = _humanizeTag(focus.tag);
        const templates = {
            en: {
                recurring: `Focus on ${label} — this keeps coming back.`,
                needs_work: `Practice ${label} — it's appeared ${focus.count} times.`,
                new: `Watch out for ${label} in your next session.`,
                improving: `Good progress on ${label}! Keep reinforcing it.`,
            },
            ru: {
                recurring: `Сфокусируйся на ${label} — это повторяется.`,
                needs_work: `Попрактикуй ${label} — ${focus.count} раз(а).`,
                new: `Обрати внимание на ${label} в следующей сессии.`,
                improving: `${label} улучшается! Продолжай закреплять.`,
            },
            es: {
                recurring: `Enfócate en ${label} — sigue apareciendo.`,
                needs_work: `Practica ${label} — ha aparecido ${focus.count} veces.`,
                new: `Presta atención a ${label} en tu próxima sesión.`,
                improving: `¡Buen progreso con ${label}! Sigue reforzándolo.`,
            },
        };

        return {
            tag: focus.tag,
            label,
            status: focus.status,
            text: (templates[lang] || templates.en)[focus.status],
        };
    }

    // ─── Session-to-session continuity ───
    function sessionContinuity(currentCorrections, lang = 'en') {
        const patterns = _getPatterns();
        if (patterns.length === 0 || !currentCorrections?.length) return null;

        const currentTags = currentCorrections
            .map(c => (c.tag || c.why || 'general').toLowerCase().replace(/\s+/g, '_'));

        for (const tag of currentTags) {
            const existing = patterns.find(p => p.tag === tag && p.count > 1);
            if (existing) {
                const label = _humanizeTag(tag);
                return {
                    en: `${label} appeared again — you've had this ${existing.count} times now. Coach is tracking it.`,
                    ru: `${label} снова — это уже ${existing.count} раз. Coach отслеживает.`,
                    es: `${label} otra vez — ya van ${existing.count} veces. Coach lo sigue.`,
                }[lang] || null;
            }
        }

        const top = patterns[0];
        if (top && top.count >= 3 && !currentTags.includes(top.tag)) {
            const label = _humanizeTag(top.tag);
            return {
                en: `No ${label} issues this time — nice improvement!`,
                ru: `На этот раз без ${label} — прогресс!`,
                es: `Sin problemas de ${label} esta vez — ¡buen progreso!`,
            }[lang] || null;
        }

        return null;
    }

    // ─── Launch Focused Practice ───
    // Sets coachFocus in ScreenState so talk-engine injects coaching directive into AI prompt,
    // then navigates to talk with call view. Reuses entire existing talk pipeline.
    function launchFocusPractice(focusTag) {
        if (!focusTag) return;
        const label = _humanizeTag(focusTag);
        ScreenState.set('coachFocus', label);
        ScreenState.set('coachFocusTag', focusTag);
        ScreenState.set('talkView', 'call');
        // Use user's preferred mascot, free-talk scenario for flexibility
        ScreenState.set('talkScenario', 'free');
        Router.navigate('talk');
    }

    // ─── Coach Notes card for profile ───
    function renderCoachNotes(lang = 'en') {
        if (!isCoach()) return '';
        const patterns = topPatterns(3);
        const focus = recommendedFocus(lang);
        const sessionCount = (LangyState.talkHistory || []).length;

        if (patterns.length === 0 && sessionCount < 2) {
            return `
            <div class="profile__section">
                <div class="profile__section-title">${LangyIcons.brain} Coach Notes</div>
                <div class="card" style="padding:var(--sp-4); text-align:center;">
                    <p style="color:var(--text-tertiary); font-size:var(--fs-sm); margin:0;">
                        ${{ en: 'Complete a few practice sessions and your Coach will start tracking patterns here.', ru: 'Проведи несколько сессий, и Coach начнёт отслеживать закономерности.', es: 'Completa unas sesiones y tu Coach empezará a rastrear patrones aquí.' }[lang]}
                    </p>
                </div>
            </div>`;
        }

        if (patterns.length === 0) return '';

        const statusIcon = { recurring: '🔁', needs_work: '⚠️', improving: '✅', new: '🆕' };
        const statusLabel = {
            recurring: { en: 'Recurring', ru: 'Повторяется', es: 'Recurrente' },
            needs_work: { en: 'Needs work', ru: 'Нужна практика', es: 'Necesita práctica' },
            improving: { en: 'Improving', ru: 'Улучшается', es: 'Mejorando' },
            new: { en: 'New', ru: 'Новое', es: 'Nuevo' },
        };
        const statusColor = { recurring: '#F59E0B', needs_work: '#EF4444', improving: '#10B981', new: 'var(--text-tertiary)' };

        const practiceCTA = focus && focus.status !== 'improving' ? `
                <div style="padding:var(--sp-3) var(--sp-4); border-top:1px solid var(--border);">
                    <button class="btn btn--primary btn--full btn--sm" id="coach-practice-profile"
                        style="display:flex; align-items:center; justify-content:center; gap:6px;">
                        ${LangyIcons.mic} ${{ en: 'Practice this now', ru: 'Практиковать сейчас', es: 'Practicar ahora' }[lang]}
                    </button>
                </div>` : '';

        return `
        <div class="profile__section">
            <div class="profile__section-title">${LangyIcons.brain} Coach Notes</div>
            <div class="card" style="padding:0; overflow:hidden;">
                ${patterns.map((p, i) => `
                <div style="padding:var(--sp-3) var(--sp-4); ${i < patterns.length - 1 ? 'border-bottom:1px solid var(--border);' : ''}
                    display:flex; align-items:center; gap:var(--sp-3);">
                    <div style="font-size:18px; flex-shrink:0;">${statusIcon[p.status]}</div>
                    <div style="flex:1; min-width:0;">
                        <div style="font-weight:var(--fw-semibold); font-size:var(--fs-sm); margin-bottom:2px;">
                            ${p.label}
                        </div>
                        ${p.example ? `<div style="font-size:var(--fs-xs); color:var(--text-tertiary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                            "${p.example}"
                        </div>` : ''}
                    </div>
                    <div style="text-align:right; flex-shrink:0;">
                        <div style="font-size:var(--fs-xs); font-weight:var(--fw-bold); color:${statusColor[p.status]};">
                            ${statusLabel[p.status][lang] || statusLabel[p.status].en}
                        </div>
                        <div style="font-size:11px; color:var(--text-tertiary);">×${p.count}</div>
                    </div>
                </div>
                `).join('')}

                ${focus ? `
                <div style="padding:var(--sp-3) var(--sp-4); background:linear-gradient(135deg, var(--primary-bg), rgba(16,185,129,0.03));
                    border-top:1px solid var(--border);">
                    <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                        <span style="color:var(--primary); font-size:14px;">${LangyIcons.target}</span>
                        <span style="font-weight:var(--fw-bold); font-size:var(--fs-xs); color:var(--primary); text-transform:uppercase; letter-spacing:0.3px;">
                            ${{ en: 'Recommended focus', ru: 'Рекомендация', es: 'Enfoque recomendado' }[lang]}
                        </span>
                    </div>
                    <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin:0; line-height:1.5;">
                        ${focus.text}
                    </p>
                </div>
                ` : ''}
                ${practiceCTA}
            </div>
        </div>`;
    }

    // ─── Coach Memory card for talk summary ───
    function renderSummaryMemory(currentCorrections, lang = 'en') {
        if (!isCoach()) return '';
        const patterns = topPatterns(2);
        const continuity = sessionContinuity(currentCorrections, lang);
        const focus = recommendedFocus(lang);

        if (!continuity && patterns.length === 0) return '';

        let html = `
        <div style="padding:var(--sp-4); margin-bottom:var(--sp-3); border-radius:var(--radius-md);
            background:linear-gradient(135deg, rgba(124,108,246,0.06), rgba(124,108,246,0.02));
            border:1px solid rgba(124,108,246,0.15);
            animation:fadeInUp 0.5s var(--ease-out) 0.45s both;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:var(--sp-3);">
                <span style="color:#7C6CF6; font-size:16px;">${LangyIcons.brain}</span>
                <span style="font-weight:var(--fw-bold); font-size:var(--fs-sm); color:#7C6CF6;">
                    ${{ en: 'Coach Memory', ru: 'Память Coach', es: 'Memoria del Coach' }[lang]}
                </span>
            </div>`;

        if (continuity) {
            html += `
            <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin:0 0 var(--sp-3); line-height:1.5; padding-bottom:var(--sp-3); border-bottom:1px solid rgba(124,108,246,0.1);">
                ${continuity}
            </p>`;
        }

        if (patterns.length > 0) {
            const statusDot = { recurring: '#F59E0B', needs_work: '#EF4444', improving: '#10B981', new: 'var(--text-tertiary)' };
            html += `<div style="margin-bottom:${focus ? 'var(--sp-3)' : '0'};">`;
            for (const p of patterns) {
                html += `
                <div style="display:flex; align-items:center; gap:8px; padding:4px 0; font-size:var(--fs-sm);">
                    <span style="width:6px; height:6px; border-radius:50%; background:${statusDot[p.status]}; flex-shrink:0;"></span>
                    <span style="color:var(--text-secondary);">${p.label}</span>
                    <span style="margin-left:auto; font-size:var(--fs-xs); color:var(--text-tertiary);">×${p.count}</span>
                </div>`;
            }
            html += `</div>`;
        }

        if (focus && focus.status !== 'improving') {
            html += `
            <div style="padding:var(--sp-3); background:rgba(124,108,246,0.06); border-radius:var(--radius-sm); margin-bottom:var(--sp-3);">
                <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                    <span style="color:#7C6CF6; font-size:12px;">${LangyIcons.target}</span>
                    <span style="font-size:var(--fs-xs); font-weight:var(--fw-bold); color:#7C6CF6; text-transform:uppercase; letter-spacing:0.3px;">
                        ${{ en: 'Next focus', ru: 'Следующий фокус', es: 'Próximo enfoque' }[lang]}
                    </span>
                </div>
                <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin:0; line-height:1.4;">
                    ${focus.text}
                </p>
            </div>
            <button class="btn btn--primary btn--full btn--sm" id="coach-practice-summary"
                style="display:flex; align-items:center; justify-content:center; gap:6px; background:#7C6CF6;">
                ${LangyIcons.mic} ${{ en: 'Practice this now', ru: 'Практиковать сейчас', es: 'Practicar ahora' }[lang]}
            </button>`;
        } else if (focus) {
            html += `
            <div style="padding:var(--sp-3); background:rgba(124,108,246,0.06); border-radius:var(--radius-sm);">
                <div style="display:flex; align-items:center; gap:6px; margin-bottom:4px;">
                    <span style="color:#7C6CF6; font-size:12px;">${LangyIcons.target}</span>
                    <span style="font-size:var(--fs-xs); font-weight:var(--fw-bold); color:#7C6CF6; text-transform:uppercase; letter-spacing:0.3px;">
                        ${{ en: 'Next focus', ru: 'Следующий фокус', es: 'Próximo enfoque' }[lang]}
                    </span>
                </div>
                <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin:0; line-height:1.4;">
                    ${focus.text}
                </p>
            </div>`;
        }

        html += `</div>`;
        return html;
    }

    // ─── Utils ───
    function _humanizeTag(tag) {
        return tag
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    }

    return {
        isCoach,
        topPatterns,
        recommendedFocus,
        sessionContinuity,
        patternStatus,
        renderCoachNotes,
        renderSummaryMemory,
        launchFocusPractice,
    };
})();

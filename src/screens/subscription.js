/* ============================================
   SCREEN: SUBSCRIPTION — Outcome-driven Coach model
   Free = a real, working language learning system
   Coach = deeper coaching, smarter AI, faster growth
   ============================================ */

function renderSubscription(container) {
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const isCoach = ['coach', 'pro', 'premium'].includes(LangyState.subscription?.plan);
    const talkCount = (LangyState.talkHistory || []).length;
    const hasStreak = (LangyState.streakData?.current || 0) >= 3;

    // ─── Outcome-driven copy ───

    const headline = {
        en: 'Two ways to learn.\nOne way to learn faster.',
        ru: 'Два способа учить.\nОдин — быстрее.',
        es: 'Dos formas de aprender.\nUna para mejorar más rápido.',
    }[lang];

    const subheadline = {
        en: 'Free gives you real practice. Coach makes every session count more.',
        ru: 'Бесплатный план — реальная практика. Coach — каждая сессия эффективнее.',
        es: 'Gratis te da práctica real. Coach hace que cada sesión cuente más.',
    }[lang];

    // Free plan: strong, positive, not diminished
    const freeTitle = { en: 'Langy Free', ru: 'Langy Free', es: 'Langy Free' }[lang];
    const freeDesc = {
        en: 'Everything you need to start speaking.',
        ru: 'Всё, чтобы начать говорить.',
        es: 'Todo lo que necesitas para empezar a hablar.',
    }[lang];

    const freeFeatures = {
        en: [
            { text: '4 AI conversation partners', icon: 'messageCircle' },
            { text: 'Spoken feedback after every session', icon: 'mic' },
            { text: 'Pronunciation scoring', icon: 'barChart' },
            { text: 'Listening, writing & grammar practice', icon: 'bookOpen' },
            { text: 'Daily speaking prompts', icon: 'zap' },
            { text: 'All scenarios — no limits', icon: 'globe' },
        ],
        ru: [
            { text: '4 ИИ-собеседника', icon: 'messageCircle' },
            { text: 'Голосовой фидбэк после каждой сессии', icon: 'mic' },
            { text: 'Оценка произношения', icon: 'barChart' },
            { text: 'Аудирование, письмо и грамматика', icon: 'bookOpen' },
            { text: 'Ежедневные разговорные задания', icon: 'zap' },
            { text: 'Все сценарии — без ограничений', icon: 'globe' },
        ],
        es: [
            { text: '4 compañeros de conversación IA', icon: 'messageCircle' },
            { text: 'Feedback hablado después de cada sesión', icon: 'mic' },
            { text: 'Puntuación de pronunciación', icon: 'barChart' },
            { text: 'Escucha, escritura y gramática', icon: 'bookOpen' },
            { text: 'Prompts diarios de conversación', icon: 'zap' },
            { text: 'Todos los escenarios — sin límites', icon: 'globe' },
        ],
    }[lang];

    // Coach: outcome-first, learning transformation
    const coachTitle = 'Langy Coach';
    const coachTagline = {
        en: 'Your AI tutor that gets smarter with you.',
        ru: 'ИИ-репетитор, который растёт вместе с тобой.',
        es: 'Tu tutor IA que mejora contigo.',
    }[lang];

    // Personalized context line based on user data
    let personalLine = '';
    if (talkCount >= 5) {
        personalLine = {
            en: `You've had ${talkCount} conversations. Coach would have been tracking your patterns across all of them.`,
            ru: `Ты провёл ${talkCount} разговоров. Coach отслеживал бы твои паттерны во всех.`,
            es: `Has tenido ${talkCount} conversaciones. Coach habría seguido tus patrones en todas.`,
        }[lang];
    } else if (hasStreak) {
        personalLine = {
            en: 'You\'re building a streak. Coach helps make every day\'s practice more focused.',
            ru: 'Ты строишь серию. Coach поможет сделать каждую практику более целенаправленной.',
            es: 'Estás construyendo una racha. Coach te ayuda a que cada práctica sea más enfocada.',
        }[lang];
    }

    // Coach outcomes (not features) — organized by learning dimension
    const coachOutcomes = {
        en: [
            { dim: 'Speaking', outcome: 'Targeted correction that fixes your real speaking patterns', icon: 'mic', color: '#7C6CF6' },
            { dim: 'Coaching', outcome: 'AI that remembers your weak spots and builds practice around them', icon: 'brain', color: '#3B82F6' },
            { dim: 'Progress', outcome: 'See what\'s improving and what still needs work — across every skill', icon: 'trendingUp', color: '#10B981' },
            { dim: 'Continuity', outcome: 'Every session starts smarter because it remembers the last one', icon: 'refresh', color: '#F59E0B' },
            { dim: 'Review', outcome: 'Deeper feedback with pattern analysis, not just one-time corrections', icon: 'fileText', color: '#EC4899' },
        ],
        ru: [
            { dim: 'Речь', outcome: 'Целевые исправления, которые работают над твоими реальными паттернами', icon: 'mic', color: '#7C6CF6' },
            { dim: 'Коучинг', outcome: 'ИИ, который помнит слабые места и строит практику вокруг них', icon: 'brain', color: '#3B82F6' },
            { dim: 'Прогресс', outcome: 'Видь, что улучшается, а что ещё требует работы — по всем навыкам', icon: 'trendingUp', color: '#10B981' },
            { dim: 'Память', outcome: 'Каждая сессия начинается умнее, потому что помнит предыдущую', icon: 'refresh', color: '#F59E0B' },
            { dim: 'Обзор', outcome: 'Глубокий фидбэк с анализом паттернов, а не одноразовые исправления', icon: 'fileText', color: '#EC4899' },
        ],
        es: [
            { dim: 'Hablar', outcome: 'Corrección dirigida que arregla tus patrones reales al hablar', icon: 'mic', color: '#7C6CF6' },
            { dim: 'Coaching', outcome: 'IA que recuerda tus puntos débiles y crea práctica enfocada', icon: 'brain', color: '#3B82F6' },
            { dim: 'Progreso', outcome: 'Ve qué mejora y qué aún necesita trabajo — en cada habilidad', icon: 'trendingUp', color: '#10B981' },
            { dim: 'Continuidad', outcome: 'Cada sesión empieza más inteligente porque recuerda la anterior', icon: 'refresh', color: '#F59E0B' },
            { dim: 'Revisión', outcome: 'Feedback profundo con análisis de patrones, no solo correcciones', icon: 'fileText', color: '#EC4899' },
        ],
    }[lang];

    const freeCTA = { en: 'Continue with Free', ru: 'Продолжить бесплатно', es: 'Continuar con Free' }[lang];
    const coachCTA = { en: 'Start learning faster', ru: 'Начать учиться быстрее', es: 'Empieza a aprender más rápido' }[lang];
    const footerText = { en: 'Cancel anytime · No commitment', ru: 'Отмена в любой момент · Без обязательств', es: 'Cancela cuando quieras · Sin compromiso' }[lang];

    container.innerHTML = `
        <div class="screen subscription" style="padding-bottom:var(--sp-8);">
            <div class="subscription__header" style="padding-bottom:var(--sp-3);">
                <h2 style="white-space:pre-line; line-height:1.35;">${headline}</h2>
                <p style="font-size:var(--fs-sm); color:var(--text-secondary); line-height:1.6; max-width:300px; margin:var(--sp-2) auto 0;">${subheadline}</p>
            </div>

            <div class="plan-cards" style="gap:var(--sp-5);">

                <!-- Coach (recommended — shown first for emphasis) -->
                <div class="plan-card plan-card--recommended" data-plan="coach">
                    <div class="plan-card__badge">${{ en: 'RECOMMENDED', ru: 'РЕКОМЕНДУЕМ', es: 'RECOMENDADO' }[lang]}</div>
                    <div class="plan-card__header">
                        <div>
                            <div class="plan-card__name">${coachTitle}</div>
                        </div>
                        <div class="plan-card__price">
                            <div class="amount">$12</div>
                            <div class="period">/${{ en: 'month', ru: 'мес', es: 'mes' }[lang]}</div>
                        </div>
                    </div>

                    <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin-bottom:var(--sp-2); line-height:1.6;">
                        <strong style="color:var(--text); display:block; margin-bottom:4px;">${coachTagline}</strong>
                    </p>

                    ${personalLine ? `
                    <div style="background:rgba(59,130,246,0.06); border-radius:var(--radius-md); padding:var(--sp-2) var(--sp-3); margin-bottom:var(--sp-3); border-left:3px solid var(--primary);">
                        <div style="font-size:var(--fs-xs); color:var(--text-secondary); line-height:1.5; font-style:italic;">${personalLine}</div>
                    </div>
                    ` : ''}

                    <!-- Outcome cards by learning dimension -->
                    <div style="display:flex; flex-direction:column; gap:var(--sp-2); margin-bottom:var(--sp-3);">
                        ${coachOutcomes.map(o => `
                        <div style="display:flex; align-items:flex-start; gap:10px; padding:var(--sp-2) 0;">
                            <div style="width:28px; height:28px; border-radius:var(--radius-md); background:${o.color}11; color:${o.color}; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:13px;">
                                ${LangyIcons[o.icon] || LangyIcons.check}
                            </div>
                            <div>
                                <div style="font-size:var(--fs-xs); font-weight:var(--fw-bold); color:${o.color}; text-transform:uppercase; letter-spacing:0.3px;">${o.dim}</div>
                                <div style="font-size:var(--fs-sm); color:var(--text-secondary); line-height:1.5;">${o.outcome}</div>
                            </div>
                        </div>
                        `).join('')}
                    </div>

                    <button class="btn btn--primary btn--full" style="margin-top:var(--sp-2);">
                        ${coachCTA}
                    </button>
                </div>

                <!-- Free (valuable, not diminished) -->
                <div class="plan-card" data-plan="free">
                    <div class="plan-card__header">
                        <div>
                            <div class="plan-card__name">${freeTitle}</div>
                        </div>
                        <div class="plan-card__price">
                            <div class="amount">$0</div>
                            <div class="period">${{ en: 'forever', ru: 'навсегда', es: 'siempre' }[lang]}</div>
                        </div>
                    </div>
                    <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin-bottom:var(--sp-3);">
                        ${freeDesc}
                    </p>
                    <div class="plan-card__features">
                        ${freeFeatures.map(f => `<div class="plan-card__feature" style="display:flex; align-items:center; gap:8px;">
                            <span style="color:var(--accent-dark); font-size:13px; flex-shrink:0;">${LangyIcons[f.icon] || LangyIcons.check}</span> ${f.text}
                        </div>`).join('')}
                    </div>
                    <button class="btn btn--secondary btn--full" style="margin-top: var(--sp-4);">
                        ${freeCTA}
                    </button>
                </div>

            </div>

            <p class="text-center text-sm text-secondary" style="margin-top: var(--sp-4);">
                ${LangyIcons.shield} ${footerText}
            </p>
        </div>
    `;

    // Plan selection
    container.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('click', () => {
            const planId = card.dataset.plan;
            if (planId === 'free') {
                Anim.showToast(`${LangyIcons.check} ${freeTitle}!`);
                setTimeout(() => Router.navigate('home'), 600);
            } else {
                Router.navigate('donation', { plan: 'coach' });
            }
        });
    });

    setTimeout(() => Anim.staggerChildren(container, '.plan-card'), 100);
}

Router.register('subscription', renderSubscription);

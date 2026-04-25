/* ============================================
   SCREEN: SUBSCRIPTION — 2-tier Coach model
   Free = working speaking system
   Coach = adaptive improvement system
   ============================================ */

function renderSubscription(container) {
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const isCoach = ['coach', 'pro', 'premium'].includes(LangyState.subscription?.plan);

    const freeTitle = { en: 'Free', ru: 'Бесплатно', es: 'Gratis' }[lang];
    const coachTitle = 'Langy Coach';

    const freeDesc = {
        en: 'Practice speaking with AI — for real.',
        ru: 'Разговорная практика с ИИ — по-настоящему.',
        es: 'Practica hablar con IA — de verdad.',
    }[lang];
    const coachDesc = {
        en: 'Your AI remembers you.',
        ru: 'Твой ИИ запоминает тебя.',
        es: 'Tu IA te recuerda.',
    }[lang];

    const freeFeatures = {
        en: [
            'Conversations with 4 AI teachers',
            'Feedback after every session',
            'Pronunciation scoring',
            'Daily speaking prompt',
            'All scenarios, no limits',
        ],
        ru: [
            'Разговоры с 4 ИИ-учителями',
            'Фидбэк после каждой сессии',
            'Оценка произношения',
            'Ежедневный разговорный промпт',
            'Все сценарии, без ограничений',
        ],
        es: [
            'Conversaciones con 4 profesores IA',
            'Feedback después de cada sesión',
            'Puntuación de pronunciación',
            'Prompt diario de conversación',
            'Todos los escenarios, sin límites',
        ],
    }[lang];

    const coachTransformation = {
        en: 'Every conversation makes the next one smarter. Coach tracks your mistakes, spots your patterns, and builds practice that targets exactly what you need to improve.',
        ru: 'Каждый разговор делает следующий умнее. Coach отслеживает твои ошибки, находит закономерности и строит практику точно под твои слабые места.',
        es: 'Cada conversación mejora la siguiente. Coach rastrea tus errores, detecta patrones y crea práctica enfocada en lo que necesitas mejorar.',
    }[lang];

    const coachHow = {
        en: [
            'Remembers your mistakes across sessions',
            'Detects recurring patterns in your speaking',
            'Creates practice from your real errors',
            'Shows what\u2019s improving and what needs work',
        ],
        ru: [
            'Запоминает ошибки между сессиями',
            'Находит повторяющиеся паттерны',
            'Создаёт практику из реальных ошибок',
            'Показывает, что улучшается, а что нет',
        ],
        es: [
            'Recuerda tus errores entre sesiones',
            'Detecta patrones recurrentes',
            'Crea práctica de tus errores reales',
            'Muestra qué mejora y qué necesita trabajo',
        ],
    }[lang];

    const freeCTA = { en: 'Continue Free', ru: 'Продолжить бесплатно', es: 'Continuar gratis' }[lang];
    const coachCTA = { en: 'Start improving faster', ru: 'Улучшаться быстрее', es: 'Empieza a mejorar más rápido' }[lang];
    const footerText = { en: 'Cancel anytime', ru: 'Отмена в любой момент', es: 'Cancela en cualquier momento' }[lang];

    container.innerHTML = `
        <div class="screen subscription">
            <div class="subscription__header">
                <h2>${{ en: 'Choose how you learn', ru: 'Выбери свой формат', es: 'Elige cómo aprendes' }[lang]}</h2>
                <p>${{ en: 'Both plans include real conversations.', ru: 'Оба плана включают реальные разговоры.', es: 'Ambos planes incluyen conversaciones reales.' }[lang]}</p>
            </div>

            <div class="plan-cards" style="gap:var(--sp-4);">
                <!-- Free -->
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
                        ${freeFeatures.map(f => `<div class="plan-card__feature">${LangyIcons.check} ${f}</div>`).join('')}
                    </div>
                    <button class="btn btn--secondary btn--full" style="margin-top: var(--sp-4);">
                        ${freeCTA}
                    </button>
                </div>

                <!-- Coach -->
                <div class="plan-card plan-card--recommended" data-plan="coach">
                    <div class="plan-card__badge">${{ en: 'COACH', ru: 'COACH', es: 'COACH' }[lang]}</div>
                    <div class="plan-card__header">
                        <div>
                            <div class="plan-card__name">${coachTitle}</div>
                        </div>
                        <div class="plan-card__price">
                            <div class="amount">$12</div>
                            <div class="period">/${{ en: 'month', ru: 'мес', es: 'mes' }[lang]}</div>
                        </div>
                    </div>

                    <p style="font-size:var(--fs-sm); color:var(--text-secondary); margin-bottom:var(--sp-3); line-height:1.6;">
                        <strong style="color:var(--text); display:block; margin-bottom:4px;">${coachDesc}</strong>
                        ${coachTransformation}
                    </p>

                    <div style="background:var(--bg-alt); border-radius:var(--radius-md); padding:var(--sp-3); margin-bottom:var(--sp-3);">
                        <div style="font-size:var(--fs-xs); color:var(--text-tertiary); font-weight:var(--fw-bold); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:var(--sp-2);">
                            ${{ en: 'How Coach works', ru: 'Как работает Coach', es: 'Cómo funciona Coach' }[lang]}
                        </div>
                        ${coachHow.map(f => `<div style="font-size:var(--fs-sm); color:var(--text-secondary); padding:4px 0; display:flex; align-items:center; gap:8px;">
                            <span style="color:var(--primary); font-size:14px; flex-shrink:0;">${LangyIcons.check}</span> ${f}
                        </div>`).join('')}
                    </div>

                    <button class="btn btn--primary btn--full" style="margin-top: var(--sp-3);">
                        ${coachCTA}
                    </button>
                </div>
            </div>

            <p class="text-center text-sm text-secondary" style="margin-top: var(--sp-3);">
                ${LangyIcons.lock} ${footerText}
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

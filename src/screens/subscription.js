/* ============================================
   SCREEN: SUBSCRIPTION
   ============================================ */

function renderSubscription(container) {
    const plans = [
        {
            id: 'free',
            name: 'Free',
            price: '$0',
            period: '',
            features: ['5 lessons per day', 'Basic vocabulary', 'Limited AI conversations', 'Community access'],
            recommended: false
        },
        {
            id: 'pro',
            name: 'Pro',
            price: '$25',
            period: '/month',
            features: ['Unlimited lessons', 'Full AI tutor access', 'Speech recognition', 'Personalized curriculum', 'Mistake tracking', 'Priority support'],
            recommended: true
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '$70',
            period: '/month',
            features: ['Everything in Pro', 'Private AI sessions', 'Advanced analytics', 'Exclusive mascot skins', 'VIP events access', '1-on-1 coaching', 'Certificate program'],
            recommended: false
        }
    ];

    container.innerHTML = `
        <div class="screen subscription">
            <div class="subscription__header">
                <h2>Choose Your Plan</h2>
                <p>Start your English journey today</p>
            </div>

            <div class="plan-cards">
                ${plans.map(plan => `
                    <div class="plan-card ${plan.recommended ? 'plan-card--recommended' : ''}" data-plan="${plan.id}">
                        ${plan.recommended ? '<div class="plan-card__badge">BEST</div>' : ''}
                        <div class="plan-card__header">
                            <div>
                                <div class="plan-card__name">${plan.name}</div>
                            </div>
                            <div class="plan-card__price">
                                <div class="amount">${plan.price}</div>
                                ${plan.period ? `<div class="period">${plan.period}</div>` : '<div class="period">forever</div>'}
                            </div>
                        </div>
                        <div class="plan-card__features">
                            ${plan.features.map(f => `<div class="plan-card__feature">${f}</div>`).join('')}
                        </div>
                        <button class="btn ${plan.recommended ? 'btn--primary' : 'btn--secondary'} btn--full" style="margin-top: var(--sp-4);">
                            ${plan.id === 'free' ? 'Start Free' : 'Subscribe'}
                        </button>
                    </div>
                `).join('')}
            </div>

            <p class="text-center text-sm text-secondary" style="margin-top: var(--sp-2);">
                Cancel anytime • Crypto & global payments accepted
            </p>
        </div>
    `;

    // Plan selection
    container.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('click', () => {
            const planId = card.dataset.plan;
            LangyState.subscription.plan = planId;

            if (planId === 'free') {
                Anim.showToast(`Free plan activated! ${LangyIcons.check}`);
                setTimeout(() => Router.navigate('mascot-select'), 800);
            } else {
                // Open donation/payment page
                Router.navigate('donation', { plan: planId });
            }
        });
    });

    setTimeout(() => Anim.staggerChildren(container, '.plan-card'), 100);
}

Router.register('subscription', renderSubscription);

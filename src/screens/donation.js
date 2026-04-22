/* ============================================
   SCREEN: DONATION / PAYMENT
   ============================================ */

function renderDonation(container) {
    const params = Router.getParams();
    const planId = params.plan || 'pro';

    const plans = {
        pro: { name: 'Pro Plan', price: '$25', period: '/month', type: 'sub' },
        premium: { name: 'Premium Plan', price: '$70', period: '/month', type: 'sub' },
        langy_pack: {
            name: '1000 Langy',
            price: '$50',
            period: ' (One-time)',
            type: 'currency',
            currency: 'langy',
            amount: 1000,
        },
        dangy_pack: {
            name: '5000 Dangy',
            price: '$10',
            period: ' (One-time)',
            type: 'currency',
            currency: 'dangy',
            amount: 5000,
        },
    };

    const plan = plans[planId] || plans.pro;

    const selectedMethod = ScreenState.get('donationMethod', null);
    const selectedAmount = ScreenState.get('donationAmount') || plan.price.replace('$', '');

    container.innerHTML = `
        <div class="screen screen--no-pad donation">
            <div class="nav-header">
                <div class="nav-header__back" id="donation-back">${LangyIcons.back}</div>
                <div class="nav-header__title">Payment</div>
                <div style="width:36px;"></div>
            </div>

            <div class="donation__content">
                <!-- Plan Summary -->
                <div class="donation__plan-summary">
                    <div class="donation__plan-name">${plan.name}</div>
                    <div class="donation__plan-price">${plan.price}<span style="font-size:var(--fs-base); font-weight:var(--fw-regular);">${plan.period}</span></div>
                    <p style="font-size:var(--fs-sm); opacity:0.8;">Full access to all features</p>
                </div>

                <!-- Payment Methods -->
                <div>
                    <h4 style="margin-bottom:var(--sp-3);">Payment Method</h4>
                    <div class="donation__methods">
                        <div class="donation__method ${selectedMethod === 'card' ? 'donation__method--selected' : ''}" data-method="card">
                            <div class="donation__method-icon" style="background:rgba(59,130,246,0.1);">${LangyIcons.shield}</div>
                            <div>
                                <div class="donation__method-name">Credit / Debit Card</div>
                                <div class="donation__method-desc">Visa, Mastercard, Amex</div>
                            </div>
                        </div>

                        <div class="donation__method ${selectedMethod === 'usdt' ? 'donation__method--selected' : ''}" data-method="usdt">
                            <div class="donation__method-icon" style="background:rgba(74,222,128,0.1);">${LangyIcons.diamond}</div>
                            <div>
                                <div class="donation__method-name">USDT (Tether)</div>
                                <div class="donation__method-desc">TRC20 / ERC20</div>
                            </div>
                        </div>

                        <div class="donation__method ${selectedMethod === 'ton' ? 'donation__method--selected' : ''}" data-method="ton">
                            <div class="donation__method-icon" style="background:rgba(124,108,246,0.1);">${LangyIcons.diamond}</div>
                            <div>
                                <div class="donation__method-name">TON</div>
                                <div class="donation__method-desc">The Open Network</div>
                            </div>
                        </div>

                        <div class="donation__method ${selectedMethod === 'paypal' ? 'donation__method--selected' : ''}" data-method="paypal">
                            <div class="donation__method-icon" style="background:rgba(245,158,11,0.1);">${LangyIcons.globe}</div>
                            <div>
                                <div class="donation__method-name">PayPal</div>
                                <div class="donation__method-desc">Global payments</div>
                            </div>
                        </div>

                        <div class="donation__method ${selectedMethod === 'apple' ? 'donation__method--selected' : ''}" data-method="apple">
                            <div class="donation__method-icon" style="background:rgba(156,163,175,0.1);">${LangyIcons.apple || LangyIcons.globe}</div>
                            <div>
                                <div class="donation__method-name">Apple Pay</div>
                                <div class="donation__method-desc">Quick & secure</div>
                            </div>
                        </div>

                        <div class="donation__method ${selectedMethod === 'google' ? 'donation__method--selected' : ''}" data-method="google">
                            <div class="donation__method-icon" style="background:rgba(239,68,68,0.1);">G</div>
                            <div>
                                <div class="donation__method-name">Google Pay</div>
                                <div class="donation__method-desc">Fast checkout</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Crypto details if selected -->
                ${
                    selectedMethod === 'usdt' || selectedMethod === 'ton'
                        ? `
                    <div class="card" style="text-align:center;">
                        <h4 style="margin-bottom:var(--sp-3);">${selectedMethod === 'usdt' ? 'USDT' : 'TON'} Payment</h4>
                        <div style="background:var(--bg-alt); border-radius:var(--radius-lg); padding:var(--sp-4); margin-bottom:var(--sp-3);">
                            <div style="font-size:var(--fs-xs); color:var(--text-secondary); margin-bottom:var(--sp-1);">Send to address:</div>
                            <div style="font-size:var(--fs-sm); font-weight:var(--fw-semibold); word-break:break-all; font-family:monospace;">
                                ${selectedMethod === 'usdt' ? 'TXyz...abc123def456' : 'EQxyz...abc123def456'}
                            </div>
                        </div>
                        <div style="font-size:var(--fs-sm); color:var(--text-secondary);">
                            Amount: <strong style="color:var(--text);">${selectedAmount} ${selectedMethod === 'usdt' ? 'USDT' : 'TON'}</strong>
                        </div>
                        <button class="btn btn--accent btn--full" style="margin-top:var(--sp-4);" id="donation-copy">${LangyIcons.clipboard} Copy Address</button>
                    </div>
                `
                        : ''
                }

                <!-- Card input if selected -->
                ${
                    selectedMethod === 'card'
                        ? `
                    <div class="card">
                        <h4 style="margin-bottom:var(--sp-3);">Card Details</h4>
                        <div style="display:flex; flex-direction:column; gap:var(--sp-3);">
                            <div class="input-group">
                                <label>Card Number</label>
                                <input class="input" type="text" placeholder="1234 5678 9012 3456" maxlength="19">
                            </div>
                            <div style="display:flex; gap:var(--sp-3);">
                                <div class="input-group" style="flex:1;">
                                    <label>Expiry</label>
                                    <input class="input" type="text" placeholder="MM/YY" maxlength="5">
                                </div>
                                <div class="input-group" style="flex:1;">
                                    <label>CVC</label>
                                    <input class="input" type="text" placeholder="123" maxlength="4">
                                </div>
                            </div>
                        </div>
                    </div>
                `
                        : ''
                }

                <!-- Pay Button -->
                <button class="btn btn--primary btn--xl btn--full" id="donation-pay"
                    style="${!selectedMethod ? 'opacity:0.5; pointer-events:none;' : ''}">
                    ${selectedMethod === 'usdt' || selectedMethod === 'ton' ? "I've Sent Payment" : `Pay ${plan.price}${plan.period}`}
                </button>

                <p style="text-align:center; color:var(--text-tertiary); font-size:var(--fs-xs); margin-top:var(--sp-4);">
                    ${LangyIcons.lock} Secure payment • Cancel anytime
                </p>
            </div>
        </div>
    `;

    // Method selection
    container.querySelectorAll('.donation__method').forEach(method => {
        method.addEventListener('click', () => {
            ScreenState.set('donationMethod', method.dataset.method);
            renderDonation(container);
        });
    });

    // Copy address
    container.querySelector('#donation-copy')?.addEventListener('click', () => {
        Anim.showToast(`Address copied! ${LangyIcons.clipboard}`);
    });

    container.querySelector('#donation-pay')?.addEventListener('click', () => {
        if (!selectedMethod) return;

        if (plan.type === 'currency') {
            LangyState.currencies[plan.currency] += plan.amount;
            Anim.showToast(
                `Payment successful! You received ${plan.amount} ${plan.currency === 'langy' ? 'Langy' : 'Dangy'} ${LangyIcons.sparkles}`
            );
            setTimeout(() => Router.navigate('shop'), 1200);
        } else {
            LangyState.subscription.plan = planId;
            Anim.showToast(`Payment successful! Welcome to ${plan.name}! ${LangyIcons.check}`);
            // Sequential Onboarding: Interests choice comes after payment for Pro/Premium users
            setTimeout(() => Router.navigate('interests'), 1200);
        }
    });

    // Back
    container.querySelector('#donation-back')?.addEventListener('click', () => {
        ScreenState.remove('donationMethod');
        Router.back();
    });

    setTimeout(() => Anim.staggerChildren(container, '.donation__method'), 60);
}

Router.register('donation', renderDonation);

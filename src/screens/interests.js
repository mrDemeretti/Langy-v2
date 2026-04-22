/* ============================================
   SCREEN: INTERESTS (Personalization)
   ============================================ */

function renderInterests(container) {
    const interestPool = [
        { id: 'cinema', name: 'Cinema & Actors', emoji: LangyIcons.play },
        { id: 'travel', name: 'Travel & Nature', emoji: LangyIcons.globe },
        { id: 'tech', name: 'Tech & AI', emoji: LangyIcons.globe },
        { id: 'music', name: 'Music & Concerts', emoji: LangyIcons.volume },
        { id: 'cooking', name: 'Cooking & Food', emoji: LangyIcons.info },
        { id: 'sports', name: 'Sports & Fitness', emoji: LangyIcons.award },
        { id: 'business', name: 'Business & Career', emoji: LangyIcons.clipboard },
        { id: 'gaming', name: 'Gaming', emoji: LangyIcons.play },
    ];

    container.innerHTML = `
        <div class="screen interests">
            <div class="interests__header" style="text-align:center; margin-bottom:var(--sp-8);">
                <div class="ai-loader" style="margin-bottom:var(--sp-4);">
                    <div class="ai-loader__orb"></div>
                </div>
                <h2>What do you love?</h2>
                <p>Langy will personalize your exercises based on your interests.</p>
            </div>

            <div class="interest-grid">
                ${interestPool
                    .map(
                        item => `
                    <div class="interest-card" data-id="${item.id}">
                        <div class="interest-card__emoji">${item.emoji}</div>
                        <div class="interest-card__name">${item.name}</div>
                        <div class="interest-card__check">${LangyIcons.check}</div>
                    </div>
                `
                    )
                    .join('')}
            </div>

            <div class="interests__footer" style="margin-top:var(--sp-8);">
                <button class="btn btn--primary btn--xl btn--full" id="interests-submit" disabled>
                    Pick at least 2 interests
                </button>
            </div>
        </div>
    `;

    const selected = new Set();
    const submitBtn = container.querySelector('#interests-submit');

    container.querySelectorAll('.interest-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            if (selected.has(id)) {
                selected.delete(id);
                card.classList.remove('interest-card--active');
            } else {
                selected.add(id);
                card.classList.add('interest-card--active');
            }

            const count = selected.size;
            if (count >= 2) {
                submitBtn.disabled = false;
                submitBtn.textContent = `Continue with ${count} Interests`;
            } else {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Pick at least 2 interests';
            }
        });
    });

    submitBtn.addEventListener('click', () => {
        LangyState.user.interests = Array.from(selected);
        Anim.showToast(`Tailoring your curriculum... ${LangyIcons.edit}`);
        setTimeout(() => {
            Router.navigate('mascot-select');
        }, 1200);
    });

    setTimeout(() => Anim.staggerChildren(container, '.interest-card'), 100);
}

Router.register('interests', renderInterests);

/* ============================================
   SCREEN: MASCOT SELECTION
   ============================================ */

function renderMascotSelect(container) {
    const mascots = [
        { id: 0, name: 'Luna', personality: 'Cheerful & Encouraging. Always sees the bright side and celebrates your wins!', color: '#7C6CF6' },
        { id: 1, name: 'Rex', personality: 'Smart & Structured. Loves grammar rules and systematic learning!', color: '#4ADE80' },
        { id: 2, name: 'Pixel', personality: 'Creative & Playful. Teaches through stories, games and surprises!', color: '#F59E0B' },
        { id: 3, name: 'Omar', personality: 'Wise & Multilingual. Your supportive guide connecting your native language to English!', color: '#06B6D4' },
    ];

    const selected = LangyState.mascot.selected;

    container.innerHTML = `
        <div class="screen mascot-select">
            <div class="mascot-select__title">
                <h2>Choose Your Teacher</h2>
                <p class="text-secondary" style="margin-top:var(--sp-2)">Pick a mascot that matches your vibe</p>
            </div>

            <div class="mascot-select__carousel" id="mascot-carousel">
                ${mascots.map(m => `
                    <div class="mascot-card ${selected === m.id ? 'mascot-card--selected' : ''}" data-id="${m.id}">
                        <div class="mascot-card__model" style="border-color: ${m.color}30;">
                            <span style="font-size:11px; color: var(--text-tertiary);">GLB Model<br>Placeholder</span>
                        </div>
                        <div class="mascot-card__name" style="color: ${m.color}">${m.name}</div>
                        <div class="mascot-card__personality">${m.personality}</div>
                        ${selected === m.id ? '<div class="badge badge--primary">Selected ✓</div>' : ''}
                    </div>
                `).join('')}
            </div>

            <button class="btn btn--primary btn--xl btn--full ${selected === null ? 'btn--disabled' : ''}" id="mascot-continue"
                    style="${selected === null ? 'opacity:0.5; pointer-events:none;' : ''}">
                Continue
            </button>

            <button class="btn btn--ghost btn--sm" id="mascot-skip" style="margin-top: var(--sp-2);">
                Skip for now
            </button>
        </div>
    `;

    // Card selection
    container.querySelectorAll('.mascot-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            LangyState.mascot.selected = id;
            Anim.pulse(card);
            renderMascotSelect(container);
        });
    });

    // Continue
    container.querySelector('#mascot-continue')?.addEventListener('click', () => {
        if (LangyState.mascot.selected !== null) {
            Router.navigate('home');
        }
    });

    // Skip
    container.querySelector('#mascot-skip')?.addEventListener('click', () => {
        LangyState.mascot.selected = 0;
        Router.navigate('home');
    });

    // Center the carousel
    setTimeout(() => {
        const carousel = container.querySelector('#mascot-carousel');
        if (carousel && carousel.children[1]) {
            carousel.children[1].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }, 300);

    setTimeout(() => Anim.staggerChildren(container, '.mascot-card'), 100);
}

Router.register('mascot-select', renderMascotSelect);

/* ============================================
   SCREEN: MASCOT SELECTION
   Premium character-driven selection with
   3D-ready container structure
   ============================================ */

function renderMascotSelect(container) {
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const mascots = [
        {
            id: 0,
            name: 'Zendaya',
            style: { en: 'Cheerful & Encouraging', ru: 'Весёлая и поддерживающая', es: 'Alegre y motivadora' }[lang],
            personality: { en: 'Your best friend who celebrates every win and makes learning feel easy.', ru: 'Лучшая подруга, которая празднует каждый успех.', es: 'Tu mejor amiga que celebra cada logro.' }[lang],
            color: '#7C6CF6',
            accent: '#A78BFA',
            speaking: { en: 'Casual & warm', ru: 'Тёплый стиль', es: 'Casual y cálido' }[lang],
        },
        {
            id: 1,
            name: 'Travis',
            style: { en: 'Creative & Playful', ru: 'Креативный и весёлый', es: 'Creativo y divertido' }[lang],
            personality: { en: 'Young artist who teaches through games, humor, and surprises.', ru: 'Молодой художник, который учит через игры и юмор.', es: 'Artista joven que enseña con juegos y humor.' }[lang],
            color: '#4ADE80',
            accent: '#86EFAC',
            speaking: { en: 'Trendy & fun', ru: 'Модный стиль', es: 'Moderno y divertido' }[lang],
        },
        {
            id: 2,
            name: 'Matthew',
            style: { en: 'Smart & Structured', ru: 'Умный и системный', es: 'Inteligente y estructurado' }[lang],
            personality: { en: 'Calm professional who loves precision and meaningful conversation.', ru: 'Спокойный профессионал, ценит точность.', es: 'Profesional calmado que ama la precisión.' }[lang],
            color: '#F59E0B',
            accent: '#FCD34D',
            speaking: { en: 'Clear & measured', ru: 'Чёткий стиль', es: 'Claro y medido' }[lang],
        },
        {
            id: 3,
            name: 'Omar',
            style: { en: 'Wise & Supportive', ru: 'Мудрый и чуткий', es: 'Sabio y comprensivo' }[lang],
            personality: { en: 'Multilingual traveler who understands the journey of learning a language.', ru: 'Полиглот, который понимает путь изучения языка.', es: 'Viajero multilingüe que entiende el camino del aprendizaje.' }[lang],
            color: '#06B6D4',
            accent: '#67E8F9',
            speaking: { en: 'Patient & adaptive', ru: 'Терпеливый стиль', es: 'Paciente y adaptable' }[lang],
        },
    ];

    const selected = LangyState.mascot.selected;
    const mascotNames = ['zendaya', 'travis', 'matthew', 'omar'];

    container.innerHTML = `
        <div class="screen mascot-select">
            <div class="mascot-select__title">
                <h2>${{ en: 'Choose Your Teacher', ru: 'Выбери учителя', es: 'Elige tu profesor' }[lang]}</h2>
                <p class="text-secondary" style="margin-top:var(--sp-2)">${{ en: 'Each mascot has a unique voice, personality, and teaching style', ru: 'У каждого маскота уникальный голос, характер и стиль', es: 'Cada mascota tiene voz, personalidad y estilo únicos' }[lang]}</p>
            </div>

            <div class="mascot-select__carousel" id="mascot-carousel">
                ${mascots.map(m => `
                    <div class="mascot-card ${selected === m.id ? 'mascot-card--selected' : ''}" data-id="${m.id}" style="--mascot-color: ${m.color};">

                        <!-- 3D-ready avatar container -->
                        <div class="mascot-card__avatar-stage" style="background: radial-gradient(circle at 50% 60%, ${m.color}18, ${m.color}05);">
                            <img
                                src="assets/mascots/${mascotNames[m.id]}.png"
                                alt="${m.name}"
                                class="mascot-card__avatar-img"
                                style="filter: drop-shadow(0 8px 16px ${m.color}40);"
                            >
                            <!-- 3D model will replace this img in future -->
                        </div>

                        <div class="mascot-card__identity">
                            <div class="mascot-card__name" style="color: ${m.color}">${m.name}</div>
                            <div class="mascot-card__style-tag" style="background:${m.color}12; color:${m.color}; border:1px solid ${m.color}25;">${m.style}</div>
                        </div>

                        <div class="mascot-card__personality">${m.personality}</div>

                        <div class="mascot-card__speaking" style="color:var(--text-tertiary);">
                            ${LangyIcons.mic} ${m.speaking}
                        </div>

                        ${selected === m.id ? `<div class="badge badge--primary" style="display:flex;align-items:center;gap:4px;">${{ en: 'Selected', ru: 'Выбран', es: 'Elegido' }[lang]} ${LangyIcons.check}</div>` : ''}
                    </div>
                `).join('')}
            </div>

            <button class="btn btn--primary btn--xl btn--full ${selected === null ? 'btn--disabled' : ''}" id="mascot-continue"
                    style="${selected === null ? 'opacity:0.5; pointer-events:none;' : ''}">
                ${{ en: 'Continue', ru: 'Продолжить', es: 'Continuar' }[lang]}
            </button>

            <button class="btn btn--ghost btn--sm" id="mascot-skip" style="margin-top: var(--sp-2);">
                ${{ en: 'Skip for now', ru: 'Пропустить', es: 'Saltar por ahora' }[lang]}
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

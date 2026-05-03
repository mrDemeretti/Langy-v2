/* ============================================
   SCREEN: MASCOT SELECTION
   Premium character-driven selection with
   3D-ready container structure
   ============================================ */

function renderMascotSelect(container) {
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    // ─── Full mascot catalog ───
    const allMascots = {
        0: {
            id: 0, name: 'Zendaya',
            style: { en: 'Cheerful & Encouraging', ru: 'Весёлая и поддерживающая', es: 'Alegre y motivadora' }[lang],
            personality: { en: 'Your best friend who celebrates every win and makes learning feel easy.', ru: 'Лучшая подруга, которая празднует каждый успех.', es: 'Tu mejor amiga que celebra cada logro.' }[lang],
            color: '#7C6CF6', accent: '#A78BFA',
            speaking: { en: 'Casual & warm', ru: 'Тёплый стиль', es: 'Casual y cálido' }[lang],
        },
        1: {
            id: 1, name: 'Travis',
            style: { en: 'Creative & Playful', ru: 'Креативный и весёлый', es: 'Creativo y divertido' }[lang],
            personality: { en: 'Young artist who teaches through games, humor, and surprises.', ru: 'Молодой художник, который учит через игры и юмор.', es: 'Artista joven que enseña con juegos y humor.' }[lang],
            color: '#4ADE80', accent: '#86EFAC',
            speaking: { en: 'Trendy & fun', ru: 'Модный стиль', es: 'Moderno y divertido' }[lang],
        },
        2: {
            id: 2, name: 'Matthew',
            style: { en: 'Smart & Structured', ru: 'Умный и системный', es: 'Inteligente y estructurado' }[lang],
            personality: { en: 'Calm professional who loves precision and meaningful conversation.', ru: 'Спокойный профессионал, ценит точность.', es: 'Profesional calmado que ama la precisión.' }[lang],
            color: '#F59E0B', accent: '#FCD34D',
            speaking: { en: 'Clear & measured', ru: 'Чёткий стиль', es: 'Claro y medido' }[lang],
        },
        3: {
            id: 3, name: 'Omar',
            style: { en: 'Energetic & Welcoming', ru: 'Энергичный и гостеприимный', es: 'Energético y acogedor' }[lang],
            personality: { en: 'Charismatic Arabic guide who makes learning feel like a warm conversation.', ru: 'Харизматичный гид по арабскому, учит через тёплое общение.', es: 'Guía carismático que enseña árabe como una charla cálida.' }[lang],
            color: '#06B6D4', accent: '#67E8F9',
            speaking: { en: 'Confident & rhythmic', ru: 'Уверенный ритм', es: 'Seguro y rítmico' }[lang],
        },
        4: {
            id: 4, name: 'Elyanna',
            style: { en: 'Modern & Magnetic', ru: 'Современная и обаятельная', es: 'Moderna y magnética' }[lang],
            personality: { en: 'Stylish Arab-pop artist who makes Arabic feel contemporary and beautiful.', ru: 'Стильная арт-поп артистка, показывающая красоту арабского.', es: 'Artista pop árabe que hace que el árabe se sienta contemporáneo.' }[lang],
            color: '#C084FC', accent: '#DDD6FE',
            speaking: { en: 'Soft & elegant', ru: 'Мягкий и элегантный', es: 'Suave y elegante' }[lang],
        },
        5: {
            id: 5, name: 'Adel Imam',
            style: { en: 'Warm & Theatrical', ru: 'Тёплый и театральный', es: 'Cálido y teatral' }[lang],
            personality: { en: 'Legendary showman who teaches Arabic with humor, wisdom, and heart.', ru: 'Легендарный шоумен, учит арабскому с юмором и мудростью.', es: 'Showman legendario que enseña árabe con humor y sabiduría.' }[lang],
            color: '#F97316', accent: '#FDBA74',
            speaking: { en: 'Expressive & wise', ru: 'Выразительный и мудрый', es: 'Expresivo y sabio' }[lang],
        },
    };

    // ─── Language-aware mascot filtering ───
    const targetLangCode = typeof LangyTarget !== 'undefined' ? LangyTarget.getCode() : 'en';
    const mascotIds = typeof TalkEngine !== 'undefined' ? TalkEngine.getMascotIdsForLanguage(targetLangCode)
        : (targetLangCode === 'ar' ? [3, 4, 5] : [0, 1, 2]);
    const mascots = mascotIds.map(id => allMascots[id]);

    const selected = LangyState.mascot.selected;
    // Validate: if selected mascot is from wrong language, reset
    if (selected !== null && !mascotIds.includes(selected)) {
        LangyState.mascot.selected = mascotIds[0];
    }

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
                                src="assets/mascots/${typeof TalkEngine !== 'undefined' ? TalkEngine.getMascotImage(m.id) : ['zendaya','travis','matthew','omar','elyanna','adel_imam'][m.id]}.png"
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
        LangyState.mascot.selected = mascotIds[0];
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

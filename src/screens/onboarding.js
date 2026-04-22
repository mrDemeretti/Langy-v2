/* ============================================
   SCREEN: ONBOARDING — Welcome Flow
   Welcome → Interests → Mascot → Placement Test
   ============================================ */

function renderOnboarding(container) {
    const step = ScreenState.get('onboardingStep', 0);

    // ─── STEP 0: Welcome Slides ───
    if (step === 0) {
        const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
        const slides = [
            {
                emoji: LangyIcons.globe,
                title: { en: 'Welcome to Langy!', ru: 'Добро пожаловать в Langy!', es: '¡Bienvenido a Langy!' }[lang],
                subtitle: {
                    en: 'Your personal AI English tutor',
                    ru: 'Твой персональный AI-преподаватель английского',
                    es: 'Tu tutor de inglés con IA personal',
                }[lang],
                desc: {
                    en: 'Forget boring textbooks. Learn through conversations, games and duels.',
                    ru: 'Забудь скучные учебники. Учись через разговоры, игры и дуэли.',
                    es: 'Olvida los libros aburridos. Aprende con conversaciones, juegos y duelos.',
                }[lang],
            },
            {
                emoji: LangyIcons.brain,
                title: { en: 'Smart AI Teacher', ru: 'Умный ИИ-учитель', es: 'Profesor IA Inteligente' }[lang],
                subtitle: {
                    en: 'Adapts to your level',
                    ru: 'Адаптируется под твой уровень',
                    es: 'Se adapta a tu nivel',
                }[lang],
                desc: {
                    en: 'Explains grammar in your language, corrects mistakes and selects lessons just for you.',
                    ru: 'Объясняет грамматику на русском, исправляет ошибки и подбирает уроки лично для тебя.',
                    es: 'Explica gramática en tu idioma, corrige errores y elige lecciones para ti.',
                }[lang],
            },
            {
                emoji: LangyIcons.trophy,
                title: { en: 'Learn by Playing', ru: 'Учись играючи', es: 'Aprende Jugando' }[lang],
                subtitle: {
                    en: 'Streaks, duels, rankings',
                    ru: 'Стрики, дуэли, рейтинги',
                    es: 'Rachas, duelos, rankings',
                }[lang],
                desc: {
                    en: 'Compete with friends, earn rewards and level up your mascot.',
                    ru: 'Соревнуйся с друзьями, зарабатывай награды и прокачивай своего маскота.',
                    es: 'Compite con amigos, gana recompensas y sube de nivel a tu mascota.',
                }[lang],
            },
        ];

        const currentSlide = ScreenState.get('onboardingSlide', 0);
        const s = slides[currentSlide];
        const isLast = currentSlide === slides.length - 1;

        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__skip" id="onboarding-skip">${i18n('learn.skip')}</div>
                
                <div class="onboarding__slide" style="animation: fadeInUp 0.5s ease-out;">
                    <div class="onboarding__emoji">${s.emoji}</div>
                    <h1 class="onboarding__title">${s.title}</h1>
                    <p class="onboarding__subtitle">${s.subtitle}</p>
                    <p class="onboarding__desc">${s.desc}</p>
                </div>

                <div class="onboarding__dots">
                    ${slides
                        .map(
                            (_, i) => `
                        <div class="onboarding__dot ${i === currentSlide ? 'onboarding__dot--active' : ''}"></div>
                    `
                        )
                        .join('')}
                </div>

                <button class="btn btn--primary btn--lg btn--full onboarding__btn" id="onboarding-next">
                    ${isLast ? `${i18n('onboarding.lets_go')} ${LangyIcons.rocket}` : `${i18n('learn.next')} ${LangyIcons.arrowRight}`}
                </button>
            </div>
        `;

        container.querySelector('#onboarding-next').addEventListener('click', () => {
            if (isLast) {
                ScreenState.set('onboardingStep', 1);
                renderOnboarding(container);
            } else {
                ScreenState.set('onboardingSlide', currentSlide + 1);
                renderOnboarding(container);
            }
        });

        container.querySelector('#onboarding-skip').addEventListener('click', () => {
            ScreenState.set('onboardingStep', 1);
            renderOnboarding(container);
        });

        // Swipe support
        let touchStartX = 0;
        const slideEl = container.querySelector('.onboarding__slide');
        slideEl?.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });
        slideEl?.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentSlide < slides.length - 1) {
                    ScreenState.set('onboardingSlide', currentSlide + 1);
                    renderOnboarding(container);
                } else if (diff < 0 && currentSlide > 0) {
                    ScreenState.set('onboardingSlide', currentSlide - 1);
                    renderOnboarding(container);
                }
            }
        });

        return;
    }

    // ─── STEP 1: Choose Interests ───
    if (step === 1) {
        const lang2 = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
        const interests = [
            { id: 'travel', emoji: LangyIcons.globe, label: { en: 'Travel', ru: 'Путешествия', es: 'Viajes' }[lang2] },
            {
                id: 'work',
                emoji: LangyIcons.clipboard,
                label: { en: 'Work & Career', ru: 'Работа и карьера', es: 'Trabajo y Carrera' }[lang2],
            },
            {
                id: 'movies',
                emoji: LangyIcons.play,
                label: { en: 'Movies & TV', ru: 'Кино и сериалы', es: 'Cine y Series' }[lang2],
            },
            { id: 'gaming', emoji: LangyIcons.play, label: { en: 'Gaming', ru: 'Игры', es: 'Juegos' }[lang2] },
            { id: 'music', emoji: LangyIcons.volume, label: { en: 'Music', ru: 'Музыка', es: 'Música' }[lang2] },
            {
                id: 'tech',
                emoji: LangyIcons.globe,
                label: { en: 'IT & Tech', ru: 'IT и технологии', es: 'IT y Tecnología' }[lang2],
            },
            { id: 'sports', emoji: LangyIcons.award, label: { en: 'Sports', ru: 'Спорт', es: 'Deportes' }[lang2] },
            {
                id: 'food',
                emoji: LangyIcons.info,
                label: { en: 'Food & Cooking', ru: 'Еда и кулинария', es: 'Cocina' }[lang2],
            },
            { id: 'books', emoji: LangyIcons.book, label: { en: 'Books', ru: 'Книги', es: 'Libros' }[lang2] },
            {
                id: 'social',
                emoji: LangyIcons.messageCircle,
                label: { en: 'Chatting with foreigners', ru: 'Общение с иностранцами', es: 'Hablar con extranjeros' }[
                    lang2
                ],
            },
            {
                id: 'exams',
                emoji: LangyIcons.graduationCap,
                label: { en: 'Exams (IELTS, TOEFL)', ru: 'Экзамены (IELTS, TOEFL)', es: 'Exámenes (IELTS, TOEFL)' }[
                    lang2
                ],
            },
            {
                id: 'business',
                emoji: LangyIcons.barChart,
                label: { en: 'Business English', ru: 'Бизнес-английский', es: 'Inglés de Negocios' }[lang2],
            },
        ];

        const selected = ScreenState.get('selectedInterests', []);

        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__header">
                    <div class="onboarding__step-badge">${i18n('onboarding.step')} 1/2</div>
                    <h2 class="onboarding__title" style="font-size: var(--fs-2xl);">${i18n('onboarding.interests_title')}</h2>
                    <p class="onboarding__desc">${i18n('onboarding.interests_desc')}</p>
                </div>

                <div class="onboarding__grid" id="interests-grid">
                    ${interests
                        .map(
                            i => `
                        <div class="interest-chip ${selected.includes(i.id) ? 'interest-chip--selected' : ''}" data-id="${i.id}">
                            <span class="interest-chip__emoji">${i.emoji}</span>
                            <span class="interest-chip__label">${i.label}</span>
                        </div>
                    `
                        )
                        .join('')}
                </div>

                <div class="onboarding__bottom">
                    <div class="onboarding__counter">${selected.length} ${i18n('onboarding.selected')}</div>
                    <button class="btn btn--primary btn--lg btn--full onboarding__btn ${selected.length === 0 ? 'btn--disabled' : ''}" id="onboarding-next" ${selected.length === 0 ? 'disabled' : ''}>
                        ${i18n('learn.next')} ${LangyIcons.arrowRight}
                    </button>
                </div>
            </div>
        `;

        container.querySelectorAll('.interest-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const id = chip.dataset.id;
                const idx = selected.indexOf(id);
                if (idx > -1) {
                    selected.splice(idx, 1);
                } else {
                    selected.push(id);
                }
                ScreenState.set('selectedInterests', selected);

                // Animate chip
                chip.classList.toggle('interest-chip--selected');
                chip.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    chip.style.transform = '';
                }, 150);

                // Update counter and button
                const counter = container.querySelector('.onboarding__counter');
                const btn = container.querySelector('#onboarding-next');
                counter.textContent = `${selected.length} ${i18n('onboarding.selected')}`;
                if (selected.length > 0) {
                    btn.classList.remove('btn--disabled');
                    btn.disabled = false;
                } else {
                    btn.classList.add('btn--disabled');
                    btn.disabled = true;
                }
            });
        });

        container.querySelector('#onboarding-next').addEventListener('click', () => {
            LangyState.user.interests = selected;
            ScreenState.set('onboardingStep', 2);
            renderOnboarding(container);
        });

        setTimeout(() => Anim.staggerChildren(container, '.interest-chip'), 50);
        return;
    }

    // ─── STEP 2: Choose Mascot ───
    if (step === 2) {
        const lang3 = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
        const mascots = [
            {
                id: 0,
                name: 'Zendaya',
                emoji: LangyIcons.sparkles,
                desc: {
                    en: 'Bright and inspiring. Makes learning stylish!',
                    ru: 'Яркая и вдохновляющая. Делает обучение стильным!',
                    es: 'Brillante e inspiradora. ¡Aprendizaje con estilo!',
                }[lang3],
                style: { en: 'Trend Coach', ru: 'Трендовый наставник', es: 'Coach de Tendencias' }[lang3],
                file: 'zendaya',
            },
            {
                id: 1,
                name: 'Travis Scott',
                emoji: LangyIcons.zap,
                desc: {
                    en: 'Energetic and charismatic. Teaches through music & culture.',
                    ru: 'Энергичный и харизматичный. Учит через музыку и культуру.',
                    es: 'Energético y carismático. Enseña con música y cultura.',
                }[lang3],
                style: { en: 'Culture Tracker', ru: 'Культурный трекер', es: 'Rastreador Cultural' }[lang3],
                file: 'travis',
            },
            {
                id: 2,
                name: 'Matthew',
                emoji: LangyIcons.play,
                desc: {
                    en: 'Calm and confident. Explains everything clearly with charm.',
                    ru: 'Спокойный и уверенный. Объясняет всё чётко и с шармом.',
                    es: 'Tranquilo y seguro. Explica todo con claridad y encanto.',
                }[lang3],
                style: { en: 'Hollywood Class', ru: 'Голливудский класс', es: 'Clase de Hollywood' }[lang3],
                file: 'matthew',
            },
            {
                id: 3,
                name: 'Omar',
                emoji: LangyIcons.user,
                desc: {
                    en: 'Wise and charismatic. Teaches through life stories.',
                    ru: 'Мудрый и харизматичный. Учит через жизненные истории.',
                    es: 'Sabio y carismático. Enseña con historias de vida.',
                }[lang3],
                style: { en: 'Wise Friend', ru: 'Мудрый друг', es: 'Amigo Sabio' }[lang3],
                file: 'omar',
            },
        ];

        const selectedMascot = ScreenState.get('selectedMascot', null);

        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__header">
                    <div class="onboarding__step-badge">${i18n('onboarding.step')} 2/2</div>
                    <h2 class="onboarding__title" style="font-size: var(--fs-2xl);">${i18n('onboarding.choose_teacher')}</h2>
                    <p class="onboarding__desc">${i18n('onboarding.mascot_desc')}</p>
                </div>

                <div class="onboarding__mascots" id="mascot-grid">
                    ${mascots
                        .map(
                            m => `
                        <div class="mascot-card ${selectedMascot === m.id ? 'mascot-card--selected' : ''}" data-id="${m.id}">
                            <div class="mascot-card__avatar">
                                <img src="assets/mascots/${m.file}.png" 
                                     alt="${m.name}"
                                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                                     style="width:80px; height:80px; object-fit:contain;">
                                <div class="mascot-card__emoji" style="display:none; font-size:48px; justify-content:center; align-items:center;">${m.emoji}</div>
                            </div>
                            <div class="mascot-card__info">
                                <div class="mascot-card__name">${m.name}</div>
                                <div class="mascot-card__style">${m.style}</div>
                                <div class="mascot-card__desc">${m.desc}</div>
                            </div>
                            ${selectedMascot === m.id ? '<div class="mascot-card__check">${LangyIcons.check}</div>' : ''}
                        </div>
                    `
                        )
                        .join('')}
                </div>

                <div class="onboarding__bottom">
                    <button class="btn btn--primary btn--lg btn--full onboarding__btn ${selectedMascot === null ? 'btn--disabled' : ''}" id="onboarding-finish" ${selectedMascot === null ? 'disabled' : ''}>
                        ${i18n('onboarding.start_test')} ${LangyIcons.brain}
                    </button>
                </div>
            </div>
        `;

        container.querySelectorAll('.mascot-card').forEach(card => {
            card.addEventListener('click', () => {
                ScreenState.set('selectedMascot', parseInt(card.dataset.id));
                renderOnboarding(container);
            });
        });

        container.querySelector('#onboarding-finish').addEventListener('click', () => {
            LangyState.mascot.selected = selectedMascot;

            // Clean up temp variables
            ScreenState.clear(); // Clean up all temp onboarding state

            // Mark onboarding as done
            LangyState.user.hasCompletedOnboarding = true;

            // Save and go to placement test
            if (typeof LangyDB !== 'undefined') {
                LangyDB.saveProgress().catch(() => {});
            }

            Anim.showToast(
                `${['Zendaya', 'Travis Scott', 'Matthew', 'Omar'][selectedMascot]} ${i18n('onboarding.is_teacher')} ${LangyIcons.sparkles}`
            );
            setTimeout(() => Router.navigate('placement-test'), 600);
        });

        setTimeout(() => Anim.staggerChildren(container, '.mascot-card'), 80);
        return;
    }
}

Router.register('onboarding', renderOnboarding);

/* ============================================
   SCREEN: ONBOARDING — Quick Intent Setup
   Welcome → Goal → Confidence → Context → Teacher
   Gets user speaking in under 60 seconds.
   ============================================ */

function renderOnboarding(container) {
    const step = ScreenState.get('onboardingStep', 0);
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const TOTAL_STEPS = 4; // 0=welcome, 1=goal, 2=confidence, 3=context, 4=teacher

    // ─── Shared pill-selector renderer ───
    function renderPillStep(config) {
        const selected = ScreenState.get(config.stateKey, null);

        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__header">
                    <div class="onboarding__step-badge">${config.stepLabel}</div>
                    <h2 class="onboarding__title" style="font-size: var(--fs-2xl);">${config.title}</h2>
                    <p class="onboarding__desc">${config.subtitle}</p>
                </div>

                <div class="onboarding__pills" id="pill-grid" style="display:flex; flex-direction:column; gap:var(--sp-3); padding:0 var(--sp-2);">
                    ${config.options
                        .map(
                            opt => `
                        <button class="onboarding__pill ${selected === opt.id ? 'onboarding__pill--selected' : ''}"
                                data-id="${opt.id}"
                                style="
                                    display:flex; align-items:center; gap:var(--sp-3);
                                    padding:var(--sp-4); border-radius:var(--radius-lg);
                                    border:2px solid ${selected === opt.id ? 'var(--primary)' : 'var(--border)'};
                                    background:${selected === opt.id ? 'var(--primary-bg)' : 'var(--bg-card)'};
                                    cursor:pointer; text-align:left; width:100%;
                                    transition: all 0.2s ease;
                                    font-family:inherit; font-size:var(--fs-base);
                                    color:var(--text-primary);
                                ">
                            <span style="font-size:24px; flex-shrink:0; width:32px; text-align:center;">${opt.icon}</span>
                            <div>
                                <div style="font-weight:var(--fw-bold);">${opt.label}</div>
                                ${opt.desc ? `<div style="font-size:var(--fs-sm); color:var(--text-secondary); margin-top:2px;">${opt.desc}</div>` : ''}
                            </div>
                            ${selected === opt.id ? `<span style="margin-left:auto; color:var(--primary);">${LangyIcons.check}</span>` : ''}
                        </button>
                    `
                        )
                        .join('')}
                </div>

                <div class="onboarding__bottom">
                    <button class="btn btn--primary btn--lg btn--full onboarding__btn ${!selected ? 'btn--disabled' : ''}"
                            id="onboarding-next" ${!selected ? 'disabled' : ''}>
                        ${config.nextLabel || `${i18n('learn.next')} ${LangyIcons.arrowRight}`}
                    </button>
                </div>
            </div>
        `;

        // Pill click handlers
        container.querySelectorAll('.onboarding__pill').forEach(pill => {
            pill.addEventListener('click', () => {
                ScreenState.set(config.stateKey, pill.dataset.id);
                renderOnboarding(container);
            });
        });

        // Next button
        container.querySelector('#onboarding-next').addEventListener('click', () => {
            if (config.onNext) config.onNext(selected);
            ScreenState.set('onboardingStep', config.nextStep);
            renderOnboarding(container);
        });

        setTimeout(() => Anim.staggerChildren(container, '.onboarding__pill'), 50);
    }

    // ═══════════════════════════════════════════
    // STEP 0: Single Welcome Screen
    // ═══════════════════════════════════════════
    if (step === 0) {
        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__slide" style="animation: fadeInUp 0.5s ease-out; text-align:center; padding-top:var(--sp-8);">
                    <div style="margin-bottom:var(--sp-6);">
                        <img src="assets/logo.png" alt="Langy"
                             style="width:80px; height:auto; margin:0 auto var(--sp-4); display:block;"
                             onerror="this.style.display='none'">
                    </div>
                    <div class="onboarding__emoji" style="font-size:48px; margin-bottom:var(--sp-4);">${LangyIcons.messageCircle}</div>
                    <h1 class="onboarding__title">${{
                        en: "Let's get you speaking",
                        ru: 'Начнём говорить',
                        es: 'Empecemos a hablar',
                    }[lang]}</h1>
                    <p class="onboarding__subtitle" style="max-width:300px; margin:var(--sp-3) auto 0;">${{
                        en: '4 quick questions to set up your AI English teacher. Takes 30 seconds.',
                        ru: '4 быстрых вопроса для настройки AI-учителя. Займёт 30 секунд.',
                        es: '4 preguntas rápidas para configurar tu profesor IA. 30 segundos.',
                    }[lang]}</p>
                </div>

                <div class="onboarding__bottom" style="padding:0 var(--sp-4);">
                    <button class="btn btn--primary btn--lg btn--full onboarding__btn" id="onboarding-next">
                        ${{ en: "Let's go", ru: 'Поехали', es: 'Vamos' }[lang]} ${LangyIcons.rocket}
                    </button>
                </div>
            </div>
        `;

        container.querySelector('#onboarding-next').addEventListener('click', () => {
            ScreenState.set('onboardingStep', 1);
            renderOnboarding(container);
        });

        return;
    }

    // ═══════════════════════════════════════════
    // STEP 1: What's your goal?
    // ═══════════════════════════════════════════
    if (step === 1) {
        renderPillStep({
            stepLabel: `1 / ${TOTAL_STEPS}`,
            stateKey: 'intentGoal',
            title: { en: 'What do you want?', ru: 'Какая у тебя цель?', es: '¿Cuál es tu objetivo?' }[lang],
            subtitle: {
                en: 'Pick one — we\'ll tailor everything to it',
                ru: 'Выбери одну — мы всё настроим под неё',
                es: 'Elige una — ajustaremos todo',
            }[lang],
            nextStep: 2,
            options: [
                {
                    id: 'speak',
                    icon: LangyIcons.mic,
                    label: { en: 'Start speaking confidently', ru: 'Заговорить уверенно', es: 'Hablar con confianza' }[lang],
                    desc: { en: 'Real conversations from day one', ru: 'Реальные разговоры с первого дня', es: 'Conversaciones reales desde el día uno' }[lang],
                },
                {
                    id: 'work',
                    icon: LangyIcons.clipboard,
                    label: { en: 'English for work', ru: 'Английский для работы', es: 'Inglés para el trabajo' }[lang],
                    desc: { en: 'Meetings, emails, presentations', ru: 'Встречи, письма, презентации', es: 'Reuniones, emails, presentaciones' }[lang],
                },
                {
                    id: 'travel',
                    icon: LangyIcons.globe,
                    label: { en: 'Travel without barriers', ru: 'Путешествовать без барьеров', es: 'Viajar sin barreras' }[lang],
                    desc: { en: 'Navigate any country easily', ru: 'Свободно ориентироваться в любой стране', es: 'Moverse fácilmente en cualquier país' }[lang],
                },
                {
                    id: 'exam',
                    icon: LangyIcons.graduationCap,
                    label: { en: 'Pass an exam', ru: 'Сдать экзамен', es: 'Aprobar un examen' }[lang],
                    desc: { en: 'IELTS, TOEFL, Cambridge', ru: 'IELTS, TOEFL, Cambridge', es: 'IELTS, TOEFL, Cambridge' }[lang],
                },
            ],
            onNext(val) {
                // Map goal to interests for personalization
                const goalToInterests = {
                    speak: ['social', 'movies'],
                    work: ['business', 'tech'],
                    travel: ['travel', 'food'],
                    exam: ['exams', 'books'],
                };
                LangyState.user.interests = goalToInterests[val] || ['social'];
                LangyState.user.goal = val;
            },
        });
        return;
    }

    // ═══════════════════════════════════════════
    // STEP 2: How confident are you?
    // ═══════════════════════════════════════════
    if (step === 2) {
        renderPillStep({
            stepLabel: `2 / ${TOTAL_STEPS}`,
            stateKey: 'intentConfidence',
            title: { en: 'How\'s your English?', ru: 'Как у тебя с английским?', es: '¿Cómo está tu inglés?' }[lang],
            subtitle: {
                en: 'No test needed — just be honest',
                ru: 'Тест не нужен — просто честно',
                es: 'Sin examen — solo sé honesto',
            }[lang],
            nextStep: 3,
            options: [
                {
                    id: 'zero',
                    icon: LangyIcons.seedling || LangyIcons.heart,
                    label: { en: 'Total beginner', ru: 'Полный ноль', es: 'Principiante total' }[lang],
                    desc: { en: 'I know almost nothing', ru: 'Почти ничего не знаю', es: 'No sé casi nada' }[lang],
                },
                {
                    id: 'basic',
                    icon: LangyIcons.bookOpen,
                    label: { en: 'I know the basics', ru: 'Знаю базу', es: 'Sé lo básico' }[lang],
                    desc: { en: 'Simple phrases, basic grammar', ru: 'Простые фразы, базовая грамматика', es: 'Frases simples, gramática básica' }[lang],
                },
                {
                    id: 'intermediate',
                    icon: LangyIcons.messageCircle,
                    label: { en: 'I can have a conversation', ru: 'Могу поговорить', es: 'Puedo conversar' }[lang],
                    desc: { en: 'But I make mistakes and freeze up', ru: 'Но делаю ошибки и зависаю', es: 'Pero cometo errores y me bloqueo' }[lang],
                },
                {
                    id: 'advanced',
                    icon: LangyIcons.trophy,
                    label: { en: 'Pretty good actually', ru: 'Довольно хорошо', es: 'Bastante bien' }[lang],
                    desc: { en: 'I want to polish and perfect it', ru: 'Хочу отшлифовать и улучшить', es: 'Quiero pulir y perfeccionar' }[lang],
                },
            ],
            onNext(val) {
                // Map confidence to CEFR level
                const confidenceToLevel = {
                    zero: 'A1',
                    basic: 'A2',
                    intermediate: 'B1',
                    advanced: 'B2',
                };
                const cefr = confidenceToLevel[val] || 'B1';
                const levelNames = {
                    A1: 'Beginner / Начинающий',
                    A2: 'Elementary / Элементарный',
                    B1: 'Intermediate / Средний',
                    B2: 'Upper Intermediate / Выше среднего',
                };
                LangyState.user.level = `${cefr} ${levelNames[cefr]}`;
                LangyState.user.hasCompletedPlacement = true;
                LangyState.settings.languageLevel = cefr;
                LangyState.user.confidenceLevel = val;

                // Auto-select textbook
                if (typeof LangyCurriculum !== 'undefined') {
                    LangyCurriculum.selectTextbookByLevel(cefr);
                }
            },
        });
        return;
    }

    // ═══════════════════════════════════════════
    // STEP 3: What context?
    // ═══════════════════════════════════════════
    if (step === 3) {
        renderPillStep({
            stepLabel: `3 / ${TOTAL_STEPS}`,
            stateKey: 'intentContext',
            title: { en: 'What do you enjoy?', ru: 'Что тебе нравится?', es: '¿Qué te gusta?' }[lang],
            subtitle: {
                en: 'We\'ll use this in your conversations',
                ru: 'Используем это в разговорах',
                es: 'Lo usaremos en tus conversaciones',
            }[lang],
            nextStep: 4,
            options: [
                {
                    id: 'movies',
                    icon: LangyIcons.play,
                    label: { en: 'Movies & TV shows', ru: 'Кино и сериалы', es: 'Películas y series' }[lang],
                },
                {
                    id: 'tech',
                    icon: LangyIcons.globe,
                    label: { en: 'Tech & startups', ru: 'Технологии и стартапы', es: 'Tecnología y startups' }[lang],
                },
                {
                    id: 'daily',
                    icon: LangyIcons.sun,
                    label: { en: 'Daily life & culture', ru: 'Быт и культура', es: 'Vida diaria y cultura' }[lang],
                },
                {
                    id: 'sports',
                    icon: LangyIcons.award,
                    label: { en: 'Sports & fitness', ru: 'Спорт и фитнес', es: 'Deportes y fitness' }[lang],
                },
                {
                    id: 'music',
                    icon: LangyIcons.volume,
                    label: { en: 'Music & art', ru: 'Музыка и искусство', es: 'Música y arte' }[lang],
                },
            ],
            onNext(val) {
                // Append context interest to existing list
                const existing = LangyState.user.interests || [];
                if (!existing.includes(val)) existing.push(val);
                LangyState.user.interests = existing;
                LangyState.user.context = val;
            },
        });
        return;
    }

    // ═══════════════════════════════════════════
    // STEP 4: Choose your teacher (mascot)
    // ═══════════════════════════════════════════
    if (step === 4) {
        const mascots = [
            {
                id: 0,
                name: 'Zendaya',
                emoji: LangyIcons.sparkles,
                desc: {
                    en: 'Bright & inspiring. Makes learning stylish!',
                    ru: 'Яркая и вдохновляющая!',
                    es: 'Brillante e inspiradora!',
                }[lang],
                style: { en: 'Trendy', ru: 'Модная', es: 'Moderna' }[lang],
                file: 'zendaya',
            },
            {
                id: 1,
                name: 'Travis',
                emoji: LangyIcons.zap,
                desc: {
                    en: 'Energetic & fun. Teaches through culture.',
                    ru: 'Энергичный! Учит через культуру.',
                    es: 'Energético! Enseña con cultura.',
                }[lang],
                style: { en: 'Creative', ru: 'Креативный', es: 'Creativo' }[lang],
                file: 'travis',
            },
            {
                id: 2,
                name: 'Matthew',
                emoji: LangyIcons.play,
                desc: {
                    en: 'Calm & clear. Explains everything patiently.',
                    ru: 'Спокойный и чёткий. Терпеливо объясняет.',
                    es: 'Tranquilo y claro. Explica con paciencia.',
                }[lang],
                style: { en: 'Classic', ru: 'Классический', es: 'Clásico' }[lang],
                file: 'matthew',
            },
            {
                id: 3,
                name: 'Omar',
                emoji: LangyIcons.user,
                desc: {
                    en: 'Wise & supportive. Teaches through stories.',
                    ru: 'Мудрый и поддерживающий. Учит через истории.',
                    es: 'Sabio y motivador. Enseña con historias.',
                }[lang],
                style: { en: 'Wise', ru: 'Мудрый', es: 'Sabio' }[lang],
                file: 'omar',
            },
        ];

        const selectedMascot = ScreenState.get('selectedMascot', null);

        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__header">
                    <div class="onboarding__step-badge">4 / ${TOTAL_STEPS}</div>
                    <h2 class="onboarding__title" style="font-size: var(--fs-2xl);">${{
                        en: 'Pick your teacher',
                        ru: 'Выбери учителя',
                        es: 'Elige tu profesor',
                    }[lang]}</h2>
                    <p class="onboarding__desc">${{
                        en: 'They\'ll guide all your conversations',
                        ru: 'Они будут вести все твои разговоры',
                        es: 'Guiarán todas tus conversaciones',
                    }[lang]}</p>
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
                            ${selectedMascot === m.id ? '<div class="mascot-card__check">' + LangyIcons.check + '</div>' : ''}
                        </div>
                    `
                        )
                        .join('')}
                </div>

                <div class="onboarding__bottom">
                    <button class="btn btn--primary btn--lg btn--full onboarding__btn ${selectedMascot === null ? 'btn--disabled' : ''}"
                            id="onboarding-finish" ${selectedMascot === null ? 'disabled' : ''}>
                        ${{ en: 'Start learning', ru: 'Начать обучение', es: 'Empezar a aprender' }[lang]} ${LangyIcons.rocket}
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

            // Capture user context before clearing ScreenState
            const userGoal = ScreenState.get('intentGoal', 'speak');
            const userConfidence = ScreenState.get('intentConfidence', 'intermediate');

            // Clean up temp state
            ScreenState.clear();

            // Mark onboarding as done
            LangyState.user.hasCompletedOnboarding = true;

            // Save progress
            if (typeof LangyDB !== 'undefined') {
                LangyDB.saveProgress().catch(() => {});
            }

            const teacherName = ['Zendaya', 'Travis', 'Matthew', 'Omar'][selectedMascot];
            Anim.showToast(
                `${teacherName} ${{ en: 'is your teacher', ru: 'теперь твой учитель', es: 'es tu profesor' }[lang]}! ${LangyIcons.sparkles}`
            );

            // ─── SPEAKING-FIRST: Go directly into first talk session ───
            // Pre-configure the talk screen to skip the picker and start immediately
            const scenarioMap = {
                speak: 'coffee',      // casual & approachable
                work: 'interview',    // professional context
                travel: 'airport',    // travel scenario
                exam: 'free',         // flexible practice
            };
            // For absolute beginners, use the friendliest scenario
            const scenario = userConfidence === 'zero' ? 'roommate' : (scenarioMap[userGoal] || 'coffee');

            LangyState.user.firstSessionCompleted = false;
            LangyState.user.firstSpeakingScenarioStarted = true;
            LangyState.user.firstSpeakingScenarioId = scenario;
            ScreenState.set('talkMascot', selectedMascot);
            ScreenState.set('talkScenario', scenario);
            ScreenState.set('firstTalkSession', true);
            ScreenState.set('talkView', 'call');

            setTimeout(() => Router.navigate('talk'), 600);
        });

        setTimeout(() => Anim.staggerChildren(container, '.mascot-card'), 80);
        return;
    }
}

Router.register('onboarding', renderOnboarding);

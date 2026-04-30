/* ============================================
   SCREEN: ONBOARDING — Multi-Language First Session Setup
   Flow: Language → Goal → Confidence → Start
   ============================================ */

function renderOnboarding(container) {
    const rawStep = ScreenState.get('onboardingStep', 1);
    const step = Math.min(Math.max(rawStep, 1), 4);
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const TOTAL_STEPS = 4; // 1=language, 2=goal, 3=confidence, 4=start

    if (rawStep !== step) ScreenState.set('onboardingStep', step);

    // ─── Shared option-step renderer ───
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
    // STEP 1: CHOOSE YOUR LANGUAGE (Hero step)
    // ═══════════════════════════════════════════
    if (step === 1) {
        const selectedLang = ScreenState.get('targetLangChoice', null);
        const languages = typeof LangyTarget !== 'undefined' ? LangyTarget.LANGUAGES : {};

        // Build language cards with rich info
        const langCards = Object.entries(languages).map(([code, cfg]) => {
            const isSelected = selectedLang === code;
            const backbone = cfg.academicBackbone || {};
            const subtitleMap = {
                en: {
                    en: 'CEFR-aligned academic English',
                    ru: 'Академический английский по CEFR',
                    es: 'Inglés académico alineado con MCER',
                },
                es: {
                    en: 'Cervantes Institute Spanish',
                    ru: 'Испанский по Институту Сервантеса',
                    es: 'Español del Instituto Cervantes',
                },
                ar: {
                    en: 'Modern Standard Arabic',
                    ru: 'Современный стандартный арабский',
                    es: 'Árabe estándar moderno',
                },
            };
            const subtitle = (subtitleMap[code] || {})[lang] || backbone.reference || '';
            const levelStr = cfg.cefrLevels ? `${cfg.cefrLevels[0]}–${cfg.cefrLevels[cfg.cefrLevels.length - 1]}` : '';

            return `
                <button class="onboarding__lang-card ${isSelected ? 'onboarding__lang-card--selected' : ''}"
                        data-lang="${code}"
                        id="lang-card-${code}"
                        style="
                            display:flex; align-items:center; gap:var(--sp-4);
                            padding:var(--sp-5) var(--sp-4); border-radius:var(--radius-xl, 20px);
                            border:2.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'};
                            background:${isSelected ? 'var(--primary-bg)' : 'var(--bg-card)'};
                            cursor:pointer; text-align:left; width:100%;
                            transition: all 0.25s ease;
                            font-family:inherit; font-size:var(--fs-base);
                            color:var(--text-primary);
                            ${isSelected ? 'box-shadow: 0 0 0 3px rgba(var(--primary-rgb, 99,102,241), 0.15);' : ''}
                        ">
                    <span style="
                        font-size:40px; flex-shrink:0; width:52px; height:52px;
                        display:flex; align-items:center; justify-content:center;
                        background:var(--bg-secondary, rgba(0,0,0,0.04)); border-radius:14px;
                    ">${cfg.flag}</span>
                    <div style="flex:1; min-width:0;">
                        <div style="font-weight:var(--fw-bold); font-size:var(--fs-lg);">
                            ${cfg.nativeName}
                            <span style="font-weight:400; color:var(--text-secondary); font-size:var(--fs-sm);"> · ${(cfg.name || {})[lang] || cfg.nativeName}</span>
                        </div>
                        <div style="font-size:var(--fs-sm); color:var(--text-secondary); margin-top:3px;">
                            ${subtitle}
                        </div>
                        <div style="font-size:var(--fs-xs, 11px); color:var(--text-tertiary, var(--text-secondary)); margin-top:4px; opacity:0.7;">
                            CEFR ${levelStr}${cfg.direction === 'rtl' ? ' · RTL' : ''}
                        </div>
                    </div>
                    ${isSelected ? `<span style="margin-left:auto; color:var(--primary); flex-shrink:0;">${LangyIcons.check}</span>` : ''}
                </button>
            `;
        });

        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__header" style="padding-bottom:var(--sp-2);">
                    <div class="onboarding__step-badge">1 / ${TOTAL_STEPS}</div>
                    <h2 class="onboarding__title" style="font-size: var(--fs-2xl);">
                        ${{ en: 'What will you learn?', ru: 'Какой язык учим?', es: '¿Qué idioma aprenderás?' }[lang]}
                    </h2>
                    <p class="onboarding__desc" style="max-width:340px; margin:var(--sp-1) auto 0;">
                        ${{ en: 'Each language has its own curriculum, exercises, and AI tutor', ru: 'У каждого языка — свой учебный план, упражнения и ИИ-репетитор', es: 'Cada idioma tiene su propio plan, ejercicios y tutor IA' }[lang]}
                    </p>
                </div>

                <div class="onboarding__pills" style="display:flex; flex-direction:column; gap:var(--sp-3); padding:0 var(--sp-2);">
                    ${langCards.join('')}
                </div>

                <div class="onboarding__bottom">
                    <button class="btn btn--primary btn--lg btn--full onboarding__btn ${!selectedLang ? 'btn--disabled' : ''}"
                            id="onboarding-next" ${!selectedLang ? 'disabled' : ''}>
                        ${{ en: 'Continue', ru: 'Продолжить', es: 'Continuar' }[lang]} ${LangyIcons.arrowRight}
                    </button>
                </div>
            </div>
        `;

        // Language card click handlers
        container.querySelectorAll('.onboarding__lang-card').forEach(card => {
            card.addEventListener('click', () => {
                ScreenState.set('targetLangChoice', card.dataset.lang);
                renderOnboarding(container);
            });
        });

        // Next button
        container.querySelector('#onboarding-next').addEventListener('click', () => {
            const code = ScreenState.get('targetLangChoice', 'en');

            // Set the target language in the system
            if (typeof LangyTarget !== 'undefined') {
                LangyTarget.set(code);
            }
            if (typeof LangyState !== 'undefined') {
                LangyState.targetLanguage = code;
            }
            if (typeof LangyCurriculum !== 'undefined') {
                LangyCurriculum.targetLanguage = code;
            }

            ScreenState.set('onboardingStep', 2);
            renderOnboarding(container);
        });

        setTimeout(() => Anim.staggerChildren(container, '.onboarding__lang-card'), 50);
        return;
    }

    // ═══════════════════════════════════════════
    // STEP 2: What's your goal?
    // ═══════════════════════════════════════════
    if (step === 2) {
        // Get selected language name for contextual copy
        const targetCode = ScreenState.get('targetLangChoice', 'en');
        const targetCfg = typeof LangyTarget !== 'undefined' ? (LangyTarget.LANGUAGES[targetCode] || {}) : {};
        const targetName = (targetCfg.name || {})[lang] || targetCfg.nativeName || 'this language';

        // Customize exam description per language
        const examDescs = {
            en: { en: 'IELTS, TOEFL, Cambridge', ru: 'IELTS, TOEFL, Cambridge', es: 'IELTS, TOEFL, Cambridge' },
            es: { en: 'DELE, SIELE', ru: 'DELE, SIELE', es: 'DELE, SIELE' },
            ar: { en: 'Arabic proficiency tests', ru: 'Тесты по арабскому', es: 'Pruebas de árabe' },
        };

        renderPillStep({
            stepLabel: `2 / ${TOTAL_STEPS}`,
            stateKey: 'intentGoal',
            title: { en: `What's your goal with ${targetName}?`, ru: `Какая цель в ${targetName === 'Английский' ? 'английском' : targetName === 'Испанский' ? 'испанском' : targetName === 'Арабский' ? 'арабском' : targetName}?`, es: `¿Tu objetivo con ${targetName}?` }[lang],
            subtitle: {
                en: 'Pick one — we\'ll tailor everything to it',
                ru: 'Выбери одну — мы всё настроим под неё',
                es: 'Elige una — ajustaremos todo',
            }[lang],
            nextStep: 3,
            options: [
                {
                    id: 'speak',
                    icon: LangyIcons.mic,
                    label: { en: 'Speak confidently', ru: 'Заговорить уверенно', es: 'Hablar con confianza' }[lang],
                    desc: { en: 'Real conversations from day one', ru: 'Реальные разговоры с первого дня', es: 'Conversaciones reales desde el día uno' }[lang],
                },
                {
                    id: 'work',
                    icon: LangyIcons.clipboard,
                    label: { en: 'Language for work', ru: 'Язык для работы', es: 'Idioma para el trabajo' }[lang],
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
                    desc: (examDescs[targetCode] || examDescs.en)[lang],
                },
            ],
            onNext(val) {
                // Map goal to interests for lightweight personalization
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
    // STEP 3: Confidence self-estimate
    // ═══════════════════════════════════════════
    if (step === 3) {
        const targetCode = ScreenState.get('targetLangChoice', 'en');
        const targetCfg = typeof LangyTarget !== 'undefined' ? (LangyTarget.LANGUAGES[targetCode] || {}) : {};
        const targetName = (targetCfg.name || {})[lang] || targetCfg.nativeName || 'this language';

        renderPillStep({
            stepLabel: `3 / ${TOTAL_STEPS}`,
            stateKey: 'intentConfidence',
            title: { en: `Your ${targetName} level?`, ru: `Твой уровень ${targetName === 'Английский' ? 'английского' : targetName === 'Испанский' ? 'испанского' : targetName === 'Арабский' ? 'арабского' : targetName}?`, es: `¿Tu nivel de ${targetName}?` }[lang],
            subtitle: {
                en: 'No test needed — pick your current level',
                ru: 'Без теста — просто выбери свой уровень',
                es: 'Sin prueba — elige tu nivel actual',
            }[lang],
            nextStep: 4,
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

                // Auto-select textbook for the chosen language
                if (typeof LangyCurriculum !== 'undefined') {
                    LangyCurriculum.selectTextbookByLevel(cefr);
                }
            },
        });
        return;
    }

    // ═══════════════════════════════════════════
    // STEP 4: Final start CTA
    // ═══════════════════════════════════════════
    if (step === 4) {
        // Pull chosen language info for the final screen
        const targetCode = ScreenState.get('targetLangChoice', 'en');
        const targetCfg = typeof LangyTarget !== 'undefined' ? (LangyTarget.LANGUAGES[targetCode] || {}) : {};
        const targetName = (targetCfg.name || {})[lang] || targetCfg.nativeName || 'English';
        const targetFlag = targetCfg.flag || '🇬🇧';

        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__slide" style="animation: fadeInUp 0.5s ease-out; text-align:center; padding-top:var(--sp-8);">
                    <div style="margin-bottom:var(--sp-6);">
                        <img src="assets/logo.png" alt="Langy"
                             style="width:80px; height:auto; margin:0 auto var(--sp-4); display:block;"
                             onerror="this.style.display='none'">
                    </div>
                    <div class="onboarding__step-badge" style="margin:0 auto var(--sp-3); width:max-content;">4 / ${TOTAL_STEPS}</div>

                    <div style="font-size:48px; margin-bottom:var(--sp-3);">${targetFlag}</div>

                    <h2 class="onboarding__title">${{
                        en: `Let's start your ${targetName} journey!`,
                        ru: `Начнём изучать ${targetName === 'Английский' ? 'английский' : targetName === 'Испанский' ? 'испанский' : targetName === 'Арабский' ? 'арабский' : targetName}!`,
                        es: `¡Empecemos tu viaje en ${targetName}!`,
                    }[lang]}</h2>

                    <p class="onboarding__subtitle" style="max-width:340px; margin:var(--sp-3) auto 0;">${{
                        en: 'Your AI coach is ready. You can change your mascot and language anytime.',
                        ru: 'ИИ-коуч готов. Маскота и язык можно сменить в любое время.',
                        es: 'Tu coach IA está listo. Puedes cambiar mascota e idioma cuando quieras.',
                    }[lang]}</p>
                </div>

                <div class="onboarding__bottom">
                    <button class="btn btn--primary btn--lg btn--full onboarding__btn" id="onboarding-finish">
                        ${{ en: 'Start guided speaking', ru: 'Начать разговорную сессию', es: 'Iniciar sesión guiada' }[lang]} ${LangyIcons.rocket}
                    </button>
                </div>
            </div>
        `;

        container.querySelector('#onboarding-finish').addEventListener('click', () => {
            // Capture user context before clearing ScreenState
            const userGoal = ScreenState.get('intentGoal', 'speak');
            const userConfidence = ScreenState.get('intentConfidence', 'intermediate');
            const defaultMascot = LangyState.mascot.selected ?? 0;

            // Clean up temp state
            ScreenState.clear();

            // Mark onboarding as done
            LangyState.user.hasCompletedOnboarding = true;
            LangyState.mascot.selected = defaultMascot;

            // Save progress
            if (typeof LangyDB !== 'undefined') {
                LangyDB.saveProgress().catch(() => {});
            }

            Anim.showToast(`${{ en: 'Coach is ready!', ru: 'Коуч готов!', es: '¡Tu coach está listo!' }[lang]} ${LangyIcons.sparkles}`);

            // ─── SPEAKING-FIRST: Go directly into first talk session ───
            // Pre-configure the talk screen to skip the picker and start immediately
            const scenarioMap = {
                speak: 'coffee', // casual & approachable
                work: 'interview', // professional context
                travel: 'airport', // travel scenario
                exam: 'free', // flexible practice
            };
            // For absolute beginners, use the friendliest scenario
            const scenario = userConfidence === 'zero' ? 'roommate' : scenarioMap[userGoal] || 'coffee';

            ScreenState.set('talkMascot', defaultMascot);
            ScreenState.set('talkScenario', scenario);
            ScreenState.set('firstTalkSession', true);
            ScreenState.set('talkView', 'call');

            setTimeout(() => Router.navigate('talk'), 600);
        });

        return;
    }
}

Router.register('onboarding', renderOnboarding);

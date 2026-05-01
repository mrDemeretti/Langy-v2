/* ============================================
   SCREEN: ONBOARDING — Language-Specific First Session Setup
   Flow: Language → Goal (language-specific) → Confidence → Start
   Each language has distinct goals, framing, and path promises.
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

        // ─── Language-specific goal trees ───
        const goalsByLang = {
            ar: [
                {
                    id: 'alphabet',
                    icon: '🔤',
                    label: { en: 'Learn the Arabic alphabet', ru: 'Выучить арабский алфавит', es: 'Aprender el alfabeto árabe' }[lang],
                    desc: { en: 'Letters, sounds, reading & writing from scratch', ru: 'Буквы, звуки, чтение и письмо с нуля', es: 'Letras, sonidos, lectura y escritura desde cero' }[lang],
                },
                {
                    id: 'heritage',
                    icon: '🏠',
                    label: { en: 'Connect with my heritage', ru: 'Связь с наследием', es: 'Conectar con mi herencia' }[lang],
                    desc: { en: 'Understand family, culture, and roots', ru: 'Понять семью, культуру и корни', es: 'Entender familia, cultura y raíces' }[lang],
                },
                {
                    id: 'religion',
                    icon: '🕌',
                    label: { en: 'Understand religious texts', ru: 'Понимать религиозные тексты', es: 'Entender textos religiosos' }[lang],
                    desc: { en: 'Quran, prayers, Islamic knowledge', ru: 'Коран, молитвы, исламские знания', es: 'Corán, oraciones, conocimiento islámico' }[lang],
                },
                {
                    id: 'speak',
                    icon: LangyIcons.mic,
                    label: { en: 'Speak Arabic in daily life', ru: 'Говорить по-арабски в быту', es: 'Hablar árabe en el día a día' }[lang],
                    desc: { en: 'Greetings, shopping, social situations', ru: 'Приветствия, покупки, общение', es: 'Saludos, compras, situaciones sociales' }[lang],
                },
            ],
            es: [
                {
                    id: 'travel',
                    icon: LangyIcons.globe,
                    label: { en: 'Travel to Spanish-speaking countries', ru: 'Путешествовать по испаноязычным странам', es: 'Viajar a países hispanohablantes' }[lang],
                    desc: { en: 'Order food, ask directions, meet locals', ru: 'Заказать еду, спросить дорогу, общаться', es: 'Pedir comida, preguntar direcciones, conocer gente' }[lang],
                },
                {
                    id: 'speak',
                    icon: LangyIcons.mic,
                    label: { en: 'Speak everyday Spanish', ru: 'Говорить по-испански каждый день', es: 'Hablar español todos los días' }[lang],
                    desc: { en: 'Conversations, confidence, real fluency', ru: 'Разговоры, уверенность, реальная беглость', es: 'Conversaciones, confianza, fluidez real' }[lang],
                },
                {
                    id: 'relocate',
                    icon: '🏡',
                    label: { en: 'Relocate or live abroad', ru: 'Переезд или жизнь за рубежом', es: 'Mudarme o vivir en el extranjero' }[lang],
                    desc: { en: 'Work, documents, daily life in Spanish', ru: 'Работа, документы, быт на испанском', es: 'Trabajo, documentos, vida diaria en español' }[lang],
                },
                {
                    id: 'exam',
                    icon: LangyIcons.graduationCap,
                    label: { en: 'Pass DELE / SIELE', ru: 'Сдать DELE / SIELE', es: 'Aprobar DELE / SIELE' }[lang],
                    desc: { en: 'Structured exam preparation', ru: 'Подготовка к экзамену', es: 'Preparación estructurada para el examen' }[lang],
                },
            ],
            en: [
                {
                    id: 'work',
                    icon: LangyIcons.clipboard,
                    label: { en: 'English for work & interviews', ru: 'Английский для работы и собеседований', es: 'Inglés para trabajo y entrevistas' }[lang],
                    desc: { en: 'Meetings, emails, professional confidence', ru: 'Встречи, письма, профессиональная уверенность', es: 'Reuniones, emails, confianza profesional' }[lang],
                },
                {
                    id: 'speak',
                    icon: LangyIcons.mic,
                    label: { en: 'Everyday fluency', ru: 'Бытовая беглость', es: 'Fluidez cotidiana' }[lang],
                    desc: { en: 'Think and speak in English naturally', ru: 'Думать и говорить на английском свободно', es: 'Pensar y hablar en inglés de forma natural' }[lang],
                },
                {
                    id: 'travel',
                    icon: LangyIcons.globe,
                    label: { en: 'Travel & live abroad', ru: 'Путешествия и жизнь за рубежом', es: 'Viajar y vivir en el extranjero' }[lang],
                    desc: { en: 'Navigate airports, hotels, social life', ru: 'Аэропорты, отели, общение', es: 'Aeropuertos, hoteles, vida social' }[lang],
                },
                {
                    id: 'exam',
                    icon: LangyIcons.graduationCap,
                    label: { en: 'Pass IELTS / TOEFL / Cambridge', ru: 'Сдать IELTS / TOEFL / Cambridge', es: 'Aprobar IELTS / TOEFL / Cambridge' }[lang],
                    desc: { en: 'Academic English & exam strategies', ru: 'Академический английский и стратегии', es: 'Inglés académico y estrategias de examen' }[lang],
                },
            ],
        };

        // Language-specific subtitle for goal step
        const goalSubtitles = {
            ar: { en: "We'll shape your Arabic path around this", ru: 'Мы построим твой путь в арабском вокруг этого', es: 'Moldearemos tu camino en árabe según esto' },
            es: { en: "We'll focus your Spanish on what matters most", ru: 'Мы сфокусируем испанский на том, что важно', es: 'Enfocaremos tu español en lo que más importa' },
            en: { en: "We'll tailor your English to this goal", ru: 'Мы настроим английский под эту цель', es: 'Ajustaremos tu inglés a este objetivo' },
        };

        renderPillStep({
            stepLabel: `2 / ${TOTAL_STEPS}`,
            stateKey: 'intentGoal',
            title: { en: `Why are you learning ${targetName}?`, ru: `Зачем тебе ${targetName === 'Английский' ? 'английский' : targetName === 'Испанский' ? 'испанский' : targetName === 'Арабский' ? 'арабский' : targetName}?`, es: `¿Por qué aprendes ${targetName}?` }[lang],
            subtitle: (goalSubtitles[targetCode] || goalSubtitles.en)[lang],
            nextStep: 3,
            options: goalsByLang[targetCode] || goalsByLang.en,
            onNext(val) {
                // Language-specific goal-to-interest mapping
                const goalToInterests = {
                    alphabet: ['reading', 'writing'],
                    heritage: ['culture', 'social'],
                    religion: ['religion', 'books'],
                    relocate: ['social', 'business'],
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

        // Language-specific confidence descriptions
        const confByLang = {
            ar: {
                zero: { en: "I can't read Arabic letters yet", ru: 'Я ещё не читаю арабские буквы', es: 'Aún no leo letras árabes' },
                basic: { en: 'I know some letters and simple words', ru: 'Знаю некоторые буквы и простые слова', es: 'Conozco algunas letras y palabras simples' },
                intermediate: { en: 'I can read and hold basic conversations', ru: 'Могу читать и вести простые разговоры', es: 'Puedo leer y mantener conversaciones básicas' },
                advanced: { en: 'I read fluently and want to refine', ru: 'Читаю свободно, хочу улучшить', es: 'Leo con fluidez y quiero perfeccionar' },
            },
            es: {
                zero: { en: 'Just hola and gracias so far', ru: 'Только hola и gracias пока', es: 'Solo hola y gracias por ahora' },
                basic: { en: 'I can order food and introduce myself', ru: 'Могу заказать еду и представиться', es: 'Puedo pedir comida y presentarme' },
                intermediate: { en: 'I can chat but struggle with tenses', ru: 'Могу общаться, но путаюсь во временах', es: 'Puedo charlar pero me lío con los tiempos' },
                advanced: { en: 'I speak well but want native-level fluency', ru: 'Говорю хорошо, но хочу уровень носителя', es: 'Hablo bien pero quiero fluidez nativa' },
            },
            en: {
                zero: { en: 'I know almost nothing', ru: 'Почти ничего не знаю', es: 'No sé casi nada' },
                basic: { en: 'Simple phrases, basic grammar', ru: 'Простые фразы, базовая грамматика', es: 'Frases simples, gramática básica' },
                intermediate: { en: 'I can talk but freeze in meetings', ru: 'Могу говорить, но зависаю на встречах', es: 'Puedo hablar pero me bloqueo en reuniones' },
                advanced: { en: 'Fluent but want professional polish', ru: 'Бегло, но хочу профессиональный уровень', es: 'Fluido pero quiero nivel profesional' },
            },
        };
        const cd = confByLang[targetCode] || confByLang.en;

        renderPillStep({
            stepLabel: `3 / ${TOTAL_STEPS}`,
            stateKey: 'intentConfidence',
            title: { en: `Your ${targetName} level?`, ru: `Твой уровень ${targetName === 'Английский' ? 'английского' : targetName === 'Испанский' ? 'испанского' : targetName === 'Арабский' ? 'арабского' : targetName}?`, es: `¿Tu nivel de ${targetName}?` }[lang],
            subtitle: {
                en: 'No test needed — just pick what feels right',
                ru: 'Без теста — просто выбери, что подходит',
                es: 'Sin prueba — elige lo que sientas',
            }[lang],
            nextStep: 4,
            options: [
                {
                    id: 'zero',
                    icon: LangyIcons.seedling || LangyIcons.heart,
                    label: { en: 'Total beginner', ru: 'Полный ноль', es: 'Principiante total' }[lang],
                    desc: cd.zero[lang],
                },
                {
                    id: 'basic',
                    icon: LangyIcons.bookOpen,
                    label: { en: 'I know the basics', ru: 'Знаю базу', es: 'Sé lo básico' }[lang],
                    desc: cd.basic[lang],
                },
                {
                    id: 'intermediate',
                    icon: LangyIcons.messageCircle,
                    label: { en: 'I can have a conversation', ru: 'Могу поговорить', es: 'Puedo conversar' }[lang],
                    desc: cd.intermediate[lang],
                },
                {
                    id: 'advanced',
                    icon: LangyIcons.trophy,
                    label: { en: 'Pretty good actually', ru: 'Довольно хорошо', es: 'Bastante bien' }[lang],
                    desc: cd.advanced[lang],
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
                        ar: { en: 'Your Arabic journey begins!', ru: 'Твой путь в арабском начинается!', es: '¡Tu camino en árabe comienza!' },
                        es: { en: 'Vamos — your Spanish path is ready!', ru: 'Vamos — твой путь в испанском готов!', es: '¡Vamos — tu camino en español está listo!' },
                        en: { en: 'Your English growth starts now!', ru: 'Рост твоего английского начинается!', es: '¡Tu crecimiento en inglés empieza ahora!' },
                    }[targetCode]?.[lang] || `Let's start your ${targetName} journey!`}</h2>

                    <p class="onboarding__subtitle" style="max-width:340px; margin:var(--sp-3) auto 0;">${{
                        ar: { en: 'Your AI tutor will guide you through letters, sounds, and your first Arabic words.', ru: 'ИИ-репетитор проведёт тебя через буквы, звуки и первые арабские слова.', es: 'Tu tutor IA te guiará por letras, sonidos y tus primeras palabras en árabe.' },
                        es: { en: 'Your AI coach will help you start speaking Spanish from the very first session.', ru: 'ИИ-коуч поможет заговорить по-испански с первой же сессии.', es: 'Tu coach IA te ayudará a hablar español desde la primera sesión.' },
                        en: { en: 'Your AI coach will help you speak, think, and grow in English — starting now.', ru: 'ИИ-коуч поможет тебе говорить, думать и расти в английском — начиная сейчас.', es: 'Tu coach IA te ayudará a hablar, pensar y crecer en inglés — empezando ahora.' },
                    }[targetCode]?.[lang] || 'Your AI coach is ready.'}</p>
                </div>

                <div class="onboarding__bottom">
                    <button class="btn btn--primary btn--lg btn--full onboarding__btn" id="onboarding-finish">
                        ${{ 
                            ar: { en: 'Start learning Arabic', ru: 'Начать учить арабский', es: 'Empezar a aprender árabe' },
                            es: { en: 'Start speaking Spanish', ru: 'Начать говорить по-испански', es: 'Empezar a hablar español' },
                            en: { en: 'Start your English session', ru: 'Начать сессию английского', es: 'Iniciar sesión de inglés' },
                        }[targetCode]?.[lang] || 'Start guided speaking'} ${LangyIcons.rocket}
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
                speak: 'coffee',       // casual & approachable
                work: 'interview',     // professional context
                travel: 'airport',     // travel scenario
                exam: 'free',          // flexible practice
                alphabet: 'roommate',  // gentle Arabic start
                heritage: 'coffee',    // warm social
                religion: 'free',      // open practice
                relocate: 'airport',   // relocation/travel
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

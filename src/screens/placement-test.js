/* ============================================
   SCREEN: PLACEMENT TEST — Adaptive CEFR + Widgets
   Uses LangyWidgets for interactive exercises
   ============================================ */

function renderPlacementTest(container) {
    // ─── STATE ───
    let currentStep = 'intro'; // intro | testing | analyzing | result
    let currentQ = 0;
    let correctCount = 0;
    let totalAnswered = 0;
    let currentLevel = 2; // 0=A1, 1=A2, 2=B1, 3=B2, 4=C1
    const levelHistory = [];
    const skillScores = { grammar: 0, vocabulary: 0, reading: 0, listening: 0, writing: 0, speaking: 0 };
    const skillAttempts = { grammar: 0, vocabulary: 0, reading: 0, listening: 0, writing: 0, speaking: 0 };

    const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];

    // ─── QUESTION BANK: 60+ questions across levels & widget types ───
    const questionBank = [
        // ═══ A1 ═══
        {
            level: 0,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'I ___ a student.',
                options: ['am', 'is', 'are', 'be'],
                correct: 0,
                instruction: 'Выберите правильный вариант / Choose the correct option',
            },
        },
        {
            level: 0,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'She ___ from London.',
                options: ['am', 'is', 'are', 'do'],
                correct: 1,
            },
        },
        {
            level: 0,
            skill: 'vocabulary',
            widget: 'image-choice',
            data: {
                word: 'Apple',
                correct: 0,
                options: [
                    { emoji: LangyIcons.heart, label: 'Apple' },
                    { emoji: LangyIcons.sun, label: 'Banana' },
                    { emoji: LangyIcons.sun, label: 'Orange' },
                    { emoji: LangyIcons.moon, label: 'Grape' },
                ],
            },
        },
        {
            level: 0,
            skill: 'vocabulary',
            widget: 'match-pairs',
            data: {
                instruction: 'Соедините слова с переводом / Match words with translations',
                pairs: [
                    { left: 'Hello', right: 'Привет' },
                    { left: 'Goodbye', right: 'До свидания' },
                    { left: 'Thank you', right: 'Спасибо' },
                    { left: 'Please', right: 'Пожалуйста' },
                ],
            },
        },
        {
            level: 0,
            skill: 'grammar',
            widget: 'word-shuffle',
            data: {
                prompt: 'Составьте предложение:',
                words: ['I', 'am', 'happy', 'very'],
                correct: ['I', 'am', 'very', 'happy'],
            },
        },
        {
            level: 0,
            skill: 'listening',
            widget: 'listen-type',
            data: {
                text: 'Hello, my name is Anna.',
                hint: 'Приветствие + имя',
            },
        },
        {
            level: 0,
            skill: 'writing',
            widget: 'type-translation',
            data: {
                sourceText: 'Меня зовут Алекс.',
                fromLang: 'RU',
                toLang: 'EN',
                answer: ['My name is Alex', 'My name is Alex.', 'I am Alex'],
            },
        },
        {
            level: 0,
            skill: 'speaking',
            widget: 'speak-aloud',
            data: {
                phrase: 'Nice to meet you!',
            },
        },

        // ═══ A2 ═══
        {
            level: 1,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'Yesterday I ___ to the cinema.',
                options: ['go', 'went', 'gone', 'going'],
                correct: 1,
            },
        },
        {
            level: 1,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'She ___ TV every evening.',
                options: ['watch', 'watches', 'watching', 'watched'],
                correct: 1,
            },
        },
        {
            level: 1,
            skill: 'vocabulary',
            widget: 'match-pairs',
            data: {
                pairs: [
                    { left: 'Kitchen', right: 'Кухня' },
                    { left: 'Bedroom', right: 'Спальня' },
                    { left: 'Bathroom', right: 'Ванная' },
                    { left: 'Living room', right: 'Гостиная' },
                ],
            },
        },
        {
            level: 1,
            skill: 'grammar',
            widget: 'word-shuffle',
            data: {
                prompt: 'Past Simple:',
                words: ['went', 'I', 'yesterday', 'shopping'],
                correct: ['I', 'went', 'shopping', 'yesterday'],
            },
        },
        {
            level: 1,
            skill: 'reading',
            widget: 'read-answer',
            data: {
                passage:
                    'Tom wakes up at 7 AM. He has breakfast and takes the bus to school. His favourite subject is maths.',
                question: 'How does Tom get to school?',
                options: ['By car', 'By bus', 'On foot', 'By train'],
                correct: 1,
            },
        },
        {
            level: 1,
            skill: 'listening',
            widget: 'listen-type',
            data: {
                text: 'I like reading books in the evening.',
                hint: 'Хобби + время суток',
            },
        },
        {
            level: 1,
            skill: 'writing',
            widget: 'type-translation',
            data: {
                sourceText: 'Я пошёл в магазин вчера.',
                fromLang: 'RU',
                toLang: 'EN',
                answer: ['I went to the shop yesterday', 'I went to the store yesterday', 'I went shopping yesterday'],
            },
        },
        {
            level: 1,
            skill: 'vocabulary',
            widget: 'image-choice',
            data: {
                word: 'Cloudy',
                correct: 2,
                options: [
                    { emoji: LangyIcons.sun, label: 'Sunny' },
                    { emoji: LangyIcons.moon, label: 'Rainy' },
                    { emoji: LangyIcons.moon, label: 'Cloudy' },
                    { emoji: LangyIcons.star, label: 'Snowy' },
                ],
            },
        },

        // ═══ B1 ═══
        {
            level: 2,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'If I ___ rich, I would travel the world.',
                options: ['am', 'was', 'were', 'be'],
                correct: 2,
            },
        },
        {
            level: 2,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'I have been ___ English for two years.',
                options: ['learn', 'learned', 'learning', 'learns'],
                correct: 2,
            },
        },
        {
            level: 2,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'She suggested ___ to the park.',
                options: ['go', 'to go', 'going', 'went'],
                correct: 2,
            },
        },
        {
            level: 2,
            skill: 'grammar',
            widget: 'word-shuffle',
            data: {
                prompt: 'Present Perfect:',
                words: ['never', 'been', 'have', 'I', 'to', 'Paris'],
                correct: ['I', 'have', 'never', 'been', 'to', 'Paris'],
            },
        },
        {
            level: 2,
            skill: 'vocabulary',
            widget: 'match-pairs',
            data: {
                instruction: 'Соедините синонимы / Match synonyms',
                pairs: [
                    { left: 'Happy', right: 'Glad' },
                    { left: 'Smart', right: 'Clever' },
                    { left: 'Begin', right: 'Start' },
                    { left: 'Fast', right: 'Quick' },
                ],
            },
        },
        {
            level: 2,
            skill: 'reading',
            widget: 'read-answer',
            data: {
                passage:
                    'The company announced that all employees would work from home three days a week starting next month. The decision was made after a survey showed that 78% of workers preferred a hybrid model.',
                question: 'Why did the company make this decision?',
                options: [
                    'To save money',
                    'Survey results showed worker preference',
                    'Government regulation',
                    'Office renovation',
                ],
                correct: 1,
            },
        },
        {
            level: 2,
            skill: 'listening',
            widget: 'listen-type',
            data: {
                text: 'Could you tell me where the nearest station is?',
                hint: 'Вежливый вопрос о месте',
            },
        },
        {
            level: 2,
            skill: 'writing',
            widget: 'type-translation',
            data: {
                sourceText: 'Я изучаю английский уже два года.',
                fromLang: 'RU',
                toLang: 'EN',
                answer: ['I have been learning English for two years', 'I have been studying English for two years'],
            },
        },
        {
            level: 2,
            skill: 'speaking',
            widget: 'speak-aloud',
            data: {
                phrase: 'I would like to improve my English skills.',
            },
        },

        // ═══ B2 ═══
        {
            level: 3,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'Not only ___ she intelligent, but she is also hardworking.',
                options: ['is', 'does', 'was', 'has'],
                correct: 0,
            },
        },
        {
            level: 3,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'By next year, I ___ here for a decade.',
                options: ['will be', 'will have been', 'am', 'have been'],
                correct: 1,
            },
        },
        {
            level: 3,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'Despite ___ tired, she continued working.',
                options: ['being', 'be', 'was', 'been'],
                correct: 0,
            },
        },
        {
            level: 3,
            skill: 'grammar',
            widget: 'word-shuffle',
            data: {
                prompt: 'Inversion:',
                words: ['had', 'known', 'I', 'would', 'I', 'have', 'helped'],
                correct: ['Had', 'I', 'known', 'I', 'would', 'have', 'helped'],
            },
        },
        {
            level: 3,
            skill: 'vocabulary',
            widget: 'match-pairs',
            data: {
                instruction: 'Match idioms to meanings',
                pairs: [
                    { left: 'Break the ice', right: 'Start a conversation' },
                    { left: 'Hit the nail on the head', right: 'Be exactly right' },
                    { left: 'Under the weather', right: 'Feeling ill' },
                    { left: 'Piece of cake', right: 'Very easy' },
                ],
            },
        },
        {
            level: 3,
            skill: 'reading',
            widget: 'read-answer',
            data: {
                passage:
                    'Recent studies in neuroplasticity have demonstrated that the brain continues to form new neural connections throughout adulthood, challenging the long-held belief that cognitive development ceases after childhood. This has profound implications for education and rehabilitation.',
                question: 'What does the text challenge?',
                options: [
                    'The value of education',
                    'The belief that brain development stops after childhood',
                    'Neural science methods',
                    'Rehabilitation techniques',
                ],
                correct: 1,
            },
        },
        {
            level: 3,
            skill: 'listening',
            widget: 'listen-type',
            data: {
                text: 'The phenomenon of climate change requires immediate international cooperation.',
                hint: 'Глобальная проблема',
            },
        },
        {
            level: 3,
            skill: 'writing',
            widget: 'type-translation',
            data: {
                sourceText: 'Если бы я знал раньше, я бы принял другое решение.',
                fromLang: 'RU',
                toLang: 'EN',
                answer: [
                    'If I had known earlier, I would have made a different decision',
                    'Had I known earlier, I would have made a different decision',
                ],
            },
        },

        // ═══ C1 ═══
        {
            level: 4,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'Hardly ___ I entered the room when the phone rang.',
                options: ['did', 'had', 'was', 'have'],
                correct: 1,
            },
        },
        {
            level: 4,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'It is essential that he ___ notified immediately.',
                options: ['is', 'be', 'was', 'been'],
                correct: 1,
            },
        },
        {
            level: 4,
            skill: 'grammar',
            widget: 'fill-bubble',
            data: {
                sentence: 'The report ___ to have been written by an expert.',
                options: ['seems', 'appear', 'look', 'sound'],
                correct: 0,
            },
        },
        {
            level: 4,
            skill: 'vocabulary',
            widget: 'match-pairs',
            data: {
                instruction: 'Match formal ↔ informal',
                pairs: [
                    { left: 'Commence', right: 'Begin/Start' },
                    { left: 'Endeavour', right: 'Try' },
                    { left: 'Ascertain', right: 'Find out' },
                    { left: 'Elucidate', right: 'Explain' },
                ],
            },
        },
        {
            level: 4,
            skill: 'reading',
            widget: 'read-answer',
            data: {
                passage:
                    'The theory of cognitive dissonance posits that individuals experience psychological discomfort when simultaneously holding contradictory beliefs. To alleviate this tension, people often modify their attitudes or rationalize their behaviour, sometimes unconsciously.',
                question: 'According to the text, how do people resolve cognitive dissonance?',
                options: [
                    'By seeking therapy',
                    'By modifying attitudes or rationalizing',
                    'By avoiding social situations',
                    'By increasing contradictions',
                ],
                correct: 1,
            },
        },
        {
            level: 4,
            skill: 'listening',
            widget: 'listen-type',
            data: {
                text: 'The unprecedented acceleration of technological innovation necessitates a fundamental reassessment of educational paradigms.',
                hint: 'Академический стиль',
            },
        },
        {
            level: 4,
            skill: 'writing',
            widget: 'type-translation',
            data: {
                sourceText: 'Общество должно переосмыслить свой подход к устойчивому развитию.',
                fromLang: 'RU',
                toLang: 'EN',
                answer: [
                    'Society must reconsider its approach to sustainable development',
                    'Society needs to rethink its approach to sustainable development',
                ],
            },
        },
        {
            level: 4,
            skill: 'speaking',
            widget: 'speak-aloud',
            data: {
                phrase: 'The unprecedented acceleration of technology demands a paradigm shift in education.',
            },
        },
    ];

    // ─── ADAPTIVE QUESTION SELECTION (no repeats) ───
    const usedIndices = new Set();

    function getNextQuestion() {
        const available = questionBank
            .map((q, i) => ({ ...q, _idx: i }))
            .filter(q => q.level === currentLevel && !usedIndices.has(q._idx));

        // If all questions at current level used, try adjacent levels
        let pool = available;
        if (pool.length === 0) {
            const fallback = questionBank
                .map((q, i) => ({ ...q, _idx: i }))
                .filter(q => Math.abs(q.level - currentLevel) <= 1 && !usedIndices.has(q._idx));
            pool = fallback.length > 0 ? fallback : questionBank.map((q, i) => ({ ...q, _idx: i }));
        }

        // Prefer undertested skills
        const undertestedSkills = Object.entries(skillAttempts)
            .filter(([_, v]) => v < 2)
            .map(([k]) => k);

        if (undertestedSkills.length > 0) {
            const filtered = pool.filter(q => undertestedSkills.includes(q.skill));
            if (filtered.length > 0) pool = filtered;
        }

        const chosen = pool[Math.floor(Math.random() * pool.length)] || questionBank[0];
        usedIndices.add(chosen._idx);
        return chosen;
    }

    const TOTAL_QUESTIONS = 16;

    // ─── RENDER INTRO ───
    function renderIntro() {
        container.innerHTML = `
            <div class="screen placement-test">
                <div class="placement-intro">
                    <div class="placement-intro__icon">${LangyIcons.brain}</div>
                    <h2 class="placement-intro__title">Определение уровня</h2>
                    <p class="placement-intro__subtitle">Comprehensive CEFR Assessment</p>
                    
                    <div class="placement-intro__info">
                        <div class="placement-intro__row">
                            <span class="placement-intro__emoji">${LangyIcons.fileText}</span>
                            <span>Грамматика и лексика</span>
                            <span class="badge badge--primary">Grammar</span>
                        </div>
                        <div class="placement-intro__row">
                            <span class="placement-intro__emoji">${LangyIcons.bookOpen}</span>
                            <span>Чтение текстов</span>
                            <span class="badge badge--accent">Reading</span>
                        </div>
                        <div class="placement-intro__row">
                            <span class="placement-intro__emoji">${LangyIcons.headphones}</span>
                            <span>Аудирование</span>
                            <span class="badge badge--gold">Listening</span>
                        </div>
                        <div class="placement-intro__row">
                            <span class="placement-intro__emoji">${LangyIcons.pencil}</span>
                            <span>Перевод и письмо</span>
                            <span class="badge" style="background:var(--accent-bg); color:var(--accent-dark);">Writing</span>
                        </div>
                        <div class="placement-intro__row">
                            <span class="placement-intro__emoji">${LangyIcons.mic}</span>
                            <span>Произношение</span>
                            <span class="badge badge--danger">Speaking</span>
                        </div>
                    </div>

                    <div class="placement-intro__note">
                        Тест адаптивный — вопросы подстраиваются под ваш уровень.<br>
                        <strong>${TOTAL_QUESTIONS} интерактивных заданий · ~10 минут</strong>
                    </div>

                    <button class="btn btn--primary btn--xl btn--full" id="start-test-btn">
                        Начать тест / Start Test
                    </button>
                </div>
            </div>
        `;

        container.querySelector('#start-test-btn').onclick = () => {
            currentStep = 'testing';
            currentQ = 0;
            renderTestQuestion();
        };
    }

    // ─── RENDER QUESTION ───
    function renderTestQuestion() {
        if (currentQ >= TOTAL_QUESTIONS) {
            renderAnalyzing();
            return;
        }

        const q = getNextQuestion();
        const progress = Math.round((currentQ / TOTAL_QUESTIONS) * 100);

        container.innerHTML = `
            <div class="screen placement-test">
                <div class="placement-header">
                    <div class="placement-header__info">
                        <span class="placement-header__level">${levels[currentLevel]}</span>
                        <span class="placement-header__skill">${q.skill.toUpperCase()}</span>
                    </div>
                    <span class="placement-header__count">${currentQ + 1}/${TOTAL_QUESTIONS}</span>
                </div>
                <div class="placement-progress">
                    <div class="placement-progress__fill" style="width:${progress}%"></div>
                </div>
                <div class="placement-widget-area" id="widget-area"></div>
            </div>
        `;

        const widgetArea = container.querySelector('#widget-area');

        LangyWidgets.render(widgetArea, q.widget, q.data, isCorrect => {
            totalAnswered++;
            skillAttempts[q.skill]++;

            if (isCorrect) {
                correctCount++;
                skillScores[q.skill]++;
                // Increase difficulty
                if (currentLevel < 4) currentLevel++;
            } else {
                // Decrease difficulty
                if (currentLevel > 0) currentLevel--;
            }

            levelHistory.push(currentLevel);
            currentQ++;

            setTimeout(() => renderTestQuestion(), 1400);
        });
    }

    // ─── ANALYZING SCREEN ───
    function renderAnalyzing() {
        currentStep = 'analyzing';
        container.innerHTML = `
            <div class="screen placement-test" style="justify-content:center; align-items:center;">
                <div class="placement-analyzing">
                    <div class="ai-loader"><div class="ai-loader__orb"></div></div>
                    <h3 id="analyzing-text">Анализируем ваши ответы...</h3>
                    <p class="text-secondary">Calculating your CEFR level</p>
                </div>
            </div>
        `;

        const texts = [
            'Проверяем грамматику...',
            'Оцениваем словарный запас...',
            'Анализируем навыки чтения...',
            'Обрабатываем произношение...',
            'Определяем уровень CEFR...',
        ];
        let i = 0;
        const interval = setInterval(() => {
            if (i < texts.length) {
                const el = container.querySelector('#analyzing-text');
                if (el) el.textContent = texts[i++];
            }
        }, 700);

        setTimeout(() => {
            clearInterval(interval);
            calculateAndShowResults();
        }, 4000);
    }

    // ─── CALCULATE RESULTS ───
    function calculateAndShowResults() {
        // Calculate level from history (median of last 8 answers)
        const recentLevels = levelHistory.slice(-8);
        const sorted = [...recentLevels].sort((a, b) => a - b);
        const medianLevel = sorted[Math.floor(sorted.length / 2)];

        const cefr = levels[medianLevel];
        const overall = Math.round((correctCount / totalAnswered) * 100);

        const levelNames = {
            A1: 'Beginner / Начинающий',
            A2: 'Elementary / Элементарный',
            B1: 'Intermediate / Средний',
            B2: 'Upper Intermediate / Выше среднего',
            C1: 'Advanced / Продвинутый',
        };

        // Calculate per-skill percentages
        const skillPcts = {};
        Object.keys(skillScores).forEach(skill => {
            const attempts = skillAttempts[skill];
            skillPcts[skill] = attempts > 0 ? Math.round((skillScores[skill] / attempts) * 100) : 0;
        });

        // Save results
        LangyState.user.hasCompletedPlacement = true;
        LangyState.user.level = `${cefr} ${levelNames[cefr]}`;
        LangyState.progress.overall = overall;
        LangyState.progress.skills = {
            vocabulary: skillPcts.vocabulary,
            grammar: skillPcts.grammar,
            listening: skillPcts.listening,
            speaking: skillPcts.speaking,
            writing: skillPcts.writing,
            reading: skillPcts.reading,
        };

        // Auto-select textbook by level
        if (typeof LangyCurriculum !== 'undefined') {
            LangyCurriculum.selectTextbookByLevel(cefr);
        }

        // Sync settings.languageLevel with placement result
        LangyState.settings.languageLevel = cefr;

        renderResults(cefr, levelNames[cefr], overall, skillPcts);
    }

    // ─── RESULTS SCREEN ───
    function renderResults(cefr, levelName, overall, skillPcts) {
        currentStep = 'result';

        const skillLabels = {
            grammar: { name: 'Грамматика / Grammar', icon: LangyIcons.fileText },
            vocabulary: { name: 'Лексика / Vocabulary', icon: LangyIcons.book },
            reading: { name: 'Чтение / Reading', icon: LangyIcons.bookOpen },
            listening: { name: 'Аудирование / Listening', icon: LangyIcons.headphones },
            writing: { name: 'Письмо / Writing', icon: LangyIcons.pencil },
            speaking: { name: 'Говорение / Speaking', icon: LangyIcons.mic },
        };

        container.innerHTML = `
            <div class="screen placement-test">
                <div class="placement-results">
                    <div class="placement-results__badge animate-in">
                        <div class="placement-results__level">${cefr}</div>
                        <div class="placement-results__name">${levelName}</div>
                        <div class="placement-results__score">${overall}% correct</div>
                    </div>

                    <div class="placement-results__skills card" style="margin-top:var(--sp-6);">
                        <h4 style="margin-bottom:var(--sp-4);">Навыки / Skill Breakdown</h4>
                        ${Object.entries(skillPcts)
                            .map(
                                ([skill, val]) => `
                            <div class="skill-row">
                                <span class="skill-row__icon">${skillLabels[skill]?.icon || LangyIcons.barChart}</span>
                                <span class="skill-row__name">${skillLabels[skill]?.name || skill}</span>
                                <span class="skill-row__value">${val}%</span>
                                <div class="skill-row__bar">
                                    <div class="skill-row__fill" style="width:${val}%"></div>
                                </div>
                            </div>
                        `
                            )
                            .join('')}
                    </div>

                    <div class="placement-results__textbook card" style="margin-top:var(--sp-4);">
                        <h4 style='display:flex; align-items:center; gap:8px;'>${LangyIcons.book} Подобранный учебник:</h4>
                        <p style="color:var(--primary); font-weight:var(--fw-bold); margin-top:var(--sp-2);">
                            ${typeof LangyCurriculum !== 'undefined' ? LangyCurriculum.getActive()?.title : 'Langy Course'}
                        </p>
                    </div>

                    <button class="btn btn--primary btn--xl btn--full" id="finish-placement" style="margin-top:var(--sp-6);">
                         Начать обучение / Start Learning
                    </button>
                </div>
            </div>
        `;

        container.querySelector('#finish-placement').onclick = () => {
            if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
            Router.navigate('home');
        };
    }

    // ─── INIT ───
    renderIntro();
}

Router.register('placement-test', renderPlacementTest);

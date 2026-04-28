/* ============================================
   SCREEN: DUELS — Learning-Driven Competitive Practice
   Each duel mode targets a specific language skill.
   Results count toward progress and events.
   ============================================ */

function renderDuels(container) {
    const view = ScreenState.get('duelView', 'modes');

    switch (view) {
        case 'modes':
            renderDuelModes(container);
            break;
        case 'search':
            renderDuelSearch(container);
            break;
        case 'battle':
            renderDuelBattle(container);
            break;
        default:
            renderDuelModes(container);
    }
}

function getPlayerLeague(wins) {
    if (wins >= 50) return `${LangyIcons.diamond} Diamond`;
    if (wins >= 25) return `${LangyIcons.trophy} Gold`;
    if (wins >= 10) return `${LangyIcons.medal} Silver`;
    return `${LangyIcons.award} Bronze`;
}

function buildLeaderboard(playerWins) {
    const names = [
        'Sophia M.',
        'James K.',
        'Yuki T.',
        'Marco P.',
        'Elena V.',
        'Omar A.',
        'Lily C.',
        'Noah R.',
        'Ava S.',
        'Liam G.',
        'Zara H.',
        'Kai N.',
    ];
    const colors = [
        '#EF4444',
        '#3B82F6',
        '#8B5CF6',
        '#F59E0B',
        '#EC4899',
        '#10B981',
        '#6366F1',
        '#14B8A6',
        '#F97316',
        '#06B6D4',
    ];

    // Generate bots with realistic XP ranges
    const bots = names.slice(0, 10).map((name, i) => ({
        name,
        xp: Math.floor(Math.random() * 400 + 100 - i * 15),
        color: colors[i % colors.length],
        initial: name[0],
    }));

    // Ensure sorted descending
    bots.sort((a, b) => b.xp - a.xp);

    // Insert player by XP (wins * 30)
    const playerXP = playerWins * 30;
    const playerName = LangyState.user?.name || 'You';
    let playerInserted = false;
    const rows = [];

    bots.forEach((bot, i) => {
        if (!playerInserted && playerXP >= bot.xp) {
            rows.push({
                name: playerName,
                xp: playerXP,
                color: '#10B981',
                initial: (playerName[0] || 'Y').toUpperCase(),
                isPlayer: true,
            });
            playerInserted = true;
        }
        rows.push(bot);
    });
    if (!playerInserted) {
        rows.push({
            name: playerName,
            xp: playerXP,
            color: '#10B981',
            initial: (playerName[0] || 'Y').toUpperCase(),
            isPlayer: true,
        });
    }

    // Only show top 10
    return rows
        .slice(0, 10)
        .map(
            (r, i) => `
        <div class="leaderboard__row ${r.isPlayer ? 'leaderboard__row--you' : ''}" style="animation-delay:${i * 50}ms;">
            <div class="leaderboard__rank" style="color:${i === 0 ? '#F59E0B' : i === 1 ? '#9CA3AF' : i === 2 ? '#CD7F32' : 'var(--text-secondary)'};">
                ${i < 3 ? [`<span style="color:#F59E0B">${LangyIcons.trophy}</span>`, `<span style="color:#9CA3AF">${LangyIcons.medal}</span>`, `<span style="color:#CD7F32">${LangyIcons.award}</span>`][i] : '#' + (i + 1)}
            </div>
            <div class="leaderboard__avatar" style="background:${r.color};">${r.initial}</div>
            <div class="leaderboard__info">
                <div class="leaderboard__name">${r.name} ${r.isPlayer ? '<span style="font-size:10px;color:var(--primary);">(You)</span>' : ''}</div>
                <div class="leaderboard__league">${getPlayerLeague(Math.floor(r.xp / 30))}</div>
            </div>
            <div class="leaderboard__xp">${r.xp} XP</div>
        </div>
    `
        )
        .join('');
}

// ─── DUEL SKILL MODES — each mode targets a specific learning dimension ───
function getDuelSkillModes() {
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    return [
        {
            id: 'grammar',
            name: { en: 'Grammar Clash', ru: 'Грамматический бой', es: 'Duelo de gramática' }[lang],
            desc: { en: 'Test tenses, structures & rules', ru: 'Времена, структуры и правила', es: 'Tiempos, estructuras y reglas' }[lang],
            icon: LangyIcons.bookOpen,
            bg: 'var(--primary-bg)',
            color: '#3B82F6',
            skill: 'grammar',
            aiPrompt: 'grammar (tenses, articles, prepositions, conditionals)',
        },
        {
            id: 'vocab',
            name: { en: 'Vocab Sprint', ru: 'Словарный спринт', es: 'Sprint de vocabulario' }[lang],
            desc: { en: 'Synonyms, antonyms & word meaning', ru: 'Синонимы, антонимы и значения', es: 'Sinónimos, antónimos y significado' }[lang],
            icon: LangyIcons.book,
            bg: 'var(--reward-gold-bg)',
            color: '#F59E0B',
            skill: 'vocabulary',
            aiPrompt: 'vocabulary (synonyms, antonyms, word meaning, collocations)',
        },
        {
            id: 'mixed',
            name: { en: 'All Skills', ru: 'Все навыки', es: 'Todas las habilidades' }[lang],
            desc: { en: 'Grammar, vocab, spelling & comprehension', ru: 'Грамматика, словарь, правописание', es: 'Gramática, vocabulario, ortografía' }[lang],
            icon: LangyIcons.target,
            bg: 'var(--accent-bg)',
            color: '#10B981',
            skill: 'grammar',
            aiPrompt: 'mixed English skills (grammar, vocabulary, spelling, reading comprehension)',
        },
    ];
}

function renderDuelModes(container) {
    const { duels } = LangyState;
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const modes = getDuelSkillModes();
    const userCefr = (LangyState.user.level || 'B1').substring(0, 2);

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="duels-back">${LangyIcons.back}</div>
                <div class="nav-header__title">${i18n('duels.title')}</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: var(--sp-4) var(--sp-6); text-align:center;">
                <h3>${i18n('duels.choose_mode')}</h3>
                <p class="text-secondary text-sm" style="margin-top:var(--sp-1);">
                    ${{ en: 'Compete and practice your English skills', ru: 'Соревнуйся и тренируй английский', es: 'Compite y practica tu inglés' }[lang]}
                </p>
                <div class="badge badge--primary" style="margin-top:var(--sp-2);">${LangyIcons.barChart} ${userCefr} ${{ en: 'Level', ru: 'Уровень', es: 'Nivel' }[lang]}</div>
            </div>

            <div class="duels__modes">
                ${modes
                    .map(
                        mode => `
                    <div class="duel-mode" data-mode="${mode.id}">
                        <div class="duel-mode__icon" style="background:${mode.bg};">${mode.icon}</div>
                        <div>
                            <div class="duel-mode__title">${mode.name}</div>
                            <div class="duel-mode__desc">${mode.desc}</div>
                        </div>
                    </div>
                `
                    )
                    .join('')}
            </div>

            <div style="padding: var(--sp-6); text-align:center;">
                <div class="card card--flat" style="padding:var(--sp-4);">
                    <div style="display:flex; justify-content:space-around;">
                        <div class="stat">
                            <div class="stat__value" style="color:var(--accent-dark);">${duels.stats?.wins || 0}</div>
                            <div class="stat__label">${i18n('duels.wins')}</div>
                        </div>
                        <div class="stat">
                            <div class="stat__value" style="color:var(--danger);">${duels.stats?.losses || 0}</div>
                            <div class="stat__label">${i18n('duels.losses')}</div>
                        </div>
                        <div class="stat">
                            <div class="stat__value" style="color:var(--reward-gold);">${(duels.stats?.wins || 0) + (duels.stats?.losses || 0) > 0 ? Math.round(((duels.stats?.wins || 0) / ((duels.stats?.wins || 0) + (duels.stats?.losses || 0))) * 100) : 0}%</div>
                            <div class="stat__label">${i18n('duels.win_rate')}</div>
                        </div>
                </div>
            </div>

            <!-- Weekly Leaderboard -->
            <div style="padding: 0 var(--sp-6) var(--sp-6);">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--sp-3);">
                    <h3 style="display:flex; align-items:center; gap:var(--sp-2);">${LangyIcons.users} ${i18n('duels.leaderboard')}</h3>
                    <div class="badge badge--primary">${getPlayerLeague(duels.stats?.wins || 0)}</div>
                </div>
                <div class="card card--flat" style="padding:var(--sp-2);">
                    ${buildLeaderboard(duels.stats?.wins || 0)}
                </div>
            </div>
        </div>
    `;

    container.querySelectorAll('.duel-mode').forEach(mode => {
        mode.addEventListener('click', () => {
            ScreenState.set('duelMode', mode.dataset.mode);
            ScreenState.set('duelView', 'search');
            renderDuels(container);
        });
    });

    container.querySelector('#duels-back')?.addEventListener('click', () => {
        ScreenState.set('duelView', 'modes');
        Router.navigate('home');
    });

    setTimeout(() => Anim.staggerChildren(container, '.duel-mode'), 100);
}

function renderDuelSearch(container) {
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const modeId = ScreenState.get('duelMode', 'grammar');
    const modes = getDuelSkillModes();
    const selectedMode = modes.find(m => m.id === modeId) || modes[0];

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="search-back">${LangyIcons.back}</div>
                <div class="nav-header__title">${i18n('duels.finding')}</div>
                <div style="width:36px;"></div>
            </div>

            <div class="duel-search">
                <div class="duel-search__spinner"></div>
                <div class="duel-search__text">${i18n('duels.searching')}</div>
                <p class="text-secondary text-sm" style="margin-top:var(--sp-2);">
                    ${selectedMode.icon} ${selectedMode.name}
                </p>
                <button class="btn btn--ghost" id="search-cancel">${{ en: 'Cancel', ru: 'Отмена', es: 'Cancelar' }[lang]}</button>
            </div>
        </div>
    `;

    container.querySelector('#search-back')?.addEventListener('click', () => {
        ScreenState.set('duelView', 'modes');
        renderDuels(container);
    });

    container.querySelector('#search-cancel')?.addEventListener('click', () => {
        ScreenState.set('duelView', 'modes');
        renderDuels(container);
    });

    // Fetch skill-specific questions from AI
    const userLevel = LangyState.user.level || 'B1';
    const weakAreas = LangyState.aiMemory?.weakAreas || [];
    const weakHint = weakAreas.length > 0 ? `\nFocus on weak areas: ${weakAreas.slice(0, 3).join(', ')}.` : '';

    setTimeout(async () => {
        try {
            const prompt = `Generate 3 English ${selectedMode.aiPrompt} multiple choice questions for a competitive language duel.
Level: ${userLevel}.${weakHint}
Format EXACTLY as JSON array of objects:
[
  { "q": "Skill tag (e.g. Grammar: Past Simple)", "text": "The sentence with ___ blank", "options": ["A", "B", "C", "D"], "correct": 0 }
]
Make "q" a short skill label like "Grammar: Conditionals" or "Vocabulary: Synonyms".
Only reply with JSON.`;

            const result = await LangyAI.chat(prompt);
            const jsonMatch = result.match(/\[[\s\S]*\]/);
            let questions = [];
            if (jsonMatch) {
                questions = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('Invalid output');
            }
            ScreenState.set('duelState', {
                questions,
                questionIndex: 0,
                myScore: 0,
                opponentScore: 0,
                answered: false,
                skill: selectedMode.skill,
                modeName: selectedMode.name,
                startTime: Date.now(),
            });
        } catch (e) {
            console.warn('Duel AI fallback:', e);
            ScreenState.set('duelState', {
                questions: LangyState.duels.questions.slice(0, 3),
                questionIndex: 0,
                myScore: 0,
                opponentScore: 0,
                answered: false,
                skill: selectedMode.skill,
                modeName: selectedMode.name,
                startTime: Date.now(),
            });
        }

        ScreenState.set('duelView', 'battle');
        renderDuels(container);
    }, 500);
}

function renderDuelBattle(container) {
    const state = ScreenState.get('duelState') || {
        questions: LangyState.duels.questions,
        questionIndex: 0,
        myScore: 0,
        opponentScore: 0,
        answered: false,
        skill: 'grammar',
        modeName: 'Duel',
    };
    const question = state.questions[state.questionIndex];

    if (!question) {
        // Show results
        renderDuelResults(container, state);
        return;
    }

    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';

    container.innerHTML = `
        <div class="duel-battle">
            <!-- Top half: fighters -->
            <div class="duel-battle__top">
                <div class="duel-fighter">
                    <div class="duel-fighter__mascot">${LangyIcons.user}</div>
                    <div class="duel-fighter__name">${{ en: 'You', ru: 'Вы', es: 'Tú' }[lang]}</div>
                    <div class="duel-fighter__score" id="my-score">${state.myScore}</div>
                </div>

                <div class="duel-vs">VS</div>

                <div class="duel-fighter">
                    <div class="duel-fighter__mascot">${LangyIcons.brain}</div>
                    <div class="duel-fighter__name">Bot_Pro</div>
                    <div class="duel-fighter__score" id="opp-score">${state.opponentScore}</div>
                </div>
            </div>

            <!-- Bottom half: question -->
            <div class="duel-battle__bottom">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--sp-2);">
                    <span class="badge badge--primary">Q${state.questionIndex + 1}/${state.questions.length}</span>
                    <div class="timer" id="duel-timer" style="display:flex;align-items:center;gap:8px;">${LangyIcons.clock} 10</div>
                </div>

                <div class="duel-question">
                    <div style="font-size:var(--fs-xs); color:var(--text-tertiary); margin-bottom:var(--sp-1); display:flex; align-items:center; gap:4px;">
                        ${LangyIcons.target} ${question.q}
                    </div>
                    <div class="duel-question__text">${question.text}</div>
                    <div class="duel-question__options">
                        ${question.options
                            .map(
                                (opt, i) => `
                            <button class="duel-option" data-index="${i}">${opt}</button>
                        `
                            )
                            .join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Timer
    let timeLeft = 10;
    const timerEl = container.querySelector('#duel-timer');
    const timerInterval = setInterval(() => {
        timeLeft--;
        if (timerEl)
            timerEl.innerHTML = `<span style="display:flex;align-items:center;gap:8px;">${LangyIcons.clock} ${timeLeft}</span>`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!state.answered) {
                // Time's up - opponent gets the point
                state.opponentScore++;
                state.answered = true;
                setTimeout(() => nextQuestion(container, state), 1000);
            }
        }
    }, 1000);

    // Answer selection
    container.querySelectorAll('.duel-option').forEach(opt => {
        opt.addEventListener('click', () => {
            if (state.answered) return;
            state.answered = true;
            clearInterval(timerInterval);

            const selected = parseInt(opt.dataset.index);
            const isCorrect = selected === question.correct;

            opt.classList.add(isCorrect ? 'duel-option--correct' : 'duel-option--wrong');

            // Show correct answer
            if (!isCorrect) {
                container.querySelectorAll('.duel-option')[question.correct].classList.add('duel-option--correct');
            }

            if (isCorrect) {
                state.myScore++;
            }

            // Simulate opponent (50-70% chance of correct)
            if (Math.random() > 0.4) {
                state.opponentScore++;
            }

            setTimeout(() => nextQuestion(container, state), 1500);
        });
    });
}

function nextQuestion(container, state) {
    state.questionIndex++;
    state.answered = false;
    ScreenState.set('duelState', state);
    renderDuels(container);
}

function renderDuelResults(container, state) {
    const won = state.myScore > state.opponentScore;
    const tied = state.myScore === state.opponentScore;
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const totalQ = state.questions.length;
    const accuracy = totalQ > 0 ? Math.round((state.myScore / totalQ) * 100) : 0;
    const durationMin = state.startTime ? Math.max(1, Math.round((Date.now() - state.startTime) / 60000)) : 1;

    // Persona-aware result messages
    const personaWin = typeof MascotPersona !== 'undefined' ? MascotPersona.tone('lessonComplete') : null;
    const personaLose = typeof MascotPersona !== 'undefined' ? MascotPersona.tone('encouragement') : null;

    // Skill practiced label
    const skillLabel = {
        grammar: { en: 'Grammar', ru: 'Грамматика', es: 'Gramática' },
        vocabulary: { en: 'Vocabulary', ru: 'Словарный запас', es: 'Vocabulario' },
    }[state.skill || 'grammar'] || { en: 'English Skills', ru: 'Навыки английского', es: 'Habilidades' };

    // Learning insight
    const wrongCount = totalQ - state.myScore;
    let insight = '';
    if (wrongCount > 0) {
        insight = { en: `Review ${wrongCount} missed question${wrongCount > 1 ? 's' : ''} in your lessons`, ru: `Повторите ${wrongCount} ошибок в уроках`, es: `Repasa ${wrongCount} pregunta${wrongCount > 1 ? 's' : ''} en tus lecciones` }[lang];
    } else {
        insight = { en: 'Perfect round — your skills are sharp!', ru: 'Идеальный раунд — навыки на высоте!', es: '¡Ronda perfecta — tus habilidades están afiladas!' }[lang];
    }

    container.innerHTML = `
        <div class="screen screen--center" style="gap:var(--sp-5); text-align:center;">
            <div style="font-size:80px;">${won ? LangyIcons.sparkles : tied ? LangyIcons.users : LangyIcons.flame}</div>
            <h2 style="color:${won ? 'var(--accent-dark)' : tied ? 'var(--reward-gold)' : 'var(--danger)'};">
                ${won ? i18n('duels.victory') : tied ? i18n('duels.tie') : i18n('duels.defeat')}
            </h2>
            ${personaWin && won ? `<p style="font-style:italic; color:var(--text-secondary); font-size:var(--fs-sm);">"${personaWin}"</p>` : ''}
            ${personaLose && !won && !tied ? `<p style="font-style:italic; color:var(--text-secondary); font-size:var(--fs-sm);">"${personaLose}"</p>` : ''}

            <div style="display:flex; gap:var(--sp-8);">
                <div class="stat">
                    <div class="stat__value" style="color:var(--primary);">${state.myScore}</div>
                    <div class="stat__label">${{ en: 'You', ru: 'Вы', es: 'Tú' }[lang]}</div>
                </div>
                <div class="stat">
                    <div class="stat__value">${state.opponentScore}</div>
                    <div class="stat__label">Bot_Pro</div>
                </div>
            </div>

            <!-- Skill practiced badge -->
            <div class="badge badge--primary" style="display:inline-flex; align-items:center; gap:6px; font-size:var(--fs-xs);">
                ${LangyIcons.target} ${skillLabel[lang]} · ${accuracy}% ${{ en: 'accuracy', ru: 'точность', es: 'precisión' }[lang]}
            </div>

            <!-- Learning insight -->
            <div style="font-size:var(--fs-sm); color:var(--text-secondary); max-width:280px;">
                ${insight}
            </div>

            ${
                won
                    ? `
                <div class="daily__reward" style="animation: pulse 1s ease-in-out infinite;">
                    <span>${LangyIcons.gift}</span>
                    <span>+25 Dangy ${{ en: 'earned', ru: 'получено', es: 'ganado' }[lang]}!</span>
                </div>
            `
                    : ''
            }

            <div style="display:flex; gap:var(--sp-3); width:100%; max-width:300px;">
                <button class="btn btn--ghost btn--full" id="duel-home">${i18n('nav.home')}</button>
                <button class="btn btn--primary btn--full" id="duel-rematch">${i18n('duels.rematch')}</button>
            </div>
        </div>
    `;

    // ── Record duel as a learning session ──
    if (typeof recordSession === 'function') {
        recordSession({
            duration: durationMin,
            wordsLearned: 0,
            accuracy: accuracy,
            category: state.skill || 'grammar',
        });
    }

    if (won) {
        LangyState.currencies.dangy += 25;
        if (!LangyState.duels.stats) LangyState.duels.stats = { wins: 0, losses: 0, ties: 0 };
        LangyState.duels.stats.wins++;
    } else if (tied) {
        if (!LangyState.duels.stats) LangyState.duels.stats = { wins: 0, losses: 0, ties: 0 };
        LangyState.duels.stats.ties++;
    } else {
        if (!LangyState.duels.stats) LangyState.duels.stats = { wins: 0, losses: 0, ties: 0 };
        LangyState.duels.stats.losses++;
    }
    if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();

    container.querySelector('#duel-home')?.addEventListener('click', () => {
        ScreenState.set('duelView', 'modes');
        Router.navigate('home');
    });

    container.querySelector('#duel-rematch')?.addEventListener('click', () => {
        ScreenState.set('duelView', 'search');
        ScreenState.remove('duelState');
        renderDuels(container);
    });
}

Router.register('duels', renderDuels);

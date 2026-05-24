/* ============================================
   SCREEN: DUELS
   ============================================ */

function renderDuels(container) {
    const view = window._duelView || 'modes';

    switch (view) {
        case 'modes': renderDuelModes(container); break;
        case 'search': renderDuelSearch(container); break;
        case 'battle': renderDuelBattle(container); break;
        default: renderDuelModes(container);
    }
}

function getPlayerLeague(wins) {
    if (wins >= 50) return `${LangyIcons.diamond} Diamond`;
    if (wins >= 25) return `${LangyIcons.trophy} Gold`;
    if (wins >= 10) return `${LangyIcons.medal} Silver`;
    return `${LangyIcons.award} Bronze`;
}

function buildLeaderboard(playerWins) {
    const names = ['Sophia M.', 'James K.', 'Yuki T.', 'Marco P.', 'Elena V.', 'Omar A.', 'Lily C.', 'Noah R.', 'Ava S.', 'Liam G.', 'Zara H.', 'Kai N.'];
    const colors = ['#EF4444','#3B82F6','#8B5CF6','#F59E0B','#EC4899','#10B981','#6366F1','#14B8A6','#F97316','#06B6D4'];

    // Generate bots with realistic XP ranges
    const bots = names.slice(0, 10).map((name, i) => ({
        name,
        xp: Math.floor(Math.random() * 400 + 100 - i * 15),
        color: colors[i % colors.length],
        initial: name[0]
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
            rows.push({ name: playerName, xp: playerXP, color: '#10B981', initial: (playerName[0] || 'Y').toUpperCase(), isPlayer: true });
            playerInserted = true;
        }
        rows.push(bot);
    });
    if (!playerInserted) {
        rows.push({ name: playerName, xp: playerXP, color: '#10B981', initial: (playerName[0] || 'Y').toUpperCase(), isPlayer: true });
    }

    // Only show top 10
    return rows.slice(0, 10).map((r, i) => `
        <div class="leaderboard__row ${r.isPlayer ? 'leaderboard__row--you' : ''}" style="animation-delay:${i * 50}ms;">
            <div class="leaderboard__rank" style="color:${i === 0 ? '#F59E0B' : i === 1 ? '#9CA3AF' : i === 2 ? '#CD7F32' : 'var(--text-secondary)'};">
                ${i < 3 ? [`<span style="color:#F59E0B">${LangyIcons.trophy}</span>`,`<span style="color:#9CA3AF">${LangyIcons.medal}</span>`,`<span style="color:#CD7F32">${LangyIcons.award}</span>`][i] : '#' + (i + 1)}
            </div>
            <div class="leaderboard__avatar" style="background:${r.color};">${r.initial}</div>
            <div class="leaderboard__info">
                <div class="leaderboard__name">${r.name} ${r.isPlayer ? '<span style="font-size:10px;color:var(--primary);">(You)</span>' : ''}</div>
                <div class="leaderboard__league">${getPlayerLeague(Math.floor(r.xp / 30))}</div>
            </div>
            <div class="leaderboard__xp">${r.xp} XP</div>
        </div>
    `).join('');
}

function renderDuelModes(container) {
    const { duels } = LangyState;

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="duels-back">${LangyIcons.back}</div>
                <div class="nav-header__title">${i18n('duels.title')}</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: var(--sp-4) var(--sp-6); text-align:center;">
                <h3>${i18n('duels.choose_mode')}</h3>
                <p class="text-secondary text-sm" style="margin-top:var(--sp-1);">${i18n('duels.challenge')}</p>
            </div>

            <div class="duels__modes">
                ${duels.modes.map(mode => `
                    <div class="duel-mode" data-mode="${mode.id}">
                        <div class="duel-mode__icon" style="background:${mode.bg};">${mode.icon}</div>
                        <div>
                            <div class="duel-mode__title">${mode.name}</div>
                            <div class="duel-mode__desc">${mode.desc}</div>
                        </div>
                    </div>
                `).join('')}
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
            window._duelMode = mode.dataset.mode;
            window._duelView = 'search';
            renderDuels(container);
        });
    });

    container.querySelector('#duels-back')?.addEventListener('click', () => {
        window._duelView = 'modes';
        Router.navigate('home');
    });

    setTimeout(() => Anim.staggerChildren(container, '.duel-mode'), 100);
}

function renderDuelSearch(container) {
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
                <p class="text-secondary text-sm">This won't take long!</p>
                <button class="btn btn--ghost" id="search-cancel">Cancel</button>
            </div>
        </div>
    `;

    container.querySelector('#search-back')?.addEventListener('click', () => {
        window._duelView = 'modes';
        renderDuels(container);
    });

    container.querySelector('#search-cancel')?.addEventListener('click', () => {
        window._duelView = 'modes';
        renderDuels(container);
    });

    // Fetch questions from AI during search
    setTimeout(async () => {
        try {
            const prompt = `Generate 3 English grammar multiple choice questions for a quick duel.
Level: ${LangyState.user.level || 'B1'}.
Format EXACTLY as JSON array of objects:
[
  { "q": "Grammar rule", "text": "The sentence with ___ blank", "options": ["A", "B", "C", "D"], "correct": 0 }
]
Only reply with JSON.`;
            
            const result = await LangyAI.chat(prompt);
            const jsonMatch = result.match(/\[[\s\S]*\]/);
            let questions = [];
            if (jsonMatch) {
                questions = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error("Invalid output");
            }
            window._duelState = { questions, questionIndex: 0, myScore: 0, opponentScore: 0, answered: false };
        } catch (e) {
            console.warn('Duel AI fallback:', e);
            window._duelState = { questions: LangyState.duels.questions.slice(0,3), questionIndex: 0, myScore: 0, opponentScore: 0, answered: false };
        }
        
        window._duelView = 'battle';
        renderDuels(container);
    }, 500);
}

function renderDuelBattle(container) {
    const state = window._duelState || { questions: LangyState.duels.questions, questionIndex: 0, myScore: 0, opponentScore: 0, answered: false };
    const question = state.questions[state.questionIndex];

    if (!question) {
        // Show results
        renderDuelResults(container, state);
        return;
    }

    container.innerHTML = `
        <div class="duel-battle">
            <!-- Top half: fighters -->
            <div class="duel-battle__top">
                <div class="duel-fighter">
                    <div class="duel-fighter__mascot">${LangyIcons.user}</div>
                    <div class="duel-fighter__name">You</div>
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
                    <div style="font-size:var(--fs-sm); color:var(--text-secondary); margin-bottom:var(--sp-2);">${question.q}</div>
                    <div class="duel-question__text">${question.text}</div>
                    <div class="duel-question__options">
                        ${question.options.map((opt, i) => `
                            <button class="duel-option" data-index="${i}">${opt}</button>
                        `).join('')}
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
        if (timerEl) timerEl.innerHTML = `<span style="display:flex;align-items:center;gap:8px;">${LangyIcons.clock} ${timeLeft}</span>`;
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
    window._duelState = state;
    renderDuels(container);
}

function renderDuelResults(container, state) {
    const won = state.myScore > state.opponentScore;
    const tied = state.myScore === state.opponentScore;

    container.innerHTML = `
        <div class="screen screen--center" style="gap:var(--sp-6); text-align:center;">
            <div style="font-size:80px;">${won ? LangyIcons.sparkles : tied ? LangyIcons.users : LangyIcons.flame}</div>
            <h2 style="color:${won ? 'var(--accent-dark)' : tied ? 'var(--reward-gold)' : 'var(--danger)'};">
                ${won ? i18n('duels.victory') : tied ? i18n('duels.tie') : i18n('duels.defeat')}
            </h2>

            <div style="display:flex; gap:var(--sp-8);">
                <div class="stat">
                    <div class="stat__value" style="color:var(--primary);">${state.myScore}</div>
                    <div class="stat__label">You</div>
                </div>
                <div class="stat">
                    <div class="stat__value">${state.opponentScore}</div>
                    <div class="stat__label">Bot_Pro</div>
                </div>
            </div>

            ${won ? `
                <div class="daily__reward" style="animation: pulse 1s ease-in-out infinite;">
                    <span>${LangyIcons.gift}</span>
                    <span>+25 Dangy earned!</span>
                </div>
            ` : ''}

            <div style="display:flex; gap:var(--sp-3); width:100%; max-width:300px;">
                <button class="btn btn--ghost btn--full" id="duel-home">${i18n('nav.home')}</button>
                <button class="btn btn--primary btn--full" id="duel-rematch">${i18n('duels.rematch')}</button>
            </div>
        </div>
    `;

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
        window._duelView = 'modes';
        Router.navigate('home');
    });

    container.querySelector('#duel-rematch')?.addEventListener('click', () => {
        window._duelView = 'search';
        window._duelState = null;
        renderDuels(container);
    });
}

Router.register('duels', renderDuels);

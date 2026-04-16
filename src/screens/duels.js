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

function renderDuelModes(container) {
    const { duels } = LangyState;

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="duels-back">←</div>
                <div class="nav-header__title">Language Duels</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: var(--sp-4) var(--sp-6); text-align:center;">
                <h3>Choose Your Mode</h3>
                <p class="text-secondary text-sm" style="margin-top:var(--sp-1);">Challenge other learners!</p>
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
                            <div class="stat__label">Wins</div>
                        </div>
                        <div class="stat">
                            <div class="stat__value" style="color:var(--danger);">${duels.stats?.losses || 0}</div>
                            <div class="stat__label">Losses</div>
                        </div>
                        <div class="stat">
                            <div class="stat__value" style="color:var(--reward-gold);">${(duels.stats?.wins || 0) + (duels.stats?.losses || 0) > 0 ? Math.round(((duels.stats?.wins || 0) / ((duels.stats?.wins || 0) + (duels.stats?.losses || 0))) * 100) : 0}%</div>
                            <div class="stat__label">Win Rate</div>
                        </div>
                    </div>
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
                <div class="nav-header__back" id="search-back">←</div>
                <div class="nav-header__title">Finding Opponent</div>
                <div style="width:36px;"></div>
            </div>

            <div class="duel-search">
                <div class="duel-search__spinner"></div>
                <div class="duel-search__text">Searching for opponent...</div>
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
                ${won ? 'Victory!' : tied ? 'It\'s a Tie!' : 'Defeat!'}
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
                <button class="btn btn--ghost btn--full" id="duel-home">Home</button>
                <button class="btn btn--primary btn--full" id="duel-rematch">Rematch</button>
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

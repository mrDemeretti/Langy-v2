/* ============================================
   SCREEN: EVENTS v2 — Live Solo Challenges
   Real progress tracking + Speed Sprint mini-game
   ============================================ */

// ─── EVENT DEFINITIONS ───
function getActiveEvents() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const dayOfWeek = now.getDay(); // 0=Sun
    const ep = LangyState.eventProgress || {};
    const sd = LangyState.streakData || {};
    
    // Weekly events reset on Monday
    const mondayDate = new Date(now);
    mondayDate.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    const weekStart = mondayDate.toISOString().split('T')[0];
    
    // Calculate weekly stats from dailyStats
    let weekLessons = 0, weekWords = 0, weekMinutes = 0, weekGrammar = 0, weekListening = 0, weekPerfect = 0;
    if (sd.dailyStats) {
        Object.entries(sd.dailyStats).forEach(([date, ds]) => {
            if (date >= weekStart) {
                weekLessons += ds.sessions || 0;
                weekWords += ds.words || 0;
                weekMinutes += ds.minutes || 0;
                weekPerfect += (ds.accuracy === 100 ? 1 : 0);
                if (ds.categories) {
                    weekGrammar += ds.categories.grammar || 0;
                    weekListening += ds.categories.listening || 0;
                }
            }
        });
    }
    
    const events = [
        // ─── WEEKLY MARATHON ───
        {
            id: 'vocab_marathon',
            title: 'Vocabulary Marathon',
            desc: 'Learn 50 new words this week',
            type: 'weekly',
            icon: LangyIcons.bookOpen,
            bg: 'linear-gradient(135deg, #F59E0B, #D97706)',
            reward: { dangy: 200, langy: 10 },
            target: 50,
            current: weekWords,
            unit: 'words',
            endsLabel: `Resets ${getDaysUntilMonday()} days`
        },
        {
            id: 'lesson_sprint',
            title: 'Learning Sprint',
            desc: 'Complete 15 lessons this week',
            type: 'weekly',
            icon: LangyIcons.book,
            bg: 'linear-gradient(135deg, #7C6CF6, #9D90F9)',
            reward: { dangy: 150, langy: 5 },
            target: 15,
            current: weekLessons,
            unit: 'lessons',
            endsLabel: `Resets ${getDaysUntilMonday()} days`
        },
        {
            id: 'time_commitment',
            title: 'Dedication Week',
            desc: 'Study for 60 minutes total this week',
            type: 'weekly',
            icon: LangyIcons.clock,
            bg: 'linear-gradient(135deg, #3B82F6, #2563EB)',
            reward: { dangy: 100, langy: 0 },
            target: 60,
            current: weekMinutes,
            unit: 'min',
            endsLabel: `Resets ${getDaysUntilMonday()} days`
        },
        
        // ─── STREAK CHALLENGE ───
        {
            id: 'iron_streak',
            title: 'Iron Will',
            desc: 'Maintain a 7-day streak',
            type: 'ongoing',
            icon: LangyIcons.flame,
            bg: 'linear-gradient(135deg, #EF4444, #DC2626)',
            reward: { dangy: 300, langy: 15 },
            target: 7,
            current: sd.days || 0,
            unit: 'days',
            endsLabel: 'Ongoing'
        },
        
        // ─── SPEED SPRINT (daily mini-game) ───
        {
            id: 'speed_sprint',
            title: 'Speed Sprint',
            desc: 'Answer 15 grammar questions in 90 seconds',
            type: 'minigame',
            icon: LangyIcons.zap,
            bg: 'linear-gradient(135deg, #EC4899, #DB2777)',
            reward: { dangy: 75, langy: 0 },
            target: 15,
            current: ep._sprintBestToday === today ? (ep._sprintBestScore || 0) : 0,
            unit: 'correct',
            endsLabel: 'Play anytime',
            action: 'sprint'
        },
        
        // ─── PERFECTION CHALLENGE ───
        {
            id: 'perfectionist',
            title: 'Perfectionist',
            desc: 'Complete 3 lessons with 100% accuracy this week',
            type: 'weekly',
            icon: LangyIcons.target,
            bg: 'linear-gradient(135deg, #10B981, #059669)',
            reward: { dangy: 250, langy: 20 },
            target: 3,
            current: weekPerfect,
            unit: 'perfect',
            endsLabel: `Resets ${getDaysUntilMonday()} days`
        },
    ];
    
    // Check which events are completed (already claimed)
    if (!LangyState.eventsClaimed) LangyState.eventsClaimed = {};
    events.forEach(e => {
        const claimKey = e.type === 'weekly' ? `${e.id}_${weekStart}` : e.id;
        e.completed = e.current >= e.target;
        e.claimed = !!LangyState.eventsClaimed[claimKey];
        e._claimKey = claimKey;
    });
    
    return events;
}

function getDaysUntilMonday() {
    const now = new Date();
    const day = now.getDay();
    return day === 0 ? 1 : (8 - day);
}

// ─── MAIN RENDER ───
function renderEvents(container) {
    const events = getActiveEvents();
    const completedCount = events.filter(e => e.claimed).length;
    
    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="events-back">${LangyIcons.back}</div>
                <div class="nav-header__title">Events</div>
                <div class="badge badge--accent">${completedCount}/${events.length}</div>
            </div>

            <div style="padding: var(--sp-4) var(--sp-5); text-align:center;">
                <h3 style="display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">${LangyIcons.sparkles} Active Challenges</h3>
                <p class="text-secondary text-sm" style="margin-top:var(--sp-1);">Complete challenges to earn rewards!</p>
            </div>

            <div style="padding:0 var(--sp-4) var(--sp-8); display:flex; flex-direction:column; gap:var(--sp-4);">
                ${events.map(event => renderEventCard(event)).join('')}
            </div>
        </div>
    `;

    container.querySelector('#events-back')?.addEventListener('click', () => Router.navigate('home'));

    // Claim buttons
    container.querySelectorAll('.event-claim-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const event = events.find(e => e.id === id);
            if (!event || event.claimed || !event.completed) return;
            
            // Claim reward
            LangyState.currencies.dangy += event.reward.dangy;
            LangyState.currencies.langy += event.reward.langy;
            LangyState.eventsClaimed[event._claimKey] = true;
            
            if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
            if (typeof AudioUtils !== 'undefined') AudioUtils.playCorrect?.();
            Anim.showToast(`${LangyIcons.gift} +${event.reward.dangy} Dangy${event.reward.langy ? ` +${event.reward.langy} Langy` : ''}!`);
            renderEvents(container);
        });
    });

    // Sprint button
    container.querySelectorAll('.event-sprint-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            startSpeedSprint(container);
        });
    });

    setTimeout(() => Anim.staggerChildren(container, '.event-card-v2'), 80);
}

function renderEventCard(event) {
    const pct = Math.min(100, Math.round((event.current / event.target) * 100));
    const isComplete = event.completed;
    const isClaimed = event.claimed;
    
    return `
        <div class="event-card-v2 ${isClaimed ? 'event-card-v2--claimed' : ''}" style="background:${event.bg};">
            <div class="event-card-v2__header">
                <div class="event-card-v2__icon">${event.icon}</div>
                <div class="event-card-v2__info">
                    <div class="event-card-v2__title">${event.title}</div>
                    <div class="event-card-v2__desc">${event.desc}</div>
                </div>
                <div class="event-card-v2__badge">${event.endsLabel}</div>
            </div>
            <div class="event-card-v2__progress-row">
                <div class="event-card-v2__progress-bar">
                    <div class="event-card-v2__progress-fill" style="width:${pct}%;"></div>
                </div>
                <div class="event-card-v2__progress-text">${event.current}/${event.target} ${event.unit}</div>
            </div>
            <div class="event-card-v2__footer">
                <div class="event-card-v2__reward">
                    ${LangyIcons.diamond} ${event.reward.dangy} Dangy
                    ${event.reward.langy ? `+ ${LangyIcons.coins} ${event.reward.langy} Langy` : ''}
                </div>
                ${isClaimed 
                    ? `<div class="badge badge--accent" style="font-size:var(--fs-xs);">${LangyIcons.check} Claimed</div>`
                    : isComplete
                    ? `<button class="btn btn--sm event-claim-btn" data-id="${event.id}" style="background:white; color:#111; font-weight:700; border:none;">${LangyIcons.gift} Claim!</button>`
                    : event.action === 'sprint'
                    ? `<button class="btn btn--sm event-sprint-btn" style="background:rgba(255,255,255,0.2); color:white; border:1px solid rgba(255,255,255,0.4);">${LangyIcons.zap} Play</button>`
                    : `<div class="badge" style="background:rgba(255,255,255,0.2); color:white; font-size:var(--fs-xs);">${pct}%</div>`
                }
            </div>
        </div>
    `;
}

// ─── SPEED SPRINT MINI-GAME ───
function startSpeedSprint(container) {
    const TOTAL_TIME = 90; // seconds
    const TOTAL_QUESTIONS = 15; // target
    let timeLeft = TOTAL_TIME;
    let score = 0;
    let questionIdx = 0;
    let timerInterval = null;
    
    // Generate sprint questions from ExerciseGenerator
    const questions = generateSprintQuestions(25); // Generate extra
    
    function renderSprintUI() {
        container.innerHTML = `
            <div class="screen screen--no-pad sprint-screen">
                <div class="sprint-header">
                    <div class="sprint-header__left">
                        <div class="sprint-timer" id="sprint-timer">${timeLeft}s</div>
                    </div>
                    <div class="sprint-header__center">
                        <div style="font-weight:var(--fw-bold); font-size:var(--fs-lg);">Speed Sprint</div>
                        <div class="sprint-score-display">${LangyIcons.zap} ${score}/${TOTAL_QUESTIONS} correct</div>
                    </div>
                    <div class="sprint-header__right">
                        <button class="circle-btn sprint-quit" id="sprint-quit">${LangyIcons.x}</button>
                    </div>
                </div>
                
                <div class="sprint-progress">
                    <div class="sprint-progress__fill" style="width:${(score / TOTAL_QUESTIONS) * 100}%;"></div>
                </div>
                
                <div class="sprint-question-area" id="sprint-question"></div>
            </div>
        `;
        
        // Start timer
        const timerEl = container.querySelector('#sprint-timer');
        timerInterval = setInterval(() => {
            timeLeft--;
            if (timerEl) {
                timerEl.textContent = `${timeLeft}s`;
                if (timeLeft <= 10) timerEl.style.color = '#EF4444';
            }
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endSprint();
            }
        }, 1000);
        
        container.querySelector('#sprint-quit')?.addEventListener('click', () => {
            clearInterval(timerInterval);
            endSprint();
        });
        
        showNextQuestion();
    }
    
    function showNextQuestion() {
        if (questionIdx >= questions.length || score >= TOTAL_QUESTIONS) {
            clearInterval(timerInterval);
            endSprint();
            return;
        }
        
        const q = questions[questionIdx];
        const area = container.querySelector('#sprint-question');
        if (!area) return;
        
        area.innerHTML = `
            <div class="sprint-card animate-in">
                <div class="sprint-card__prompt">${q.prompt}</div>
                <div class="sprint-card__options">
                    ${q.options.map((opt, i) => `
                        <button class="sprint-option" data-idx="${i}">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
        
        area.querySelectorAll('.sprint-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                const correct = idx === q.correct;
                
                btn.classList.add(correct ? 'sprint-option--correct' : 'sprint-option--wrong');
                if (!correct) {
                    const rightBtn = area.querySelector(`.sprint-option[data-idx="${q.correct}"]`);
                    if (rightBtn) rightBtn.classList.add('sprint-option--correct');
                }
                
                if (correct) {
                    score++;
                    // Update score display
                    const scoreEl = container.querySelector('.sprint-score-display');
                    if (scoreEl) scoreEl.innerHTML = `${LangyIcons.zap} ${score}/${TOTAL_QUESTIONS} correct`;
                    const fillEl = container.querySelector('.sprint-progress__fill');
                    if (fillEl) fillEl.style.width = `${(score / TOTAL_QUESTIONS) * 100}%`;
                }
                
                // Disable all options
                area.querySelectorAll('.sprint-option').forEach(b => b.disabled = true);
                
                questionIdx++;
                setTimeout(showNextQuestion, 600);
            });
        });
    }
    
    function endSprint() {
        const today = new Date().toISOString().split('T')[0];
        if (!LangyState.eventProgress) LangyState.eventProgress = {};
        const ep = LangyState.eventProgress;
        
        // Save best score
        if (!ep._sprintBestToday || ep._sprintBestToday !== today || score > (ep._sprintBestScore || 0)) {
            ep._sprintBestToday = today;
            ep._sprintBestScore = score;
        }
        
        // Award XP
        const xpEarned = score * 10;
        const oldXp = LangyState.user.xp;
        LangyState.user.xp += xpEarned;
        LangyState.currencies.dangy += score * 3;
        if (typeof checkLevelUp === 'function') checkLevelUp(oldXp, LangyState.user.xp);
        if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
        
        const passed = score >= TOTAL_QUESTIONS;
        const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
        
        container.innerHTML = `
            <div class="screen screen--no-pad">
                <div style="
                    min-height:100vh; display:flex; flex-direction:column;
                    align-items:center; justify-content:center; padding:var(--sp-8);
                    background:${passed 
                        ? 'linear-gradient(135deg, rgba(16,185,129,0.05), rgba(5,150,105,0.05))' 
                        : 'linear-gradient(135deg, rgba(239,68,68,0.05), rgba(220,38,38,0.05))'};
                    text-align:center;
                ">
                    <div style="font-size:64px; margin-bottom:var(--sp-4);">${passed ? LangyIcons.trophy : LangyIcons.target}</div>
                    <h2>${passed ? 'Sprint Complete!' : 'Time\'s Up!'}</h2>
                    <p class="text-secondary" style="margin-top:var(--sp-2);">
                        ${passed ? 'You nailed every question!' : `You answered ${score}/${TOTAL_QUESTIONS} correctly`}
                    </p>
                    
                    <div style="display:flex; gap:var(--sp-6); margin:var(--sp-6) 0;">
                        <div class="stat">
                            <div class="stat__value" style="color:var(--primary);">${score}/${TOTAL_QUESTIONS}</div>
                            <div class="stat__label">Correct</div>
                        </div>
                        <div class="stat">
                            <div class="stat__value" style="color:var(--accent-dark);">${TOTAL_TIME - timeLeft}s</div>
                            <div class="stat__label">Time used</div>
                        </div>
                        <div class="stat">
                            <div class="stat__value" style="color:#F59E0B;">+${xpEarned}</div>
                            <div class="stat__label">XP</div>
                        </div>
                    </div>
                    
                    <button class="btn btn--primary btn--xl btn--full" id="sprint-back" style="max-width:300px;">${LangyIcons.back} Back to Events</button>
                    <button class="btn btn--ghost btn--full" id="sprint-retry" style="max-width:300px; margin-top:var(--sp-2);">${LangyIcons.refresh} Try Again</button>
                </div>
            </div>
        `;
        
        container.querySelector('#sprint-back')?.addEventListener('click', () => renderEvents(container));
        container.querySelector('#sprint-retry')?.addEventListener('click', () => startSpeedSprint(container));
    }
    
    renderSprintUI();
}

// Generate grammar questions for sprint
function generateSprintQuestions(count) {
    const templates = [
        { prompt: 'She ___ to school every day.', options: ['goes', 'go', 'going', 'gone'], correct: 0 },
        { prompt: 'They ___ watching TV now.', options: ['is', 'are', 'am', 'be'], correct: 1 },
        { prompt: 'I ___ never been to Paris.', options: ['has', 'have', 'had', 'having'], correct: 1 },
        { prompt: 'He ___ his homework yesterday.', options: ['do', 'does', 'did', 'done'], correct: 2 },
        { prompt: 'If I ___ rich, I would travel.', options: ['am', 'was', 'were', 'be'], correct: 2 },
        { prompt: 'The book ___ on the table.', options: ['are', 'is', 'am', 'be'], correct: 1 },
        { prompt: 'We ___ dinner at 7 PM last night.', options: ['have', 'has', 'had', 'having'], correct: 2 },
        { prompt: 'She ___ English for 5 years.', options: ['studies', 'studied', 'has studied', 'study'], correct: 2 },
        { prompt: 'Choose the synonym of "happy":', options: ['Sad', 'Joyful', 'Angry', 'Tired'], correct: 1 },
        { prompt: 'Which word is spelled correctly?', options: ['Recieve', 'Receive', 'Receve', 'Receeve'], correct: 1 },
        { prompt: 'The opposite of "expensive" is:', options: ['dear', 'cheap', 'costly', 'pricey'], correct: 1 },
        { prompt: 'I wish I ___ fly.', options: ['can', 'could', 'will', 'would'], correct: 1 },
        { prompt: 'By next year, I ___ graduated.', options: ['will have', 'will had', 'would have', 'has'], correct: 0 },
        { prompt: 'She asked me where I ___.', options: ['live', 'lived', 'living', 'lives'], correct: 1 },
        { prompt: '___ you ever eaten sushi?', options: ['Did', 'Have', 'Has', 'Do'], correct: 1 },
        { prompt: 'Neither Tom ___ Jerry came.', options: ['or', 'and', 'nor', 'but'], correct: 2 },
        { prompt: 'He runs ___ than me.', options: ['fast', 'faster', 'fastest', 'more fast'], correct: 1 },
        { prompt: 'I ___ to the gym three times a week.', options: ['goes', 'going', 'go', 'gone'], correct: 2 },
        { prompt: 'She ___ a doctor since 2020.', options: ['is', 'was', 'has been', 'have been'], correct: 2 },
        { prompt: 'We ___ leave now or we\'ll be late.', options: ['should', 'could', 'would', 'might'], correct: 0 },
        { prompt: 'The car ___ by the mechanic.', options: ['fixed', 'was fixed', 'is fix', 'fixing'], correct: 1 },
        { prompt: 'I don\'t have ___ money left.', options: ['some', 'any', 'many', 'few'], correct: 1 },
        { prompt: 'She plays piano ___ than her sister.', options: ['good', 'better', 'best', 'more good'], correct: 1 },
        { prompt: 'They ___ married for 10 years.', options: ['are', 'were', 'have been', 'has been'], correct: 2 },
        { prompt: 'I\'d rather you ___ smoke here.', options: ['don\'t', 'didn\'t', 'won\'t', 'haven\'t'], correct: 1 },
    ];
    
    // Shuffle and return
    return templates.sort(() => Math.random() - 0.5).slice(0, count);
}

Router.register('events', renderEvents);

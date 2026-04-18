/* ============================================
   SCREEN: DAILY CHALLENGE — Real Progress
   Tasks tied to actual learning activities
   ============================================ */

function renderDaily(container) {
    const { progress, streakData } = LangyState;

    // Generate daily tasks dynamically based on real progress
    const today = new Date().toISOString().split('T')[0];
    if (!LangyState.dailyChallenge) LangyState.dailyChallenge = {};
    if (LangyState.dailyChallenge._generatedDate !== today) {
        LangyState.dailyChallenge._generatedDate = today;
        LangyState.dailyChallenge._rewardClaimed = false;
    }

    LangyState.dailyChallenge.tasks = generateDailyTasks();
    LangyState.dailyChallenge.timeLeft = getSecondsUntilMidnight();

    let timeLeft = LangyState.dailyChallenge.timeLeft;
    const tasks = LangyState.dailyChallenge.tasks;
    const completedCount = tasks.filter(t => t.done).length;
    const totalTasks = tasks.length;
    const allDone = completedCount === totalTasks;

    // Award bonus automatically if all done
    if (allDone && !LangyState.dailyChallenge._rewardClaimed) {
        LangyState.dailyChallenge._rewardClaimed = true;
        const reward = LangyState.dailyChallenge.reward || 50;
        LangyState.currencies.dangy += reward;
        if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
        setTimeout(() => {
            if (typeof Anim !== 'undefined') Anim.showToast(`${LangyIcons.gift} Challenge Complete! +${reward} Dangy!`);
        }, 800);
    }

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    container.innerHTML = `
        <div class="screen screen--no-pad daily">
            <div class="nav-header">
                <div class="nav-header__back" id="daily-back">${LangyIcons.back}</div>
                <div class="nav-header__title">${i18n('daily.title')}</div>
                <div style="width:36px;"></div>
            </div>

            <div class="daily__hero">
                <div class="daily__timer-ring">
                    <div class="daily__timer-text" id="daily-timer">${formatTime(timeLeft)}</div>
                </div>

                <div>
                    <h3 style="display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">${allDone ? LangyIcons.sparkles + ' ' + i18n('daily.all_done') : i18n('daily.mission')}</h3>
                    <p class="text-secondary text-sm" style="margin-top:var(--sp-1);">
                        ${allDone ? i18n('daily.come_back') : i18n('daily.complete_all')}
                    </p>
                </div>

                <div class="daily__reward ${allDone ? 'daily__reward--earned' : ''}">
                    <span>${LangyIcons.gift}</span>
                    <span>+${LangyState.dailyChallenge.reward || 50} Dangy</span>
                    ${allDone ? `<span style="color:var(--accent-dark); font-weight:bold; display:flex; align-items:center; gap:4px;">${LangyIcons.check} Earned!</span>` : ''}
                </div>

                <div style="width:100%; max-width:240px;">
                    <div style="display:flex; justify-content:space-between; font-size:var(--fs-xs); margin-bottom:var(--sp-1);">
                        <span>${completedCount}/${totalTasks} completed</span>
                        <span>${Math.round(completedCount / totalTasks * 100)}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress__fill" style="width:${(completedCount / totalTasks) * 100}%;"></div>
                    </div>
                </div>
            </div>

            <div class="daily__tasks" id="daily-tasks">
                ${tasks.map((task, i) => `
                    <div class="daily-task ${task.done ? 'daily-task--done' : ''}" data-index="${i}">
                        <div class="daily-task__check ${task.done ? 'daily-task__check--done' : ''}">
                            <div class="dc-task__status">${task.done ? LangyIcons.check : ''}</div>
                        </div>
                        <div class="daily-task__info">
                            <div class="daily-task__title">${task.icon} ${task.title}</div>
                            <div class="daily-task__desc">${task.desc}</div>
                            ${task.progressText ? `<div class="daily-task__progress">${task.progressText}</div>` : ''}
                        </div>
                        ${!task.done ? `<button class="btn btn--primary btn--sm daily-task-start" data-action="${task.action || 'start'}">${task.actionLabel || 'Start'}</button>` : `<span class="badge badge--accent">Done!</span>`}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Timer countdown
    const timerEl = container.querySelector('#daily-timer');
    const timerInterval = setInterval(() => {
        timeLeft--;
        LangyState.dailyChallenge.timeLeft = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerEl.textContent = '00:00:00';
            return;
        }
        if (timerEl) timerEl.textContent = formatTime(timeLeft);
    }, 1000);

    // Clean up timer on navigation
    const observer = new MutationObserver(() => {
        if (!document.contains(timerEl)) {
            clearInterval(timerInterval);
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Task actions
    container.querySelectorAll('.daily-task-start').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            clearInterval(timerInterval);
            
            if (action === 'lesson') {
                Router.navigate('learning');
            } else if (action === 'homework') {
                Router.navigate('homework');
            } else {
                Router.navigate('home');
            }
        });
    });

    container.querySelector('#daily-back')?.addEventListener('click', () => {
        clearInterval(timerInterval);
        Router.navigate('home');
    });

    setTimeout(() => Anim.staggerChildren(container, '.daily-task'), 80);
}

// ─── Generate daily tasks based on actual progress ───
function generateDailyTasks() {
    const today = new Date().toISOString().split('T')[0];
    const ds = LangyState.streakData?.dailyStats?.[today] || { sessions: 0, words: 0, minutes: 0 };
    const perfectLessonDate = LangyState.dailyChallenge?._perfectLessonDate;

    const sessions = ds.sessions || 0;
    const words = ds.words || 0;
    const minutes = ds.minutes || 0;
    const perfectDone = perfectLessonDate === today;

    const tasks = [
        {
            id: 1, title: 'Focus: Complete Lessons', 
            desc: 'Finish 2 language lessons',
            done: sessions >= 2,
            icon: LangyIcons.book, action: 'lesson', actionLabel: 'Study',
            progressText: `${Math.min(sessions, 2)}/2 lessons`
        },
        {
            id: 2, title: 'Vocabulary Expansion',
            desc: 'Learn 10 new words',
            done: words >= 10, 
            icon: LangyIcons.bookOpen, action: 'lesson', actionLabel: 'Learn',
            progressText: `${Math.min(words, 10)}/10 words`
        },
        {
            id: 3, title: 'Commitment',
            desc: 'Study for 15 minutes today',
            done: minutes >= 15, 
            icon: LangyIcons.hourglass, action: 'lesson', actionLabel: 'Practice',
            progressText: `${Math.min(minutes, 15)}/15 mins`
        },
        {
            id: 4, title: 'Mastery: Perfect Lesson',
            desc: 'Complete a lesson with 100% accuracy',
            done: perfectDone,
            icon: LangyIcons.target, action: 'lesson', actionLabel: 'Try',
            progressText: perfectDone ? '1/1 perfect' : '0/1 perfect'
        }
    ];

    return tasks;
}

function getSecondsUntilMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
}

Router.register('daily', renderDaily);

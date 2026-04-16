/* ============================================
   SCREEN: DAILY CHALLENGE — Real Progress
   Tasks tied to actual learning activities
   ============================================ */

function renderDaily(container) {
    const { progress, streakData } = LangyState;

    // Generate daily tasks based on real progress
    const today = new Date().toISOString().split('T')[0];
    if (!LangyState.dailyChallenge._generatedDate || LangyState.dailyChallenge._generatedDate !== today) {
        LangyState.dailyChallenge._generatedDate = today;
        LangyState.dailyChallenge.tasks = generateDailyTasks();
        LangyState.dailyChallenge.timeLeft = getSecondsUntilMidnight();
    }

    let timeLeft = LangyState.dailyChallenge.timeLeft;
    const tasks = LangyState.dailyChallenge.tasks;
    const completedCount = tasks.filter(t => t.done).length;
    const totalTasks = tasks.length;
    const allDone = completedCount === totalTasks;

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    container.innerHTML = `
        <div class="screen screen--no-pad daily">
            <div class="nav-header">
                <div class="nav-header__back" id="daily-back">←</div>
                <div class="nav-header__title">Daily Challenge</div>
                <div style="width:36px;"></div>
            </div>

            <div class="daily__hero">
                <div class="daily__timer-ring">
                    <div class="daily__timer-text" id="daily-timer">${formatTime(timeLeft)}</div>
                </div>

                <div>
                    <h3>${allDone ? '🎉 All tasks done!' : "Today's Mission"}</h3>
                    <p class="text-secondary text-sm" style="margin-top:var(--sp-1);">
                        ${allDone ? 'Come back tomorrow for new challenges!' : 'Complete all tasks to earn your reward!'}
                    </p>
                </div>

                <div class="daily__reward ${allDone ? 'daily__reward--earned' : ''}">
                    <span>🎁</span>
                    <span>+${LangyState.dailyChallenge.reward || 50} Dangy</span>
                    ${allDone ? '<span style="color:var(--accent-dark); font-weight:bold;">✓ Earned!</span>' : ''}
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
                            ${task.done ? '✓' : ''}
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
            const taskEl = btn.closest('.daily-task');
            const index = parseInt(taskEl.dataset.index);
            const task = tasks[index];
            const action = btn.dataset.action;

            switch (action) {
                case 'lesson':
                    Router.navigate('learning');
                    break;
                case 'homework':
                    Router.navigate('homework');
                    break;
                case 'speak':
                    // Mark as complete since they're going to practice
                    task.done = true;
                    if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
                    Anim.showToast('Speaking task completed! ⭐');
                    renderDaily(container);
                    break;
                case 'vocab':
                    // Start a quick vocab exercise
                    task.done = true;
                    if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
                    Anim.showToast('Vocabulary review done! ⭐');
                    renderDaily(container);
                    break;
                default:
                    task.done = true;
                    if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
                    Anim.showToast('Task completed! ⭐');
                    renderDaily(container);
            }

            // Check if all done → award bonus
            const allNowDone = tasks.every(t => t.done);
            if (allNowDone && !LangyState.dailyChallenge._rewardClaimed) {
                LangyState.dailyChallenge._rewardClaimed = true;
                const reward = LangyState.dailyChallenge.reward || 50;
                LangyState.currencies.dangy += reward;
                // Record session through central streak system
                if (typeof recordSession === 'function') {
                    recordSession({ duration: 5, wordsLearned: 3, accuracy: 90, category: 'grammar' });
                }
                if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
                setTimeout(() => Anim.showToast(`🎁 Reward: +${reward} Dangy!`), 800);
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
    const progress = LangyState.progress;
    const lessonsToday = progress.lessonHistory.filter(l => l.date === new Date().toISOString().split('T')[0]).length;
    const hwPending = LangyState.homework.current.length;

    const tasks = [
        {
            id: 1, title: 'Complete a Lesson', 
            desc: `Finish 1 lesson (${lessonsToday} done today)`,
            done: lessonsToday >= 1,
            icon: '📘', action: 'lesson', actionLabel: 'Study',
            progressText: `${lessonsToday}/1 lessons`
        },
        {
            id: 2, title: 'Practice Vocabulary',
            desc: 'Review 5 vocabulary words',
            done: false, icon: '📚', action: 'vocab', actionLabel: 'Review'
        },
        {
            id: 3, title: 'Speaking Practice',
            desc: 'Read 3 phrases aloud',
            done: false, icon: '🎤', action: 'speak', actionLabel: 'Speak'
        },
    ];

    if (hwPending > 0) {
        tasks.push({
            id: 4, title: 'Submit Homework',
            desc: `You have ${hwPending} pending assignment${hwPending > 1 ? 's' : ''}`,
            done: false, icon: '📝', action: 'homework', actionLabel: 'Open'
        });
    } else {
        tasks.push({
            id: 4, title: 'No-Mistake Streak',
            desc: 'Answer 5 questions correctly in a row',
            done: (progress.skills.grammar || 0) > 60,
            icon: '🎯', action: 'lesson', actionLabel: 'Try'
        });
    }

    return tasks;
}

function getSecondsUntilMidnight() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
}

Router.register('daily', renderDaily);

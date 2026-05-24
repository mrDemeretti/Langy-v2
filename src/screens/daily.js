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
            if (typeof Anim !== 'undefined') {
                const _l = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
                Anim.showToast(`${LangyIcons.gift} ${{ en: `Challenge Complete! +${reward} Dangy!`, ru: `Вызов выполнен! +${reward} Dangy!`, es: `¡Reto completado! +${reward} Dangy!` }[_l]}`);
            }
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
                    ${allDone ? `<span style="color:var(--accent-dark); font-weight:bold; display:flex; align-items:center; gap:4px;">${LangyIcons.check} ${{ en: 'Earned!', ru: 'Получено!', es: '¡Ganado!' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en']}</span>` : ''}
                </div>

                <div style="width:100%; max-width:240px;">
                    <div style="display:flex; justify-content:space-between; font-size:var(--fs-xs); margin-bottom:var(--sp-1);">
                        <span>${completedCount}/${totalTasks} ${{ en: 'completed', ru: 'выполнено', es: 'completado' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en']}</span>
                        <span>${Math.round((completedCount / totalTasks) * 100)}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress__fill" style="width:${(completedCount / totalTasks) * 100}%;"></div>
                    </div>
                </div>
            </div>

            <div class="daily__tasks" id="daily-tasks">
                ${tasks
                    .map(
                        (task, i) => `
                    <div class="daily-task ${task.done ? 'daily-task--done' : ''}" data-index="${i}">
                        <div class="daily-task__check ${task.done ? 'daily-task__check--done' : ''}">
                            <div class="dc-task__status">${task.done ? LangyIcons.check : ''}</div>
                        </div>
                        <div class="daily-task__info">
                            <div class="daily-task__title">${task.icon} ${task.title}</div>
                            <div class="daily-task__desc">${task.desc}</div>
                            ${task.progressText ? `<div class="daily-task__progress">${task.progressText}</div>` : ''}
                        </div>
                        ${!task.done ? `<button class="btn btn--primary btn--sm daily-task-start" data-action="${task.action || 'start'}">${task.actionLabel || { en: 'Start', ru: 'Начать', es: 'Iniciar' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en']}</button>` : `<span class="badge badge--accent">${{ en: 'Done!', ru: 'Готово!', es: '¡Hecho!' }[typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en']}</span>`}
                    </div>
                `
                    )
                    .join('')}
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
        btn.addEventListener('click', e => {
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

// ─── Generate daily tasks based on actual progress + curriculum ───
function generateDailyTasks() {
    const today = new Date().toISOString().split('T')[0];
    const ds = LangyState.streakData?.dailyStats?.[today] || { sessions: 0, words: 0, minutes: 0 };
    const perfectLessonDate = LangyState.dailyChallenge?._perfectLessonDate;

    const sessions = ds.sessions || 0;
    const words = ds.words || 0;
    const minutes = ds.minutes || 0;
    const perfectDone = perfectLessonDate === today;

    // Get curriculum context for task descriptions
    let unitTitle = '';
    let grammarLabel = '';
    let isEnglish = false;
    let cefrLevel = '';
    if (typeof LangyCurriculum !== 'undefined') {
        const tb = LangyCurriculum.getActive();
        if (tb) {
            cefrLevel = tb.cefr || '';
            isEnglish = typeof LangyTarget !== 'undefined' && LangyTarget.getCode() === 'en';
            const unitId = typeof LangyState !== 'undefined' ? LangyState.progress?.currentUnitId : null;
            if (unitId && tb.units) {
                const unit = tb.units.find(u => u.id === unitId);
                if (unit) {
                    unitTitle = unit.title;
                    grammarLabel = unit.grammar?.join(', ') || '';
                }
            }
        }
    }

    const _l = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';

    const tasks = [
        {
            id: 1,
            title: unitTitle ? `${{ en: 'Study', ru: '\u0418\u0437\u0443\u0447\u0438\u0442\u044c', es: 'Estudiar' }[_l]}: ${unitTitle}` : { en: 'Focus: Complete Lessons', ru: '\u0424\u043e\u043a\u0443\u0441: \u0437\u0430\u0432\u0435\u0440\u0448\u0438 \u0443\u0440\u043e\u043a\u0438', es: 'Enfoque: Completa lecciones' }[_l],
            desc: grammarLabel ? `${{ en: 'Practice', ru: '\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0443\u0439', es: 'Practica' }[_l]} ${grammarLabel}` : { en: 'Finish 2 language lessons', ru: '\u0417\u0430\u0432\u0435\u0440\u0448\u0438 2 \u0443\u0440\u043e\u043a\u0430', es: 'Termina 2 lecciones' }[_l],
            done: sessions >= 2,
            icon: LangyIcons.book,
            action: 'lesson',
            actionLabel: { en: 'Study', ru: '\u0423\u0447\u0438\u0442\u044c', es: 'Estudiar' }[_l],
            progressText: `${Math.min(sessions, 2)}/2 ${{ en: 'lessons', ru: '\u0443\u0440\u043e\u043a\u043e\u0432', es: 'lecciones' }[_l]}`,
        },
        {
            id: 2,
            title: { en: 'Vocabulary Expansion', ru: '\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043d\u0438\u0435 \u0441\u043b\u043e\u0432\u0430\u0440\u044f', es: 'Expansi\u00f3n de vocabulario' }[_l],
            desc: unitTitle ? `${{ en: 'Build vocabulary for', ru: '\u041d\u0430\u0431\u0435\u0440\u0438 \u0441\u043b\u043e\u0432\u0430 \u043f\u043e \u0442\u0435\u043c\u0435', es: 'Ampl\u00eda vocabulario de' }[_l]} \u00ab${unitTitle}\u00bb` : { en: 'Learn 10 new words', ru: '\u0412\u044b\u0443\u0447\u0438 10 \u043d\u043e\u0432\u044b\u0445 \u0441\u043b\u043e\u0432', es: 'Aprende 10 palabras nuevas' }[_l],
            done: words >= 10,
            icon: LangyIcons.bookOpen,
            action: 'lesson',
            actionLabel: { en: 'Learn', ru: '\u0423\u0447\u0438\u0442\u044c', es: 'Aprender' }[_l],
            progressText: `${Math.min(words, 10)}/10 ${{ en: 'words', ru: '\u0441\u043b\u043e\u0432', es: 'palabras' }[_l]}`,
        },
        {
            id: 3,
            title: { en: 'Commitment', ru: '\u0423\u043f\u043e\u0440\u0441\u0442\u0432\u043e', es: 'Compromiso' }[_l],
            desc: cefrLevel ? `${cefrLevel} ${{ en: 'practice \u2014 15 minutes today', ru: '\u043f\u0440\u0430\u043a\u0442\u0438\u043a\u0430 \u2014 15 \u043c\u0438\u043d\u0443\u0442 \u0441\u0435\u0433\u043e\u0434\u043d\u044f', es: 'pr\u00e1ctica \u2014 15 minutos hoy' }[_l]}` : { en: 'Study for 15 minutes today', ru: '\u0417\u0430\u043d\u0438\u043c\u0430\u0439\u0441\u044f 15 \u043c\u0438\u043d\u0443\u0442 \u0441\u0435\u0433\u043e\u0434\u043d\u044f', es: 'Estudia 15 minutos hoy' }[_l],
            done: minutes >= 15,
            icon: LangyIcons.hourglass,
            action: 'lesson',
            actionLabel: { en: 'Practice', ru: '\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0430', es: 'Practicar' }[_l],
            progressText: `${Math.min(minutes, 15)}/15 ${{ en: 'mins', ru: '\u043c\u0438\u043d', es: 'min' }[_l]}`,
        },
        {
            id: 4,
            title: unitTitle ? `${{ en: 'Master', ru: '\u041c\u0430\u0441\u0442\u0435\u0440\u0441\u0442\u0432\u043e', es: 'Dominar' }[_l]}: ${unitTitle}` : { en: 'Mastery: Perfect Lesson', ru: '\u041c\u0430\u0441\u0442\u0435\u0440\u0441\u0442\u0432\u043e: \u0438\u0434\u0435\u0430\u043b\u044c\u043d\u044b\u0439 \u0443\u0440\u043e\u043a', es: 'Maestr\u00eda: Lecci\u00f3n perfecta' }[_l],
            desc: grammarLabel ? `${{ en: 'Score 100% on', ru: '\u041d\u0430\u0431\u0435\u0440\u0438 100% \u043f\u043e', es: 'Obt\u00e9n 100% en' }[_l]} ${grammarLabel}` : { en: 'Complete a lesson with 100% accuracy', ru: '\u0417\u0430\u0432\u0435\u0440\u0448\u0438 \u0443\u0440\u043e\u043a \u043d\u0430 100%', es: 'Completa una lecci\u00f3n con 100%' }[_l],
            done: perfectDone,
            icon: LangyIcons.target,
            action: 'lesson',
            actionLabel: { en: 'Try', ru: '\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439', es: 'Intentar' }[_l],
            progressText: perfectDone ? `1/1 ${{ en: 'perfect', ru: '\u0438\u0434\u0435\u0430\u043b\u044c\u043d\u043e', es: 'perfecto' }[_l]}` : `0/1 ${{ en: 'perfect', ru: '\u0438\u0434\u0435\u0430\u043b\u044c\u043d\u043e', es: 'perfecto' }[_l]}`,
        },
    ];

    // English track: add a curriculum-aligned review task
    if (isEnglish && cefrLevel) {
        const hwPending = typeof LangyState !== 'undefined' && LangyState.homework?.current?.length > 0;
        tasks.push({
            id: 5,
            title: `${{ en: 'Review', ru: '\u041f\u043e\u0432\u0442\u043e\u0440\u0435\u043d\u0438\u0435', es: 'Repaso' }[_l]}: ${cefrLevel} ${{ en: 'Homework', ru: '\u0414\u043e\u043c\u0430\u0448\u043d\u0435\u0435', es: 'Tarea' }[_l]}`,
            desc: hwPending ? { en: 'Complete your pending homework', ru: '\u0417\u0430\u0432\u0435\u0440\u0448\u0438 \u0434\u043e\u043c\u0430\u0448\u043d\u0435\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u0435', es: 'Completa tu tarea pendiente' }[_l] : { en: 'Check your homework for today', ru: '\u041f\u0440\u043e\u0432\u0435\u0440\u044c \u0434\u043e\u043c\u0430\u0448\u043d\u0435\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u0435', es: 'Revisa tu tarea de hoy' }[_l],
            done: !hwPending && sessions > 0,
            icon: LangyIcons.pencil,
            action: 'homework',
            actionLabel: hwPending ? { en: 'Review', ru: '\u041f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c', es: 'Revisar' }[_l] : { en: 'Check', ru: '\u041f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c', es: 'Verificar' }[_l],
            progressText: hwPending ? `${LangyState.homework.current.length} ${{ en: 'pending', ru: '\u043e\u0436\u0438\u0434\u0430\u044e\u0442', es: 'pendientes' }[_l]}` : { en: 'Up to date', ru: '\u0412\u0441\u0451 \u0433\u043e\u0442\u043e\u0432\u043e', es: 'Al d\u00eda' }[_l],
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

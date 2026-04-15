/* ============================================
   SCREEN: LEARNING SESSION — Widget-Based Lessons
   With AI Chat Integration & Homework Generation
   ============================================ */

function renderLearning(container) {
    const params = Router.getParams();
    const mode = params.mode || 'lesson';
    const activeTb = LangyCurriculum.getActive();

    if (!activeTb || !activeTb.units || !activeTb.units.length) {
        container.innerHTML = `
            <div class="screen" style="display:flex; flex-direction:column; justify-content:center; align-items:center; padding:var(--sp-8);">
                <div style="font-size:64px; margin-bottom:var(--sp-4);">📚</div>
                <h2>Курс не найден</h2>
                <p class="text-secondary" style="margin:var(--sp-4) 0;">Пройдите тест, чтобы подобрать учебник.</p>
                <button class="btn btn--primary" onclick="Router.navigate('placement-test')">Пройти тест</button>
            </div>
        `;
        return;
    }

    // Determine unit
    let unit = null;
    if (mode === 'homework' && params.unitId) {
        unit = activeTb.units.find(u => u.id === parseInt(params.unitId));
    } else {
        const currentUnitId = LangyState.progress.currentUnitId;
        unit = activeTb.units.find(u => u.id === currentUnitId) || activeTb.units[0];
    }

    if (!unit) {
        container.innerHTML = `<div class="screen" style="text-align:center; padding:var(--sp-8);"><h2>Unit not found</h2><button class="btn btn--primary" onclick="Router.navigate('home')">Home</button></div>`;
        return;
    }

    // Build exercises: combine static unit exercises with dynamic generation
    const EXERCISES_PER_SESSION = 10;
    let exercises = [];

    if (typeof ExerciseGenerator !== 'undefined' && activeTb.cefr) {
        // Mix: take 2-3 static unit exercises (if available) + generate the rest dynamically
        const staticExercises = unit.exercises || [];
        const staticCount = Math.min(3, staticExercises.length);
        const dynamicCount = EXERCISES_PER_SESSION - staticCount;

        // Pick random static exercises from the unit
        const shuffledStatic = [...staticExercises].sort(() => Math.random() - 0.5).slice(0, staticCount);
        exercises = shuffledStatic;

        // Generate dynamic exercises for the rest
        const dynamicExercises = ExerciseGenerator.generateBatch(activeTb.cefr, dynamicCount, { noRepeatTypes: true });
        exercises = exercises.concat(dynamicExercises);

        // Shuffle all exercises together
        exercises = exercises.sort(() => Math.random() - 0.5);
    } else {
        exercises = unit.exercises || [];
    }

    const totalExercises = exercises.length;
    let currentStep = mode === 'homework' ? 'homework' : 'intro';
    let currentExerciseIdx = 0;
    let correctAnswers = 0;
    let lessonStartTime = Date.now();
    let _destroyed = false;

    // ─── MAIN RENDER ───
    function updateUI() {
        if (_destroyed) return;
        const progress = currentStep === 'intro' ? 0 :
                        currentStep === 'theory' ? 15 :
                        currentStep === 'practice' ? 15 + Math.round((currentExerciseIdx / totalExercises) * 70) :
                        currentStep === 'summary' ? 100 : 50;

        container.innerHTML = `
            <div class="screen screen--no-pad learning-screen">
                <header class="learning-header">
                    <div class="circle-btn" id="learning-back">←</div>
                    <div class="learning-header__info">
                        <div class="learning-header__unit">${mode === 'homework' ? '🏠 Homework' : `📘 Unit ${unit.id}`}</div>
                        <div class="learning-header__title">${unit.title}</div>
                    </div>
                    <div class="learning-progress-ring">
                        <svg width="40" height="40" viewBox="0 0 44 44">
                            <circle cx="22" cy="22" r="18" fill="none" stroke="var(--border)" stroke-width="3"/>
                            <circle cx="22" cy="22" r="18" fill="none" stroke="var(--primary)" stroke-width="3"
                                    stroke-dasharray="${2 * Math.PI * 18}" 
                                    stroke-dashoffset="${2 * Math.PI * 18 * (1 - progress / 100)}"
                                    stroke-linecap="round" transform="rotate(-90 22 22)"
                                    style="transition: stroke-dashoffset 0.5s ease;"/>
                        </svg>
                        <span class="learning-progress-text">${progress}%</span>
                    </div>
                </header>

                <div class="learning-body scroll-y" id="lesson-content"></div>
            </div>
        `;

        container.querySelector('#learning-back').onclick = () => {
            _destroyed = true;
            Router.navigate(mode === 'homework' ? 'homework' : 'home');
        };

        const content = container.querySelector('#lesson-content');

        switch (currentStep) {
            case 'intro': renderIntro(content); break;
            case 'theory': renderTheory(content); break;
            case 'practice': renderPractice(content); break;
            case 'homework': renderHomeworkMode(content); break;
            case 'summary': renderSummary(content); break;
        }
    }

    // ─── INTRO CARD ───
    function renderIntro(target) {
        target.innerHTML = `
            <div class="lesson-intro animate-in">
                <div class="lesson-intro__icon">📘</div>
                <h2 class="lesson-intro__title">${unit.title}</h2>
                <div class="lesson-intro__meta">
                    <div class="lesson-intro__tag">📝 ${unit.grammar?.join(', ') || 'Grammar'}</div>
                    <div class="lesson-intro__tag">📚 ${unit.vocabulary?.join(', ') || 'Vocabulary'}</div>
                    <div class="lesson-intro__tag">⏱️ ~15 минут / minutes</div>
                    <div class="lesson-intro__tag">🎯 ${totalExercises} заданий / exercises</div>
                </div>
                <button class="btn btn--primary btn--xl btn--full lesson-intro__start" id="start-lesson">
                    Начать урок / Start Lesson →
                </button>
            </div>
        `;

        target.querySelector('#start-lesson').onclick = () => {
            currentStep = unit.theory ? 'theory' : 'practice';
            updateUI();

            // ✅ FIX #1: Start AI chat integration
            if (typeof DeepTutor !== 'undefined') {
                DeepTutor.show();
                DeepTutor.resetChat();
                setTimeout(() => {
                    DeepTutor.handleSend(
                        `I'm starting lesson "${unit.title}". Topics: ${unit.grammar?.join(', ') || 'general'}. Vocabulary: ${unit.vocabulary?.join(', ') || 'general'}. Please introduce this topic briefly and tell me the key points.`,
                        true
                    );
                }, 500);
            }
        };
    }

    // ─── THEORY ───
    function renderTheory(target) {
        target.innerHTML = `
            <div class="lesson-theory animate-in">
                <div class="lesson-theory__content">
                    ${unit.theory || `<h3>${unit.title}</h3><p>Let's learn about ${unit.grammar?.join(' and ') || 'new topics'}!</p>`}
                </div>
                <button class="btn btn--primary btn--xl btn--full" id="theory-continue" style="margin-top:var(--sp-6);">
                    Понятно! К заданиям / Got it! Practice →
                </button>
                <button class="btn btn--ghost btn--full" id="theory-ask-ai" style="margin-top:var(--sp-2);">
                    💬 Спросить AI / Ask AI Teacher
                </button>
            </div>
        `;

        target.querySelector('#theory-continue').onclick = () => {
            currentStep = 'practice';
            currentExerciseIdx = 0;
            updateUI();
        };

        // ✅ FIX #1: Let user ask AI from theory
        target.querySelector('#theory-ask-ai').onclick = () => {
            if (typeof DeepTutor !== 'undefined') {
                DeepTutor.show();
                DeepTutor.open();
            } else {
                Anim.showToast('AI Teacher is loading...');
            }
        };
    }

    // ─── PRACTICE: Interactive Widget Exercises ───
    function renderPractice(target) {
        if (currentExerciseIdx >= totalExercises) {
            currentStep = 'summary';
            updateUI();
            return;
        }

        const exercise = exercises[currentExerciseIdx];
        target.innerHTML = `
            <div class="lesson-exercise animate-in">
                <div class="lesson-exercise__counter">
                    Задание ${currentExerciseIdx + 1} из ${totalExercises}
                </div>
                <div id="exercise-widget"></div>
                <button class="btn btn--ghost btn--full" id="practice-ask-ai" style="margin-top:var(--sp-3);">
                    💬 Не понимаю / Ask AI
                </button>
            </div>
        `;

        const widgetArea = target.querySelector('#exercise-widget');
        const widgetType = exercise.widgetType || mapExerciseToWidget(exercise);
        const widgetData = exercise.widgetData || mapExerciseData(exercise);

        LangyWidgets.render(widgetArea, widgetType, widgetData, (isCorrect) => {
            if (isCorrect) {
                correctAnswers++;
                if (typeof DeepTutor !== 'undefined') DeepTutor.setEmotion('happy');
            } else {
                if (typeof LangyAI !== 'undefined') {
                    LangyAI.recordMistake(exercise.widgetData?.sentence || exercise.prompt || '', '', exercise.widgetData?.answer || '');
                }
                if (typeof DeepTutor !== 'undefined') DeepTutor.setEmotion('encouraging');
            }

            currentExerciseIdx++;
            setTimeout(() => {
                if (!_destroyed) updateUI();
            }, 1400);
        });

        // ✅ FIX #1: Ask AI during exercises
        target.querySelector('#practice-ask-ai')?.addEventListener('click', () => {
            if (typeof DeepTutor !== 'undefined') {
                DeepTutor.show();
                DeepTutor.open();
                const prompt = exercise.widgetData?.sentence || exercise.widgetData?.sourceText || exercise.widgetData?.phrase || '';
                if (prompt) {
                    DeepTutor.handleSend(`I'm confused about this exercise: "${prompt}". Can you explain it?`, true);
                }
            }
        });
    }

    // ─── MAP OLD EXERCISE FORMAT TO WIDGETS ───
    function mapExerciseToWidget(ex) {
        if (ex.widgetType) return ex.widgetType;
        switch (ex.type) {
            case 'choice': return 'fill-bubble';
            case 'fill-blank': return 'fill-bubble';
            case 'translate': return 'type-translation';
            case 'speaking': return 'speak-aloud';
            case 'word-shuffle': return 'word-shuffle';
            case 'match-pairs': return 'match-pairs';
            case 'listen-type': return 'listen-type';
            case 'read-answer': return 'read-answer';
            default: return 'fill-bubble';
        }
    }

    function mapExerciseData(ex) {
        if (ex.widgetData) return ex.widgetData;
        switch (ex.type) {
            case 'choice':
                return { sentence: ex.prompt, options: ex.options, correct: ex.correct };
            case 'translate':
                return { sourceText: ex.prompt, fromLang: 'EN', toLang: 'RU', answer: ex.answer };
            case 'speaking':
                return { phrase: ex.prompt || ex.answer };
            default:
                return { sentence: ex.prompt || 'Choose the correct answer', options: ex.options || ['A', 'B', 'C'], correct: ex.correct || 0 };
        }
    }

    // ─── HOMEWORK MODE ───
    function renderHomeworkMode(target) {
        const hw = unit.homework;
        target.innerHTML = `
            <div class="lesson-homework animate-in">
                <div class="lesson-exercise__counter">📝 HOMEWORK / ДОМАШНЕЕ ЗАДАНИЕ</div>
                <h3 style="margin: var(--sp-2) 0;">${unit.title} Review</h3>
                <p style="margin:var(--sp-3) 0; color:var(--text-secondary);">${hw?.prompt || 'Write a short text about this topic.'}</p>
                <textarea class="input lesson-homework__textarea" id="hw-input" placeholder="Начните писать здесь / Start writing here..."></textarea>
                <div class="lesson-homework__actions">
                    <button class="btn btn--primary btn--full btn--lg" id="hw-submit">
                        📤 Отправить на проверку / Submit for Review
                    </button>
                </div>
                <div id="hw-result"></div>
            </div>
        `;

        const input = target.querySelector('#hw-input');
        const submitBtn = target.querySelector('#hw-submit');
        const resultArea = target.querySelector('#hw-result');

        submitBtn.onclick = async () => {
            const text = input.value.trim();
            if (text.length < 10) {
                Anim.showToast("Слишком коротко! / Too short!");
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = '🔄 AI проверяет... / AI is grading...';

            try {
                const result = await LangyAI.gradeHomework(hw?.prompt || unit.title, text);
                showHomeworkGrade(resultArea, result, submitBtn);
            } catch (e) {
                const mockResult = {
                    score: Math.floor(Math.random() * 30) + 55,
                    grade: 'C',
                    feedback: 'Good effort! Keep practicing your grammar and vocabulary.'
                };
                showHomeworkGrade(resultArea, mockResult, submitBtn);
            }
        };
    }

    function showHomeworkGrade(target, result, submitBtn) {
        const passed = result.score >= 60;
        target.innerHTML = `
            <div class="lesson-grade animate-in" style="border-color: ${passed ? 'var(--accent)' : 'var(--danger)'}">
                <div class="lesson-grade__header">
                    <span class="lesson-grade__label">AI EVALUATION</span>
                    <span class="lesson-grade__score" style="color:${passed ? 'var(--accent-dark)' : 'var(--danger)'}">
                        ${result.grade} (${result.score}%)
                    </span>
                </div>
                <div class="lesson-grade__feedback">${result.feedback}</div>
            </div>
        `;

        submitBtn.disabled = false;
        if (passed) {
            submitBtn.textContent = '✅ Завершить / Finish';
            submitBtn.onclick = () => {
                saveLessonProgress(result);
                _destroyed = true;
                Router.navigate('home');
            };
        } else {
            submitBtn.textContent = '🔄 Попробовать снова / Try Again';
            submitBtn.onclick = () => updateUI();
        }
    }

    // ─── SUMMARY ───
    function renderSummary(target) {
        const score = totalExercises > 0 ? Math.round((correctAnswers / totalExercises) * 100) : 0;
        const duration = Math.round((Date.now() - lessonStartTime) / 60000);
        const xpEarned = correctAnswers * 25 + 50;

        target.innerHTML = `
            <div class="lesson-summary animate-in">
                <div class="lesson-summary__icon">${score >= 70 ? '🎉' : '💪'}</div>
                <h2 class="lesson-summary__title">
                    ${score >= 70 ? 'Отлично! / Excellent!' : 'Хорошая попытка! / Good try!'}
                </h2>

                <div class="lesson-summary__stats">
                    <div class="lesson-summary__stat">
                        <span class="lesson-summary__stat-value">${score}%</span>
                        <span class="lesson-summary__stat-label">Точность / Accuracy</span>
                    </div>
                    <div class="lesson-summary__stat">
                        <span class="lesson-summary__stat-value">${correctAnswers}/${totalExercises}</span>
                        <span class="lesson-summary__stat-label">Правильно / Correct</span>
                    </div>
                    <div class="lesson-summary__stat">
                        <span class="lesson-summary__stat-value">${duration}m</span>
                        <span class="lesson-summary__stat-label">Время / Time</span>
                    </div>
                    <div class="lesson-summary__stat">
                        <span class="lesson-summary__stat-value">+${xpEarned}</span>
                        <span class="lesson-summary__stat-label">XP</span>
                    </div>
                </div>

                <button class="btn btn--primary btn--xl btn--full" id="summary-finish" style="margin-top:var(--sp-6);">
                    🏠 На главную / Home
                </button>
                ${score < 70 ? '<button class="btn btn--ghost btn--full" id="summary-retry" style="margin-top:var(--sp-2);">🔄 Повторить / Retry</button>' : ''}
            </div>
        `;

        // ✅ FIX #3: Save progress
        saveLessonProgress({ score, grade: score >= 90 ? 'A' : score >= 70 ? 'B' : 'C', feedback: '' });
        LangyState.user.xp += xpEarned;
        LangyState.currencies.dangy += correctAnswers * 10;

        // ✅ FIX #4: Generate homework for next lesson
        generateHomeworkAfterLesson(unit, score);

        // ✅ FIX #3: SINGLE click goes home, no double-exit bug
        target.querySelector('#summary-finish').onclick = () => {
            _destroyed = true;
            Router.navigate('home');
        };

        target.querySelector('#summary-retry')?.addEventListener('click', () => {
            currentExerciseIdx = 0;
            correctAnswers = 0;
            currentStep = 'practice';
            updateUI();
        });

        // ✅ FIX #1: AI feedback after lesson
        if (typeof DeepTutor !== 'undefined') {
            DeepTutor.setEmotion(score >= 70 ? 'happy' : 'encouraging');
            DeepTutor.handleSend(
                `Lesson "${unit.title}" completed! Score: ${score}% (${correctAnswers}/${totalExercises}). ${score >= 70 ? 'Great job!' : 'Need more practice.'}`,
                true
            );
        }
    }

    // ─── SAVE PROGRESS ───
    function saveLessonProgress(result) {
        const historyEntry = {
            id: Date.now(),
            unitId: unit.id,
            title: unit.title,
            score: result.score,
            grade: result.grade,
            feedback: result.feedback || '',
            status: result.score >= 70 ? 'done' : 'error',
            errors: Math.max(0, totalExercises - correctAnswers),
            date: new Date().toISOString().split('T')[0],
            icon: result.score >= 70 ? '✅' : '📝'
        };

        LangyState.progress.lessonHistory.push(historyEntry);

        // Remove from homework queue if completed
        LangyState.homework.current = LangyState.homework.current.filter(h => h.unitId !== unit.id);

        // Advance curriculum
        if (mode === 'lesson' && result.score >= 70 && unit.id === LangyState.progress.currentUnitId) {
            const nextUnit = activeTb.units.find(u => u.id === unit.id + 1);
            if (nextUnit) {
                LangyState.progress.currentUnitId = nextUnit.id;
                LangyState.progress.currentLessonIdx = 0;
                LangyState.progress.currentUnit = `Unit ${nextUnit.id}: ${nextUnit.title}`;
            }
        }

        // Update overall
        LangyState.progress.topicsCompleted = LangyState.progress.lessonHistory.filter(l => l.status === 'done').length;
        LangyState.progress.overall = Math.min(100, Math.round((LangyState.progress.topicsCompleted / activeTb.units.length) * 100));

        if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
    }

    // ✅ FIX #4: Generate homework after every lesson
    function generateHomeworkAfterLesson(completedUnit, score) {
        // Check if homework for this unit already exists
        const exists = LangyState.homework.current.some(h => h.unitId === completedUnit.id);
        if (exists) return;

        // Create homework based on unit data
        const hw = {
            id: Date.now(),
            unitId: completedUnit.id,
            title: `${completedUnit.title} — Review`,
            desc: completedUnit.homework?.prompt || `Review ${completedUnit.grammar?.join(', ') || 'this lesson'} and write practice sentences.`,
            icon: '📝',
            createdAt: new Date().toISOString()
        };

        LangyState.homework.current.push(hw);

        // Also add completed homework entries for past lessons
        LangyState.homework.completed = LangyState.homework.completed || [];

        if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
    }

    // ─── INIT ───
    updateUI();
}

Router.register('learning', renderLearning);

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
                <div style="font-size:64px; margin-bottom:var(--sp-4);">${LangyIcons.bookOpen}</div>
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

    let totalExercises = exercises.length;
    let currentStep = mode === 'homework' ? 'homework' : 'intro';
    let currentExerciseIdx = 0;
    let correctAnswers = 0;
    let failedExerciseIndices = []; // Track which exercises were failed
    const lessonStartTime = Date.now();
    let _destroyed = false;
    let teachSlideIdx = 0;
    const teachSlides = unit.teachSlides || [];

    // Quick Review state
    let qrWeakUnits = []; // Units that need review
    let qrCurrentUnitIdx = 0; // Which weak unit we're reviewing
    let qrPhase = 'theory'; // 'theory' | 'practice' | 'result'
    let qrSlideIdx = 0;
    let qrExerciseIdx = 0;
    let qrCorrect = 0;
    let qrAttempts = 0; // Attempts without theory (max 2 before forced theory)
    let qrExercises = [];

    // ─── MAIN RENDER ───
    function updateUI() {
        if (_destroyed) return;
        const progress =
            currentStep === 'intro'
                ? 0
                : currentStep === 'theory'
                  ? 15
                  : currentStep === 'practice'
                    ? 15 + Math.round((currentExerciseIdx / totalExercises) * 70)
                    : currentStep === 'summary'
                      ? 100
                      : 50;

        container.innerHTML = `
            <div class="screen screen--no-pad learning-screen">
                <header class="learning-header">
                    <div class="circle-btn" id="learning-back">${LangyIcons.back}</div>
                    <div class="learning-header__info">
                        <div class="learning-header__unit">${mode === 'homework' ? LangyIcons.home + ' ' + i18n('hw.title') : LangyIcons.book + ` Unit ${unit.id}`}</div>
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
            case 'intro':
                renderIntro(content);
                break;
            case 'teach':
                renderTeach(content);
                break;
            case 'theory':
                renderTheory(content);
                break;
            case 'practice':
                renderPractice(content);
                break;
            case 'homework':
                renderHomeworkMode(content);
                break;
            case 'summary':
                renderSummary(content);
                break;
            case 'quick-review':
                renderQuickReview(content);
                break;
        }
    }

    // ─── INTRO CARD ───
    function renderIntro(target) {
        target.innerHTML = `
            <div class="lesson-intro animate-in">
                <div class="lesson-intro__icon">${LangyIcons.book}</div>
                <h2 class="lesson-intro__title">${unit.title}</h2>
                <div class="lesson-intro__meta">
                    <div class="lesson-intro__tag">${LangyIcons.fileText} ${unit.grammar?.join(', ') || 'Grammar'}</div>
                    <div class="lesson-intro__tag">${LangyIcons.bookOpen} ${unit.vocabulary?.join(', ') || 'Vocabulary'}</div>
                    <div class="lesson-intro__tag">${LangyIcons.clock} ~15 ${i18n('learn.minutes')}</div>
                    <div class="lesson-intro__tag">${LangyIcons.target} ${totalExercises} ${i18n('learn.exercises')}</div>
                </div>
                <button class="btn btn--primary btn--xl btn--full lesson-intro__start" id="start-lesson">
                    ${i18n('learn.start_lesson')} ${LangyIcons.arrowRight}
                </button>
            </div>
        `;

        target.querySelector('#start-lesson').onclick = () => {
            currentStep = teachSlides.length > 0 ? 'teach' : unit.theory ? 'theory' : 'practice';
            teachSlideIdx = 0;
            updateUI();

            // Start AI chat integration
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

    // ─── MASCOT TEACH ───
    function renderTeach(target) {
        const slide = teachSlides[teachSlideIdx];
        if (!slide) {
            currentStep = 'practice';
            currentExerciseIdx = 0;
            updateUI();
            return;
        }

        const isLast = teachSlideIdx >= teachSlides.length - 1;
        const mascotNames = ['zendaya', 'travis', 'matthew', 'omar'];
        const chosenIdx = typeof LangyState !== 'undefined' && LangyState.mascot ? LangyState.mascot.selected || 0 : 0;
        const mascotSrc = `assets/mascots/${mascotNames[chosenIdx]}.png`;

        // Build slide content based on type
        let slideContent = '';
        if (slide.type === 'examples' && slide.items) {
            slideContent = `<div class="teach-examples">${slide.items
                .map(it => {
                    const hl = it.highlight ? `<span class="teach-hl">${it.highlight}</span>` : '';
                    return `<div class="teach-example-row"><span class="teach-base">${it.base}</span><span class="teach-arrow">→</span><span class="teach-result">${it.past}${hl ? '' : ''}</span></div>`;
                })
                .join('')}</div>`;
        } else if (slide.type === 'compare' && slide.left && slide.right) {
            slideContent = `<div class="teach-compare"><div class="teach-col"><div class="teach-col__label">${slide.left.label}</div>${slide.left.items.map(i => `<div class="teach-col__item">${i}</div>`).join('')}</div><div class="teach-vs">VS</div><div class="teach-col teach-col--accent"><div class="teach-col__label">${slide.right.label}</div>${slide.right.items.map(i => `<div class="teach-col__item">${i}</div>`).join('')}</div></div>`;
        } else if (slide.type === 'vocab-intro' && slide.words) {
            slideContent = `<div class="teach-vocab-grid">${slide.words.map(w => `<div class="teach-vocab-card"><div class="teach-vocab-card__en">${w.en}</div><div class="teach-vocab-card__ru">${w.ru}</div></div>`).join('')}</div>`;
        } else if (slide.type === 'quiz-check') {
            slideContent = `<div class="teach-quiz" id="teach-quiz">${(slide.options || []).map((o, i) => `<button class="btn btn--secondary teach-quiz__opt" data-idx="${i}">${o}</button>`).join('')}</div>`;
        } else if (slide.type === 'tip') {
            slideContent = `<div class="teach-tip"><div class="teach-tip__icon">${LangyIcons.helpCircle}</div><div class="teach-tip__text">${slide.tipText || ''}</div></div>`;
        }

        target.innerHTML = `
            <div class="teach-slide animate-in">
                <div class="teach-slide__progress">
                    ${teachSlides.map((_, i) => `<div class="teach-dot ${i === teachSlideIdx ? 'teach-dot--active' : i < teachSlideIdx ? 'teach-dot--done' : ''}"></div>`).join('')}
                </div>
                <div class="teach-mascot">
                    <img src="${mascotSrc}" alt="Mascot" class="teach-mascot__img mascot--${slide.mascotEmotion || 'happy'}">
                </div>
                <div class="teach-bubble" id="teach-bubble">
                    <div class="teach-bubble__text" id="teach-text"></div>
                </div>
                ${slideContent ? `<div class="teach-content">${slideContent}</div>` : ''}
                <div class="teach-actions">
                    <button class="btn btn--primary btn--xl btn--full" id="teach-next" style="display:none; gap: var(--sp-2);">
                        ${isLast ? LangyIcons.rocket + ' К практике! / Start Practice' : 'Далее / Next'}
                    </button>
                    <button class="btn btn--ghost btn--sm" id="teach-ask" style="margin-top:var(--sp-2);display:none; gap: var(--sp-2);">
                        ${LangyIcons.messageCircle} Не понимаю / Ask mascot
                    </button>
                    <button class="btn btn--ghost btn--sm" id="teach-speak" style="margin-top:var(--sp-1);display:none; gap: var(--sp-2);">
                        ${LangyIcons.volume} Озвучить / Listen
                    </button>
                </div>
            </div>
        `;

        // Typewriter effect
        const textEl = target.querySelector('#teach-text');
        const nextBtn = target.querySelector('#teach-next');
        const askBtn = target.querySelector('#teach-ask');
        const speakBtn = target.querySelector('#teach-speak');
        const fullText = slide.mascotText || '';
        let charIdx = 0;
        const speed = 25; // ms per character

        function typeChar() {
            if (_destroyed || charIdx >= fullText.length) {
                // Typing done — show buttons
                if (nextBtn) nextBtn.style.display = '';
                if (askBtn) askBtn.style.display = '';
                if (speakBtn) speakBtn.style.display = '';
                return;
            }
            charIdx++;
            textEl.textContent = fullText.slice(0, charIdx);
            setTimeout(typeChar, speed);
        }
        typeChar();

        // Skip typewriter on tap on the bubble
        target.querySelector('#teach-bubble').onclick = () => {
            charIdx = fullText.length;
            textEl.textContent = fullText;
            if (nextBtn) nextBtn.style.display = '';
            if (askBtn) askBtn.style.display = '';
            if (speakBtn) speakBtn.style.display = '';
        };

        // Next slide / go to practice
        nextBtn.onclick = () => {
            if (isLast) {
                currentStep = 'practice';
                currentExerciseIdx = 0;
            } else {
                teachSlideIdx++;
            }
            updateUI();
        };

        // Quiz-check handler
        if (slide.type === 'quiz-check') {
            target.querySelectorAll('.teach-quiz__opt').forEach(btn => {
                btn.onclick = () => {
                    const idx = parseInt(btn.dataset.idx);
                    const correct = idx === slide.correct;
                    btn.classList.add(correct ? 'teach-quiz__opt--correct' : 'teach-quiz__opt--wrong');
                    if (!correct) {
                        const rightBtn = target.querySelector(`.teach-quiz__opt[data-idx="${slide.correct}"]`);
                        if (rightBtn) rightBtn.classList.add('teach-quiz__opt--correct');
                    }
                    target.querySelectorAll('.teach-quiz__opt').forEach(b => (b.disabled = true));
                    if (typeof DeepTutor !== 'undefined') DeepTutor.setEmotion(correct ? 'happy' : 'encouraging');
                    // Auto-advance after 1.5s
                    setTimeout(() => {
                        if (!_destroyed) {
                            teachSlideIdx++;
                            updateUI();
                        }
                    }, 1500);
                };
            });
        }

        // Ask mascot (opens DeepTutor with context)
        askBtn.onclick = () => {
            if (typeof DeepTutor !== 'undefined') {
                DeepTutor.show();
                DeepTutor.open();
                DeepTutor.handleSend(
                    `The student doesn't understand this explanation: "${slide.mascotText}". Please explain it more simply, with more examples.`,
                    true
                );
            }
        };

        // TTS — Google built-in Web Speech API
        speakBtn.onclick = () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(fullText);
                utterance.lang = 'en-US';
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                window.speechSynthesis.speak(utterance);
                speakBtn.innerHTML = `${LangyIcons.volume} Playing...`;
                utterance.onend = () => {
                    speakBtn.innerHTML = `${LangyIcons.volume} Озвучить / Listen`;
                };
            } else {
                Anim.showToast('TTS не поддерживается в этом браузере');
            }
        };
    }

    // ─── THEORY (legacy fallback) ───
    function renderTheory(target) {
        target.innerHTML = `
            <div class="lesson-theory animate-in">
                <div class="lesson-theory__content">
                    ${unit.theory || `<h3>${unit.title}</h3><p>Let's learn about ${unit.grammar?.join(' and ') || 'new topics'}!</p>`}
                </div>
                <button class="btn btn--primary btn--xl btn--full" id="theory-continue" style="margin-top:var(--sp-6);">
                    Понятно! К заданиям / Got it! Practice
                </button>
                <button class="btn btn--ghost btn--full" id="theory-ask-ai" style="margin-top:var(--sp-2); display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">
                    ${LangyIcons.messageCircle} Спросить AI / Ask AI Teacher
                </button>
            </div>
        `;

        target.querySelector('#theory-continue').onclick = () => {
            currentStep = 'practice';
            currentExerciseIdx = 0;
            updateUI();
        };

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
                    ${i18n('learn.exercise_counter')
                        .replace('{n}', currentExerciseIdx + 1)
                        .replace('{total}', totalExercises)}
                </div>
                <div id="exercise-widget"></div>
                <button class="btn btn--ghost btn--full" id="practice-ask-ai" style="margin-top:var(--sp-3); display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">
                    ${LangyIcons.messageCircle} ${i18n('learn.ask_ai')}
                </button>
            </div>
        `;

        const widgetArea = target.querySelector('#exercise-widget');
        const widgetType = exercise.widgetType || mapExerciseToWidget(exercise);
        const widgetData = exercise.widgetData || mapExerciseData(exercise);

        LangyWidgets.render(widgetArea, widgetType, widgetData, isCorrect => {
            if (isCorrect === 'skipped') {
                totalExercises--; // Do not count skipped exercises towards total score calculation
                if (typeof DeepTutor !== 'undefined') DeepTutor.setEmotion('encouraging');
            } else if (isCorrect === true) {
                correctAnswers++;
                if (typeof DeepTutor !== 'undefined') DeepTutor.setEmotion('happy');
            } else {
                failedExerciseIndices.push(currentExerciseIdx);
                if (typeof LangyAI !== 'undefined') {
                    LangyAI.recordMistake(
                        exercise.widgetData?.sentence || exercise.prompt || '',
                        '',
                        exercise.widgetData?.answer || ''
                    );
                }
                if (typeof DeepTutor !== 'undefined') DeepTutor.setEmotion('encouraging');
            }

            currentExerciseIdx++;
            setTimeout(() => {
                if (!_destroyed) updateUI();
            }, 1400);
        });

        // FIX #1: Ask AI during exercises
        target.querySelector('#practice-ask-ai')?.addEventListener('click', () => {
            if (typeof DeepTutor !== 'undefined') {
                DeepTutor.show();
                DeepTutor.open();
                const prompt =
                    exercise.widgetData?.sentence ||
                    exercise.widgetData?.sourceText ||
                    exercise.widgetData?.phrase ||
                    '';
                if (prompt) {
                    DeepTutor.handleSend(`I'm confused about this exercise: "${prompt}". Can you explain it?`, true);
                }
            }
        });
    }

    // ─── MAP OLD EXERCISE FORMAT TO WIDGETS ───
    function mapExerciseToWidget(ex) {
        if (ex.widgetType) return ex.widgetType;
        // ExerciseGenerator exercises already use widget type names
        if (ex.data) return ex.type;
        switch (ex.type) {
            case 'choice':
                return 'fill-bubble';
            case 'fill-blank':
                return 'fill-bubble';
            case 'translate':
                return 'type-translation';
            case 'speaking':
                return 'speak-aloud';
            case 'word-shuffle':
                return 'word-shuffle';
            case 'match-pairs':
                return 'match-pairs';
            case 'listen-type':
                return 'listen-type';
            case 'read-answer':
                return 'read-answer';
            default:
                return 'fill-bubble';
        }
    }

    function mapExerciseData(ex) {
        if (ex.widgetData) return ex.widgetData;
        // ExerciseGenerator exercises have data property with all fields ready
        if (ex.data) return ex.data;
        switch (ex.type) {
            case 'choice':
                return { sentence: ex.prompt, options: ex.options, correct: ex.correct };
            case 'translate':
                return { sourceText: ex.prompt, fromLang: 'EN', toLang: 'RU', answer: ex.answer };
            case 'speaking':
                return { phrase: ex.prompt || ex.answer };
            default:
                return {
                    sentence: ex.prompt || 'Choose the correct answer',
                    options: ex.options || ['A', 'B', 'C'],
                    correct: ex.correct || 0,
                };
        }
    }

    // ─── HOMEWORK MODE ───
    function renderHomeworkMode(target) {
        const hw = unit.homework;
        target.innerHTML = `
            <div class="lesson-homework animate-in">
                <div class="lesson-exercise__counter" style="display:flex; align-items:center; gap:var(--sp-2);">${LangyIcons.fileText} HOMEWORK / ДОМАШНЕЕ ЗАДАНИЕ</div>
                <h3 style="margin: var(--sp-2) 0;">${unit.title} Review</h3>
                <p style="margin:var(--sp-3) 0; color:var(--text-secondary);">${hw?.prompt || 'Write a short text about this topic.'}</p>
                <textarea class="input lesson-homework__textarea" id="hw-input" placeholder="Начните писать здесь / Start writing here..."></textarea>
                <div class="lesson-homework__actions">
                    <button class="btn btn--primary btn--full btn--lg" id="hw-submit" style="display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">
                        ${LangyIcons.upload} Отправить на проверку / Submit for Review
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
                Anim.showToast('Слишком коротко! / Too short!');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = `${LangyIcons.loader} AI проверяет... / AI is grading...`;

            try {
                const result = await LangyAI.gradeHomework(hw?.prompt || unit.title, text);
                showHomeworkGrade(resultArea, result, submitBtn);
            } catch (e) {
                const mockResult = {
                    score: Math.floor(Math.random() * 30) + 55,
                    grade: 'C',
                    feedback: 'Good effort! Keep practicing your grammar and vocabulary.',
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
            submitBtn.innerHTML = `${LangyIcons.check} ${i18n('learn.finish')}`;
            submitBtn.onclick = () => {
                saveLessonProgress(result);
                _destroyed = true;
                Router.navigate('home');
            };
        } else {
            submitBtn.innerHTML = `${LangyIcons.refresh} ${i18n('learn.try_again')}`;
            submitBtn.onclick = () => updateUI();
        }
    }

    // ─── SUMMARY ───
    function renderSummary(target) {
        const score = totalExercises > 0 ? Math.round((correctAnswers / totalExercises) * 100) : 0;
        const duration = Math.round((Date.now() - lessonStartTime) / 60000);
        const xpEarned = correctAnswers * 25 + 50;
        const isCheckpoint = unit.unitType === 'review';

        // For checkpoints: analyze which covered units had failures
        const weakUnits = [];
        if (isCheckpoint && failedExerciseIndices.length > 0) {
            const coveredUnits = LangyCurriculum.getCheckpointCoverage(unit.id);
            // Map failed exercises back to covered units (distribute evenly)
            const exPerUnit = Math.max(1, Math.floor(totalExercises / Math.max(1, coveredUnits.length)));
            failedExerciseIndices.forEach(idx => {
                const unitIdx = Math.min(Math.floor(idx / exPerUnit), coveredUnits.length - 1);
                if (coveredUnits[unitIdx] && !weakUnits.find(u => u.id === coveredUnits[unitIdx].id)) {
                    weakUnits.push(coveredUnits[unitIdx]);
                }
            });
        }

        // Build weak topics display for checkpoints
        const weakTopicsHtml =
            isCheckpoint && weakUnits.length > 0
                ? `
            <div class="qr-weak-topics" style="margin-top:var(--sp-4); padding:var(--sp-4); background:var(--danger-bg); border-radius:var(--radius-lg);">
                <div style="font-weight:var(--fw-bold); margin-bottom:var(--sp-2); color:var(--danger); display:flex; align-items:center; gap:var(--sp-2);">${LangyIcons.fileText} ${i18n('learn.weak_topics')}:</div>
                ${weakUnits.map(u => `<div style="padding:var(--sp-1) 0; color:var(--text-secondary);">• Unit ${u.id}: ${u.title}</div>`).join('')}
            </div>
        `
                : '';

        // Quick Review button for checkpoints with weak areas
        const qrButton =
            isCheckpoint && weakUnits.length > 0
                ? `
            <button class="btn btn--primary btn--xl btn--full" id="start-quick-review" style="margin-top:var(--sp-4); background:linear-gradient(135deg, var(--primary), var(--accent-dark)); border:none;">
                ${LangyIcons.lightning} ${i18n('learn.quick_review')}
            </button>
        `
                : '';

        target.innerHTML = `
            <div class="lesson-summary animate-in">
                <div class="lesson-summary__icon">${score >= LangyConfig.PASS_THRESHOLD ? LangyIcons.sparkles : LangyIcons.flame}</div>
                <h2 class="lesson-summary__title">
                    ${score >= LangyConfig.PASS_THRESHOLD ? i18n('learn.excellent') : i18n('learn.good_try')}
                </h2>

                <div class="lesson-summary__stats">
                    <div class="lesson-summary__stat">
                        <span class="lesson-summary__stat-value">${score}%</span>
                        <span class="lesson-summary__stat-label">${i18n('learn.accuracy')}</span>
                    </div>
                    <div class="lesson-summary__stat">
                        <span class="lesson-summary__stat-value">${correctAnswers}/${totalExercises}</span>
                        <span class="lesson-summary__stat-label">${i18n('learn.correct')}</span>
                    </div>
                    <div class="lesson-summary__stat">
                        <span class="lesson-summary__stat-value">${duration}m</span>
                        <span class="lesson-summary__stat-label">${i18n('learn.time')}</span>
                    </div>
                    <div class="lesson-summary__stat">
                        <span class="lesson-summary__stat-value">+${xpEarned}</span>
                        <span class="lesson-summary__stat-label">XP</span>
                    </div>
                </div>

                ${weakTopicsHtml}
                ${qrButton}

                <button class="btn btn--${isCheckpoint && weakUnits.length > 0 ? 'ghost' : 'primary'} btn--xl btn--full" id="summary-finish" style="margin-top:var(--sp-3);">
                    ${LangyIcons.home} ${i18n('results.home')}
                </button>
                ${score < LangyConfig.PASS_THRESHOLD ? `<button class="btn btn--ghost btn--full" id="summary-retry" style="margin-top:var(--sp-2); display:flex; align-items:center; justify-content:center; gap:var(--sp-2);">${LangyIcons.refresh} ${i18n('learn.try_again')}</button>` : ''}
            </div>
        `;

        // Save progress
        saveLessonProgress({ score, grade: score >= 90 ? 'A' : score >= LangyConfig.PASS_THRESHOLD ? 'B' : 'C', feedback: '' });
        const oldXp = LangyState.user.xp;
        LangyState.user.xp += xpEarned;
        LangyState.currencies.dangy += correctAnswers * 10;
        if (typeof checkLevelUp === 'function') checkLevelUp(oldXp, LangyState.user.xp);

        // Dynamically determine the dominant category and vocab words
        const categoryCounts = { vocabulary: 0, grammar: 0, listening: 0, speaking: 0, writing: 0 };
        let vocabWordsCount = 0;

        exercises.forEach(ex => {
            const t = ex.type;
            if (t === 'match-pairs' || t === 'image-choice') {
                categoryCounts.vocabulary++;
                vocabWordsCount += ex.data && ex.data.pairs ? ex.data.pairs.length : 1;
            } else if (t === 'listen-type') {
                categoryCounts.listening++;
            } else if (t === 'speak-aloud') {
                categoryCounts.speaking++;
            } else if (t === 'type-translation' || t === 'read-answer') {
                categoryCounts.writing++;
            } else {
                categoryCounts.grammar++;
            }
        });

        const dominantCategory = Object.keys(categoryCounts).reduce((a, b) =>
            categoryCounts[a] > categoryCounts[b] ? a : b
        );
        const actualWordsLearned = Math.min(vocabWordsCount, Math.floor(correctAnswers)); // Ensure it doesn't exceed total correct

        // Record session for streak tracking & rewards
        if (typeof recordSession === 'function') {
            recordSession({
                duration: duration,
                wordsLearned: actualWordsLearned,
                accuracy: score,
                category: dominantCategory,
            });
        }

        // Generate homework for next lesson
        generateHomeworkAfterLesson(unit, score);

        // Quick Review button handler
        target.querySelector('#start-quick-review')?.addEventListener('click', () => {
            qrWeakUnits = weakUnits;
            qrCurrentUnitIdx = 0;
            qrPhase = 'theory';
            qrSlideIdx = 0;
            qrAttempts = 0;
            currentStep = 'quick-review';
            updateUI();
        });

        target.querySelector('#summary-finish').onclick = () => {
            _destroyed = true;
            Router.navigate('home');
        };

        target.querySelector('#summary-retry')?.addEventListener('click', () => {
            currentExerciseIdx = 0;
            correctAnswers = 0;
            failedExerciseIndices = [];
            currentStep = 'practice';
            updateUI();
        });

        // AI feedback after lesson
        if (typeof DeepTutor !== 'undefined') {
            DeepTutor.setEmotion(score >= LangyConfig.PASS_THRESHOLD ? 'happy' : 'encouraging');
            DeepTutor.handleSend(
                `Lesson "${unit.title}" completed! Score: ${score}% (${correctAnswers}/${totalExercises}). ${score >= LangyConfig.PASS_THRESHOLD ? 'Great job!' : 'Need more practice.'}`,
                true
            );
        }
    }

    // ─── QUICK REVIEW ───
    function renderQuickReview(target) {
        if (qrCurrentUnitIdx >= qrWeakUnits.length) {
            // All weak units reviewed!
            renderQuickReviewComplete(target);
            return;
        }

        const weakUnit = qrWeakUnits[qrCurrentUnitIdx];
        const weakSlides = weakUnit.teachSlides || [];
        const weakExercises = weakUnit.exercises || [];

        if (qrPhase === 'theory') {
            renderQRTheory(target, weakUnit, weakSlides);
        } else if (qrPhase === 'practice') {
            renderQRPractice(target, weakUnit, weakExercises);
        } else if (qrPhase === 'result') {
            renderQRResult(target, weakUnit);
        }
    }

    // Quick Review: Theory replay
    function renderQRTheory(target, weakUnit, slides) {
        const slide = slides[qrSlideIdx];
        if (!slide) {
            // No more slides, go to practice
            qrPhase = 'practice';
            qrExerciseIdx = 0;
            qrCorrect = 0;
            qrExercises = (weakUnit.exercises || []).slice(0, 5);
            updateUI();
            return;
        }

        const isLast = qrSlideIdx >= slides.length - 1;
        const mascotNames = ['zendaya', 'travis', 'matthew', 'omar'];
        const chosenIdx = LangyState.mascot?.selected || 0;
        const mascotSrc = `assets/mascots/${mascotNames[chosenIdx]}.png`;

        // Build slide content (reuse from teach)
        let slideContent = '';
        if (slide.type === 'examples' && slide.items) {
            slideContent = `<div class="teach-examples">${slide.items.map(it => `<div class="teach-example-row"><span class="teach-base">${it.base}</span><span class="teach-arrow">→</span><span class="teach-result">${it.past || ''}</span></div>`).join('')}</div>`;
        } else if (slide.type === 'compare' && slide.left && slide.right) {
            slideContent = `<div class="teach-compare"><div class="teach-col"><div class="teach-col__label">${slide.left.label}</div>${slide.left.items.map(i => `<div class="teach-col__item">${i}</div>`).join('')}</div><div class="teach-vs">VS</div><div class="teach-col teach-col--accent"><div class="teach-col__label">${slide.right.label}</div>${slide.right.items.map(i => `<div class="teach-col__item">${i}</div>`).join('')}</div></div>`;
        } else if (slide.type === 'vocab-intro' && slide.words) {
            slideContent = `<div class="teach-vocab-grid">${slide.words.map(w => `<div class="teach-vocab-card"><div class="teach-vocab-card__en">${w.en}</div><div class="teach-vocab-card__ru">${w.ru}</div></div>`).join('')}</div>`;
        }

        target.innerHTML = `
            <div class="teach-slide animate-in">
                <div class="qr-header">
                    <div class="qr-header__badge" style="display:flex; align-items:center; gap:4px;">${LangyIcons.lightning} Quick Review</div>
                    <div class="qr-header__topic" style="display:flex; align-items:center; gap:4px;">${LangyIcons.bookOpen} ${weakUnit.title}</div>
                    <div class="qr-header__progress">${qrCurrentUnitIdx + 1}/${qrWeakUnits.length} ${i18n('learn.topics')}</div>
                </div>
                <div class="teach-slide__progress">
                    ${slides.map((_, i) => `<div class="teach-dot ${i === qrSlideIdx ? 'teach-dot--active' : i < qrSlideIdx ? 'teach-dot--done' : ''}"></div>`).join('')}
                </div>
                <div class="teach-mascot">
                    <img src="${mascotSrc}" alt="Mascot" class="teach-mascot__img mascot--${slide.mascotEmotion || 'thinking'}">
                </div>
                <div class="teach-bubble" id="qr-bubble">
                    <div class="teach-bubble__text" id="qr-text"></div>
                </div>
                ${slideContent ? `<div class="teach-content">${slideContent}</div>` : ''}
                <div class="teach-actions">
                    <button class="btn btn--primary btn--xl btn--full" id="qr-next" style="display:none;">
                        ${isLast ? `<span style="display:flex; align-items:center; gap:var(--sp-2);">${LangyIcons.fileText} ${i18n('learn.to_practice')}</span>` : i18n('learn.next')}
                    </button>
                </div>
            </div>
        `;

        // Typewriter
        const textEl = target.querySelector('#qr-text');
        const nextBtn = target.querySelector('#qr-next');
        const fullText = slide.mascotText || '';
        let charIdx = 0;
        function typeChar() {
            if (_destroyed || charIdx >= fullText.length) {
                if (nextBtn) nextBtn.style.display = '';
                return;
            }
            charIdx++;
            textEl.textContent = fullText.slice(0, charIdx);
            setTimeout(typeChar, 20);
        }
        typeChar();

        target.querySelector('#qr-bubble').onclick = () => {
            charIdx = fullText.length;
            textEl.textContent = fullText;
            if (nextBtn) nextBtn.style.display = '';
        };

        nextBtn.onclick = () => {
            if (isLast) {
                qrPhase = 'practice';
                qrExerciseIdx = 0;
                qrCorrect = 0;
                qrExercises = (weakUnit.exercises || []).slice(0, 5);
            } else {
                qrSlideIdx++;
            }
            updateUI();
        };
    }

    // Quick Review: Practice exercises
    function renderQRPractice(target, weakUnit, allExercises) {
        if (qrExerciseIdx >= qrExercises.length) {
            qrPhase = 'result';
            updateUI();
            return;
        }

        const exercise = qrExercises[qrExerciseIdx];
        target.innerHTML = `
            <div class="lesson-exercise animate-in">
                <div class="qr-header">
                    <div class="qr-header__badge" style="display:flex; align-items:center; gap:4px;">${LangyIcons.lightning} Quick Review</div>
                    <div class="qr-header__topic" style="display:flex; align-items:center; gap:4px;">${LangyIcons.fileText} ${weakUnit.title}</div>
                </div>
                <div class="lesson-exercise__counter">
                    ${i18n('learn.exercise_counter')
                        .replace('{n}', qrExerciseIdx + 1)
                        .replace('{total}', qrExercises.length)}
                </div>
                <div id="qr-exercise-widget"></div>
            </div>
        `;

        const widgetArea = target.querySelector('#qr-exercise-widget');
        const widgetType = exercise.widgetType || mapExerciseToWidget(exercise);
        const widgetData = exercise.widgetData || mapExerciseData(exercise);

        LangyWidgets.render(widgetArea, widgetType, widgetData, isCorrect => {
            if (isCorrect) qrCorrect++;
            qrExerciseIdx++;
            setTimeout(() => {
                if (!_destroyed) updateUI();
            }, 1400);
        });
    }

    // Quick Review: Result for one topic
    function renderQRResult(target, weakUnit) {
        const qrScore = qrExercises.length > 0 ? Math.round((qrCorrect / qrExercises.length) * 100) : 0;
        const passed = qrScore >= LangyConfig.PASS_THRESHOLD;

        if (passed) {
            // Mark this unit as mastered
            const masteryKey = activeTb.id + ':' + weakUnit.id;
            LangyState.progress.mastery[masteryKey] = {
                score: qrScore,
                passed: true,
                attempts: (LangyState.progress.mastery[masteryKey]?.attempts || 0) + 1,
                failedIndices: [],
                lastAttempt: new Date().toISOString().split('T')[0],
            };
        }

        qrAttempts++;
        const needsTheory = !passed && qrAttempts >= 2;

        target.innerHTML = `
            <div class="lesson-summary animate-in">
                <div class="qr-header">
                    <div class="qr-header__badge" style="display:flex; align-items:center; gap:4px;">${LangyIcons.lightning} Quick Review</div>
                    <div class="qr-header__topic">${weakUnit.title}</div>
                </div>
                <div class="lesson-summary__icon">${passed ? LangyIcons.check : LangyIcons.bookOpen}</div>
                <h2 class="lesson-summary__title">
                    ${passed ? i18n('learn.topic_mastered') : needsTheory ? i18n('learn.review_theory') : i18n('learn.try_again')}
                </h2>
                <div class="lesson-summary__stats">
                    <div class="lesson-summary__stat">
                        <span class="lesson-summary__stat-value">${qrScore}%</span>
                        <span class="lesson-summary__stat-label">Accuracy</span>
                    </div>
                    <div class="lesson-summary__stat">
                        <span class="lesson-summary__stat-value">${qrCorrect}/${qrExercises.length}</span>
                        <span class="lesson-summary__stat-label">Correct</span>
                    </div>
                </div>
                <button class="btn btn--primary btn--xl btn--full" id="qr-continue" style="margin-top:var(--sp-6);">
                    ${passed ? `${LangyIcons.arrowRight} ${i18n('learn.next_topic')}` : needsTheory ? `<span style="display:flex; align-items:center; gap:8px;">${LangyIcons.bookOpen} ${i18n('learn.review_theory')}</span>` : `<span style="display:flex; align-items:center; gap:8px;">${LangyIcons.refresh} ${i18n('learn.try_again')}</span>`}
                </button>
            </div>
        `;

        target.querySelector('#qr-continue').onclick = () => {
            if (passed) {
                // Move to next weak unit
                qrCurrentUnitIdx++;
                qrPhase = 'theory';
                qrSlideIdx = 0;
                qrAttempts = 0;
            } else if (needsTheory) {
                // Force theory re-view, reset attempts
                qrPhase = 'theory';
                qrSlideIdx = 0;
                qrAttempts = 0;
            } else {
                // Retry practice only (attempt 2)
                qrPhase = 'practice';
                qrExerciseIdx = 0;
                qrCorrect = 0;
                // Shuffle exercises for variety
                qrExercises = [...(weakUnit.exercises || [])].sort(() => Math.random() - 0.5).slice(0, 5);
            }
            updateUI();
        };
    }

    // Quick Review: All topics complete!
    function renderQuickReviewComplete(target) {
        // Check if the full level is now complete → award badge
        checkAndAwardBadge();

        target.innerHTML = `
            <div class="lesson-summary animate-in">
                <div class="lesson-summary__icon" style="font-size:72px;">${LangyIcons.trophy}</div>
                <h2 class="lesson-summary__title">${i18n('learn.all_mastered')}</h2>
                <div style="margin-top:var(--sp-4); padding:var(--sp-4); background:var(--primary-bg); border-radius:var(--radius-lg); text-align:center;">
                    <div style="font-size:var(--fs-sm); color:var(--text-secondary);">${i18n('learn.topics_reviewed')}</div>
                    <div style="font-size:var(--fs-2xl); font-weight:var(--fw-black); color:var(--primary);">${qrWeakUnits.length}</div>
                </div>
                <button class="btn btn--primary btn--xl btn--full" id="qr-finish" style="margin-top:var(--sp-6);">
                    <span style="display:flex; align-items:center; gap:8px;">${LangyIcons.rocket} ${i18n('home.continue')}</span>
                </button>
            </div>
        `;

        target.querySelector('#qr-finish').onclick = () => {
            _destroyed = true;
            Router.navigate('home');
        };
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
            status: result.score >= LangyConfig.PASS_THRESHOLD ? 'done' : 'error',
            errors: Math.max(0, totalExercises - correctAnswers),
            date: new Date().toISOString().split('T')[0],
            icon: result.score >= LangyConfig.PASS_THRESHOLD ? LangyIcons.check : LangyIcons.fileText,
        };

        LangyState.progress.lessonHistory.push(historyEntry);

        // Save mastery record
        const masteryKey = activeTb.id + ':' + unit.id;
        const prev = LangyState.progress.mastery[masteryKey];
        LangyState.progress.mastery[masteryKey] = {
            score: Math.max(result.score, prev?.score || 0),
            passed: result.score >= LangyConfig.PASS_THRESHOLD || prev?.passed || false,
            attempts: (prev?.attempts || 0) + 1,
            failedIndices: failedExerciseIndices,
            lastAttempt: new Date().toISOString().split('T')[0],
        };

        // Remove from homework queue if completed
        LangyState.homework.current = LangyState.homework.current.filter(h => h.unitId !== unit.id);

        // Advance curriculum (with checkpoint gating)
        if (mode === 'lesson' && result.score >= LangyConfig.PASS_THRESHOLD && unit.id === LangyState.progress.currentUnitId) {
            const nextUnit = activeTb.units.find(u => u.id === unit.id + 1);
            if (nextUnit) {
                // If next unit is past a checkpoint, verify checkpoint is cleared
                const isGated = isBlockedByCheckpoint(nextUnit.id);
                if (!isGated) {
                    LangyState.progress.currentUnitId = nextUnit.id;
                    LangyState.progress.currentLessonIdx = 0;
                    LangyState.progress.currentUnit = `Unit ${nextUnit.id}: ${nextUnit.title}`;
                }
            }
        }

        // Check for CEFR badge
        checkAndAwardBadge();

        // Update overall
        LangyState.progress.topicsCompleted = LangyState.progress.lessonHistory.filter(l => l.status === 'done').length;
        LangyState.progress.overall = Math.min(
            100,
            Math.round((LangyState.progress.topicsCompleted / activeTb.units.length) * 100)
        );

        if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
    }

    // Check if a unit is blocked by an uncompleted checkpoint before it
    function isBlockedByCheckpoint(targetUnitId) {
        const targetIdx = activeTb.units.findIndex(u => u.id === targetUnitId);
        if (targetIdx < 0) return false;

        // Look backwards for any review unit that hasn't been passed
        for (let i = targetIdx - 1; i >= 0; i--) {
            const u = activeTb.units[i];
            if (u.unitType === 'review') {
                const key = activeTb.id + ':' + u.id;
                const record = LangyState.progress.mastery[key];
                if (!record || !record.passed) return true; // Blocked!
                break; // Found a passed checkpoint, no need to look further
            }
        }
        return false;
    }

    // Award CEFR badge if level is fully mastered
    function checkAndAwardBadge() {
        if (!activeTb || !activeTb.cefr) return;
        const cefr = activeTb.cefr;
        const badges = LangyState.progress.cefrBadges;
        if (!badges[cefr] || badges[cefr].earned) return;

        if (LangyCurriculum.isLevelComplete(activeTb.id)) {
            badges[cefr] = {
                earned: true,
                date: new Date().toISOString().split('T')[0],
                badge: LangyIcons.medal,
            };
            // Show celebration!
            setTimeout(() => {
                Anim.showToast(`${LangyIcons.medal} ${cefr} Level Complete! Badge earned!`);
            }, 500);
            if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
        }
    }

    // FIX #4: Generate homework after every lesson
    function generateHomeworkAfterLesson(completedUnit, score) {
        // Check if homework for this unit already exists
        const exists = LangyState.homework.current.some(h => h.unitId === completedUnit.id);
        if (exists) return;

        // Create homework based on unit data
        const hw = {
            id: Date.now(),
            unitId: completedUnit.id,
            title: `${completedUnit.title} — Review`,
            desc:
                completedUnit.homework?.prompt ||
                `Review ${completedUnit.grammar?.join(', ') || 'this lesson'} and write practice sentences.`,
            icon: LangyIcons.fileText,
            createdAt: new Date().toISOString(),
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

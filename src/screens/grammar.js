/* ============================================
   SCREEN: GRAMMAR — Structured Rule Reference & Practice
   Browse grammar topics by CEFR level, see explanations,
   examples, and jump to practice exercises.
   ============================================ */

// Grammar topic metadata: explanation, why it matters, real-use examples
const GRAMMAR_TOPICS = {
    A1: [
        { key: 'verb_be', rule: 'Verb "Be"', why: 'Foundation of every English sentence', explain: 'Use "am" with I, "is" with he/she/it, "are" with you/we/they.', examples: ['I am a student.', 'She is from Russia.', 'They are happy.'] },
        { key: 'articles', rule: 'Articles a/an', why: 'Used before almost every noun', explain: 'Use "a" before consonant sounds, "an" before vowel sounds.', examples: ['a book', 'an apple', 'an hour'] },
        { key: 'possessives', rule: 'Possessive Adjectives', why: 'Talking about what belongs to whom', explain: 'my, your, his, her, its, our, their — placed before the noun.', examples: ['My name is Tom.', 'Their house is big.'] },
        { key: 'present_simple', rule: 'Present Simple', why: 'Describing habits and facts', explain: 'Add -s/-es for he/she/it. Use do/does for questions and negatives.', examples: ['She goes to work.', 'I don\'t like fish.', 'Does he speak French?'] },
        { key: 'prepositions_time', rule: 'Prepositions of Time', why: 'Saying when things happen', explain: 'at + time, in + month/year, on + day/date.', examples: ['at 7 o\'clock', 'in March', 'on Monday'] },
        { key: 'prepositions_place', rule: 'Prepositions of Place', why: 'Describing where things are', explain: 'in = inside, on = surface, at = specific point, under = below.', examples: ['in the bag', 'on the table', 'at the station'] },
        { key: 'present_continuous', rule: 'Present Continuous', why: 'Talking about right now', explain: 'am/is/are + verb-ing for actions happening at this moment.', examples: ['I am reading.', 'She is cooking dinner.'] },
        { key: 'past_simple', rule: 'Past Simple', why: 'Telling stories about the past', explain: 'Regular: add -ed. Irregular: special forms (went, made, had).', examples: ['I watched TV.', 'She went home.', 'Did you enjoy it?'] },
        { key: 'can_cant', rule: 'Can / Can\'t', why: 'Expressing ability and permission', explain: 'can = able to / allowed. can\'t = unable / not allowed.', examples: ['I can swim.', 'You can\'t park here.'] },
    ],
    A2: [
        { key: 'comparatives', rule: 'Comparatives', why: 'Comparing two things', explain: 'Short adj + -er (bigger). Long adj: more + adj (more expensive).', examples: ['Moscow is bigger than London.', 'This is more interesting.'] },
        { key: 'superlatives', rule: 'Superlatives', why: 'Identifying the most extreme', explain: 'the + short adj + -est (the biggest). the most + long adj.', examples: ['the longest river', 'the most beautiful city'] },
        { key: 'going_to', rule: 'Going to', why: 'Talking about plans', explain: 'am/is/are + going to + verb for planned future actions.', examples: ['I am going to visit London.', 'It\'s going to rain.'] },
        { key: 'will', rule: 'Will', why: 'Instant decisions, promises, predictions', explain: 'will + verb for spontaneous decisions, offers, and predictions.', examples: ['I\'ll help you.', 'I think it will rain.'] },
        { key: 'present_perfect', rule: 'Present Perfect', why: 'Connecting past to present', explain: 'have/has + past participle for experiences and recent events.', examples: ['I have been to Paris.', 'She has just arrived.'] },
        { key: 'countable_uncountable', rule: 'Countable / Uncountable', why: 'Using the right quantity words', explain: 'Countable: a/many/few. Uncountable: some/much/little.', examples: ['How many eggs?', 'How much water?'] },
    ],
    B1: [
        { key: 'past_continuous', rule: 'Past Continuous', why: 'Setting the scene in stories', explain: 'was/were + verb-ing for background actions interrupted by another event.', examples: ['I was sleeping when the phone rang.'] },
        { key: 'first_conditional', rule: 'First Conditional', why: 'Real future possibilities', explain: 'If + present simple, will + verb. For likely future situations.', examples: ['If it rains, we\'ll stay home.'] },
        { key: 'second_conditional', rule: 'Second Conditional', why: 'Imaginary present situations', explain: 'If + past simple, would + verb. For unlikely or hypothetical situations.', examples: ['If I were rich, I would travel.'] },
        { key: 'modals', rule: 'Modal Verbs', why: 'Advice, obligation, possibility', explain: 'should = advice, must = obligation, might = possibility.', examples: ['You should rest.', 'You must wear a seatbelt.'] },
        { key: 'passive', rule: 'Passive Voice', why: 'When the action matters more than who did it', explain: 'be + past participle. Focus shifts to the object.', examples: ['The book was written in 1960.', 'English is spoken here.'] },
        { key: 'used_to', rule: 'Used to', why: 'Past habits that stopped', explain: 'used to + verb for things that were true before but not now.', examples: ['I used to live in Moscow.'] },
        { key: 'for_since', rule: 'For / Since', why: 'Duration with present perfect', explain: 'for + period of time, since + point in time.', examples: ['for ten years', 'since 2015'] },
    ],
    B2: [
        { key: 'narrative_tenses', rule: 'Past Perfect', why: 'Ordering events in the past', explain: 'had + past participle for the earlier of two past events.', examples: ['When I arrived, she had already left.'] },
        { key: 'third_conditional', rule: 'Third Conditional', why: 'Imagining different past outcomes', explain: 'If + had + pp, would have + pp. For unreal past situations.', examples: ['If I had studied, I would have passed.'] },
        { key: 'reported_speech', rule: 'Reported Speech', why: 'Retelling what someone said', explain: 'Shift tenses back: "I am" → he said he was.', examples: ['She said she was tired.'] },
        { key: 'wish', rule: 'Wish', why: 'Expressing regrets and desires', explain: 'wish + past simple (present), wish + had + pp (past).', examples: ['I wish I were taller.', 'I wish I had studied harder.'] },
        { key: 'relative_clauses', rule: 'Relative Clauses', why: 'Adding detail to sentences', explain: 'who (people), which (things), where (places).', examples: ['The woman who won...', 'The restaurant where we met...'] },
    ],
    C1: [
        { key: 'inversion', rule: 'Inversion', why: 'Emphasis in formal/literary English', explain: 'After negative adverbs: Never have I seen... Seldom do we...', examples: ['Never have I seen such beauty.'] },
        { key: 'modal_perfects', rule: 'Modal Perfects', why: 'Deduction and criticism about the past', explain: 'must have = certain, might have = possible, should have = criticism.', examples: ['She must have left early.', 'You should have told me.'] },
        { key: 'mixed_conditionals', rule: 'Mixed Conditionals', why: 'Connecting past causes to present results', explain: 'If + had + pp, would + verb (now). Mixing 2nd and 3rd conditional.', examples: ['If I had studied medicine, I would be a doctor now.'] },
        { key: 'cleft_sentences', rule: 'Cleft Sentences', why: 'Emphasizing specific information', explain: 'What... is/was... or It was... that... for emphasis.', examples: ['What annoys me is the noise.', 'It was John who called.'] },
    ],
};

function renderGrammar(container) {
    const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
    const userLevel = (LangyState.user?.level || 'B1').substring(0, 2);
    const activeLevel = ScreenState.get('grammarLevel', userLevel);
    const activeTopic = ScreenState.get('grammarTopic', null);

    if (activeTopic) {
        renderGrammarTopic(container, activeTopic, activeLevel, lang);
        return;
    }

    const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
    const levelNames = { A1: 'Beginner', A2: 'Elementary', B1: 'Intermediate', B2: 'Upper-Intermediate', C1: 'Advanced' };
    const topics = GRAMMAR_TOPICS[activeLevel] || GRAMMAR_TOPICS.B1;

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="grammar-back">${LangyIcons.back}</div>
                <div class="nav-header__title">${{ en: 'Grammar & Rules', ru: 'Грамматика', es: 'Gramática' }[lang]}</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: var(--sp-3) var(--sp-6) var(--sp-2); text-align:center;">
                <p class="text-secondary text-sm">${{ en: 'Understand how English works', ru: 'Поймите, как устроен английский', es: 'Entiende cómo funciona el inglés' }[lang]}</p>
            </div>

            <!-- Level selector -->
            <div style="padding: 0 var(--sp-4) var(--sp-4); overflow-x:auto; -webkit-overflow-scrolling:touch;">
                <div style="display:flex; gap:var(--sp-2); min-width:max-content;">
                    ${levels.map(lv => `
                        <button class="badge ${lv === activeLevel ? 'badge--primary' : ''}" data-level="${lv}" style="cursor:pointer; padding:6px 14px; white-space:nowrap; ${lv === userLevel ? 'border:1px solid var(--primary);' : ''}">
                            ${lv} ${lv === userLevel ? '★' : ''}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div style="padding: 0 var(--sp-2) var(--sp-2);">
                <div style="text-align:center; font-size:var(--fs-xs); color:var(--text-tertiary); margin-bottom:var(--sp-3);">
                    ${activeLevel} · ${levelNames[activeLevel]} · ${topics.length} ${{ en: 'topics', ru: 'тем', es: 'temas' }[lang]}
                </div>
            </div>

            <!-- English Curriculum Context -->
            ${(() => {
                if (typeof LangyTarget === 'undefined' || LangyTarget.getCode() !== 'en') return '';
                if (typeof LangyCurriculum === 'undefined') return '';
                const tb = LangyCurriculum.getActive();
                if (!tb) return '';
                const unitId = LangyState.progress?.currentUnitId || 1;
                const curUnit = tb.units?.find(u => u.id === unitId);
                if (!curUnit) return '';
                const unitGrammar = curUnit.grammar || [];
                // Check which grammar topics are covered in the active level view
                const relevantTopics = topics.filter(t => unitGrammar.some(g => t.key.includes(g.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')) || t.rule.toLowerCase().includes(g.split(' ')[0].toLowerCase())));
                if (activeLevel !== (tb.cefr || '').substring(0,2)) return ''; // Only show when viewing user's level
                return `
            <div style="padding:0 var(--sp-5) var(--sp-3);">
                <div style="padding:var(--sp-2) var(--sp-3); background:rgba(16,185,129,0.04); border:1px solid rgba(16,185,129,0.12); border-radius:var(--radius-md); display:flex; align-items:flex-start; gap:8px;">
                    <span style="color:#10B981; flex-shrink:0; font-size:14px; line-height:1.4;">${LangyIcons.bookOpen}</span>
                    <div style="flex:1; min-width:0;">
                        <div style="font-size:9px; text-transform:uppercase; letter-spacing:0.5px; color:#10B981; line-height:1;">${{ en: 'Your curriculum', ru: 'Ваша программа', es: 'Tu currículo' }[lang]} · ${tb.cefr}</div>
                        <div style="font-size:10px; color:var(--text-secondary); line-height:1.4; margin-top:2px;">${{ en: 'Unit', ru: 'Урок', es: 'Unidad' }[lang]} ${unitId}: ${curUnit.title}${unitGrammar.length ? ` — ${unitGrammar.join(', ')}` : ''}</div>
                        ${relevantTopics.length > 0 ? `<div style="font-size:9px; color:#10B981; margin-top:3px;">${LangyIcons.target} ${relevantTopics.length} ${{ en: 'topic(s) active in your current unit', ru: 'тем(ы) в текущем уроке', es: 'tema(s) activo(s) en tu unidad' }[lang]}</div>` : ''}
                    </div>
                </div>
            </div>`;
            })()}

            <!-- Topic list -->
            <div style="padding: 0 var(--sp-5) var(--sp-8); display:flex; flex-direction:column; gap:var(--sp-2);">
                ${topics.map((t, i) => `
                    <div class="homework-card grammar-topic-card" data-topic-key="${t.key}" data-topic-idx="${i}" style="animation-delay:${i * 40}ms;">
                        <div class="homework-card__icon" style="background:rgba(59,130,246,0.08); color:#3B82F6;">${LangyIcons.bookOpen}</div>
                        <div class="homework-card__info">
                            <div class="homework-card__title">${t.rule}</div>
                            <div class="homework-card__meta">${t.why}</div>
                        </div>
                        <div style="color:var(--text-tertiary);">${LangyIcons.arrowRight}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    container.querySelector('#grammar-back')?.addEventListener('click', () => Router.navigate('results'));

    container.querySelectorAll('[data-level]').forEach(btn => {
        btn.addEventListener('click', () => {
            ScreenState.set('grammarLevel', btn.dataset.level);
            ScreenState.set('grammarTopic', null);
            renderGrammar(container);
        });
    });

    container.querySelectorAll('.grammar-topic-card').forEach(card => {
        card.addEventListener('click', () => {
            ScreenState.set('grammarTopic', card.dataset.topicKey);
            renderGrammar(container);
        });
    });

    setTimeout(() => Anim.staggerChildren(container, '.grammar-topic-card'), 80);
}

function renderGrammarTopic(container, topicKey, level, lang) {
    const topics = GRAMMAR_TOPICS[level] || GRAMMAR_TOPICS.B1;
    const topic = topics.find(t => t.key === topicKey);
    if (!topic) { ScreenState.set('grammarTopic', null); renderGrammar(container); return; }

    // Get practice exercises from grammar bank
    const bankLevel = LangyGrammarBank[level];
    const exercises = bankLevel && bankLevel[topicKey] ? bankLevel[topicKey] : [];
    const sampleExercise = exercises.length > 0 ? exercises[Math.floor(Math.random() * exercises.length)] : null;

    // Connection labels
    const connections = [];
    connections.push({ icon: LangyIcons.target, label: { en: 'Practice in Lessons', ru: 'Практика в уроках', es: 'Practica en lecciones' }[lang], route: 'learning' });
    connections.push({ icon: LangyIcons.send, label: { en: 'Use in Writing', ru: 'Применить в письме', es: 'Usar en escritura' }[lang], route: 'homework' });
    if (exercises.length > 2) {
        connections.push({ icon: LangyIcons.zap, label: { en: 'Grammar Duel', ru: 'Грамматический бой', es: 'Duelo de gramática' }[lang], route: 'duels' });
    }

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="topic-back">${LangyIcons.back}</div>
                <div class="nav-header__title">${topic.rule}</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: var(--sp-4) var(--sp-5) var(--sp-8); display:flex; flex-direction:column; gap:var(--sp-5);">

                <!-- Why it matters -->
                <div class="card" style="padding:var(--sp-4); border-left:3px solid var(--primary); background:rgba(59,130,246,0.03);">
                    <div style="font-size:var(--fs-xs); font-weight:var(--fw-bold); color:var(--primary); margin-bottom:var(--sp-1); display:flex; align-items:center; gap:6px;">
                        ${LangyIcons.zap} ${{ en: 'Why it matters', ru: 'Почему это важно', es: 'Por qué importa' }[lang]}
                    </div>
                    <div style="font-size:var(--fs-sm); color:var(--text-secondary);">${topic.why}</div>
                </div>

                <!-- Explanation -->
                <div>
                    <h4 style="margin-bottom:var(--sp-2); display:flex; align-items:center; gap:8px;">
                        <span style="color:var(--primary);">${LangyIcons.bookOpen}</span>
                        ${{ en: 'How it works', ru: 'Как это работает', es: 'Cómo funciona' }[lang]}
                    </h4>
                    <div class="card card--flat" style="padding:var(--sp-4);">
                        <div style="font-size:var(--fs-sm); color:var(--text-primary); line-height:1.7;">${topic.explain}</div>
                    </div>
                </div>

                <!-- Examples -->
                <div>
                    <h4 style="margin-bottom:var(--sp-2); display:flex; align-items:center; gap:8px;">
                        <span style="color:#F59E0B;">${LangyIcons.globe}</span>
                        ${{ en: 'Real examples', ru: 'Примеры', es: 'Ejemplos reales' }[lang]}
                    </h4>
                    <div style="display:flex; flex-direction:column; gap:var(--sp-2);">
                        ${topic.examples.map(ex => `
                            <div class="card card--flat grammar-ex" data-text="${escapeHTML(ex)}" style="padding:var(--sp-3); border-left:3px solid rgba(245,158,11,0.3); cursor:pointer; display:flex; align-items:center; gap:var(--sp-2);">
                                <span style="color:#F59E0B; font-size:14px; flex-shrink:0;">${LangyIcons.volume}</span>
                                <div style="font-size:var(--fs-sm); font-style:italic; color:var(--text-primary);">${ex}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Quick quiz (if exercises exist) -->
                ${sampleExercise ? `
                <div>
                    <h4 style="margin-bottom:var(--sp-2); display:flex; align-items:center; gap:8px;">
                        <span style="color:var(--accent-dark);">${LangyIcons.target}</span>
                        ${{ en: 'Quick check', ru: 'Быстрая проверка', es: 'Comprobación rápida' }[lang]}
                    </h4>
                    <div class="card" style="padding:var(--sp-4); border:1px solid rgba(16,185,129,0.15); background:rgba(16,185,129,0.03);">
                        <div style="font-size:var(--fs-sm); color:var(--text-primary); margin-bottom:var(--sp-3); line-height:1.6;">${sampleExercise.template}</div>
                        <div id="quiz-options" style="display:flex; flex-wrap:wrap; gap:var(--sp-2);">
                            ${sampleExercise.options.map(opt => `
                                <button class="btn btn--ghost btn--sm quiz-opt" data-opt="${opt}" data-correct="${opt === sampleExercise.answer ? '1' : '0'}" style="min-width:60px;">${opt}</button>
                            `).join('')}
                        </div>
                        <div id="quiz-feedback" style="margin-top:var(--sp-2); font-size:var(--fs-xs); min-height:20px;"></div>
                    </div>
                </div>
                ` : ''}

                <!-- Practice connections -->
                <div>
                    <h4 style="margin-bottom:var(--sp-2); display:flex; align-items:center; gap:8px;">
                        <span style="color:var(--primary);">${LangyIcons.arrowRight}</span>
                        ${{ en: 'Practice this rule', ru: 'Практикуйте это правило', es: 'Practica esta regla' }[lang]}
                    </h4>
                    <div style="display:flex; flex-direction:column; gap:var(--sp-2);">
                        ${connections.map(c => `
                            <div class="homework-card grammar-conn" data-route="${c.route}" style="cursor:pointer;">
                                <div class="homework-card__icon" style="background:var(--primary-bg); color:var(--primary);">${c.icon}</div>
                                <div class="homework-card__info">
                                    <div class="homework-card__title" style="font-size:var(--fs-sm);">${c.label}</div>
                                </div>
                                <div style="color:var(--text-tertiary);">${LangyIcons.arrowRight}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Exercise count -->
                ${exercises.length > 0 ? `
                <div style="text-align:center; font-size:var(--fs-xs); color:var(--text-tertiary); padding-bottom:var(--sp-4);">
                    ${exercises.length} ${{ en: 'exercises available for this topic', ru: 'упражнений по этой теме', es: 'ejercicios disponibles para este tema' }[lang]}
                </div>
                ` : ''}
            </div>
        </div>
    `;

    container.querySelector('#topic-back')?.addEventListener('click', () => {
        ScreenState.set('grammarTopic', null);
        renderGrammar(container);
    });

    // Quick quiz interaction
    container.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            const fb = container.querySelector('#quiz-feedback');
            const isCorrect = btn.dataset.correct === '1';
            container.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
            btn.style.background = isCorrect ? 'var(--accent-bg)' : 'var(--danger-bg)';
            btn.style.borderColor = isCorrect ? 'var(--accent-dark)' : 'var(--danger)';
            btn.style.color = isCorrect ? 'var(--accent-dark)' : 'var(--danger)';
            if (!isCorrect) {
                const correctBtn = container.querySelector('.quiz-opt[data-correct="1"]');
                if (correctBtn) { correctBtn.style.background = 'var(--accent-bg)'; correctBtn.style.borderColor = 'var(--accent-dark)'; correctBtn.style.color = 'var(--accent-dark)'; }
            }
            if (fb) fb.innerHTML = isCorrect
                ? `<span style="color:var(--accent-dark);">${LangyIcons.check} ${{ en: 'Correct!', ru: 'Правильно!', es: '¡Correcto!' }[lang]}</span>`
                : `<span style="color:var(--danger);">${LangyIcons.x} ${{ en: 'The answer is:', ru: 'Ответ:', es: 'La respuesta es:' }[lang]} <strong>${sampleExercise.answer}</strong></span>`;
            // Voice: speak the completed sentence with the correct answer
            if (typeof LangyVoice !== 'undefined') {
                const fullSentence = sampleExercise.template.replace(/_{2,}|\.\.\./g, sampleExercise.answer);
                LangyVoice.speakCorrection(fullSentence, 400);
            }
        });
    });

    // Grammar examples: tap to hear
    container.querySelectorAll('.grammar-ex').forEach(el => {
        el.addEventListener('click', () => {
            if (typeof LangyVoice !== 'undefined') LangyVoice.sayTeacher(el.dataset.text);
        });
    });

    // Practice connections
    container.querySelectorAll('.grammar-conn').forEach(c => {
        c.addEventListener('click', () => Router.navigate(c.dataset.route));
    });
}

Router.register('grammar', renderGrammar);

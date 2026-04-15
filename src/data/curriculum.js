/* ============================================
   LANGY — FULL CURRICULUM DATA v2
   Optimized: 89 units across A1-C2
   Types: 📗 Grammar · 🗣️ Situational · 🎤 Pronunciation · 🔄 Review
   ============================================ */

const LangyCurriculum = {
    activeTextbookId: null,
    targetLanguage: 'en',

    textbooks: [

    // ═══════════════════════════════════════════
    // A1 — BEGINNER (18 units)
    // ═══════════════════════════════════════════
    {
        id: 'a1_beginner',
        title: 'A1 — Beginner',
        level: 'A1',
        cefr: 'A1',
        methodology: 'Introduction to English. Basic greetings, verb BE, Present Simple, Past Simple. Focus on survival English.',
        units: [
            // ── Unit 1: Verb BE ──
            {
                id: 1,
                title: 'Verb BE: all forms',
                desc: 'am / is / are — positive, negative, questions. Greetings, numbers 0-20, countries.',
                unitType: 'grammar',
                grammar: ['verb be: am/is/are', 'positive and negative', 'yes/no questions'],
                vocab: ['greetings', 'numbers 0-20', 'countries', 'nationalities'],
                homework: { prompt: 'Write 5 sentences about yourself and your friends using am, is, are.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Welcome to your first English lesson! The most important verb is 'to be'. It has 3 forms: AM, IS, ARE. Let's learn them!",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'compare',
                        mascotText: "Each subject has its own form of BE. Look at this table — it's the most important thing in A1!",
                        mascotEmotion: 'happy',
                        left: { label: 'Subject', items: ['I', 'You / We / They', 'He / She / It'] },
                        right: { label: 'Verb BE', items: ['am', 'are', 'is'] }
                    },
                    {
                        type: 'examples',
                        mascotText: "Now let's see BE in action with real sentences:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'I + student', past: "I am a student", highlight: 'am' },
                            { base: 'You + from', past: "You are from Brazil", highlight: 'are' },
                            { base: 'He + teacher', past: "He is a teacher", highlight: 'is' },
                            { base: 'They + happy', past: "They are happy", highlight: 'are' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "Quick check! 'She ___ a doctor.' Which is correct?",
                        mascotEmotion: 'thinking',
                        options: ['am', 'is', 'are'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "People almost always use short forms in speech: I'm, you're, he's, she's, it's, we're, they're. Learn them!",
                        mascotEmotion: 'happy',
                        tipText: "I'm = I am · You're = You are · He's = He is · She's = She is · We're = We are · They're = They are"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct form', sentence: 'I ___ from London.', options: ['am', 'is', 'are'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct form', sentence: 'They ___ students.', options: ['am', 'is', 'are'], correct: 2 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct form', sentence: 'He ___ a teacher.', options: ['am', 'is', 'are'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Put the words in order', words: ['is', 'she', 'from', 'Japan'], correct: ['she', 'is', 'from', 'Japan'] } },
                    { type: 'word-shuffle', data: { instruction: 'Put the words in order', words: ['are', 'we', 'happy'], correct: ['we', 'are', 'happy'] } },
                    { type: 'match-pairs', data: { instruction: 'Match subject with verb BE', pairs: [{ left: 'I', right: 'am' }, { left: 'He', right: 'is' }, { left: 'You', right: 'are' }, { left: 'They', right: 'are' }] } },
                    { type: 'type-translation', data: { instruction: 'Translate to English', sourceText: 'Я студент.', fromLang: 'RU', toLang: 'EN', answer: 'I am a student' } },
                    { type: 'listen-type', data: { instruction: 'Listen and type', text: 'Hello, my name is Alex.', hint: 'Start with a capital letter.' } },
                    { type: 'fill-bubble', data: { instruction: 'Negative form: She ___ a doctor.', sentence: 'She ___ a doctor. (negative)', options: ["isn't", "aren't", "am not"], correct: 0 } },
                    { type: 'speak-aloud', data: { instruction: 'Say this aloud:', phrase: "Hi! I'm Alex. I'm from Russia. Nice to meet you!" } }
                ]
            },

            // ── Unit 2: Questions with BE ──
            {
                id: 2,
                title: 'Questions: Wh- and How',
                desc: 'What, Where, How old + be. Phone numbers, numbers to 100.',
                unitType: 'grammar',
                grammar: ['Wh- questions with be', 'How old/How are you'],
                vocab: ['phone numbers', 'numbers 11-100', 'personal information'],
                homework: { prompt: 'Write 5 questions using What, Where, How.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Now you know AM, IS, ARE. Let's learn to ASK questions! We use question words: WHAT, WHERE, HOW, WHO.",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "In questions, the verb BE comes BEFORE the subject. Look:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'What + name', past: "What is your name?", highlight: 'is' },
                            { base: 'Where + from', past: "Where are you from?", highlight: 'are' },
                            { base: 'How old', past: "How old is she?", highlight: 'is' },
                            { base: 'Who + he', past: "Who is he?", highlight: 'is' }
                        ]
                    },
                    {
                        type: 'vocab-intro',
                        mascotText: "Let's learn numbers 10-100. You'll need them for phone numbers and age!",
                        mascotEmotion: 'happy',
                        words: [
                            { en: '10 — ten', ru: '10' },
                            { en: '20 — twenty', ru: '20' },
                            { en: '30 — thirty', ru: '30' },
                            { en: '50 — fifty', ru: '50' },
                            { en: '100 — one hundred', ru: '100' },
                            { en: '0 — zero / oh', ru: '0' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "'___ is your phone number?' — Which question word?",
                        mascotEmotion: 'thinking',
                        options: ['Where', 'What', 'Who'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "Yes/No questions are simple: just swap the order! 'You are happy' → 'Are you happy?' Easy!",
                        mascotEmotion: 'happy',
                        tipText: "Statement: You are 25. → Question: Are you 25? Just swap subject and verb!"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the question word', sentence: '___ is your name?', options: ['What', 'Where', 'How'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the question word', sentence: '___ are you from?', options: ['What', 'Where', 'Who'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a question', words: ['old', 'how', 'you', 'are'], correct: ['how', 'old', 'are', 'you'] } },
                    { type: 'word-shuffle', data: { instruction: 'Make a question', words: ['is', 'where', 'she', 'from'], correct: ['where', 'is', 'she', 'from'] } },
                    { type: 'fill-bubble', data: { instruction: 'Answer: How old are you?', sentence: 'I ___ 25 years old.', options: ['am', 'is', 'are'], correct: 0 } },
                    { type: 'match-pairs', data: { instruction: 'Match questions with answers', pairs: [{ left: 'What is your name?', right: 'Alex' }, { left: 'Where are you from?', right: 'Brazil' }, { left: 'How old are you?', right: '25' }, { left: 'How are you?', right: 'Fine, thanks' }] } },
                    { type: 'listen-type', data: { instruction: 'Listen and type', text: 'What is your phone number?', hint: 'Question mark at the end.' } },
                    { type: 'type-translation', data: { instruction: 'Translate to English', sourceText: 'Откуда ты?', fromLang: 'RU', toLang: 'EN', answer: 'Where are you from?' } },
                    { type: 'speak-aloud', data: { instruction: 'Ask these questions aloud:', phrase: "What's your name? Where are you from? How old are you?" } },
                    { type: 'fill-bubble', data: { instruction: '"___ is he?" — "He is my brother."', sentence: '___ is he?', options: ['What', 'Where', 'Who'], correct: 2 } }
                ]
            },

            // ── Unit 3: At a café ──
            {
                id: 3,
                title: '🗣️ At a café: first order',
                desc: 'Order food and drinks. Polite phrases. Prices.',
                unitType: 'situational',
                grammar: ['Can I have...?', 'How much is...?'],
                vocab: ['coffee', 'tea', 'water', 'sandwich', 'cake', 'please', 'thank you', 'prices'],
                homework: { prompt: 'Write a dialogue: ordering coffee and cake at a café.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Time for a real situation! Imagine you're at a café in London. Let's learn how to order food and drinks!",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "Here are the key phrases you need at a café:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'Order', past: "Can I have a coffee, please?", highlight: 'Can I have' },
                            { base: 'Price', past: "How much is it?", highlight: 'How much' },
                            { base: 'Thanks', past: "Thank you! / Thanks!", highlight: 'Thank you' },
                            { base: 'Size', past: "A large coffee, please.", highlight: 'large' }
                        ]
                    },
                    {
                        type: 'vocab-intro',
                        mascotText: "Let's learn café vocabulary!",
                        mascotEmotion: 'happy',
                        words: [
                            { en: 'coffee', ru: 'кофе' },
                            { en: 'tea', ru: 'чай' },
                            { en: 'water', ru: 'вода' },
                            { en: 'sandwich', ru: 'сэндвич' },
                            { en: 'cake', ru: 'торт/пирожное' },
                            { en: 'the bill', ru: 'счёт' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "You want to order a tea. What do you say?",
                        mascotEmotion: 'thinking',
                        options: ['I want tea.', 'Give me tea.', 'Can I have a tea, please?'],
                        correct: 2
                    },
                    {
                        type: 'tip',
                        mascotText: "'Can I have...' is the magic phrase for ordering ANYTHING in English. It works in cafés, restaurants, shops — everywhere!",
                        mascotEmotion: 'happy',
                        tipText: "Can I have a coffee? · Can I have the bill? · Can I have a table for two?"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Complete the order', sentence: 'Can I ___ a coffee, please?', options: ['have', 'get', 'want'], correct: 0 } },
                    { type: 'word-shuffle', data: { instruction: 'Make an order', words: ['have', 'can', 'I', 'a', 'tea', 'please'], correct: ['can', 'I', 'have', 'a', 'tea', 'please'] } },
                    { type: 'fill-bubble', data: { instruction: 'Ask for the price', sentence: 'How ___ is it?', options: ['many', 'much', 'old'], correct: 1 } },
                    { type: 'match-pairs', data: { instruction: 'Match English with translation', pairs: [{ left: 'coffee', right: 'кофе' }, { left: 'the bill', right: 'счёт' }, { left: 'cake', right: 'торт' }, { left: 'water', right: 'вода' }] } },
                    { type: 'type-translation', data: { instruction: 'Translate to English', sourceText: 'Можно чай, пожалуйста?', fromLang: 'RU', toLang: 'EN', answer: 'Can I have a tea, please?' } },
                    { type: 'listen-type', data: { instruction: 'Listen and type', text: 'Can I have a large coffee, please?', hint: 'Polite request' } },
                    { type: 'fill-bubble', data: { instruction: 'Waiter says: "Anything else?" You say:', sentence: 'You answer...', options: ['No, thank you.', 'No want.', 'Is finished.'], correct: 0 } },
                    { type: 'speak-aloud', data: { instruction: 'Role-play: Order at a café', phrase: "Hi! Can I have a coffee and a sandwich, please? How much is it? Thank you!" } }
                ]
            },

            // ── Unit 4: Nouns, a/an, this/that ──
            {
                id: 4,
                title: 'Nouns: singular, plural, a/an',
                desc: 'Singular/plural nouns. Articles a/an. this/that/these/those.',
                unitType: 'grammar',
                grammar: ['plural -s/-es', 'a / an', 'this/that/these/those'],
                vocab: ['everyday objects', 'classroom items', 'souvenirs'],
                homework: { prompt: 'Write 10 sentences using a/an and plurals.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Let's learn about NOUNS — words for things! In English, one thing needs 'a' or 'an' before it. More than one? Add '-s'!",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "Use 'a' before consonant sounds, 'an' before vowel sounds (a, e, i, o, u):",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'book', past: "a book → books", highlight: 'a' },
                            { base: 'apple', past: "an apple → apples", highlight: 'an' },
                            { base: 'university', past: "a university", highlight: 'a (sound: /juː/)' },
                            { base: 'hour', past: "an hour", highlight: "an (silent h)" }
                        ]
                    },
                    {
                        type: 'compare',
                        mascotText: "This/that = singular (one). These/those = plural (many). This/these = near. That/those = far.",
                        mascotEmotion: 'happy',
                        left: { label: 'Near ☝️', items: ['this book', 'these books'] },
                        right: { label: 'Far 👉', items: ['that book', 'those books'] }
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "'___ is ___ umbrella.' — Choose correctly!",
                        mascotEmotion: 'thinking',
                        options: ['It is a umbrella', 'It is an umbrella', 'It is the umbrella'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "Irregular plurals exist! man→men, woman→women, child→children, person→people. Memorize these 4!",
                        mascotEmotion: 'happy',
                        tipText: "man→men · woman→women · child→children · person→people · tooth→teeth · foot→feet"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'a or an?', sentence: 'It is ___ apple.', options: ['a', 'an', 'the'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'a or an?', sentence: 'She is ___ doctor.', options: ['a', 'an', '-'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the plural', sentence: 'one child → two ___', options: ['childs', 'children', 'childes'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Near or far?', sentence: '___ books here are mine. (near)', options: ['This', 'These', 'Those'], correct: 1 } },
                    { type: 'match-pairs', data: { instruction: 'Match singular → plural', pairs: [{ left: 'man', right: 'men' }, { left: 'woman', right: 'women' }, { left: 'tooth', right: 'teeth' }, { left: 'child', right: 'children' }] } },
                    { type: 'word-shuffle', data: { instruction: 'Make a sentence', words: ['are', 'those', 'my', 'books'], correct: ['those', 'are', 'my', 'books'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Это яблоко.', fromLang: 'RU', toLang: 'EN', answer: 'This is an apple' } },
                    { type: 'listen-type', data: { instruction: 'Listen and type', text: 'These are my keys.', hint: 'Plural' } },
                    { type: 'fill-bubble', data: { instruction: 'a or an?', sentence: '___ hour ago', options: ['a', 'an'], correct: 1 } },
                    { type: 'speak-aloud', data: { instruction: 'Say aloud:', phrase: "This is a book. That is an apple. These are my keys. Those are your bags." } }
                ]
            },

            // ── Unit 5: Possessives + Adjectives ──
            {
                id: 5,
                title: 'My, your, his: possessives + adjectives',
                desc: "Possessive adjectives (my/your/his/her). Possessive 's. Basic adjectives.",
                unitType: 'grammar',
                grammar: ['possessive adjectives', "possessive 's", 'adjective + noun'],
                vocab: ['family members', 'colors', 'common adjectives'],
                homework: { prompt: 'Describe your family: names, ages, and one adjective for each person.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Whose is it? In English, we use possessive words: MY, YOUR, HIS, HER, OUR, THEIR. Let's learn them all!",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'compare',
                        mascotText: "Each subject pronoun has a possessive form:",
                        mascotEmotion: 'happy',
                        left: { label: 'Pronoun', items: ['I', 'You', 'He', 'She', 'We', 'They'] },
                        right: { label: 'Possessive', items: ['my', 'your', 'his', 'her', 'our', 'their'] }
                    },
                    {
                        type: 'examples',
                        mascotText: "We also use 's to show possession. John's car = the car of John:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'John + car', past: "John's car", highlight: "'s" },
                            { base: 'My sister + name', past: "My sister's name is Anna", highlight: "'s" },
                            { base: 'The dog + toy', past: "The dog's toy", highlight: "'s" }
                        ]
                    },
                    {
                        type: 'vocab-intro',
                        mascotText: "Family vocabulary! You'll need this to talk about the people you love:",
                        mascotEmotion: 'happy',
                        words: [
                            { en: 'mother / mom', ru: 'мать / мама' },
                            { en: 'father / dad', ru: 'отец / папа' },
                            { en: 'brother', ru: 'брат' },
                            { en: 'sister', ru: 'сестра' },
                            { en: 'husband', ru: 'муж' },
                            { en: 'wife', ru: 'жена' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "'___ name is Maria.' — She is a girl. Which word?",
                        mascotEmotion: 'thinking',
                        options: ['His', 'Her', 'Your'],
                        correct: 1
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the possessive', sentence: 'I love ___ family.', options: ['my', 'me', 'I'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'He is a boy. ___ name is Tom.', sentence: '___ name is Tom.', options: ['Her', 'His', 'He'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: "Possessive 's", sentence: "This is ___.", options: ["Anna book", "Anna's book", "Annas book"], correct: 1 } },
                    { type: 'match-pairs', data: { instruction: 'Match pronoun → possessive', pairs: [{ left: 'I', right: 'my' }, { left: 'she', right: 'her' }, { left: 'we', right: 'our' }, { left: 'they', right: 'their' }] } },
                    { type: 'word-shuffle', data: { instruction: 'Make a sentence', words: ['is', 'her', 'name', 'Maria'], correct: ['her', 'name', 'is', 'Maria'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Это машина Джона.', fromLang: 'RU', toLang: 'EN', answer: "This is John's car" } },
                    { type: 'fill-bubble', data: { instruction: 'Adjective: the car is ___', sentence: 'It is a ___ car.', options: ['red big', 'big red', 'red a big'], correct: 1 } },
                    { type: 'listen-type', data: { instruction: 'Listen and type', text: "My brother's name is Tom.", hint: "Don't forget the apostrophe" } },
                    { type: 'speak-aloud', data: { instruction: 'Tell about your family:', phrase: "My name is... My mother's name is... My father is..." } }
                ]
            },

            // ── Unit 6: Checkpoint 1 ──
            {
                id: 6,
                title: '🔄 Checkpoint 1: Units 1-5',
                desc: 'Review all grammar and vocabulary from units 1-5.',
                unitType: 'review',
                grammar: ['verb be', 'questions', 'a/an', 'possessives'],
                vocab: ['all A1 vocabulary so far'],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'verb BE', sentence: 'She ___ from Italy.', options: ['am', 'is', 'are'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Question word', sentence: '___ old are you?', options: ['What', 'How', 'Where'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Article', sentence: 'It is ___ orange.', options: ['a', 'an'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Possessive', sentence: '___ is your name?', options: ['What', 'Who', 'How'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Plural', sentence: 'one woman → two ___', options: ['womans', 'women', 'womens'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a question', words: ['is', 'what', 'name', 'your'], correct: ['what', 'is', 'your', 'name'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Откуда она?', fromLang: 'RU', toLang: 'EN', answer: 'Where is she from?' } },
                    { type: 'match-pairs', data: { instruction: 'Final review match', pairs: [{ left: 'I', right: 'am' }, { left: 'She', right: 'is' }, { left: 'They', right: 'are' }, { left: 'my', right: 'I' }] } },
                    { type: 'fill-bubble', data: { instruction: 'Order at café', sentence: 'Can I ___ a coffee?', options: ['have', 'has', 'having'], correct: 0 } },
                    { type: 'speak-aloud', data: { instruction: 'Introduce yourself fully:', phrase: "My name is Alex. I'm 25. I'm from Moscow. I'm a student." } }
                ]
            },

            // ── Unit 7: Present Simple +/- ──
            {
                id: 7,
                title: 'Present Simple: I / you / we / they',
                desc: 'Present Simple positive, negative, questions. Daily habits.',
                unitType: 'grammar',
                grammar: ['Present Simple +/-/?', "don't / do you...?"],
                vocab: ['food and drink', 'daily habits', 'common verbs'],
                homework: { prompt: 'Write about your typical day: what you eat, drink, do.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "BE describes what you ARE. Now let's learn what you DO! Present Simple = habits, routines, facts. I eat, I drink, I live.",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "Positive: just use the verb. Negative: add DON'T. Question: start with DO.",
                        mascotEmotion: 'happy',
                        items: [
                            { base: '+', past: "I eat breakfast every day.", highlight: 'eat' },
                            { base: '−', past: "I don't drink coffee.", highlight: "don't" },
                            { base: '?', past: "Do you speak English?", highlight: 'Do' },
                            { base: 'Answer', past: "Yes, I do. / No, I don't.", highlight: 'do' }
                        ]
                    },
                    {
                        type: 'vocab-intro',
                        mascotText: "Key daily verbs — you'll use these every single day:",
                        mascotEmotion: 'happy',
                        words: [
                            { en: 'eat', ru: 'есть' },
                            { en: 'drink', ru: 'пить' },
                            { en: 'live', ru: 'жить' },
                            { en: 'work', ru: 'работать' },
                            { en: 'speak', ru: 'говорить' },
                            { en: 'like', ru: 'нравиться' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "'I ___ like coffee.' — How do we say the negative?",
                        mascotEmotion: 'thinking',
                        options: ["not like", "don't like", "doesn't like"],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "Present Simple is NOT for right now! 'I eat' = I eat regularly. For right now, we'll learn Present Continuous later!",
                        mascotEmotion: 'happy',
                        tipText: "I eat breakfast = everyday habit. I'm eating breakfast = right now (Present Continuous — later!)"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Positive', sentence: 'I ___ in Moscow.', options: ['live', 'lives', 'living'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Negative', sentence: "I ___ like fish.", options: ["don't", "doesn't", "not"], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Question', sentence: '___ you speak English?', options: ['Do', 'Does', 'Are'], correct: 0 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a sentence', words: ['breakfast', 'I', 'eat', 'every', 'day'], correct: ['I', 'eat', 'breakfast', 'every', 'day'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Я не пью кофе.', fromLang: 'RU', toLang: 'EN', answer: "I don't drink coffee" } },
                    { type: 'match-pairs', data: { instruction: 'Match', pairs: [{ left: 'eat', right: 'есть' }, { left: 'drink', right: 'пить' }, { left: 'live', right: 'жить' }, { left: 'work', right: 'работать' }] } },
                    { type: 'fill-bubble', data: { instruction: 'Answer the question: Do you like pizza?', sentence: 'Yes, I ___.', options: ['like', 'do', 'am'], correct: 1 } },
                    { type: 'listen-type', data: { instruction: 'Listen and type', text: "I don't eat meat. I'm vegetarian.", hint: "Contraction: don't" } },
                    { type: 'word-shuffle', data: { instruction: 'Make a question', words: ['like', 'do', 'you', 'pizza'], correct: ['do', 'you', 'like', 'pizza'] } },
                    { type: 'speak-aloud', data: { instruction: 'Talk about your habits:', phrase: "I eat breakfast at 8. I drink tea. I don't drink coffee. I work from home." } }
                ]
            },

            // ── Unit 8: Present Simple he/she/it ──
            {
                id: 8,
                title: 'Present Simple: he / she / it + frequency',
                desc: '3rd person -s. Adverbs of frequency. Daily routines.',
                unitType: 'grammar',
                grammar: ['3rd person -s/-es', "doesn't / does he...?", 'adverbs of frequency'],
                vocab: ['jobs', 'daily routine', 'always/usually/sometimes/never'],
                homework: { prompt: 'Write about a friend: what they do every day.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Important rule! When the subject is HE, SHE, or IT — add -S to the verb! I eat → He eatS. I live → She liveS.",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "For negative and questions with he/she/it, we use DOES (not DO). And the verb goes BACK to normal!",
                        mascotEmotion: 'happy',
                        items: [
                            { base: '+', past: "She works in a bank.", highlight: 'works' },
                            { base: '−', past: "He doesn't like fish.", highlight: "doesn't" },
                            { base: '?', past: "Does she speak French?", highlight: 'Does' },
                            { base: '-es', past: "He watches TV.", highlight: 'watches' }
                        ]
                    },
                    {
                        type: 'compare',
                        mascotText: "How OFTEN? Put these words before the main verb:",
                        mascotEmotion: 'happy',
                        left: { label: 'Frequency', items: ['always', 'usually', 'sometimes', 'never'] },
                        right: { label: 'Meaning', items: ['100%', '~80%', '~50%', '0%'] }
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "'She ___ to work by bus.' — Which is correct?",
                        mascotEmotion: 'thinking',
                        options: ['go', 'goes', 'going'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "Spelling: most verbs add -s (works, eats). Verbs ending in -ch, -sh, -ss, -x, -o add -ES (watches, goes). Consonant+y → -IES (study → studies).",
                        mascotEmotion: 'happy',
                        tipText: "work→works · watch→watches · go→goes · study→studies · have→has (irregular!)"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: '3rd person', sentence: 'She ___ in a hospital.', options: ['work', 'works', 'working'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Negative', sentence: "He ___ like mornings.", options: ["don't", "doesn't", "not"], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Question', sentence: '___ she speak French?', options: ['Do', 'Does', 'Is'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Spelling', sentence: 'He ___ TV every evening.', options: ['watchs', 'watches', 'watch'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Frequency', sentence: 'I ___ eat breakfast. (100%)', options: ['always', 'sometimes', 'never'], correct: 0 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a sentence', words: ['usually', 'she', 'at', 'gets up', '7'], correct: ['she', 'usually', 'gets up', 'at', '7'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Он работает в банке.', fromLang: 'RU', toLang: 'EN', answer: 'He works in a bank' } },
                    { type: 'match-pairs', data: { instruction: 'Match verb forms', pairs: [{ left: 'go', right: 'goes' }, { left: 'watch', right: 'watches' }, { left: 'study', right: 'studies' }, { left: 'have', right: 'has' }] } },
                    { type: 'listen-type', data: { instruction: 'Listen and type', text: "She always gets up early.", hint: 'Frequency word position' } },
                    { type: 'speak-aloud', data: { instruction: 'Describe someone:', phrase: "My friend works in a bank. She usually gets up at 7. She always drinks coffee." } }
                ]
            },

            // ── Unit 9: 🗣️ Talking about yourself ──
            {
                id: 9,
                title: '🗣️ About me: introduction speech',
                desc: 'Combine BE + Present Simple in a connected self-introduction.',
                unitType: 'situational',
                grammar: ['be + Present Simple combined'],
                vocab: ['hobbies', 'free time', 'work', 'introduction phrases'],
                homework: { prompt: 'Record yourself: 1-minute introduction in English.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Now you know BE and Present Simple. Let's combine them to tell people about yourself — like a real introduction!",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "A good introduction has 4 parts: name, origin, job/study, hobby:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: '1. Name', past: "Hi! My name is Alex.", highlight: 'BE' },
                            { base: '2. Origin', past: "I'm from Moscow, Russia.", highlight: 'BE' },
                            { base: '3. Job', past: "I work as a designer.", highlight: 'PS' },
                            { base: '4. Hobby', past: "I like music and travel.", highlight: 'PS' }
                        ]
                    },
                    {
                        type: 'vocab-intro',
                        mascotText: "Hobby vocabulary — what do you do in your free time?",
                        mascotEmotion: 'happy',
                        words: [
                            { en: 'read books', ru: 'читать книги' },
                            { en: 'play sports', ru: 'заниматься спортом' },
                            { en: 'listen to music', ru: 'слушать музыку' },
                            { en: 'travel', ru: 'путешествовать' },
                            { en: 'cook', ru: 'готовить' },
                            { en: 'watch films', ru: 'смотреть фильмы' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "Which sentence uses Present Simple (not BE)?",
                        mascotEmotion: 'thinking',
                        options: ["I am 25 years old.", "I like cooking.", "She is from Italy."],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "When talking about hobbies, use: 'I like + -ing' (I like cooking) or 'I like + noun' (I like music). Both are correct!",
                        mascotEmotion: 'happy',
                        tipText: "I like reading · I like to read · I enjoy cooking · I love music — all correct!"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'BE or Present Simple?', sentence: 'I ___ from Brazil.', options: ['am', 'live', 'come'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'BE or Present Simple?', sentence: 'I ___ as a teacher.', options: ['am', 'work', 'be'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Build an introduction', words: ['name', 'my', 'is', 'and', 'Alex', 'I', 'from', 'am', 'Russia'], correct: ['my', 'name', 'is', 'Alex', 'and', 'I', 'am', 'from', 'Russia'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Мне нравится готовить.', fromLang: 'RU', toLang: 'EN', answer: 'I like cooking' } },
                    { type: 'match-pairs', data: { instruction: 'Match hobbies', pairs: [{ left: 'read', right: 'читать' }, { left: 'cook', right: 'готовить' }, { left: 'travel', right: 'путешествовать' }, { left: 'play sports', right: 'спорт' }] } },
                    { type: 'speak-aloud', data: { instruction: 'Full introduction — say aloud!', phrase: "Hi! My name is Alex. I'm 25 years old. I'm from Moscow. I work as a designer. I like music, travel, and cooking." } }
                ]
            },

            // ── Unit 10: 🎤 Pronunciation ──
            {
                id: 10,
                title: '🎤 Pronunciation: key English sounds',
                desc: 'Sounds that are tricky: /θ/, /ð/, /w/, /v/, /h/. Minimal pairs.',
                unitType: 'pronunciation',
                grammar: [],
                vocab: ['minimal pairs: think-sink, three-free, wine-vine'],
                homework: { prompt: 'Practice saying: think, this, that, the, three, weather, with, worth.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Let's work on sounds! English has some sounds that don't exist in many languages. The famous TH sound, /w/ vs /v/, and the silent /h/!",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'compare',
                        mascotText: "TH has TWO sounds: /θ/ (voiceless — like in 'think') and /ð/ (voiced — like in 'this'):",
                        mascotEmotion: 'thinking',
                        left: { label: '/θ/ voiceless', items: ['think', 'three', 'thanks', 'birthday'] },
                        right: { label: '/ð/ voiced', items: ['this', 'that', 'the', 'weather'] }
                    },
                    {
                        type: 'examples',
                        mascotText: "/w/ and /v/ are DIFFERENT sounds. Listen carefully:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: '/w/', past: "wine, west, want, woman", highlight: 'w' },
                            { base: '/v/', past: "vine, vest, van, very", highlight: 'v' },
                            { base: '/h/', past: "hello, have, house, happy", highlight: 'h' },
                            { base: 'silent h', past: "hour, honest, heir", highlight: '(no sound)' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "Which word has a /θ/ sound (like in 'think')?",
                        mascotEmotion: 'thinking',
                        options: ['the', 'three', 'this'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "For TH: put your tongue between your teeth and blow air. It feels weird, but that's the correct position! Practice in front of a mirror.",
                        mascotEmotion: 'happy',
                        tipText: "👅 Tongue between teeth: think, three, thank you. Practice daily for 2 minutes!"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: '/θ/ or /ð/?', sentence: '"Think" has the sound:', options: ['/θ/ voiceless', '/ð/ voiced'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: '/θ/ or /ð/?', sentence: '"This" has the sound:', options: ['/θ/ voiceless', '/ð/ voiced'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Which has a silent H?', sentence: 'Silent H:', options: ['hello', 'hour', 'happy'], correct: 1 } },
                    { type: 'speak-aloud', data: { instruction: 'Practice TH sounds:', phrase: "Think. Three. Thanks. This. That. The. Weather." } },
                    { type: 'speak-aloud', data: { instruction: 'Practice W vs V:', phrase: "Wine — Vine. West — Vest. Want — Van. Wow — Vow." } },
                    { type: 'listen-type', data: { instruction: 'Listen and type', text: "I think the weather is nice.", hint: 'Two different TH sounds!' } }
                ]
            },

            // ── Unit 11: Can / Can't + Imperatives ──
            {
                id: 11,
                title: "Can / Can't + imperatives",
                desc: 'Abilities, permissions. Imperative mood. Object pronouns.',
                unitType: 'grammar',
                grammar: ['can/can\'t', 'imperatives', 'object pronouns: me/him/her/us/them'],
                vocab: ['abilities', 'requests', 'films', 'directions'],
                homework: { prompt: 'Write 5 things you can do and 5 you can\'t.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "CAN = ability (I can swim) or permission (Can I go?). CAN'T = cannot. Super useful verb! And it NEVER changes — no -s, no -ing!",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "CAN is special: same form for everyone, and the next verb stays in base form:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'Ability', past: "I can swim.", highlight: 'can' },
                            { base: 'Negative', past: "She can't drive.", highlight: "can't" },
                            { base: 'Question', past: "Can you help me?", highlight: 'Can' },
                            { base: 'Permission', past: "Can I sit here?", highlight: 'Can I' }
                        ]
                    },
                    {
                        type: 'compare',
                        mascotText: "Imperatives = commands/instructions. No subject needed! Just the verb:",
                        mascotEmotion: 'happy',
                        left: { label: 'Do ✅', items: ['Open the door.', 'Listen!', 'Come here.'] },
                        right: { label: "Don't ❌", items: ["Don't touch!", "Don't worry.", "Don't be late."] }
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "'She ___ speak 3 languages.' — Can or can't?",
                        mascotEmotion: 'thinking',
                        options: ['cans', 'can', 'is can'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "Object pronouns: I→me, you→you, he→him, she→her, we→us, they→them. 'Call ME', 'Give HIM the book', 'Tell THEM'.",
                        mascotEmotion: 'happy',
                        tipText: "I→me · you→you · he→him · she→her · it→it · we→us · they→them"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Ability', sentence: 'I ___ play the guitar.', options: ['can', 'cans', 'am can'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Negative', sentence: "He ___ cook at all.", options: ["can't", "don't can", "not can"], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Object pronoun', sentence: 'Call ___ tomorrow. (I)', options: ['I', 'me', 'my'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a sentence', words: ['speak', 'can', 'you', 'English'], correct: ['can', 'you', 'speak', 'English'] } },
                    { type: 'fill-bubble', data: { instruction: 'Imperative', sentence: '___ late! (negative)', options: ["Don't be", 'Not be', "No be"], correct: 0 } },
                    { type: 'match-pairs', data: { instruction: 'Pronoun → Object', pairs: [{ left: 'I', right: 'me' }, { left: 'he', right: 'him' }, { left: 'she', right: 'her' }, { left: 'they', right: 'them' }] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Я умею плавать.', fromLang: 'RU', toLang: 'EN', answer: 'I can swim' } },
                    { type: 'speak-aloud', data: { instruction: 'Say aloud:', phrase: "I can swim, but I can't drive. Can you help me, please?" } }
                ]
            },

            // ── Unit 12: Like + -ing ──
            {
                id: 12,
                title: 'Like / Love / Hate + -ing',
                desc: 'Express preferences. Gerund after like/love/hate/enjoy.',
                unitType: 'grammar',
                grammar: ['like/love/hate/enjoy + -ing'],
                vocab: ['hobbies', 'free time activities', 'sports'],
                homework: { prompt: 'Write about 3 things you like, love, and hate doing.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "What do you LIKE doing? After like, love, hate, enjoy — we add a verb with -ING! I like swimming. She loves reading.",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "The formula is: LIKE/LOVE/HATE + verb-ING:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'like', past: "I like cooking.", highlight: 'cooking' },
                            { base: 'love', past: "She loves dancing.", highlight: 'dancing' },
                            { base: 'hate', past: "He hates waking up early.", highlight: 'waking' },
                            { base: 'enjoy', past: "We enjoy travelling.", highlight: 'travelling' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "'I enjoy ___' — which form?",
                        mascotEmotion: 'thinking',
                        options: ['swim', 'swimming', 'to swim'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "like + -ing = 'I like cooking' (general). like + to-infinitive = 'I like to cook on weekends' (specific). Both OK, but -ing is more common!",
                        mascotEmotion: 'happy',
                        tipText: "like cooking = general preference · like to cook = specific choice. Both are grammatically correct!"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Complete', sentence: 'I like ___.', options: ['swim', 'swimming', 'swims'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Complete', sentence: 'She enjoys ___ books.', options: ['read', 'reading', 'reads'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Complete', sentence: 'They hate ___ up early.', options: ['wake', 'waking', 'wakes'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a sentence', words: ['cooking', 'I', 'love', 'Italian', 'food'], correct: ['I', 'love', 'cooking', 'Italian', 'food'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Я люблю путешествовать.', fromLang: 'RU', toLang: 'EN', answer: 'I love travelling' } },
                    { type: 'match-pairs', data: { instruction: 'Match', pairs: [{ left: 'like', right: 'нравится' }, { left: 'love', right: 'обожать' }, { left: 'hate', right: 'ненавидеть' }, { left: 'enjoy', right: 'наслаждаться' }] } },
                    { type: 'speak-aloud', data: { instruction: 'Tell about your preferences:', phrase: "I like reading books. I love cooking. I hate waking up early. I enjoy travelling." } }
                ]
            },

            // ── Unit 13: Checkpoint 2 ──
            {
                id: 13,
                title: '🔄 Checkpoint 2: Units 7-12',
                desc: 'Review Present Simple, can, like + -ing, pronunciation.',
                unitType: 'review',
                grammar: ['Present Simple', 'can/can\'t', 'like + -ing'],
                vocab: ['daily routine', 'hobbies', 'abilities'],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Present Simple', sentence: 'She ___ in a hospital.', options: ['work', 'works', 'working'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Negative PS', sentence: "He ___ like fish.", options: ["don't", "doesn't", "not"], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Can', sentence: '___ you swim?', options: ['Do', 'Can', 'Are'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Like + -ing', sentence: 'I enjoy ___.', options: ['cook', 'cooking', 'cooks'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Frequency', sentence: 'She ___ wakes up late. (0%)', options: ['always', 'sometimes', 'never'], correct: 2 } },
                    { type: 'word-shuffle', data: { instruction: 'Sentence', words: ['love', 'I', 'travelling', 'but', "can't", 'I', 'drive'], correct: ['I', 'love', 'travelling', 'but', 'I', "can't", 'drive'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Она не говорит по-французски.', fromLang: 'RU', toLang: 'EN', answer: "She doesn't speak French" } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Ты умеешь готовить?', fromLang: 'RU', toLang: 'EN', answer: 'Can you cook?' } },
                    { type: 'speak-aloud', data: { instruction: 'Full monologue:', phrase: "I work as a designer. I usually get up at 8. I can speak two languages. I love cooking and travelling." } }
                ]
            },

            // ── Unit 14: Present Continuous ──
            {
                id: 14,
                title: 'Present Continuous: now!',
                desc: 'Actions happening right now. Present Continuous vs Simple.',
                unitType: 'grammar',
                grammar: ['Present Continuous: am/is/are + -ing', 'vs Present Simple'],
                vocab: ['clothes', 'actions', 'travelling'],
                homework: { prompt: 'Write what 5 people around you are doing RIGHT NOW.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Present Simple = habits (I eat breakfast every day). Present Continuous = RIGHT NOW (I'm eating breakfast now). Big difference!",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "Formula: AM/IS/ARE + verb-ING. Easy!",
                        mascotEmotion: 'happy',
                        items: [
                            { base: '+', past: "I am eating lunch now.", highlight: 'am eating' },
                            { base: '−', past: "She isn't working today.", highlight: "isn't working" },
                            { base: '?', past: "Are you listening?", highlight: 'Are...listening' },
                            { base: 'vs PS', past: "I work (habit) vs I'm working (now)", highlight: 'difference' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "Right now, it's 8 PM. 'She ___ TV.' — Which tense?",
                        mascotEmotion: 'thinking',
                        options: ['watches', 'is watching', 'watch'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "Signal words! NOW, RIGHT NOW, AT THE MOMENT = Present Continuous. EVERY DAY, USUALLY, ALWAYS = Present Simple.",
                        mascotEmotion: 'happy',
                        tipText: "now/right now/at the moment → Continuous · every day/usually/always → Simple"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Now', sentence: 'I ___ reading a book now.', options: ['am', 'do', 'is'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Now', sentence: 'She ___ sleeping.', options: ['is', 'does', 'are'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'PS or PC?', sentence: 'I ___ coffee every morning. (habit)', options: ['drink', 'am drinking', 'drinks'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'PS or PC?', sentence: 'Look! It ___! (now)', options: ['rains', 'is raining', 'rain'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Sentence', words: ['is', 'she', 'cooking', 'dinner', 'now'], correct: ['she', 'is', 'cooking', 'dinner', 'now'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Что ты делаешь сейчас?', fromLang: 'RU', toLang: 'EN', answer: 'What are you doing now?' } },
                    { type: 'fill-bubble', data: { instruction: 'Negative PC', sentence: "They ___ working today.", options: ["aren't", "don't", "doesn't"], correct: 0 } },
                    { type: 'speak-aloud', data: { instruction: 'Describe what is happening:', phrase: "I'm sitting at home. I'm studying English. It's raining outside." } }
                ]
            },

            // ── Unit 15: There is / There are ──
            {
                id: 15,
                title: 'There is / There are + prepositions',
                desc: 'Describe places. Prepositions of place. some/any.',
                unitType: 'grammar',
                grammar: ['there is/are', 'some/any', 'prepositions: in/on/under/next to'],
                vocab: ['furniture', 'rooms', 'hotel vocabulary'],
                homework: { prompt: 'Describe your room: what is in it and where things are.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "To describe WHAT EXISTS in a place, use: THERE IS (singular) / THERE ARE (plural). There is a table. There are two chairs.",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "With some/any: SOME in positive, ANY in negatives and questions:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'Singular', past: "There is a lamp on the desk.", highlight: 'There is' },
                            { base: 'Plural', past: "There are some books.", highlight: 'There are' },
                            { base: 'Negative', past: "There aren't any windows.", highlight: "any" },
                            { base: 'Question', past: "Is there a TV?", highlight: 'Is there' }
                        ]
                    },
                    {
                        type: 'vocab-intro',
                        mascotText: "Prepositions of place — WHERE is something?",
                        mascotEmotion: 'happy',
                        words: [
                            { en: 'in', ru: 'в' },
                            { en: 'on', ru: 'на' },
                            { en: 'under', ru: 'под' },
                            { en: 'next to', ru: 'рядом с' },
                            { en: 'between', ru: 'между' },
                            { en: 'behind', ru: 'за/позади' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "'There ___ three cats in the garden.'",
                        mascotEmotion: 'thinking',
                        options: ['is', 'are', 'be'],
                        correct: 1
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'is or are?', sentence: 'There ___ a book on the table.', options: ['is', 'are'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'is or are?', sentence: 'There ___ five people in the room.', options: ['is', 'are'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'some or any?', sentence: 'There aren\'t ___ shops here.', options: ['some', 'any'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Preposition', sentence: 'The cat is ___ the table.', options: ['on', 'in', 'at'], correct: 0 } },
                    { type: 'word-shuffle', data: { instruction: 'Sentence', words: ['is', 'a', 'there', 'park', 'near', 'here'], correct: ['there', 'is', 'a', 'park', 'near', 'here'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'На столе есть книга.', fromLang: 'RU', toLang: 'EN', answer: 'There is a book on the table' } },
                    { type: 'speak-aloud', data: { instruction: 'Describe your room:', phrase: "There is a bed and a desk. There are two windows. There is a lamp on the desk." } }
                ]
            },

            // ── Unit 16: 🗣️ At a hotel ──
            {
                id: 16,
                title: "🗣️ At a hotel / asking directions",
                desc: 'Check into a hotel. Ask and give directions.',
                unitType: 'situational',
                grammar: ['Is there...?', 'Turn left/right, go straight'],
                vocab: ['hotel rooms', 'directions', 'places in a city'],
                homework: { prompt: 'Write a dialogue: checking into a hotel and asking for directions to a restaurant.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "You're travelling! Let's learn how to check into a hotel and find your way around the city.",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "At the hotel reception:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'Check in', past: "I have a reservation. My name is...", highlight: 'reservation' },
                            { base: 'Ask', past: "Is there a restaurant nearby?", highlight: 'Is there' },
                            { base: 'WiFi', past: "What's the WiFi password?", highlight: 'WiFi' },
                            { base: 'Help', past: "Can you help me, please?", highlight: 'Can you' }
                        ]
                    },
                    {
                        type: 'vocab-intro',
                        mascotText: "Direction vocabulary:",
                        mascotEmotion: 'happy',
                        words: [
                            { en: 'turn left', ru: 'поверните налево' },
                            { en: 'turn right', ru: 'поверните направо' },
                            { en: 'go straight', ru: 'идите прямо' },
                            { en: 'next to', ru: 'рядом с' },
                            { en: 'opposite', ru: 'напротив' },
                            { en: 'on the corner', ru: 'на углу' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "You want to find a pharmacy. What do you ask?",
                        mascotEmotion: 'thinking',
                        options: ['Where is pharmacy?', 'Is there a pharmacy near here?', 'I want pharmacy.'],
                        correct: 1
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'At the hotel', sentence: 'I have a ___ for tonight.', options: ['reservation', 'reserve', 'book'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Directions', sentence: '___ left at the traffic lights.', options: ['Turn', 'Go', 'Walk'], correct: 0 } },
                    { type: 'word-shuffle', data: { instruction: 'Ask for directions', words: ['there', 'is', 'a', 'near', 'here', 'supermarket'], correct: ['is', 'there', 'a', 'supermarket', 'near', 'here'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Есть ли ресторан рядом?', fromLang: 'RU', toLang: 'EN', answer: 'Is there a restaurant nearby?' } },
                    { type: 'match-pairs', data: { instruction: 'Match directions', pairs: [{ left: 'turn left', right: 'налево' }, { left: 'go straight', right: 'прямо' }, { left: 'opposite', right: 'напротив' }, { left: 'on the corner', right: 'на углу' }] } },
                    { type: 'speak-aloud', data: { instruction: 'Hotel check-in:', phrase: "Hello! I have a reservation. My name is Alex. Is there a restaurant nearby? Can you tell me the WiFi password?" } }
                ]
            },

            // ── Unit 17: Past Simple: was/were + regular ──
            {
                id: 17,
                title: 'Past Simple: was/were + regular verbs',
                desc: 'Talk about the past. was/were. Regular verbs: -ed.',
                unitType: 'grammar',
                grammar: ['was/were', 'regular verbs -ed', 'past time expressions'],
                vocab: ['yesterday', 'last week', 'ago', 'regular verbs'],
                homework: { prompt: 'Write about what you did yesterday.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Now let's talk about the PAST! First: 'was' and 'were' — the past of BE. I was, you were, he/she/it was, we/they were.",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'compare',
                        mascotText: "BE in present vs past:",
                        mascotEmotion: 'happy',
                        left: { label: 'Present', items: ['I am', 'You are', 'He/She is', 'They are'] },
                        right: { label: 'Past', items: ['I was', 'You were', 'He/She was', 'They were'] }
                    },
                    {
                        type: 'examples',
                        mascotText: "Regular verbs: just add -ED! Simple!",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'work', past: "I worked yesterday.", highlight: '-ed' },
                            { base: 'play', past: "She played tennis.", highlight: '-ed' },
                            { base: 'live', past: "We lived in London.", highlight: '-d' },
                            { base: 'study', past: "He studied English.", highlight: '-ied' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "'I ___ at home yesterday.'",
                        mascotEmotion: 'thinking',
                        options: ['am', 'was', 'were'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "Three pronunciations of -ED! /t/ after voiceless (worked, walked). /d/ after voiced (played, lived). /ɪd/ after t/d (wanted, needed).",
                        mascotEmotion: 'happy',
                        tipText: "worked /t/ · played /d/ · wanted /ɪd/ — Listen for the difference!"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'was or were?', sentence: 'I ___ tired yesterday.', options: ['was', 'were'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'was or were?', sentence: 'They ___ at school.', options: ['was', 'were'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Regular past', sentence: 'She ___ tennis yesterday.', options: ['play', 'played', 'plays'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Negative', sentence: "I ___ at work yesterday.", options: ["wasn't", "weren't", "didn't"], correct: 0 } },
                    { type: 'word-shuffle', data: { instruction: 'Past sentence', words: ['worked', 'I', 'yesterday', 'home', 'from'], correct: ['I', 'worked', 'from', 'home', 'yesterday'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Вчера я был дома.', fromLang: 'RU', toLang: 'EN', answer: 'Yesterday I was at home' } },
                    { type: 'match-pairs', data: { instruction: 'Present → Past', pairs: [{ left: 'work', right: 'worked' }, { left: 'play', right: 'played' }, { left: 'study', right: 'studied' }, { left: 'live', right: 'lived' }] } },
                    { type: 'listen-type', data: { instruction: 'Listen and type', text: 'I worked from home last week.', hint: 'Past tense' } },
                    { type: 'speak-aloud', data: { instruction: 'Tell about yesterday:', phrase: "Yesterday I was at home. I worked from 9 to 6. I cooked dinner. I watched TV." } }
                ]
            },

            // ── Unit 18: Past Simple: irregular + questions ──
            {
                id: 18,
                title: 'Past Simple: irregular verbs + questions',
                desc: 'Common irregular verbs. Did you...? Telling stories.',
                unitType: 'grammar',
                grammar: ['irregular verbs', 'did/didn\'t', 'Past Simple questions'],
                vocab: ['go/went', 'eat/ate', 'see/saw', 'buy/bought', 'come/came', 'make/made'],
                homework: { prompt: 'Write a story about your last weekend using at least 8 irregular verbs.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Bad news: many common verbs are IRREGULAR — they don't follow the -ed rule. Good news: there are only about 50 important ones! go→went, eat→ate, see→saw.",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "Top irregular verbs you MUST know:",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'go', past: "I went to the cinema.", highlight: 'went' },
                            { base: 'eat', past: "We ate pizza.", highlight: 'ate' },
                            { base: 'see', past: "She saw a movie.", highlight: 'saw' },
                            { base: 'buy', past: "He bought a car.", highlight: 'bought' }
                        ]
                    },
                    {
                        type: 'compare',
                        mascotText: "For questions and negatives, use DID. The main verb goes BACK to base form!",
                        mascotEmotion: 'happy',
                        left: { label: 'Statement', items: ['I went.', 'She ate.', 'He saw.'] },
                        right: { label: 'Question', items: ['Did you go?', 'Did she eat?', 'Did he see?'] }
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "'Did you ___ the movie?' — Which form after DID?",
                        mascotEmotion: 'thinking',
                        options: ['saw', 'see', 'seen'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "After DID / DIDN'T the verb is always BASE form! Did you GO (not went). I didn't EAT (not ate). DID already shows it's past!",
                        mascotEmotion: 'happy',
                        tipText: "❌ Did you went? → ✅ Did you go? · ❌ I didn't ate → ✅ I didn't eat"
                    }
                ],
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Irregular', sentence: 'I ___ to school yesterday.', options: ['go', 'went', 'goed'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Irregular', sentence: 'She ___ a new dress.', options: ['buyed', 'bought', 'buy'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Question', sentence: '___ you go to the party?', options: ['Do', 'Did', 'Were'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'After DID', sentence: "Did she ___ the film?", options: ['saw', 'see', 'seen'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Negative', sentence: "I ___ go to work yesterday.", options: ["didn't", "don't", "wasn't"], correct: 0 } },
                    { type: 'match-pairs', data: { instruction: 'Present → Past', pairs: [{ left: 'go', right: 'went' }, { left: 'eat', right: 'ate' }, { left: 'see', right: 'saw' }, { left: 'buy', right: 'bought' }, { left: 'come', right: 'came' }, { left: 'make', right: 'made' }] } },
                    { type: 'word-shuffle', data: { instruction: 'Make a question', words: ['did', 'you', 'eat', 'what', 'yesterday'], correct: ['what', 'did', 'you', 'eat', 'yesterday'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Я пошёл в кино вчера.', fromLang: 'RU', toLang: 'EN', answer: 'I went to the cinema yesterday' } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Ты видел этот фильм?', fromLang: 'RU', toLang: 'EN', answer: 'Did you see this movie?' } },
                    { type: 'speak-aloud', data: { instruction: 'Tell about last weekend:', phrase: "Last weekend I went to a restaurant. I ate sushi. I saw my friends. We had a great time!" } }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════
    // A2 — ELEMENTARY (16 units)
    // ═══════════════════════════════════════════
    {
        id: 'a2_elementary',
        title: 'A2 — Elementary',
        level: 'A2',
        cefr: 'A2',
        methodology: 'Consolidation of basics. Comparatives, future tenses, Present Perfect introduction.',
        units: [
            { id: 1, title: 'BE + Present Simple: review', desc: 'Full review of be and Present Simple.', unitType: 'grammar', grammar: ['be review', 'Present Simple review'], vocab: ['personal information', 'daily routine'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: 'She ___ a teacher.', options: ['am', 'is', 'are'], correct: 1 } }] },
            { id: 2, title: 'Possessives + object pronouns', desc: 'my/your/his + me/him/her.', unitType: 'grammar', grammar: ['possessives', 'object pronouns'], vocab: ['family', 'relationships'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Object pronoun', sentence: 'Give ___ the book. (she)', options: ['she', 'her', 'hers'], correct: 1 } }] },
            { id: 3, title: 'Past Simple: full review', desc: 'Regular + irregular + negatives + questions.', unitType: 'grammar', grammar: ['Past Simple all forms'], vocab: ['holidays', 'transport', 'past events'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Past', sentence: 'I ___ to Paris last summer.', options: ['go', 'went', 'gone'], correct: 1 } }] },
            { id: 4, title: '🗣️ Shopping for clothes', desc: 'At a shop: sizes, colors, prices.', unitType: 'situational', grammar: ['How much', 'I\'d like'], vocab: ['clothes', 'sizes', 'colors', 'shopping'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Shopping', sentence: 'How ___ is this shirt?', options: ['many', 'much', 'old'], correct: 1 } }] },
            { id: 5, title: '🔄 Checkpoint 1', desc: 'Review units 1-4.', unitType: 'review', grammar: ['A2 review 1-4'], vocab: ['all A2 so far'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: 'She ___ to school yesterday.', options: ['go', 'went', 'goes'], correct: 1 } }] },
            { id: 6, title: 'Comparatives & superlatives', desc: '-er, more, the most, the -est.', unitType: 'grammar', grammar: ['comparative -er/more', 'superlative -est/most'], vocab: ['describing people', 'personality', 'weather'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Comparative', sentence: 'London is ___ than Paris.', options: ['big', 'bigger', 'biggest'], correct: 1 } }] },
            { id: 7, title: 'There is/are + much / many', desc: 'Countable/uncountable. How much/how many.', unitType: 'grammar', grammar: ['countable/uncountable', 'much/many/some/any'], vocab: ['food containers', 'quantities', 'cooking'], exercises: [{ type: 'fill-bubble', data: { instruction: 'much or many?', sentence: 'How ___ sugar do you want?', options: ['many', 'much'], correct: 1 } }] },
            { id: 8, title: '🎤 Word stress & sentence rhythm', desc: 'Stress patterns. Schwa /ə/. Linking.', unitType: 'pronunciation', grammar: [], vocab: ['stress in long words'], exercises: [{ type: 'speak-aloud', data: { instruction: 'Practice stress:', phrase: "PHOtograph, phoTOGrapher, photoGRAphic. BEAUtiful, imPORtant, INteresting." } }] },
            { id: 9, title: 'Be going to: plans', desc: 'Future plans and intentions.', unitType: 'grammar', grammar: ['be going to (+/−/?)'], vocab: ['travel', 'airport', 'future plans'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Plans', sentence: 'I ___ going to travel to Japan.', options: ['am', 'is', 'are'], correct: 0 } }] },
            { id: 10, title: 'Will vs Be going to', desc: 'Predictions vs plans.', unitType: 'grammar', grammar: ['will vs going to'], vocab: ['weather', 'future events'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Prediction', sentence: 'I think it ___ rain tomorrow.', options: ['will', 'is going to', 'goes to'], correct: 0 } }] },
            { id: 11, title: '🔄 Checkpoint 2', desc: 'Review units 6-10.', unitType: 'review', grammar: ['comparatives', 'future tenses'], vocab: ['A2 review'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: 'She is ___ than me.', options: ['tall', 'taller', 'tallest'], correct: 1 } }] },
            { id: 12, title: 'Present Perfect: experience', desc: 'Have you ever...? + ever/never.', unitType: 'grammar', grammar: ['Present Perfect', 'ever/never'], vocab: ['life experiences', 'travel'], exercises: [{ type: 'fill-bubble', data: { instruction: 'PP', sentence: 'Have you ever ___ to Japan?', options: ['go', 'went', 'been'], correct: 2 } }] },
            { id: 13, title: 'Should / Shouldn\'t: advice', desc: 'Giving advice and recommendations.', unitType: 'grammar', grammar: ['should/shouldn\'t'], vocab: ['health', 'body parts', 'advice'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Advice', sentence: 'You ___ see a doctor.', options: ['should', 'must', 'can'], correct: 0 } }] },
            { id: 14, title: "🗣️ At the doctor's", desc: 'Describe symptoms. Get advice.', unitType: 'situational', grammar: ['I\'ve got...', 'You should...'], vocab: ['symptoms', 'medicine', 'body parts'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Symptom', sentence: "I've got a ___ .", options: ['headache', 'headaching', 'head ache'], correct: 0 } }] },
            { id: 15, title: 'Would like: polite requests', desc: 'I would like... / Would you like...?', unitType: 'grammar', grammar: ['would like + noun/infinitive'], vocab: ['restaurant', 'menu', 'polite phrases'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Polite', sentence: 'I ___ like a coffee, please.', options: ['will', 'would', 'could'], correct: 1 } }] },
            { id: 16, title: '🔄 Final Checkpoint A2', desc: 'Full A2 review.', unitType: 'review', grammar: ['all A2 grammar'], vocab: ['all A2 vocab'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Final review', sentence: 'Have you ever ___ sushi?', options: ['eat', 'ate', 'eaten'], correct: 2 } }] }
        ]
    },

    // ═══════════════════════════════════════════
    // B1 — PRE-INTERMEDIATE (16 units)
    // ═══════════════════════════════════════════
    {
        id: 'b1_preintermediate',
        title: 'B1 — Pre-Intermediate',
        level: 'B1',
        cefr: 'B1',
        methodology: 'Present Perfect mastery. Conditionals. Passive voice. Connected speech.',
        units: [
            { id: 1, title: 'Present Perfect: yet / already / just', desc: 'Recent events and completion.', unitType: 'grammar', grammar: ['PP + yet/already/just'], vocab: ['housework', 'make vs do'], exercises: [{ type: 'fill-bubble', data: { instruction: 'PP', sentence: "I've ___ finished my homework.", options: ['yet', 'already', 'just'], correct: 2 } }] },
            { id: 2, title: 'Present Perfect vs Past Simple', desc: 'When to use which tense.', unitType: 'grammar', grammar: ['PP vs PS'], vocab: ['verbs + prepositions'], exercises: [{ type: 'fill-bubble', data: { instruction: 'PP or PS?', sentence: "I ___ to London in 2020.", options: ['have been', 'went', 'have gone'], correct: 1 } }] },
            { id: 3, title: 'Present Perfect + for / since', desc: 'Duration: how long have you...?', unitType: 'grammar', grammar: ['PP + for/since'], vocab: ['relationships', 'biography'], exercises: [{ type: 'fill-bubble', data: { instruction: 'for or since?', sentence: "I've lived here ___ 2015.", options: ['for', 'since'], correct: 1 } }] },
            { id: 4, title: '🗣️ Job interview: about yourself', desc: 'PP + PS in a job interview context.', unitType: 'situational', grammar: ['PP + PS combined'], vocab: ['work experience', 'skills', 'education'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Interview', sentence: "I've ___ in marketing for 5 years.", options: ['work', 'worked', 'working'], correct: 1 } }] },
            { id: 5, title: '🔄 Checkpoint 1', desc: 'Review Present Perfect.', unitType: 'review', grammar: ['PP all forms'], vocab: ['B1 review 1-4'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: "She's lived here ___ 10 years.", options: ['for', 'since', 'during'], correct: 0 } }] },
            { id: 6, title: 'Infinitive vs Gerund', desc: 'to + verb vs verb + -ing.', unitType: 'grammar', grammar: ['infinitive vs gerund'], vocab: ['want/enjoy/decide/avoid'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Inf or Ger?', sentence: 'I want ___ English.', options: ['learn', 'to learn', 'learning'], correct: 1 } }] },
            { id: 7, title: 'Past Continuous + Past Simple', desc: 'was doing... when... happened.', unitType: 'grammar', grammar: ['Past Continuous'], vocab: ['storytelling', 'feelings'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Past Cont.', sentence: 'I ___ sleeping when the phone rang.', options: ['am', 'was', 'were'], correct: 1 } }] },
            { id: 8, title: 'First Conditional: if... will...', desc: 'Real future possibilities.', unitType: 'grammar', grammar: ['First Conditional'], vocab: ['possibilities', 'plans', 'warnings'], exercises: [{ type: 'fill-bubble', data: { instruction: '1st Conditional', sentence: 'If it rains, I ___ stay home.', options: ['will', 'would', 'am'], correct: 0 } }] },
            { id: 9, title: 'Second Conditional: dreams', desc: 'Unreal/imaginary situations.', unitType: 'grammar', grammar: ['Second Conditional'], vocab: ['dreams', 'hypotheticals'], exercises: [{ type: 'fill-bubble', data: { instruction: '2nd Conditional', sentence: 'If I had a million, I ___ travel.', options: ['will', 'would', 'can'], correct: 1 } }] },
            { id: 10, title: '🔄 Checkpoint 2', desc: 'Review Conditionals, Past Continuous.', unitType: 'review', grammar: ['1st & 2nd Conditionals', 'Past Continuous'], vocab: ['B1 review 6-9'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: 'If she ___ here, she would help us.', options: ['is', 'was', 'were'], correct: 2 } }] },
            { id: 11, title: 'Passive Voice: present & past', desc: 'is made / was built.', unitType: 'grammar', grammar: ['Passive present and past'], vocab: ['news', 'production', 'facts'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Passive', sentence: 'English ___ spoken worldwide.', options: ['is', 'was', 'are'], correct: 0 } }] },
            { id: 12, title: 'Past Perfect: before that', desc: 'had + V3 for earlier past events.', unitType: 'grammar', grammar: ['Past Perfect'], vocab: ['books', 'films', 'stories'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Past Perfect', sentence: 'When I arrived, they ___ left.', options: ['have', 'had', 'has'], correct: 1 } }] },
            { id: 13, title: 'Reported Speech', desc: 'He said... She told me...', unitType: 'grammar', grammar: ['Reported Speech'], vocab: ['say vs tell', 'retelling'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Reported', sentence: 'She said she ___ tired.', options: ['is', 'was', 'were'], correct: 1 } }] },
            { id: 14, title: '🗣️ Retelling news & gossip', desc: 'PP + Reported Speech in context.', unitType: 'situational', grammar: ['PP + Reported Speech'], vocab: ['news phrases', 'conversational'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Report', sentence: 'He told me he ___ the movie.', options: ['liked', 'likes', 'like'], correct: 0 } }] },
            { id: 15, title: 'Modals: must / have to / don\'t have to', desc: 'Obligation, no obligation, prohibition.', unitType: 'grammar', grammar: ['must/have to/don\'t have to'], vocab: ['rules', 'laws', 'work'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Modals', sentence: 'You ___ wear a uniform at school.', options: ['must', 'can', 'should'], correct: 0 } }] },
            { id: 16, title: '🔄 Final Checkpoint B1', desc: 'Full B1 review.', unitType: 'review', grammar: ['all B1 grammar'], vocab: ['all B1 vocab'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Final', sentence: 'If I were rich, I ___ buy a yacht.', options: ['will', 'would', 'can'], correct: 1 } }] }
        ]
    },

    // ═══════════════════════════════════════════
    // B2 — UPPER-INTERMEDIATE (14 units)
    // ═══════════════════════════════════════════
    {
        id: 'b2_upper',
        title: 'B2 — Upper-Intermediate',
        level: 'B2',
        cefr: 'B2',
        methodology: 'Advanced tenses, conditionals, articles, wish. Business English.',
        units: [
            { id: 1, title: 'All question types', desc: 'Complex question formation.', unitType: 'grammar', grammar: ['all question types'], vocab: ['compound adjectives', 'work'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Question', sentence: "You're coming tomorrow, ___ you?", options: ["aren't", "don't", "won't"], correct: 0 } }] },
            { id: 2, title: 'Narrative Tenses', desc: 'Past Simple / Continuous / Perfect combined.', unitType: 'grammar', grammar: ['narrative tenses combo'], vocab: ['air travel', 'adventures'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Narrative', sentence: 'While I ___ walking, it started to rain.', options: ['am', 'was', 'had'], correct: 1 } }] },
            { id: 3, title: 'Future forms: all', desc: 'will / going to / Present Continuous / Future Perfect.', unitType: 'grammar', grammar: ['all future forms'], vocab: ['plans', 'predictions', 'schedules'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Future', sentence: 'By 2030 I ___ finished university.', options: ['will', 'will have', 'am going to'], correct: 1 } }] },
            { id: 4, title: '🗣️ Business email & formal writing', desc: 'Formal vs informal register.', unitType: 'situational', grammar: ['register', 'formal structures'], vocab: ['I am writing to...', 'Best regards', 'Furthermore'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Formal', sentence: 'I am writing ___ enquire about...', options: ['for', 'to', 'about'], correct: 1 } }] },
            { id: 5, title: '🔄 Checkpoint 1', desc: 'Review B2 units 1-4.', unitType: 'review', grammar: ['narrative', 'future', 'formal'], vocab: ['B2 review'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: 'By next year I ___ here for 5 years.', options: ['will live', 'will have lived', 'am living'], correct: 1 } }] },
            { id: 6, title: 'Conditionals: 2nd & 3rd', desc: 'Unreal present and past.', unitType: 'grammar', grammar: ['2nd + 3rd Conditionals'], vocab: ['feelings', 'regrets'], exercises: [{ type: 'fill-bubble', data: { instruction: '3rd Cond', sentence: 'If I had studied, I ___ passed.', options: ['will have', 'would have', 'had'], correct: 1 } }] },
            { id: 7, title: 'Wish + Past / Past Perfect', desc: 'I wish I had... If only...', unitType: 'grammar', grammar: ['wish + past', 'wish + past perfect'], vocab: ['regrets', 'decision making'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Wish', sentence: 'I wish I ___ taller.', options: ['am', 'was', 'were'], correct: 2 } }] },
            { id: 8, title: 'Gerund vs Infinitive: advanced', desc: 'stop doing vs stop to do.', unitType: 'grammar', grammar: ['gerund vs infinitive advanced'], vocab: ['cinema', 'reviews'], exercises: [{ type: 'fill-bubble', data: { instruction: 'G vs I', sentence: 'I stopped ___ (to take a photo).', options: ['taking', 'to take'], correct: 1 } }] },
            { id: 9, title: 'Used to / Be used to / Get used to', desc: 'Past habits vs current adaptation.', unitType: 'grammar', grammar: ['used to/be used to/get used to'], vocab: ['lifestyle changes'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Used to', sentence: 'I ___ smoke, but I quit.', options: ['used to', 'am used to', 'get used to'], correct: 0 } }] },
            { id: 10, title: '🔄 Checkpoint 2', desc: 'Review conditionals, wish, gerund/inf.', unitType: 'review', grammar: ['conditionals', 'wish', 'gerund/inf'], vocab: ['B2 review'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: 'If only I ___ listened to you.', options: ['have', 'had', 'would'], correct: 1 } }] },
            { id: 11, title: 'Reported Speech: all forms', desc: 'Statements, questions, commands.', unitType: 'grammar', grammar: ['Reported Speech all types'], vocab: ['politics', 'global issues'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Reported Q', sentence: 'She asked me ___ I was from.', options: ['what', 'where', 'that'], correct: 1 } }] },
            { id: 12, title: 'Articles: a / the / zero', desc: 'All article rules.', unitType: 'grammar', grammar: ['articles all rules'], vocab: ['cities', 'geography'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Articles', sentence: '___ sun is very hot today.', options: ['A', 'The', '-'], correct: 1 } }] },
            { id: 13, title: 'Relative Clauses + Tag Questions', desc: 'who/which/that. Defining vs non-defining.', unitType: 'grammar', grammar: ['relative clauses', 'tag questions'], vocab: ['technology', 'science'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Relative', sentence: 'The woman ___ lives next door is a doctor.', options: ['who', 'which', 'what'], correct: 0 } }] },
            { id: 14, title: '🗣️ Job interview (advanced)', desc: 'All B2 structures in free speech.', unitType: 'situational', grammar: ['all B2'], vocab: ['STAR method', 'strengths/weaknesses'], exercises: [{ type: 'speak-aloud', data: { instruction: 'Interview answer:', phrase: "I would say my main strength is... I used to struggle with... but I\'ve improved by..." } }] }
        ]
    },

    // ═══════════════════════════════════════════
    // C1 — ADVANCED (13 units)
    // ═══════════════════════════════════════════
    {
        id: 'c1_advanced',
        title: 'C1 — Advanced',
        level: 'C1',
        cefr: 'C1',
        methodology: 'Discourse markers, modals for speculation, emphasis, advanced passives.',
        units: [
            { id: 1, title: 'Discourse Markers', desc: 'however, moreover, although, whereas.', unitType: 'grammar', grammar: ['discourse markers', 'linkers'], vocab: ['argumentation', 'essays'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Linker', sentence: 'The food was good; ___, the service was poor.', options: ['however', 'moreover', 'therefore'], correct: 0 } }] },
            { id: 2, title: 'Causative: have/get sth done', desc: 'I had my car repaired.', unitType: 'grammar', grammar: ['causative have/get'], vocab: ['services', 'complaints'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Causative', sentence: 'I had my hair ___.', options: ['cut', 'cutted', 'cutting'], correct: 0 } }] },
            { id: 3, title: 'Deduction: must/can\'t/might + have', desc: 'She must have left already.', unitType: 'grammar', grammar: ['modals of deduction'], vocab: ['investigation', 'conclusions'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Deduction', sentence: 'He ___ have forgotten. He always remembers.', options: ["can't", "must", "might"], correct: 0 } }] },
            { id: 4, title: 'Advanced modals: permission & obligation', desc: "needn't have, could have, was supposed to.", unitType: 'grammar', grammar: ['advanced modals'], vocab: ['work', 'expectations'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Modal', sentence: "You ___ have told me earlier!", options: ['should', 'would', 'can'], correct: 0 } }] },
            { id: 5, title: '🔄 Checkpoint 1', desc: 'Review units 1-4.', unitType: 'review', grammar: ['discourse', 'causative', 'modals'], vocab: ['C1 review'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: 'She ___ have been tired after the flight.', options: ['must', "can't", 'should'], correct: 0 } }] },
            { id: 6, title: 'Emphasis: cleft + inversion', desc: "It was John who... Never have I...", unitType: 'grammar', grammar: ['cleft sentences', 'inversion'], vocab: ['persuasion', 'presentations'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Cleft', sentence: 'It ___ the weather that ruined the trip.', options: ['was', 'is', 'were'], correct: 0 } }] },
            { id: 7, title: 'Hedging & distancing', desc: 'seem, appear, tend, passive reporting.', unitType: 'grammar', grammar: ['hedging', 'distancing'], vocab: ['academic style', 'diplomacy'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Hedging', sentence: 'It ___ that the economy is recovering.', options: ['seems', 'looks', 'shows'], correct: 0 } }] },
            { id: 8, title: 'Noun clauses + ellipsis', desc: 'that-clauses, I think so, I hope not.', unitType: 'grammar', grammar: ['noun clauses', 'ellipsis'], vocab: ['discussions', 'opinions'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Ellipsis', sentence: '"Will it rain?" — "I hope ___."', options: ['not', 'no', "don't"], correct: 0 } }] },
            { id: 9, title: '🗣️ Public speaking', desc: 'Discourse markers + emphasis in practice.', unitType: 'situational', grammar: ['all C1 so far'], vocab: ['speech structure', 'Q&A'], exercises: [{ type: 'speak-aloud', data: { instruction: 'Give a 30-second speech:', phrase: "I firmly believe that language learning should be accessible to everyone. Furthermore, technology has made this possible on an unprecedented scale." } }] },
            { id: 10, title: '🔄 Checkpoint 2', desc: 'Review units 6-9.', unitType: 'review', grammar: ['emphasis', 'hedging', 'noun clauses'], vocab: ['C1 review'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: 'Never ___ I seen such a beautiful sunset.', options: ['have', 'had', 'did'], correct: 0 } }] },
            { id: 11, title: 'Mixed Conditionals', desc: 'If I had studied → I would be...', unitType: 'grammar', grammar: ['mixed conditionals'], vocab: ['career', 'life choices'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Mixed', sentence: 'If I had studied medicine, I ___ a doctor now.', options: ['will be', 'would be', 'am'], correct: 1 } }] },
            { id: 12, title: 'Advanced Passives + Continuous Aspect', desc: 'get-passive, all continuous tenses.', unitType: 'grammar', grammar: ['advanced passives', 'continuous aspect'], vocab: ['media', 'technology'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Get-passive', sentence: 'He got ___ in the accident.', options: ['hurt', 'hurted', 'hurting'], correct: 0 } }] },
            { id: 13, title: '🗣️ Debate: arguing for & against', desc: 'All C1 structures in a debate.', unitType: 'situational', grammar: ['all C1'], vocab: ['ethics', 'society', 'AI', 'ecology'], exercises: [{ type: 'speak-aloud', data: { instruction: 'Argue both sides:', phrase: "On one hand, AI can revolutionize education. On the other hand, it raises concerns about dependency." } }] }
        ]
    },

    // ═══════════════════════════════════════════
    // C2 — PROFICIENCY (12 units)
    // ═══════════════════════════════════════════
    {
        id: 'c2_proficiency',
        title: 'C2 — Proficiency',
        level: 'C2',
        cefr: 'C2',
        methodology: 'Near-native fluency. Rhetoric, pragmatics, register shifting, academic writing.',
        units: [
            { id: 1, title: 'Full tense system review', desc: 'All tenses in narrative context.', unitType: 'grammar', grammar: ['all tenses'], vocab: ['identity', 'idioms of character'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Tense', sentence: 'By the time she arrived, we ___ waiting for two hours.', options: ['were', 'had been', 'have been'], correct: 1 } }] },
            { id: 2, title: 'Complex verb patterns', desc: 'Complementation, complex structures.', unitType: 'grammar', grammar: ['complex verb patterns'], vocab: ['movement', 'migration'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Pattern', sentence: "I can't bear ___ late.", options: ['be', 'being', 'to being'], correct: 1 } }] },
            { id: 3, title: 'Subjunctive + inversion', desc: 'Formal subjunctive, advanced inversion.', unitType: 'grammar', grammar: ['subjunctive', 'inversion'], vocab: ['formal style', 'rhetoric'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Subjunctive', sentence: 'I suggest that he ___ on time.', options: ['is', 'be', 'will be'], correct: 1 } }] },
            { id: 4, title: 'Concessive clauses', desc: 'although/despite/however/nevertheless.', unitType: 'grammar', grammar: ['concessive clauses'], vocab: ['psychology', 'cognition'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Concessive', sentence: '___ being tired, she finished the race.', options: ['Despite', 'Although', 'However'], correct: 0 } }] },
            { id: 5, title: '🔄 Checkpoint 1', desc: 'Review C2 units 1-4.', unitType: 'review', grammar: ['C2 review 1-4'], vocab: ['C2 review'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: 'Hardly ___ I left when it started raining.', options: ['have', 'had', 'did'], correct: 1 } }] },
            { id: 6, title: 'Nominalization + complex passives', desc: 'Academic writing style.', unitType: 'grammar', grammar: ['nominalization', 'complex passives'], vocab: ['science', 'innovation'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Nominalization', sentence: 'The ___ of the data took three months.', options: ['analyze', 'analysis', 'analyzing'], correct: 1 } }] },
            { id: 7, title: 'Participle clauses', desc: 'Present & past participle clauses.', unitType: 'grammar', grammar: ['participle clauses'], vocab: ['conflict', 'diplomacy'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Participle', sentence: '___ in 1990, she grew up during the internet boom.', options: ['Born', 'Being born', 'Having born'], correct: 0 } }] },
            { id: 8, title: 'Pragmatics: implied meaning', desc: 'Speech acts, hedging, sarcasm.', unitType: 'grammar', grammar: ['pragmatics', 'implied meaning'], vocab: ['nuance', 'communication'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Implied', sentence: '"Nice weather we\'re having" (during a storm) is an example of:', options: ['Sarcasm', 'Metaphor', 'Simile'], correct: 0 } }] },
            { id: 9, title: '🗣️ Negotiation: difficult conversations', desc: 'All C2 structures in real context.', unitType: 'situational', grammar: ['all C2'], vocab: ['business negotiation', 'compromise'], exercises: [{ type: 'speak-aloud', data: { instruction: 'Negotiate:', phrase: "While I appreciate your position, I believe we could reach a more equitable arrangement if we were to consider..." } }] },
            { id: 10, title: '🔄 Checkpoint 2', desc: 'Review C2 units 6-9.', unitType: 'review', grammar: ['C2 review 6-9'], vocab: ['C2 review'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Review', sentence: 'Having ___ the report, she submitted it immediately.', options: ['completed', 'completing', 'complete'], correct: 0 } }] },
            { id: 11, title: 'Fixed phrases & collocations', desc: 'Binomials, idioms, collocations.', unitType: 'grammar', grammar: ['collocations', 'binomials'], vocab: ['culture', 'traditions'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Collocation', sentence: 'She made a strong ___ on the audience.', options: ['impression', 'feeling', 'effect'], correct: 0 } }] },
            { id: 12, title: 'Register & academic writing', desc: 'Formal vs informal, register shift.', unitType: 'grammar', grammar: ['register', 'formal writing'], vocab: ['essays', 'legacy', 'archives'], exercises: [{ type: 'fill-bubble', data: { instruction: 'Register', sentence: 'The formal version of "get" is:', options: ['obtain', 'grab', 'take'], correct: 0 } }] }
        ]
    }

    ],

    // ─── HELPER METHODS ───
    getActive() {
        return this.textbooks.find(tb => tb.id === this.activeTextbookId) || this.textbooks[0];
    },

    getByLevel(cefrLevel) {
        return this.textbooks.find(tb => tb.cefr === cefrLevel);
    },

    selectTextbookByLevel(cefrLevel) {
        const tb = this.getByLevel(cefrLevel);
        if (tb) {
            this.activeTextbookId = tb.id;
            if (typeof LangyState !== 'undefined') {
                LangyState.progress.currentUnitId = 1;
                LangyState.aiMemory.currentTextbookId = tb.id;
            }
            return tb;
        }
        this.activeTextbookId = this.textbooks[0].id;
        if (typeof LangyState !== 'undefined') {
            LangyState.progress.currentUnitId = 1;
            LangyState.aiMemory.currentTextbookId = this.textbooks[0].id;
        }
        return this.textbooks[0];
    },

    restoreFromState() {
        if (typeof LangyState !== 'undefined' && LangyState.aiMemory.currentTextbookId) {
            this.activeTextbookId = LangyState.aiMemory.currentTextbookId;
        }
    },

    getLevelList() {
        return this.textbooks.map(tb => ({
            id: tb.id,
            level: tb.cefr,
            title: tb.title,
            unitCount: tb.units.length
        }));
    },

    getTotalUnits() {
        return this.textbooks.reduce((sum, tb) => sum + tb.units.length, 0);
    }
};

if (typeof module !== 'undefined') module.exports = { LangyCurriculum };

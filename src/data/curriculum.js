/* ============================================
   LANGY — FULL CURRICULUM DATA
   Based on Oxford English File 4th Edition
   Levels: A1 → C2 (6 textbooks)
   ============================================ */

const LangyCurriculum = {
    activeTextbookId: null, // Set after placement test

    textbooks: [

    // ═══════════════════════════════════════════
    // A1 — BEGINNER (Oxford English File Beginner)
    // ═══════════════════════════════════════════
    {
        id: 'oxford_a1_beginner',
        title: 'English File A1 — Beginner',
        author: 'Oxford University Press',
        level: 'A1',
        cefr: 'A1',
        methodology: 'Introduction to English. Basic greetings, simple present tense, everyday vocabulary. Focus on survival English and building confidence.',
        units: [
            {
                id: 1,
                title: 'Unit 1: A cappuccino, please',
                desc: 'Learn to introduce yourself, use verb be (I, you), count 0-10, days of the week.',
                grammar: ['verb be (singular): I and you', 'positive, negative, questions'],
                vocab: ['numbers 0-10', 'days of the week', 'greetings', 'goodbye phrases'],
                pronunciation: ['/h/', '/aɪ/', '/iː/'],
                homework: { prompt: 'Write 3 sentences introducing yourself: your name, where you are from, and a greeting.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Hey there! Welcome to your first English lesson! Today we'll learn how to introduce yourself. The most important verb in English is 'to be'. Let's start with 'I' and 'you'!",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'examples',
                        mascotText: "Look at these examples. With 'I' we always use 'am'. With 'you' we use 'are':",
                        mascotEmotion: 'happy',
                        items: [
                            { base: 'I', past: 'I am (I\'m)', highlight: 'am' },
                            { base: 'You', past: 'You are (You\'re)', highlight: 'are' },
                            { base: 'I + name', past: 'I am Alex', highlight: 'am' },
                            { base: 'You + from', past: 'You are from Russia', highlight: 'are' }
                        ]
                    },
                    {
                        type: 'vocab-intro',
                        mascotText: "Now let's learn some basic greetings! You'll use these every day:",
                        mascotEmotion: 'happy',
                        words: [
                            { en: 'Hello', ru: 'Привет' },
                            { en: 'Goodbye', ru: 'До свидания' },
                            { en: 'Please', ru: 'Пожалуйста' },
                            { en: 'Thank you', ru: 'Спасибо' },
                            { en: 'Yes', ru: 'Да' },
                            { en: 'No', ru: 'Нет' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "Quick check! Which is correct: 'I __ Alex'?",
                        mascotEmotion: 'thinking',
                        options: ['I is Alex', 'I am Alex', 'I are Alex'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "Pro tip! In everyday speech, people use short forms: I'm = I am, You're = You are. It sounds more natural!",
                        mascotEmotion: 'happy',
                        tipText: "I'm = I am, You're = You are. Short forms are used in 90% of spoken English!"
                    }
                ],
                exercises: [
                    {
                        type: 'listen-type',
                        data: {
                            instruction: 'Listen and type what you hear',
                            text: 'Hello, my name is Alex.',
                            hint: 'Start with a capital letter and end with a period.'
                        }
                    },
                    {
                        type: 'match-pairs',
                        data: {
                            instruction: 'Match the words with their translations',
                            pairs: [
                                { left: 'Hello', right: 'Привет' },
                                { left: 'Name', right: 'Имя' },
                                { left: 'From', right: 'Из' },
                                { left: 'Please', right: 'Пожалуйста' }
                            ]
                        }
                    },
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct form of the verb "to be"',
                            sentence: 'I ___ from London.',
                            options: ['am', 'is', 'are'],
                            correct: 0
                        }
                    },
                    {
                        type: 'word-shuffle',
                        data: {
                            instruction: 'Put the words in the correct order',
                            words: ['my', 'is', 'name', 'Anna'],
                            correct: ['my', 'name', 'is', 'Anna']
                        }
                    },
                    {
                        type: 'speak-aloud',
                        data: {
                            instruction: 'Say this phrase aloud:',
                            phrase: 'Hello, my name is Alex'
                        }
                    }
                ]
            },
            {
                id: 2,
                title: 'Unit 2: World music',
                desc: 'Talk about where people are from. Verb be with he, she, it. Countries.',
                grammar: ['verb be (singular): he, she, it', 'Where is he/she from?'],
                vocab: ['countries', 'nationalities', 'he/she/it'],
                pronunciation: ['/ɪ/', '/əʊ/', '/s/', '/ʃ/'],
                homework: { prompt: 'Write about 3 famous people: where they are from and what they do.' },
                teachSlides: [
                    {
                        type: 'explain',
                        mascotText: "Great job on Unit 1! Now let's learn about other people. When we talk about 'he', 'she', or 'it', we use 'is'. He is, She is, It is!",
                        mascotEmotion: 'happy'
                    },
                    {
                        type: 'compare',
                        mascotText: "See the difference? 'I' uses 'am', 'You' uses 'are', but 'He/She/It' uses 'is':",
                        mascotEmotion: 'happy',
                        left: { label: 'Subject', items: ['I', 'You', 'He', 'She', 'It'] },
                        right: { label: 'Verb BE', items: ['am', 'are', 'is', 'is', 'is'] }
                    },
                    {
                        type: 'vocab-intro',
                        mascotText: "Let's learn some countries and nationalities!",
                        mascotEmotion: 'happy',
                        words: [
                            { en: 'Japan → Japanese', ru: 'Япония → Японский' },
                            { en: 'Brazil → Brazilian', ru: 'Бразилия → Бразильский' },
                            { en: 'France → French', ru: 'Франция → Французский' },
                            { en: 'Italy → Italian', ru: 'Италия → Итальянский' },
                            { en: 'Russia → Russian', ru: 'Россия → Русский' },
                            { en: 'USA → American', ru: 'США → Американский' }
                        ]
                    },
                    {
                        type: 'quiz-check',
                        mascotText: "Quick check! 'She ___ from France.' Which word fits?",
                        mascotEmotion: 'thinking',
                        options: ['am', 'is', 'are'],
                        correct: 1
                    },
                    {
                        type: 'tip',
                        mascotText: "Remember: He's = He is, She's = She is, It's = It is. These short forms are super common!",
                        mascotEmotion: 'happy',
                        tipText: "He's = He is, She's = She is, It's = It is. Use them to sound more natural!"
                    }
                ],
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct form',
                            sentence: 'She ___ from Brazil.',
                            options: ['am', 'is', 'are'],
                            correct: 1
                        }
                    },
                    {
                        type: 'match-pairs',
                        data: {
                            instruction: 'Match the country with the nationality',
                            pairs: [
                                { left: 'Japan', right: 'Japanese' },
                                { left: 'Brazil', right: 'Brazilian' },
                                { left: 'France', right: 'French' },
                                { left: 'Italy', right: 'Italian' }
                            ]
                        }
                    },
                    {
                        type: 'type-translation',
                        data: {
                            instruction: 'Translate to English',
                            sourceText: 'Он из Японии.',
                            fromLang: 'RU',
                            toLang: 'EN',
                            answer: 'He is from Japan'
                        }
                    },
                    {
                        type: 'image-choice',
                        data: {
                            instruction: 'Which flag represents France?',
                            word: 'France',
                            options: [
                                { emoji: '🇬🇧', label: 'UK' },
                                { emoji: '🇫🇷', label: 'France' },
                                { emoji: '🇩🇪', label: 'Germany' },
                                { emoji: '🇪🇸', label: 'Spain' }
                            ],
                            correct: 1
                        }
                    }
                ]
            },
            {
                id: 3,
                title: 'Unit 3: Are you on holiday?',
                desc: 'Verb be in plural. Nationalities. Phone numbers 11-100.',
                grammar: ['verb be (plural): we, you, they', 'Wh- and How questions with be'],
                vocab: ['nationalities (plural)', 'phone numbers 11-100', 'holiday vocabulary'],
                pronunciation: ['/dʒ/', '/tʃ/', '/ʃ/'],
                homework: { prompt: 'Write your phone number in words. Ask 3 questions using "Where/What/How".' },
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct form',
                            sentence: 'We ___ on holiday.',
                            options: ['am', 'is', 'are'],
                            correct: 2
                        }
                    },
                    {
                        type: 'word-shuffle',
                        data: {
                            instruction: 'Make a question',
                            words: ['are', 'where', 'you', 'from', '?'],
                            correct: ['where', 'are', 'you', 'from', '?']
                        }
                    },
                    {
                        type: 'listen-type',
                        data: {
                            instruction: 'Listen and type the number you hear',
                            text: 'forty-seven',
                            hint: 'Write the number in words.'
                        }
                    },
                    {
                        type: 'type-translation',
                        data: {
                            instruction: 'Translate to English',
                            sourceText: 'Они из Мексики.',
                            fromLang: 'RU',
                            toLang: 'EN',
                            answer: 'They are from Mexico'
                        }
                    }
                ]
            },
            {
                id: 4,
                title: 'Unit 4: Where are my keys?',
                desc: 'Singular and plural nouns. Articles a/an. Small things vocabulary.',
                grammar: ['singular and plural nouns', 'a / an', 'this / that / these / those'],
                vocab: ['small things (keys, phone, bag, wallet)', 'souvenirs', 'classroom objects'],
                pronunciation: ['/z/', '/s/', 'plural endings'],
                homework: { prompt: 'Look around your room. Write 5 sentences: "There is a..." or "There are..."' },
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose: a or an?',
                            sentence: 'She has ___ umbrella.',
                            options: ['a', 'an'],
                            correct: 1
                        }
                    },
                    {
                        type: 'image-choice',
                        data: {
                            instruction: 'Choose the correct picture',
                            word: 'Keys',
                            options: [
                                { emoji: '🔑', label: 'Keys' },
                                { emoji: '📱', label: 'Phone' },
                                { emoji: '👛', label: 'Wallet' },
                                { emoji: '🎒', label: 'Bag' }
                            ],
                            correct: 0
                        }
                    },
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct word',
                            sentence: '___ is my book. (pointing to a book near you)',
                            options: ['This', 'That', 'These', 'Those'],
                            correct: 0
                        }
                    },
                    {
                        type: 'match-pairs',
                        data: {
                            instruction: 'Match singular to plural',
                            pairs: [
                                { left: 'key', right: 'keys' },
                                { left: 'bus', right: 'buses' },
                                { left: 'child', right: 'children' },
                                { left: 'person', right: 'people' }
                            ]
                        }
                    }
                ]
            },
            {
                id: 5,
                title: 'Unit 5: Meet the family',
                desc: 'Possessive adjectives (my, your, his, her). Family vocabulary.',
                grammar: ['possessive adjectives (my, your, his, her, its, our, their)', "possessive 's"],
                vocab: ['people and family (mother, father, sister, brother, son, daughter)', 'adjectives'],
                pronunciation: ['/ʌ/', '/æ/', '/ə/'],
                homework: { prompt: 'Describe your family. Use possessive adjectives: "My mother is...", "Her name is..."' },
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct possessive adjective',
                            sentence: 'Anna is ___ sister. (= the sister of Tom)',
                            options: ['my', 'his', 'her', 'their'],
                            correct: 1
                        }
                    },
                    {
                        type: 'match-pairs',
                        data: {
                            instruction: 'Match the family words',
                            pairs: [
                                { left: 'mother', right: 'мама' },
                                { left: 'father', right: 'папа' },
                                { left: 'daughter', right: 'дочь' },
                                { left: 'brother', right: 'брат' }
                            ]
                        }
                    },
                    {
                        type: 'word-shuffle',
                        data: {
                            instruction: 'Put the words in order',
                            words: ['is', 'my', 'this', 'wife'],
                            correct: ['this', 'is', 'my', 'wife']
                        }
                    },
                    {
                        type: 'type-translation',
                        data: {
                            instruction: 'Translate to English',
                            sourceText: 'Её муж — врач.',
                            fromLang: 'RU',
                            toLang: 'EN',
                            answer: 'Her husband is a doctor'
                        }
                    }
                ]
            },
            {
                id: 6,
                title: 'Unit 6: A big breakfast',
                desc: 'Present Simple positive and negative (I/you/we/they). Food and drink.',
                grammar: ['present simple + and – (I, you, we, they)', 'present simple questions (I, you, we, they)'],
                vocab: ['food and drink (coffee, tea, bread, eggs, juice)', 'common verb phrases'],
                pronunciation: ['/dʒ/', '/g/'],
                homework: { prompt: 'Write about your typical breakfast. What do you eat? What do you drink?' },
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct verb form',
                            sentence: 'I ___ coffee in the morning.',
                            options: ['drink', 'drinks', 'drinking'],
                            correct: 0
                        }
                    },
                    {
                        type: 'image-choice',
                        data: {
                            instruction: 'Choose the correct picture',
                            word: 'Coffee',
                            options: [
                                { emoji: '☕', label: 'Coffee' },
                                { emoji: '🍵', label: 'Tea' },
                                { emoji: '🥤', label: 'Juice' },
                                { emoji: '🥛', label: 'Milk' }
                            ],
                            correct: 0
                        }
                    },
                    {
                        type: 'word-shuffle',
                        data: {
                            instruction: 'Make a negative sentence',
                            words: ["don't", 'we', 'eat', 'meat'],
                            correct: ['we', "don't", 'eat', 'meat']
                        }
                    },
                    {
                        type: 'read-answer',
                        data: {
                            instruction: 'Read and answer the question',
                            passage: 'In the UK, a traditional English breakfast includes eggs, bacon, sausages, toast, and tea. Many people also have cereal or fruit juice.',
                            question: 'What do people drink with a traditional English breakfast?',
                            options: ['Coffee', 'Tea', 'Water', 'Juice'],
                            correct: 1
                        }
                    }
                ]
            },
            {
                id: 7,
                title: 'Unit 7: A school reunion',
                desc: 'Present Simple with he/she/it. Jobs and places of work. Daily routines.',
                grammar: ['present simple: he, she, it (+s/-es)', 'adverbs of frequency (always, usually, sometimes, never)'],
                vocab: ['jobs (doctor, teacher, engineer)', 'places of work', 'daily routine verbs'],
                pronunciation: ['third person -es', 'sentence rhythm'],
                homework: { prompt: 'Describe your daily routine. Use adverbs of frequency: always, usually, sometimes, never.' },
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct form',
                            sentence: 'She ___ in a hospital.',
                            options: ['work', 'works', 'working'],
                            correct: 1
                        }
                    },
                    {
                        type: 'match-pairs',
                        data: {
                            instruction: 'Match the job with the place',
                            pairs: [
                                { left: 'doctor', right: 'hospital' },
                                { left: 'teacher', right: 'school' },
                                { left: 'waiter', right: 'restaurant' },
                                { left: 'pilot', right: 'airport' }
                            ]
                        }
                    },
                    {
                        type: 'word-shuffle',
                        data: {
                            instruction: 'Put the words in order',
                            words: ['usually', 'he', 'at', 'gets up', '7'],
                            correct: ['he', 'usually', 'gets up', 'at', '7']
                        }
                    },
                    {
                        type: 'speak-aloud',
                        data: {
                            instruction: 'Say this sentence aloud:',
                            phrase: 'She always has breakfast at eight'
                        }
                    }
                ]
            },
            {
                id: 8,
                title: 'Unit 8: Have a nice weekend!',
                desc: 'Word order in questions. Imperatives. Object pronouns. Free time vocabulary.',
                grammar: ['word order in questions', 'imperatives (sit down, open your book)', 'object pronouns (me, him, her, us, them)'],
                vocab: ['free time activities', 'films and cinema', 'weekend activities'],
                pronunciation: ['/w/', '/h/', '/eə/', '/aʊ/'],
                homework: { prompt: 'Write about your last weekend. What did you do? Use 5 sentences.' },
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct pronoun',
                            sentence: 'I like Anna. I see ___ every day.',
                            options: ['she', 'her', 'him', 'they'],
                            correct: 1
                        }
                    },
                    {
                        type: 'word-shuffle',
                        data: {
                            instruction: 'Make a question',
                            words: ['do', 'what', 'you', 'at', 'do', 'weekends', '?'],
                            correct: ['what', 'do', 'you', 'do', 'at', 'weekends', '?']
                        }
                    },
                    {
                        type: 'match-pairs',
                        data: {
                            instruction: 'Match subject pronoun to object pronoun',
                            pairs: [
                                { left: 'I', right: 'me' },
                                { left: 'he', right: 'him' },
                                { left: 'she', right: 'her' },
                                { left: 'they', right: 'them' }
                            ]
                        }
                    },
                    {
                        type: 'type-translation',
                        data: {
                            instruction: 'Translate to English',
                            sourceText: 'Откройте ваши книги.',
                            fromLang: 'RU',
                            toLang: 'EN',
                            answer: 'Open your books'
                        }
                    }
                ]
            },
            {
                id: 9,
                title: 'Unit 9: Can I park here?',
                desc: 'Can/can\'t for ability and permission. Like + verb-ing.',
                grammar: ["can / can't", 'like / love / hate + verb + -ing'],
                vocab: ['more verb phrases', 'activities (swimming, cooking, dancing)', 'permission phrases'],
                pronunciation: ["can / can't", '/ʊ/', '/uː/'],
                homework: { prompt: 'Write 5 things you can do and 3 things you can\'t do.' },
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct answer',
                            sentence: 'I ___ swim very well.',
                            options: ['can', "can't", 'do'],
                            correct: 0
                        }
                    },
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct form',
                            sentence: 'She loves ___.',
                            options: ['cook', 'cooking', 'to cooking'],
                            correct: 1
                        }
                    },
                    {
                        type: 'match-pairs',
                        data: {
                            instruction: 'Match the activity',
                            pairs: [
                                { left: '🏊', right: 'swimming' },
                                { left: '🎸', right: 'playing guitar' },
                                { left: '🍳', right: 'cooking' },
                                { left: '💃', right: 'dancing' }
                            ]
                        }
                    },
                    {
                        type: 'speak-aloud',
                        data: {
                            instruction: 'Say this sentence:',
                            phrase: "I can't speak French but I can speak English"
                        }
                    }
                ]
            },
            {
                id: 10,
                title: 'Unit 10: Present continuous & clothes',
                desc: 'Present continuous tense. Describing what people are doing now. Clothes vocabulary.',
                grammar: ['present continuous (am/is/are + -ing)', 'present continuous or present simple?'],
                vocab: ['clothes (shirt, trousers, dress, shoes)', 'actions happening now'],
                pronunciation: ['/ɜː/', 'vowel sounds'],
                homework: { prompt: 'Describe what your family members are doing right now. Use present continuous.' },
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct form',
                            sentence: 'She ___ a red dress today.',
                            options: ['wears', 'is wearing', 'wear'],
                            correct: 1
                        }
                    },
                    {
                        type: 'image-choice',
                        data: {
                            instruction: 'What is the person doing?',
                            word: 'Reading',
                            options: [
                                { emoji: '📖', label: 'Reading' },
                                { emoji: '🏃', label: 'Running' },
                                { emoji: '🍳', label: 'Cooking' },
                                { emoji: '😴', label: 'Sleeping' }
                            ],
                            correct: 0
                        }
                    },
                    {
                        type: 'type-translation',
                        data: {
                            instruction: 'Translate to English',
                            sourceText: 'Они сейчас играют в футбол.',
                            fromLang: 'RU',
                            toLang: 'EN',
                            answer: 'They are playing football now'
                        }
                    },
                    {
                        type: 'word-shuffle',
                        data: {
                            instruction: 'Put the words in order',
                            words: ['is', 'he', 'what', 'wearing', '?'],
                            correct: ['what', 'is', 'he', 'wearing', '?']
                        }
                    }
                ]
            },
            {
                id: 11,
                title: "Unit 11: There's a... / Where were you?",
                desc: "There is/there are. Past simple of 'be'. Hotels and prepositions.",
                grammar: ["there's a… / there are some…", 'past simple: was / were'],
                vocab: ['hotels (room, bathroom, bed)', 'prepositions (in, on, under, next to)', 'time expressions'],
                pronunciation: ['/ɪə/', '/eə/'],
                homework: { prompt: 'Describe your room using there is/there are. Then write where you were yesterday.' },
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct word',
                            sentence: 'There ___ two beds in the room.',
                            options: ['is', 'are', 'was'],
                            correct: 1
                        }
                    },
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct past form',
                            sentence: 'Where ___ you yesterday?',
                            options: ['was', 'were', 'are'],
                            correct: 1
                        }
                    },
                    {
                        type: 'match-pairs',
                        data: {
                            instruction: 'Match preposition to picture',
                            pairs: [
                                { left: '📦⬆️', right: 'on' },
                                { left: '📦⬇️', right: 'under' },
                                { left: '📦↔️', right: 'next to' },
                                { left: '📦🔲', right: 'in' }
                            ]
                        }
                    },
                    {
                        type: 'type-translation',
                        data: {
                            instruction: 'Translate to English',
                            sourceText: 'Я был дома вчера.',
                            fromLang: 'RU',
                            toLang: 'EN',
                            answer: 'I was at home yesterday'
                        }
                    }
                ]
            },
            {
                id: 12,
                title: 'Unit 12: Past simple — regular and irregular',
                desc: 'Past simple with regular and irregular verbs. Telling stories.',
                grammar: ['past simple: regular verbs (-ed)', 'past simple: irregular verbs (go-went, have-had, do-did)'],
                vocab: ['regular verbs (worked, played, watched)', 'irregular verbs (went, had, did, got)', 'time expressions (yesterday, last week, ago)'],
                pronunciation: ['regular past simple endings /d/, /t/, /ɪd/', 'irregular verbs'],
                homework: { prompt: 'Write about what you did last weekend. Use at least 5 past simple verbs.' },
                exercises: [
                    {
                        type: 'fill-bubble',
                        data: {
                            instruction: 'Choose the correct past form of "go"',
                            sentence: 'We ___ to the cinema last night.',
                            options: ['go', 'went', 'goed'],
                            correct: 1
                        }
                    },
                    {
                        type: 'match-pairs',
                        data: {
                            instruction: 'Match present to past',
                            pairs: [
                                { left: 'go', right: 'went' },
                                { left: 'have', right: 'had' },
                                { left: 'see', right: 'saw' },
                                { left: 'eat', right: 'ate' }
                            ]
                        }
                    },
                    {
                        type: 'word-shuffle',
                        data: {
                            instruction: 'Make a sentence',
                            words: ['yesterday', 'I', 'played', 'football'],
                            correct: ['I', 'played', 'football', 'yesterday']
                        }
                    },
                    {
                        type: 'read-answer',
                        data: {
                            instruction: 'Read and answer',
                            passage: "Last summer, Tom went to Italy with his family. They stayed in a small hotel near the beach. They visited Rome and ate a lot of pizza and pasta. Tom's favourite day was when they went to the Colosseum.",
                            question: "Where did Tom go last summer?",
                            options: ['France', 'Spain', 'Italy', 'Greece'],
                            correct: 2
                        }
                    }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════
    // A2 — ELEMENTARY (Oxford English File Elementary)
    // ═══════════════════════════════════════════
    {
        id: 'oxford_a2_elementary',
        title: 'English File A2 — Elementary',
        author: 'Oxford University Press',
        level: 'A2',
        cefr: 'A2',
        methodology: 'Building on basics. Past tenses, future plans, comparisons. Expanding vocabulary to handle familiar situations with confidence.',
        units: [
            {
                id: 1,
                title: 'Unit 1: Nice to meet you',
                desc: 'Revision of verb be. Word order in questions. Everyday objects.',
                grammar: ['verb be: revision and extension', 'word order in questions', 'possessive adjectives revision'],
                vocab: ['everyday objects', 'personal information', 'numbers review'],
                homework: { prompt: 'Write a short paragraph introducing a friend: name, age, job, interests.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Complete the question', sentence: '___ is your phone number?', options: ['What', 'Where', 'Who', 'When'], correct: 0 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a question', words: ['old', 'how', 'are', 'you', '?'], correct: ['how', 'old', 'are', 'you', '?'] } },
                    { type: 'match-pairs', data: { instruction: 'Match question and answer', pairs: [ { left: 'What do you do?', right: "I'm a student" }, { left: 'Where are you from?', right: "I'm from Russia" }, { left: 'How old are you?', right: "I'm 25" }, { left: "What's your name?", right: "I'm Anna" } ] } },
                    { type: 'type-translation', data: { instruction: 'Translate to English', sourceText: 'Сколько тебе лет?', fromLang: 'RU', toLang: 'EN', answer: 'How old are you' } }
                ]
            },
            {
                id: 2,
                title: 'Unit 2: A good time to travel',
                desc: 'Present simple: daily routines, likes and dislikes. Telling the time.',
                grammar: ['present simple (all forms)', "adverbs of frequency", 'prepositions of time (at, in, on)'],
                vocab: ['telling the time', 'daily routine verbs', 'transport'],
                homework: { prompt: 'Describe a typical day in your life from morning to evening using time expressions.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct preposition', sentence: 'I wake up ___ 7 o\'clock.', options: ['in', 'on', 'at'], correct: 2 } },
                    { type: 'fill-bubble', data: { instruction: 'Complete the sentence', sentence: 'She ___ to work by bus.', options: ['go', 'goes', 'going'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a sentence', words: ['always', 'she', 'breakfast', 'has', 'at', '8'], correct: ['she', 'always', 'has', 'breakfast', 'at', '8'] } },
                    { type: 'speak-aloud', data: { instruction: 'Say the time:', phrase: "It's half past nine" } }
                ]
            },
            {
                id: 3,
                title: 'Unit 3: Things I love doing',
                desc: 'Present continuous for now. Describing people. Appearance vocabulary.',
                grammar: ['present continuous (revision)', 'present simple vs present continuous'],
                vocab: ['appearance (tall, short, slim, curly hair)', 'describing people', 'personality adjectives'],
                homework: { prompt: 'Describe two people you know: what they look like and what they are doing right now.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Present simple or continuous?', sentence: 'She usually ___ coffee, but today she ___ tea.', options: ['drinks / is drinking', 'is drinking / drinks', 'drink / drink'], correct: 0 } },
                    { type: 'match-pairs', data: { instruction: 'Match opposites', pairs: [ { left: 'tall', right: 'short' }, { left: 'fat', right: 'thin' }, { left: 'young', right: 'old' }, { left: 'beautiful', right: 'ugly' } ] } },
                    { type: 'image-choice', data: { instruction: 'Choose the correct description', word: 'She has curly hair', options: [ { emoji: '👩‍🦱', label: 'Curly hair' }, { emoji: '👩‍🦰', label: 'Red hair' }, { emoji: '👩‍🦳', label: 'White hair' }, { emoji: '👱‍♀️', label: 'Blonde hair' } ], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate to English', sourceText: 'Она высокая и у неё длинные волосы.', fromLang: 'RU', toLang: 'EN', answer: 'She is tall and has long hair' } }
                ]
            },
            {
                id: 4,
                title: 'Unit 4: How much is it?',
                desc: 'Countable/uncountable nouns. How much/how many. Shopping vocabulary.',
                grammar: ['countable and uncountable nouns', 'a/an, some, any', 'how much / how many'],
                vocab: ['food shopping', 'containers (a bottle of, a packet of)', 'prices and money'],
                homework: { prompt: 'Write a shopping list for a dinner party (for 4 people). Use some, a, a bottle of, etc.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Countable or uncountable?', sentence: 'I need ___ water.', options: ['a', 'some', 'many'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct question', sentence: '___ sugar do you want?', options: ['How much', 'How many'], correct: 0 } },
                    { type: 'match-pairs', data: { instruction: 'Match the container', pairs: [ { left: 'a bottle of', right: 'water' }, { left: 'a packet of', right: 'crisps' }, { left: 'a cup of', right: 'tea' }, { left: 'a slice of', right: 'bread' } ] } },
                    { type: 'type-translation', data: { instruction: 'Translate to English', sourceText: 'Сколько это стоит?', fromLang: 'RU', toLang: 'EN', answer: 'How much is it' } }
                ]
            },
            {
                id: 5,
                title: 'Unit 5: Past simple — regular & irregular',
                desc: 'Past simple: regular and irregular verbs. Telling stories about past events.',
                grammar: ['past simple: regular (-ed) and irregular verbs', 'past simple: negatives and questions', 'time expressions for the past'],
                vocab: ['irregular verbs (went, saw, bought, came)', 'weekend activities', 'holiday vocabulary'],
                homework: { prompt: 'Tell about your last holiday. Where did you go? What did you do? What did you see?' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct past form', sentence: 'We ___ a great time yesterday.', options: ['have', 'had', 'haved'], correct: 1 } },
                    { type: 'match-pairs', data: { instruction: 'Match present to past', pairs: [ { left: 'buy', right: 'bought' }, { left: 'come', right: 'came' }, { left: 'see', right: 'saw' }, { left: 'take', right: 'took' } ] } },
                    { type: 'word-shuffle', data: { instruction: 'Make a question', words: ['did', 'where', 'you', 'go', 'yesterday', '?'], correct: ['where', 'did', 'you', 'go', 'yesterday', '?'] } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the negative form', sentence: 'I ___ the film. It was boring.', options: ["didn't like", "don't like", "wasn't like"], correct: 0 } }
                ]
            },
            {
                id: 6,
                title: 'Unit 6: Comparatives',
                desc: 'Comparative adjectives. Comparing people, places, and things.',
                grammar: ['comparative adjectives (bigger, more expensive)', 'than', 'as...as'],
                vocab: ['adjectives for comparison', 'city life vs country life', 'places in a city'],
                homework: { prompt: 'Compare two cities you know. Which is bigger, more interesting, more expensive?' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the comparative form', sentence: 'Moscow is ___ than London.', options: ['big', 'bigger', 'more big'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the comparative', sentence: 'This restaurant is ___ than that one.', options: ['expensiver', 'more expensive', 'most expensive'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate to English', sourceText: 'Лето теплее, чем весна.', fromLang: 'RU', toLang: 'EN', answer: 'Summer is warmer than spring' } },
                    { type: 'word-shuffle', data: { instruction: 'Make a comparison', words: ['is', 'English', 'Chinese', 'easier', 'than'], correct: ['English', 'is', 'easier', 'than', 'Chinese'] } }
                ]
            },
            {
                id: 7,
                title: 'Unit 7: Superlatives',
                desc: 'Superlative adjectives. The best, the most, the least. Experiences.',
                grammar: ['superlative adjectives (the biggest, the most beautiful)', 'irregular superlatives (the best, the worst)'],
                vocab: ['extreme adjectives', 'geography (desert, ocean, mountain)', 'world records'],
                homework: { prompt: 'Write about records: the tallest, the biggest, the most beautiful place you have visited.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the superlative', sentence: 'The Nile is ___ river in the world.', options: ['the longer', 'the longest', 'the most long'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct form', sentence: 'This is ___ film I have ever seen.', options: ['the worst', 'the baddest', 'the most bad'], correct: 0 } },
                    { type: 'match-pairs', data: { instruction: 'Match adjective to superlative', pairs: [ { left: 'good', right: 'the best' }, { left: 'bad', right: 'the worst' }, { left: 'far', right: 'the farthest' }, { left: 'big', right: 'the biggest' } ] } },
                    { type: 'type-translation', data: { instruction: 'Translate to English', sourceText: 'Это лучший ресторан в городе.', fromLang: 'RU', toLang: 'EN', answer: 'This is the best restaurant in the city' } }
                ]
            },
            {
                id: 8,
                title: 'Unit 8: Going to + future plans',
                desc: 'Be going to for future plans and predictions. Will for instant decisions.',
                grammar: ['be going to (plans and intentions)', 'will for instant decisions and offers', 'shall for suggestions'],
                vocab: ['future time expressions (tomorrow, next week)', 'weather', 'travel plans'],
                homework: { prompt: 'Write about your plans for next weekend and next summer. Use going to and will.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct future form', sentence: 'I ___ visit my grandmother next Sunday.', options: ['going to', 'am going to', 'will going to'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Instant decision — use will', sentence: "'It's cold.' — 'I ___ close the window.'", options: ['am going to', 'will', 'going to'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a sentence about future plans', words: ['going', 'we', 'to', 'are', 'Italy', 'fly', 'to'], correct: ['we', 'are', 'going', 'to', 'fly', 'to', 'Italy'] } },
                    { type: 'speak-aloud', data: { instruction: 'Say your plan:', phrase: "I'm going to learn English every day" } }
                ]
            },
            {
                id: 9,
                title: 'Unit 9: Present perfect — experiences',
                desc: 'Present Perfect for life experiences. Have you ever...? Been vs gone.',
                grammar: ['present perfect: have/has + past participle', 'ever, never', 'been vs gone'],
                vocab: ['past participles', 'life experiences', 'travel experiences'],
                homework: { prompt: 'Write 5 things you have done in your life (use ever/never). Have you ever been to...?' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct form', sentence: 'I have never ___ to Japan.', options: ['be', 'been', 'gone', 'went'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Present perfect or past simple?', sentence: 'She ___ to Paris last year.', options: ['has been', 'went', 'has gone'], correct: 1 } },
                    { type: 'match-pairs', data: { instruction: 'Match verb to past participle', pairs: [ { left: 'eat', right: 'eaten' }, { left: 'see', right: 'seen' }, { left: 'do', right: 'done' }, { left: 'write', right: 'written' } ] } },
                    { type: 'type-translation', data: { instruction: 'Translate to English', sourceText: 'Ты когда-нибудь был в Лондоне?', fromLang: 'RU', toLang: 'EN', answer: 'Have you ever been to London' } }
                ]
            },
            {
                id: 10,
                title: 'Unit 10: Review & Communication',
                desc: 'Review all A2 grammar and vocabulary. Practical communication skills.',
                grammar: ['revision: present simple, past simple, present perfect, going to, will', 'question forms revision'],
                vocab: ['revision of all A2 vocabulary', 'functional language (apologizing, asking for directions)'],
                homework: { prompt: 'Write a diary entry about today. Use present simple, past simple, and present perfect.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct tense', sentence: 'I ___ English for two years.', options: ['study', 'studied', 'have studied'], correct: 2 } },
                    { type: 'read-answer', data: { instruction: 'Read the dialogue and answer', passage: "'Excuse me, can you tell me the way to the station?' 'Sure. Go straight, then turn left at the traffic lights. The station is on your right.'", question: 'Where do you turn left?', options: ['At the corner', 'At the traffic lights', 'At the station', 'At the park'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a polite request', words: ['could', 'me', 'you', 'help', 'please', '?'], correct: ['could', 'you', 'help', 'me', 'please', '?'] } },
                    { type: 'speak-aloud', data: { instruction: 'Say politely:', phrase: "Excuse me, could you help me please?" } }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════
    // B1 — PRE-INTERMEDIATE/INTERMEDIATE
    // ═══════════════════════════════════════════
    {
        id: 'oxford_b1_intermediate',
        title: 'English File B1 — Pre-Intermediate',
        author: 'Oxford University Press',
        level: 'B1',
        cefr: 'B1',
        methodology: 'Developing fluency. Complex tenses, conditionals, passive voice. Expanding ability to discuss opinions, experiences, and plans in detail.',
        units: [
            {
                id: 1, title: 'Unit 1: Who knows you better?',
                desc: 'Present tenses review. Questions and auxiliaries. Food and restaurants.',
                grammar: ['present simple and continuous review', 'question formation', 'auxiliary verbs'],
                vocab: ['food and cooking', 'restaurants', 'personality adjectives'],
                homework: { prompt: 'Write about your best friend. Describe their personality and what they usually do vs what they\'re doing now.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Simple or continuous?', sentence: 'I usually ___ tea, but right now I ___ coffee.', options: ['drink / am drinking', 'am drinking / drink', 'drinks / drinking'], correct: 0 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a question', words: ['often', 'how', 'do', 'exercise', 'you', '?'], correct: ['how', 'often', 'do', 'you', 'exercise', '?'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Что ты обычно делаешь по вечерам?', fromLang: 'RU', toLang: 'EN', answer: 'What do you usually do in the evenings' } },
                    { type: 'speak-aloud', data: { instruction: 'Answer the question aloud:', phrase: 'I usually watch TV in the evenings' } }
                ]
            },
            {
                id: 2, title: 'Unit 2: Right place, wrong person',
                desc: 'Past tenses. Past simple vs past continuous. Prepositions of time and place.',
                grammar: ['past simple review', 'past continuous (was/were + -ing)', 'past simple vs past continuous'],
                vocab: ['holidays', 'prepositions of time and place', 'adjectives for feelings'],
                homework: { prompt: 'Tell a story about something that happened during a holiday. What were you doing when it happened?' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Past simple or continuous?', sentence: 'I ___ when the phone ___.', options: ['was sleeping / rang', 'slept / was ringing', 'was sleeping / was ringing'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct form', sentence: 'While we ___ dinner, the lights went out.', options: ['had', 'were having', 'have had'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a sentence', words: ['reading', 'was', 'she', 'when', 'arrived', 'I'], correct: ['she', 'was', 'reading', 'when', 'I', 'arrived'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Когда я шёл домой, начался дождь.', fromLang: 'RU', toLang: 'EN', answer: 'When I was walking home, it started to rain' } }
                ]
            },
            {
                id: 3, title: 'Unit 3: Plans and dreams',
                desc: 'Future forms. Going to, will, present continuous for arrangements.',
                grammar: ['going to (plans)', 'will (predictions, promises, offers)', 'present continuous for arrangements'],
                vocab: ['life events', 'making arrangements', 'weather and nature'],
                homework: { prompt: 'Write about your plans for this year and predictions for the next 10 years.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the best future form', sentence: 'I ___ a doctor. I\'ve already applied to university.', options: ['will be', 'am going to be', 'am being'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Promise or plan?', sentence: "'I forgot my wallet.' — 'Don't worry, I ___ pay.'", options: ['am going to', 'will', 'am'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Мы встречаемся с друзьями завтра в 7.', fromLang: 'RU', toLang: 'EN', answer: "We are meeting friends tomorrow at 7" } },
                    { type: 'match-pairs', data: { instruction: 'Match the situation to the future form', pairs: [ { left: 'Fixed plan', right: 'going to' }, { left: 'Promise', right: 'will' }, { left: 'Arrangement', right: 'present continuous' }, { left: 'Prediction with evidence', right: 'going to' } ] } }
                ]
            },
            {
                id: 4, title: 'Unit 4: Let\'s go out',
                desc: 'Present perfect and past simple. For/since. Describing experiences.',
                grammar: ['present perfect vs past simple', 'for and since', 'present perfect continuous (introduction)'],
                vocab: ['entertainment (theatre, concert, exhibition)', 'time expressions', 'communication verbs'],
                homework: { prompt: 'Write about your experiences: things you have done, how long you have done them, and when you did them for the last time.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'For or since?', sentence: 'I have lived here ___ 2015.', options: ['for', 'since'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Present perfect or past simple?', sentence: 'She ___ three books this year.', options: ['read', 'has read', 'was reading'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Я живу здесь уже 5 лет.', fromLang: 'RU', toLang: 'EN', answer: 'I have lived here for 5 years' } },
                    { type: 'word-shuffle', data: { instruction: 'Make a question', words: ['have', 'how long', 'English', 'you', 'studied', '?'], correct: ['how long', 'have', 'you', 'studied', 'English', '?'] } }
                ]
            },
            {
                id: 5, title: 'Unit 5: Faster, bolder, stronger',
                desc: 'Comparatives and superlatives review. Modifiers (a bit, much, far).',
                grammar: ['comparatives and superlatives (review)', 'modifiers (a bit, much, far, slightly)', 'as...as'],
                vocab: ['sports and competition', 'health and fitness', 'extreme adjectives (exhausted, fascinating)'],
                homework: { prompt: 'Compare three sports you know. Which is the most exciting? The most difficult? Use modifiers.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the modifier', sentence: 'Tokyo is ___ more expensive than Bangkok.', options: ['much', 'more', 'the'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Complete the comparison', sentence: 'This book isn\'t ___ interesting ___ the movie.', options: ['as / as', 'so / than', 'more / as'], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Она намного умнее своего брата.', fromLang: 'RU', toLang: 'EN', answer: 'She is much smarter than her brother' } },
                    { type: 'speak-aloud', data: { instruction: 'Compare:', phrase: 'English is not as difficult as Chinese' } }
                ]
            },
            {
                id: 6, title: 'Unit 6: If something can go wrong...',
                desc: 'First conditional. When, if, unless. Making predictions and warnings.',
                grammar: ['first conditional (if + present, will + infinitive)', 'when, as soon as, unless', 'may/might for possibility'],
                vocab: ['machines and technology', 'phrasal verbs (turn on, switch off)', 'problems and solutions'],
                homework: { prompt: 'Write 5 first conditional sentences about technology. If my phone breaks, I will...' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Complete the first conditional', sentence: 'If it ___ tomorrow, we\'ll stay home.', options: ['will rain', 'rains', 'rained'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct word', sentence: 'I\'ll call you ___ I arrive.', options: ['if', 'when', 'unless'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a conditional sentence', words: ['won\'t', 'you', 'hurry', 'if', 'don\'t', 'be', 'you', 'late'], correct: ['if', 'you', 'don\'t', 'hurry', 'you', 'won\'t', 'be', 'late'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Если ты будешь практиковаться каждый день, ты выучишь английский.', fromLang: 'RU', toLang: 'EN', answer: 'If you practice every day, you will learn English' } }
                ]
            },
            {
                id: 7, title: 'Unit 7: What should I do?',
                desc: 'Modal verbs: should, must, have to. Giving advice. Health problems.',
                grammar: ['should / shouldn\'t', 'must / mustn\'t', 'have to / don\'t have to'],
                vocab: ['health and body (headache, stomachache)', 'at the doctor', 'advice phrases'],
                homework: { prompt: 'A friend is stressed about exams. Write advice using should, must, have to.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct modal', sentence: 'You ___ eat more vegetables. It\'s good for you.', options: ['should', 'must', 'have to'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Obligation or advice?', sentence: 'You ___ wear a seatbelt. It\'s the law.', options: ['should', 'must', 'could'], correct: 1 } },
                    { type: 'match-pairs', data: { instruction: 'Match modal to meaning', pairs: [ { left: 'should', right: 'advice' }, { left: 'must', right: 'obligation' }, { left: "don't have to", right: 'not necessary' }, { left: "mustn't", right: 'prohibition' } ] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Тебе не нужно приходить завтра.', fromLang: 'RU', toLang: 'EN', answer: "You don't have to come tomorrow" } }
                ]
            },
            {
                id: 8, title: 'Unit 8: Passions and obsessions',
                desc: 'Passive voice (present and past). Used to. Describing habits in the past.',
                grammar: ['passive voice: present simple and past simple', 'used to + infinitive', 'used to vs past simple'],
                vocab: ['music and art', 'inventions', 'historical events'],
                homework: { prompt: 'Write about what you used to do as a child. What has changed? Use passive voice for 2 sentences.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Active or passive?', sentence: 'The Mona Lisa ___ by Leonardo da Vinci.', options: ['painted', 'was painted', 'is painted'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Complete with used to', sentence: 'I ___ live in Moscow, but now I live in London.', options: ['use to', 'used to', 'was used to'], correct: 1 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a passive sentence', words: ['is', 'English', 'spoken', 'many', 'in', 'countries'], correct: ['English', 'is', 'spoken', 'in', 'many', 'countries'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Эта книга была написана в 1960 году.', fromLang: 'RU', toLang: 'EN', answer: 'This book was written in 1960' } }
                ]
            },
            {
                id: 9, title: 'Unit 9: Crime doesn\'t pay',
                desc: 'Second conditional. Making hypothetical statements.',
                grammar: ['second conditional (if + past, would + infinitive)', 'would / wouldn\'t'],
                vocab: ['crime (steal, rob, arrest)', 'law and order', 'money and finance'],
                homework: { prompt: 'Answer: If you won a million dollars, what would you do? Write 5 sentences.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Complete the second conditional', sentence: 'If I ___ a car, I would drive to work.', options: ['have', 'had', 'would have'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'First or second conditional?', sentence: 'If I ___ you, I would apologize.', options: ['am', 'was', 'were'], correct: 2 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Если бы я знал ответ, я бы тебе сказал.', fromLang: 'RU', toLang: 'EN', answer: 'If I knew the answer, I would tell you' } },
                    { type: 'word-shuffle', data: { instruction: 'Make a second conditional', words: ['would', 'what', 'you', 'do', 'if', 'you', 'could', 'fly', '?'], correct: ['what', 'would', 'you', 'do', 'if', 'you', 'could', 'fly', '?'] } }
                ]
            },
            {
                id: 10, title: 'Unit 10: Revision & Communication mastery',
                desc: 'Review all B1 grammar. Functional language for travel, shopping, complaints.',
                grammar: ['all B1 tenses revision', 'question tags', 'reported speech introduction'],
                vocab: ['functional language', 'phrasal verbs review', 'word formation'],
                homework: { prompt: 'Write a story using at least 4 different tenses. Describe what happened, what was happening, and what will happen.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Add the question tag', sentence: "You're a student, ___?", options: ["aren't you", "are you", "isn't it"], correct: 0 } },
                    { type: 'read-answer', data: { instruction: 'Read and answer', passage: "The English language has about 170,000 words in current use. A typical native speaker uses about 20,000-35,000 words. However, you only need about 3,000 words to understand 95% of everyday English.", question: 'How many words do you need to understand 95% of everyday English?', options: ['170,000', '35,000', '3,000', '20,000'], correct: 2 } },
                    { type: 'speak-aloud', data: { instruction: 'Describe your English level:', phrase: 'I have been learning English for two years and I can understand most conversations' } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Он сказал, что придёт завтра.', fromLang: 'RU', toLang: 'EN', answer: 'He said he would come tomorrow' } }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════
    // B2 — UPPER-INTERMEDIATE
    // ═══════════════════════════════════════════
    {
        id: 'oxford_b2_upper_intermediate',
        title: 'English File B2 — Upper-Intermediate',
        author: 'Oxford University Press',
        level: 'B2',
        cefr: 'B2',
        methodology: 'Achieving independence. Complex grammar structures, nuance, formal/informal register. Building academic and professional language skills.',
        units: [
            {
                id: 1, title: 'Unit 1: Questions and answers',
                desc: 'Complex question forms. Subject/object questions. Indirect questions.',
                grammar: ['question formation (review)', 'subject and object questions', 'indirect questions (Could you tell me...?)'],
                vocab: ['personality and appearance', 'compound adjectives (well-known, good-looking)', 'relationships'],
                homework: { prompt: 'Write 10 indirect questions you would ask a celebrity in an interview.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Subject or object question?', sentence: 'Who ___ you to the party?', options: ['invited', 'did invite', 'did invited'], correct: 0 } },
                    { type: 'word-shuffle', data: { instruction: 'Make an indirect question', words: ['tell', 'you', 'could', 'me', 'where', 'station', 'the', 'is', '?'], correct: ['could', 'you', 'tell', 'me', 'where', 'the', 'station', 'is', '?'] } },
                    { type: 'type-translation', data: { instruction: 'Translate to English', sourceText: 'Не могли бы вы сказать мне, сколько это стоит?', fromLang: 'RU', toLang: 'EN', answer: 'Could you tell me how much this costs' } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct form', sentence: 'I wonder ___ he lives.', options: ['where', 'where does', 'does where'], correct: 0 } }
                ]
            },
            {
                id: 2, title: 'Unit 2: Present perfect simple & continuous',
                desc: 'Present perfect simple vs continuous. How long...? Duration and result.',
                grammar: ['present perfect simple vs continuous', 'for, since, how long', 'still, yet, already, just'],
                vocab: ['work and employment', 'job interviews', 'achievement verbs'],
                homework: { prompt: 'Write about your achievements and ongoing activities. What have you done? What have you been doing?' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Simple or continuous?', sentence: 'I ___ this book for three hours. (still reading)', options: ['have read', 'have been reading', 'read'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct form', sentence: 'She ___ five emails today. (finished)', options: ['has written', 'has been writing', 'wrote'], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Я работаю здесь уже 3 года.', fromLang: 'RU', toLang: 'EN', answer: 'I have been working here for 3 years' } },
                    { type: 'match-pairs', data: { instruction: 'Match with the correct tense', pairs: [ { left: 'Result (how many)', right: 'present perfect simple' }, { left: 'Duration (how long)', right: 'present perfect continuous' }, { left: 'Just finished', right: 'present perfect simple' }, { left: 'Still in progress', right: 'present perfect continuous' } ] } }
                ]
            },
            {
                id: 3, title: 'Unit 3: Narrative tenses',
                desc: 'Past simple, past continuous, past perfect. Storytelling.',
                grammar: ['past perfect (had + past participle)', 'narrative tenses (simple, continuous, perfect)', 'time linkers (when, while, as soon as, by the time)'],
                vocab: ['storytelling', 'adverbs (suddenly, immediately, eventually)', 'news and media'],
                homework: { prompt: 'Write a short story (150 words) using all three past tenses. Start with: "It was a dark and stormy night..."' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct tense', sentence: 'When I arrived, she ___ already ___.',  options: ['had / left', 'has / left', 'was / leaving'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Past perfect or past simple?', sentence: 'I ___ dinner before he ___.', options: ['had cooked / arrived', 'cooked / had arrived', 'was cooking / arrived'], correct: 0 } },
                    { type: 'word-shuffle', data: { instruction: 'Make a sentence with past perfect', words: ['had', 'by the time', 'arrived', 'we', 'the film', 'started', ','], correct: ['by the time', 'we', 'arrived', ',', 'the film', 'had', 'started'] } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Я никогда раньше не видел такого красивого заката.', fromLang: 'RU', toLang: 'EN', answer: 'I had never seen such a beautiful sunset before' } }
                ]
            },
            {
                id: 4, title: 'Unit 4: Future perfect & continuous',
                desc: 'Future perfect and continuous. Making predictions about the future.',
                grammar: ['future perfect (will have + past participle)', 'future continuous (will be + -ing)', 'future time clauses'],
                vocab: ['technology and future', 'environment', 'predictions'],
                homework: { prompt: 'Write predictions: By 2050, what will have changed? What will people be doing differently?' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Future perfect or continuous?', sentence: 'By next year, I ___ here for 10 years.', options: ['will work', 'will have worked', 'will be working'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct form', sentence: 'This time tomorrow, I ___ on the beach.', options: ['will lie', 'will be lying', 'will have lain'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'К тому времени, как ты придёшь, я уже закончу работу.', fromLang: 'RU', toLang: 'EN', answer: 'By the time you come, I will have finished work' } },
                    { type: 'speak-aloud', data: { instruction: 'Make a prediction:', phrase: 'In ten years, people will be using AI for everything' } }
                ]
            },
            {
                id: 5, title: 'Unit 5: Conditionals — all types',
                desc: 'Zero, first, second, third conditionals reviewed and contrasted.',
                grammar: ['third conditional (if + past perfect, would have + pp)', 'mixed conditionals', 'unless, provided that, as long as'],
                vocab: ['regrets and wishes', 'decision-making', 'consequences'],
                homework: { prompt: 'Write about 3 regrets using third conditional. If I had..., I would have...' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Third conditional', sentence: 'If I ___ harder, I would have passed the exam.', options: ['studied', 'had studied', 'would study'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Which conditional?', sentence: 'If I had known about the party, I ___ there.', options: ['would go', 'would have gone', 'will go'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Если бы я выучил английский раньше, я бы получил эту работу.', fromLang: 'RU', toLang: 'EN', answer: 'If I had learned English earlier, I would have got that job' } },
                    { type: 'match-pairs', data: { instruction: 'Match conditional to time', pairs: [ { left: 'Zero', right: 'general truth' }, { left: 'First', right: 'likely future' }, { left: 'Second', right: 'unlikely present' }, { left: 'Third', right: 'impossible past' } ] } }
                ]
            },
            {
                id: 6, title: 'Unit 6: Reported speech',
                desc: 'Reported statements, questions, commands. Reporting verbs.',
                grammar: ['reported speech: statements', 'reported questions', 'reporting verbs (suggest, advise, promise, refuse)'],
                vocab: ['media and journalism', 'saying and telling verbs', 'speech acts'],
                homework: { prompt: 'Watch a news report and write what the reporter said using reported speech.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Change to reported speech', sentence: '"I am tired." → She said she ___ tired.', options: ['is', 'was', 'were'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Reported question', sentence: '"Where do you live?" → He asked me where I ___.', options: ['live', 'lived', 'do live'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate to reported speech', sourceText: 'Он сказал, что никогда не был в России.', fromLang: 'RU', toLang: 'EN', answer: 'He said he had never been to Russia' } },
                    { type: 'word-shuffle', data: { instruction: 'Change to reported speech', words: ['she', 'said', 'that', 'would', 'she', 'call', 'later', 'me'], correct: ['she', 'said', 'that', 'she', 'would', 'call', 'me', 'later'] } }
                ]
            },
            {
                id: 7, title: 'Unit 7: Passives — all tenses',
                desc: 'Passive in all tenses. Formal writing. Impersonal structures.',
                grammar: ['passive voice: all tenses', 'it is said that.../ he is thought to...', 'have something done (causative)'],
                vocab: ['science and discoveries', 'formal/academic language', 'processes'],
                homework: { prompt: 'Describe a process (how something is made) using passive voice throughout.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Change to passive', sentence: 'Someone broke the window. → The window ___.', options: ['was broken', 'is broken', 'has been broken'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Causative have', sentence: 'I ___ my car washed yesterday.', options: ['have', 'had', 'was'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Считается, что он лучший студент.', fromLang: 'RU', toLang: 'EN', answer: 'He is considered to be the best student' } },
                    { type: 'word-shuffle', data: { instruction: 'Make a passive sentence', words: ['been', 'the', 'has', 'email', 'sent', 'already'], correct: ['the', 'email', 'has', 'already', 'been', 'sent'] } }
                ]
            },
            {
                id: 8, title: 'Unit 8: Relative clauses',
                desc: 'Defining and non-defining relative clauses. Relative pronouns.',
                grammar: ['defining relative clauses (who, which, that, where)', 'non-defining relative clauses (commas)', 'reduced relative clauses'],
                vocab: ['describing places and things', 'adjective + preposition combinations', 'compound nouns'],
                homework: { prompt: 'Describe 5 things/people/places using relative clauses. Add extra information with non-defining clauses.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the relative pronoun', sentence: 'That\'s the woman ___ won the competition.', options: ['who', 'which', 'where'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Defining or non-defining?', sentence: 'London, ___ is the capital of the UK, is very expensive.', options: ['that', 'which', 'where'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Это ресторан, где мы впервые встретились.', fromLang: 'RU', toLang: 'EN', answer: 'This is the restaurant where we first met' } },
                    { type: 'word-shuffle', data: { instruction: 'Combine into one sentence with a relative clause', words: ['the', 'who', 'works', 'man', 'here', 'is', 'my', 'brother'], correct: ['the', 'man', 'who', 'works', 'here', 'is', 'my', 'brother'] } }
                ]
            },
            {
                id: 9, title: 'Unit 9: Wish & If only',
                desc: 'Wish + past simple/past perfect. Expressing regrets and desires.',
                grammar: ['wish + past simple (present wishes)', 'wish + past perfect (past regrets)', 'wish + would (complaints about others)', 'if only'],
                vocab: ['emotions and feelings', 'regret phrases', 'social issues'],
                homework: { prompt: 'Write 3 wishes about the present, 3 regrets about the past, and 3 complaints using wish + would.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Present wish', sentence: 'I wish I ___ taller.', options: ['am', 'was/were', 'will be'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Past regret', sentence: 'I wish I ___ harder at university.', options: ['studied', 'had studied', 'would study'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Жаль, что я не говорю по-французски.', fromLang: 'RU', toLang: 'EN', answer: "I wish I spoke French" } },
                    { type: 'speak-aloud', data: { instruction: 'Express a wish:', phrase: 'I wish I had more free time' } }
                ]
            },
            {
                id: 10, title: 'Unit 10: B2 Review & Communication mastery',
                desc: 'Full review of all B2 grammar. Academic and professional communication.',
                grammar: ['all B2 grammar revision', 'cleft sentences (It was... that/who)', 'emphasis and inversion'],
                vocab: ['academic vocabulary', 'idioms and collocations', 'formal vs informal register'],
                homework: { prompt: 'Write a formal email and an informal message about the same topic. Notice the differences in register.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Identify the correct register', sentence: 'Which is more formal?', options: ["I'm writing to inquire about...", "Hey, I wanna know about...", "So like, what's up with..."], correct: 0 } },
                    { type: 'read-answer', data: { instruction: 'Read and answer', passage: "The phenomenon known as 'code-switching' refers to the practice of alternating between two or more languages or varieties of language in conversation. Research suggests that code-switching is not a sign of confusion but rather of linguistic competence.", question: "According to the text, what does code-switching indicate?", options: ['Confusion', 'Linguistic competence', 'Poor education', 'Nervousness'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate formally', sourceText: 'Был бы рад получить от вас ответ.', fromLang: 'RU', toLang: 'EN', answer: 'I would be grateful to hear from you' } },
                    { type: 'speak-aloud', data: { instruction: 'Summarize in English:', phrase: 'In my opinion, learning a second language is one of the most valuable skills you can develop' } }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════
    // C1 — ADVANCED
    // ═══════════════════════════════════════════
    {
        id: 'oxford_c1_advanced',
        title: 'English File C1 — Advanced',
        author: 'Oxford University Press',
        level: 'C1',
        cefr: 'C1',
        methodology: 'Achieving proficiency. Subtle grammar distinctions, advanced vocabulary, nuanced argumentation. Focus on academic, professional, and sophisticated social language.',
        units: [
            {
                id: 1, title: 'Unit 1: The interview',
                desc: 'Discourse markers. Complex question forms. Work and career vocabulary.',
                grammar: ['discourse markers (well, I mean, actually, basically)', 'complex question forms (negative questions, echo questions)', 'comment adverbs (apparently, obviously, presumably)'],
                vocab: ['work and business collocations', 'interview skills', 'professional communication'],
                homework: { prompt: 'Write a detailed analysis of your career path using discourse markers and comment adverbs.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the correct discourse marker', sentence: '___, I think the meeting went well, although there were some issues.', options: ['On the whole', 'By the way', 'Actually'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Negative question', sentence: '___ you supposed to be at work?', options: ["Aren't", "Don't", "Weren't"], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'По-видимому, собеседование прошло успешно.', fromLang: 'RU', toLang: 'EN', answer: 'Apparently, the interview went well' } },
                    { type: 'speak-aloud', data: { instruction: 'Use discourse markers:', phrase: "Well, to be honest, I think we need to reconsider our approach" } }
                ]
            },
            {
                id: 2, title: 'Unit 2: Speculation and deduction',
                desc: 'Must/might/can\'t + perfect infinitive. Speculating about past events.',
                grammar: ['must/might/may/can\'t + infinitive (present deduction)', 'must/might/may/can\'t + have + past participle (past deduction)', 'so/such...that'],
                vocab: ['crime and mystery', 'evidence and deduction', 'adjectives of certainty'],
                homework: { prompt: 'Look at an old photo and speculate about what was happening. Use modal verbs of deduction.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Past deduction', sentence: 'She ___ home early. Her car is here.', options: ['must have come', 'might come', 'can come'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Impossibility', sentence: 'He ___ the thief. He was with me all evening.', options: ["can't have been", "mustn't be", "shouldn't have been"], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Возможно, они уже уехали.', fromLang: 'RU', toLang: 'EN', answer: 'They might have already left' } },
                    { type: 'word-shuffle', data: { instruction: 'Make a deduction', words: ['the', 'train', 'must', 'been', 'delayed', 'have'], correct: ['the', 'train', 'must', 'have', 'been', 'delayed'] } }
                ]
            },
            {
                id: 3, title: 'Unit 3: Distancing',
                desc: 'Unreal past. Distancing techniques. Tentative language.',
                grammar: ['unreal past (wish, if only, would rather, it\'s time)', 'distancing (tend to, appear to, seem to)', 'formal subjunctive (I suggest he go...)'],
                vocab: ['social issues and politics', 'tentative language', 'academic hedging'],
                homework: { prompt: 'Write a balanced argument about a controversial topic using distancing language.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the distancing form', sentence: 'It ___ that the economy is recovering.', options: ['appears', 'is appearing', 'appeared'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Would rather', sentence: "I'd rather you ___ smoke in here.", options: ["don't", "didn't", "won't"], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Пора бы тебе начать заниматься.', fromLang: 'RU', toLang: 'EN', answer: "It's time you started studying" } },
                    { type: 'speak-aloud', data: { instruction: 'Use tentative language:', phrase: "It would seem that the situation tends to improve over time" } }
                ]
            },
            {
                id: 4, title: 'Unit 4: Inversion & emphasis',
                desc: 'Inverted conditionals. Emphatic structures. Cleft sentences.',
                grammar: ['inversion after negative adverbials (never, seldom, hardly)', 'cleft sentences (What I need is... / It was X that...)', 'inverted conditionals (Had I known..., Were he to...)'],
                vocab: ['formal writing', 'emphasis phrases', 'literary language'],
                homework: { prompt: 'Rewrite 5 sentences using inversion for emphasis: Never have I..., Seldom do we..., etc.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Inversion', sentence: 'Never ___ such a beautiful sunset.', options: ['I have seen', 'have I seen', 'I saw'], correct: 1 } },
                    { type: 'fill-bubble', data: { instruction: 'Cleft sentence', sentence: '___ really annoys me is people being late.', options: ['What', 'That', 'It'], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate with inversion', sourceText: 'Только когда он ушёл, я осознал свою ошибку.', fromLang: 'RU', toLang: 'EN', answer: 'Only when he left did I realize my mistake' } },
                    { type: 'word-shuffle', data: { instruction: 'Make an inverted conditional', words: ['had', 'I', 'known', ',', 'I', 'have', 'come', 'would'], correct: ['had', 'I', 'known', ',', 'I', 'would', 'have', 'come'] } }
                ]
            },
            {
                id: 5, title: 'Unit 5: Noun clauses & advanced connectors',
                desc: 'Noun clauses. Advanced connectors and linking devices. Formal writing.',
                grammar: ['noun clauses (The fact that..., Whether or not...)', 'advanced connectors (nevertheless, furthermore, notwithstanding)', 'participle clauses (Having done..., Being a...)'],
                vocab: ['academic vocabulary', 'formal connectors', 'abstract nouns'],
                homework: { prompt: 'Write a formal essay (200 words) using advanced connectors and participle clauses.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the connector', sentence: 'The proposal was rejected; ___, they decided to try again.', options: ['nevertheless', 'moreover', 'therefore'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Participle clause', sentence: '___ all options, we decided to postpone the meeting.', options: ['Having considered', 'Considered', 'To consider'], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate formally', sourceText: 'Несмотря на трудности, проект был завершён вовремя.', fromLang: 'RU', toLang: 'EN', answer: 'Notwithstanding the difficulties, the project was completed on time' } },
                    { type: 'read-answer', data: { instruction: 'Read and answer', passage: "The phenomenon of language attrition — the gradual loss of a language — has been extensively studied in recent years. Research suggests that the critical period for language retention is the first decade of exposure. Furthermore, emotional connections to a language appear to significantly influence its retention.", question: "What factor significantly influences language retention?", options: ['Grammar study', 'Emotional connections', 'Age at learning', 'Translation practice'], correct: 1 } }
                ]
            },
            {
                id: 6, title: 'Unit 6: Advanced modals & perfect forms',
                desc: 'Perfect modals in depth. Needn\'t have vs didn\'t need to. Advanced uses.',
                grammar: ["needn't have done vs didn't need to do", 'could have / should have / would have', "was to / was supposed to", 'advanced modal patterns'],
                vocab: ['regret and criticism', 'professional mistakes', 'formal complaints'],
                homework: { prompt: 'Write about mistakes or missed opportunities. Use needn\'t have, should have, could have.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Needn\'t have vs didn\'t need to', sentence: 'I ___ buy milk — there was plenty at home. (I bought it unnecessarily)', options: ["needn't have bought", "didn't need to buy", "shouldn't buy"], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Choose correct modal', sentence: 'You ___ told me earlier! Now it\'s too late.', options: ['should have', 'must have', 'could'], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Тебе не нужно было приходить так рано — встреча начинается в 10.', fromLang: 'RU', toLang: 'EN', answer: "You needn't have come so early — the meeting starts at 10" } },
                    { type: 'speak-aloud', data: { instruction: 'Express regret:', phrase: "I should have studied harder when I was younger" } }
                ]
            },
            {
                id: 7, title: 'Unit 7: Mixed conditionals & hypothetical past',
                desc: 'Mixed conditionals. Hypothetical situations across time. Complex wishes.',
                grammar: ['mixed conditionals (past condition → present result and vice versa)', 'wish + would for habits', 'suppose / what if / imagine'],
                vocab: ['life choices', 'alternative outcomes', 'philosophical vocabulary'],
                homework: { prompt: 'Write about how your life would be different now if you had made different choices in the past.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Mixed conditional', sentence: 'If I had studied medicine, I ___ a doctor now.', options: ['would be', 'would have been', 'will be'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Mixed conditional (reverse)', sentence: 'If she weren\'t so lazy, she ___ the exam last week.', options: ['would pass', 'would have passed', 'passed'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Если бы я родился в другой стране, моя жизнь была бы совсем другой.', fromLang: 'RU', toLang: 'EN', answer: 'If I had been born in a different country, my life would be completely different' } },
                    { type: 'word-shuffle', data: { instruction: 'Make a mixed conditional', words: ['if', 'spoken', 'had', 'I', 'English', 'I', 'would', 'abroad', 'be', 'living'], correct: ['if', 'I', 'had', 'spoken', 'English', 'I', 'would', 'be', 'living', 'abroad'] } }
                ]
            },
            {
                id: 8, title: 'Unit 8: C1 Review & Mastery',
                desc: 'Full C1 review. Academic writing. Idiomatic English.',
                grammar: ['all C1 structures revision', 'ellipsis and substitution', 'fronting for emphasis'],
                vocab: ['idioms and proverbs', 'academic writing conventions', 'collocations bank'],
                homework: { prompt: 'Write an academic-style essay (250 words) on a topic of your choice, using advanced grammar throughout.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Identify the idiom meaning', sentence: '"It\'s not my cup of tea" means:', options: ["I don't like it", 'I want tea', "It's not mine"], correct: 0 } },
                    { type: 'read-answer', data: { instruction: 'Read and answer', passage: "Noam Chomsky's theory of Universal Grammar posits that the ability to acquire language is innate to the human species. According to this view, children are born with an inherent understanding of the basic grammatical structure that underlies all human languages. This 'language acquisition device,' as Chomsky termed it, enables children to rapidly acquire the complex rules of their native language despite the relatively limited linguistic input they receive.", question: "According to Chomsky, what enables children to acquire language so quickly?", options: ['Extensive teaching', 'An innate language acquisition device', 'Memorization', 'Imitation of parents'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate idiomatically', sourceText: 'Давай не будем ходить вокруг да около.', fromLang: 'RU', toLang: 'EN', answer: "Let's not beat around the bush" } },
                    { type: 'speak-aloud', data: { instruction: 'Deliver a mini-speech:', phrase: "In conclusion, I would argue that language learning is not merely an academic pursuit, but rather a gateway to understanding different cultures and perspectives" } }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════
    // C2 — PROFICIENCY (Oxford Masterclass)
    // ═══════════════════════════════════════════
    {
        id: 'oxford_c2_proficiency',
        title: 'English File C2 — Proficiency (Masterclass)',
        author: 'Oxford University Press',
        level: 'C2',
        cefr: 'C2',
        methodology: 'Near-native mastery. Subtle stylistic choices, advanced rhetoric, literary language. Focus on nuance, ambiguity, register shifts, and sophisticated written/spoken expression.',
        units: [
            {
                id: 1, title: 'Unit 1: The power of words',
                desc: 'Advanced word formation. Connotation vs denotation. Stylistic choices.',
                grammar: ['advanced word formation (prefixes, suffixes, conversion)', 'nominalisation', 'advanced punctuation and its effect on meaning'],
                vocab: ['connotation and register', 'word families', 'literary devices (metaphor, simile, irony)'],
                homework: { prompt: 'Take a paragraph from a news article and rewrite it in 3 different registers: formal, informal, and literary.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Choose the word with the most positive connotation', sentence: 'She is very ___:', options: ['skinny', 'thin', 'slender', 'scrawny'], correct: 2 } },
                    { type: 'fill-bubble', data: { instruction: 'Word formation', sentence: 'The ___ of the project took three years. (develop)', options: ['development', 'developation', 'developing'], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate preserving the register', sourceText: 'Данное исследование ставит под сомнение общепринятую точку зрения.', fromLang: 'RU', toLang: 'EN', answer: 'This study calls into question the commonly held view' } },
                    { type: 'read-answer', data: { instruction: 'Identify the literary device', passage: '"The fog crept silently through the streets, wrapping the city in a cold, grey blanket."', question: 'What literary device is used?', options: ['Simile', 'Personification', 'Alliteration', 'Hyperbole'], correct: 1 } }
                ]
            },
            {
                id: 2, title: 'Unit 2: Advanced narrative techniques',
                desc: 'Literary narrative. Point of view. Advanced use of tenses for effect.',
                grammar: ['historic present for vivid narrative', 'would for past habits (literary)', 'free indirect speech', 'ellipsis in narrative'],
                vocab: ['narrative voice', 'atmosphere and mood', 'sensory vocabulary'],
                homework: { prompt: 'Write a short story (200 words) using the historic present, free indirect speech, and at least 3 sensory details.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Identify the narrative technique', sentence: 'She walks into the room. The lights are dim. She notices the letter on the table.', options: ['Historic present', 'Past narrative', 'Stream of consciousness'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: '"Would" for past habits', sentence: 'As a child, he ___ spend hours reading by the fire.', options: ['would', 'will', 'used'], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate literarily', sourceText: 'Она задумалась. Неужели всё это было напрасно? Нет, она не могла в это поверить.', fromLang: 'RU', toLang: 'EN', answer: "She paused to think. Had it all been for nothing? No, she couldn't believe that" } },
                    { type: 'speak-aloud', data: { instruction: 'Read this passage with expression:', phrase: "The old house stood silent at the end of the lane, its windows dark, its garden overgrown, as if time itself had forgotten it" } }
                ]
            },
            {
                id: 3, title: 'Unit 3: Argument and persuasion',
                desc: 'Rhetorical devices. Building complex arguments. Debating skills.',
                grammar: ['subjunctive mood (If it be necessary...)', 'concessive clauses (much as, however much)', 'advanced correlative conjunctions (not only...but also, whether...or)'],
                vocab: ['rhetorical devices (anaphora, tricolon, antithesis)', 'debating language', 'logical connectors'],
                homework: { prompt: 'Write a persuasive speech (250 words) arguing for or against AI in education. Use at least 3 rhetorical devices.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Concessive clause', sentence: '___ hard she tried, she couldn\'t solve the problem.', options: ['However', 'Although', 'Despite'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Identify the rhetorical device', sentence: '"We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields."', options: ['Anaphora', 'Antithesis', 'Hyperbole'], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate', sourceText: 'Как бы ни были убедительны аргументы, они не учитывают ключевой фактор.', fromLang: 'RU', toLang: 'EN', answer: 'However compelling the arguments may be, they fail to account for a key factor' } },
                    { type: 'speak-aloud', data: { instruction: 'Deliver a persuasive statement:', phrase: "Not only does language learning enhance cognitive ability, but it also fosters empathy, broadens perspectives, and ultimately makes us better global citizens" } }
                ]
            },
            {
                id: 4, title: 'Unit 4: Nuance and ambiguity',
                desc: 'Pragmatics. Implied meaning. Irony and understatement.',
                grammar: ['pragmatic inference', 'hedging and vagueness (sort of, kind of, -ish)', 'understatement and litotes (not bad = quite good)'],
                vocab: ['euphemisms', 'irony and sarcasm markers', 'cultural pragmatics'],
                homework: { prompt: 'Find 5 examples of understatement, euphemism, or irony in English media. Explain the implied meaning.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'What does the understatement mean?', sentence: '"The weather isn\'t exactly tropical today." (said during a snowstorm)', options: ['The weather is terrible', 'The weather is warm', 'The weather is normal'], correct: 0 } },
                    { type: 'fill-bubble', data: { instruction: 'Identify the euphemism', sentence: 'He passed away last Tuesday.', options: ['He died', 'He left', 'He fainted'], correct: 0 } },
                    { type: 'type-translation', data: { instruction: 'Translate the understatement', sourceText: 'Он не самый пунктуальный человек в мире.', fromLang: 'RU', toLang: 'EN', answer: "He's not exactly the most punctual person in the world" } },
                    { type: 'read-answer', data: { instruction: 'Interpret the implied meaning', passage: "'How was the exam?' asked Sarah. Tom shrugged. 'Well, I won't be writing home about it.'", question: 'How did the exam go?', options: ['Brilliantly', 'Poorly', "He didn't take it", 'He forgot'], correct: 1 } }
                ]
            },
            {
                id: 5, title: 'Unit 5: C2 Mastery — Language as art',
                desc: 'Full mastery review. Translation. Idiomatic fluency. Register switching.',
                grammar: ['all structures at native-like command', 'stylistic grammar choices', 'prescriptive vs descriptive grammar awareness'],
                vocab: ['collocations mastery', 'proverbs and sayings', 'domain-specific vocabulary'],
                homework: { prompt: 'Choose a topic and write about it in 3 paragraphs: one academic, one journalistic, one conversational. Then explain your choices.' },
                exercises: [
                    { type: 'fill-bubble', data: { instruction: 'Complete the proverb', sentence: 'A bird in the hand is worth ___', options: ['two in the bush', 'a gold mine', 'nothing at all'], correct: 0 } },
                    { type: 'read-answer', data: { instruction: 'Analyze register and style', passage: "The ramifications of the proposed legislation extend far beyond the immediate fiscal implications, encompassing a fundamental recalibration of the relationship between the state and the individual citizen. One might argue, not without justification, that such sweeping reforms necessitate a more robust democratic mandate than has hitherto been secured.", question: 'What register is this text written in?', options: ['Casual conversation', 'Academic/legal formal', 'Journalistic', 'Literary fiction'], correct: 1 } },
                    { type: 'type-translation', data: { instruction: 'Translate idiomatically', sourceText: 'Не считай цыплят, пока не вылупились.', fromLang: 'RU', toLang: 'EN', answer: "Don't count your chickens before they hatch" } },
                    { type: 'speak-aloud', data: { instruction: 'Improvise a 30-second speech on:', phrase: "If I could change one thing about the way languages are taught in schools, it would be to prioritize authentic communication over rote memorization" } }
                ]
            }
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
        // Default to A1 if not found
        this.activeTextbookId = this.textbooks[0].id;
        if (typeof LangyState !== 'undefined') {
            LangyState.progress.currentUnitId = 1;
            LangyState.aiMemory.currentTextbookId = this.textbooks[0].id;
        }
        return this.textbooks[0];
    },

    // Restore active textbook from saved state (called on app load)
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

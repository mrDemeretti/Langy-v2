/* ============================================
   LANGY — DEFAULT CURRICULUM DATA
   ============================================ */

const LangyCurriculum = {
    activeTextbookId: 'langy_core_en_ru',

    textbooks: [
        {
            id: 'langy_core_en_ru',
            title: 'Английский с нуля до B1 (Core)',
            author: 'Langy AI',
            level: 'A1-B1',
            methodology: 'Коммуникативный подход. Фокус на разговорной практике, аудировании и понимании базовой грамматики через контекст.',
            units: [
                {
                    id: 1,
                    title: 'Unit 1: Знакомство и Приветствия',
                    desc: 'Научимся здороваться, представляться и говорить откуда мы.',
                    grammar: ['Глагол to be (am, is, are)', 'Личные местоимения'],
                    vocab: ['hello', 'hi', 'name', 'from', 'nice', 'meet'],
                    homework: { prompt: 'Представься. Напиши 3 предложения о себе (Имя, возраст, откуда ты).' },
                    exercises: [
                        {
                            type: 'listen-type',
                            data: {
                                instruction: 'Послушайте и напишите то, что услышали',
                                text: 'Hello, my name is Alex.',
                                hint: 'Обратите внимание на заглавную букву и точку.'
                            }
                        },
                        {
                            type: 'match-pairs',
                            data: {
                                instruction: 'Соедините слова с их переводом',
                                pairs: [
                                    { left: 'Hello', right: 'Привет' },
                                    { left: 'Name', right: 'Имя' },
                                    { left: 'From', right: 'Из' },
                                    { left: 'Meet', right: 'Встречать' }
                                ]
                            }
                        },
                        {
                            type: 'fill-bubble',
                            data: {
                                instruction: 'Выберите правильную форму глагола to be',
                                sentence: 'I ___ from London.',
                                options: ['am', 'is', 'are'],
                                correct: 0
                            }
                        },
                        {
                            type: 'word-shuffle',
                            data: {
                                instruction: 'Составьте предложение',
                                words: ['nice', 'to', 'meet', 'you', 'is', 'it'],
                                correct: ['it', 'is', 'nice', 'to', 'meet', 'you']
                            }
                        },
                        {
                            type: 'speak-aloud',
                            data: {
                                instruction: 'Нажмите 🎤 и скажите вслух:',
                                phrase: 'Nice to meet you'
                            }
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Unit 2: Профессии и Работа',
                    desc: 'Говорим о том, кем мы работаем, используя неопределенный артикль.',
                    grammar: ['Артикли a/an', 'Глагол to be: Вопросы и Отрицания'],
                    vocab: ['doctor', 'teacher', 'student', 'engineer', 'work'],
                    homework: { prompt: 'Напиши кем ты работаешь (или на кого учишься) и кем работают твои родители.' },
                    exercises: [
                        {
                            type: 'fill-bubble',
                            data: {
                                instruction: 'Выберите правильный артикль',
                                sentence: 'She is ___ engineer.',
                                options: ['a', 'an', 'the', '-'],
                                correct: 1
                            }
                        },
                        {
                            type: 'image-choice',
                            data: {
                                instruction: 'Выберите правильную картинку',
                                word: 'Teacher',
                                options: [
                                    { emoji: '👨‍⚕️', label: 'Doctor' },
                                    { emoji: '👩‍🏫', label: 'Teacher' },
                                    { emoji: '👮‍♂️', label: 'Police' },
                                    { emoji: '👨‍🍳', label: 'Chef' }
                                ],
                                correct: 1
                            }
                        },
                        {
                            type: 'type-translation',
                            data: {
                                instruction: 'Переведите на английский',
                                sourceText: 'Он не доктор.',
                                fromLang: 'RU',
                                toLang: 'EN',
                                answer: 'He is not a doctor'
                            }
                        },
                        {
                            type: 'read-answer',
                            data: {
                                instruction: 'Прочитайте текст и ответьте на вопрос',
                                passage: 'Hi! I am Sarah. I am 25 years old. I live in New York and I work as a designer in a big company.',
                                question: 'What is Sarah\'s job?',
                                options: ['She is a teacher', 'She is a student', 'She is a designer', 'She is a doctor'],
                                correct: 2
                            }
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'Unit 3: Ежедневная рутина',
                    desc: 'Рассказываем о своем дне и привычках.',
                    grammar: ['Present Simple (I, You, We, They)', 'Глаголы действий'],
                    vocab: ['wake up', 'breakfast', 'go', 'work', 'sleep', 'every day'],
                    homework: { prompt: 'Опиши свой типичный день. Что ты делаешь утром, днем и вечером?' },
                    exercises: [
                        {
                            type: 'word-shuffle',
                            data: {
                                instruction: 'Составьте предложение из слов',
                                words: ['I', 'up', 'wake', 'every', 'day', 'early'],
                                correct: ['I', 'wake', 'up', 'early', 'every', 'day']
                            }
                        },
                        {
                            type: 'match-pairs',
                            data: {
                                instruction: 'Соедините глагол с продолжением',
                                pairs: [
                                    { left: 'Wake', right: 'up' },
                                    { left: 'Have', right: 'breakfast' },
                                    { left: 'Go', right: 'to work' },
                                    { left: 'Watch', right: 'TV' }
                                ]
                            }
                        },
                        {
                            type: 'fill-bubble',
                            data: {
                                instruction: 'Выберите правильный глагол',
                                sentence: 'We ___ to the gym on Mondays.',
                                options: ['goes', 'going', 'go'],
                                correct: 2
                            }
                        },
                        {
                            type: 'speak-aloud',
                            data: {
                                instruction: 'Произнесите:',
                                phrase: 'I have breakfast at eight'
                            }
                        }
                    ]
                }
            ]
        }
    ],

    getActive() {
        return this.textbooks.find(tb => tb.id === this.activeTextbookId) || this.textbooks[0];
    }
};

if (typeof module !== 'undefined') module.exports = { LangyCurriculum };

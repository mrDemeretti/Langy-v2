/* ============================================
   LANGY — GRAMMAR BANKS
   Sentence templates and patterns for each CEFR level
   Used by ExerciseGenerator to create fill-gap,
   word-shuffle, and translation exercises
   ============================================ */

const LangyGrammarBank = {

    // ═══════════════════════════════════════════
    // A1 — BEGINNER
    // ═══════════════════════════════════════════
    A1: {
        // Verb "be" patterns
        verb_be: [
            { template: 'I ___ a student.', answer: 'am', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
            { template: 'She ___ from Russia.', answer: 'is', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
            { template: 'We ___ happy.', answer: 'are', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
            { template: 'He ___ a doctor.', answer: 'is', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
            { template: 'They ___ in the park.', answer: 'are', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
            { template: 'You ___ very kind.', answer: 'are', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
            { template: 'It ___ cold today.', answer: 'is', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
            { template: 'I ___ not tired.', answer: 'am', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be negative' },
            { template: '___ you a teacher?', answer: 'Are', options: ['Am', 'Is', 'Are'], skill: 'grammar', rule: 'verb be question' },
            { template: '___ he from Spain?', answer: 'Is', options: ['Am', 'Is', 'Are'], skill: 'grammar', rule: 'verb be question' },
            { template: 'My name ___ Alex.', answer: 'is', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
            { template: 'The children ___ at school.', answer: 'are', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
            { template: 'This ___ my first time here.', answer: 'is', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
            { template: 'Those books ___ very old.', answer: 'are', options: ['am', 'is', 'are'], skill: 'grammar', rule: 'verb be' },
        ],
        articles: [
            { template: 'She has ___ umbrella.', answer: 'an', options: ['a', 'an', 'the'], skill: 'grammar', rule: 'articles a/an' },
            { template: 'He is ___ engineer.', answer: 'an', options: ['a', 'an', 'the'], skill: 'grammar', rule: 'articles a/an' },
            { template: 'I need ___ new phone.', answer: 'a', options: ['a', 'an', 'the'], skill: 'grammar', rule: 'articles a/an' },
            { template: 'There is ___ apple on the table.', answer: 'an', options: ['a', 'an', '--'], skill: 'grammar', rule: 'articles a/an' },
            { template: 'He drives ___ old car.', answer: 'an', options: ['a', 'an', 'the'], skill: 'grammar', rule: 'articles a/an' },
            { template: 'She wants ___ cup of tea.', answer: 'a', options: ['a', 'an', '--'], skill: 'grammar', rule: 'articles a/an' },
            { template: 'Is there ___ hotel near here?', answer: 'a', options: ['a', 'an', 'the'], skill: 'grammar', rule: 'articles a/an' },
            { template: 'I have ___ idea!', answer: 'an', options: ['a', 'an', 'the'], skill: 'grammar', rule: 'articles a/an' },
        ],
        possessives: [
            { template: '___ name is Tom. (he)', answer: 'His', options: ['His', 'Her', 'My', 'Their'], skill: 'grammar', rule: 'possessive adjectives' },
            { template: 'This is ___ book. (I)', answer: 'my', options: ['my', 'me', 'I', 'mine'], skill: 'grammar', rule: 'possessive adjectives' },
            { template: '___ house is very big. (they)', answer: 'Their', options: ['Their', 'They', 'Them', 'There'], skill: 'grammar', rule: 'possessive adjectives' },
            { template: '___ sister is a nurse. (she)', answer: 'Her', options: ['Her', 'She', 'His', 'Hers'], skill: 'grammar', rule: 'possessive adjectives' },
            { template: 'Is this ___ car? (you)', answer: 'your', options: ['your', 'you', 'yours', 'you are'], skill: 'grammar', rule: 'possessive adjectives' },
            { template: '___ dog is very friendly. (we)', answer: 'Our', options: ['Our', 'We', 'Us', 'Ours'], skill: 'grammar', rule: 'possessive adjectives' },
        ],
        present_simple: [
            { template: 'She ___ to work every day.', answer: 'goes', options: ['go', 'goes', 'going'], skill: 'grammar', rule: 'present simple 3rd person' },
            { template: 'I ___ coffee in the morning.', answer: 'drink', options: ['drink', 'drinks', 'drinking'], skill: 'grammar', rule: 'present simple' },
            { template: 'He ___ English very well.', answer: 'speaks', options: ['speak', 'speaks', 'speaking'], skill: 'grammar', rule: 'present simple 3rd person' },
            { template: 'They ___ in a big city.', answer: 'live', options: ['live', 'lives', 'living'], skill: 'grammar', rule: 'present simple' },
            { template: 'My father ___ at 7 o\'clock.', answer: 'gets up', options: ['get up', 'gets up', 'getting up'], skill: 'grammar', rule: 'present simple 3rd person' },
            { template: 'We ___ TV in the evening.', answer: 'watch', options: ['watch', 'watches', 'watching'], skill: 'grammar', rule: 'present simple' },
            { template: 'She ___ her homework after school.', answer: 'does', options: ['do', 'does', 'doing'], skill: 'grammar', rule: 'present simple 3rd person' },
            { template: 'I ___ like fish.', answer: "don't", options: ["don't", "doesn't", 'not'], skill: 'grammar', rule: 'present simple negative' },
            { template: 'He ___ like vegetables.', answer: "doesn't", options: ["don't", "doesn't", 'not'], skill: 'grammar', rule: 'present simple negative' },
            { template: '___ you like pizza?', answer: 'Do', options: ['Do', 'Does', 'Is'], skill: 'grammar', rule: 'present simple question' },
            { template: '___ she speak French?', answer: 'Does', options: ['Do', 'Does', 'Is'], skill: 'grammar', rule: 'present simple question' },
            { template: 'She always ___ breakfast at 8.', answer: 'has', options: ['have', 'has', 'having'], skill: 'grammar', rule: 'present simple 3rd person' },
        ],
        prepositions_time: [
            { template: 'I wake up ___ 7 o\'clock.', answer: 'at', options: ['at', 'in', 'on'], skill: 'grammar', rule: 'prepositions of time' },
            { template: 'My birthday is ___ March.', answer: 'in', options: ['at', 'in', 'on'], skill: 'grammar', rule: 'prepositions of time' },
            { template: 'We have a meeting ___ Monday.', answer: 'on', options: ['at', 'in', 'on'], skill: 'grammar', rule: 'prepositions of time' },
            { template: 'She goes to bed ___ night.', answer: 'at', options: ['at', 'in', 'on'], skill: 'grammar', rule: 'prepositions of time' },
            { template: 'They play football ___ the afternoon.', answer: 'in', options: ['at', 'in', 'on'], skill: 'grammar', rule: 'prepositions of time' },
            { template: 'The shop closes ___ 9 p.m.', answer: 'at', options: ['at', 'in', 'on'], skill: 'grammar', rule: 'prepositions of time' },
            { template: 'I was born ___ 1995.', answer: 'in', options: ['at', 'in', 'on'], skill: 'grammar', rule: 'prepositions of time' },
            { template: 'We have lunch ___ 1 p.m.', answer: 'at', options: ['at', 'in', 'on'], skill: 'grammar', rule: 'prepositions of time' },
        ],
        prepositions_place: [
            { template: 'The cat is ___ the table.', answer: 'under', options: ['under', 'on', 'in', 'at'], skill: 'grammar', rule: 'prepositions of place' },
            { template: 'The book is ___ the bag.', answer: 'in', options: ['in', 'on', 'at', 'under'], skill: 'grammar', rule: 'prepositions of place' },
            { template: 'She is sitting ___ the chair.', answer: 'on', options: ['on', 'in', 'at', 'under'], skill: 'grammar', rule: 'prepositions of place' },
            { template: 'I live ___ Moscow.', answer: 'in', options: ['at', 'in', 'on', 'to'], skill: 'grammar', rule: 'prepositions of place' },
            { template: 'The bank is ___ the hotel.', answer: 'next to', options: ['next to', 'in', 'on', 'at'], skill: 'grammar', rule: 'prepositions of place' },
            { template: 'There is a picture ___ the wall.', answer: 'on', options: ['at', 'in', 'on', 'under'], skill: 'grammar', rule: 'prepositions of place' },
        ],
        this_that: [
            { template: '___ is my pen. (near me)', answer: 'This', options: ['This', 'That', 'These', 'Those'], skill: 'grammar', rule: 'demonstratives' },
            { template: '___ are my books. (near me)', answer: 'These', options: ['This', 'That', 'These', 'Those'], skill: 'grammar', rule: 'demonstratives' },
            { template: '___ is the Eiffel Tower. (far away)', answer: 'That', options: ['This', 'That', 'These', 'Those'], skill: 'grammar', rule: 'demonstratives' },
            { template: '___ people over there are tourists.', answer: 'Those', options: ['This', 'That', 'These', 'Those'], skill: 'grammar', rule: 'demonstratives' },
        ],
        can_cant: [
            { template: 'She ___ play the piano very well.', answer: 'can', options: ['can', "can't", 'is'], skill: 'grammar', rule: 'can/can\'t ability' },
            { template: 'I ___ swim. I never learned.', answer: "can't", options: ['can', "can't", "don't"], skill: 'grammar', rule: 'can/can\'t ability' },
            { template: '___ you speak Japanese?', answer: 'Can', options: ['Can', 'Do', 'Are'], skill: 'grammar', rule: 'can/can\'t question' },
            { template: 'You ___ park here. It\'s not allowed.', answer: "can't", options: ['can', "can't", "don't"], skill: 'grammar', rule: 'can/can\'t permission' },
            { template: 'He ___ run very fast.', answer: 'can', options: ['can', 'is', 'does'], skill: 'grammar', rule: 'can/can\'t ability' },
        ],
        present_continuous: [
            { template: 'She ___ a red dress today.', answer: 'is wearing', options: ['wears', 'is wearing', 'wearing'], skill: 'grammar', rule: 'present continuous' },
            { template: 'They ___ football right now.', answer: 'are playing', options: ['play', 'are playing', 'playing'], skill: 'grammar', rule: 'present continuous' },
            { template: 'I ___ a book at the moment.', answer: 'am reading', options: ['read', 'am reading', 'reads'], skill: 'grammar', rule: 'present continuous' },
            { template: 'He ___ dinner right now.', answer: 'is cooking', options: ['cooks', 'is cooking', 'cooking'], skill: 'grammar', rule: 'present continuous' },
            { template: 'We ___ for the bus.', answer: 'are waiting', options: ['wait', 'are waiting', 'is waiting'], skill: 'grammar', rule: 'present continuous' },
            { template: 'Look! It ___.', answer: 'is raining', options: ['rains', 'is raining', 'rain'], skill: 'grammar', rule: 'present continuous' },
        ],
        there_is_are: [
            { template: 'There ___ a cinema near here.', answer: 'is', options: ['is', 'are', 'be'], skill: 'grammar', rule: 'there is/are' },
            { template: 'There ___ three books on the shelf.', answer: 'are', options: ['is', 'are', 'be'], skill: 'grammar', rule: 'there is/are' },
            { template: '___ there a supermarket near here?', answer: 'Is', options: ['Is', 'Are', 'Do'], skill: 'grammar', rule: 'there is/are question' },
            { template: 'There ___ some milk in the fridge.', answer: 'is', options: ['is', 'are', 'be'], skill: 'grammar', rule: 'there is/are' },
            { template: 'There ___ many people at the party.', answer: 'are', options: ['is', 'are', 'was'], skill: 'grammar', rule: 'there is/are' },
        ],
        past_be: [
            { template: 'I ___ at home yesterday.', answer: 'was', options: ['was', 'were', 'am'], skill: 'grammar', rule: 'past simple be' },
            { template: 'They ___ in London last week.', answer: 'were', options: ['was', 'were', 'are'], skill: 'grammar', rule: 'past simple be' },
            { template: 'She ___ born in 1990.', answer: 'was', options: ['was', 'were', 'is'], skill: 'grammar', rule: 'past simple be' },
            { template: 'We ___ very tired after the trip.', answer: 'were', options: ['was', 'were', 'are'], skill: 'grammar', rule: 'past simple be' },
            { template: '___ you at the party last night?', answer: 'Were', options: ['Was', 'Were', 'Did'], skill: 'grammar', rule: 'past simple be question' },
        ],
        past_simple: [
            { template: 'I ___ to the cinema yesterday.', answer: 'went', options: ['go', 'went', 'gone'], skill: 'grammar', rule: 'past simple irregular' },
            { template: 'She ___ a delicious cake.', answer: 'made', options: ['make', 'made', 'maked'], skill: 'grammar', rule: 'past simple irregular' },
            { template: 'They ___ in the park last Sunday.', answer: 'played', options: ['play', 'played', 'plays'], skill: 'grammar', rule: 'past simple regular' },
            { template: 'He ___ the book in two days.', answer: 'read', options: ['read', 'readed', 'reads'], skill: 'grammar', rule: 'past simple irregular' },
            { template: 'We ___ a great time at the party.', answer: 'had', options: ['have', 'had', 'has'], skill: 'grammar', rule: 'past simple irregular' },
            { template: 'She ___ home at 6 o\'clock.', answer: 'arrived', options: ['arrive', 'arrived', 'arrives'], skill: 'grammar', rule: 'past simple regular' },
            { template: 'I ___ TV last night.', answer: 'watched', options: ['watch', 'watched', 'watches'], skill: 'grammar', rule: 'past simple regular' },
            { template: 'He ___ coffee this morning.', answer: 'drank', options: ['drink', 'drank', 'drunk'], skill: 'grammar', rule: 'past simple irregular' },
            { template: 'I ___ the film. It was boring.', answer: "didn't like", options: ["didn't like", "don't like", "wasn't like"], skill: 'grammar', rule: 'past simple negative' },
            { template: '___ you enjoy the concert?', answer: 'Did', options: ['Did', 'Do', 'Were'], skill: 'grammar', rule: 'past simple question' },
        ],

        // Sentence structures for word-shuffle exercises
        sentences: [
            { words: ['my', 'name', 'is', 'Anna'], correct: ['my', 'name', 'is', 'Anna'] },
            { words: ['I', 'am', 'from', 'Russia'], correct: ['I', 'am', 'from', 'Russia'] },
            { words: ['she', 'is', 'a', 'teacher'], correct: ['she', 'is', 'a', 'teacher'] },
            { words: ['we', 'live', 'in', 'Moscow'], correct: ['we', 'live', 'in', 'Moscow'] },
            { words: ['he', 'works', 'in', 'a', 'hospital'], correct: ['he', 'works', 'in', 'a', 'hospital'] },
            { words: ['they', 'are', 'playing', 'football'], correct: ['they', 'are', 'playing', 'football'] },
            { words: ['I', 'went', 'to', 'the', 'cinema', 'yesterday'], correct: ['I', 'went', 'to', 'the', 'cinema', 'yesterday'] },
            { words: ['she', 'doesn\'t', 'like', 'coffee'], correct: ['she', 'doesn\'t', 'like', 'coffee'] },
            { words: ['where', 'do', 'you', 'live', '?'], correct: ['where', 'do', 'you', 'live', '?'] },
            { words: ['can', 'you', 'help', 'me', 'please', '?'], correct: ['can', 'you', 'help', 'me', 'please', '?'] },
            { words: ['I', 'usually', 'get up', 'at', '7'], correct: ['I', 'usually', 'get up', 'at', '7'] },
            { words: ['there', 'is', 'a', 'book', 'on', 'the', 'table'], correct: ['there', 'is', 'a', 'book', 'on', 'the', 'table'] },
            { words: ['what', 'is', 'your', 'favourite', 'colour', '?'], correct: ['what', 'is', 'your', 'favourite', 'colour', '?'] },
            { words: ['he', 'can', 'swim', 'very', 'well'], correct: ['he', 'can', 'swim', 'very', 'well'] },
            { words: ['we', 'had', 'a', 'great', 'time'], correct: ['we', 'had', 'a', 'great', 'time'] },
        ],

        // Translation pairs
        translations: [
            { ru: 'Меня зовут Анна.', en: 'My name is Anna.' },
            { ru: 'Я из России.', en: 'I am from Russia.' },
            { ru: 'Она учитель.', en: 'She is a teacher.' },
            { ru: 'Они живут в Лондоне.', en: 'They live in London.' },
            { ru: 'Он работает в больнице.', en: 'He works in a hospital.' },
            { ru: 'Я люблю кофе.', en: 'I love coffee.' },
            { ru: 'Она не любит рыбу.', en: "She doesn't like fish." },
            { ru: 'Где ты живёшь?', en: 'Where do you live?' },
            { ru: 'Я вчера ходил в кино.', en: 'I went to the cinema yesterday.' },
            { ru: 'Сколько тебе лет?', en: 'How old are you?' },
            { ru: 'Сейчас идёт дождь.', en: 'It is raining now.' },
            { ru: 'У меня есть сестра.', en: 'I have a sister.' },
            { ru: 'Он умеет плавать.', en: 'He can swim.' },
            { ru: 'Что это?', en: 'What is this?' },
            { ru: 'Моя мама — врач.', en: 'My mother is a doctor.' },
            { ru: 'Я не говорю по-французски.', en: "I don't speak French." },
            { ru: 'Вчера было холодно.', en: 'It was cold yesterday.' },
            { ru: 'Мы играли в парке.', en: 'We played in the park.' },
            { ru: 'Она красивая.', en: 'She is beautiful.' },
            { ru: 'У нас есть кошка.', en: 'We have a cat.' },
        ],

        getAllPatterns() {
            let all = [];
            Object.keys(this).forEach(cat => {
                if (Array.isArray(this[cat])) all = all.concat(this[cat]);
            });
            return all;
        }
    },

    // ═══════════════════════════════════════════
    // A2 — ELEMENTARY
    // ═══════════════════════════════════════════
    A2: {
        past_simple_extended: [
            { template: 'We ___ a great time yesterday.', answer: 'had', options: ['have', 'had', 'haved'], skill: 'grammar', rule: 'past simple irregular' },
            { template: 'She ___ a beautiful dress to the party.', answer: 'wore', options: ['wear', 'wore', 'weared'], skill: 'grammar', rule: 'past simple irregular' },
            { template: 'They ___ the movie last night.', answer: 'saw', options: ['see', 'saw', 'seen'], skill: 'grammar', rule: 'past simple irregular' },
            { template: 'He ___ me a present.', answer: 'gave', options: ['give', 'gave', 'gived'], skill: 'grammar', rule: 'past simple irregular' },
            { template: 'I ___ my keys at home.', answer: 'forgot', options: ['forget', 'forgot', 'forgotten'], skill: 'grammar', rule: 'past simple irregular' },
            { template: 'We ___ a lot of photos.', answer: 'took', options: ['take', 'took', 'taked'], skill: 'grammar', rule: 'past simple irregular' },
        ],
        comparatives: [
            { template: 'Moscow is ___ than London.', answer: 'bigger', options: ['big', 'bigger', 'more big'], skill: 'grammar', rule: 'comparatives' },
            { template: 'This hotel is ___ than the other one.', answer: 'more expensive', options: ['expensiver', 'more expensive', 'most expensive'], skill: 'grammar', rule: 'comparatives' },
            { template: 'English is ___ than Chinese.', answer: 'easier', options: ['easy', 'easier', 'more easy'], skill: 'grammar', rule: 'comparatives' },
            { template: 'Summer is ___ than winter.', answer: 'warmer', options: ['warm', 'warmer', 'more warm'], skill: 'grammar', rule: 'comparatives' },
            { template: 'My brother is ___ than me.', answer: 'older', options: ['old', 'older', 'more old'], skill: 'grammar', rule: 'comparatives' },
            { template: 'This book is ___ than that one.', answer: 'more interesting', options: ['interestinger', 'more interesting', 'most interesting'], skill: 'grammar', rule: 'comparatives' },
        ],
        superlatives: [
            { template: 'The Nile is ___ river in the world.', answer: 'the longest', options: ['the longer', 'the longest', 'the most long'], skill: 'grammar', rule: 'superlatives' },
            { template: 'This is ___ restaurant in the city.', answer: 'the best', options: ['the better', 'the best', 'the most good'], skill: 'grammar', rule: 'superlatives' },
            { template: 'She is ___ student in the class.', answer: 'the smartest', options: ['the smarter', 'the smartest', 'the most smart'], skill: 'grammar', rule: 'superlatives' },
            { template: 'Mount Everest is ___ mountain in the world.', answer: 'the highest', options: ['the higher', 'the highest', 'the most high'], skill: 'grammar', rule: 'superlatives' },
            { template: 'This was ___ day of my life.', answer: 'the worst', options: ['the badder', 'the worst', 'the baddest'], skill: 'grammar', rule: 'superlatives' },
        ],
        countable_uncountable: [
            { template: 'I need ___ water.', answer: 'some', options: ['a', 'some', 'many'], skill: 'grammar', rule: 'countable/uncountable' },
            { template: '___ sugar do you want?', answer: 'How much', options: ['How much', 'How many', 'How'], skill: 'grammar', rule: 'how much/many' },
            { template: '___ eggs do we need?', answer: 'How many', options: ['How much', 'How many', 'How'], skill: 'grammar', rule: 'how much/many' },
            { template: 'There isn\'t ___ milk left.', answer: 'any', options: ['some', 'any', 'a'], skill: 'grammar', rule: 'some/any' },
            { template: 'Would you like ___ coffee?', answer: 'some', options: ['some', 'any', 'a'], skill: 'grammar', rule: 'some/any offer' },
            { template: 'There are ___ apples in the basket.', answer: 'some', options: ['some', 'any', 'a'], skill: 'grammar', rule: 'some/any' },
        ],
        going_to: [
            { template: 'I ___ visit my friend tomorrow.', answer: 'am going to', options: ['going to', 'am going to', 'will going to'], skill: 'grammar', rule: 'going to' },
            { template: 'She ___ study medicine next year.', answer: 'is going to', options: ['going to', 'is going to', 'are going to'], skill: 'grammar', rule: 'going to' },
            { template: 'They ___ buy a new house.', answer: 'are going to', options: ['is going to', 'are going to', 'am going to'], skill: 'grammar', rule: 'going to' },
            { template: 'Look at those clouds! It ___ rain.', answer: 'is going to', options: ['will', 'is going to', 'does'], skill: 'grammar', rule: 'going to prediction' },
        ],
        will: [
            { template: '"It\'s cold." — "I ___ close the window."', answer: 'will', options: ['am going to', 'will', 'going to'], skill: 'grammar', rule: 'will instant decision' },
            { template: 'I think it ___ be sunny tomorrow.', answer: 'will', options: ['is going to', 'will', 'is'], skill: 'grammar', rule: 'will prediction' },
            { template: '"I\'m thirsty." — "I ___ get you some water."', answer: 'will', options: ['am going to', 'will', 'going to'], skill: 'grammar', rule: 'will offer' },
            { template: 'I promise I ___ help you.', answer: 'will', options: ['am going to', 'will', 'going to'], skill: 'grammar', rule: 'will promise' },
        ],
        present_perfect: [
            { template: 'I have never ___ to Japan.', answer: 'been', options: ['be', 'been', 'gone', 'went'], skill: 'grammar', rule: 'present perfect' },
            { template: 'She ___ already finished her homework.', answer: 'has', options: ['have', 'has', 'is'], skill: 'grammar', rule: 'present perfect' },
            { template: 'Have you ever ___ sushi?', answer: 'eaten', options: ['eat', 'ate', 'eaten'], skill: 'grammar', rule: 'present perfect experience' },
            { template: 'I ___ just arrived.', answer: 'have', options: ['have', 'has', 'am'], skill: 'grammar', rule: 'present perfect' },
            { template: 'She ___ to Paris three times.', answer: 'has been', options: ['has been', 'has gone', 'went'], skill: 'grammar', rule: 'been vs gone' },
            { template: 'They ___ finished yet.', answer: "haven't", options: ["haven't", "hasn't", "didn't"], skill: 'grammar', rule: 'present perfect negative' },
        ],
        translations: [
            { ru: 'Сколько это стоит?', en: 'How much is it?' },
            { ru: 'Нью-Йорк больше, чем Москва.', en: 'New York is bigger than Moscow.' },
            { ru: 'Лето теплее, чем зима.', en: 'Summer is warmer than winter.' },
            { ru: 'Это лучший ресторан в городе.', en: 'This is the best restaurant in the city.' },
            { ru: 'Я собираюсь поехать в Лондон.', en: 'I am going to go to London.' },
            { ru: 'Я никогда не был в Париже.', en: 'I have never been to Paris.' },
            { ru: 'Она только что пришла.', en: 'She has just arrived.' },
            { ru: 'Ты когда-нибудь пробовал суши?', en: 'Have you ever tried sushi?' },
            { ru: 'Он забыл свой телефон.', en: 'He forgot his phone.' },
            { ru: 'Мы отлично провели время.', en: 'We had a great time.' },
            { ru: 'Она надела красное платье.', en: 'She wore a red dress.' },
            { ru: 'Я тебе помогу.', en: 'I will help you.' },
            { ru: 'Куда ты ходил вчера?', en: 'Where did you go yesterday?' },
        ],
        sentences: [
            { words: ['how', 'old', 'are', 'you', '?'], correct: ['how', 'old', 'are', 'you', '?'] },
            { words: ['she', 'is', 'taller', 'than', 'me'], correct: ['she', 'is', 'taller', 'than', 'me'] },
            { words: ['I', 'am', 'going', 'to', 'travel'], correct: ['I', 'am', 'going', 'to', 'travel'] },
            { words: ['have', 'you', 'ever', 'been', 'to', 'London', '?'], correct: ['have', 'you', 'ever', 'been', 'to', 'London', '?'] },
            { words: ['she', 'has', 'already', 'done', 'her', 'homework'], correct: ['she', 'has', 'already', 'done', 'her', 'homework'] },
            { words: ['this', 'is', 'the', 'best', 'film', 'ever'], correct: ['this', 'is', 'the', 'best', 'film', 'ever'] },
            { words: ['how', 'much', 'does', 'this', 'cost', '?'], correct: ['how', 'much', 'does', 'this', 'cost', '?'] },
            { words: ['I', 'will', 'call', 'you', 'later'], correct: ['I', 'will', 'call', 'you', 'later'] },
        ],

        getAllPatterns() {
            let all = [];
            Object.keys(this).forEach(cat => { if (Array.isArray(this[cat])) all = all.concat(this[cat]); });
            return all;
        }
    },

    // ═══════════════════════════════════════════
    // B1 — INTERMEDIATE
    // ═══════════════════════════════════════════
    B1: {
        past_continuous: [
            { template: 'I ___ when the phone rang.', answer: 'was sleeping', options: ['slept', 'was sleeping', 'am sleeping'], skill: 'grammar', rule: 'past continuous' },
            { template: 'While we ___ dinner, the lights went out.', answer: 'were having', options: ['had', 'were having', 'have'], skill: 'grammar', rule: 'past continuous' },
            { template: 'She ___ a book when I arrived.', answer: 'was reading', options: ['read', 'was reading', 'is reading'], skill: 'grammar', rule: 'past continuous' },
            { template: 'They ___ in the garden all afternoon.', answer: 'were working', options: ['worked', 'were working', 'are working'], skill: 'grammar', rule: 'past continuous' },
        ],
        first_conditional: [
            { template: 'If it ___ tomorrow, we\'ll stay home.', answer: 'rains', options: ['will rain', 'rains', 'rained'], skill: 'grammar', rule: 'first conditional' },
            { template: 'If you study hard, you ___ pass the exam.', answer: 'will', options: ['will', 'would', 'did'], skill: 'grammar', rule: 'first conditional' },
            { template: 'If she ___ early, she\'ll catch the train.', answer: 'leaves', options: ['will leave', 'leaves', 'left'], skill: 'grammar', rule: 'first conditional' },
            { template: 'I won\'t go ___ it rains.', answer: 'if', options: ['if', 'when', 'unless'], skill: 'grammar', rule: 'first conditional unless' },
        ],
        second_conditional: [
            { template: 'If I ___ rich, I would travel the world.', answer: 'were', options: ['am', 'was', 'were'], skill: 'grammar', rule: 'second conditional' },
            { template: 'If I had a car, I ___ drive to work.', answer: 'would', options: ['will', 'would', 'could'], skill: 'grammar', rule: 'second conditional' },
            { template: 'If I ___ you, I would study harder.', answer: 'were', options: ['am', 'were', 'was'], skill: 'grammar', rule: 'second conditional' },
            { template: 'What would you do if you ___ a million dollars?', answer: 'won', options: ['win', 'won', 'would win'], skill: 'grammar', rule: 'second conditional' },
        ],
        modals: [
            { template: 'You ___ eat more vegetables. It\'s good for you.', answer: 'should', options: ['should', 'must', 'have to'], skill: 'grammar', rule: 'modals advice' },
            { template: 'You ___ wear a seatbelt. It\'s the law.', answer: 'must', options: ['should', 'must', 'could'], skill: 'grammar', rule: 'modals obligation' },
            { template: 'You ___ come tomorrow. It\'s not necessary.', answer: "don't have to", options: ["mustn't", "don't have to", "shouldn't"], skill: 'grammar', rule: 'modals not necessary' },
            { template: 'You ___ smoke here! It\'s forbidden.', answer: "mustn't", options: ["mustn't", "don't have to", "shouldn't"], skill: 'grammar', rule: 'modals prohibition' },
            { template: 'She ___ be at home. Her car is outside.', answer: 'might', options: ['might', 'should', 'must'], skill: 'grammar', rule: 'modals possibility' },
        ],
        passive: [
            { template: 'The Mona Lisa ___ by Leonardo da Vinci.', answer: 'was painted', options: ['painted', 'was painted', 'is painted'], skill: 'grammar', rule: 'passive voice' },
            { template: 'English ___ in many countries.', answer: 'is spoken', options: ['speaks', 'is spoken', 'spoke'], skill: 'grammar', rule: 'passive voice' },
            { template: 'This book ___ in 1960.', answer: 'was written', options: ['wrote', 'was written', 'is written'], skill: 'grammar', rule: 'passive voice' },
            { template: 'The car ___ last week.', answer: 'was stolen', options: ['stole', 'was stolen', 'is stolen'], skill: 'grammar', rule: 'passive voice' },
        ],
        used_to: [
            { template: 'I ___ live in Moscow, but now I live in London.', answer: 'used to', options: ['use to', 'used to', 'was used to'], skill: 'grammar', rule: 'used to' },
            { template: 'She ___ play tennis, but she stopped.', answer: 'used to', options: ['use to', 'used to', 'is used to'], skill: 'grammar', rule: 'used to' },
            { template: 'He didn\'t ___ like vegetables.', answer: 'use to', options: ['use to', 'used to', 'using to'], skill: 'grammar', rule: 'used to negative' },
        ],
        for_since: [
            { template: 'I have lived here ___ 2015.', answer: 'since', options: ['for', 'since', 'from'], skill: 'grammar', rule: 'for/since' },
            { template: 'She has been a teacher ___ ten years.', answer: 'for', options: ['for', 'since', 'from'], skill: 'grammar', rule: 'for/since' },
            { template: 'We have known each other ___ childhood.', answer: 'since', options: ['for', 'since', 'from'], skill: 'grammar', rule: 'for/since' },
            { template: 'He has been waiting ___ two hours.', answer: 'for', options: ['for', 'since', 'during'], skill: 'grammar', rule: 'for/since' },
        ],
        translations: [
            { ru: 'Если будет дождь, мы останемся дома.', en: 'If it rains, we will stay home.' },
            { ru: 'Я спал, когда зазвонил телефон.', en: 'I was sleeping when the phone rang.' },
            { ru: 'Если бы я был богатым, я бы путешествовал.', en: 'If I were rich, I would travel.' },
            { ru: 'Тебе следует больше заниматься спортом.', en: 'You should exercise more.' },
            { ru: 'Эта книга была написана в 1960 году.', en: 'This book was written in 1960.' },
            { ru: 'Я раньше жил в Москве.', en: 'I used to live in Moscow.' },
            { ru: 'Я живу здесь с 2015 года.', en: 'I have lived here since 2015.' },
            { ru: 'Он сказал что придёт завтра.', en: 'He said he would come tomorrow.' },
            { ru: 'Ты не должен курить здесь.', en: "You mustn't smoke here." },
            { ru: 'Тебе не нужно приходить завтра.', en: "You don't have to come tomorrow." },
        ],

        getAllPatterns() {
            let all = [];
            Object.keys(this).forEach(cat => { if (Array.isArray(this[cat])) all = all.concat(this[cat]); });
            return all;
        }
    },

    // ═══════════════════════════════════════════
    // B2 — UPPER INTERMEDIATE
    // ═══════════════════════════════════════════
    B2: {
        narrative_tenses: [
            { template: 'When I arrived, she ___ already left.', answer: 'had', options: ['has', 'had', 'was'], skill: 'grammar', rule: 'past perfect' },
            { template: 'By the time we got there, the film ___ started.', answer: 'had already', options: ['has already', 'had already', 'already'], skill: 'grammar', rule: 'past perfect' },
            { template: 'I ___ never seen such a beautiful sunset before.', answer: 'had', options: ['have', 'had', 'was'], skill: 'grammar', rule: 'past perfect' },
        ],
        future_perfect: [
            { template: 'By next year, I ___ here for 10 years.', answer: 'will have worked', options: ['will work', 'will have worked', 'will be working'], skill: 'grammar', rule: 'future perfect' },
            { template: 'This time tomorrow, I ___ on the beach.', answer: 'will be lying', options: ['will lie', 'will be lying', 'will have lain'], skill: 'grammar', rule: 'future continuous' },
        ],
        third_conditional: [
            { template: 'If I ___ harder, I would have passed.', answer: 'had studied', options: ['studied', 'had studied', 'would study'], skill: 'grammar', rule: 'third conditional' },
            { template: 'If she had known, she ___ come.', answer: 'would have', options: ['would', 'would have', 'will have'], skill: 'grammar', rule: 'third conditional' },
        ],
        reported_speech: [
            { template: '"I am tired." She said she ___ tired.', answer: 'was', options: ['is', 'was', 'were'], skill: 'grammar', rule: 'reported speech' },
            { template: '"Where do you live?" He asked where I ___.', answer: 'lived', options: ['live', 'lived', 'had lived'], skill: 'grammar', rule: 'reported speech questions' },
            { template: '"I will help you." She said she ___ help me.', answer: 'would', options: ['will', 'would', 'could'], skill: 'grammar', rule: 'reported speech' },
        ],
        wish: [
            { template: 'I wish I ___ taller.', answer: 'were', options: ['am', 'were', 'will be'], skill: 'grammar', rule: 'wish present' },
            { template: 'I wish I ___ harder at university.', answer: 'had studied', options: ['studied', 'had studied', 'would study'], skill: 'grammar', rule: 'wish past' },
        ],
        relative_clauses: [
            { template: 'That\'s the woman ___ won the competition.', answer: 'who', options: ['who', 'which', 'where'], skill: 'grammar', rule: 'relative clauses' },
            { template: 'London, ___ is the capital, is very expensive.', answer: 'which', options: ['that', 'which', 'where'], skill: 'grammar', rule: 'non-defining relative clauses' },
            { template: 'This is the restaurant ___ we first met.', answer: 'where', options: ['who', 'which', 'where'], skill: 'grammar', rule: 'relative clauses place' },
        ],
        causative: [
            { template: 'I ___ my car washed yesterday.', answer: 'had', options: ['have', 'had', 'was'], skill: 'grammar', rule: 'causative have' },
            { template: 'She ___ her hair cut last week.', answer: 'had', options: ['have', 'had', 'got'], skill: 'grammar', rule: 'causative have' },
        ],
        translations: [
            { ru: 'Когда я пришёл, она уже ушла.', en: 'When I arrived, she had already left.' },
            { ru: 'Если бы я учился усерднее, я бы сдал экзамен.', en: 'If I had studied harder, I would have passed the exam.' },
            { ru: 'Он сказал что никогда не был в России.', en: 'He said he had never been to Russia.' },
            { ru: 'Жаль, что я не говорю по-французски.', en: 'I wish I spoke French.' },
            { ru: 'Это ресторан, где мы впервые встретились.', en: 'This is the restaurant where we first met.' },
            { ru: 'К тому времени я уже закончу работу.', en: 'By that time I will have finished work.' },
            { ru: 'Считается, что он лучший студент.', en: 'He is considered to be the best student.' },
        ],

        getAllPatterns() {
            let all = [];
            Object.keys(this).forEach(cat => { if (Array.isArray(this[cat])) all = all.concat(this[cat]); });
            return all;
        }
    },

    // ═══════════════════════════════════════════
    // C1 — ADVANCED
    // ═══════════════════════════════════════════
    C1: {
        inversion: [
            { template: 'Never ___ such a beautiful sunset.', answer: 'have I seen', options: ['I have seen', 'have I seen', 'I saw'], skill: 'grammar', rule: 'inversion' },
            { template: 'Seldom ___ such generosity.', answer: 'do we see', options: ['we see', 'do we see', 'we saw'], skill: 'grammar', rule: 'inversion' },
            { template: 'Only when he left ___ I realize my mistake.', answer: 'did', options: ['do', 'did', 'was'], skill: 'grammar', rule: 'inversion only when' },
        ],
        modal_perfects: [
            { template: 'She ___ home early. Her car is here.', answer: 'must have come', options: ['must have come', 'might come', 'can come'], skill: 'grammar', rule: 'modal perfect deduction' },
            { template: 'He ___ been the thief. He was with me.', answer: "can't have", options: ["can't have", "mustn't have", "shouldn't"], skill: 'grammar', rule: 'modal perfect impossibility' },
            { template: 'You ___ told me earlier!', answer: 'should have', options: ['should have', 'must have', 'could'], skill: 'grammar', rule: 'modal perfect criticism' },
            { template: 'I ___ bought so much food. (unnecessary)', answer: "needn't have", options: ["needn't have", "didn't need to", "shouldn't have"], skill: 'grammar', rule: "needn't have" },
        ],
        mixed_conditionals: [
            { template: 'If I had studied medicine, I ___ a doctor now.', answer: 'would be', options: ['would be', 'would have been', 'will be'], skill: 'grammar', rule: 'mixed conditional' },
            { template: 'If she weren\'t lazy, she ___ the exam last week.', answer: 'would have passed', options: ['would pass', 'would have passed', 'passed'], skill: 'grammar', rule: 'mixed conditional' },
        ],
        cleft_sentences: [
            { template: '___ really annoys me is people being late.', answer: 'What', options: ['What', 'That', 'It'], skill: 'grammar', rule: 'cleft sentence' },
            { template: 'It ___ the noise that woke me up.', answer: 'was', options: ['was', 'is', 'were'], skill: 'grammar', rule: 'cleft sentence' },
        ],
        distancing: [
            { template: 'It ___ that the economy is recovering.', answer: 'appears', options: ['appears', 'is appearing', 'appeared'], skill: 'grammar', rule: 'distancing' },
            { template: 'I\'d rather you ___ smoke in here.', answer: "didn't", options: ["don't", "didn't", "won't"], skill: 'grammar', rule: 'would rather' },
            { template: 'It\'s time you ___ studying.', answer: 'started', options: ['start', 'started', 'starting'], skill: 'grammar', rule: "it's time" },
        ],
        translations: [
            { ru: 'Никогда я не видел такого заката.', en: 'Never have I seen such a sunset.' },
            { ru: 'Возможно, они уже уехали.', en: 'They might have already left.' },
            { ru: 'Если бы я родился в другой стране, моя жизнь была бы другой.', en: 'If I had been born in a different country, my life would be different.' },
            { ru: 'Пора бы тебе начать заниматься.', en: "It's time you started studying." },
            { ru: 'Тебе не нужно было приходить так рано.', en: "You needn't have come so early." },
        ],

        getAllPatterns() {
            let all = [];
            Object.keys(this).forEach(cat => { if (Array.isArray(this[cat])) all = all.concat(this[cat]); });
            return all;
        }
    },

    // ═══════════════════════════════════════════
    // C2 — PROFICIENCY
    // ═══════════════════════════════════════════
    C2: {
        advanced_structures: [
            { template: '___ hard she tried, she couldn\'t solve it.', answer: 'However', options: ['However', 'Although', 'Despite'], skill: 'grammar', rule: 'concessive clause' },
            { template: '___ all options, we decided to postpone.', answer: 'Having considered', options: ['Having considered', 'Considered', 'To consider'], skill: 'grammar', rule: 'participle clause' },
            { template: 'The proposal was rejected; ___, they tried again.', answer: 'nevertheless', options: ['nevertheless', 'moreover', 'therefore'], skill: 'grammar', rule: 'advanced connector' },
            { template: 'As a child, he ___ spend hours reading.', answer: 'would', options: ['would', 'will', 'used'], skill: 'grammar', rule: 'would past habit' },
        ],
        translations: [
            { ru: 'Как бы она ни старалась, у неё не получалось.', en: "However hard she tried, she couldn't manage it." },
            { ru: 'Несмотря на трудности, проект был завершён.', en: 'Notwithstanding the difficulties, the project was completed.' },
            { ru: 'Не считай цыплят, пока не вылупились.', en: "Don't count your chickens before they hatch." },
        ],

        getAllPatterns() {
            let all = [];
            Object.keys(this).forEach(cat => { if (Array.isArray(this[cat])) all = all.concat(this[cat]); });
            return all;
        }
    },

    /* ─── Language identifier (default = English) ─── */
    language: 'en',

    /** Get grammar bank for a specific language + level */
    getForLanguage(langCode, cefrLevel) {
        if (!langCode || langCode === 'en') {
            return cefrLevel && this[cefrLevel] ? this[cefrLevel] : this;
        }
        const langBanks = this._langBanks || {};
        const langBank = langBanks[langCode];
        if (!langBank) return null;
        return cefrLevel && langBank[cefrLevel] ? langBank[cefrLevel] : langBank;
    },

    /** Registry of non-English grammar banks */
    _langBanks: {
        // ═══════════════════════════════════════════
        // SPANISH GRAMMAR BANK (Starter A1)
        // ═══════════════════════════════════════════
        es: {
            A1: {
                ser_estar: [
                    { template: 'Yo ___ estudiante.', answer: 'soy', options: ['soy', 'estoy', 'es'], skill: 'grammar', rule: 'ser (identity)' },
                    { template: 'Ella ___ en Madrid.', answer: 'está', options: ['es', 'está', 'son'], skill: 'grammar', rule: 'estar (location)' },
                    { template: 'Nosotros ___ de México.', answer: 'somos', options: ['somos', 'estamos', 'son'], skill: 'grammar', rule: 'ser (origin)' },
                    { template: 'Yo ___ contento.', answer: 'estoy', options: ['soy', 'estoy', 'es'], skill: 'grammar', rule: 'estar (emotion)' },
                    { template: 'Él ___ doctor.', answer: 'es', options: ['es', 'está', 'soy'], skill: 'grammar', rule: 'ser (profession)' },
                    { template: 'Ellos ___ en la escuela.', answer: 'están', options: ['son', 'están', 'es'], skill: 'grammar', rule: 'estar (location)' },
                    { template: 'Tú ___ muy inteligente.', answer: 'eres', options: ['eres', 'estás', 'es'], skill: 'grammar', rule: 'ser (characteristic)' },
                    { template: 'La comida ___ lista.', answer: 'está', options: ['es', 'está', 'son'], skill: 'grammar', rule: 'estar (state)' },
                ],
                articulos: [
                    { template: '___ libro es interesante.', answer: 'El', options: ['El', 'La', 'Un'], skill: 'grammar', rule: 'definite article masculine' },
                    { template: '___ casa es grande.', answer: 'La', options: ['El', 'La', 'Una'], skill: 'grammar', rule: 'definite article feminine' },
                    { template: 'Tengo ___ perro.', answer: 'un', options: ['un', 'una', 'el'], skill: 'grammar', rule: 'indefinite article masculine' },
                    { template: 'Hay ___ mesa aquí.', answer: 'una', options: ['un', 'una', 'la'], skill: 'grammar', rule: 'indefinite article feminine' },
                    { template: '___ niños están jugando.', answer: 'Los', options: ['Los', 'Las', 'Unos'], skill: 'grammar', rule: 'definite article plural masculine' },
                    { template: '___ flores son bonitas.', answer: 'Las', options: ['Los', 'Las', 'Unas'], skill: 'grammar', rule: 'definite article plural feminine' },
                ],
                presente: [
                    { template: 'Yo ___ español.', answer: 'hablo', options: ['hablo', 'hablas', 'habla'], skill: 'grammar', rule: 'present tense -ar' },
                    { template: 'Tú ___ en Madrid.', answer: 'vives', options: ['vivo', 'vives', 'vive'], skill: 'grammar', rule: 'present tense -er' },
                    { template: 'Ella ___ mucho.', answer: 'escribe', options: ['escribo', 'escribes', 'escribe'], skill: 'grammar', rule: 'present tense -ir' },
                    { template: 'Nosotros ___ café.', answer: 'bebemos', options: ['bebo', 'bebes', 'bebemos'], skill: 'grammar', rule: 'present tense -er' },
                ],
                translations: [
                    { es: 'Yo soy de Rusia.', en: 'I am from Russia.' },
                    { es: 'Ella está en casa.', en: 'She is at home.' },
                    { es: 'Nosotros somos amigos.', en: 'We are friends.' },
                    { es: '¿Cómo te llamas?', en: 'What is your name?' },
                    { es: 'Yo quiero un café.', en: 'I want a coffee.' },
                    { es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
                ],
                getAllPatterns() {
                    let all = [];
                    Object.keys(this).forEach(cat => { if (Array.isArray(this[cat])) all = all.concat(this[cat]); });
                    return all;
                }
            }
        },

        // ═══════════════════════════════════════════
        // ARABIC GRAMMAR BANK (Starter A1)
        // ═══════════════════════════════════════════
        ar: {
            A1: {
                // ── Script: Letter Recognition ──
                letters_group1: [
                    { template: 'Which letter is "alif"?', answer: 'ا', options: ['ا', 'ب', 'ت'], skill: 'script', rule: 'letter recognition group 1' },
                    { template: 'Which letter is "bā"?', answer: 'ب', options: ['ا', 'ب', 'ث'], skill: 'script', rule: 'letter recognition group 1' },
                    { template: 'ت has how many dots?', answer: '2 above', options: ['1 below', '2 above', '3 above'], skill: 'script', rule: 'dot patterns' },
                    { template: 'ث has how many dots?', answer: '3 above', options: ['1 below', '2 above', '3 above'], skill: 'script', rule: 'dot patterns' },
                    { template: 'Which letter is "jīm"?', answer: 'ج', options: ['ج', 'ح', 'خ'], skill: 'script', rule: 'letter recognition group 1' },
                    { template: 'ح and خ differ by:', answer: 'a dot above', options: ['a dot below', 'a dot above', 'no difference'], skill: 'script', rule: 'dot patterns' },
                ],
                letters_group2: [
                    { template: 'Which letter is "dāl"?', answer: 'د', options: ['د', 'ذ', 'ر'], skill: 'script', rule: 'letter recognition group 2' },
                    { template: 'د + dot above = ___', answer: 'ذ', options: ['ذ', 'ز', 'ر'], skill: 'script', rule: 'dot twins' },
                    { template: 'ر + dot above = ___', answer: 'ز', options: ['ذ', 'ز', 'د'], skill: 'script', rule: 'dot twins' },
                    { template: 'س + 3 dots = ___', answer: 'ش', options: ['ش', 'ث', 'ص'], skill: 'script', rule: 'dot twins' },
                    { template: 'Which letter is "sīn"?', answer: 'س', options: ['س', 'ش', 'ص'], skill: 'script', rule: 'letter recognition group 2' },
                ],
                letters_group3: [
                    { template: 'The emphatic "s" is:', answer: 'ص', options: ['س', 'ص', 'ش'], skill: 'script', rule: 'emphatic letters' },
                    { template: 'ص + dot = ___', answer: 'ض', options: ['ض', 'ظ', 'ذ'], skill: 'script', rule: 'emphatic dot twins' },
                    { template: 'ط + dot = ___', answer: 'ظ', options: ['ض', 'ظ', 'ذ'], skill: 'script', rule: 'emphatic dot twins' },
                    { template: 'ع is produced from the:', answer: 'throat', options: ['lips', 'throat', 'nose'], skill: 'script', rule: 'pharyngeal sounds' },
                    { template: 'ع + dot = ___', answer: 'غ', options: ['غ', 'خ', 'ف'], skill: 'script', rule: 'pharyngeal dot twins' },
                ],
                letters_group4: [
                    { template: 'The deep "k" sound is:', answer: 'ق', options: ['ك', 'ق', 'غ'], skill: 'script', rule: 'letter recognition group 4' },
                    { template: 'و can be a consonant (w) or a:', answer: 'long vowel (ū)', options: ['short vowel', 'long vowel (ū)', 'dot'], skill: 'script', rule: 'dual-role letters' },
                    { template: 'ي can be a consonant (y) or a:', answer: 'long vowel (ī)', options: ['short vowel', 'long vowel (ī)', 'emphatic'], skill: 'script', rule: 'dual-role letters' },
                    { template: 'Arabic has ___ letters total.', answer: '28', options: ['26', '28', '30'], skill: 'script', rule: 'alphabet basics' },
                    { template: 'Which letter is "nūn"?', answer: 'ن', options: ['ن', 'ب', 'ت'], skill: 'script', rule: 'letter recognition group 4' },
                ],
                // ── Script: Vowels & Reading ──
                vowels: [
                    { template: 'بَ reads as:', answer: 'ba', options: ['ba', 'bu', 'bi'], skill: 'script', rule: 'fatḥa vowel' },
                    { template: 'بُ reads as:', answer: 'bu', options: ['ba', 'bu', 'bi'], skill: 'script', rule: 'ḍamma vowel' },
                    { template: 'بِ reads as:', answer: 'bi', options: ['ba', 'bu', 'bi'], skill: 'script', rule: 'kasra vowel' },
                    { template: 'The mark  َ (line above) is called:', answer: 'fatḥa', options: ['fatḥa', 'ḍamma', 'kasra'], skill: 'script', rule: 'vowel names' },
                    { template: 'The mark  ُ (curl above) is called:', answer: 'ḍamma', options: ['fatḥa', 'ḍamma', 'kasra'], skill: 'script', rule: 'vowel names' },
                    { template: 'The mark  ِ (line below) is called:', answer: 'kasra', options: ['fatḥa', 'ḍamma', 'kasra'], skill: 'script', rule: 'vowel names' },
                    { template: 'Sukūn means the letter is:', answer: 'without a vowel', options: ['doubled', 'without a vowel', 'long'], skill: 'script', rule: 'sukūn' },
                    { template: 'Shadda means the letter is:', answer: 'doubled', options: ['silent', 'doubled', 'long'], skill: 'script', rule: 'shadda' },
                ],
                reading: [
                    { template: 'كَتَبَ reads as:', answer: 'kataba', options: ['kataba', 'kutiba', 'katibu'], skill: 'script', rule: 'first reading' },
                    { template: 'بَيت reads as:', answer: 'bayt', options: ['bayt', 'buyt', 'biyt'], skill: 'script', rule: 'first reading' },
                    { template: 'بِنت reads as:', answer: 'bint', options: ['bint', 'bant', 'bunt'], skill: 'script', rule: 'first reading' },
                ],
                // ── Communication: Greetings & Phrases ──
                pronouns: [
                    { template: '___ طالب (I am a student)', answer: 'أنا', options: ['أنا', 'أنتَ', 'هو'], skill: 'grammar', rule: 'personal pronouns' },
                    { template: '___ من مصر (He is from Egypt)', answer: 'هو', options: ['أنا', 'هو', 'هي'], skill: 'grammar', rule: 'personal pronouns' },
                    { template: '___ طبيبة (She is a doctor)', answer: 'هي', options: ['هو', 'هي', 'أنتِ'], skill: 'grammar', rule: 'personal pronouns' },
                    { template: '___ من أين؟ (Where are you from?)', answer: 'أنتَ', options: ['أنا', 'أنتَ', 'هو'], skill: 'grammar', rule: 'personal pronouns' },
                ],
                greetings: [
                    { template: 'The reply to السلام عليكم is:', answer: 'وعليكم السلام', options: ['مرحبا', 'وعليكم السلام', 'شكراً'], skill: 'culture', rule: 'Islamic greeting response' },
                    { template: '"Thank you" in Arabic:', answer: 'شكراً', options: ['مرحبا', 'شكراً', 'من فضلك'], skill: 'vocabulary', rule: 'basic phrases' },
                    { template: '"Please" in Arabic:', answer: 'من فضلك', options: ['شكراً', 'من فضلك', 'لا'], skill: 'vocabulary', rule: 'basic phrases' },
                    { template: '"Goodbye" in Arabic:', answer: 'مع السلامة', options: ['مرحبا', 'شكراً', 'مع السلامة'], skill: 'vocabulary', rule: 'basic phrases' },
                    { template: '"Yes" in Arabic:', answer: 'نعم', options: ['نعم', 'لا', 'شكراً'], skill: 'vocabulary', rule: 'basic phrases' },
                ],
                numbers: [
                    { template: 'واحد + واحد = ?', answer: 'اثنان', options: ['واحد', 'اثنان', 'ثلاثة'], skill: 'grammar', rule: 'numbers' },
                    { template: 'ثلاثة + اثنان = ?', answer: 'خمسة', options: ['أربعة', 'خمسة', 'ستة'], skill: 'grammar', rule: 'numbers' },
                    { template: 'أربعة + ثلاثة = ?', answer: 'سبعة', options: ['ستة', 'سبعة', 'ثمانية'], skill: 'grammar', rule: 'numbers' },
                    { template: 'عشرة - واحد = ?', answer: 'تسعة', options: ['ثمانية', 'تسعة', 'سبعة'], skill: 'grammar', rule: 'numbers' },
                ],
                getAllPatterns() {
                    let all = [];
                    Object.keys(this).forEach(cat => { if (Array.isArray(this[cat])) all = all.concat(this[cat]); });
                    return all;
                }
            }
        }
    }
};

if (typeof module !== 'undefined') module.exports = { LangyGrammarBank };

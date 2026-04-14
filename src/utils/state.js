/* ============================================
   LANGY — STATE MANAGEMENT
   ============================================ */

const LangyState = {
    // User
    user: {
        name: 'Alex',
        email: 'alex@example.com',
        level: 'B1 Intermediate',
        xp: 2450,
        streak: 14,
        joinDate: '2025-12-01',
        avatar: '🧑‍🎓',
        hasCompletedPlacement: false,
        interests: []
    },

    // Currencies
    currencies: {
        langy: 350,  // premium
        dangy: 1280  // earned
    },

    // Mascot
    mascot: {
        selected: null, // 0, 1, or 2
        equipped: {
            hat: null,
            shirt: null,
            pants: null,
            shoes: null,
            accessory: null
        }
    },

    // Subscription
    subscription: {
        plan: null, // 'free', 'pro', 'premium'
    },

    // Streak data
    streakData: {
        days: 14,
        totalSessions: 87,
        totalMinutes: 1240,
        wordsLearned: 342,
        accuracy: 78,
        timeBreakdown: {
            vocabulary: 420,
            grammar: 310,
            listening: 280,
            speaking: 150,
            writing: 80
        },
        lastSession: {
            date: 'Today',
            wordsLearned: 12,
            accuracy: 85,
            duration: 18
        }
    },

    // Homework
    homework: {
        current: [],
        completed: []
    },

    // Tests
    tests: {
        listening: [],
        speaking: [],
        reading: [],
        grammar: []
    },

    // Results / Progress
    progress: {
        overall: 0,
        skills: {
            vocabulary: 0,
            grammar: 0,
            listening: 0,
            speaking: 0,
            writing: 0,
            reading: 0
        },
        topicsCompleted: 0,
        totalTopics: 50,
        currentUnitId: 1,
        currentLessonIdx: 0,
        skipsRemaining: 2, // Max 2 per unit
        currentUnit: 'Unit 1: Getting Started',
        lessonHistory: [],
        recentTopics: []
    },

    // Daily Challenge
    dailyChallenge: {
        reward: 50, // Dangy
        timeLeft: 14400, // seconds
        tasks: [
            { id: 1, title: 'Speak for 3 minutes', desc: 'Practice speaking on any topic', done: true, icon: '🎤' },
            { id: 2, title: 'No mistakes challenge', desc: 'Complete 10 questions without errors', done: false, icon: '🎯' },
            { id: 3, title: 'Listen & repeat', desc: 'Listen to 5 sentences and repeat', done: false, icon: '🎧' },
            { id: 4, title: 'Learn 5 new words', desc: 'Vocabulary expansion', done: false, icon: '📖' },
        ]
    },

    // Shop
    shop: {
        items: [
            { id: 1, name: 'Cool Shades', emoji: '😎', price: 50, currency: 'dangy', category: 'accessory' },
            { id: 2, name: 'Top Hat', emoji: '🎩', price: 80, currency: 'dangy', category: 'hat' },
            { id: 3, name: 'Crown', emoji: '👑', price: 200, currency: 'langy', category: 'hat', premium: true },
            { id: 4, name: 'Star Badge', emoji: '⭐', price: 30, currency: 'dangy', category: 'accessory' },
            { id: 5, name: 'Rocket', emoji: '🚀', price: 150, currency: 'langy', category: 'sticker', premium: true },
            { id: 6, name: 'Fire Skin', emoji: '🔥', price: 300, currency: 'langy', category: 'skin', premium: true },
            { id: 7, name: 'Bow Tie', emoji: '🎀', price: 40, currency: 'dangy', category: 'accessory' },
            { id: 8, name: 'Party Hat', emoji: '🥳', price: 60, currency: 'dangy', category: 'hat' },
        ],
        owned: [1, 4, 8]
    },

    // Inventory
    inventory: {
        items: [
            { id: 1, name: 'Cool Shades', emoji: '😎', slot: 'accessory', equipped: false },
            { id: 4, name: 'Star Badge', emoji: '⭐', slot: 'accessory', equipped: true },
            { id: 8, name: 'Party Hat', emoji: '🥳', slot: 'hat', equipped: false },
        ]
    },

    // Duels
    duels: {
        modes: [
            { id: 'quick', name: 'Quick Match', desc: 'Fast 5-question duel', icon: '⚡', bg: 'var(--reward-gold-bg)' },
            { id: 'ranked', name: 'Ranked Battle', desc: 'Compete for league points', icon: '🏆', bg: 'var(--primary-bg)' },
            { id: 'practice', name: 'Practice Duel', desc: 'No pressure, just practice', icon: '🎯', bg: 'var(--accent-bg)' },
        ],
        questions: [
            { q: 'Choose the correct form:', text: '"She ___ to the store yesterday."', options: ['goed', 'went', 'go', 'gone'], correct: 1 },
            { q: 'Fill in the blank:', text: '"I have been ___ English for 2 years."', options: ['learn', 'learned', 'learning', 'learns'], correct: 2 },
            { q: 'Which is correct?', text: '"If I ___ rich, I would travel."', options: ['am', 'was', 'were', 'be'], correct: 2 },
            { q: 'Choose the synonym:', text: '"Happy" means the same as...', options: ['Sad', 'Joyful', 'Angry', 'Tired'], correct: 1 },
            { q: 'Correct spelling:', text: 'Which word is spelled correctly?', options: ['Recieve', 'Receive', 'Receve', 'Receeve'], correct: 1 },
        ]
    },

    // Events
    events: [
        { id: 1, title: 'Weekend Grammar Sprint', desc: 'Complete 20 grammar tasks', timeLeft: '2d 5h', reward: '100 Dangy', bg: 'linear-gradient(135deg, #7C6CF6, #9D90F9)', emoji: '📝' },
        { id: 2, title: 'Listening Marathon', desc: 'Listen to 30 minutes of content', timeLeft: '1d 12h', reward: '75 Dangy + Sticker', bg: 'linear-gradient(135deg, #4ADE80, #22C55E)', emoji: '🎧' },
        { id: 3, title: 'Vocabulary Master', desc: 'Learn 50 new words this week', timeLeft: '5d', reward: '200 Dangy', bg: 'linear-gradient(135deg, #F59E0B, #D97706)', emoji: '📚' },
    ],

    // Settings
    settings: {
        darkMode: false,
        notifications: true,
        sound: true,
        haptics: true,
        dailyReminder: '09:00',
        languageLevel: 'B1'
    },

    // AI Memory — mistakes, weak areas, textbook context
    aiMemory: {
        mistakes: [],
        weakAreas: [],
        currentTextbookId: null,
        lastTopic: 'Getting Started',
        behavioralNote: 'Highly motivated learner',
        conversationContext: [] // { role: 'ai'|'user', content: string, timestamp: number, type: 'text'|'task' }
    }
};

// Simple state getter/setter
function getState(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], LangyState);
}

function setState(path, value) {
    const keys = path.split('.');
    const last = keys.pop();
    const target = keys.reduce((obj, key) => obj[key], LangyState);
    target[last] = value;
}

// Deep copy of initial state for resets
const DEFAULT_STATE = JSON.parse(JSON.stringify(LangyState));

function getDefaultState() {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function getStateSnapshot() {
    return JSON.parse(JSON.stringify(LangyState));
}

function loadFromSnapshot(data) {
    function deepMerge(target, source) {
        for (const key of Object.keys(source)) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])
                && target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
                deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }
    deepMerge(LangyState, data);
}

function resetState() {
    const defaults = getDefaultState();
    Object.keys(defaults).forEach(key => {
        LangyState[key] = defaults[key];
    });
}

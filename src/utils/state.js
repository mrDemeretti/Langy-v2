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
        _migrated: true,       // Flag: false/missing = old user, needs reset
        days: 0,
        totalSessions: 0,
        totalMinutes: 0,
        wordsLearned: 0,
        accuracy: 0,
        todayCompleted: false, // Has user done a session today?
        activeDays: [],        // Array of ISO date strings for streak calendar
        longestStreak: 0,      // Best streak ever
        // Streak Freeze: protects streak when you miss a day
        streakFreezes: 0,      // Number of freeze shields owned
        freezeUsedDates: [],   // ISO dates when a freeze was auto-used
        freezePrice: 200,      // Dangy cost per freeze
        maxFreezes: 3,         // Max freezes you can hold
        timeBreakdown: {
            vocabulary: 0,
            grammar: 0,
            listening: 0,
            speaking: 0,
            writing: 0
        },
        lastSession: {
            date: null,        // ISO date string (e.g. "2026-04-16") or null
            wordsLearned: 0,
            accuracy: 0,
            duration: 0
        },
        // Per-day stats for calendar view
        // Key = ISO date string, Value = { sessions, minutes, words, accuracy, categories }
        dailyStats: {}
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
        recentTopics: [],

        // Mastery Loop: per-unit results
        // Key = "textbookId:unitId", e.g. "b1_pre_int:3"
        // Value = { score, passed, attempts, failedIndices, lastAttempt }
        mastery: {},

        // CEFR Badges: earned level certificates
        // Key = CEFR code, e.g. "A1"
        // Value = { earned: bool, date: string|null, badge: string }
        cefrBadges: {
            A1: { earned: false, date: null, badge: '🏅' },
            A2: { earned: false, date: null, badge: '🏅' },
            B1: { earned: false, date: null, badge: '🏅' },
            B2: { earned: false, date: null, badge: '🏅' },
            C1: { earned: false, date: null, badge: '🏅' },
            C2: { earned: false, date: null, badge: '🏅' }
        }
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

// ─── STREAK & SESSION RECORDING ───
// Call this after every completed lesson/exercise session
function recordSession({ duration = 0, wordsLearned = 0, accuracy = 0, category = 'grammar' } = {}) {
    const today = new Date().toISOString().split('T')[0];
    const sd = LangyState.streakData;
    
    // Update session stats
    sd.totalSessions++;
    sd.totalMinutes += duration;
    sd.wordsLearned += wordsLearned;
    sd.accuracy = sd.totalSessions > 0
        ? Math.round(((sd.accuracy * (sd.totalSessions - 1)) + accuracy) / sd.totalSessions)
        : accuracy;
    
    // Update time breakdown
    if (sd.timeBreakdown[category] !== undefined) {
        sd.timeBreakdown[category] += duration;
    }
    
    // Update last session
    sd.lastSession = { date: today, wordsLearned, accuracy, duration };
    
    // Update daily stats for calendar
    if (!sd.dailyStats) sd.dailyStats = {};
    if (!sd.dailyStats[today]) {
        sd.dailyStats[today] = { sessions: 0, minutes: 0, words: 0, accuracy: 0, categories: {} };
    }
    const ds = sd.dailyStats[today];
    ds.sessions++;
    ds.minutes += duration;
    ds.words += wordsLearned;
    ds.accuracy = ds.sessions > 0
        ? Math.round(((ds.accuracy * (ds.sessions - 1)) + accuracy) / ds.sessions)
        : accuracy;
    if (!ds.categories[category]) ds.categories[category] = 0;
    ds.categories[category] += duration;
    
    // Daily Challenge: Track Perfect Lesson
    if (accuracy === 100) {
        if (!LangyState.dailyChallenge) LangyState.dailyChallenge = {};
        LangyState.dailyChallenge._perfectLessonDate = today;
    }
    
    // Streak logic: increment only once per day
    if (!sd.todayCompleted) {
        sd.todayCompleted = true;
        
        // Add today to activeDays
        if (!sd.activeDays) sd.activeDays = [];
        if (!sd.activeDays.includes(today)) {
            sd.activeDays.push(today);
        }
        
        // Increment streak
        sd.days++;
        LangyState.user.streak = sd.days;
        
        // Update longest streak
        if (!sd.longestStreak) sd.longestStreak = 0;
        if (sd.days > sd.longestStreak) {
            sd.longestStreak = sd.days;
        }
        
        // ─── STREAK REWARDS ───
        const streakRewards = getStreakReward(sd.days);
        if (streakRewards) {
            LangyState.currencies.dangy += streakRewards.dangy;
            LangyState.currencies.langy += streakRewards.langy;
            
            // Show reward toast
            let rewardMsg = `🔥 ${sd.days} Day Streak!`;
            if (streakRewards.dangy > 0) rewardMsg += ` +${streakRewards.dangy} Dangy`;
            if (streakRewards.langy > 0) rewardMsg += ` +${streakRewards.langy} Langy`;
            if (streakRewards.badge) rewardMsg += ` ${streakRewards.badge}`;
            
            setTimeout(() => {
                if (typeof Anim !== 'undefined') Anim.showToast(rewardMsg);
            }, 800);
        }
    }
    
    // Save
    if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
}

// Streak reward tiers
function getStreakReward(days) {
    // Daily rewards
    const dailyDangy = Math.min(10 + Math.floor(days / 7) * 5, 50); // 10-50 dangy/day, scaling
    
    // Milestone rewards (Langy = premium, only at milestones)
    const milestones = {
        3:   { dangy: 25,  langy: 0,  badge: '🌟' },
        7:   { dangy: 50,  langy: 5,  badge: '⭐ Weekly Warrior!' },
        14:  { dangy: 100, langy: 10, badge: '🌟 Two Week Champion!' },
        30:  { dangy: 200, langy: 25, badge: '🏆 Monthly Master!' },
        60:  { dangy: 400, langy: 50, badge: '💎 Diamond Streak!' },
        90:  { dangy: 600, langy: 100, badge: '👑 Royal Learner!' },
        180: { dangy: 1000, langy: 200, badge: '🔥 Half-Year Hero!' },
        365: { dangy: 2000, langy: 500, badge: '🏅 Annual Legend!' }
    };
    
    if (milestones[days]) {
        return milestones[days];
    }
    
    return { dangy: dailyDangy, langy: 0, badge: null };
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

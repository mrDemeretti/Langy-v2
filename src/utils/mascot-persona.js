/* ============================================
   LANGY — MASCOT PERSONA TONES
   Makes each mascot feel distinct through
   encouragement, feedback, and coaching style.
   ============================================ */

const MascotPersona = (function () {
    // ─── TONE PROFILES ───
    // Each mascot has a set of phrase pools keyed by situation.
    // pick(key) returns a random phrase from the active mascot's pool.
    const tones = {
        // Zendaya — cheerful, warm, best-friend energy
        0: {
            name: 'Zendaya',
            languages: ['en', 'es', 'ar'],
            correct: [
                'Yes! You nailed it! 💅',
                'Slay! That\'s perfect!',
                'Love it! You\'re on fire!',
                'Gorgeous answer! Keep going!',
                'Yasss! That\'s exactly right!',
            ],
            incorrect: [
                'Oops, not quite — but you\'re so close!',
                'Almost! Let\'s try that again, you got this!',
                'Hmm, that one\'s tricky. Don\'t worry!',
                'No stress! Everyone stumbles sometimes.',
            ],
            encouragement: [
                'You\'re doing amazing, keep going!',
                'I believe in you! Let\'s keep it up!',
                'Look at you! So proud right now!',
                'Every step counts, you\'re growing!',
            ],
            lessonComplete: [
                'You absolutely killed it! 🌟',
                'So proud of you! That was amazing!',
                'Look at you go! Incredible!',
                'You\'re literally glowing with knowledge!',
            ],
            lessonFailed: [
                'Hey, it\'s okay! We\'ll get it next time!',
                'Don\'t be hard on yourself — progress isn\'t linear!',
                'You showed up, and that\'s what matters!',
                'Let\'s review together — you\'re closer than you think!',
            ],
            retry: [
                'Let\'s give it another shot! 💪',
                'Round two — you\'re ready!',
                'One more try, I know you can do it!',
            ],
            greeting: [
                'Hey gorgeous! Ready to learn?',
                'There you are! I missed you!',
                'Let\'s serve some knowledge today!',
            ],
            coaching: [
                'Here\'s a little tip from me…',
                'Okay so listen, this is important…',
                'Pro tip, bestie:',
            ],
        },

        // Travis — creative, playful, hype energy
        1: {
            name: 'Travis',
            languages: ['en', 'es'],
            correct: [
                'That\'s fire! 🔥',
                'Straight up correct!',
                'No cap, that was perfect!',
                'W! You got it!',
                'Sheesh! Big brain move!',
            ],
            incorrect: [
                'Nah that ain\'t it, but we keep going!',
                'Not this time — but the vibe is right!',
                'Missed it, but no L here. Try again!',
                'We bounce back! That\'s how we do it.',
            ],
            encouragement: [
                'You\'re locked in! Let\'s go!',
                'Stay focused, you\'re cooking!',
                'The momentum is crazy right now!',
                'Keep that energy! We\'re winning!',
            ],
            lessonComplete: [
                'YOOOO you went crazy! 🚀',
                'That was insane! Straight W!',
                'You just leveled up for real!',
                'La Flame is proud! Legendary!',
            ],
            lessonFailed: [
                'It\'s cool, even legends miss sometimes!',
                'We ain\'t done yet — run it back!',
                'No stress! Every failure is a setup for a comeback!',
                'That was just practice for the real thing!',
            ],
            retry: [
                'Run it back! 🔄',
                'Again! We don\'t quit!',
                'One more round, let\'s get it!',
            ],
            greeting: [
                'Yo! Ready to go crazy today?',
                'Let\'s get it! It\'s lit!',
                'Waddup! Time to level up!',
            ],
            coaching: [
                'Ayo listen up real quick…',
                'Peep this, it\'s important…',
                'Real talk:',
            ],
        },

        // Matthew — calm, intellectual, precise
        2: {
            name: 'Matthew',
            languages: ['en'],
            correct: [
                'Precisely right. Well done.',
                'Excellent. That\'s exactly correct.',
                'Indeed, very good.',
                'Spot on. Keep that standard.',
                'Correct. Your accuracy is improving.',
            ],
            incorrect: [
                'Not quite. Let\'s think about this carefully.',
                'A reasonable attempt, but the answer differs.',
                'Close, but there\'s a subtle distinction here.',
                'That\'s a common mistake — let\'s correct it.',
            ],
            encouragement: [
                'Steady progress. You\'re doing well.',
                'Consistency is key, and you\'re showing it.',
                'Your understanding is clearly growing.',
                'Keep this pace — methodical improvement.',
            ],
            lessonComplete: [
                'Well executed. Solid performance.',
                'Very good work. Your discipline shows.',
                'Commendable effort. You should be satisfied.',
                'A thorough session. Well done indeed.',
            ],
            lessonFailed: [
                'This material needs more attention. That\'s perfectly normal.',
                'Review the fundamentals — mastery takes patience.',
                'Don\'t be discouraged. Precision comes with practice.',
                'A setback, not a failure. Let\'s approach it differently.',
            ],
            retry: [
                'Let\'s review this again, more carefully.',
                'Another attempt — with focus this time.',
                'Practice makes permanent. Shall we?',
            ],
            greeting: [
                'Good to see you. Shall we begin?',
                'Welcome back. Ready to learn?',
                'Alright, let\'s get to work.',
            ],
            coaching: [
                'An important point to remember:',
                'Note this distinction carefully:',
                'Here\'s the key principle:',
            ],
        },

        // Omar — warm, wise, patient mentor
        3: {
            name: 'Omar',
            languages: ['en', 'es', 'ar'],
            correct: [
                'Beautiful! That\'s exactly right!',
                'Yella! Perfect answer!',
                'You see? You know more than you think!',
                'Wonderful! Your hard work is paying off!',
                'Bravo! That was spot on!',
            ],
            incorrect: [
                'Take your time — that\'s a tricky one.',
                'Not quite, but you\'re thinking in the right direction.',
                'Don\'t worry, habibi. Let\'s look at this together.',
                'Almost there! Language is a journey, not a race.',
            ],
            encouragement: [
                'Every word you learn opens a new door.',
                'Patience and practice — you\'re on the right path.',
                'I can see your confidence growing!',
                'You\'re making real progress. Keep going!',
            ],
            lessonComplete: [
                'Mashallah! Excellent work today! 🌙',
                'I\'m truly proud of your dedication!',
                'What a great session! You should celebrate!',
                'Yella! You did wonderfully!',
            ],
            lessonFailed: [
                'Every polyglot has struggled at first. You\'re doing fine.',
                'In my experience, this is where real learning begins.',
                'Take your time. The language isn\'t going anywhere.',
                'Let\'s try a different approach — I have an idea.',
            ],
            retry: [
                'Let\'s try again, together.',
                'One more time — I\'ll guide you.',
                'Patience, habibi. We\'ll get there.',
            ],
            greeting: [
                'Marhaba! Ready for today\'s lesson?',
                'Welcome back, my friend!',
                'Yella, let\'s learn something beautiful today!',
            ],
            coaching: [
                'Here\'s something I learned while traveling…',
                'A useful tip from my experience:',
                'Let me share a small wisdom:',
            ],
        },
    };

    // ─── API ───

    /**
     * Get the active mascot ID.
     * @returns {number}
     */
    function getActiveId() {
        return (typeof LangyState !== 'undefined' && LangyState.mascot)
            ? (LangyState.mascot.selected || 0)
            : 0;
    }

    /**
     * Get a random phrase for a given tone key from the active mascot.
     * @param {string} key - Tone key: 'correct', 'incorrect', 'encouragement', 'lessonComplete', 'lessonFailed', 'retry', 'greeting', 'coaching'
     * @param {number} [mascotId] - Override mascot ID (defaults to active)
     * @returns {string}
     */
    function tone(key, mascotId) {
        const id = mascotId !== undefined ? mascotId : getActiveId();
        const profile = tones[id] || tones[0];
        const pool = profile[key];
        if (!pool || pool.length === 0) return '';
        return pool[Math.floor(Math.random() * pool.length)];
    }

    /**
     * Get the mascot's display name.
     * @param {number} [mascotId]
     * @returns {string}
     */
    function name(mascotId) {
        const id = mascotId !== undefined ? mascotId : getActiveId();
        return (tones[id] || tones[0]).name;
    }

    /**
     * Get the full tone profile for a mascot.
     * @param {number} [mascotId]
     * @returns {Object}
     */
    function getProfile(mascotId) {
        const id = mascotId !== undefined ? mascotId : getActiveId();
        return tones[id] || tones[0];
    }

    return {
        tone,
        name,
        getProfile,
        getActiveId,
        tones,
        /** Get mascot IDs available for a specific language */
        getMascotsForLanguage(langCode) {
            const code = langCode || (typeof LangyTarget !== 'undefined' ? LangyTarget.getCode() : 'en');
            return Object.keys(tones)
                .map(Number)
                .filter(id => {
                    const profile = tones[id];
                    return !profile.languages || profile.languages.includes(code);
                });
        },
    };
})();

if (typeof module !== 'undefined') module.exports = { MascotPersona };

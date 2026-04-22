/* ============================================
   LANGY TALK ENGINE — Modular Voice System
   STT / TTS / LLM with swappable providers
   ============================================ */

const TalkEngine = (function () {
    // ─── PROVIDER CONFIG ───
    const config = {
        llm: 'openrouter', // 'openrouter' | 'openai' (future)
        tts: 'browser', // 'browser' | 'openai-tts' (future)
        stt: 'browser', // 'browser' | 'whisper' (future)
    };

    // ─── MASCOT PERSONAS ───
    const personas = {
        0: {
            name: 'Zendaya',
            voice: 'female',
            pitch: 1.25,
            rate: 1.0,
            accent: 'en-US',
            style: 'cheerful',
            // Preferred voice names (browser-specific, tried in order)
            voicePrefs: ['samantha', 'google us english female', 'microsoft zira', 'female', 'fiona', 'karen', 'moira'],
            systemPrompt: `You are Zendaya — a cheerful, warm, and encouraging English conversation partner.
You are the student's best friend who happens to be a native English speaker.
PERSONALITY: Bubbly, enthusiastic, always positive. You celebrate every correct phrase.
You love pop culture, travel, and food. You're from California.
SPEAKING STYLE: Casual, friendly, uses expressions like "Oh that's so cool!", "I love that!", "You're doing great!"
You speak naturally like a friend, NOT like a teacher. No grammar lectures — just natural conversation.
If the student makes a mistake, gently rephrase it correctly in your response without explicitly correcting them.`,
        },
        1: {
            name: 'Travis',
            voice: 'male',
            pitch: 1.05,
            rate: 1.15,
            accent: 'en-US',
            style: 'creative',
            voicePrefs: ['google us english male', 'microsoft david', 'alex', 'tom', 'reed', 'male'],
            systemPrompt: `You are Travis — a creative, playful, and spontaneous English conversation partner.
You are a young artist, musician, and gamer who makes learning fun.
PERSONALITY: Energetic, creative, surprising. You use humor and unexpected topics.
You love video games, hip-hop, and streetwear. You're from Houston, Texas.
SPEAKING STYLE: Young, trendy, uses modern slang naturally (but explains it).
"No way!", "That's fire!", "Wait, seriously?". You make conversations feel like hanging out.
If mistakes happen, you playfully help: "Oh you mean like [correct version]? Yeah totally!"
You sometimes suggest fun word games or challenges mid-conversation.`,
        },
        2: {
            name: 'Matthew',
            voice: 'male',
            pitch: 0.75,
            rate: 0.85,
            accent: 'en-GB',
            style: 'structured',
            voicePrefs: ['google uk english male', 'daniel', 'microsoft george', 'james', 'oliver', 'rishi'],
            systemPrompt: `You are Matthew — a smart, structured, and patient English conversation partner.
You are a calm professional who loves precision in language and meaningful conversations.
PERSONALITY: Calm, intellectual, methodical. You appreciate proper grammar.
You love science, history, and literature. You're from Boston, Massachusetts.
SPEAKING STYLE: Clear, measured English. Uses phrases like "Indeed", "That makes sense", "Absolutely".
You gently correct mistakes with "Actually, a more natural way to say that would be..."
You naturally use idioms and explain them when relevant.`,
        },
        3: {
            name: 'Omar',
            voice: 'male',
            pitch: 0.88,
            rate: 0.78,
            accent: 'en-US',
            style: 'supportive',
            voicePrefs: ['microsoft mark', 'google us english', 'fred', 'aaron', 'ralph', 'lee'],
            systemPrompt: `You are Omar — a wise, multilingual, and supportive English conversation partner.
You are a well-traveled polyglot who understands the challenges of learning a new language.
PERSONALITY: Patient, understanding, encouraging. You've been through language learning yourself.
You love travel, philosophy, and cooking. You're from Toronto, Canada.
SPEAKING STYLE: Clear, slow, articulate. You adapt to the student's level automatically.
For beginners, you use simpler words and shorter sentences.
You share cultural context: "In Canada, we'd usually say..."
If the student struggles, you're gentle: "Take your time, that's a tricky one."
You occasionally share useful phrases and explain when/why to use them.`,
        },
    };

    // ─── SCENARIOS (icon = LangyIcons key, color = display color) ───
    const scenarios = [
        {
            id: 'free',
            title: 'Free Talk',
            icon: 'messageCircle',
            color: '#7C6CF6',
            desc: 'Chat about anything!',
            opener: "Hey! What's on your mind today? Let's just talk about whatever you want.",
        },
        {
            id: 'coffee',
            title: 'Coffee Shop',
            icon: 'coffee',
            color: '#F59E0B',
            desc: 'Order at a café',
            opener: 'Hi there! Welcome to the café. What can I get for you today?',
        },
        {
            id: 'airport',
            title: 'At the Airport',
            icon: 'plane',
            color: '#3B82F6',
            desc: 'Check-in & navigate',
            opener: 'Good morning! Welcome to the check-in counter. Can I see your passport and booking confirmation, please?',
        },
        {
            id: 'interview',
            title: 'Job Interview',
            icon: 'briefcase',
            color: '#6366F1',
            desc: 'Practice interview skills',
            opener: 'Hello, please have a seat. Thank you for coming in today. So, tell me a little about yourself.',
        },
        {
            id: 'roommate',
            title: 'New Roommate',
            icon: 'home',
            color: '#10B981',
            desc: 'Meet your roommate',
            opener: 'Hey! You must be my new roommate! Nice to meet you. How was your trip here?',
        },
        {
            id: 'restaurant',
            title: 'Restaurant',
            icon: 'utensils',
            color: '#EF4444',
            desc: 'Dine out & order food',
            opener: "Good evening! Welcome to our restaurant. Would you like to see the menu, or do you already know what you'd like?",
        },
        {
            id: 'doctor',
            title: 'At the Doctor',
            icon: 'heart',
            color: '#EC4899',
            desc: 'Describe symptoms',
            opener: 'Hello, please come in and have a seat. What seems to be the problem today?',
        },
        {
            id: 'shopping',
            title: 'Shopping',
            icon: 'shoppingBag',
            color: '#8B5CF6',
            desc: 'Buy clothes & ask for help',
            opener: 'Hi, welcome to the store! Are you looking for anything in particular today?',
        },
    ];

    // ─── SCENARIO HINTS (shown after 30s silence) ───
    const scenarioHints = {
        free: [
            'I like...',
            'What do you think about...',
            'Tell me about your day',
            'Have you ever been to...',
            'What kind of music do you like?',
        ],
        coffee: [
            'Can I have a latte, please?',
            'How much is a cappuccino?',
            'Is there wifi here?',
            'Do you have oat milk?',
            "I'll have a medium, please",
        ],
        airport: [
            'Where is gate 12?',
            'I have a connecting flight',
            'Can I check this bag?',
            'When does boarding start?',
            'Is this flight on time?',
        ],
        interview: [
            'I worked at...',
            'My strengths are...',
            "I'm very passionate about...",
            'I have experience in...',
            "I'm looking for a role in...",
        ],
        roommate: [
            'I usually wake up at...',
            'Do you like cooking?',
            "What's your schedule like?",
            'I like to keep things clean',
            'Do you have any pets?',
        ],
        restaurant: [
            "I'd like the pasta, please",
            'What do you recommend?',
            'Can I have the check?',
            'Is this dish spicy?',
            'Do you have vegetarian options?',
        ],
        doctor: [
            "I've been feeling dizzy",
            'It started three days ago',
            "I'm allergic to penicillin",
            'I have a headache',
            'My throat is sore',
        ],
        shopping: [
            'Do you have this in blue?',
            'Can I try this on?',
            'How much is this?',
            'Where are the fitting rooms?',
            'Do you accept credit cards?',
        ],
    };

    // ─── REWARD THRESHOLDS ───
    const REWARD_MIN_TURNS = 3;
    const REWARD_MIN_DURATION = 60; // seconds

    // ─── STATE ───
    let currentSession = null;
    let recognition = null;
    let isListening = false;
    let conversationHistory = [];
    const onStateChange = null;

    // ─── STT: Speech-to-Text (Browser) ───
    function initSTT() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn('SpeechRecognition not supported');
            return false;
        }
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;
        return true;
    }

    function startListening(onResult, onEnd, onInterim) {
        if (!recognition && !initSTT()) return false;
        isListening = true;
        let finalTranscript = '';
        let bestConfidence = 0;

        recognition.onresult = event => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                const confidence = event.results[i][0].confidence || 0;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                    bestConfidence = Math.max(bestConfidence, confidence);
                } else {
                    interim += transcript;
                }
            }
            if (onInterim && interim) onInterim(interim);
            if (finalTranscript && onResult) onResult(finalTranscript);
        };

        recognition.onend = () => {
            isListening = false;
            // Track pronunciation confidence
            if (currentSession && finalTranscript && bestConfidence > 0) {
                currentSession.pronunciationScores.push({
                    text: finalTranscript,
                    confidence: bestConfidence,
                    time: Date.now(),
                });
            }
            if (onEnd) onEnd(finalTranscript, bestConfidence);
        };

        recognition.onerror = event => {
            isListening = false;
            console.warn('STT Error:', event.error);
            if (onEnd) onEnd('', 0);
        };

        try {
            recognition.start();
            return true;
        } catch (e) {
            console.warn('STT start failed:', e);
            return false;
        }
    }

    function stopListening() {
        if (recognition && isListening) {
            try {
                recognition.stop();
            } catch (e) {}
        }
        isListening = false;
    }

    // ─── TTS: Text-to-Speech (Browser) ───
    // Voice cache — avoid re-scanning every call
    const _voiceCache = {};

    function findVoiceForPersona(persona) {
        const cacheKey = persona.name;
        if (_voiceCache[cacheKey]) return _voiceCache[cacheKey];

        const voices = window.speechSynthesis.getVoices();
        if (!voices.length) return null;

        const prefs = persona.voicePrefs || [];
        const accentLang = persona.accent || 'en-US';
        const langPrefix = accentLang.substring(0, 2);

        const englishVoices = voices.filter(v => v.lang.startsWith(langPrefix));
        const allEnglish = voices.filter(v => v.lang.startsWith('en'));

        for (const pref of prefs) {
            const found = englishVoices.find(v => v.name.toLowerCase().includes(pref));
            if (found) {
                _voiceCache[cacheKey] = found;
                return found;
            }
        }
        for (const pref of prefs) {
            const found = allEnglish.find(v => v.name.toLowerCase().includes(pref));
            if (found) {
                _voiceCache[cacheKey] = found;
                return found;
            }
        }

        const isFemale = persona.voice === 'female';
        const genderVoices = allEnglish.filter(v => {
            const n = v.name.toLowerCase();
            if (isFemale)
                return (
                    n.includes('female') ||
                    n.includes('woman') ||
                    n.includes('zira') ||
                    n.includes('samantha') ||
                    n.includes('fiona') ||
                    n.includes('karen')
                );
            return !n.includes('female') && !n.includes('woman');
        });

        const mascotIndex = Object.keys(personas).findIndex(k => personas[k].name === persona.name);
        const pool = genderVoices.length > 0 ? genderVoices : allEnglish;
        const pick = pool[mascotIndex % pool.length] || voices[0];
        _voiceCache[cacheKey] = pick;
        return pick;
    }

    function speak(text, persona, onStart, onEnd) {
        if (!('speechSynthesis' in window)) {
            if (onEnd) onEnd();
            return;
        }

        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = persona.accent || 'en-US';
        utterance.pitch = persona.pitch || 1.0;
        utterance.rate = persona.rate || 0.9;

        const voice = findVoiceForPersona(persona);
        if (voice) {
            utterance.voice = voice;
            console.log(
                `[Talk] ${persona.name} → voice: ${voice.name} (${voice.lang}), pitch: ${utterance.pitch}, rate: ${utterance.rate}`
            );
        }

        utterance.onstart = () => {
            if (onStart) onStart();
        };
        utterance.onend = () => {
            if (onEnd) onEnd();
        };
        utterance.onerror = () => {
            if (onEnd) onEnd();
        };

        window.speechSynthesis.speak(utterance);
    }

    function stopSpeaking() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }

    // ─── LLM: Conversation AI ───
    async function getAIResponse(userMessage, mascotId, scenarioId) {
        const persona = personas[mascotId] || personas[0];
        const scenario = scenarios.find(s => s.id === scenarioId) || scenarios[0];
        const level = LangyState?.user?.level || 'B1 Intermediate';

        const systemPrompt = `${persona.systemPrompt}

CURRENT SCENARIO: ${scenario.title} — ${scenario.desc}
STUDENT LEVEL: ${level}
STUDENT NAME: ${LangyState?.user?.name || 'Student'}

CRITICAL RULES FOR CONVERSATION:
1. Respond as a REAL person in a REAL conversation. Be natural.
2. Keep responses SHORT — 1-3 sentences max. Real people don't give speeches.
3. Ask follow-up questions to keep the conversation going.
4. If the student makes grammar/vocabulary mistakes, naturally rephrase the correct version in your reply.
5. Do NOT use markdown, asterisks, or formatting. Just plain text like a real person would speak.
6. Match the student's energy — if they're brief, be brief. If they elaborate, elaborate.
7. If you hear something interesting, react to it! Show genuine interest.
8. Adapt your vocabulary to the student's level.`;

        const messages = [{ role: 'system', content: systemPrompt }];

        conversationHistory.slice(-20).forEach(msg => {
            messages.push({
                role: msg.role === 'mascot' ? 'assistant' : 'user',
                content: msg.text,
            });
        });

        messages.push({ role: 'user', content: userMessage });

        try {
            const response = await fetch(LangyAI.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: LangyAI.MODEL,
                    messages: messages,
                    max_tokens: 200,
                    temperature: 0.8,
                }),
            });

            if (!response.ok) throw new Error('AI unavailable');

            const data = await response.json();
            return data.choices?.[0]?.message?.content || "Sorry, I didn't catch that. Could you say it again?";
        } catch (err) {
            console.error('Talk AI error:', err);
            const fallbacks = [
                "That's interesting! Tell me more about that.",
                'Oh really? And what happened next?',
                'I see! What do you think about that?',
                "That's a great point. Can you give me an example?",
                "Hmm, that's cool! What else can you tell me?",
            ];
            return fallbacks[Math.floor(Math.random() * fallbacks.length)];
        }
    }

    // ─── AI FEEDBACK (post-conversation) ───
    async function getAIFeedback() {
        if (!currentSession || currentSession.turns < REWARD_MIN_TURNS) return null;

        const userPhrases = currentSession.userMessages.join('\n');
        const avgConf =
            currentSession.pronunciationScores.length > 0
                ? currentSession.pronunciationScores.reduce((a, b) => a + b.confidence, 0) /
                  currentSession.pronunciationScores.length
                : null;

        const prompt = `You are an English teacher reviewing a student's conversation practice.
The student is at ${LangyState?.user?.level || 'B1'} level.
Here are the phrases the student said during the conversation:

${userPhrases}

${avgConf !== null ? `Their average pronunciation confidence score was ${(avgConf * 100).toFixed(0)}%.` : ''}

Give a SHORT feedback (2-3 sentences max):
1. One thing they did well
2. One specific thing to improve
3. One actionable tip

Be encouraging but specific. No markdown or formatting.`;

        try {
            const response = await fetch(LangyAI.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: LangyAI.MODEL,
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 150,
                    temperature: 0.7,
                }),
            });
            if (!response.ok) return null;
            const data = await response.json();
            return data.choices?.[0]?.message?.content || null;
        } catch (e) {
            return null;
        }
    }

    // ─── SESSION MANAGEMENT ───
    function startSession(mascotId, scenarioId) {
        const persona = personas[mascotId] || personas[0];
        const scenario = scenarios.find(s => s.id === scenarioId) || scenarios[0];

        conversationHistory = [];
        currentSession = {
            mascotId,
            scenarioId,
            persona,
            scenario,
            startTime: Date.now(),
            turns: 0,
            corrections: [],
            newWords: [],
            userMessages: [],
            pronunciationScores: [], // { text, confidence, time }
        };

        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
        }

        return currentSession;
    }

    function endSession() {
        stopListening();
        stopSpeaking();

        if (!currentSession) return null;

        const duration = Math.round((Date.now() - currentSession.startTime) / 1000);
        const qualified = currentSession.turns >= REWARD_MIN_TURNS && duration >= REWARD_MIN_DURATION;

        const summary = {
            duration,
            turns: currentSession.turns,
            corrections: currentSession.corrections,
            newWords: currentSession.newWords,
            mascot: currentSession.persona.name,
            scenario: currentSession.scenario.title,
            userMessages: currentSession.userMessages,
            qualifiedForRewards: qualified,
            pronunciationScores: currentSession.pronunciationScores,
        };

        // Pronunciation average
        if (currentSession.pronunciationScores.length > 0) {
            const avg =
                currentSession.pronunciationScores.reduce((a, b) => a + b.confidence, 0) /
                currentSession.pronunciationScores.length;
            summary.avgPronunciation = avg;
            summary.pronunciationLevel =
                avg >= 0.85 ? 'excellent' : avg >= 0.65 ? 'good' : avg >= 0.45 ? 'fair' : 'needs_work';
        }

        // Award XP and currency ONLY if qualified
        if (qualified && typeof LangyState !== 'undefined') {
            const durationBonus = Math.floor(duration / 30) * 5; // 5 XP per 30 secs
            const xpEarned = Math.min(150, currentSession.turns * 12 + durationBonus);
            const dangyEarned = Math.min(75, currentSession.turns * 6);
            LangyState.user.xp += xpEarned;
            LangyState.currencies.dangy += dangyEarned;
            LangyState.progress.skills.speaking = Math.min(
                100,
                (LangyState.progress.skills.speaking || 0) + Math.floor(currentSession.turns / 2)
            );
            LangyState.progress.skills.listening = Math.min(
                100,
                (LangyState.progress.skills.listening || 0) + Math.floor(currentSession.turns / 3)
            );
            summary.xpEarned = xpEarned;
            summary.dangyEarned = dangyEarned;

            // Save to talk history
            if (!LangyState.talkHistory) LangyState.talkHistory = [];
            LangyState.talkHistory.unshift({
                date: new Date().toISOString(),
                mascot: summary.mascot,
                scenario: summary.scenario,
                duration,
                turns: summary.turns,
                xp: xpEarned,
                pronunciation: summary.avgPronunciation || null,
            });
            // Keep last 20
            if (LangyState.talkHistory.length > 20) LangyState.talkHistory = LangyState.talkHistory.slice(0, 20);

            if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
        } else {
            summary.xpEarned = 0;
            summary.dangyEarned = 0;
            summary.reason = `Talk for at least ${REWARD_MIN_DURATION}s with ${REWARD_MIN_TURNS}+ exchanges`;
        }

        currentSession = null;
        conversationHistory = [];
        return summary;
    }

    function addToHistory(role, text) {
        conversationHistory.push({ role, text, time: Date.now() });
        if (currentSession) {
            if (role === 'user') {
                currentSession.turns++;
                currentSession.userMessages.push(text);
            }
        }
    }

    // ─── HINTS ───
    function getHints(scenarioId) {
        return scenarioHints[scenarioId] || scenarioHints.free;
    }

    function getRandomHint(scenarioId) {
        const hints = getHints(scenarioId);
        return hints[Math.floor(Math.random() * hints.length)];
    }

    // ─── PUBLIC API ───
    return {
        config,
        personas,
        scenarios,
        scenarioHints,
        REWARD_MIN_TURNS,
        REWARD_MIN_DURATION,
        initSTT,
        startListening,
        stopListening,
        speak,
        stopSpeaking,
        getAIResponse,
        getAIFeedback,
        startSession,
        endSession,
        addToHistory,
        getHints,
        getRandomHint,
        get isListening() {
            return isListening;
        },
        get session() {
            return currentSession;
        },
        get history() {
            return conversationHistory;
        },
    };
})();

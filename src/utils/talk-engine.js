/* ============================================
   LANGY TALK ENGINE — Modular Voice System
   STT / TTS / LLM with swappable providers
   ============================================ */

const TalkEngine = (function() {

    // ─── PROVIDER CONFIG ───
    const config = {
        llm: 'openrouter',    // 'openrouter' | 'openai' (future)
        tts: 'browser',       // 'browser' | 'openai-tts' (future)
        stt: 'browser',       // 'browser' | 'whisper' (future)
    };

    // ─── MASCOT PERSONAS ───
    const personas = {
        0: {
            name: 'Luna',
            voice: 'female',
            pitch: 1.1,
            rate: 0.95,
            accent: 'en-US',
            style: 'cheerful',
            systemPrompt: `You are Luna — a cheerful, warm, and encouraging English conversation partner.
You are the student's best friend who happens to be a native English speaker.
PERSONALITY: Bubbly, enthusiastic, always positive. You celebrate every correct phrase.
You love pop culture, travel, and food. You're from California.
SPEAKING STYLE: Casual, friendly, uses expressions like "Oh that's so cool!", "I love that!", "You're doing great!"
You speak naturally like a friend, NOT like a teacher. No grammar lectures — just natural conversation.
If the student makes a mistake, gently rephrase it correctly in your response without explicitly correcting them.`
        },
        1: {
            name: 'Rex',
            voice: 'male',
            pitch: 0.9,
            rate: 0.9,
            accent: 'en-GB',
            style: 'structured',
            systemPrompt: `You are Rex — a smart, structured, and patient English conversation partner.
You are a British professor who loves precision in language.
PERSONALITY: Calm, intellectual, methodical. You appreciate proper grammar.
You love science, history, and chess. You're from Oxford, England.
SPEAKING STYLE: Clear, measured British English. Uses phrases like "Quite so", "Indeed", "Splendid".
You gently correct mistakes with "Actually, a more natural way to say that would be..."
You naturally use idioms and explain them when relevant.`
        },
        2: {
            name: 'Pixel',
            voice: 'female',
            pitch: 1.2,
            rate: 1.05,
            accent: 'en-US',
            style: 'creative',
            systemPrompt: `You are Pixel — a creative, playful, and spontaneous English conversation partner.
You are a young artist and gamer who makes learning fun.
PERSONALITY: Energetic, creative, surprising. You use humor and unexpected topics.
You love video games, art, music, and memes. You're from Portland, Oregon.
SPEAKING STYLE: Young, trendy, uses modern slang naturally (but explains it).
"No way!", "That's fire!", "Wait, seriously?". You make conversations feel like hanging out.
If mistakes happen, you playfully help: "Oh you mean like [correct version]? Yeah totally!"
You sometimes suggest fun word games or challenges mid-conversation.`
        },
        3: {
            name: 'Omar',
            voice: 'male',
            pitch: 1.0,
            rate: 0.85,
            accent: 'en-US',
            style: 'supportive',
            systemPrompt: `You are Omar — a wise, multilingual, and supportive English conversation partner.
You are a well-traveled polyglot who understands the challenges of learning a new language.
PERSONALITY: Patient, understanding, encouraging. You've been through language learning yourself.
You love travel, philosophy, and cooking. You're from Toronto, Canada.
SPEAKING STYLE: Clear, slow, articulate. You adapt to the student's level automatically.
For beginners, you use simpler words and shorter sentences.
You share cultural context: "In Canada, we'd usually say..."
If the student struggles, you're gentle: "Take your time, that's a tricky one."
You occasionally share useful phrases and explain when/why to use them.`
        }
    };

    // ─── SCENARIOS ───
    const scenarios = [
        { id: 'free', title: 'Free Talk', icon: '💬', desc: 'Chat about anything!', opener: 'Hey! What\'s on your mind today? Let\'s just talk about whatever you want.' },
        { id: 'coffee', title: 'Coffee Shop', icon: '☕', desc: 'Order at a café', opener: 'Hi there! Welcome to the café. What can I get for you today?' },
        { id: 'airport', title: 'At the Airport', icon: '✈️', desc: 'Check-in & navigate', opener: 'Good morning! Welcome to the check-in counter. Can I see your passport and booking confirmation, please?' },
        { id: 'interview', title: 'Job Interview', icon: '💼', desc: 'Practice interview skills', opener: 'Hello, please have a seat. Thank you for coming in today. So, tell me a little about yourself.' },
        { id: 'roommate', title: 'New Roommate', icon: '🏠', desc: 'Meet your roommate', opener: 'Hey! You must be my new roommate! Nice to meet you. How was your trip here?' },
        { id: 'restaurant', title: 'Restaurant', icon: '🍽️', desc: 'Dine out & order food', opener: 'Good evening! Welcome to our restaurant. Would you like to see the menu, or do you already know what you\'d like?' },
        { id: 'doctor', title: 'At the Doctor', icon: '🏥', desc: 'Describe symptoms', opener: 'Hello, please come in and have a seat. What seems to be the problem today?' },
        { id: 'shopping', title: 'Shopping', icon: '🛍️', desc: 'Buy clothes & ask for help', opener: 'Hi, welcome to the store! Are you looking for anything in particular today?' },
    ];

    // ─── STATE ───
    let currentSession = null;
    let recognition = null;
    let isListening = false;
    let conversationHistory = [];
    let onStateChange = null;

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

        recognition.onresult = (event) => {
            let interim = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interim += transcript;
                }
            }
            if (onInterim && interim) onInterim(interim);
            if (finalTranscript && onResult) onResult(finalTranscript);
        };

        recognition.onend = () => {
            isListening = false;
            if (onEnd) onEnd(finalTranscript);
        };

        recognition.onerror = (event) => {
            isListening = false;
            console.warn('STT Error:', event.error);
            if (onEnd) onEnd('');
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
            try { recognition.stop(); } catch(e) {}
        }
        isListening = false;
    }

    // ─── TTS: Text-to-Speech (Browser) ───
    function speak(text, persona, onStart, onEnd) {
        if (!('speechSynthesis' in window)) {
            if (onEnd) onEnd();
            return;
        }

        // Cancel any current speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = persona.accent || 'en-US';
        utterance.pitch = persona.pitch || 1.0;
        utterance.rate = persona.rate || 0.9;

        // Try to find the best voice
        const voices = window.speechSynthesis.getVoices();
        const preferFemale = persona.voice === 'female';
        
        // Priority: find a voice matching accent
        let bestVoice = null;
        for (const v of voices) {
            if (v.lang.startsWith(persona.accent?.substring(0, 2) || 'en')) {
                if (preferFemale && v.name.toLowerCase().includes('female')) { bestVoice = v; break; }
                if (!preferFemale && v.name.toLowerCase().includes('male')) { bestVoice = v; break; }
                if (!bestVoice) bestVoice = v;
            }
        }
        // Fallback: any English voice
        if (!bestVoice) {
            bestVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
        }
        if (bestVoice) utterance.voice = bestVoice;

        utterance.onstart = () => { if (onStart) onStart(); };
        utterance.onend = () => { if (onEnd) onEnd(); };
        utterance.onerror = () => { if (onEnd) onEnd(); };

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

        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        // Add conversation history (last 20 messages)
        conversationHistory.slice(-20).forEach(msg => {
            messages.push({
                role: msg.role === 'mascot' ? 'assistant' : 'user',
                content: msg.text
            });
        });

        // Add current message
        messages.push({ role: 'user', content: userMessage });

        try {
            const response = await fetch(LangyAI.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: LangyAI.MODEL,
                    messages: messages,
                    max_tokens: 200,
                    temperature: 0.8
                })
            });

            if (!response.ok) throw new Error('AI unavailable');

            const data = await response.json();
            return data.choices?.[0]?.message?.content || "Sorry, I didn't catch that. Could you say it again?";
        } catch (err) {
            console.error('Talk AI error:', err);
            // Fallback responses
            const fallbacks = [
                "That's interesting! Tell me more about that.",
                "Oh really? And what happened next?",
                "I see! What do you think about that?",
                "That's a great point. Can you give me an example?",
                "Hmm, that's cool! What else can you tell me?"
            ];
            return fallbacks[Math.floor(Math.random() * fallbacks.length)];
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
            userMessages: []
        };

        // Preload voices
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
        const summary = {
            duration,
            turns: currentSession.turns,
            corrections: currentSession.corrections,
            newWords: currentSession.newWords,
            mascot: currentSession.persona.name,
            scenario: currentSession.scenario.title,
            userMessages: currentSession.userMessages
        };

        // Award XP and currency
        if (typeof LangyState !== 'undefined') {
            const xpEarned = Math.min(100, currentSession.turns * 10);
            const dangyEarned = Math.min(50, currentSession.turns * 5);
            LangyState.user.xp += xpEarned;
            LangyState.currencies.dangy += dangyEarned;
            LangyState.progress.skills.speaking = Math.min(100, (LangyState.progress.skills.speaking || 0) + Math.floor(currentSession.turns / 2));
            LangyState.progress.skills.listening = Math.min(100, (LangyState.progress.skills.listening || 0) + Math.floor(currentSession.turns / 3));
            summary.xpEarned = xpEarned;
            summary.dangyEarned = dangyEarned;
            if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
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

    // ─── PUBLIC API ───
    return {
        config,
        personas,
        scenarios,
        initSTT,
        startListening,
        stopListening,
        speak,
        stopSpeaking,
        getAIResponse,
        startSession,
        endSession,
        addToHistory,
        get isListening() { return isListening; },
        get session() { return currentSession; },
        get history() { return conversationHistory; }
    };
})();

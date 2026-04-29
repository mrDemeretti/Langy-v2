/* ============================================
   LANGY VOICE — Unified voice layer
   Centralises TTS across all screens with:
   - persona-aware quality voice matching
   - speed control (normal / slow)
   - speak-after-mistake corrections
   - queue support (avoid overlapping speech)
   ============================================ */

const LangyVoice = (() => {
    'use strict';

    // ─── Voice Cache ───
    const _cache = {};
    let _voicesLoaded = false;

    // Preload voices on first interaction
    function _ensureVoices() {
        if (_voicesLoaded) return;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
            _voicesLoaded = true;
        }
    }

    // ─── Find best voice for target language ───
    function _findVoice(prefs, accent) {
        const key = (prefs || []).join(',') + accent;
        if (_cache[key]) return _cache[key];

        const voices = window.speechSynthesis?.getVoices() || [];
        if (!voices.length) return null;

        const defaultLang = typeof LangyTarget !== 'undefined' ? LangyTarget.ttsLang : 'en-US';
        const langPrefix = (accent || defaultLang).substring(0, 2);
        const langMatches = voices.filter(v => v.lang.startsWith(langPrefix));
        const allFallback = voices.filter(v => v.lang.startsWith('en'));

        // Try preference list first
        for (const pref of (prefs || [])) {
            const found = langMatches.find(v => v.name.toLowerCase().includes(pref)) ||
                          allFallback.find(v => v.name.toLowerCase().includes(pref));
            if (found) { _cache[key] = found; return found; }
        }

        // Fallback to any matching voice
        const pick = langMatches[0] || allFallback[0] || voices[0];
        _cache[key] = pick;
        return pick;
    }

    // ─── Default teacher voice (used outside Talk) ───
    const TEACHER = {
        name: 'Teacher',
        accent: typeof LangyTarget !== 'undefined' ? LangyTarget.ttsLang : 'en-US',
        pitch: 1.05,
        rate: 0.92,
        voicePrefs: ['samantha', 'google us english female', 'microsoft zira', 'female', 'fiona', 'karen'],
    };

    const TEACHER_SLOW = { ...TEACHER, rate: 0.65 };

    // ─── Core speak function ───
    let _queue = [];
    let _speaking = false;

    function speak(text, opts = {}) {
        if (!('speechSynthesis' in window) || !text) {
            if (opts.onEnd) opts.onEnd();
            return;
        }
        _ensureVoices();

        _queue.push({ text, opts });
        if (!_speaking) _processQueue();
    }

    function _processQueue() {
        if (_queue.length === 0) { _speaking = false; return; }
        _speaking = true;
        const { text, opts } = _queue.shift();

        window.speechSynthesis.cancel();

        const persona = opts.persona || TEACHER;
        const u = new SpeechSynthesisUtterance(text);
        const defaultAccent = typeof LangyTarget !== 'undefined' ? LangyTarget.ttsLang : 'en-US';
        u.lang = persona.accent || defaultAccent;
        u.pitch = persona.pitch || 1.05;
        u.rate = opts.slow ? (persona.rate || 0.92) * 0.65 : (persona.rate || 0.92);

        const voice = _findVoice(persona.voicePrefs, persona.accent);
        if (voice) u.voice = voice;

        u.onstart = () => { if (opts.onStart) opts.onStart(); };
        u.onend = () => {
            if (opts.onEnd) opts.onEnd();
            _processQueue();
        };
        u.onerror = () => {
            if (opts.onEnd) opts.onEnd();
            _processQueue();
        };

        window.speechSynthesis.speak(u);
    }

    // ─── Convenience methods ───

    // Normal speed teacher voice
    function sayTeacher(text, onEnd) {
        speak(text, { persona: TEACHER, onEnd });
    }

    // Slow speed teacher voice
    function saySlow(text, onEnd) {
        speak(text, { persona: TEACHER, slow: true, onEnd });
    }

    // Speak with a specific mascot persona (reuses TalkEngine personas if available)
    function sayAs(mascotId, text, onEnd) {
        const persona = (typeof TalkEngine !== 'undefined' && TalkEngine.personas)
            ? (TalkEngine.personas[mascotId] || TEACHER)
            : TEACHER;
        speak(text, { persona, onEnd });
    }

    // Correction voice: speaks the correct answer after a brief pause
    function speakCorrection(correctText, delay) {
        setTimeout(() => {
            speak(correctText, { persona: TEACHER, slow: true });
        }, delay || 600);
    }

    // Stop all speech
    function stop() {
        _queue = [];
        _speaking = false;
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }

    // ─── Init: preload voices on page load ───
    if (typeof window !== 'undefined') {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => { _voicesLoaded = true; };
        }
    }

    return {
        speak,
        sayTeacher,
        saySlow,
        sayAs,
        speakCorrection,
        stop,
        TEACHER,
        TEACHER_SLOW,
    };
})();

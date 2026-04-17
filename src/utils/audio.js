/* ============================================
   LANGY — AUDIO SYNTHESIZER
   Full sound effects suite using Web Audio API
   ============================================ */

const AudioUtils = (function() {
    let ctx = null;

    function initCtx() {
        if (!ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            ctx = new AudioContext();
        }
        if (ctx.state === 'suspended') {
            ctx.resume();
        }
    }

    function isEnabled() {
        return typeof LangyState !== 'undefined' && LangyState.settings.sound;
    }

    return {
        // Generic pop (button taps, navigation)
        playPop() {
            if (!isEnabled()) return;
            initCtx();
            if (!ctx) return;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            const now = ctx.currentTime;
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        },

        // ✅ Correct answer — ascending two-note chime
        playCorrect() {
            if (!isEnabled()) return;
            initCtx();
            if (!ctx) return;

            const now = ctx.currentTime;
            [523, 659].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                const t = now + i * 0.12;
                osc.frequency.setValueAtTime(freq, t);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                osc.start(t);
                osc.stop(t + 0.3);
            });
        },

        // ❌ Wrong answer — descending buzz
        playWrong() {
            if (!isEnabled()) return;
            initCtx();
            if (!ctx) return;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'square';
            const now = ctx.currentTime;
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.15, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
            osc.start(now);
            osc.stop(now + 0.25);
        },

        // 🎉 Level up / lesson complete — triumphant ascending arpeggio
        playLevelUp() {
            if (!isEnabled()) return;
            initCtx();
            if (!ctx) return;

            const now = ctx.currentTime;
            const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                const t = now + i * 0.1;
                osc.frequency.setValueAtTime(freq, t);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
                osc.start(t);
                osc.stop(t + 0.5);
            });
        },

        // 🔥 Streak — bright success chime
        playStreak() {
            if (!isEnabled()) return;
            initCtx();
            if (!ctx) return;

            const now = ctx.currentTime;
            [784, 988, 1175].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'triangle';
                const t = now + i * 0.08;
                osc.frequency.setValueAtTime(freq, t);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.2, t + 0.015);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                osc.start(t);
                osc.stop(t + 0.4);
            });
        },

        // 🛒 Purchase success — coin drop sound
        playCoin() {
            if (!isEnabled()) return;
            initCtx();
            if (!ctx) return;

            const now = ctx.currentTime;
            [1200, 1600, 2000].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = 'sine';
                const t = now + i * 0.06;
                osc.frequency.setValueAtTime(freq, t);
                osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + 0.1);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.15, t + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
                osc.start(t);
                osc.stop(t + 0.15);
            });
        },

        // 🏆 Victory / duel win — fanfare
        playVictory() {
            if (!isEnabled()) return;
            initCtx();
            if (!ctx) return;

            const now = ctx.currentTime;
            const notes = [392, 523, 659, 784, 1047]; // G4, C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = i < 3 ? 'triangle' : 'sine';
                const t = now + i * 0.12;
                osc.frequency.setValueAtTime(freq, t);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, t + (i === notes.length - 1 ? 0.8 : 0.4));
                osc.start(t);
                osc.stop(t + 0.8);
            });
        }
    };
})();

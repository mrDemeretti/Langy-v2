/* ============================================
   LANGY — AUDIO SYNTHESIZER
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

    return {
        playPop() {
            if (typeof LangyState !== 'undefined' && !LangyState.settings.sound) return;

            initCtx();
            if (!ctx) return;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            
            const now = ctx.currentTime;
            
            // Frequency sweep for a nice "pop" or woodblock sound
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
            
            // Envelope shaping
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

            osc.start(now);
            osc.stop(now + 0.1);
        }
    };
})();

/* ============================================
   LANGY — RUNTIME METRICS (lightweight)
   Tracks TTI/FCP/LCP + JS error rate.
   ============================================ */

const LangyMetrics = {
    _startedAt: 0,
    _sessionId: null,
    _errors: 0,
    _sample: {
        fcp: null,
        lcp: null,
        tti: null,
        errorRate: 0,
        ts: 0,
    },

    init() {
        if (this._startedAt) return;
        this._startedAt = performance.now();
        this._sessionId = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
        this._sample.ts = Date.now();

        // JS error-rate signal
        window.addEventListener('error', () => {
            this._errors += 1;
            this._sample.errorRate = this._errors;
            this._persist();
        });
        window.addEventListener('unhandledrejection', () => {
            this._errors += 1;
            this._sample.errorRate = this._errors;
            this._persist();
        });

        // Approximate TTI as post-load idle period
        window.addEventListener('load', () => {
            setTimeout(() => {
                this._sample.tti = Math.round(performance.now());
                this._persist();
            }, 0);
        });

        if ('PerformanceObserver' in window) {
            try {
                const poPaint = new PerformanceObserver(list => {
                    for (const entry of list.getEntries()) {
                        if (entry.name === 'first-contentful-paint') {
                            this._sample.fcp = Math.round(entry.startTime);
                            this._persist();
                        }
                    }
                });
                poPaint.observe({ type: 'paint', buffered: true });
            } catch (e) {
                /* optional metric */
            }

            try {
                let lastLcp = null;
                const poLcp = new PerformanceObserver(list => {
                    const entries = list.getEntries();
                    lastLcp = entries[entries.length - 1] || lastLcp;
                    if (lastLcp) {
                        this._sample.lcp = Math.round(lastLcp.startTime);
                        this._persist();
                    }
                });
                poLcp.observe({ type: 'largest-contentful-paint', buffered: true });
            } catch (e) {
                /* optional metric */
            }
        }
    },

    _persist() {
        try {
            const payload = { ...this._sample, sessionId: this._sessionId };
            localStorage.setItem('langy_metrics_latest', JSON.stringify(payload));
        } catch (e) {
            /* storage may be unavailable */
        }
    },

    getLatest() {
        return { ...this._sample, sessionId: this._sessionId };
    },
};

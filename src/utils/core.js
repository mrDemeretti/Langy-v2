/* ============================================
   LANGY — CORE UTILITIES
   Error handling, sanitization, ScreenState,
   and shared helper functions.
   ============================================ */

// ═══════════════════════════════════════════
// ERROR HANDLER — Global error boundary
// ═══════════════════════════════════════════

/**
 * @namespace LangyLogger
 * @description Centralized error logging and reporting.
 * Captures both handled and unhandled errors.
 */
const LangyLogger = {
    /** @type {Array<{timestamp: number, level: string, message: string, stack?: string}>} */
    _log: [],
    _MAX_LOG: 100,

    /**
     * Log an informational message.
     * @param {string} context - Module or function name (e.g. 'Router.navigate')
     * @param {string} message - Description of what happened
     */
    info(context, message) {
        this._push('info', context, message);
    },

    /**
     * Log a warning (non-fatal issue).
     * @param {string} context
     * @param {string} message
     */
    warn(context, message) {
        console.warn(`[Langy:${context}]`, message);
        this._push('warn', context, message);
    },

    /**
     * Log an error with optional Error object.
     * @param {string} context
     * @param {string} message
     * @param {Error} [error]
     */
    error(context, message, error) {
        console.error(`[Langy:${context}]`, message, error || '');
        this._push('error', context, message, error?.stack);
    },

    /** @private */
    _push(level, context, message, stack) {
        this._log.push({
            timestamp: Date.now(),
            level,
            context,
            message,
            stack: stack || null,
        });
        // Keep log bounded
        if (this._log.length > this._MAX_LOG) {
            this._log = this._log.slice(-this._MAX_LOG);
        }
    },

    /**
     * Get recent log entries for debugging.
     * @param {number} [count=20]
     * @returns {Array}
     */
    getRecent(count = 20) {
        return this._log.slice(-count);
    },
};

// ── Global error handler ──
window.onerror = function (message, source, lineno, colno, error) {
    LangyLogger.error('Global', `${message} at ${source}:${lineno}:${colno}`, error);
    return false; // Don't suppress default browser logging
};

window.addEventListener('unhandledrejection', event => {
    LangyLogger.error('Promise', 'Unhandled rejection', event.reason);
});

// ═══════════════════════════════════════════
// HTML SANITIZER — XSS Protection
// ═══════════════════════════════════════════

/**
 * Escapes HTML special characters to prevent XSS when inserting
 * user-provided strings into innerHTML.
 *
 * @param {string} str - Raw string (potentially containing HTML)
 * @returns {string} Escaped string safe for innerHTML
 *
 * @example
 * container.innerHTML = `<p>${escapeHTML(userInput)}</p>`;
 */
function escapeHTML(str) {
    if (typeof str !== 'string') return String(str ?? '');
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Sanitize a full HTML string by stripping dangerous tags/attributes
 * while preserving safe formatting (b, i, em, strong, span, br, p, div).
 *
 * @param {string} html - HTML string to sanitize
 * @returns {string} Sanitized HTML
 */
function sanitizeHTML(html) {
    if (typeof html !== 'string') return '';
    // Remove script tags and event handlers
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/\bon\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/\bon\w+\s*=\s*[^\s>]*/gi, '')
        .replace(/javascript\s*:/gi, '')
        .replace(/data\s*:/gi, 'blocked:');
}

// ═══════════════════════════════════════════
// SCREEN STATE — Replaces window._ globals
// ═══════════════════════════════════════════

/**
 * @namespace ScreenState
 * @description Per-screen ephemeral state that is automatically
 * cleaned up when the user navigates away. Replaces window._ globals.
 *
 * @example
 * // Setting state in a screen renderer
 * ScreenState.set('talkMascot', mascotId);
 *
 * // Reading state
 * const mascot = ScreenState.get('talkMascot');
 *
 * // Cleaning up (called by Router on navigation)
 * ScreenState.clear();
 */
const ScreenState = {
    /** @type {Object<string, any>} */
    _data: {},

    /** @type {Array<Function>} */
    _cleanupCallbacks: [],

    /**
     * Get a screen-scoped value.
     * @param {string} key
     * @param {*} [defaultValue]
     * @returns {*}
     */
    get(key, defaultValue = undefined) {
        return key in this._data ? this._data[key] : defaultValue;
    },

    /**
     * Set a screen-scoped value.
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
        this._data[key] = value;
    },

    /**
     * Check if a key exists.
     * @param {string} key
     * @returns {boolean}
     */
    has(key) {
        return key in this._data;
    },

    /**
     * Remove a specific key.
     * @param {string} key
     */
    remove(key) {
        delete this._data[key];
    },

    /**
     * Register a cleanup callback to run on screen exit.
     * Use this for removing event listeners, stopping intervals, etc.
     * @param {Function} fn
     */
    onCleanup(fn) {
        if (typeof fn === 'function') {
            this._cleanupCallbacks.push(fn);
        }
    },

    /**
     * Clear all screen state and run cleanup callbacks.
     * Called automatically by Router.navigate().
     */
    clear() {
        // Run cleanup callbacks
        this._cleanupCallbacks.forEach(fn => {
            try {
                fn();
            } catch (e) {
                LangyLogger.error('ScreenState.clear', 'Cleanup callback failed', e);
            }
        });
        this._cleanupCallbacks = [];
        this._data = {};
    },

    /**
     * Get all current state (for debugging).
     * @returns {Object}
     */
    debug() {
        return { ...this._data, _cleanupCount: this._cleanupCallbacks.length };
    },
};

// ═══════════════════════════════════════════
// SHARED HELPERS — DRY utilities
// ═══════════════════════════════════════════

/**
 * Get today's date as a local YYYY-MM-DD string.
 * Single source of truth — use instead of manual date formatting.
 *
 * @param {Date} [date] - Optional date, defaults to now
 * @returns {string} e.g. "2026-04-22"
 */
function getLocalDateString(date) {
    const d = date || new Date();
    return (
        d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0')
    );
}

/**
 * Calculate the difference in days between two YYYY-MM-DD date strings.
 * Uses local dates to avoid timezone bugs.
 *
 * @param {string} dateStr1 - Earlier date string
 * @param {string} dateStr2 - Later date string
 * @returns {number} Number of days difference (positive if dateStr2 > dateStr1)
 */
function dateDiffDays(dateStr1, dateStr2) {
    const p1 = dateStr1.split('-').map(Number);
    const p2 = dateStr2.split('-').map(Number);
    const d1 = new Date(p1[0], p1[1] - 1, p1[2]);
    const d2 = new Date(p2[0], p2[1] - 1, p2[2]);
    return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Debounce a function call.
 * @param {Function} fn - Function to debounce
 * @param {number} [delay=300] - Delay in ms
 * @returns {Function} Debounced function
 */
function debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Clamp a number between min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Generate a short random ID (for DOM element IDs, etc.)
 * @param {number} [length=8]
 * @returns {string}
 */
function randomId(length = 8) {
    return Math.random()
        .toString(36)
        .substring(2, 2 + length);
}

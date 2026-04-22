import { describe, it, expect, beforeEach } from 'vitest';

// ═══════════════════════════════════════════
// CONFIG TESTS
// ═══════════════════════════════════════════

describe('LangyConfig', () => {
    it('should be frozen (immutable)', () => {
        expect(Object.isFrozen(LangyConfig)).toBe(true);
    });

    it('should have all required keys', () => {
        const requiredKeys = [
            'APP_NAME', 'XP_PER_LEVEL', 'STREAK_FREEZE_PRICE',
            'STREAK_MAX_FREEZES', 'EXERCISES_PER_LESSON',
            'PASS_THRESHOLD', 'CEFR_LEVELS', 'NAV_ROUTES',
        ];
        requiredKeys.forEach(key => {
            expect(LangyConfig).toHaveProperty(key);
        });
    });

    it('XP_PER_LEVEL should be a positive number', () => {
        expect(LangyConfig.XP_PER_LEVEL).toBeGreaterThan(0);
        expect(typeof LangyConfig.XP_PER_LEVEL).toBe('number');
    });

    it('CEFR_LEVELS should contain standard levels', () => {
        expect(LangyConfig.CEFR_GRADED).toContain('A1');
        expect(LangyConfig.CEFR_GRADED).toContain('C2');
        expect(LangyConfig.CEFR_GRADED.length).toBe(6);
    });

    it('should not allow mutation', () => {
        expect(() => {
            LangyConfig.XP_PER_LEVEL = 999;
        }).toThrow();
    });
});


// ═══════════════════════════════════════════
// CORE UTILITY TESTS
// ═══════════════════════════════════════════

describe('escapeHTML', () => {
    it('should escape < and >', () => {
        expect(escapeHTML('<script>alert("xss")</script>')).toBe(
            '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
        );
    });

    it('should escape ampersands', () => {
        expect(escapeHTML('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('should handle non-string input', () => {
        expect(escapeHTML(42)).toBe('42');
        expect(escapeHTML(null)).toBe('');
        expect(escapeHTML(undefined)).toBe('');
    });

    it('should return empty string for empty input', () => {
        expect(escapeHTML('')).toBe('');
    });
});

describe('sanitizeHTML', () => {
    it('should remove script tags', () => {
        const input = '<p>Hello</p><script>alert("xss")</script>';
        expect(sanitizeHTML(input)).not.toContain('<script');
    });

    it('should remove event handlers', () => {
        const input = '<div onclick="alert(1)">Click</div>';
        const result = sanitizeHTML(input);
        expect(result).not.toContain('onclick');
    });

    it('should block javascript: URIs', () => {
        const input = '<a href="javascript:alert(1)">Link</a>';
        const result = sanitizeHTML(input);
        expect(result).not.toContain('javascript:');
    });
});

describe('ScreenState', () => {
    beforeEach(() => {
        ScreenState.clear();
    });

    it('should set and get values', () => {
        ScreenState.set('key1', 'value1');
        expect(ScreenState.get('key1')).toBe('value1');
    });

    it('should return default for missing keys', () => {
        expect(ScreenState.get('missing', 'fallback')).toBe('fallback');
    });

    it('should clear all data', () => {
        ScreenState.set('a', 1);
        ScreenState.set('b', 2);
        ScreenState.clear();
        expect(ScreenState.get('a')).toBeUndefined();
    });

    it('should run cleanup callbacks on clear', () => {
        let cleaned = false;
        ScreenState.onCleanup(() => { cleaned = true; });
        ScreenState.clear();
        expect(cleaned).toBe(true);
    });

    it('should not crash on failing cleanup callback', () => {
        ScreenState.onCleanup(() => { throw new Error('oops'); });
        expect(() => ScreenState.clear()).not.toThrow();
    });
});

describe('getLocalDateString', () => {
    it('should return YYYY-MM-DD format', () => {
        const result = getLocalDateString(new Date(2026, 3, 22)); // April 22, 2026
        expect(result).toBe('2026-04-22');
    });

    it('should pad single-digit months and days', () => {
        const result = getLocalDateString(new Date(2026, 0, 5)); // Jan 5
        expect(result).toBe('2026-01-05');
    });

    it('should default to today when no arg', () => {
        const result = getLocalDateString();
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
});

describe('dateDiffDays', () => {
    it('should calculate 0 for same date', () => {
        expect(dateDiffDays('2026-04-22', '2026-04-22')).toBe(0);
    });

    it('should calculate positive diff', () => {
        expect(dateDiffDays('2026-04-20', '2026-04-22')).toBe(2);
    });

    it('should handle month boundaries', () => {
        expect(dateDiffDays('2026-03-31', '2026-04-01')).toBe(1);
    });
});

describe('debounce', () => {
    it('should delay execution', async () => {
        let count = 0;
        const fn = debounce(() => count++, 50);
        fn(); fn(); fn();
        expect(count).toBe(0);
        await new Promise(r => setTimeout(r, 100));
        expect(count).toBe(1);
    });
});

describe('clamp', () => {
    it('should clamp to min', () => {
        expect(clamp(-5, 0, 100)).toBe(0);
    });
    it('should clamp to max', () => {
        expect(clamp(150, 0, 100)).toBe(100);
    });
    it('should pass through in-range values', () => {
        expect(clamp(50, 0, 100)).toBe(50);
    });
});


// ═══════════════════════════════════════════
// STATE TESTS
// ═══════════════════════════════════════════

describe('getState / setState', () => {
    it('should get top-level state', () => {
        expect(getState('user')).toBeDefined();
        expect(getState('user.name')).toBeDefined();
    });

    it('should get nested state', () => {
        const skills = getState('progress.skills');
        expect(skills).toHaveProperty('grammar');
        expect(skills).toHaveProperty('vocabulary');
    });

    it('should return undefined for missing path', () => {
        expect(getState('nonexistent.deep.path')).toBeUndefined();
    });

    it('should set state value', () => {
        const original = getState('user.name');
        setState('user.name', 'TestUser');
        expect(getState('user.name')).toBe('TestUser');
        setState('user.name', original); // restore
    });
});

describe('getStreakReward', () => {
    it('should give daily reward for normal days', () => {
        const reward = getStreakReward(1);
        expect(reward.dangy).toBeGreaterThan(0);
        expect(reward.langy).toBe(0);
    });

    it('should give milestone reward at day 7', () => {
        const reward = getStreakReward(7);
        expect(reward.dangy).toBeGreaterThanOrEqual(50);
        expect(reward.langy).toBeGreaterThan(0);
        expect(reward.badge).toBeTruthy();
    });

    it('should give big reward at day 365', () => {
        const reward = getStreakReward(365);
        expect(reward.dangy).toBeGreaterThanOrEqual(2000);
        expect(reward.langy).toBeGreaterThanOrEqual(500);
    });
});

describe('LangyApp namespace', () => {
    it('should expose all public functions', () => {
        const requiredMethods = [
            'getState', 'setState', 'getDefaultState',
            'getStateSnapshot', 'loadFromSnapshot', 'resetState',
            'recordSession', 'getStreakReward', 'checkLevelUp',
        ];
        requiredMethods.forEach(method => {
            expect(typeof LangyApp[method]).toBe('function');
        });
    });
});

describe('LangyLogger', () => {
    it('should log and retrieve entries', () => {
        LangyLogger.info('Test', 'test message');
        const recent = LangyLogger.getRecent(1);
        expect(recent[0].message).toBe('test message');
        expect(recent[0].level).toBe('info');
    });

    it('should cap log at MAX_LOG', () => {
        for (let i = 0; i < 150; i++) {
            LangyLogger.info('Test', `msg ${i}`);
        }
        expect(LangyLogger.getRecent(200).length).toBeLessThanOrEqual(LangyLogger._MAX_LOG);
    });
});

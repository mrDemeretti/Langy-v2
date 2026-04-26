import { beforeEach, describe, expect, it, vi } from 'vitest';

const originalDbSaveProgress = LangyDB.saveProgress;
const originalDbLoadProgress = LangyDB.loadProgress;
const originalDbStartAutoSave = LangyDB.startAutoSave;
const originalRouterNavigate = Router.navigate;

describe('LangyDB text extraction lazy loaders', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('loads pdf.js on demand for PDF extraction', async () => {
        const getDocument = vi.fn().mockResolvedValue({
            numPages: 1,
            getPage: async () => ({
                getTextContent: async () => ({ items: [{ str: 'Hello' }, { str: 'PDF' }] }),
            }),
        });
        const pdfLib = {
            getDocument: (...args) => ({ promise: getDocument(...args) }),
            GlobalWorkerOptions: {},
        };
        const ensureSpy = vi.spyOn(LangyDB, '_ensureScript').mockResolvedValue(pdfLib);

        const file = { arrayBuffer: async () => new ArrayBuffer(8) };
        const text = await LangyDB.extractText(file, 'pdf');

        expect(ensureSpy).toHaveBeenCalled();
        expect(text).toContain('Hello PDF');
    });

    it('loads mammoth on demand for DOCX extraction', async () => {
        vi.spyOn(LangyDB, '_ensureScript').mockResolvedValue({
            extractRawText: vi.fn().mockResolvedValue({ value: 'Docx text' }),
        });
        const file = { arrayBuffer: async () => new ArrayBuffer(8) };
        const text = await LangyDB.extractText(file, 'docx');
        expect(text).toBe('Docx text');
    });
});

describe('Router integration guards', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = '<div id="app"><div id="screen-container"></div></div>';
        window.location.hash = '';
        Router.routes = {};
        Router.currentRoute = null;
        Router._cleanupFns = {};
        Router._routeParams = {};
        globalThis.Anim = { transitionTo: fn => fn(), haptic: () => {} };
        LangyDB.db = {};
        LangyDB.currentUser = null;
        LangyDB.saveProgress = vi.fn().mockResolvedValue();
        ScreenState.clearAll?.();
        ScreenState.clear();
    });

    it('redirects to auth when route requires logged-in user', () => {
        Router.register('home', () => {});
        window.location.hash = 'home';

        Router.handleRoute();

        expect(window.location.hash).toBe('#auth');
    });
});

describe('LangyAI contract behavior', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        LangyState.aiMemory = { conversationContext: [], weakAreas: [], mistakes: [] };
    });

    it('throws on non-ok API responses', async () => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: false,
            text: async () => 'fail',
        });

        await expect(LangyAI.chat('test')).rejects.toThrow('AI temporarily unavailable');
    });

    it('retries and succeeds on second attempt', async () => {
        let calls = 0;
        vi.spyOn(LangyAI, 'chat').mockImplementation(async () => {
            calls += 1;
            if (calls === 1) throw new Error('temp fail');
            return 'ok';
        });
        const onRetry = vi.fn();

        const result = await LangyAI.chatWithRetry('hello', { retries: 1, onRetry });

        expect(result).toBe('ok');
        expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('returns fallback message via safeChat when retries fail', async () => {
        vi.spyOn(LangyAI, 'chat').mockRejectedValue(new Error('down'));
        const result = await LangyAI.safeChat('hello', {
            retries: 1,
            fallbackMessage: 'fallback text',
        });
        expect(result).toBe('fallback text');
    });
});

describe('Auth and persistence integration scenarios', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = '<div id="app"><div id="screen-container"></div></div>';
        window.location.hash = 'auth';
        globalThis.i18n = k => k;
        globalThis.toggleDarkMode = () => {};
        globalThis.Anim = { showToast: vi.fn(), staggerChildren: vi.fn(), transitionTo: fn => fn(), haptic: () => {} };
        LangyDB.saveProgress = originalDbSaveProgress;
        LangyDB.loadProgress = originalDbLoadProgress;
        LangyDB.startAutoSave = originalDbStartAutoSave;
        Router.navigate = originalRouterNavigate;
    });

    it('signup flow routes user to onboarding', async () => {
        const container = document.getElementById('screen-container');
        const navSpy = vi.spyOn(Router, 'navigate').mockImplementation(() => {});
        const timeoutSpy = vi.spyOn(window, 'setTimeout').mockImplementation(() => 0);
        LangyDB.startAutoSave = vi.fn();
        LangyDB.register = vi.fn().mockResolvedValue({ email: 'new@example.com' });

        ScreenState.set('authMode', 'signup');
        renderAuth(container);
        container.querySelector('#auth-name').value = 'New User';
        container.querySelector('#auth-email').value = 'new@example.com';
        container.querySelector('#auth-password').value = '123456';
        container.querySelector('#auth-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        await Promise.resolve();
        await Promise.resolve();

        expect(LangyDB.register).toHaveBeenCalledWith('New User', 'new@example.com', '123456');
        expect(timeoutSpy).toHaveBeenCalled();
        expect(navSpy).not.toHaveBeenCalledWith('home');
    });

    it('save/load progress delegates to snapshot helpers', async () => {
        const snapshot = { progress: { overall: 10 } };
        LangyDB.currentUser = { email: 'u@example.com' };
        LangyDB.db = {};

        const reqSpy = vi.spyOn(LangyDB, '_req').mockImplementation(async (store, mode) => {
            if (store === 'progress' && mode === 'readwrite') return true;
            if (store === 'progress' && mode === 'readonly') return { data: snapshot };
            return null;
        });

        await LangyDB.saveProgress();
        await LangyDB.loadProgress('u@example.com');

        expect(reqSpy).toHaveBeenCalledWith('progress', 'readwrite', expect.any(Function));
        expect(reqSpy).toHaveBeenCalledWith('progress', 'readonly', expect.any(Function));
    });
});

describe('Runtime metrics', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        localStorage.removeItem('langy_metrics_latest');
    });

    it('initializes and stores latest metrics snapshot', () => {
        LangyMetrics.init();
        const latest = LangyMetrics.getLatest();
        expect(latest.sessionId).toBeTruthy();
        expect(latest.ts).toBeGreaterThan(0);
    });
});

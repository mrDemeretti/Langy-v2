/* ============================================
   LANGY — ROUTER (Hash-based SPA)
   + ScreenState: centralized screen-level state
   ============================================ */

// ─── SCREEN STATE MANAGER ───
// Replaces all `window._` anti-patterns with a scoped, auto-cleaning state object.
// Each screen gets its own namespace that auto-clears on navigation.
const ScreenState = {
    _data: {},
    _persistent: new Set(), // keys that survive navigation

    // Get screen-scoped state
    get(key, defaultVal) {
        return this._data[key] !== undefined ? this._data[key] : defaultVal;
    },

    // Set screen-scoped state
    set(key, value) {
        this._data[key] = value;
    },

    // Mark a key as persistent (survives nav, e.g. onboarding progress)
    persist(key) {
        this._persistent.add(key);
    },

    // Delete a specific key
    delete(key) {
        delete this._data[key];
        this._persistent.delete(key);
    },

    // Clear non-persistent state (called on route change)
    _clearTransient() {
        const keysToDelete = Object.keys(this._data).filter(k => !this._persistent.has(k));
        keysToDelete.forEach(k => delete this._data[k]);
    },

    // Clear everything (called on logout)
    clearAll() {
        this._data = {};
        this._persistent.clear();
    }
};

// ─── ROUTER ───
const Router = {
    routes: {},
    currentRoute: null,
    _cleanupFns: {},     // per-screen cleanup callbacks
    _routeParams: {},    // route params (replaces window._routeParams)

    register(path, renderFn, cleanupFn) {
        this.routes[path] = renderFn;
        if (cleanupFn) this._cleanupFns[path] = cleanupFn;
    },

    navigate(path, params = {}) {
        this._routeParams = params;
        window.location.hash = path;
    },

    getParams() {
        return this._routeParams || {};
    },

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'auth';

        // Auth guard: redirect to auth if not logged in
        if (hash !== 'auth' && typeof LangyDB !== 'undefined' && LangyDB.db && !LangyDB.currentUser) {
            window.location.hash = 'auth';
            return;
        }

        // Run cleanup for previous screen
        if (this.currentRoute && this.currentRoute !== hash) {
            const cleanup = this._cleanupFns[this.currentRoute];
            if (typeof cleanup === 'function') {
                try { cleanup(); } catch (e) { console.warn('Cleanup error:', e); }
            }
            // Clear transient screen state on navigation
            ScreenState._clearTransient();
        }

        // Auto-save progress on navigation
        if (this.currentRoute && hash !== this.currentRoute
            && typeof LangyDB !== 'undefined' && LangyDB.currentUser) {
            LangyDB.saveProgress().catch(e => console.warn('Nav save:', e));
        }

        const renderFn = this.routes[hash];
        if (renderFn) {
            this.currentRoute = hash;
            
            // Toggle DeepTutor Visibility based on route
            if (typeof DeepTutor !== 'undefined') {
                if (hash === 'learning') {
                    DeepTutor.show();
                } else {
                    DeepTutor.hide();
                }
            }

            Anim.transitionTo(() => {
                const container = document.getElementById('screen-container');
                container.innerHTML = '';
                renderFn(container);
                window.scrollTo(0, 0);
            });

            // Update bottom nav
            this._updateBottomNav(hash);
        }
    },

    // ─── BOTTOM NAV BAR ───
    // Screens where bottom nav should be hidden
    _hideNavRoutes: new Set(['auth', 'onboarding', 'learning', 'placement-test', 'mascot-select', 'interests', 'subscription']),
    
    _navTabs: [
        { route: 'home',    icon: 'home',          labelKey: 'nav.home' },
        { route: 'results', icon: 'barChart',      labelKey: 'nav.learn' },
        { route: 'talk',    icon: 'messageCircle', labelKey: 'nav.talk' },
        { route: 'profile', icon: 'user',          labelKey: 'nav.profile' },
    ],

    _updateBottomNav(currentHash) {
        let nav = document.getElementById('bottom-nav');
        
        // Hide nav on certain screens
        if (this._hideNavRoutes.has(currentHash)) {
            if (nav) nav.style.display = 'none';
            document.getElementById('screen-container')?.classList.remove('has-bottom-nav');
            return;
        }

        // Create nav if it doesn't exist
        if (!nav) {
            nav = document.createElement('nav');
            nav.id = 'bottom-nav';
            nav.className = 'bottom-nav';
            document.getElementById('app').appendChild(nav);
        }

        nav.style.display = '';
        document.getElementById('screen-container')?.classList.add('has-bottom-nav');

        // Render tabs
        nav.innerHTML = this._navTabs.map(tab => {
            const isActive = currentHash === tab.route;
            const icon = typeof LangyIcons !== 'undefined' ? LangyIcons[tab.icon] : '';
            const label = typeof i18n !== 'undefined' ? i18n(tab.labelKey) : tab.route;
            return `
                <button class="bottom-nav__tab ${isActive ? 'bottom-nav__tab--active' : ''}" 
                        data-route="${tab.route}" aria-label="${label}">
                    <span class="bottom-nav__icon">${icon}</span>
                    <span class="bottom-nav__label">${label}</span>
                </button>
            `;
        }).join('');

        // Bind click handlers
        nav.querySelectorAll('.bottom-nav__tab').forEach(btn => {
            btn.addEventListener('click', () => {
                const route = btn.dataset.route;
                if (route !== currentHash) {
                    Router.navigate(route);
                }
            });
        });
    },

    back() {
        window.history.back();
    }
};

/* ============================================
   LANGY — ROUTER (Hash-based SPA)
   ============================================ */

const Router = {
    routes: {},
    currentRoute: null,

    register(path, renderFn) {
        this.routes[path] = renderFn;
    },

    navigate(path, params = {}) {
        window._routeParams = params;
        window.location.hash = path;
    },

    getParams() {
        return window._routeParams || {};
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
        }
    },

    back() {
        window.history.back();
    }
};

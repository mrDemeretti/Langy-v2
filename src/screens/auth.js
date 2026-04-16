/* ============================================
   SCREEN: AUTH (Login / Signup)
   ============================================ */

function renderAuth(container) {
    const isLogin = window._authMode !== 'signup';

    container.innerHTML = `
        <div class="screen auth">
            <div class="auth__mascot">
                <div class="mascot-placeholder mascot-placeholder--sm" style="border-radius:50%;">
                </div>
            </div>

            <div class="auth__logo">
                <img src="assets/logo.png" alt="Langy" style="width: 80px; height: auto; margin: 0 auto 8px; display: block;">
                <h1>Langy</h1>
                <p>Your AI English Teacher</p>
            </div>

            <div class="tabs" id="auth-tabs">
                <button class="tabs__tab ${isLogin ? 'tabs__tab--active' : ''}" data-tab="login">Log In</button>
                <button class="tabs__tab ${!isLogin ? 'tabs__tab--active' : ''}" data-tab="signup">Sign Up</button>
            </div>

            <form class="auth__form" id="auth-form">
                ${!isLogin ? `
                <div class="input-group">
                    <label for="auth-name">Full Name</label>
                    <input class="input" type="text" id="auth-name" placeholder="Enter your name" autocomplete="name">
                </div>` : ''}

                <div class="input-group">
                    <label for="auth-email">Email</label>
                    <input class="input" type="email" id="auth-email" placeholder="you@example.com" autocomplete="email">
                </div>

                <div class="input-group">
                    <label for="auth-password">Password</label>
                    <input class="input" type="password" id="auth-password" placeholder="••••••••" autocomplete="${isLogin ? 'current-password' : 'new-password'}">
                </div>

                <button type="submit" class="btn btn--primary btn--lg btn--full" id="auth-submit">
                    ${isLogin ? 'Log In' : 'Create Account'}
                </button>
                <div class="auth__error" id="auth-error"></div>
            </form>

            <div class="divider--text">or continue with</div>

            <div class="auth__social">
                <button type="button" class="btn" id="auth-google">
                    <span>G</span> Google
                </button>
                <button type="button" class="btn" id="auth-apple">
                    <span>${LangyIcons.apple || LangyIcons.globe}</span> Apple
                </button>
            </div>
            
            <div style="margin-top:var(--sp-4);">
                <button type="button" class="btn btn--outline" id="auth-dev-login" style="width:100%; border-color:var(--primary); color:var(--primary);">
                    ${LangyIcons.zap} DEV FAST LOGIN (Skip Tests)
                </button>
            </div>

            <p class="auth__footer">
                ${isLogin
                    ? 'Don\'t have an account? <a href="#" id="auth-switch">Sign Up</a>'
                    : 'Already have an account? <a href="#" id="auth-switch">Log In</a>'
                }
            </p>
        </div>
    `;

    // Tab switching
    container.querySelectorAll('.tabs__tab').forEach(tab => {
        tab.addEventListener('click', () => {
            window._authMode = tab.dataset.tab === 'signup' ? 'signup' : 'login';
            renderAuth(container);
        });
    });

    // Switch link
    const switchLink = container.querySelector('#auth-switch');
    if (switchLink) {
        switchLink.addEventListener('click', (e) => {
            e.preventDefault();
            window._authMode = isLogin ? 'signup' : 'login';
            renderAuth(container);
        });
    }

    // Form submit — real auth
    container.querySelector('#auth-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const errorEl = container.querySelector('#auth-error');
        const submitBtn = container.querySelector('#auth-submit');

        const email = container.querySelector('#auth-email')?.value.trim();
        const password = container.querySelector('#auth-password')?.value;
        const name = !isLogin ? container.querySelector('#auth-name')?.value.trim() : '';

        // Validation
        if (!email || !password) {
            errorEl.textContent = 'Please fill in all fields';
            errorEl.style.display = 'block';
            return;
        }
        if (!isLogin && !name) {
            errorEl.textContent = 'Please enter your name';
            errorEl.style.display = 'block';
            return;
        }
        if (password.length < 6) {
            errorEl.textContent = 'Password must be at least 6 characters';
            errorEl.style.display = 'block';
            return;
        }

        errorEl.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.textContent = isLogin ? 'Logging in...' : 'Creating account...';

        try {
            if (isLogin) {
                await LangyDB.login(email, password);
                if (typeof toggleDarkMode === 'function') toggleDarkMode(LangyState.settings.darkMode);
                LangyDB.startAutoSave();
                Anim.showToast(`Welcome back! ${LangyIcons.check}`);
                setTimeout(() => Router.navigate('home'), 500);
            } else {
                await LangyDB.register(name, email, password);
                LangyDB.startAutoSave();
                Anim.showToast(`Account created! ${LangyIcons.check}`);
                setTimeout(() => Router.navigate('onboarding'), 500);
            }
        } catch (err) {
            errorEl.textContent = err.message;
            errorEl.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = isLogin ? 'Log In' : 'Create Account';
        }
    });

    // Social buttons (local mode — not available)
    container.querySelector('#auth-google')?.addEventListener('click', () => {
        Anim.showToast(`Google Sign-In — coming soon with cloud sync! ${LangyIcons.cloud}`);
    });
    container.querySelector('#auth-apple')?.addEventListener('click', () => {
        Anim.showToast(`Apple Sign-In — coming soon with cloud sync! ${LangyIcons.cloud}`);
    });

    // DEV FAST LOGIN
    container.querySelector('#auth-dev-login')?.addEventListener('click', async () => {
        try {
            await LangyDB.register("Test User", "test@example.com", "123456");
        } catch (e) { /* ignore if exists */ }
        
        await LangyDB.login("test@example.com", "123456");
        LangyState.user.hasCompletedPlacement = true;
        LangyState.user.level = 'B2 Upper-Intermediate';
        LangyState.mascot.selected = 3; // Omar by default for testing
        LangyDB.startAutoSave();
        Anim.showToast(`Logged in as Test User ${LangyIcons.zap}`);
        Router.navigate('home');
    });

    // Stagger animation
    setTimeout(() => Anim.staggerChildren(container, '.input-group, .btn, .divider--text, .auth__social, .auth__footer'), 100);
}

Router.register('auth', renderAuth);

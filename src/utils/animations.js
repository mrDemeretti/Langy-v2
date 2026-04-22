/* ============================================
   LANGY — ANIMATIONS & UX UTILITY
   ============================================ */

const Anim = {
    // Track navigation direction for slide transitions
    _navHistory: [],
    _lastDirection: 'forward', // 'forward' | 'back'

    // Add ripple effect to button click
    ripple(e) {
        const btn = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;
        const rect = btn.getBoundingClientRect();
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');
        const existing = btn.querySelector('.ripple');
        if (existing) existing.remove();
        btn.appendChild(circle);
        setTimeout(() => circle.remove(), 600);
    },

    // Stagger children animation
    staggerChildren(container, selector, delay = 60) {
        if (this._prefersReducedMotion()) {
            return;
        }
        const children = container.querySelectorAll(selector);
        children.forEach((child, i) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(16px)';
            child.style.transition = `all ${400 + i * 20}ms var(--ease-out)`;
            setTimeout(
                () => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                },
                delay * i + 50
            );
        });
    },

    // Counter animation
    animateCounter(element, target, duration = 1000) {
        const start = parseInt(element.textContent) || 0;
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.round(start + (target - start) * eased);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    },

    // Fly out elements (for home → learning transition)
    flyOut(elements) {
        elements.forEach((el, i) => {
            const direction = i % 2 === 0 ? -1 : 1;
            el.style.setProperty('--fly-x', `${direction * 120}px`);
            el.style.animation = `flyOut 0.4s ${i * 50}ms var(--ease-in) forwards`;
        });
    },

    // Shake element
    shake(element) {
        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = 'shake 0.4s ease';
    },

    // Pulse element
    pulse(element) {
        element.style.animation = 'none';
        element.offsetHeight;
        element.style.animation = 'pulse 0.5s ease';
    },

    // Toast notification
    showToast(message, duration = 2500) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            toast.style.transition = 'all 0.3s var(--ease-in)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    // ─── Directional Page Transition ───
    transitionTo(renderFn, direction) {
        const container = document.getElementById('screen-container');
        const dir = direction || this._lastDirection;

        // Respect reduced motion
        if (this._prefersReducedMotion()) {
            renderFn();
            return;
        }

        const outX = dir === 'back' ? '40px' : '-40px';
        const inX = dir === 'back' ? '-40px' : '40px';

        container.style.transition = 'opacity 0.15s var(--ease-in), transform 0.15s var(--ease-in)';
        container.style.opacity = '0';
        container.style.transform = `translateX(${outX})`;

        setTimeout(() => {
            renderFn();

            container.style.transition = 'none';
            container.style.opacity = '0';
            container.style.transform = `translateX(${inX})`;

            void container.offsetHeight;

            container.style.transition = 'opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out)';
            container.style.opacity = '1';
            container.style.transform = 'translateX(0)';
        }, 150);
    },

    // ─── Haptic Feedback ───
    haptic(type = 'light') {
        if (!navigator.vibrate) return;
        switch (type) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(20);
                break;
            case 'heavy':
                navigator.vibrate(40);
                break;
            case 'success':
                navigator.vibrate([10, 50, 10]);
                break;
            case 'error':
                navigator.vibrate([40, 30, 40]);
                break;
        }
    },

    // ─── Skeleton Loading ───
    skeleton(width = '100%', height = '20px', radius = '8px') {
        return `<div class="skeleton" style="width:${width};height:${height};border-radius:${radius};"></div>`;
    },

    skeletonCard() {
        return `
            <div class="skeleton-card">
                <div class="skeleton" style="width:40px;height:40px;border-radius:50%;"></div>
                <div style="flex:1;display:flex;flex-direction:column;gap:8px;">
                    <div class="skeleton" style="width:70%;height:16px;border-radius:8px;"></div>
                    <div class="skeleton" style="width:40%;height:12px;border-radius:6px;"></div>
                </div>
            </div>
        `;
    },

    skeletonScreen() {
        return `
            <div class="skeleton-screen">
                <div class="skeleton" style="width:60%;height:28px;border-radius:12px;margin-bottom:24px;"></div>
                ${this.skeletonCard()}
                ${this.skeletonCard()}
                <div class="skeleton" style="width:100%;height:120px;border-radius:16px;margin-top:16px;"></div>
                ${this.skeletonCard()}
            </div>
        `;
    },

    // ─── Pull to Refresh ───
    initPullToRefresh(container, onRefresh) {
        let startY = 0;
        let pulling = false;
        let indicator = null;

        container.addEventListener(
            'touchstart',
            e => {
                if (container.scrollTop <= 0) {
                    startY = e.touches[0].clientY;
                    pulling = true;
                }
            },
            { passive: true }
        );

        container.addEventListener(
            'touchmove',
            e => {
                if (!pulling) return;
                const diff = e.touches[0].clientY - startY;
                if (diff > 0 && diff < 120) {
                    if (!indicator) {
                        indicator = document.createElement('div');
                        indicator.className = 'pull-refresh-indicator';
                        indicator.innerHTML = `<div class="pull-refresh-spinner">${LangyIcons.refresh}</div>`;
                        container.prepend(indicator);
                    }
                    const progress = Math.min(diff / 80, 1);
                    indicator.style.height = `${diff * 0.6}px`;
                    indicator.style.opacity = progress;
                    indicator.querySelector('.pull-refresh-spinner').style.transform = `rotate(${diff * 3}deg)`;
                }
            },
            { passive: true }
        );

        container.addEventListener('touchend', () => {
            if (indicator) {
                const height = parseInt(indicator.style.height);
                if (height > 48) {
                    indicator.classList.add('pull-refresh--loading');
                    Anim.haptic('medium');
                    onRefresh().finally(() => {
                        indicator?.remove();
                        indicator = null;
                    });
                } else {
                    indicator.remove();
                    indicator = null;
                }
            }
            pulling = false;
        });
    },

    // ─── Auto Dark Mode ───
    initAutoDarkMode() {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const userPref = localStorage.getItem('langy_theme');

        // Only auto-apply if user hasn't manually chosen
        if (!userPref) {
            if (typeof toggleDarkMode === 'function') {
                toggleDarkMode(mq.matches);
            }
        }

        // Listen for system theme changes
        mq.addEventListener('change', e => {
            const userPref = localStorage.getItem('langy_theme');
            if (!userPref) {
                if (typeof toggleDarkMode === 'function') {
                    toggleDarkMode(e.matches);
                }
            }
        });
    },

    // ─── Swipe Navigation for Bottom Nav ───
    initSwipeNav() {
        let startX = 0;
        let startY = 0;
        const tabs = ['home', 'results', 'talk', 'profile'];

        document.addEventListener(
            'touchstart',
            e => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            },
            { passive: true }
        );

        document.addEventListener(
            'touchend',
            e => {
                const diffX = e.changedTouches[0].clientX - startX;
                const diffY = e.changedTouches[0].clientY - startY;

                // Must be horizontal swipe (not vertical scroll)
                if (Math.abs(diffX) < 80 || Math.abs(diffY) > Math.abs(diffX)) return;

                // Don't swipe on auth/learning/etc
                const hash = window.location.hash.slice(1);
                const currentIdx = tabs.indexOf(hash);
                if (currentIdx === -1) return;

                if (diffX < -80 && currentIdx < tabs.length - 1) {
                    // Swipe left → next tab
                    Anim._lastDirection = 'forward';
                    Anim.haptic('light');
                    Router.navigate(tabs[currentIdx + 1]);
                } else if (diffX > 80 && currentIdx > 0) {
                    // Swipe right → prev tab
                    Anim._lastDirection = 'back';
                    Anim.haptic('light');
                    Router.navigate(tabs[currentIdx - 1]);
                }
            },
            { passive: true }
        );
    },

    // ─── Reduced Motion Check ───
    _prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
};

// Auto-init on load
document.addEventListener('DOMContentLoaded', () => {
    Anim.initAutoDarkMode();
    Anim.initSwipeNav();
});

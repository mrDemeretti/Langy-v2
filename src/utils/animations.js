/* ============================================
   LANGY — ANIMATIONS UTILITY
   ============================================ */

const Anim = {
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
        const children = container.querySelectorAll(selector);
        children.forEach((child, i) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(16px)';
            child.style.transition = `all ${400 + i * 20}ms var(--ease-out)`;
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, delay * i + 50);
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
        element.offsetHeight; // reflow
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

    // Page transition
    transitionTo(renderFn) {
        const container = document.getElementById('screen-container');
        
        container.style.transition = 'opacity 0.2s var(--ease-in), transform 0.2s var(--ease-in)';
        container.style.opacity = '0';
        container.style.transform = 'scale(0.96) translateY(20px)';
        
        setTimeout(() => {
            renderFn();
            
            container.style.transition = 'none';
            container.style.opacity = '0';
            container.style.transform = 'scale(1.04) translateY(-20px)';
            
            void container.offsetHeight; 
            
            container.style.transition = 'opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out)';
            container.style.opacity = '1';
            container.style.transform = 'scale(1) translateY(0)';
        }, 200);
    }
};

/* ============================================
   SCREEN: ONBOARDING — Welcome Flow
   Welcome → Interests → Mascot → Placement Test
   ============================================ */

function renderOnboarding(container) {
    const step = window._onboardingStep || 0;

    // ─── STEP 0: Welcome Slides ───
    if (step === 0) {
        const slides = [
            {
                emoji: LangyIcons.globe,
                title: 'Добро пожаловать в Langy!',
                subtitle: 'Твой персональный AI-преподаватель английского',
                desc: 'Забудь скучные учебники. Учись через разговоры, игры и дуэли с реальными людьми.'
            },
            {
                emoji: LangyIcons.brain,
                title: 'Умный ИИ-учитель',
                subtitle: 'Адаптируется под твой уровень',
                desc: 'Объясняет грамматику на русском, исправляет ошибки и подбирает уроки лично для тебя.'
            },
            {
                emoji: LangyIcons.trophy,
                title: 'Учись играючи',
                subtitle: 'Стрики, дуэли, рейтинги',
                desc: 'Соревнуйся с друзьями, зарабатывай награды и прокачивай своего маскота.'
            }
        ];

        const currentSlide = window._onboardingSlide || 0;
        const s = slides[currentSlide];
        const isLast = currentSlide === slides.length - 1;

        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__skip" id="onboarding-skip">Пропустить</div>
                
                <div class="onboarding__slide" style="animation: fadeInUp 0.5s ease-out;">
                    <div class="onboarding__emoji">${s.emoji}</div>
                    <h1 class="onboarding__title">${s.title}</h1>
                    <p class="onboarding__subtitle">${s.subtitle}</p>
                    <p class="onboarding__desc">${s.desc}</p>
                </div>

                <div class="onboarding__dots">
                    ${slides.map((_, i) => `
                        <div class="onboarding__dot ${i === currentSlide ? 'onboarding__dot--active' : ''}"></div>
                    `).join('')}
                </div>

                <button class="btn btn--primary btn--lg btn--full onboarding__btn" id="onboarding-next">
                    ${isLast ? `Начнём! ${LangyIcons.rocket}` : `Далее ${LangyIcons.arrowRight}`}
                </button>
            </div>
        `;

        container.querySelector('#onboarding-next').addEventListener('click', () => {
            if (isLast) {
                window._onboardingStep = 1;
                renderOnboarding(container);
            } else {
                window._onboardingSlide = currentSlide + 1;
                renderOnboarding(container);
            }
        });

        container.querySelector('#onboarding-skip').addEventListener('click', () => {
            window._onboardingStep = 1;
            renderOnboarding(container);
        });

        // Swipe support
        let touchStartX = 0;
        const slideEl = container.querySelector('.onboarding__slide');
        slideEl?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
        slideEl?.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentSlide < slides.length - 1) {
                    window._onboardingSlide = currentSlide + 1;
                    renderOnboarding(container);
                } else if (diff < 0 && currentSlide > 0) {
                    window._onboardingSlide = currentSlide - 1;
                    renderOnboarding(container);
                }
            }
        });

        return;
    }

    // ─── STEP 1: Choose Interests ───
    if (step === 1) {
        const interests = [
            { id: 'travel', emoji: LangyIcons.globe, label: 'Путешествия' },
            { id: 'work', emoji: LangyIcons.clipboard, label: 'Работа и карьера' },
            { id: 'movies', emoji: LangyIcons.play, label: 'Кино и сериалы' },
            { id: 'gaming', emoji: LangyIcons.play, label: 'Игры' },
            { id: 'music', emoji: LangyIcons.volume, label: 'Музыка' },
            { id: 'tech', emoji: LangyIcons.globe, label: 'IT и технологии' },
            { id: 'sports', emoji: LangyIcons.award, label: 'Спорт' },
            { id: 'food', emoji: LangyIcons.info, label: 'Еда и кулинария' },
            { id: 'books', emoji: LangyIcons.book, label: 'Книги' },
            { id: 'social', emoji: LangyIcons.messageCircle, label: 'Общение с иностранцами' },
            { id: 'exams', emoji: LangyIcons.graduationCap, label: 'Экзамены (IELTS, TOEFL)' },
            { id: 'business', emoji: LangyIcons.barChart, label: 'Бизнес-английский' },
        ];

        const selected = window._selectedInterests || [];

        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__header">
                    <div class="onboarding__step-badge">Шаг 1 из 2</div>
                    <h2 class="onboarding__title" style="font-size: var(--fs-2xl);">Что тебе интересно?</h2>
                    <p class="onboarding__desc">Выбери темы, на которых мы будем строить уроки. Можно выбрать несколько.</p>
                </div>

                <div class="onboarding__grid" id="interests-grid">
                    ${interests.map(i => `
                        <div class="interest-chip ${selected.includes(i.id) ? 'interest-chip--selected' : ''}" data-id="${i.id}">
                            <span class="interest-chip__emoji">${i.emoji}</span>
                            <span class="interest-chip__label">${i.label}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="onboarding__bottom">
                    <div class="onboarding__counter">${selected.length} выбрано</div>
                    <button class="btn btn--primary btn--lg btn--full onboarding__btn ${selected.length === 0 ? 'btn--disabled' : ''}" id="onboarding-next" ${selected.length === 0 ? 'disabled' : ''}>
                        Далее →
                    </button>
                </div>
            </div>
        `;

        container.querySelectorAll('.interest-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const id = chip.dataset.id;
                const idx = selected.indexOf(id);
                if (idx > -1) {
                    selected.splice(idx, 1);
                } else {
                    selected.push(id);
                }
                window._selectedInterests = selected;
                
                // Animate chip
                chip.classList.toggle('interest-chip--selected');
                chip.style.transform = 'scale(0.95)';
                setTimeout(() => { chip.style.transform = ''; }, 150);

                // Update counter and button
                const counter = container.querySelector('.onboarding__counter');
                const btn = container.querySelector('#onboarding-next');
                counter.textContent = `${selected.length} выбрано`;
                if (selected.length > 0) {
                    btn.classList.remove('btn--disabled');
                    btn.disabled = false;
                } else {
                    btn.classList.add('btn--disabled');
                    btn.disabled = true;
                }
            });
        });

        container.querySelector('#onboarding-next').addEventListener('click', () => {
            LangyState.user.interests = selected;
            window._onboardingStep = 2;
            renderOnboarding(container);
        });

        setTimeout(() => Anim.staggerChildren(container, '.interest-chip'), 50);
        return;
    }

    // ─── STEP 2: Choose Mascot ───
    if (step === 2) {
        const mascots = [
            { id: 0, name: 'Zendaya', emoji: LangyIcons.sparkles, desc: 'Яркая и вдохновляющая. Делает обучение стильным и увлекательным!', style: 'Трендовый наставник', file: 'zendaya' },
            { id: 1, name: 'Travis Scott', emoji: LangyIcons.zap, desc: 'Энергичный и харизматичный. Учит через музыку и культуру.', style: 'Культурный трекер', file: 'travis' },
            { id: 2, name: 'Matthew', emoji: LangyIcons.play, desc: 'Спокойный и уверенный. Объясняет всё чётко и с шармом.', style: 'Голливудский класс', file: 'matthew' },
            { id: 3, name: 'Omar', emoji: LangyIcons.user, desc: 'Мудрый и харизматичный. Учит через жизненные истории.', style: 'Мудрый друг', file: 'omar' },
        ];

        const selectedMascot = window._selectedMascot ?? null;

        container.innerHTML = `
            <div class="screen onboarding">
                <div class="onboarding__header">
                    <div class="onboarding__step-badge">Шаг 2 из 2</div>
                    <h2 class="onboarding__title" style="font-size: var(--fs-2xl);">Выбери преподавателя</h2>
                    <p class="onboarding__desc">Каждый маскот имеет свой характер и стиль обучения</p>
                </div>

                <div class="onboarding__mascots" id="mascot-grid">
                    ${mascots.map(m => `
                        <div class="mascot-card ${selectedMascot === m.id ? 'mascot-card--selected' : ''}" data-id="${m.id}">
                            <div class="mascot-card__avatar">
                                <img src="assets/mascots/${m.file}.png" 
                                     alt="${m.name}"
                                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                                     style="width:80px; height:80px; object-fit:contain;">
                                <div class="mascot-card__emoji" style="display:none; font-size:48px; justify-content:center; align-items:center;">${m.emoji}</div>
                            </div>
                            <div class="mascot-card__info">
                                <div class="mascot-card__name">${m.name}</div>
                                <div class="mascot-card__style">${m.style}</div>
                                <div class="mascot-card__desc">${m.desc}</div>
                            </div>
                            ${selectedMascot === m.id ? '<div class="mascot-card__check">${LangyIcons.check}</div>' : ''}
                        </div>
                    `).join('')}
                </div>

                <div class="onboarding__bottom">
                    <button class="btn btn--primary btn--lg btn--full onboarding__btn ${selectedMascot === null ? 'btn--disabled' : ''}" id="onboarding-finish" ${selectedMascot === null ? 'disabled' : ''}>
                        Начать тест уровня! ${LangyIcons.brain}
                    </button>
                </div>
            </div>
        `;

        container.querySelectorAll('.mascot-card').forEach(card => {
            card.addEventListener('click', () => {
                window._selectedMascot = parseInt(card.dataset.id);
                renderOnboarding(container);
            });
        });

        container.querySelector('#onboarding-finish').addEventListener('click', () => {
            LangyState.mascot.selected = selectedMascot;
            
            // Clean up temp variables
            delete window._onboardingStep;
            delete window._onboardingSlide;
            delete window._selectedInterests;
            delete window._selectedMascot;

            // Mark onboarding as done
            LangyState.user.hasCompletedOnboarding = true;

            // Save and go to placement test
            if (typeof LangyDB !== 'undefined') {
                LangyDB.saveProgress().catch(() => {});
            }
            
            Anim.showToast(`${['Zendaya', 'Travis Scott', 'Matthew', 'Omar'][selectedMascot]} будет твоим учителем! ${LangyIcons.sparkles}`);
            setTimeout(() => Router.navigate('placement-test'), 600);
        });

        setTimeout(() => Anim.staggerChildren(container, '.mascot-card'), 80);
        return;
    }
}

Router.register('onboarding', renderOnboarding);

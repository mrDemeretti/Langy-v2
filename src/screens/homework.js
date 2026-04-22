/* ============================================
   SCREEN: HOMEWORK v2 — Writing & Handwriting
   Includes: lesson review, writing assignments,
   handwriting photo analysis via Gemini Vision
   ============================================ */

function renderHomework(container) {
    const { homework, progress } = LangyState;
    const activeTab = ScreenState.get('homeworkTab', 'current');

    // Auto-generate homework if empty and lessons have been done
    if (homework.current.length === 0 && progress.lessonHistory.length > 0) {
        autoGenerateHomework();
    }

    container.innerHTML = `
        <div class="screen screen--no-pad">
            <div class="nav-header">
                <div class="nav-header__back" id="homework-back">${LangyIcons.back}</div>
                <div class="nav-header__title">${i18n('hw.title')}</div>
                <div style="width:36px;"></div>
            </div>

            <div style="padding: 0 var(--sp-6) var(--sp-4);">
                <div class="tabs" id="homework-tabs">
                    <button class="tabs__tab ${activeTab === 'current' ? 'tabs__tab--active' : ''}" data-tab="current">Tasks (${homework.current.length})</button>
                    <button class="tabs__tab ${activeTab === 'writing' ? 'tabs__tab--active' : ''}" data-tab="writing">Writing</button>
                    <button class="tabs__tab ${activeTab === 'handwriting' ? 'tabs__tab--active' : ''}" data-tab="handwriting">Handwriting</button>
                    <button class="tabs__tab ${activeTab === 'completed' ? 'tabs__tab--active' : ''}" data-tab="completed">Done</button>
                </div>
            </div>

            <div class="homework__list" id="homework-list">
                ${
                    activeTab === 'current'
                        ? renderCurrentHomework(homework.current)
                        : activeTab === 'writing'
                          ? renderWritingTab()
                          : activeTab === 'handwriting'
                            ? renderHandwritingTab()
                            : renderCompletedHomework(progress.lessonHistory)
                }
            </div>
        </div>
    `;

    // Tab switching
    container.querySelectorAll('.tabs__tab').forEach(tab => {
        tab.addEventListener('click', () => {
            ScreenState.set('homeworkTab', tab.dataset.tab);
            renderHomework(container);
        });
    });

    container.querySelector('#homework-back')?.addEventListener('click', () => Router.navigate('home'));

    // Click on homework card
    container.querySelectorAll('.homework-card').forEach(card => {
        card.addEventListener('click', () => {
            const status = card.dataset.status;
            const unitId = card.dataset.unitId;
            const id = card.dataset.id;

            if (status === 'pending') {
                Anim.showToast(`Starting Homework with DeepTutor... ${LangyIcons.book}`);
                setTimeout(
                    () => Router.navigate('learning', { mode: 'homework', active: true, unitId: parseInt(unitId) }),
                    600
                );
            } else if (status === 'error' || status === 'done') {
                showHomeworkErrors(id);
            }
        });
    });

    // ── Writing Tab Events ──
    if (activeTab === 'writing') {
        setupWritingTab(container);
    }

    // ── Handwriting Tab Events ──
    if (activeTab === 'handwriting') {
        setupHandwritingTab(container);
    }

    setTimeout(() => Anim.staggerChildren(container, '.homework-card'), 80);
}

// ─── Auto-generate homework from completed lessons ───
function autoGenerateHomework() {
    const activeTb = typeof LangyCurriculum !== 'undefined' ? LangyCurriculum.getActive() : null;
    if (!activeTb) return;

    const completedUnitIds = new Set(LangyState.progress.lessonHistory.map(l => l.unitId));
    const existingHwUnitIds = new Set(LangyState.homework.current.map(h => h.unitId));

    activeTb.units.forEach(unit => {
        if (completedUnitIds.has(unit.id) && !existingHwUnitIds.has(unit.id)) {
            const lessonResult = LangyState.progress.lessonHistory.find(l => l.unitId === unit.id);
            if (lessonResult && lessonResult.score < 90) {
                LangyState.homework.current.push({
                    id: Date.now() + unit.id,
                    unitId: unit.id,
                    title: `${unit.title} — Review`,
                    desc: unit.homework?.prompt || `Review ${unit.grammar?.join(', ') || 'this lesson'}.`,
                    icon: LangyIcons.fileText,
                    createdAt: new Date().toISOString(),
                });
            }
        }
    });

    if (typeof LangyDB !== 'undefined') LangyDB.saveProgress();
}

function renderCurrentHomework(items) {
    if (!items.length) {
        return `<div class="empty-state">
            <div class="empty-state__icon">${LangyIcons.sparkles}</div>
            <div class="empty-state__title">All Done!</div>
            <div class="empty-state__text">No homework right now. Complete more lessons to get assignments!</div>
        </div>`;
    }
    return items
        .map(
            item => `
        <div class="homework-card" data-id="${item.id}" data-status="pending" data-unit-id="${item.unitId}">
            <div class="homework-card__icon" style="background: var(--primary-bg);">${item.icon || LangyIcons.fileText}</div>
            <div class="homework-card__info">
                <div class="homework-card__title">${item.title}</div>
                <div class="homework-card__meta">${item.desc || 'Review the previous lesson.'}</div>
            </div>
            <div class="homework-card__status homework-card__status--pending">Start ${LangyIcons.arrowRight}</div>
        </div>
    `
        )
        .join('');
}

function renderCompletedHomework(items) {
    if (!items.length) {
        return `<div class="empty-state">
            <div class="empty-state__icon">${LangyIcons.inbox}</div>
            <div class="empty-state__title">No completed tasks yet</div>
            <div class="empty-state__text">Complete lessons and homework to see results here</div>
        </div>`;
    }
    return items
        .slice()
        .reverse()
        .map(
            item => `
        <div class="homework-card" data-id="${item.id}" data-status="${item.status}" data-unit-id="${item.unitId}">
            <div class="homework-card__icon" style="background: ${item.status === 'error' ? 'var(--danger-bg)' : 'var(--accent-bg)'};">${item.icon || LangyIcons.fileText}</div>
            <div class="homework-card__info">
                <div class="homework-card__title">${item.title}</div>
                <div class="homework-card__meta">Score: ${item.score}% · ${item.date || ''} ${item.errors > 0 ? `· ${item.errors} error${item.errors !== 1 ? 's' : ''}` : ''}</div>
            </div>
            <div class="homework-card__status homework-card__status--${item.status}">
                ${item.status === 'error' ? `<span style="display:flex;align-items:center;gap:4px;">Review ${LangyIcons.alertTriangle}</span>` : `<span style="display:flex;align-items:center;gap:4px;">Done ${LangyIcons.check}</span>`}
            </div>
        </div>
    `
        )
        .join('');
}

// ═══════════════════════════════════════
// WRITING TAB — AI-checked essays
// ═══════════════════════════════════════
function renderWritingTab() {
    const level = LangyState?.user?.level || 'B1 Intermediate';
    const prompts = [
        {
            id: 'email',
            title: 'Write an Email',
            desc: 'Write a formal email to your boss asking for a day off.',
            icon: LangyIcons.send,
        },
        {
            id: 'story',
            title: 'Short Story',
            desc: 'Write a short story about an unexpected adventure.',
            icon: LangyIcons.bookOpen,
        },
        {
            id: 'opinion',
            title: 'Opinion Essay',
            desc: 'Do you think AI will replace teachers? Write your opinion.',
            icon: LangyIcons.brain,
        },
        {
            id: 'describe',
            title: 'Describe a Place',
            desc: 'Describe your favorite place in the world. Why is it special?',
            icon: LangyIcons.globe,
        },
        {
            id: 'letter',
            title: 'Letter to a Friend',
            desc: "Write a letter to a friend you haven't seen in years.",
            icon: LangyIcons.heart,
        },
        { id: 'free', title: 'Free Writing', desc: 'Write about anything you want!', icon: LangyIcons.pencil },
    ];

    return `
        <div style="padding: var(--sp-4) var(--sp-5);">
            
            <!-- Writing prompt selection -->
            <div id="writing-prompts" ${ScreenState.get('writingActive') ? 'style="display:none;"' : ''}>
                <h4 style="margin-bottom:var(--sp-3); display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--primary);">${LangyIcons.pencil}</span> Choose a Writing Prompt
                </h4>
                <p style="font-size:var(--fs-xs); color:var(--text-tertiary); margin-bottom:var(--sp-4);">Level: ${level}</p>

                <div style="display:flex; flex-direction:column; gap:var(--sp-2);">
                    ${prompts
                        .map(
                            p => `
                        <div class="homework-card writing-prompt" data-prompt-id="${p.id}" data-prompt-desc="${p.desc}">
                            <div class="homework-card__icon" style="background:var(--primary-bg); color:var(--primary);">${p.icon}</div>
                            <div class="homework-card__info">
                                <div class="homework-card__title">${p.title}</div>
                                <div class="homework-card__meta">${p.desc}</div>
                            </div>
                            <div style="color:var(--text-tertiary);">${LangyIcons.arrowRight}</div>
                        </div>
                    `
                        )
                        .join('')}
                </div>
            </div>

            <!-- Active writing area -->
            <div id="writing-area" ${ScreenState.get('writingActive') ? '' : 'style="display:none;"'}>
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:var(--sp-3);">
                    <h4 style="display:flex; align-items:center; gap:8px;">
                        <span style="color:var(--primary);">${LangyIcons.pencil}</span>
                        <span id="writing-prompt-title">${ScreenState.get('writingPromptTitle', 'Free Writing')}</span>
                    </h4>
                    <button class="btn btn--ghost btn--sm" id="writing-back" style="color:var(--text-tertiary);">${LangyIcons.x}</button>
                </div>
                <p id="writing-prompt-desc" style="font-size:var(--fs-sm); color:var(--text-secondary); margin-bottom:var(--sp-3); padding:var(--sp-3); background:var(--bg-alt); border-radius:var(--radius-lg);">
                    ${ScreenState.get('writingPromptDesc', 'Write about anything you want!')}
                </p>
                <textarea class="hw-writing" id="writing-textarea" placeholder="Start writing here...">${ScreenState.get('writingText', '')}</textarea>
                <div style="display:flex; align-items:center; justify-content:space-between; margin-top:var(--sp-2);">
                    <span id="writing-word-count" style="font-size:var(--fs-xs); color:var(--text-tertiary);">0 words</span>
                    <button class="btn btn--primary btn--sm" id="writing-submit" style="display:flex; align-items:center; gap:6px;">
                        ${LangyIcons.send} Submit for Review
                    </button>
                </div>

                <!-- AI Feedback area (shown after submit) -->
                <div id="writing-feedback"></div>
            </div>
        </div>
    `;
}

function setupWritingTab(container) {
    // Prompt selection
    container.querySelectorAll('.writing-prompt').forEach(card => {
        card.addEventListener('click', () => {
            ScreenState.set('writingActive', true);
            ScreenState.set(
                'writingPromptTitle',
                card.querySelector('.homework-card__title')?.textContent || 'Writing'
            );
            ScreenState.set('writingPromptDesc', card.dataset.promptDesc);
            ScreenState.set('writingText', '');
            renderHomework(container);
        });
    });

    // Back from writing
    container.querySelector('#writing-back')?.addEventListener('click', () => {
        ScreenState.set('writingActive', false);
        renderHomework(container);
    });

    // Word counter
    const textarea = container.querySelector('#writing-textarea');
    const wordCount = container.querySelector('#writing-word-count');
    textarea?.addEventListener('input', () => {
        ScreenState.set('writingText', textarea.value);
        const words = textarea.value
            .trim()
            .split(/\s+/)
            .filter(w => w.length > 0).length;
        if (wordCount) wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
    });

    // Submit for review
    container.querySelector('#writing-submit')?.addEventListener('click', async () => {
        const text = textarea?.value?.trim();
        if (!text || text.length < 10) {
            Anim.showToast('Write at least a few sentences first!');
            return;
        }

        const feedbackEl = container.querySelector('#writing-feedback');
        if (!feedbackEl) return;

        feedbackEl.innerHTML = `
            <div class="hw-feedback__loading">
                <span></span><span></span><span></span>
                <span style="animation:none; width:auto; height:auto; background:none; margin-left:var(--sp-2);">Analyzing your writing...</span>
            </div>
        `;

        try {
            const level = LangyState?.user?.level || 'B1';
            const prompt = `You are an expert English writing teacher. Analyze this student's writing.
Student level: ${level}
Prompt: ${ScreenState.get('writingPromptDesc', 'Free writing')}

Student's text:
"${text}"

Give detailed feedback in this format (plain text, no markdown):
SCORE: [A/B/C/D grade]
LEVEL: [estimated CEFR writing level, e.g. B1-B2]

STRENGTHS:
- [what they did well, be specific]

ERRORS:
- [each grammar/spelling error with correction]

IMPROVED VERSION:
[rewrite their text with corrections, keeping their style]

TIPS:
- [2-3 specific actionable tips for improvement]

Be encouraging but honest. Keep feedback concise.`;

            const response = await fetch(LangyAI.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: LangyAI.MODEL,
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 600,
                    temperature: 0.6,
                }),
            });

            if (!response.ok) throw new Error('AI unavailable');
            const data = await response.json();
            const feedback = data.choices?.[0]?.message?.content || 'Could not analyze. Try again.';

            feedbackEl.innerHTML = `
                <div class="hw-feedback" style="margin-top:var(--sp-4);">
                    <h4 style="margin-bottom:var(--sp-3); display:flex; align-items:center; gap:8px;">
                        <span style="color:var(--primary);">${LangyIcons.brain}</span> AI Feedback
                    </h4>
                    <div style="font-size:var(--fs-sm); color:var(--text-secondary); line-height:1.8; white-space:pre-line;">${escapeHTML(feedback)}</div>
                </div>
            `;

            // Award XP for completing writing
            if (typeof LangyState !== 'undefined') {
                const words = text.split(/\s+/).length;
                const xp = Math.min(80, Math.floor(words / 5) * 5);
                LangyState.user.xp += xp;
                LangyState.progress.skills.writing = Math.min(100, (LangyState.progress.skills.writing || 0) + 5);
                if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
                Anim.showToast(`+${xp} XP for writing!`);
            }
        } catch (err) {
            feedbackEl.innerHTML = `
                <div class="hw-feedback" style="border-color:var(--danger);">
                    <p style="color:var(--danger);">Could not analyze your writing. Please check your connection and try again.</p>
                </div>
            `;
        }
    });
}

// ═══════════════════════════════════════
// HANDWRITING TAB — Photo upload + Gemini Vision
// ═══════════════════════════════════════
function renderHandwritingTab() {
    return `
        <div style="padding: var(--sp-4) var(--sp-5);">

            <h4 style="margin-bottom:var(--sp-2); display:flex; align-items:center; gap:8px;">
                <span style="color:#F59E0B;">${LangyIcons.pencil}</span> Handwriting Check
            </h4>
            <p style="font-size:var(--fs-xs); color:var(--text-tertiary); margin-bottom:var(--sp-4);">
                Upload a photo of your handwritten English text and get AI feedback on both content and penmanship.
            </p>

            <!-- Upload Area -->
            <div class="hw-upload" id="hw-upload-zone">
                <input type="file" id="hw-file-input" accept="image/*" capture="environment" style="display:none;">
                <div id="hw-upload-content">
                    <div style="font-size:32px; color:var(--primary); margin-bottom:var(--sp-2);">${LangyIcons.upload}</div>
                    <div style="font-weight:var(--fw-semibold); margin-bottom:var(--sp-1);">Tap to upload a photo</div>
                    <div style="font-size:var(--fs-xs); color:var(--text-tertiary);">Take a photo of your handwritten text</div>
                </div>
            </div>

            <!-- Preview (hidden by default) -->
            <div id="hw-preview-area" style="display:none; margin-top:var(--sp-4); text-align:center;">
                <img id="hw-preview-img" class="hw-upload__preview" alt="Your handwriting">
                <div style="margin-top:var(--sp-3); display:flex; gap:var(--sp-2);">
                    <button class="btn btn--primary btn--full" id="hw-analyze" style="display:flex; align-items:center; justify-content:center; gap:8px;">
                        ${LangyIcons.brain} Analyze Handwriting
                    </button>
                    <button class="btn btn--ghost" id="hw-retake" style="display:flex; align-items:center; gap:6px;">
                        ${LangyIcons.refreshCw}
                    </button>
                </div>
            </div>

            <!-- AI Feedback (shown after analysis) -->
            <div id="hw-feedback-area"></div>

            <!-- Tips card -->
            <div class="card" style="padding:var(--sp-4); margin-top:var(--sp-5); border:1px solid rgba(16,185,129,0.15); background:rgba(16,185,129,0.03);">
                <h4 style="margin-bottom:var(--sp-2); display:flex; align-items:center; gap:8px;">
                    <span style="color:var(--primary);">${LangyIcons.zap}</span> Tips for Best Results
                </h4>
                <ul style="font-size:var(--fs-xs); color:var(--text-secondary); line-height:1.8; padding-left:var(--sp-4); margin:0;">
                    <li>Write on white/lined paper with good lighting</li>
                    <li>Use a dark pen or pencil for better contrast</li>
                    <li>Keep the photo straight and focused</li>
                    <li>Write at least 2-3 sentences for meaningful feedback</li>
                </ul>
            </div>
        </div>
    `;
}

function setupHandwritingTab(container) {
    const fileInput = container.querySelector('#hw-file-input');
    const uploadZone = container.querySelector('#hw-upload-zone');
    const previewArea = container.querySelector('#hw-preview-area');
    const previewImg = container.querySelector('#hw-preview-img');
    const feedbackArea = container.querySelector('#hw-feedback-area');
    let imageBase64 = null;

    // Click to upload
    uploadZone?.addEventListener('click', () => fileInput?.click());

    // Drag and drop
    uploadZone?.addEventListener('dragover', e => {
        e.preventDefault();
        uploadZone.classList.add('hw-upload--dragover');
    });
    uploadZone?.addEventListener('dragleave', () => uploadZone.classList.remove('hw-upload--dragover'));
    uploadZone?.addEventListener('drop', e => {
        e.preventDefault();
        uploadZone.classList.remove('hw-upload--dragover');
        const file = e.dataTransfer?.files?.[0];
        if (file) handleImageFile(file);
    });

    // File selected
    fileInput?.addEventListener('change', () => {
        const file = fileInput.files?.[0];
        if (file) handleImageFile(file);
    });

    function handleImageFile(file) {
        if (!file.type.startsWith('image/')) {
            Anim.showToast('Please upload an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = e => {
            imageBase64 = e.target.result;
            if (previewImg) previewImg.src = imageBase64;
            if (uploadZone) uploadZone.style.display = 'none';
            if (previewArea) previewArea.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Retake
    container.querySelector('#hw-retake')?.addEventListener('click', () => {
        imageBase64 = null;
        if (uploadZone) uploadZone.style.display = '';
        if (previewArea) previewArea.style.display = 'none';
        if (feedbackArea) feedbackArea.innerHTML = '';
        if (fileInput) fileInput.value = '';
    });

    // Analyze
    container.querySelector('#hw-analyze')?.addEventListener('click', async () => {
        if (!imageBase64) return;

        if (feedbackArea) {
            feedbackArea.innerHTML = `
                <div class="hw-feedback__loading" style="margin-top:var(--sp-4);">
                    <span></span><span></span><span></span>
                    <span style="animation:none; width:auto; height:auto; background:none; margin-left:var(--sp-2);">Analyzing your handwriting...</span>
                </div>
            `;
        }

        try {
            const level = LangyState?.user?.level || 'B1';

            // Extract base64 data (remove data:image/...;base64, prefix)
            const base64Data = imageBase64.split(',')[1];
            const mimeType = imageBase64.match(/data:(.*?);/)?.[1] || 'image/jpeg';

            const prompt = `You are an expert English teacher and handwriting analyst.
A student at ${level} level has submitted a photo of their handwritten English text.

Analyze BOTH the content AND the quality of handwriting. Provide feedback in this format (plain text, no markdown):

TRANSCRIPTION:
[What you can read from the handwriting]

CONTENT ANALYSIS:
- Grammar: [errors and corrections]
- Spelling: [misspelled words with corrections]
- Vocabulary: [level assessment]
- Sentence structure: [feedback]

HANDWRITING QUALITY:
- Legibility: [how easy to read, 1-10 scale]
- Letter formation: [specific issues with letters]
- Spacing: [word and letter spacing feedback]
- Consistency: [size consistency, baseline]
- Overall grade: [A/B/C/D]

TIPS TO IMPROVE:
- [2-3 specific, actionable tips for better handwriting]
- [1-2 tips for better English writing]

CORRECTED VERSION:
[The text rewritten correctly]

Be encouraging but specific. If you cannot read some parts, mention that.`;

            const response = await fetch(LangyAI.API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: LangyAI.MODEL,
                    messages: [
                        {
                            role: 'user',
                            content: [
                                { type: 'text', text: prompt },
                                { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Data}` } },
                            ],
                        },
                    ],
                    max_tokens: 800,
                    temperature: 0.5,
                }),
            });

            if (!response.ok) throw new Error('AI unavailable');
            const data = await response.json();
            const feedback =
                data.choices?.[0]?.message?.content || 'Could not analyze the image. Try again with a clearer photo.';

            if (feedbackArea) {
                feedbackArea.innerHTML = `
                    <div class="hw-feedback" style="margin-top:var(--sp-4);">
                        <h4 style="margin-bottom:var(--sp-3); display:flex; align-items:center; gap:8px;">
                            <span style="color:#F59E0B;">${LangyIcons.brain}</span> Handwriting Analysis
                        </h4>
                        <div style="font-size:var(--fs-sm); color:var(--text-secondary); line-height:1.8; white-space:pre-line;">${escapeHTML(feedback)}</div>
                    </div>
                `;
            }

            // Award XP
            if (typeof LangyState !== 'undefined') {
                LangyState.user.xp += 30;
                LangyState.progress.skills.writing = Math.min(100, (LangyState.progress.skills.writing || 0) + 3);
                if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
                Anim.showToast('+30 XP for handwriting practice!');
            }
        } catch (err) {
            console.error('Handwriting analysis error:', err);
            if (feedbackArea) {
                feedbackArea.innerHTML = `
                    <div class="hw-feedback" style="border-color:var(--danger);">
                        <p style="color:var(--danger); font-size:var(--fs-sm);">
                            Could not analyze your handwriting. This feature requires a vision-capable AI model.
                            Please check your connection and try again.
                        </p>
                    </div>
                `;
            }
        }
    });
}

// ─── Homework Error Review (unchanged) ───
function showHomeworkErrors(itemId) {
    const item = LangyState.progress.lessonHistory.find(h => h.id == itemId);
    if (!item) return;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay__sheet">
            <div class="overlay__handle"></div>
            <h3 style="margin-bottom: var(--sp-4);">${item.title}</h3>
            <div style="display:flex; gap:var(--sp-4); margin-bottom:var(--sp-4);">
                <div class="stat">
                    <div class="stat__value" style="color: ${item.score >= 80 ? 'var(--accent-dark)' : 'var(--danger)'};">${item.score}%</div>
                    <div class="stat__label">Score</div>
                </div>
                <div class="stat">
                    <div class="stat__value">${item.grade || '-'}</div>
                    <div class="stat__label">Grade</div>
                </div>
                <div class="stat">
                    <div class="stat__value">${item.errors || 0}</div>
                    <div class="stat__label">Errors</div>
                </div>
            </div>

            <h4 style="margin-bottom: var(--sp-3);">Feedback</h4>
            <div style="display:flex; flex-direction:column; gap:var(--sp-2);">
                <div class="card card--flat" style="padding:var(--sp-3); border-left:4px solid var(--primary);">
                    <div style="font-size:var(--fs-sm); line-height:1.5;">${escapeHTML(item.feedback || 'Good work on this unit! Keep practicing to improve your score.')}</div>
                </div>
            </div>

            <button class="btn btn--primary btn--full" style="margin-top:var(--sp-5);" id="error-close">Got it!</button>
            ${item.score < 70 ? `<button class="btn btn--ghost btn--full" style="margin-top:var(--sp-2); display:flex; align-items:center; justify-content:center; gap:8px;" id="error-retry">${LangyIcons.refresh} Retry This Lesson</button>` : ''}
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.remove();
    });
    overlay.querySelector('#error-close')?.addEventListener('click', () => overlay.remove());
    overlay.querySelector('#error-retry')?.addEventListener('click', () => {
        overlay.remove();
        Router.navigate('learning', { mode: 'homework', unitId: item.unitId });
    });
}

Router.register('homework', renderHomework);

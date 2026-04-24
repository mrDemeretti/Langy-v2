/* ============================================
   DAILY SPEAKING RITUAL — Lightweight v1
   Rotates scenario + target phrase by day.
   Renders a card on home screen.
   ============================================ */

const DailySpeaking = (() => {
    // Daily scenarios — rotated by day of year
    const rituals = [
        { scenarioId: 'coffee', phrase: "I'd like a large latte, please", skill: 'Ordering & politeness' },
        { scenarioId: 'airport', phrase: 'Excuse me, where is gate 12?', skill: 'Asking for directions' },
        { scenarioId: 'restaurant', phrase: 'Could I have the check, please?', skill: 'Restaurant English' },
        { scenarioId: 'roommate', phrase: 'What do you usually do on weekends?', skill: 'Small talk' },
        { scenarioId: 'interview', phrase: "I'm passionate about learning new things", skill: 'Talking about yourself' },
        { scenarioId: 'doctor', phrase: "I've had a headache since yesterday", skill: 'Describing how you feel' },
        { scenarioId: 'shopping', phrase: 'Do you have this in a different size?', skill: 'Shopping phrases' },
        { scenarioId: 'free', phrase: "I've been meaning to tell you about...", skill: 'Natural conversation' },
        { scenarioId: 'coffee', phrase: 'Is there somewhere I can sit and work?', skill: 'Making requests' },
        { scenarioId: 'restaurant', phrase: "I'm allergic to nuts — does this contain any?", skill: 'Safety phrases' },
        { scenarioId: 'airport', phrase: 'My luggage didn\'t arrive. Who can I talk to?', skill: 'Problem solving' },
        { scenarioId: 'roommate', phrase: 'Would you mind if I had some friends over?', skill: 'Polite requests' },
        { scenarioId: 'interview', phrase: 'Could you tell me more about the team?', skill: 'Asking questions' },
        { scenarioId: 'free', phrase: 'Have you ever tried something completely new?', skill: 'Past experiences' },
    ];

    function getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        return Math.floor((now - start) / 86400000);
    }

    function getToday() {
        const idx = getDayOfYear() % rituals.length;
        const ritual = rituals[idx];
        const scenario = TalkEngine.scenarios.find(s => s.id === ritual.scenarioId) || TalkEngine.scenarios[0];
        return { ...ritual, scenario };
    }

    function isDoneToday() {
        const todayISO = new Date().toISOString().split('T')[0];
        const history = LangyState.talkHistory || [];
        return history.some(h => h.date && h.date.startsWith(todayISO));
    }

    function renderCard() {
        const daily = getToday();
        const done = isDoneToday();
        const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
        const mascotId = LangyState.mascot?.selected || 0;
        const mascotName = ['Zendaya', 'Travis', 'Matthew', 'Omar'][mascotId];
        const mascotColors = { 0: '#7C6CF6', 1: '#4ADE80', 2: '#F59E0B', 3: '#06B6D4' };
        const color = mascotColors[mascotId] || 'var(--primary)';

        if (done) {
            return `
                <div class="daily-speak" id="daily-speak-card" style="
                    margin:0 var(--sp-5) var(--sp-3); padding:var(--sp-4);
                    border-radius:var(--radius-lg); cursor:pointer;
                    background:var(--bg-card); border:1px solid var(--border);
                    display:flex; align-items:center; gap:var(--sp-3);
                    opacity:0.7;">
                    <div style="width:36px;height:36px;border-radius:50%;background:var(--primary-bg);
                                display:flex;align-items:center;justify-content:center;color:var(--primary);font-size:18px;">
                        ${LangyIcons.check}
                    </div>
                    <div style="flex:1;">
                        <div style="font-weight:var(--fw-bold);font-size:var(--fs-sm);color:var(--primary);">
                            ${{ en: "Today's speaking done!", ru: 'Разговор на сегодня выполнен!', es: '¡Conversación de hoy completada!' }[lang]}
                        </div>
                        <div style="font-size:var(--fs-xs);color:var(--text-tertiary);margin-top:2px;">
                            ${{ en: 'Come back tomorrow for a new scenario', ru: 'Завтра будет новый сценарий', es: 'Vuelve mañana para un nuevo escenario' }[lang]}
                        </div>
                    </div>
                </div>
            `;
        }

        return `
            <div class="daily-speak" id="daily-speak-card" style="
                margin:0 var(--sp-5) var(--sp-3); padding:var(--sp-4);
                border-radius:var(--radius-lg); cursor:pointer;
                background:linear-gradient(135deg, ${color}10, ${color}05);
                border:1px solid ${color}25;
                transition:transform 0.2s var(--ease-out);"
                onmousedown="this.style.transform='scale(0.98)'"
                onmouseup="this.style.transform='scale(1)'">
                <div style="display:flex;align-items:center;gap:var(--sp-2);margin-bottom:var(--sp-3);">
                    <div style="width:28px;height:28px;border-radius:50%;background:${color}15;
                                display:flex;align-items:center;justify-content:center;color:${color};font-size:14px;">
                        ${LangyIcons.mic}
                    </div>
                    <span style="font-weight:var(--fw-bold);font-size:var(--fs-sm);color:${color};">
                        ${{ en: "Today's speaking", ru: 'Разговор дня', es: 'Conversación del día' }[lang]}
                    </span>
                    <span style="margin-left:auto;font-size:var(--fs-xs);color:var(--text-tertiary);">
                        ${daily.scenario.title}
                    </span>
                </div>
                <div style="background:var(--bg-card);border-radius:var(--radius-md);padding:var(--sp-3);margin-bottom:var(--sp-3);">
                    <div style="font-size:var(--fs-xs);color:var(--text-tertiary);margin-bottom:4px;">
                        ${{ en: 'Try saying:', ru: 'Попробуй сказать:', es: 'Intenta decir:' }[lang]}
                    </div>
                    <div style="font-size:var(--fs-base);font-weight:var(--fw-semibold);color:var(--text);font-style:italic;">
                        "${daily.phrase}"
                    </div>
                </div>
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span style="font-size:var(--fs-xs);color:var(--text-tertiary);">
                        ${LangyIcons.target} ${daily.skill}
                    </span>
                    <span style="font-size:var(--fs-sm);font-weight:var(--fw-bold);color:${color};display:flex;align-items:center;gap:4px;">
                        ${{ en: 'Start', ru: 'Начать', es: 'Empezar' }[lang]} ${LangyIcons.arrowRight}
                    </span>
                </div>
            </div>
        `;
    }

    function launchDaily() {
        const daily = getToday();
        const mascotId = LangyState.mascot?.selected || 0;
        ScreenState.set('talkMascot', mascotId);
        ScreenState.set('talkScenario', daily.scenarioId);
        ScreenState.set('talkView', 'call');
        Router.navigate('talk');
    }

    return { getToday, isDoneToday, renderCard, launchDaily, rituals };
})();

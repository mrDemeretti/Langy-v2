const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/newco/Desktop/Langy/src/screens';

const rawLog = `calendar.js:258: <h4 style="margin:0;">📊 Activity Trend</h4>
calendar.js:288: <div style="font-size:32px; margin-bottom:var(--sp-2);">😴</div>
calendar.js:319: <h4 style="margin-bottom:var(--sp-3);">📅 \${formatted}</h4>
calendar.js:360: <div style="font-size:28px; margin-bottom:var(--sp-2);">👆</div>
daily.js:67: \${allDone ? '<span style="color:var(--accent-dark); font-weight:bold;">✓ Earned!</span>' : ''}
daily.js:85: \${task.done ? '✓' : ''}
donation.js:43: <div class="donation__method-icon" style="background:rgba(59,130,246,0.1);">💳</div>
donation.js:51: <div class="donation__method-icon" style="background:rgba(74,222,128,0.1);">💎</div>
donation.js:59: <div class="donation__method-icon" style="background:rgba(124,108,246,0.1);">💠</div>
donation.js:105: <button class="btn btn--accent btn--full" style="margin-top:var(--sp-4);" id="donation-copy">📋 Copy Address</button>
donation.js:139: 🔒 Secure payment • Cancel anytime
donation.js:155: Anim.showToast('Address copied! 📋');
donation.js:163: Anim.showToast(\`Payment successful! You received \${plan.amount} \${plan.currency === 'langy' ? 'Langy' : 'Dangy'} 🎉\`);
duels.js:154: <div class="duel-fighter__mascot">🧑‍🎓</div>
duels.js:162: <div class="duel-fighter__mascot">🤖</div>
duels.js:172: <div class="timer" id="duel-timer">⏱ 10</div>
duels.js:193: if (timerEl) timerEl.innerHTML = \`⏱ \${timeLeft}\`;
duels.js:249: <div style="font-size:80px;">\${won ? '🎉' : tied ? '🤝' : '😤'}</div>
duels.js:267: <span>🎁</span>
events.js:30: <span>⏰ \${event.timeLeft} left</span>
events.js:31: <span class="badge badge--gold">🎁 \${event.reward}</span>
events.js:44: Anim.showToast('Event details coming soon! 🎉');
homework.js:54: Anim.showToast('Starting Homework with DeepTutor... 📚');
homework.js:101: <div class="empty-state__icon">🎉</div>
homework.js:108: <div class="homework-card__icon" style="background: var(--primary-bg);">\${item.icon || '📝'}</div>
homework.js:128: <div class="homework-card__icon" style="background: \${item.status === 'error' ? 'var(--danger-bg)' : 'var(--accent-bg)'};">\${item.icon || '📝'}</div>
homework.js:134: \${item.status === 'error' ? 'Review ⚠️' : 'Done ✓'}
homework.js:173: \${item.score < 70 ? \`<button class="btn btn--ghost btn--full" style="margin-top:var(--sp-2);" id="error-retry">🔄 Retry This Lesson</button>\` : ''}
interests.js:9: { id: 'tech', name: 'Tech & AI', emoji: '💻' },
interests.js:10: { id: 'music', name: 'Music & Concerts', emoji: '🎸' },
interests.js:13: { id: 'business', name: 'Business & Career', emoji: '👔' },
interests.js:72: Anim.showToast('Tailoring your curriculum... 🧵');
inventory.js:30: \${equipped.hat ? equipped.hat.emoji : '🎩'}
inventory.js:33: \${equipped.accessory ? equipped.accessory.emoji : '💎'}
inventory.js:36: \${equipped.shirt ? equipped.shirt.emoji : '👕'}
inventory.js:95: Anim.showToast(\`\${item.name} equipped! ✨\`);
learning.js:388: // ✅ FIX #1: Ask AI during exercises
learning.js:983: // ✅ FIX #4: Generate homework after every lesson
mascot-select.js:30: \${selected === m.id ? '<div class="badge badge--primary">Selected ✓</div>' : ''}
onboarding.js:98: { id: 'work', emoji: '💼', label: 'Работа и карьера' },
onboarding.js:100: { id: 'gaming', emoji: '🎮', label: 'Игры' },
onboarding.js:102: { id: 'tech', emoji: '💻', label: 'IT и технологии' },
onboarding.js:104: { id: 'food', emoji: '🍕', label: 'Еда и кулинария' },
onboarding.js:107: { id: 'exams', emoji: '🎓', label: 'Экзамены (IELTS, TOEFL)' },
onboarding.js:250: Anim.showToast(\`\${['Zendaya', 'Travis Scott', 'Matthew', 'Omar'][selectedMascot]} будет твоим учителем! 🎉\`);
placement-test.js:33: { emoji: '🍌', label: 'Banana' },
placement-test.js:35: { emoji: '🍇', label: 'Grape' }
placement-test.js:102: { emoji: '☁️', label: 'Cloudy' },
placement-test.js:300: 🚀 Начать тест / Start Test
placement-test.js:451: writing: { name: 'Письмо / Writing', icon: '✍️' },
placement-test.js:486: 🚀 Начать обучение / Start Learning
profile.js:334: Anim.showToast('Logged out. See you soon! 👋');
profile.js:339: Anim.showToast('Invite link copied to clipboard! 📋');
profile.js:376: \${LangyState.settings.languageLevel === level.split(' ')[0] ? '<span style="color:var(--primary);">✓</span>' : ''}
profile.js:479: { label: 'Relaxed', time: '5 min/day', icon: '☕' },
profile.js:480: { label: 'Normal', time: '15 min/day', icon: '🚶' },
profile.js:481: { label: 'Serious', time: '30 min/day', icon: '🏃' },
profile.js:591: <button class="btn btn--primary btn--full" style="background:var(--reward-gold); color:white; border:none; box-shadow:0 4px 0 #b47306;" onclick="Anim.showToast('Premium Activated! You are amazing. 🎉'); this.closest('.overlay').remove();">
results.js:49: \${activeTb ? \`<div style="font-size:var(--fs-xs); color:var(--text-tertiary); margin-top:var(--sp-1);">📘 \${activeTb.title}</div>\` : ''}
results.js:54: <div style="font-size:36px;">\${avgScore >= 80 ? '🏆' : avgScore >= 60 ? '📊' : '💪'}</div>
results.js:60: <div style="color:var(--accent-dark); font-weight:var(--fw-bold);">\${completedLessons.length} ✅</div>
results.js:70: const icons = { vocabulary: '📚', grammar: '✏️', listening: '🎧', speaking: '🎤', writing: '📝', reading: '📖' };
results.js:75: <span>\${icons[skill] || '📊'} \${skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
results.js:95: <span style="font-size:16px;">\${lesson.icon || (lesson.status === 'done' ? '✅' : '⚠️')}</span>
results.js:104: : '<div class="text-center text-xs text-secondary" style="padding:var(--sp-4);">No lessons completed yet. Start learning to see your progress! 📘</div>'
results.js:112: <h4 style="margin-bottom:var(--sp-3); padding-left:var(--sp-1);">⚠️ Areas to Improve</h4>
results.js:116: <span style="color:var(--danger);">✗</span> \${m.question || m.context || 'Grammar mistake'}
shop.js:124: Anim.showToast(\`\${item.name} purchased! 🎉\`);
streak.js:86: { days: 90,  emoji: '👑', reward: '600 Dangy + 100 Langy', label: '3 Months' },
streak.js:88: { days: 365, emoji: '🏅', reward: '2000 Dangy + 500 Langy', label: '1 Year' },
streak.js:202: <span>🛡️ Freeze</span>
tests.js:12: { key: 'grammar', name: 'Grammar', icon: '✏️', color: 'rgba(59,130,246,0.1)' },
textbooks.js:84: png: LangyIcons.image, jpg: LangyIcons.image, jpeg: LangyIcons.image, gif: LangyIcons.image, webp: '🖼️'
textbooks.js:266: png: LangyIcons.image, jpg: LangyIcons.image, jpeg: LangyIcons.image, gif: LangyIcons.image, webp: '🖼️'`;

const map = {
    '🍎': 'heart', '⚡': 'zap', '🎉': 'sparkles', '✨': 'sparkles', '🌟': 'sparkles', '⭐': 'star',
    '☁️': 'moon', '☁': 'moon', '🛡️': 'shield', '🛡': 'shield', '📊': 'barChart',
    '😴': 'moon', '📅': 'calendar', '👆': 'arrow', '✓': 'check', '✅': 'check',
    '💳': 'shield', '💎': 'diamond', '💠': 'diamond', '📋': 'clipboard', '🔒': 'lock',
    '🧑‍🎓': 'user', '🧑': 'user', '🎓': 'graduationCap', '🤖': 'brain', '⏱': 'clock',
    '🤝': 'users', '😤': 'flame', '🎁': 'gift', '⏰': 'clock', '📚': 'book',
    '📝': 'clipboard', '📭': 'messageCircle', '⚠️': 'alertCircle', '⚠': 'alertCircle',
    '🔄': 'refresh', '🎬': 'play', '🌍': 'globe', '💻': 'globe', '🎸': 'volume',
    '🍳': 'info', '⚽': 'award', '👔': 'clipboard', '🎮': 'play', '🧵': 'edit',
    '🎩': 'user', '👕': 'user', '👖': 'user', '👟': 'user', '➕': 'plus',
    '🎒': 'clipboard', '🏆': 'trophy', '🚀': 'rocket', '✈️': 'globe', '✈': 'globe',
    '💼': 'clipboard', '🎵': 'volume', '🍕': 'info', '💬': 'messageCircle', '🌸': 'heart',
    '🌵': 'sun', '😎': 'user', '🧬': 'brain', '🍌': 'sun', '🍊': 'sun', '🍇': 'moon',
    '☀️': 'sun', '☀': 'sun', '🌧️': 'moon', '🌧': 'moon', '❄️': 'star', '❄': 'star',
    '📖': 'bookOpen', '🎧': 'headphones', '✍️': 'pencil', '✍': 'pencil', '🎤': 'mic',
    '👋': 'messageCircle', '☕': 'info', '🚶': 'user', '🏃': 'zap', '🔥': 'flame',
    '📘': 'book', '💪': 'award', '✏️': 'pencil', '✏': 'pencil', '❌': 'x', '✗': 'x',
    '🪙': 'coins', '🔮': 'diamond', '🛒': 'gift', '😊': 'checkCircle', '😢': 'alertCircle',
    '👑': 'crown', '🏅': 'medal', '🔘': 'info', '📄': 'clipboard', '📃': 'clipboard',
    '📜': 'clipboard', '🌐': 'globe', '🖼️': 'book', '🖼': 'book', '📁': 'clipboard',
    '📷': 'user', '📎': 'plus'
};

const lines = rawLog.split('\\n').filter(Boolean);
const fileEdits = {};

lines.forEach(line => {
    let splits = line.split(':');
    let f = splits[0];
    let num = parseInt(splits[1]);
    let t = splits.slice(2).join(':').trim(); // original text of that line
    if (!fileEdits[f]) fileEdits[f] = [];
    fileEdits[f].push({num, text: t});
});

for (let f in fileEdits) {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    let changed = false;
    
    // Convert lines into an array
    let contentLines = content.split('\\n');
    
    fileEdits[f].forEach(edit => {
        let i = edit.num - 1; // 0-indexed
        let lineTarget = contentLines[i];
        
        let newLine = lineTarget;
        
        // Find the emojis in this line
        for (let char of Object.keys(map)) {
            if (newLine.includes(char)) {
                let icon = map[char];
                // 3 cases: 
                // 1. Emoji is inside 'string': '🎉' -> LangyIcons.sparkles
                // 2. Emoji is part of a longer string parameter Anim.showToast('... 🎉') -> \`... \${LangyIcons.sparkles}\`
                // 3. Emoji is in HTML >🎉< -> >\${LangyIcons.sparkles}<
                
                // Brute force naive replacements for exact matches to keep it simple:
                let naiveFrom = \`>\${char}<\`;
                let naiveTo = \`>\${LangyIcons.\${icon}}<\`;
                if (newLine.includes(naiveFrom)) newLine = newLine.split(naiveFrom).join(naiveTo);
                
                if (newLine.includes(\`'\${char}'\`)) newLine = newLine.split(\`'\${char}'\`).join(\`LangyIcons.\${icon}\`);
                if (newLine.includes(\`"\${char}"\`)) newLine = newLine.split(\`"\${char}"\`).join(\`LangyIcons.\${icon}\`);
                if (newLine.includes(\`emoji: '\${char}'\`)) newLine = newLine.split(\`emoji: '\${char}'\`).join(\`emoji: LangyIcons.\${icon}\`);
                if (newLine.includes(\`icon: '\${char}'\`)) newLine = newLine.split(\`icon: '\${char}'\`).join(\`icon: LangyIcons.\${icon}\`);
                if (newLine.includes(\`'\${char} \`)) newLine = newLine.split(\`'\${char} \`).join(\`\${LangyIcons.\${icon}} \`);
                if (newLine.includes(\` \${char}'\`)) newLine = newLine.split(\` \${char}'\`).join(\` \${LangyIcons.\${icon}}\`);
                
                // If it's a Toast with string, wrap it in backticks and use literal injection
                if (newLine.includes('Anim.showToast(')) {
                     // find if it's single quoted.
                     if (newLine.includes(\`'\`) && newLine.includes(char)) {
                         newLine = newLine.replace(/'([^']*)'/g, (m, str) => {
                             if(str.includes(char)) return \`\\\`\${str.replace(char, \`\${LangyIcons.\${icon}}\`)}\\\`\`;
                             return m;
                         });
                     }
                }

                // If still has char, replace directly:
                if (newLine.includes(char)) {
                    newLine = newLine.split(char).join(\`\${LangyIcons.\${icon}}\`);
                }
            }
        }
        
        if (newLine !== lineTarget) {
            contentLines[i] = newLine;
            changed = true;
        }
    });
    
    if (changed) {
        fs.writeFileSync(path.join(dir, f), contentLines.join('\\n'));
        console.log('Updated', f);
    }
}

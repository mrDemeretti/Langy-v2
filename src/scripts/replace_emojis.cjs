const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/newco/Desktop/Langy/src/screens';
const files = ['calendar.js', 'donation.js', 'duels.js', 'homework.js', 'interests.js', 'inventory.js', 'onboarding.js', 'placement-test.js', 'shop.js', 'streak.js', 'subscription.js', 'tests.js', 'textbooks.js', 'auth.js'];

const replacements = [
	{from: "'👖'", to: "LangyIcons.user"},
	{from: "'👟'", to: "LangyIcons.user"},
	{from: "➕", to: "${LangyIcons.plus}"},
	{from: ">🎒<", to: ">${LangyIcons.user}<"},
	{from: "✨`;", to: "${LangyIcons.sparkles}`;"},
	{from: "emoji: '🌍'", to: "emoji: LangyIcons.globe"},
	{from: "emoji: '🤖'", to: "emoji: LangyIcons.brain"},
	{from: "emoji: '🏆'", to: "emoji: LangyIcons.trophy"},
	{from: "'Начнём! 🚀'", to: "`Начнём! ${LangyIcons.rocket}`"},
	{from: "'Далее →'", to: "`Далее ${LangyIcons.arrowRight}`"},
	{from: "emoji: '✈️'", to: "emoji: LangyIcons.globe"},
	{from: "emoji: '🎬'", to: "emoji: LangyIcons.play"},
	{from: "emoji: '🎵'", to: "emoji: LangyIcons.volume"},
	{from: "emoji: '⚽'", to: "emoji: LangyIcons.award"},
	{from: "emoji: '📚'", to: "emoji: LangyIcons.book"},
	{from: "emoji: '💬'", to: "emoji: LangyIcons.messageCircle"},
	{from: "emoji: '📊'", to: "emoji: LangyIcons.barChart"},
	{from: "emoji: '🌸'", to: "emoji: LangyIcons.sparkles"},
	{from: "emoji: '🌵'", to: "emoji: LangyIcons.zap"},
	{from: "emoji: '😎'", to: "emoji: LangyIcons.user"},
	{from: "✓<", to: "${LangyIcons.check}<"},
	{from: "🧬", to: "${LangyIcons.brain}"},
	{from: "🎉`;", to: "${LangyIcons.sparkles}`;"},
	{from: "emoji: '🍎'", to: "emoji: LangyIcons.heart"},
	{from: "emoji: '🍊'", to: "emoji: LangyIcons.sun"},
	{from: "emoji: '☀️'", to: "emoji: LangyIcons.sun"},
	{from: "emoji: '🌧️'", to: "emoji: LangyIcons.moon"},
	{from: "emoji: '❄️'", to: "emoji: LangyIcons.star"},
	{from: ">🧬<", to: ">${LangyIcons.brain}<"},
	{from: ">📝<", to: ">${LangyIcons.fileText}<"},
	{from: ">📖<", to: ">${LangyIcons.bookOpen}<"},
	{from: ">🎧<", to: ">${LangyIcons.headphones}<"},
	{from: ">✍️<", to: ">${LangyIcons.pencil}<"},
	{from: ">🎤<", to: ">${LangyIcons.mic}<"},
	{from: ">🚀 Начать тест / Start Test<", to: ">${LangyIcons.rocket} Начать тест / Start Test<"},
	{from: "icon: '📝'", to: "icon: LangyIcons.fileText"},
	{from: "icon: '📚'", to: "icon: LangyIcons.book"},
	{from: "icon: '🎧'", to: "icon: LangyIcons.headphones"},
	{from: "icon: '🎤'", to: "icon: LangyIcons.mic"},
	{from: "'📊'", to: "LangyIcons.barChart"},
	{from: "<h4>📚 Подобранный учебник:</h4>", to: "<h4 style='display:flex; align-items:center; gap:8px;'>${LangyIcons.book} Подобранный учебник:</h4>"},
	{from: ">🚀 Начать обучение / Start Learning<", to: ">${LangyIcons.rocket} Начать обучение / Start Learning<"},
	{from: "Premium ✨", to: "Premium ${LangyIcons.sparkles}"},
	{from: "'🪙' : '🔮'", to: "LangyIcons.coins : LangyIcons.diamond"},
	{from: ">🛒<", to: ">${LangyIcons.shoppingCart}<"},
	{from: "😊');", to: "${LangyIcons.checkCircle}`);"},
	{from: "🎉');", to: "${LangyIcons.check}`);"},
	{from: "😢');", to: "${LangyIcons.alertCircle}`);"},
	{from: "'🛡️ Max freezes reached!'", to: "`${LangyIcons.shield} Max freezes reached!`"},
	{from: "'❌ Not enough Dangy!'", to: "`${LangyIcons.alertCircle} Not enough Dangy!`"},
	{from: "`🛡️ Streak Freeze bought! (${sd.streakFreezes}/${max})`", to: "`${LangyIcons.shield} Streak Freeze bought! (${sd.streakFreezes}/${max})`"},
	{from: ">🔥<", to: ">${LangyIcons.flame}<"},
	{from: ">🛡️<", to: ">${LangyIcons.shield}<"},
	{from: "'🔥' : '•'", to: "LangyIcons.flame : '•'"},
	{from: "emoji: '🌟'", to: "emoji: LangyIcons.star"},
	{from: "emoji: '💎'", to: "emoji: LangyIcons.diamond"},
	{from: "emoji: '🔥'", to: "emoji: LangyIcons.flame"},
	{from: "✅ Earned<", to: "${LangyIcons.check} Earned<"},
	{from: "🏆 Best:", to: "${LangyIcons.trophy} Best:"},
	{from: ">🛡️ Streak Freeze<", to: ">${LangyIcons.shield} Streak Freeze<"},
	{from: "'🛡️' : '🔘'", to: "LangyIcons.shield : LangyIcons.circle"},
	{from: "'🛡️ Max Freezes!' : `🛡️ Buy Freeze", to: "`${LangyIcons.shield} Max Freezes!` : `${LangyIcons.shield} Buy Freeze"},
	{from: "📅 Activity Calendar", to: "${LangyIcons.calendar} Activity Calendar"},
	{from: "🔥 Active", to: "${LangyIcons.flame} Active"},
	{from: "📊 Full Calendar & Stats →", to: "${LangyIcons.barChart} Full Calendar & Stats"},
	{from: "🎁 Streak Rewards", to: "${LangyIcons.gift} Streak Rewards"},
	{from: ">📚<", to: ">${LangyIcons.book}<"},
	{from: ">🚀 Start Learning<", to: ">${LangyIcons.rocket} Start Learning<"},
	{from: "'Free plan activated! 🎉'", to: "`Free plan activated! ${LangyIcons.sparkles}`"},
	{from: "icon: '🎧'", to: "icon: LangyIcons.headphones"},
	{from: "icon: '📖'", to: "icon: LangyIcons.bookOpen"},
	{from: "'Starting new test... 📝'", to: "`Starting new test... ${LangyIcons.fileText}`"},
	{from: ">📭<", to: ">${LangyIcons.inbox}<"},
	{from: ">⚠️<", to: ">${LangyIcons.alertTriangle}<"},
	{from: "📖 Add Textbook", to: "${LangyIcons.bookOpen} Add Textbook"},
	{from: ">📁<", to: ">${LangyIcons.folder}<"},
	{from: "'Textbook added! 📚'", to: "`Textbook added! ${LangyIcons.book}`"},
	{from: "'📄',", to: "LangyIcons.fileText,"},
	{from: "'📝',", to: "LangyIcons.fileText,"},
	{from: "'📃',", to: "LangyIcons.fileText,"},
	{from: "'📊',", to: "LangyIcons.barChart,"},
	{from: "'🌐',", to: "LangyIcons.globe,"},
	{from: "'📚',", to: "LangyIcons.book,"},
	{from: "'📜',", to: "LangyIcons.fileText,"},
	{from: "'🖼️',", to: "LangyIcons.image,"},
	{from: "'📄'", to: "LangyIcons.fileText"},
	{from: "📋 Methodology", to: "${LangyIcons.clipboard} Methodology"},
	{from: "📖 Content Preview", to: "${LangyIcons.bookOpen} Content Preview"},
	{from: "📷 ", to: "${LangyIcons.image} "},
	{from: "📎 ", to: "${LangyIcons.paperclip} "},
	{from: ">🍎<", to: ">${LangyIcons.apple || LangyIcons.globe}<"},
	{from: "⚡ DEV FAST LOGIN", to: "${LangyIcons.zap} DEV FAST LOGIN"},
	{from: "'Welcome back! 🎉'", to: "`Welcome back! ${LangyIcons.sparkles}`"},
	{from: "'Account created! 🎉'", to: "`Account created! ${LangyIcons.sparkles}`"},
	{from: "'Google Sign-In — coming soon with cloud sync! ☁️'", to: "`Google Sign-In — coming soon with cloud sync! ${LangyIcons.cloud}`"},
	{from: "'Apple Sign-In — coming soon with cloud sync! ☁️'", to: "`Apple Sign-In — coming soon with cloud sync! ${LangyIcons.cloud}`"},
	{from: "'Logged in as Test User ⚡'", to: "`Logged in as Test User ${LangyIcons.zap}`"}
];

files.forEach(f => {
  let content = fs.readFileSync(path.join(dir, f), 'utf8');
  let changed = false;
  replacements.forEach(r => {
    if (content.indexOf(r.from) !== -1) {
       content = content.split(r.from).join(r.to);
       changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(path.join(dir, f), content);
    console.log('Updated', f);
  }
});

/* ============================================
   VOCAB TRACKER — Vocabulary Progress Engine
   Connects vocab-banks to user progress, review,
   homework, and the learning path.
   ============================================ */

const VocabTracker = (() => {
    'use strict';

    // ─── Access helpers ───
    function _vp() {
        if (!LangyState.vocabProgress) {
            LangyState.vocabProgress = {
                words: {}, reviewQueue: [], unitStats: {},
                totalLearned: 0, totalMastered: 0, totalReviewed: 0, lastReviewDate: null,
            };
        }
        return LangyState.vocabProgress;
    }

    function _today() {
        const d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }

    // ─── Core: Record a word encounter ───
    // Called after exercises, teach slides, etc.
    function recordWord(en, ru, { correct = true, level = '', category = '' } = {}) {
        const vp = _vp();
        const key = en.toLowerCase().trim();
        if (!key) return;

        if (!vp.words[key]) {
            vp.words[key] = { en: key, ru: ru || '', correct: 0, attempts: 0, lastSeen: null, mastery: 0, level, category };
        }

        const w = vp.words[key];
        w.attempts++;
        if (correct) w.correct++;
        w.lastSeen = _today();
        if (ru) w.ru = ru;
        if (level) w.level = level;
        if (category) w.category = category;

        // Update mastery: 0=new → 1=seen → 2=practiced → 3=mastered
        const accuracy = w.attempts > 0 ? w.correct / w.attempts : 0;
        if (w.attempts >= 3 && accuracy >= 0.8) {
            w.mastery = 3; // mastered
        } else if (w.attempts >= 2 && accuracy >= 0.5) {
            w.mastery = 2; // practiced
        } else if (w.attempts >= 1) {
            w.mastery = Math.max(w.mastery, 1); // seen
        }

        // Update totals
        _recalcTotals();

        // Schedule review if not mastered
        if (w.mastery < 3) {
            _scheduleReview(w, level, category);
        }
    }

    // Record multiple words from a lesson (batch)
    function recordUnitWords(level, unitId, words, { allCorrect = false } = {}) {
        const vp = _vp();
        const unitKey = level + ':' + unitId;

        words.forEach(w => {
            if (w && w.en) {
                recordWord(w.en, w.ru, { correct: allCorrect, level, category: '' });
            }
        });

        // Update unit stats
        if (!vp.unitStats[unitKey]) {
            vp.unitStats[unitKey] = { wordsIntroduced: 0, wordsPracticed: 0, wordsMastered: 0 };
        }

        const unitWords = typeof LangyVocabBank !== 'undefined' ? LangyVocabBank.getForUnit(level, unitId) : [];
        const us = vp.unitStats[unitKey];
        us.wordsIntroduced = unitWords.filter(w => vp.words[w.en?.toLowerCase()]?.mastery >= 1).length;
        us.wordsPracticed = unitWords.filter(w => vp.words[w.en?.toLowerCase()]?.mastery >= 2).length;
        us.wordsMastered = unitWords.filter(w => vp.words[w.en?.toLowerCase()]?.mastery >= 3).length;
    }

    // ─── Review scheduling (lightweight spaced repetition) ───
    function _scheduleReview(wordObj, level, category) {
        const vp = _vp();
        const en = wordObj.en;

        // Remove existing entry for this word
        vp.reviewQueue = vp.reviewQueue.filter(r => r.en !== en);

        // Schedule based on mastery
        const daysUntilReview = wordObj.mastery === 0 ? 1 : wordObj.mastery === 1 ? 2 : 4;
        const due = new Date();
        due.setDate(due.getDate() + daysUntilReview);

        vp.reviewQueue.push({
            en,
            ru: wordObj.ru || '',
            level: level || wordObj.level || '',
            category: category || wordObj.category || '',
            dueDate: due.toISOString().split('T')[0],
        });

        // Cap queue at 100
        if (vp.reviewQueue.length > 100) {
            vp.reviewQueue = vp.reviewQueue.slice(-100);
        }
    }

    // ─── Get words due for review today ───
    function getDueReview(limit = 10) {
        const vp = _vp();
        const today = _today();
        return vp.reviewQueue
            .filter(r => r.dueDate <= today)
            .slice(0, limit);
    }

    // How many words are due today
    function getDueCount() {
        return getDueReview(999).length;
    }

    // Mark a review session done
    function completeReview(words) {
        const vp = _vp();
        vp.totalReviewed++;
        vp.lastReviewDate = _today();

        words.forEach(w => {
            if (w.en) {
                recordWord(w.en, w.ru, { correct: true, level: w.level, category: w.category });
                // Remove from review queue
                vp.reviewQueue = vp.reviewQueue.filter(r => r.en !== w.en);
            }
        });

        if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
    }

    // ─── Unit-scoped stats ───
    function getUnitStats(level, unitId) {
        const vp = _vp();
        const unitKey = level + ':' + unitId;
        const unitWords = typeof LangyVocabBank !== 'undefined' ? LangyVocabBank.getForUnit(level, unitId) : [];
        const total = unitWords.length;

        if (total === 0) return { total: 0, learned: 0, mastered: 0, pct: 0 };

        let learned = 0, mastered = 0;
        unitWords.forEach(w => {
            const key = w.en?.toLowerCase();
            const entry = vp.words[key];
            if (entry) {
                if (entry.mastery >= 1) learned++;
                if (entry.mastery >= 3) mastered++;
            }
        });

        return { total, learned, mastered, pct: Math.round((learned / total) * 100) };
    }

    // ─── Level-wide stats ───
    function getLevelStats(level) {
        if (typeof LangyVocabBank === 'undefined') return { total: 0, learned: 0, mastered: 0, pct: 0 };
        const vp = _vp();
        const allWords = LangyVocabBank[level]?.getAllWords?.() || [];
        const total = allWords.length;
        if (total === 0) return { total: 0, learned: 0, mastered: 0, pct: 0 };

        let learned = 0, mastered = 0;
        allWords.forEach(w => {
            const key = (w.en || w).toLowerCase?.();
            if (key && vp.words[key]) {
                if (vp.words[key].mastery >= 1) learned++;
                if (vp.words[key].mastery >= 3) mastered++;
            }
        });

        return { total, learned, mastered, pct: Math.round((learned / total) * 100) };
    }

    // ─── Global stats ───
    function getGlobalStats() {
        const vp = _vp();
        return {
            totalLearned: vp.totalLearned,
            totalMastered: vp.totalMastered,
            totalReviewed: vp.totalReviewed,
            dueToday: getDueCount(),
            lastReviewDate: vp.lastReviewDate,
        };
    }

    // ─── Current unit vocab (for display) ───
    function getCurrentUnitVocab() {
        if (typeof LangyCurriculum === 'undefined' || typeof LangyVocabBank === 'undefined') return [];
        const tb = LangyCurriculum.getActive();
        if (!tb) return [];
        const unitId = LangyState?.progress?.currentUnitId || 1;
        const level = tb.cefr || 'B1';
        return LangyVocabBank.getForUnit(level, unitId);
    }

    // ─── Words for current unit with mastery status ───
    function getCurrentUnitVocabWithStatus() {
        const words = getCurrentUnitVocab();
        const vp = _vp();
        return words.map(w => {
            const key = w.en?.toLowerCase();
            const entry = vp.words[key];
            return {
                ...w,
                mastery: entry?.mastery || 0,
                attempts: entry?.attempts || 0,
                correct: entry?.correct || 0,
                lastSeen: entry?.lastSeen || null,
            };
        });
    }

    // ─── Weakest vocab words (most errors, lowest mastery) ───
    function getWeakestWords(limit = 5) {
        const vp = _vp();
        return Object.values(vp.words)
            .filter(w => w.mastery < 3 && w.attempts > 0)
            .sort((a, b) => {
                const accA = a.attempts > 0 ? a.correct / a.attempts : 0;
                const accB = b.attempts > 0 ? b.correct / b.attempts : 0;
                return accA - accB; // worst accuracy first
            })
            .slice(0, limit);
    }

    // ─── Recently learned words (for display) ───
    function getRecentWords(limit = 8) {
        const vp = _vp();
        return Object.values(vp.words)
            .filter(w => w.lastSeen)
            .sort((a, b) => (b.lastSeen || '').localeCompare(a.lastSeen || ''))
            .slice(0, limit);
    }

    // ─── Mastery label ───
    function masteryLabel(mastery, lang = 'en') {
        const labels = {
            0: { en: 'New', ru: 'Новое', es: 'Nuevo' },
            1: { en: 'Seen', ru: 'Видел', es: 'Visto' },
            2: { en: 'Practiced', ru: 'Практиковал', es: 'Practicado' },
            3: { en: 'Mastered', ru: 'Освоено', es: 'Dominado' },
        };
        return labels[mastery]?.[lang] || labels[mastery]?.en || 'New';
    }

    function masteryColor(mastery) {
        return ['var(--text-tertiary)', '#F59E0B', '#3B82F6', '#10B981'][mastery] || 'var(--text-tertiary)';
    }

    function masteryIcon(mastery) {
        return ['○', '◐', '◑', '●'][mastery] || '○';
    }

    // ─── Recalculate totals ───
    function _recalcTotals() {
        const vp = _vp();
        const all = Object.values(vp.words);
        vp.totalLearned = all.filter(w => w.mastery >= 1).length;
        vp.totalMastered = all.filter(w => w.mastery >= 3).length;
    }

    // ─── Generate vocab review homework items ───
    function generateVocabHomework() {
        const due = getDueReview(20);
        if (due.length < 3) return null;

        const lang = typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en';
        const wordList = due.slice(0, 8).map(w => w.en).join(', ');

        return {
            id: 'vocab-review-' + _today(),
            unitId: 0,
            title: { en: 'Vocabulary Review', ru: 'Повторение слов', es: 'Repaso de vocabulario' }[lang],
            desc: { en: `Review ${due.length} words: ${wordList}`, ru: `Повторите ${due.length} слов: ${wordList}`, es: `Repasa ${due.length} palabras: ${wordList}` }[lang],
            icon: typeof LangyIcons !== 'undefined' ? LangyIcons.brain : '🧠',
            source: 'vocab_review',
            reason: {
                en: `${due.length} words are due for review today`,
                ru: `${due.length} слов ждут повторения сегодня`,
                es: `${due.length} palabras pendientes de repaso hoy`,
            },
            createdAt: new Date().toISOString(),
            vocabWords: due,
        };
    }

    return {
        recordWord,
        recordUnitWords,
        getDueReview,
        getDueCount,
        completeReview,
        getUnitStats,
        getLevelStats,
        getGlobalStats,
        getCurrentUnitVocab,
        getCurrentUnitVocabWithStatus,
        getWeakestWords,
        getRecentWords,
        masteryLabel,
        masteryColor,
        masteryIcon,
        generateVocabHomework,
    };
})();

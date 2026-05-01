/* ============================================
   LANGY — TARGET LANGUAGE SYSTEM
   Central abstraction for what language the user
   is studying. MVP: English, Spanish, Arabic.
   All screens/systems should read from LangyTarget
   instead of hardcoding 'English'.
   ============================================ */

const LangyTarget = {
    /* ─── Supported target languages (MVP: en, es, ar) ─── */
    LANGUAGES: {
        en: {
            code: 'en',
            name: { en: 'English', ru: 'Английский', es: 'Inglés', ar: 'الإنجليزية' },
            nativeName: 'English',
            flag: '🇬🇧',
            ttsLang: 'en-US',
            sttLang: 'en-US',
            direction: 'ltr',
            cefrLevels: ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            aiTeacherRole: 'English language teacher',
            aiExaminerRole: 'English examiner',
            curriculumId: 'en',
            // Academic backbone — drives AI context and curriculum credibility
            academicBackbone: {
                framework: 'CEFR (Common European Framework of Reference)',
                reference: 'CEFR-aligned communicative progression (original Langy curriculum)',
                methodology: 'Communicative Language Teaching (CLT) with grammar-translation support',
                phonetics: 'IPA-based pronunciation with minimal pairs',
                writingSystem: 'Latin',
                vocabTarget: '~6000 words across Pre-A1–C2 (aligned with CEFR vocabulary expectations)',
            },
            // Which mascots are available for this language
            mascotRoster: [0, 1, 2, 3], // Zendaya, Travis, Matthew, Omar
            // Skill dimensions this language supports
            skills: ['grammar', 'vocabulary', 'listening', 'speaking', 'reading', 'writing'],
            // English track positioning — serious structured learning path
            featured: true,
            tagline: {
                en: 'CEFR-aligned structured English track',
                ru: 'Структурированный курс английского по CEFR',
                es: 'Curso de inglés estructurado alineado al MCER',
            },
            highlights: {
                en: ['CEFR curriculum A1–C2', 'Grammar-aware coaching', 'Vocabulary progression', 'Tutor-led speaking'],
                ru: ['Учебная программа CEFR A1–C2', 'Грамматический коучинг', 'Словарный прогресс', 'Разговор с репетитором'],
                es: ['Currículo MCER A1–C2', 'Coaching gramatical', 'Progresión de vocabulario', 'Conversación guiada'],
            },
        },

        es: {
            code: 'es',
            name: { en: 'Spanish', ru: 'Испанский', es: 'Español', ar: 'الإسبانية' },
            nativeName: 'Español',
            flag: '🇪🇸',
            ttsLang: 'es-ES',
            sttLang: 'es-ES',
            direction: 'ltr',
            cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            aiTeacherRole: 'Spanish language teacher',
            aiExaminerRole: 'Spanish examiner',
            curriculumId: 'es',
            academicBackbone: {
                framework: 'CEFR + Plan Curricular del Instituto Cervantes (PCIC)',
                reference: 'Aula Internacional / ELE-style progression',
                methodology: 'Communicative + task-based approach with cultural immersion',
                phonetics: 'Spanish phonetic system with trill /r/ and ñ focus',
                writingSystem: 'Latin',
            },
            mascotRoster: [0, 1, 3], // Zendaya, Travis, Omar (Matthew stays English-specific)
            skills: ['grammar', 'vocabulary', 'listening', 'speaking', 'reading', 'writing'],
        },

        ar: {
            code: 'ar',
            name: { en: 'Arabic', ru: 'Арабский', es: 'Árabe', ar: 'العربية' },
            nativeName: 'العربية',
            flag: '🇸🇦',
            ttsLang: 'ar-SA',
            sttLang: 'ar-SA',
            direction: 'rtl',
            cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            aiTeacherRole: 'Arabic language teacher (Modern Standard Arabic)',
            aiExaminerRole: 'Arabic examiner',
            curriculumId: 'ar',
            featured: true, // wedge language — gets highlighted treatment on key surfaces
            tagline: {
                en: 'Our deepest Arabic learning experience',
                ru: 'Наш самый глубокий курс арабского',
                es: 'Nuestra experiencia más profunda en árabe',
            },
            highlights: {
                en: ['Script-first methodology', 'MSA + dialect awareness', 'Heritage & religious tracks'],
                ru: ['Методика «скрипт прежде всего»', 'МСА + диалектное сознание', 'Наследие и религиозные треки'],
                es: ['Metodología basada en escritura', 'MSA + conciencia dialectal', 'Herencia y pistas religiosas'],
            },
            academicBackbone: {
                framework: 'CEFR-adapted for Arabic + ACTFL proficiency guidelines',
                reference: 'Al-Kitaab / Arabiyyat al-Naas-style progression',
                methodology: 'Script-first approach with MSA + spoken dialect awareness',
                phonetics: 'Arabic consonant system with emphasis on pharyngeal and uvular sounds',
                writingSystem: 'Arabic script (right-to-left)',
            },
            mascotRoster: [3, 0], // Omar (primary), Zendaya (secondary)
            skills: ['grammar', 'vocabulary', 'listening', 'speaking', 'reading', 'writing', 'script'],
        },
    },

    /* ─── Get current target language config ─── */
    get current() {
        const code = this.getCode();
        return this.LANGUAGES[code] || this.LANGUAGES.en;
    },

    /* ─── Read target language code from state ─── */
    getCode() {
        if (typeof LangyState !== 'undefined' && LangyState.targetLanguage) {
            return LangyState.targetLanguage;
        }
        if (typeof LangyCurriculum !== 'undefined' && LangyCurriculum.targetLanguage) {
            return LangyCurriculum.targetLanguage;
        }
        return 'en'; // default
    },

    /* ─── Convenience accessors ─── */

    /** TTS language code (e.g. 'en-US', 'es-ES', 'ar-SA') */
    get ttsLang() { return this.current.ttsLang; },

    /** STT language code */
    get sttLang() { return this.current.sttLang; },

    /** Text direction: 'ltr' or 'rtl' */
    get direction() { return this.current.direction || 'ltr'; },

    /** Display name in UI language */
    displayName(uiLang) {
        const lang = uiLang || (typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en');
        return this.current.name[lang] || this.current.nativeName;
    },

    /** AI system prompt role */
    get aiTeacherRole() { return this.current.aiTeacherRole; },

    /** AI examiner role */
    get aiExaminerRole() { return this.current.aiExaminerRole; },

    /** Flag emoji */
    get flag() { return this.current.flag; },

    /** Native name of the language */
    get nativeName() { return this.current.nativeName; },

    /** Academic backbone metadata for AI context */
    get academicBackbone() { return this.current.academicBackbone; },

    /** Mascot IDs available for this language */
    get mascotRoster() { return this.current.mascotRoster || [0, 1, 2, 3]; },

    /** Skill dimensions for this language */
    get skills() { return this.current.skills || ['grammar', 'vocabulary', 'listening', 'speaking', 'reading', 'writing']; },

    /** All available target language codes */
    getAvailable() { return Object.keys(this.LANGUAGES); },

    /** Check if a target language is supported */
    isSupported(code) { return code in this.LANGUAGES; },

    /** Set the target language (persists to state) */
    set(code) {
        if (!this.isSupported(code)) {
            console.warn(`[LangyTarget] Unsupported language: ${code}`);
            return false;
        }
        if (typeof LangyState !== 'undefined') {
            LangyState.targetLanguage = code;
        }
        if (typeof LangyCurriculum !== 'undefined') {
            LangyCurriculum.targetLanguage = code;
        }
        // Apply RTL direction to document if needed
        if (typeof document !== 'undefined') {
            const dir = this.LANGUAGES[code].direction || 'ltr';
            document.documentElement.dir = dir;
        }
        return true;
    },

    /** Get curriculum-relevant AI context string for the current language */
    getAcademicContext() {
        const bb = this.academicBackbone;
        if (!bb) return '';
        return `TARGET LANGUAGE: ${this.nativeName}
Academic Framework: ${bb.framework}
Reference Curriculum: ${bb.reference}
Methodology: ${bb.methodology}
Phonetics: ${bb.phonetics}
Writing System: ${bb.writingSystem}`;
    },
};

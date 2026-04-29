/* ============================================
   LANGY — TARGET LANGUAGE SYSTEM
   Central abstraction for what language the user
   is studying. All screens/systems should read
   from LangyTarget instead of hardcoding 'English'.
   ============================================ */

const LangyTarget = {
    /* ─── Supported target languages ─── */
    LANGUAGES: {
        en: {
            code: 'en',
            name: { en: 'English', ru: 'Английский', es: 'Inglés' },
            nativeName: 'English',
            flag: '🇬🇧',
            ttsLang: 'en-US',
            sttLang: 'en-US',
            cefrLevels: ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            aiTeacherRole: 'English language teacher',
            aiExaminerRole: 'English examiner',
            curriculumId: 'en',
        },
        // Future: add more target languages here
        // es: {
        //     code: 'es',
        //     name: { en: 'Spanish', ru: 'Испанский', es: 'Español' },
        //     nativeName: 'Español',
        //     flag: '🇪🇸',
        //     ttsLang: 'es-ES',
        //     sttLang: 'es-ES',
        //     cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
        //     aiTeacherRole: 'Spanish language teacher',
        //     aiExaminerRole: 'Spanish examiner',
        //     curriculumId: 'es',
        // },
        // de: {
        //     code: 'de',
        //     name: { en: 'German', ru: 'Немецкий', es: 'Alemán' },
        //     nativeName: 'Deutsch',
        //     flag: '🇩🇪',
        //     ttsLang: 'de-DE',
        //     sttLang: 'de-DE',
        //     cefrLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
        //     aiTeacherRole: 'German language teacher',
        //     aiExaminerRole: 'German examiner',
        //     curriculumId: 'de',
        // },
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

    /** TTS language code (e.g. 'en-US', 'es-ES') */
    get ttsLang() {
        return this.current.ttsLang;
    },

    /** STT language code (e.g. 'en-US') */
    get sttLang() {
        return this.current.sttLang;
    },

    /** Display name in UI language */
    displayName(uiLang) {
        const lang = uiLang || (typeof LangyI18n !== 'undefined' ? LangyI18n.currentLang : 'en');
        return this.current.name[lang] || this.current.nativeName;
    },

    /** AI system prompt role (e.g. 'English language teacher') */
    get aiTeacherRole() {
        return this.current.aiTeacherRole;
    },

    /** AI examiner role (e.g. 'English examiner') */
    get aiExaminerRole() {
        return this.current.aiExaminerRole;
    },

    /** Flag emoji */
    get flag() {
        return this.current.flag;
    },

    /** Native name of the language */
    get nativeName() {
        return this.current.nativeName;
    },

    /** All available target language codes */
    getAvailable() {
        return Object.keys(this.LANGUAGES);
    },

    /** Check if a target language is supported */
    isSupported(code) {
        return code in this.LANGUAGES;
    },

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
        return true;
    },
};

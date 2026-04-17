/* ============================================
   LANGY i18n — Internationalization System
   Supports: English (default), Russian, Spanish
   Usage: i18n('key') returns the translated string
   ============================================ */

const LangyI18n = {
    currentLang: 'en',
    
    // All translatable UI strings
    translations: {
        // ─── General ───
        'app.name': { en: 'Langy AI', ru: 'Langy AI', es: 'Langy AI' },
        'general.back': { en: 'Back', ru: 'Назад', es: 'Atrás' },
        'general.start': { en: 'Start', ru: 'Начать', es: 'Empezar' },
        'general.continue': { en: 'Continue', ru: 'Продолжить', es: 'Continuar' },
        'general.next': { en: 'Next', ru: 'Далее', es: 'Siguiente' },
        'general.done': { en: 'Done', ru: 'Готово', es: 'Hecho' },
        'general.cancel': { en: 'Cancel', ru: 'Отмена', es: 'Cancelar' },
        'general.save': { en: 'Save', ru: 'Сохранить', es: 'Guardar' },
        'general.close': { en: 'Close', ru: 'Закрыть', es: 'Cerrar' },
        'general.loading': { en: 'Loading...', ru: 'Загрузка...', es: 'Cargando...' },
        'general.error': { en: 'Something went wrong', ru: 'Что-то пошло не так', es: 'Algo salió mal' },
        'general.yes': { en: 'Yes', ru: 'Да', es: 'Sí' },
        'general.no': { en: 'No', ru: 'Нет', es: 'No' },
        'general.details': { en: 'Details', ru: 'Подробнее', es: 'Detalles' },
        'general.level': { en: 'Level', ru: 'Уровень', es: 'Nivel' },
        
        // ─── Auth ───
        'auth.title': { en: 'Learn English', ru: 'Учите Английский', es: 'Aprende Inglés' },
        'auth.subtitle': { en: 'Your AI-powered language journey', ru: 'Ваш ИИ-помощник в изучении языка', es: 'Tu viaje lingüístico con IA' },
        'auth.login': { en: 'Log In', ru: 'Войти', es: 'Iniciar Sesión' },
        'auth.register': { en: 'Sign Up', ru: 'Регистрация', es: 'Registrarse' },
        'auth.email': { en: 'Email', ru: 'Эл. почта', es: 'Correo electrónico' },
        'auth.password': { en: 'Password', ru: 'Пароль', es: 'Contraseña' },
        'auth.name': { en: 'Your Name', ru: 'Ваше имя', es: 'Tu nombre' },
        'auth.forgot': { en: 'Forgot password?', ru: 'Забыли пароль?', es: '¿Olvidaste tu contraseña?' },
        'auth.no_account': { en: "Don't have an account?", ru: 'Нет аккаунта?', es: '¿No tienes cuenta?' },
        'auth.have_account': { en: 'Already have an account?', ru: 'Уже есть аккаунт?', es: '¿Ya tienes cuenta?' },
        
        // ─── Home ───
        'home.streak': { en: 'Day Streak!', ru: 'Дней подряд!', es: '¡Días seguidos!' },
        'home.continue': { en: 'Continue Course', ru: 'Продолжить курс', es: 'Continuar Curso' },
        'home.homework': { en: 'Homework', ru: 'Домашка', es: 'Tarea' },
        'home.homework_desc': { en: 'Tasks & practice', ru: 'Задания и практика', es: 'Tareas y práctica' },
        'home.tests': { en: 'Tests', ru: 'Тесты', es: 'Pruebas' },
        'home.tests_desc': { en: 'Scores & progress', ru: 'Оценки и прогресс', es: 'Puntuaciones y progreso' },
        'home.talk': { en: 'Talk', ru: 'Разговор', es: 'Hablar' },
        'home.talk_desc': { en: 'Voice practice', ru: 'Голосовая практика', es: 'Práctica de voz' },
        'home.events': { en: 'Events', ru: 'Ивенты', es: 'Eventos' },
        'home.events_desc': { en: 'Challenges', ru: 'Челленджи', es: 'Desafíos' },
        'home.duels': { en: 'Duels', ru: 'Дуэли', es: 'Duelos' },
        'home.duels_desc': { en: 'Compete', ru: 'Соревнуйся', es: 'Compite' },
        'home.shop': { en: 'Shop', ru: 'Магазин', es: 'Tienda' },
        'home.shop_desc': { en: 'Rewards', ru: 'Награды', es: 'Recompensas' },
        'home.daily': { en: 'Daily Challenge', ru: 'Ежедневный вызов', es: 'Reto Diario' },
        
        // ─── Learning ───
        'learn.title': { en: 'Lesson', ru: 'Урок', es: 'Lección' },
        'learn.theory': { en: 'Theory', ru: 'Теория', es: 'Teoría' },
        'learn.practice': { en: 'Practice', ru: 'Практика', es: 'Práctica' },
        'learn.complete': { en: 'Lesson Complete!', ru: 'Урок завершён!', es: '¡Lección completada!' },
        'learn.check': { en: 'Check', ru: 'Проверить', es: 'Comprobar' },
        'learn.correct': { en: 'Correct!', ru: 'Правильно!', es: '¡Correcto!' },
        'learn.wrong': { en: 'Not quite right', ru: 'Не совсем верно', es: 'No del todo correcto' },
        'learn.score': { en: 'Score', ru: 'Результат', es: 'Puntuación' },
        'learn.xp_earned': { en: 'XP earned', ru: 'XP заработано', es: 'XP ganado' },
        'learn.next_lesson': { en: 'Next Lesson', ru: 'Следующий урок', es: 'Siguiente Lección' },
        'learn.try_again': { en: 'Try Again', ru: 'Повторить', es: 'Intentar de Nuevo' },
        'learn.skip': { en: 'Skip', ru: 'Пропустить', es: 'Saltar' },
        
        // ─── Profile ───
        'profile.title': { en: 'Profile', ru: 'Профиль', es: 'Perfil' },
        'profile.edit': { en: 'Edit Profile', ru: 'Редактировать', es: 'Editar Perfil' },
        'profile.settings': { en: 'Settings', ru: 'Настройки', es: 'Ajustes' },
        'profile.dark_mode': { en: 'Dark Mode', ru: 'Тёмная тема', es: 'Modo Oscuro' },
        'profile.sound': { en: 'Sound Effects', ru: 'Звуковые эффекты', es: 'Efectos de Sonido' },
        'profile.language': { en: 'Interface Language', ru: 'Язык интерфейса', es: 'Idioma de Interfaz' },
        'profile.logout': { en: 'Log Out', ru: 'Выйти', es: 'Cerrar Sesión' },
        'profile.stats': { en: 'Statistics', ru: 'Статистика', es: 'Estadísticas' },
        'profile.badges': { en: 'CEFR Badges', ru: 'Бейджи CEFR', es: 'Insignias CEFR' },
        'profile.certificates': { en: 'Certificates', ru: 'Сертификаты', es: 'Certificados' },
        'profile.textbooks': { en: 'Textbooks', ru: 'Учебники', es: 'Libros de Texto' },
        'profile.subscription': { en: 'Premium', ru: 'Премиум', es: 'Premium' },
        'profile.reminder': { en: 'Daily Reminder', ru: 'Напоминание', es: 'Recordatorio Diario' },
        'profile.save_changes': { en: 'Save Changes', ru: 'Сохранить изменения', es: 'Guardar Cambios' },
        
        // ─── Streak ───
        'streak.title': { en: 'Your Streak', ru: 'Ваш стрик', es: 'Tu Racha' },
        'streak.days': { en: 'days', ru: 'дней', es: 'días' },
        'streak.longest': { en: 'Longest', ru: 'Лучший', es: 'Más largo' },
        'streak.freeze': { en: 'Streak Freeze', ru: 'Заморозка стрика', es: 'Congelar Racha' },
        'streak.total_sessions': { en: 'Total Sessions', ru: 'Всего сессий', es: 'Sesiones Totales' },
        'streak.total_time': { en: 'Total Time', ru: 'Общее время', es: 'Tiempo Total' },
        'streak.words_learned': { en: 'Words Learned', ru: 'Слов выучено', es: 'Palabras Aprendidas' },
        'streak.avg_accuracy': { en: 'Avg Accuracy', ru: 'Ср. точность', es: 'Precisión Prom.' },
        
        // ─── Events ───
        'events.title': { en: 'Events', ru: 'Ивенты', es: 'Eventos' },
        'events.active': { en: 'Active Challenges', ru: 'Активные челленджи', es: 'Desafíos Activos' },
        'events.complete_to_earn': { en: 'Complete challenges to earn rewards!', ru: 'Выполняйте челленджи, чтобы получить награды!', es: '¡Completa desafíos para ganar recompensas!' },
        'events.claim': { en: 'Claim!', ru: 'Забрать!', es: '¡Reclamar!' },
        'events.claimed': { en: 'Claimed', ru: 'Получено', es: 'Reclamado' },
        'events.play': { en: 'Play', ru: 'Играть', es: 'Jugar' },
        'events.vocab_marathon': { en: 'Vocabulary Marathon', ru: 'Марафон словаря', es: 'Maratón de Vocabulario' },
        'events.lesson_sprint': { en: 'Learning Sprint', ru: 'Спринт обучения', es: 'Sprint de Aprendizaje' },
        'events.dedication': { en: 'Dedication Week', ru: 'Неделя упорства', es: 'Semana de Dedicación' },
        'events.iron_streak': { en: 'Iron Will', ru: 'Железная воля', es: 'Voluntad de Hierro' },
        'events.speed_sprint': { en: 'Speed Sprint', ru: 'Скоростной спринт', es: 'Sprint Rápido' },
        'events.perfectionist': { en: 'Perfectionist', ru: 'Перфекционист', es: 'Perfeccionista' },
        
        // ─── Daily Challenge ───
        'daily.title': { en: 'Daily Challenge', ru: 'Ежедневный вызов', es: 'Reto Diario' },
        'daily.all_done': { en: 'All tasks done!', ru: 'Все задания выполнены!', es: '¡Todas las tareas hechas!' },
        'daily.mission': { en: "Today's Mission", ru: 'Задание на сегодня', es: 'Misión del Día' },
        'daily.come_back': { en: 'Come back tomorrow for new challenges!', ru: 'Завтра будут новые задания!', es: '¡Vuelve mañana para nuevos desafíos!' },
        'daily.complete_all': { en: 'Complete all tasks to earn your reward!', ru: 'Выполните все задания, чтобы получить награду!', es: '¡Completa todas las tareas para obtener tu recompensa!' },
        'daily.complete_lessons': { en: 'Focus: Complete Lessons', ru: 'Фокус: Завершите уроки', es: 'Enfoque: Completar Lecciones' },
        'daily.vocabulary': { en: 'Vocabulary Expansion', ru: 'Расширение словаря', es: 'Expansión de Vocabulario' },
        'daily.commitment': { en: 'Commitment', ru: 'Целеустремлённость', es: 'Compromiso' },
        'daily.perfect': { en: 'Mastery: Perfect Lesson', ru: 'Мастерство: Идеальный урок', es: 'Maestría: Lección Perfecta' },
        
        // ─── Talk ───
        'talk.title': { en: 'Langy Talk', ru: 'Langy Talk', es: 'Langy Talk' },
        'talk.hero_title': { en: 'Talk with a Native Speaker', ru: 'Разговор с носителем', es: 'Habla con un Nativo' },
        'talk.hero_desc': { en: 'Practice real conversations using your voice', ru: 'Практикуйте реальные разговоры голосом', es: 'Practica conversaciones reales con tu voz' },
        'talk.choose_partner': { en: 'Choose Your Partner', ru: 'Выберите партнёра', es: 'Elige tu Compañero' },
        'talk.choose_scenario': { en: 'Choose a Scenario', ru: 'Выберите сценарий', es: 'Elige un Escenario' },
        'talk.start': { en: 'Start Conversation', ru: 'Начать разговор', es: 'Iniciar Conversación' },
        'talk.mic_hint': { en: 'Requires microphone access', ru: 'Требуется доступ к микрофону', es: 'Requiere acceso al micrófono' },
        'talk.listening': { en: 'Listening...', ru: 'Слушаю...', es: 'Escuchando...' },
        'talk.thinking': { en: 'is thinking...', ru: 'думает...', es: 'está pensando...' },
        'talk.speaking': { en: 'is speaking...', ru: 'говорит...', es: 'está hablando...' },
        'talk.your_turn': { en: 'Your turn — tap mic to speak', ru: 'Ваш ход — нажмите микрофон', es: 'Tu turno — toca el micrófono' },
        'talk.end': { en: 'End', ru: 'Завершить', es: 'Terminar' },
        
        // ─── Shop ───
        'shop.title': { en: 'Shop', ru: 'Магазин', es: 'Tienda' },
        'shop.buy': { en: 'Buy', ru: 'Купить', es: 'Comprar' },
        'shop.owned': { en: 'Owned', ru: 'Куплено', es: 'Comprado' },
        
        // ─── Subscription ───
        'sub.title': { en: 'Go Premium', ru: 'Премиум подписка', es: 'Hazte Premium' },
        'sub.monthly': { en: 'Monthly', ru: 'Месячная', es: 'Mensual' },
        'sub.yearly': { en: 'Yearly', ru: 'Годовая', es: 'Anual' },
        'sub.best_value': { en: 'Best Value', ru: 'Лучшая цена', es: 'Mejor Valor' },
        
        // ─── Results ───
        'results.title': { en: 'Lesson Complete!', ru: 'Урок завершён!', es: '¡Lección Completada!' },
        'results.great': { en: 'Great job!', ru: 'Отличная работа!', es: '¡Buen trabajo!' },
        'results.home': { en: 'Back to Home', ru: 'На главную', es: 'Ir al Inicio' },
        
        // ─── Sprint ───
        'sprint.title': { en: 'Speed Sprint', ru: 'Скоростной спринт', es: 'Sprint Rápido' },
        'sprint.complete': { en: 'Sprint Complete!', ru: 'Спринт завершён!', es: '¡Sprint Completado!' },
        'sprint.times_up': { en: "Time's Up!", ru: 'Время вышло!', es: '¡Se acabó el tiempo!' },
        'sprint.correct': { en: 'Correct', ru: 'Верно', es: 'Correctas' },
        'sprint.time_used': { en: 'Time used', ru: 'Затрачено', es: 'Tiempo usado' },
        'sprint.try_again': { en: 'Try Again', ru: 'Ещё раз', es: 'Intentar de Nuevo' },
        'sprint.back': { en: 'Back to Events', ru: 'К ивентам', es: 'Volver a Eventos' },

        // ─── Onboarding ───
        'onboard.select_lang': { en: 'Interface Language', ru: 'Язык интерфейса', es: 'Idioma de Interfaz' },
        'onboard.why_learn': { en: 'Why are you learning English?', ru: 'Почему вы учите английский?', es: '¿Por qué aprendes inglés?' },
        'onboard.travel': { en: 'Travel', ru: 'Путешествия', es: 'Viajes' },
        'onboard.work': { en: 'Work & Career', ru: 'Работа и карьера', es: 'Trabajo y Carrera' },
        'onboard.study': { en: 'Study Abroad', ru: 'Учёба за рубежом', es: 'Estudiar en el Extranjero' },
        'onboard.fun': { en: 'Just for Fun', ru: 'Для себя', es: 'Solo por Diversión' },
        
        // ─── Homework ───
        'hw.title': { en: 'Homework', ru: 'Домашнее задание', es: 'Tarea' },
        'hw.no_tasks': { en: 'No homework yet', ru: 'Пока нет заданий', es: 'Aún no hay tareas' },
        'hw.writing': { en: 'Writing Analysis', ru: 'Анализ письма', es: 'Análisis de Escritura' },
        
        // ─── Level-up ───
        'levelup.title': { en: 'Level Up!', ru: 'Новый уровень!', es: '¡Subiste de Nivel!' },
        'levelup.reached': { en: "You've reached a new level!", ru: 'Вы достигли нового уровня!', es: '¡Has alcanzado un nuevo nivel!' },
        'levelup.awesome': { en: 'Awesome!', ru: 'Отлично!', es: '¡Increíble!' },
    },
    
    // Get translation
    t(key) {
        const entry = this.translations[key];
        if (!entry) return key;
        return entry[this.currentLang] || entry['en'] || key;
    },
    
    // Set language
    setLang(lang) {
        if (['en', 'ru', 'es'].includes(lang)) {
            this.currentLang = lang;
            LangyState.settings.interfaceLang = lang;
            localStorage.setItem('langy_lang', lang);
            if (typeof LangyDB !== 'undefined') LangyDB.saveProgress().catch(() => {});
        }
    },
    
    // Load saved language
    loadSavedLang() {
        const saved = localStorage.getItem('langy_lang');
        if (saved && ['en', 'ru', 'es'].includes(saved)) {
            this.currentLang = saved;
        } else {
            // Auto-detect from browser
            const browserLang = navigator.language?.substring(0, 2);
            if (browserLang === 'ru') this.currentLang = 'ru';
            else if (browserLang === 'es') this.currentLang = 'es';
        }
    },
    
    // Get available languages
    languages: [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'es', name: 'Español', flag: '🇪🇸' }
    ]
};

// Shorthand
function i18n(key) { return LangyI18n.t(key); }

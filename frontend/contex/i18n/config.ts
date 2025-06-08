import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(HttpBackend) // usa il backend che carica file via HTTP
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'it',
        supportedLngs: ['it', 'en'],
        ns: ['home'],
        defaultNS: 'home',
        backend: {
            // USA HTTP, non import dinamico
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator'],
            caches: ['localStorage', 'cookie'],
        },
        react: {
            useSuspense: false,
        },
    });

export default i18n;

import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// TODO: "i18next-browser-languagedetector": "^3.0.1",

import en from './en.json';
import ko from './ko.json';

// const lngDetector = new LanguageDetector();

// lngDetector.addDetector({
//     name: 'customDetector',
//     cacheUserLanguage(lng, options) {
//         console.log('changed!!!!!!!!');
//         if (lng.substring(0, 2) === 'ko')
//             localStorage.setItem('i18nextLng', 'ko');
//         else
//             localStorage.setItem('i18nextLng', 'en');
//     },
//     lookup(options) {
//         console.log(options);
//         return 'en';
//     }
// });


i18n
    //.use(lngDetector)
    .init({
        debug: process.env.NODE_ENV === 'development',
        // detection: {
        //     // order and from where user language should be detected
        //     order: ['navigator', 'htmlTag', 'path', 'subdomain']
        // },
        lng: navigator.language || navigator.userLanguage,
        fallbackLng: 'en',
        resources: {
            'en': en,
            'ko': ko
        }
    });

export default i18n;
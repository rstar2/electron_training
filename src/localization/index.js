import Vue from 'vue';
import VueI18n from 'vue-i18n';

import messages from './messages';

Vue.use(VueI18n);

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set default locale
  fallbackLocale: 'en',
  messages // set locale messages
});

export default i18n;

// Lazy loading of a locale

const loadedLanguages = Object.keys(messages);

function setI18nLanguage(lang) {
  // set to use the new language
  i18n.locale = lang;
  //   axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/localization/messages-${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default);
        loadedLanguages.push(lang);
        return setI18nLanguage(lang);
      });
    }
    return Promise.resolve(setI18nLanguage(lang));
  }
  return Promise.resolve(lang);
}

// common usage :
// import router from '../router';
// router.beforeEach((to, from, next) => {
//   const lang = to.params.lang;
//   loadLanguageAsync(lang).then(() => next());
// });

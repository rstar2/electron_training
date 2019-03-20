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

// export the translate function
export const translate = i18n.t;

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
      // use the Webpack dynamic import feature
      // both locations work ok - `./messages-${lang}` and `@/localization/messages-${lang}`
      return import(/* webpackChunkName: "localization-[request]" */ `./messages-${lang}`).then(messages => {
        i18n.setLocaleMessage(lang, messages.default);
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

// global localization formatters for Vuetify DatePicker
export const DatePickerMixin = {};
/**
 *
 * @param {String} dateStr  ISO 8601 string
 */
export function dayFormatter(dateStr) {}
export function weekdayFormatter(dateStr) {
  console.log('weekday', dateStr);
  return dateStr;
}
export function monthFormatter(dateStr) {}
export function yearFormatter(dateStr) {}
export function titleDateFormatter(dateStr) {}
export function headerDateFormatter(dateStr) {}

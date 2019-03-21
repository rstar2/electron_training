import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { VDatePicker } from 'vuetify/lib';

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
export const translate = i18n.t.bind(i18n);



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
function weekdayFormatter(dateStr) {
  const date = new Date(dateStr);
  return translate(`datePicker.day.${date.getDay()}`).charAt(0);
  // return i18n.t(`datePicker.day.${date.getDay()}`).charAt(0);
}
function titleDateFormatter(dateStr) {
  const date = new Date(dateStr);
  return `${translate(`datePicker.day.${date.getDay()}`)}, ${translate(`datePicker.month.${date.getMonth()}`)} ${date.getDate()}`;
}
function headerDateFormatter(dateStr) {
  const date = new Date(dateStr);
  return `${translate(`datePicker.month.${date.getMonth()}`)} ${date.getFullYear()}`;
}

// Object.keys(VDatePicker)) are 'options', 'superOptions', 'extendOptions', 'sealedOptions', ...
// NOTE: I dont' understand why exactly but the 'VDatePicker.extendOptions.props' should be modified,
// not the 'VDatePicker.options.props' in order to set a default value to the different formatters props
// VDatePicker.options.props.weekdayFormat = {
//   type: Function,
//   default: weekdayFormatter
// };
VDatePicker.extendOptions.props.weekdayFormat = {
  type: Function,
  default: weekdayFormatter
};
VDatePicker.extendOptions.props.titleDateFormat = {
  type: Function,
  default: titleDateFormatter
};
VDatePicker.extendOptions.props.headerDateFormat = {
  type: Function,
  default: headerDateFormatter
};
// VDatePicker.extendOptions.props.monthFormat = {
//   type: Function,
//   default: monthFormatter
// };
// VDatePicker.extendOptions.props.yearFormat = {
//   type: Function,
//   default: yearFormatter
// };

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

import { translate } from '../localization';

Vue.use(Vuetify, {
  // this means using icons like: <v-icon>mdi-open-in-new</v-icon>, starting with "mdi"
  iconfont: 'mdi',

  // specify custom translation
  lang: {
    t: (key, ...params) => translate(key, params)
  }
});

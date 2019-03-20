import Vue from 'vue';

import './plugins/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';

import i18n from './localization';

import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router, // adds 'this.$router' and 'this.$route' to each component
  store, // adds 'this.$store' to each component
  i18n, // adds 'this.$i18n' and 'this.$t' to each component
  render: h => h(App)
}).$mount('#app');

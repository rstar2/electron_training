import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import TrainingLogs from './views/TrainingLogs.vue';
import TrainingLog from './components/TrainingLog.vue';

import store from './store';
import { default as i18n, loadLanguageAsync } from './localization';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        text: i18n.t('routes.home'),
        drawer: true,
        order: 0
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Home,
      meta: {
        text: i18n.t('routes.signup')
      }
    },
    {
      path: '/logs',
      name: 'logs',
      component: TrainingLogs,
      meta: {
        text: i18n.t('routes.logs'),
        drawer: true,
        order: 1,
        requiresAuth: true
      }
    },
    {
      path: '/logs/:id',
      name: 'log',
      component: TrainingLog,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        text: i18n.t('routes.about'),
        drawer: true,
        icon: 'person',
        order: 100
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Home,
      meta: {
        requiresAuth: true,
        text: i18n.t('routes.dashboard'),
        drawer: true,
        order: 2
      }
    },
    // Fallback (catch all others ) case
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuth) {
      next({
        path: '/login',

        // remember the desire 'to' route so that if we login later to re-invoke it
        // later when we login (e.g. the isAuth state is set to true)
        // then in the Navigation.vue we redirect to this remembered path
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

// let windowLang = window.navigator.language;
// // if in the form of 'en-US' then take just the 'en' part
// windowLang = windowLang.split('-')[0];

// just a demo of the lazy/dynamic loading of new localization languages
// could be taken this browser's locale
router.beforeEach((to, from, next) => {
  // const lang = to.params.lang;
  //   const lang = windowLang
  const lang = to.query.lang;
  if (lang) {
    loadLanguageAsync(lang).then(() => next());
  } else {
    next();
  }
});

export default router;

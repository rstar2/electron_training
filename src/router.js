import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        text: 'Home',
        drawer: true,
        order: 0
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Home,
      meta: {
        text: 'SignUp',
      }
    },
    {
      path: '/logs',
      name: 'logs',
      component: Home,
      meta: {
        text: 'Training Logs',
        drawer: true,
        order: 1,
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        text: 'About',
        drawer: true,
        icon: 'person',
        order: 100
      }
    },
    {
      path: '/friends',
      name: 'friends',
      component: Home,
      meta: {
        text: 'Friends',
        drawer: true,
        order: 2
      }
    },
    // Fallback (catch all others ) case
    { path: '*', redirect: '/' }
  ]
});

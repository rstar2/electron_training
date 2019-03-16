<template>
  <nav>
    <v-toolbar app class="grey lighten-2">
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span class="text-uppercase">Training</span>
        <span class="font-weight-light text-lowercase">Log</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <template v-if="$store.state.initialized">
        <v-btn v-if="isAuth" flat @click="onLogout">
          <span class="mr-2">Logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <template v-else>
          <v-btn flat @click="showDialogLogin(false)">
            <span class="mr-2">Login</span>
            <v-icon>mdi-login</v-icon>
          </v-btn>
          <v-btn flat @click="showDialogLogin(true)">
            <span class="mr-2">Register</span>
            <v-icon>mdi-account-plus</v-icon>
          </v-btn>
        </template>
      </template>
    </v-toolbar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-layout v-if="isAuth" column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100" color="grey lighten-2">
            <img class="text-lg-center" :src="avatar" />
          </v-avatar>
          <p class="white--text subheading mt-1">{{ user.name }}</p>
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-snackbar v-model="snackbarActive" :timeout="10000" :top="true">
      {{ snackbarText }}
      <v-btn color="pink" flat @click="snackbarActive = false">Close</v-btn>
    </v-snackbar>

    <DialogLogin v-bind.sync="dialogLogin" @action="onLoginOrRegister" />
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import bus from '../bus.js';
import DialogLogin from './DialogLogin.vue';

export default {
  name: 'Navigation',
  components: { DialogLogin },
  data() {
    return {
      /*Boolean*/ drawer: false,

      /*Object*/ dialogLogin: {
        show: false,
        isRegister: false
      },

      /*{type: String, text: String}*/ snackbarInfo: null
    };
  },
  computed: {
    ...mapGetters(['isAuth']),
    ...mapState(['user']),

    // gt the drawer links ftom the Router (note, some only can be specified to be shown)
    links() {
      return this.$router.options.routes
        .filter(route => route.meta && route.meta.drawer)
        .map(route => ({
          route: route.path,
          text: route.meta.text,
          order: route.meta.order || 0
        }))
        .sort((route1, route2) => (route1.order < route2.order ? -1 : 1));
    },

    avatar() {
      return (this.isAuth && `/avatars/${this.user.id}.ico`) || '';
    },

    snackbarActive: {
      /**
       * @return {Boolean}
       */
      get() {
        return !!this.snackbarInfo;
      },
      /**
       * @param {Boolean} value
       */
      set(value) {
        if (!value) {
          this.snackbarInfo = null;
        }
      }
    },
    snackbarText() {
      return this.snackbarInfo ? this.snackbarInfo.text : '';
    }
  },
  watch: {
    /**
     * Watch for when we are logined/logouted
     */
    isAuth(newValue) {
      // watch
      if (newValue) {
        // go to the 'resticted' route
        // it should be /xxx?redirect=yyy
        // this.$route is current route
        const redirectUrl = this.$route.query.redirect;
        if (redirectUrl) {
          this.$router.push(redirectUrl);
        }
      } else {
        this.$router.push('/');
      }
    }
  },
  methods: {
    showDialogLogin(isRegister) {
      this.dialogLogin.show = true;
      this.dialogLogin.isRegister = isRegister;
    },
    onLoginOrRegister({ isRegister, email, name, password }) {
      let promise;
      if (isRegister) {
        promise = this.$store.dispatch('register', { email, name, password });
      } else {
        promise = this.$store.dispatch('login', { email, password });
      }
      promise.catch(error => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        bus.$emit('info', { type: 'error', text: errorMessage });
      });
    },
    onLogout() {
      this.$store.dispatch('logout', {}).catch(error => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        bus.$emit('info', { type: 'error', text: errorMessage });
      });
    }
  },
  created() {
    bus.$on('info', info => (this.snackbarInfo = info));
  }
};
</script>

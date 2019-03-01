<template>
  <nav>
    <v-toolbar app class="grey lighten-2">
      <v-toolbar-side-icon
        class="grey--text"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span class="text-uppercase">Training</span>
        <span class="font-weight-light text-lowercase">Log</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="isAuth" flat @click="logout">
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else flat @click="login">
        <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
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
            <v-list-tile-title class="white--text">{{
              link.text
            }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navigation',
  data() {
    return {
      drawer: false
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
    }
  },
  methods: {
    ...mapActions(['register', 'login', 'logout'])
  }
};
</script>

<template>
  <v-app>
    <Navigation />

    <v-content class="ma-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: { Navigation }
};
</script>

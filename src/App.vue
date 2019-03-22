<template>
  <v-app>
    <Loader />
    <Navigation />

    <v-content class="ma-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Loader from './components/Loader.vue';
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  components: { Loader, Navigation }
};
</script>

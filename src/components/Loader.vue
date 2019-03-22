<template>
  <v-progress-linear
    color="blue"
    class="my-0"
    style="height: 3px; width: 100%; z-index: 100; position: fixed;"
    :active="show"
    :query="false"
    :value="value"
    :indeterminate="indeterminate"
  >
  </v-progress-linear>
</template>

<script>
import bus from '../bus.js';

export default {
  data() {
    return {
      show: false,
      value: -1, // set -1 to become indeterminate
      query: false
    };
  },
  computed: {
    indeterminate() {
      // Constantly animates, use when loading progress is unknown.
      return this.value < 0;
    }
  },
  created() {
    bus.$on('loading', value => {
      if (value === false) {
        this.show = false;
        this.value = -1;
      } else if (value === true) {
        this.show = true;
        this.value = -1;
      } else if (value instanceof Number || typeof value === 'number') {
        this.show = true;
        this.value = value;
      }
    });
  }
};
</script>

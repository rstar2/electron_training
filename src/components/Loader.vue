<template>
  <v-progress-linear
    color="white"
    class="mb-0"
    style="height: 3px; width: 100%; z-index: 100;"
    :active="true"
    :query="true"
    v-model="value"
    :indeterminate="indeterminate">
  </v-progress-linear>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      value: 0, // set -1 to become indeterminate
      query: false
    };
  },
  computed: {
    indeterminate() {
      // Constantly animates, use when loading progress is unknown.
      return this.value < 0;
    }
  },
  methods: {
    _loading() {
      if (value === false) {
        loading.parentElement.remove();
      } else if (value === true) {
        loading.style.width = '30%';
      } else if (value instanceof Number || typeof value === 'number') {
        loading.style.width = value + '%';
      }
    }
  }
};
</script>

<template>
  <div>Training Log: {{ log ? log.title : 'No such log' }}</div>
</template>

<script>
export default {
  data() {
    return {
      log: null
    };
  },
  computed: {},

  beforeRouteEnter(to, from, next) {
    next(vm => vm.setLog(to.params.id));
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  beforeRouteUpdate(to, from, next) {
    this.setLog(to.params.id);
    next();
  },

  methods: {
    setLog(logId) {
      // access the named Vuex module "logs"
      const logs = this.$store.state.logs.logs;
      this.log = logs.find(log => {
        return log.id === logId;
      });
    }
  },
};
</script>

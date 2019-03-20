<template>
  <div>{{ $t('TrainingLog.header') }}{{ log ? log.title : $t('TrainingLog.missing') }}</div>
</template>

<script>
export default {
  name: 'TrainingLog',
  computed: {
    log() {
      const logId = this.$route.params.id;
      const logs = this.$store.state.logs.logs;
      return logs.find(log => {
        return log.id === logId;
      });
    }
  },

  //   beforeRouteEnter(to, from, next) {
  //     next(vm => vm.setLog(to.params.id));
  //   },
  //   // when route changes and this component is already rendered,
  //   // the logic will be slightly different.
  //   beforeRouteUpdate(to, from, next) {
  //     this.setLog(to.params.id);
  //     next();
  //   },

  methods: {
    // setLog(logId) {
    //   // access the named Vuex module "logs"
    //   const logs = this.$store.state.logs.logs;
    //   this.log = logs.find(log => {
    //     return log.id === logId;
    //   });
    // }
  }
};
</script>

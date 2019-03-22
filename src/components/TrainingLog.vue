<template>
  <div>
    <template v-if="log">
      <h3 class="py-1">{{ log.title }}</h3>
      <!-- <v-card> -->
      <v-card-text class="px-4 grey--text">
        <div class="font-weight-bold">{{ $t('TrainingLogs.log.dueBy', [filterDate(log.dueDate)]) }}</div>
        <div>{{ log.description }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" flat @click="removeLog(log.id)">{{ $t('remove') }}</v-btn>
      </v-card-actions>
      <!-- </v-card> -->
    </template>
    <div v-else>{{ $t('TrainingLog.missing') }}</div>
  </div>
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
  }

  //   beforeRouteEnter(to, from, next) {
  //     next(vm => vm.setLog(to.params.id));
  //   },
  //   // when route changes and this component is already rendered,
  //   // the logic will be slightly different.
  //   beforeRouteUpdate(to, from, next) {
  //     this.setLog(to.params.id);
  //     next();
  //   },
  //   methods: {
  //     setLog(logId) {
  //       // access the named Vuex module "logs"
  //       const logs = this.$store.state.logs.logs;
  //       this.log = logs.find(log => {
  //         return log.id === logId;
  //       });
  //     }
  //   }
};
</script>

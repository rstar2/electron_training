<template>
  <div class="logs">
    <h1 class="subheading grey--text">Training Logs</h1>

    <v-container class="my-5">
      <v-layout column align-end>
        <!-- The DialogNewTrainingLog is actually the trigger that contains the dialog inside -->
        <DialogNewTrainingLog @create="createLog">New Log</DialogNewTrainingLog>
      </v-layout>

      <v-expansion-panel>
        <v-expansion-panel-content v-for="log in logsShown" :key="log.id">
          <div slot="header" class="py-1">{{ log.title }}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">Due by {{ log.dueDate }}</div>
              <div>{{ log.description }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" flat @click="removeLog(log.id)">Remove</v-btn>
              <v-btn color="primary" flat @click="$router.push({ name: 'log', params: { logId: log.id } })">View</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import { mapState /*, mapGetters */ } from 'vuex';
import bus from '../bus';
import DialogNewTrainingLog from '@/components/DialogNewTrainingLog.vue';

export default {
  components: { DialogNewTrainingLog },
  data() {
    return {
      /*Boolean*/ filterMyLogs: true
    };
  },
  computed: {
    logsShown() {
      return !this.filterMyLogs
        ? this.logs
        : this.logs.filter(log => {
            // get from the auth user
            return this.$store.getters.checkAuthUser(log.owner);
          });
    },
    // -----------------
    // several ways to access the namespaced Vuex module logs, e.g 'store.logs'
    // binding a namespaced Vuex module is a bit verbose using mapState, mapGetters, mapActions and mapMutations:

    // NOT WORKING unfortunately
    // ...mapState({
    //   logs: 'logs/logs'
    // }),

    // 1. specify the namespace as first argument
    ...mapState('logs', ['logs'])

    // 2.
    // ...mapState('logs', {
    //   logs: 'logs'
    // }),

    // 3.
    // ...mapState({
    //   logs: state => state.logs.logs
    // }),

    // 4. If theres such getter
    // ...mapGetters({
    //   logs: 'logs/logs'
    // }),
    // -----------------
  },
  methods: {
    createLog(data) {
      this.$store
        .dispatch('logs/add', data)
        .then(() => bus.$emit('info', { text: 'Training Log project added' }))
        .catch(() => bus.$emit('info', { type: 'error', text: 'Adding new Training Log project failed' }));
    },
    removeLog(id) {
      this.$store
        .dispatch('logs/remove', id)
        .then(() => bus.$emit('info', { text: 'Training Log project removed' }))
        .catch(() => bus.$emit('info', { type: 'error', text: 'Removing a Training Log project failed' }));
    }
  }
};
</script>

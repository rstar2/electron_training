<template>
  <div class="logs">
    <h1 class="subheading grey--text">{{ $t('TrainingLogs.title') }}</h1>

    <v-container class="my-5">
      <v-layout column align-end>
        <!-- The DialogNewTrainingLog is actually the trigger that contains the dialog inside -->
        <DialogNewTrainingLog @create="createLog">{{ $t('TrainingLogs.log.new') }}</DialogNewTrainingLog>
      </v-layout>

      <v-expansion-panel>
        <v-expansion-panel-content v-for="log in logsShown" :key="log.id">
          <div slot="header" class="py-1">{{ log.title }}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">{{ $t('TrainingLogs.log.dueBy', [filterDate(log.dueDate)]) }}</div>
              <div>{{ log.description }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" flat @click="removeLog(log.id)">{{ $t('remove') }}</v-btn>
              <v-btn color="primary" flat @click="$router.push({ name: 'log', params: { id: log.id } })">
                {{ $t('TrainingLogs.log.view') }}
              </v-btn>
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
  name: 'TrainingLogs',
  components: { DialogNewTrainingLog },
  data() {
    return {
      /*Boolean*/ filterMyLogs: true
    };
  },
  computed: {
    logsShown() {
      return this.logs;
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
      bus.$emit('loading', true);
      this.$store
        .dispatch('logs/add', data)
        .then(() => bus.$emit('info', { text: this.$t('TrainingLogs.info.added') }))
        .catch(() => bus.$emit('info', { type: 'error', text: this.$t('TrainingLogs.info.added_error') }))
        .finally(() => bus.$emit('loading', false));
    },
    removeLog(id) {
      bus.$emit('loading', true);
      this.$store
        .dispatch('logs/remove', id)
        .then(() => bus.$emit('info', { text: this.$t('TrainingLogs.info.removed') }))
        .catch(() => bus.$emit('info', { type: 'error', text: this.$t('TrainingLogs.info.removed_error') }))
        .finally(() => bus.$emit('loading', false));
    }
  }
};
</script>

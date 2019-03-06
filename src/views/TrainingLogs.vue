<template>
  <div class="logs">
    <h1 class="subheading grey--text">Training Logs</h1>

    <v-container class="my-5">
      <v-layout column align-end>
        <DialogNewTrainingLog @create="createTrainingLog" />
      </v-layout>

      <v-expansion-panel>
        <v-expansion-panel-content v-for="log in logsShown" :key="log.id">
          <div slot="header" class="py-1">{{ log.title }}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">Due by {{ log.dueDate }}</div>
              <div>{{ log.description }}</div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from '../firebase';

import bus from '../bus.js';
import DialogNewTrainingLog from '@/components/DialogNewTrainingLog.vue';

export default {
  components: { DialogNewTrainingLog },
  data() {
    return {
      /*Boolean*/ filterMyLogs: false,
      /*{id:String, title:String}[]*/ logs: []
    };
  },
  computed: {
    logsShown() {
      return !this.filterMyLogs
        ? this.logs
        : this.logs.filter(log => {
            // TODO: get from the auth state
            return log.owner === 'Rumen Neshev';
          });
    }
  },
  created() {
    db.collection('logs').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(({ type, doc }) => {
        switch (type) {
          case 'added':
            this.logs.push({ id: doc.id, ...doc.data() });
            break;
          case 'removed':
            {
              const index = this.logs.findIndex(log => log.id === doc.id);
              if (index !== -1) {
                this.logs.splice(index, 1);
              }
            }
            break;
          case 'modified':
            {
              const index = this.logs.findIndex(log => log.id === doc.id);
              if (index !== -1) {
                Object.assign(this.logs[index], doc.data());
              }
            }
            break;
        }
      });
    });
  },
  methods: {
    on(event) {
      console.log('event', event);
    },
    createTrainingLog(data) {
      db.collection('logs')
        .add(data)
        .then(() => bus.$emit('info', { text: 'Training Log project added' }))
        .catch(() =>
          bus.$emit('info', { type: 'error', text: 'Adding Training Log project failed' })
        );
    }
  }
};
</script>

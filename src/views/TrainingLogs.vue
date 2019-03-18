<template>
  <div class="logs">
    <h1 class="subheading grey--text">Training Logs</h1>

    <v-container class="my-5">
      <v-layout column align-end>
        <!-- The DialogNewTrainingLog is actually the trigger that contains the dialog inside -->
        <DialogNewTrainingLog @create="createTrainingLog">New Log</DialogNewTrainingLog>
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
              <v-btn color="error" flat @click="$router.push({ name: 'log', params: { logId: log.id } })">View</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import { db } from '../firebase';
import * as utils from '../utils';
import bus from '../bus';
import DialogNewTrainingLog from '@/components/DialogNewTrainingLog.vue';

export default {
  components: { DialogNewTrainingLog },
  data() {
    return {
      /*Boolean*/ filterMyLogs: true,
      /*{id:String, title:String}[]*/ logs: []
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
    }
  },
  created() {
    db.collection('logs').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(({ type, doc }) => {
        switch (type) {
          case 'added':
            this.logs.push({ id: doc.id, ...this.fromDocData(doc.data()) });
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
                Object.assign(this.logs[index], this.fromDocData(doc.data()));
              }
            }
            break;
        }
      });
    });
  },
  methods: {
    createTrainingLog(data) {
      db.collection('logs')
        .add(data)
        .then(() => bus.$emit('info', { text: 'Training Log project added' }))
        .catch(() => {
          bus.$emit('info', { type: 'error', text: 'Adding Training Log project failed' });
        });
    },

    toDocData(data) {
      const dataFixed = { ...data };
      // the incomming 'startDate'/'dueDate' are String types
      if (dataFixed.startDate) {
        dataFixed.startDate = utils.strDateToFirebaseTimestamp(dataFixed.startDate);
      }
      if (dataFixed.dueDate) {
        dataFixed.dueDate = utils.strDateToFirebaseTimestamp(dataFixed.dueDate);
      }
      // use current authorized user UID
      dataFixed.owner = this.$store.getters.authUid;
      return dataFixed;
    },
    fromDocData(data) {
      const dataFixed = { ...data };
      if (dataFixed.startDate) {
        dataFixed.startDate = utils.firebaseTimestampToDate(dataFixed.startDate);
      }
      if (dataFixed.dueDate) {
        dataFixed.dueDate = utils.firebaseTimestampToDate(dataFixed.dueDate);
      }

      return dataFixed;
    }
  }
};
</script>

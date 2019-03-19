import { db } from '../../firebase';
import * as utils from '../../utils';

// import the global Vuex store object
import store from '../index';

const logsStore = {
  namespaced: true,

  state: {
    logs: []
  },
  getters: {
    logs(state) {
      return state.logs;
    }
  },
  mutations: {
    add(state, { id, data }) {
      state.logs.push({ id, ...utils.fromDocData(data) });
    },
    remove(state, { id }) {
      const index = state.logs.findIndex(log => log.id === id);
      if (index !== -1) {
        state.logs.splice(index, 1);
      }
    },
    modify(state, { id, data }) {
      const index = state.logs.findIndex(log => log.id === id);
      if (index !== -1) {
        Object.assign(state.logs[index], utils.fromDocData(data));
      }
    }
  },
  actions: {
    add(context, data) {
      // use current authorized user UID from the rootState/rootGetters/...
      const owner = context.rootGetters.authUid;
      return db.collection('logs').add(utils.toDocData(data, owner));
    },
    remove(context, id) {
      return db.collection('logs').doc(id).delete();
    }
  },
  plugins: [

  ]
};

export default logsStore;

// TODO: Register this 'onSnapshot' only if we are logged-in, and unregister when logout
// use Vuex.plugins or store.watch() or store.subscribe or store.subscribeAction
db.collection('logs').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(({ type, doc }) => {
    switch (type) {
      case 'added':
        store.commit('logs/add', { id: doc.id, data: doc.data() });
        break;
      case 'removed':
        store.commit('logs/remove', { id: doc.id });
        break;
      case 'modified':
        store.commit('logs/modified', { id: doc.id, data: doc.data() });
        break;
    }
  });
});

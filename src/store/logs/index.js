import { db } from '../../firebase';
import * as utils from './utils';

const module = {
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
    clear(state) {
      // clear current array - another way is to reassign it "state.logs. = []"
      state.logs.length = 0;
    },
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
      return db
        .collection('logs')
        .doc(id)
        .delete();
    }
  },
  plugins: []
};

// create a Vuex store plugin
const plugin = store => {
  const subscribeForLogs = owner => {
    // implementing query with where-clause '=='
    // db.collection('test').where('value', '==', 5).get()
    //   .then(({ docs }) => {
    //     docs.forEach(doc => console.log('doc', doc.data()));
    //   });
    // implementing query with where-clause '!='
    // Promise.all([
    //   db.collection('test').where('value', '<', 5).get(),
    //   db.collection('test').where('value', '>', 5).get()])
    //   .then(([res1, res2]) => {
    //     return { docs: [...res1.docs, ...res2.docs] };
    //   })
    //   .then(({ docs }) => {
    //     docs.forEach(doc => console.log('doc', doc.data()));
    //   });

    let query = db.collection('logs');
    // get logs ONLY for specific 'owner' if specified
    if (owner) {
      query = query.where('owner', '==', owner);
    }

    return query.onSnapshot(snapshot => {
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
  };

  // register this 'onSnapshot' only if we are logged-in, and unregister when logout
  // use store plugin and store.watch() or store.subscribe or store.subscribeAction
  let unsubscribeForLogs = null;
  // the first Function returns the value to watch. It accepts arguments : global Vuex store's - state, getters
  // the second Function is the callback called on changes
  store.watch(
    (state, getters) => {
      return getters.authUid;
    },
    authUid => {
      if (!authUid) {
        // unsubscribe from the firebase
        if (unsubscribeForLogs) {
          unsubscribeForLogs();
          unsubscribeForLogs = null;
        }
      } else {
        // when we authorized in Firebase ONLY then subscribe
        // get from the auth user with uid 'authUid'
        unsubscribeForLogs = subscribeForLogs(authUid);
      }
    },
    {
      // immediately call the callback
      immediate: true
    }
  );
};

export { module, plugin };

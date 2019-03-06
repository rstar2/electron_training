import Vue from 'vue';
import Vuex from 'vuex';

import { db, auth } from './firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    /*firebase.User*/ user: null,
    trainingLogs: [],

    friends: {},
    myRequests: {},
    friendRequests: {}
  },
  getters: {
    isAuth(state) {
      return !!state.user;
    }
  },
  mutations: {
    /**
     * @param {*} state
     * @param {firebase.User?} payload
     */
    user(state, payload) {
      state.user = payload;
    }
  },
  actions: {
    /**
     * @param {*} context
     * @param {{name:String, email:String, password: String}} payload
     */
    register(context, payload) {
      const { email, password, name } = payload;

      // asynchronous action than returns Promise so it can be chain in more complex flows
      return auth
        .createUserWithEmailAndPassword(email, password)
        .then(creds => {
          // we can use either the returned user object or "firebase.auth().currentUser"
          const user = creds.user;
          return user
            .updateProfile({
              displayName: name
              //photoURL: // some photo url
            })
            .then(() => user);
        })
        .then(user => context.commit('user', user))
        .catch(error => {
          context.commit('user', null);

          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
    },

    login(context, payload) {
      const { email, password } = payload;

      auth
        .signInWithEmailAndPassword(email, password)
        .then(creds => {
          context.commit('user', creds.user);
        })
        .catch(error => {
          context.commit('user', null);

          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
    },

    logout(context) {
      auth
        .signOut()
        .then(() => {
          context.commit('user', null);
        })
        .catch(error => {
          // An error happened.
        });
    }
  }
});

// this is used for 2 things
auth.onAuthStateChanged(user => {
  store.commit('user', user);
});

export default store;

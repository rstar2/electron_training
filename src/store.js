import Vue from 'vue';
import Vuex from 'vuex';

import { db, auth } from './firebase';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    /*Boolean*/ initialized: false,
    /*firebase.User*/ user: null,

    trainingLogs: [],
    friends: {},
    myRequests: {},
    friendRequests: {}
  },
  getters: {
    isAuth(state) {
      return !!state.user;
    },
    isAdmin(state) {
      return !!state.user && state.user.admin;
    }
  },
  mutations: {
    initialize(state) {
      state.initialized = true;
    },
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
          const user = creds.user;

          // 1. Store limited data in the auth user record
          // we can use either the returned user object or "firebase.auth().currentUser"
          //   return user
          //     .updateProfile({
          //       displayName: name
          //       //photoURL: // some photo url
          //     });

          //2. create new user inside a custom database 'users' collection
          // create it with the same matching uid
          return db
            .collection('users')
            .doc(user.uid)
            .set({
              displayName: name,
              age: 40
              // ...
            });
        })
        .catch(error => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
    },

    login(context, payload) {
      const { email, password } = payload;

      auth.signInWithEmailAndPassword(email, password).catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
    },

    logout(context) {
      auth.signOut().catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
  }
});

// this is used for 2 things:
// 1. Initial Firebase auth state fetching, as after page-reload
// 2. As a result to 'createUserWithEmailAndPassword', 'signInWithEmailAndPassword', 'signOut'
//    so technically the commits after their results are not needed, but let thm stay for now
auth.onAuthStateChanged(user => {
  let promise;

  if (user) {
    // auth user - wait to get the custom claims
    promise = user.getIdTokenResult().then(idTokenResult => {
      console.log('Logged in user claims', idTokenResult.claims);

      // store this custom 'admin' claim directly onto the stored user object
      user.admin == !!idTokenResult.claims.admin;
      return user;
    });
  } else {
    // no auth user anymore
    promise = Promise.resolve(null);
  }

  promise.then(user => {
    store.commit('user', user);
    store.commit('initialize');
  });
});

export default store;

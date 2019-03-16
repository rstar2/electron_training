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
    },
    authUid(state) {
      return !!state.user && state.user.uid;
    },
    checkAuthUser(state, getters) {
      // 1. getters receive other getters as second argument
      // 2. return as a function, so it can be used like this from a VM:
      // this.$store.getters.checkAuthUser("asd")
      return uid => {
        const authUid = getters.authUid;
        return authUid && authUid == uid;
      };
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
     * Register action
     * @param {Vuex.ActionContext} context
     * @param {{name:String, email:String, password: String}} payload
     * @return {Promise}
     */
    register(context, payload) {
      const { email, password, name } = payload;

      // asynchronous action than returns Promise so it can be chain in more complex flows
      return auth.createUserWithEmailAndPassword(email, password).then(creds => {
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
      });
    },

    /**
     * Logn=in action
     * @param {Vuex.ActionContext} context
     * @param {{email:String, password: String}} payload
     * @return {Promise}
     */
    login(context, payload) {
      const { email, password } = payload;

      return auth.signInWithEmailAndPassword(email, password);
    },

    /**
     * Logout action
     * @param {Vuex.ActionContext} context
     * @return {Promise}
     */
    logout(context) {
      return auth.signOut();
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

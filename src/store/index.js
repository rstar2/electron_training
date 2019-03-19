import Vue from 'vue';
import Vuex from 'vuex';

import { db, auth, firebase } from '../firebase';
import { module as logsModule, plugin as logsPlugin } from './logs';

Vue.use(Vuex);

const store = new Vuex.Store({
  //   strict: process.env.NODE_ENV !== 'production',
  devtools: process.env.NODE_ENV !== 'production',
  state: {
    /*Boolean*/ initialized: false,
    /*firebase.User*/ user: null,

    // Implement with different modules
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

    loginWithGoogle(context) {
      const provider = new firebase.auth.GoogleAuthProvider();
      // provider additional OAuth 2.0 scopes
      // googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

      // To localize the provider's OAuth flow to the user's preferred language
      // auth.languageCode = 'pt'

      // Specify additional custom OAuth provider parameters that you want to send with the OAuth request
      // provider.setCustomParameters({
      //     'login_hint': 'user@example.com'
      //   });

      // To sign in with a pop-up window, call 'signInWithPopup' :
      return auth.signInWithPopup(provider).then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      });

      // To sign in by redirecting to the sign-in page, call 'signInWithRedirect' :
      // auth.signInWithRedirect(provider);
      // auth.getRedirectResult().then(function(result) {
      //     if (result.credential) {
      //       // This gives you a Google Access Token. You can use it to access the Google API.
      //       var token = result.credential.accessToken;
      //       // ...
      //     }
      //     // The signed-in user info.
      //     var user = result.user;
      //   });
    },

    /**
     * Logout action
     * @param {Vuex.ActionContext} context
     * @return {Promise}
     */
    logout(context) {
      return auth.signOut();
    }
  },

  modules: {
    logs: logsModule
  },
  plugins: [logsPlugin]
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

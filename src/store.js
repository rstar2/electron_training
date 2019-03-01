import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
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
     * @param {{id:String, name:String, email:String}} payload
     */
    login(state, payload) {
      state.user = payload;
    },

    logout(state) {
      state.user = null;
    }
  },
  actions: {
    /**
     * @param {*} context
     * @param {{name:String, email:String, password: String}} payload
     */
    register(context, payload) {
      // asynchronous action
      setTimeout(() => {
        // call the mutation when desired
        context.commit('login', {
          ...payload,
          id: 2000
        });
      }, 2000);
    },

    login(context) {
      // asynchronous action than returns Promise so it can be chain in more complex flows
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('login', {
            id: 1000,
            name: 'Rumen Neshev'
          });
          resolve();
        }, 1000);
      });
    },

    logout(context) {
      // synchronous action
      context.commit('logout');
    }
  }
});

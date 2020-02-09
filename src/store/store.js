import Vue from 'vue';
import Vuex from 'vuex';

import events from './modules/events';
import userAuth from './modules/userAuth';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    events,
    userAuth,
  },
});

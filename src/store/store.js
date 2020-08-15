import Vue from 'vue';
import Vuex from 'vuex';

import announcements from './modules/announcements';
import events from './modules/events';
import cart from './modules/cart';
import user from './modules/user';
import requests from './modules/requests';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    announcements,
    events,
    cart,
    user,
    requests,
  },
  actions: {
    clearAll({ commit }) {
      commit('announcements/clearAnnouncements');
      commit('events/resetEvents');
      commit('cart/clearCart');
      commit('user/resetUser');
      commit('requests/resetRequests');
    },
  },
});

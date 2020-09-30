import api from '../../api/api';

export default {
  namespaced: true,
  state: {
    pfRequests: [],
  },
  getters: {
  },
  mutations: {
    setPfRequests(state, { requests }) {
      state.pfRequests = requests;
    },
    removeRequest(state, payload) {
      state.pfRequests = state.pfRequests.filter((req) => req.id !== payload.request.id);
    },
    resetRequests(state) {
      state.pfRequests = [];
    },
  },
  actions: {
    async setPfRequests({ commit }) {
      const response = await api.getPfRequests();
      commit('setPfRequests', { requests: response.requests });
    },
    async approveRequest({ commit, state }, { requestId }) {
      const request = state.pfRequests.find((req) => req.id === requestId);
      await api.approveRequest(requestId);
      commit('removeRequest', { request });
    },
    async rejectRequest({ commit, state }, { requestId }) {
      const request = state.pfRequests.find((req) => req.id === requestId);
      await api.rejectRequest(requestId);
      commit('removeRequest', { request });
    },
  },
};

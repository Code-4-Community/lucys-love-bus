import tokenService from '../../auth/token';

export default {
  namespaced: true,
  state: {
    isSignedIn: false,
    adminLevel: -1,
    userId: -1,
  },
  getters: {
  },
  mutations: {
    setUser(state) {
      state.isSignedIn = !!(tokenService.getPrivilegeLevel() > -1);
      state.adminLevel = tokenService.getPrivilegeLevel();
      state.userId = tokenService.getUserID();
    },
    resetUser(state) {
      state.isSignedIn = false;
      state.adminLevel = -1;
      state.userId = -1;
    },
  },
  actions: {
  },
};

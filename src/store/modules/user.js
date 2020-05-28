import userState from '../../utils/auth/state/userState';

export default {
  namespaced: true,
  state: {
    isSignedIn: false,
    adminLevel: -1,
    accountStatus: '',
    userId: -1,
  },
  getters: {
  },
  mutations: {
    setUser(state) {
      state.isSignedIn = userState.getIsSignedIn();
      state.adminLevel = userState.getUserAdminLevel();
      state.accountStatus = userState.getUserAccountStatus();
      state.userId = userState.getUserId();
    },
    resetUser(state) {
      state.isSignedIn = false;
      state.adminLevel = -1;
      state.accountStatus = '';
      state.userId = -1;
    },
  },
  actions: {
  },
};

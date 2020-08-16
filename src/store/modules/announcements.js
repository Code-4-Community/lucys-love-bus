import api from '../../api/api';

export default {
  namespaced: true,
  state: {
    announcements: [],
  },
  getters: {
    getSitewideAnnouncements(state) {
      return state.announcements.filter(
        ann => !('event_id' in ann),
      );
    },
    getEventAnnouncements(state, eventId) {
      return state.announcements.filter(
        ann => ('event_id' in ann) && ann.event_id === eventId,
      );
    },
  },
  mutations: {
    loadAnnouncements(state, { announcements }) {
      announcements.forEach((ann) => {
        if (state.announcements.filter(a => a.id === ann.id).length === 0) {
          state.announcements.push(ann);
        }
      });
    },
    removeAnnouncement(state, payload) {
      state.announcements = state
        .announcements
        .filter(ann => ann.id !== payload.announcementId);
    },
    clearAnnouncements(state) {
      state.announcements = [];
    },
  },
  actions: {
    async loadSitewideAnnouncements({ commit }) {
      const response = await api.getSitewideAnnouncements();
      commit('loadAnnouncements', { announcements: response.announcements });
    },
    async loadEventAnnouncements({ commit }, eventId) {
      const response = await api.getEventAnnouncements(eventId);
      commit('loadAnnouncements', { announcements: response.announcements });
    },
    async deleteAnnouncement({ commit }, announcementId) {
      await api.deleteAnnouncement(announcementId);
      commit('removeAnnouncement', { announcementId });
    },
  },
};

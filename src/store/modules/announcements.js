import api from '../../api/api';

/**
 * Returns true if the announcement is specifically for an event.
 * @param announcement - Announcement to check
 * @returns {boolean} - True if the announcement is for an event. I.e. it contains an event ID.
 */
function isEventSpecific(announcement) {
  return announcement.eventId !== null;
}

/**
 * Returns true if the list does not contain the announcement.
 * @param list - List to check in
 * @param announcement - Announcement to look for
 * @returns {boolean} - True if the list contains an announcement
 *                      with the same announcement ID as the argument.
 */
function containsAnnouncement(list, announcement) {
  return list.some(a => a.id === announcement.id);
}

/**
 *
 * @param list - List to remove an announcement from.
 * @param announcementId - Announcement ID to remove
 * @returns {List} - List with the given announcement removed.
 */
function removeAnnouncement(list, announcementId) {
  return list.filter(ann => ann.id !== announcementId);
}

export default {
  namespaced: true,
  state: {
    sitewideAnnouncements: [],
    // maps event_id -> list of announcements for that event
    eventSpecificAnnouncements: [],
  },
  getters: {
    getSitewideAnnouncements(state) {
      return state.sitewideAnnouncements;
    },
    getEventSpecificAnnouncements(state) {
      return eventId => state.eventSpecificAnnouncements.filter(
        ann => ann.eventID === eventId,
      );
    },
  },
  mutations: {
    loadSitewideAnnouncements(state, { announcements }) {
      announcements.forEach((ann) => {
        if (!containsAnnouncement(state.sitewideAnnouncements, ann)) {
          state.sitewideAnnouncements.push(ann);
        }
      });
    },
    loadEventSpecificAnnouncements(state, { announcements }) {
      announcements.forEach((ann) => {
        if (!containsAnnouncement(state.eventSpecificAnnouncements, ann)) {
          state.eventSpecificAnnouncements.push(ann);
        }
      });
    },
    deleteAnnouncement(state, payload) {
      console.log(payload.announcement);
      console.log(isEventSpecific(payload.announcement));
      if (isEventSpecific(payload.announcement)) {
        state.eventSpecificAnnouncements = removeAnnouncement(
          state.eventSpecificAnnouncements, payload.announcement.id,
        );
      } else {
        state.sitewideAnnouncements = removeAnnouncement(
          state.sitewideAnnouncements, payload.announcement.id,
        );
      }
    },
    clearAnnouncements(state) {
      state.sitewideAnnouncements = [];
      state.eventSpecificAnnouncements = new Map();
    },
  },
  actions: {
    async loadSitewideAnnouncements({ commit }) {
      const response = await api.getSitewideAnnouncements();
      commit('loadSitewideAnnouncements', { announcements: response.announcements });
    },
    async loadEventSpecificAnnouncements({ commit }, eventId) {
      const response = await api.getEventAnnouncements(eventId);
      commit('loadEventSpecificAnnouncements', { announcements: response.announcements });
    },
    async deleteAnnouncement({ commit }, announcement) {
      await api.deleteAnnouncement(announcement.id);
      commit('deleteAnnouncement', { announcement });
    },
  },
};

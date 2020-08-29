import api from '../../api/api';

/**
 * Returns true if the announcement is specifically for an event.
 * @param announcement - Announcement to check
 * @returns {boolean} - True if the announcement is for an event. I.e. it contains an event ID.
 */
function isEventSpecific(announcement) {
  return announcement.event_id >= 0;
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
    eventSpecificAnnouncements: new Map(),
  },
  getters: {
    getSitewideAnnouncements(state) {
      return state.sitewideAnnouncements;
    },
    getEventSpecificAnnouncements(state, eventId) {
      return state.eventSpecificAnnouncements[eventId];
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
        if (ann.event_id in state.eventSpecificAnnouncements) {
          if (!containsAnnouncement(state.eventSpecificAnnouncements, ann)) {
            state.eventSpecificAnnouncements.event_id.append(ann);
          }
        } else {
          const tempList = [ann];
          state.eventSpecificAnnouncements.set(ann.event_id, tempList);
        }
      });
    },
    deleteAnnouncement(state, payload) {
      if (!isEventSpecific(payload)) {
        state.sitewideAnnouncements = removeAnnouncement(
          state.sitewideAnnouncements, payload.announcementId,
        );
      } else {
        state.eventSpecificAnnouncements.set(payload.announcementId,
          removeAnnouncement(
            state.eventSpecificAnnouncements.get(payload.announcementId),
            payload.announcementId,
          ));
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
    async deleteAnnouncement({ commit }, announcementId) {
      await api.deleteAnnouncement(announcementId);
      commit('deleteAnnouncement', { announcementId });
    },
  },
};

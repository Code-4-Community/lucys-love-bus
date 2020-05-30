import moment from 'moment';
import api from '../../api/api';

export default {
  namespaced: true,
  state: {
    upcomingEvents: [],
    myEvents: [],
  },
  getters: {
    getPageOfEvents: state => (currentPage, eventsPerPage) => {
      // pages are 0-indexed
      const firstEvent = currentPage * eventsPerPage;
      const lastEvent = firstEvent + eventsPerPage;
      // slice truncates any out-of-bounds indices, so that's not a concern here
      return state.events.slice(firstEvent, lastEvent);
    },
  },
  mutations: {
    setUpcomingEvents(state, { events }) {
      state.upcomingEvents = events;
    },
    setMyEvents(state, { events }) {
      state.myEvents = events;
    },
    deleteEvent(state, eventId) {
      state.myEvents = state.myEvents.filter(event => event.id === eventId);
      state.upcomingEvents = state.upcomingEvents.filter(event => event.id === eventId);
    },
    resetEvents(state) {
      state.myEvents = [];
      state.upcomingEvents = [];
    },
  },
  actions: {
    async setUpcomingEvents({ commit }) {
      const events = await api.getUpcomingEvents();
      commit('setUpcomingEvents', { events });
    },
    async setMyEventsFromNow({ commit }) {
      const now = moment().format('YYYY-MM-DD HH:MM:SS');
      const events = await api.getMyEvents(now);
      commit('setMyEvents', { events });
    },
    async deleteEvent({ commit }, eventId) {
      try {
        const res = await api.deleteEvent(eventId);
        commit('deleteEvent', eventId);
        // eslint-disable-next-line no-alert
        alert('Successfully deleted!');
        return res;
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('ERROR', error);
        return error;
      }
    },
  },
};

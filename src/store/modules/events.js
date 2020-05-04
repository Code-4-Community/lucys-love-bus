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
    numOfEvents: state => state.events.length,
    getEventById: state => id => state.events.find(event => event.id === id),
  },
  mutations: {
    setUpcomingEvents(state, { events }) {
      state.upcomingEvents = events;
    },
    setMyEvents(state, { events }) {
      state.myEvents = events;
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
  },
};

export default {
  namespaced: true,
  state: {
    /* List-of {tickets: Integer, event: Object} */
    cartEvents: [],
  },
  getters: {
    getSubTotal(state) {
      return state.cartEvents.reduce((acc, cartEvent) => acc + cartEvent.price, 0);
    },
    cartTickets(state) {
      return (eventId) => {
        const event = state.cartEvents.find(e => e.id === eventId);
        if (event) {
          return event.tickets;
        }
        return 0;
      };
    },
  },
  mutations: {
    registerForEvent(state, { tickets, event }) {
      if (tickets > 0) {
        const stateEvent = state.cartEvents.find(cartEvent => cartEvent.id === event.id);
        if (stateEvent) {
          stateEvent.tickets = tickets;
        } else {
          const newEvent = { ...event, tickets };
          state.cartEvents.push(newEvent);
        }
      } else {
        const idx = state.cartEvents.findIndex(e => e.id === event.id);
        if (idx > -1) {
          state.cartEvents.splice(idx, 1);
        }
      }
    },
    cancelRegistration(state, { event }) {
      state.cartEvents = state.cartEvents.filter(cartEvent => cartEvent.id !== event.id);
    },
    clearCart(state) {
      state.cartEvents = [];
    },
  },
  actions: {

  },
};

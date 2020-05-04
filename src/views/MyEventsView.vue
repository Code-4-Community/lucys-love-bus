<template>
  <div>
    <h1>My Events</h1>
    <h3>Here are the events you have registered for</h3>
    <div class="scroll-container">
      <events-list-scroll :events="myEvents">
        <template v-slot:noEventsMsg>
          <h3>Currently, you are signed up for no events!</h3>
        </template>
        <template v-slot:eventBtn1="slotProps">
          <router-link
                  :to="{ name: 'single-event', params: { eventId: slotProps.event.id}}"
                  class="event-btn btn--secondary" tag="button">
            Learn More
          </router-link>
        </template>
        <template v-slot:eventBtn2="slotProps">
          <button
                  v-on:click="cancelRegistration(slotProps.event)"
                  class="event-btn btn--secondary">
            Cancel
          </button>
        </template>
      </events-list-scroll>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EventsListScroll from '../components/Events/EventsListScroll.vue';

export default {
  name: 'MyEvents',
  components: {
    EventsListScroll,
  },
  props: {
    username: String,
  },
  async created() {
    await this.setMyEventsFromNow();
  },
  computed: {
    ...mapState('events', {
      myEvents: 'myEvents',
    }),
  },
  methods: {
    ...mapActions('events', {
      setMyEventsFromNow: 'setMyEventsFromNow',
    }),
    // cancelRegistration(event) {
    //   // console.log('canceled', event);
    // },
  },
};
</script>

<style>
  .scroll-container {
    position: relative;
    margin: 0 auto;
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 40rem;
    max-width: 55rem;
  }
</style>

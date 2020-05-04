<template>
  <events-list :events="upcomingEvents">
    <template v-slot:NoEventsMsg>
      <h3>Sorry, there are no currently availible events!</h3>
    </template>
    <template v-slot:eventBtn1="slotProps">
      <button
        v-on:click="register({event: slotProps.event})"
        class="event-btn" >
        Register
      </button>
    </template>
    <template v-slot:eventBtn2="slotProps">
      <router-link
        :to="{ name: 'single-event', params: { eventId: slotProps.event.id}}"
        class="event-btn btn--secondary" tag="button">
        Learn More
      </router-link>
    </template>
  </events-list>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import EventsList from '../components/Events/EventsList.vue';

export default {
  name: 'EventsView',
  components: {
    EventsList,
  },
  async created() {
    await this.setUpcomingEvents();
  },
  computed: {
    ...mapState('events', {
      upcomingEvents: 'upcomingEvents',
    }),
  },
  methods: {
    ...mapActions('events', {
      setUpcomingEvents: 'setUpcomingEvents',
    }),
    ...mapMutations('cart', {
      registerForEvent: 'registerForEvent',
    }),
    register(payload) {
      this.registerForEvent(payload);
      // eslint-disable-next-line no-alert
      alert(`You have signed up for ${payload.event.name}.`);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/global-classes.less';
</style>

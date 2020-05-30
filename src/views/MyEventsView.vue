<template>
  <div>
    <p class="page-title">My Registered Events</p>
    <events-list :events="myEvents">
      <template v-slot:NoEventsMsg>
        <h3>Currently, you are signed up for no events!</h3>
      </template>
      <template v-slot:eventBtns="slotProps">
        <button
            v-on:click="cancelRegistration(slotProps.event)"
            class="event-side-btn btn--primary">
          Cancel
        </button>
        <router-link
            :to="{ name: 'single-event', params: { eventId: slotProps.event.id}}"
            class="event-side-btn btn--secondary" tag="button">
          Learn More
        </router-link>
      </template>
    </events-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EventsList from '../components/Events/EventsList.vue';

export default {
  name: 'MyEvents',
  components: {
    EventsList,
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

<style lang="less" scoped>
  @import '../../assets/global-classes.less';
</style>

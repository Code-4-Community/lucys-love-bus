<template>
  <div>
    <p class="page-title">My Registered Events</p>
    <events-list :events="myEvents">
      <template v-slot:NoEventsMsg>
        <h3>Currently, you are not signed up for any events!</h3>
      </template>
      <template v-slot:eventBtns="slotProps">
        <div>
          You have {{ slotProps.event.ticketCount }} tickets
        </div>
        <button
            v-on:click="openRegistrationModal(slotProps.event)"
            class="event-side-btn btn--primary">
          Edit Registration
        </button>
        <router-link
            :to="{ name: 'single-event', params: { eventId: slotProps.event.id}}"
            class="event-side-btn btn--secondary" tag="button">
          Learn More
        </router-link>
      </template>
    </events-list>
    <event-registration-modal
        :open="modalOpen"
        :event="modalEvent"
        @close-registration-modal="closeRegistrationModal"
        @update-event="setMyEventsFromNow" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import EventsList from '../components/Events/EventsList.vue';
import EventRegistrationModal from '../components/Modals/EventRegistrationModal.vue';

export default {
  name: 'MyEvents',
  components: {
    EventsList,
    EventRegistrationModal,
  },
  data() {
    return {
      modalOpen: false,
      modalEvent: {},
    };
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
    openRegistrationModal(event) {
      this.modalEvent = event;
      this.modalOpen = true;
    },
    closeRegistrationModal() {
      this.modalOpen = false;
      this.modalEvent = {};
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';
</style>

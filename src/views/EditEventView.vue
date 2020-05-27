<template>
  <div>
    <div class="page-title">Edit Event</div>
    <div v-if="finishedFetching">
      <event-form :event-prop="event" @submit-event-form="editEvent" />
    </div>
  </div>
</template>

<script>
import api from '../api/api';
import EventForm from '../components/Events/EventForm.vue';

export default {
  name: 'EditEventView',
  components: { EventForm },
  props: {
    eventId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      event: null,
      finishedFetching: false,
    };
  },
  methods: {
    async retrieveSingleEventData() {
      this.event = await api.getEvent(Number(this.eventId));
      this.finishedFetching = true;
    },
    async editEvent({ event: eventPayload }) {
      const response = await api.editEvent(this.eventId, eventPayload);
      if (response) {
        await this.$router.push(`/event/${this.eventId}`);
      }
    },
  },
  mounted() {
    this.retrieveSingleEventData();
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';
</style>

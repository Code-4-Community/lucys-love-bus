<template>
    <div>
        <div class="page-title">Create Event</div>
        <div>
            <event-form :submit-name="'Create'" @submit-event-form="createEvent" />
            <h3 class="error-text--large" v-if="internalError">
                We're sorry, we couldn't create this event. Please try again later.
            </h3>
        </div>
    </div>
</template>

<script>
import EventForm from '../components/Events/EventForm.vue';
import api from '../api/api';

export default {
  name: 'CreateEvent',
  components: { EventForm },
  data: () => ({
    internalError: false,
    userError: false,
  }),
  methods: {
    async createEvent({ event }) {
      const response = await api.createEvent(event);
      if (!(response.status) || response.status >= 500) {
        this.internalError = true;
      } else if (response.status >= 400) {
        this.userError = true;
      } else {
        await this.$router.push('/upcoming-events');
      }
    },
  },
};
</script>

<style lang="less" scoped>
    @import '../../assets/global-classes.less';
</style>

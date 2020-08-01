<template>
    <div>
        <div class="page-title">Create Event</div>
        <div>
            <event-form :submit-name="'Create'" @submit-event-form="createEvent" />
            <h3 class="error-text--large" v-if="internalError">
                {{ this.internalErrorMsg }}
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
    internalError: true,
    internalErrorMsg: '',
  }),
  methods: {
    async createEvent({ event }) {
      const response = await api.createEvent(event);
      if (response.status >= 200 && response.status < 300) {
        await this.$router.push('/upcoming-events');
      } else {
        this.internalErrorMsg = response.message;
        this.internalError = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
    @import '../../assets/global-classes.less';
</style>

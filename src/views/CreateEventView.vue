<template>
    <div>
        <div class="title">Create Event</div>
        <div>
            <event-form @submit-event-form="createEvent" />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import EventForm from '../components/Events/EventForm.vue';
import api from '../api/api';

Vue.use(VeeValidate);
export default {
  name: 'CreateEvent',
  components: { EventForm },
  methods: {
    async createEvent({ event }) {
      const response = await api.createEvent(event);
      if (response) {
        await this.$router.push('/upcoming-events');
      }
    },
  },
};
</script>

<style scoped>
.title {
    text-align: left;
    font-size: 2.3rem;
}
</style>

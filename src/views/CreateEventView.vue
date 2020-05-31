<template>
    <div>
        <div class="page-title">Create Event</div>
        <div>
            <event-form :submit-name="'Create'" @submit-event-form="createEvent" />
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

<style lang="less" scoped>
    @import '../../assets/global-classes.less';
</style>

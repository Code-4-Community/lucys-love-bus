<template>
  <div>
  <events-list :events="allEvents">
    <template v-slot:noEventsMsg>
      <h3>Sorry, there are no currently availible events!</h3>
    </template>
  </events-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventsList from '../components/Events/EventsList.vue';

export default {
  name: 'UpcomingEventsView',
  components: {
    EventsList,
  },
  computed: {
    ...mapState('events', {
      allEvents: 'events',
    }),
  },
  methods: {
    announce(payload) {
      // eslint-disable-next-line no-alert
      alert(`Once created, link create-announcement component here for ${payload.event.title}.`);
    },
    viewRSVP(payload) {
      // eslint-disable-next-line no-alert
      alert(`The users registered for ${payload.event.title} are not loaded yet`);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/global-classes.less';
</style>

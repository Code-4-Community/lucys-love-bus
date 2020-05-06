<template>
  <div class="event__container">
      <div class="event-img">
          <img :src="event.thumbnail" />
      </div>
      <div class="event-content">
          <div class="content-wrapper">
              <h3>{{ event.title }}</h3>
              <p>{{ event.details.description }}</p>
          </div>
      </div>
       <div class="event-btns--user">
        <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF], USER[ROLE.ADMIN]]">
          <slot name="btn1" :event="event" />
          <slot name="btn2" :event="event" />
        </access-control>
      </div>
      <div class="event-btns--admin_container">
        <access-control :roles="[USER[ROLE.ADMIN]]"
        :_class="['event-btns--admin_wrapper']">
          <router-link
            :to="{ name: 'create-event', params: { eventId: event.id}}"
            class="event-btn" tag="button">
            Edit
          </router-link>
          <router-link
            :to="{ name: 'create-announcement', params: { eventName: event.name}}"
            class="event-btn" tag="button">
            Announce
          </router-link>
          <button
            v-on:click="viewRSVP({event: event})"
            class="event-btn">
            View RSVP
          </button>
        </access-control>
      </div>
  </div>
</template>

<script>
import AccessControl from '../AccessControl/AccessControl.vue';
import {
  USER, ROLE,
} from '../../utils/constants/user';

export default {
  name: 'Event',
  components: {
    AccessControl,
  },
  data() {
    return {
      USER,
      ROLE,
    };
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    announce(payload) {
      // eslint-disable-next-line no-alert
      alert(`Once created, link create-announcement component here for ${payload.event.title}.`);
    },
    viewRSVP(payload) {
      // eslint-disable-next-line no-alert
      alert(`The users registered for ${payload.event.title} are ${payload.event.users}.`);
    },
  },
};
</script>

<style lang="less">
    @import '../../../assets/global-classes.less';
</style>

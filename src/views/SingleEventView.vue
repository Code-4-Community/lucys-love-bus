<template>
  <div class="event-container">
      <div class="event-name">
        <h1>{{ singleEvent.title }}</h1>
      </div>
      <div class="event-description">
        <p>Event Description: {{ singleEvent.details.description }}</p>
      </div>
      <div class="event-buttons">
        <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF], USER[ROLE.ADMIN]]">
          <button v-if="registered">Unregister</button>
          <button v-else>Register!</button>
        </access-control>
        <access-control :roles="[USER[ROLE.ADMIN]]">
          <button>Edit Event</button>
        </access-control>
        <access-control :roles="[USER[ROLE.ADMIN]]">
          <router-link
          :to='{name: "create-announcement", params: {eventName: singleEvent.details.name}}'>
            <button>Announce Event</button>
          </router-link>
        </access-control>
        <router-link to="/events">
            <button>Back to Events</button>
        </router-link>
      </div>
      <div class="event-info">
        <p>Location: {{ singleEvent.details.location }}</p>
        <p>Time: {{ singleEvent.details.start }}</p>
      </div>
      <div class="event-img">
        <img :src="singleEvent.thumbnail" alt="Event Image">
      </div>
    </div>
</template>


<script>
import api from '../api/api';
import AccessControl from '../components/AccessControl/AccessControl.vue';
import {
  USER, ROLE,
} from '../utils/constants/user';

export default {
  name: 'SingleEvent',
  components: {
    AccessControl,
  },
  props: {
    eventId: { // id is a number, but props are always passed as strings
      type: String,
      required: true,
    },
  },
  data() {
    return {
      singleEvent: {
        details: {},
      },
      USER,
      ROLE,
    };
  },
  computed: {
    registered() {
      return true; // will be fetched from store in future
    },
  },
  methods: {
    async getSingleEvent() {
      const res = await api.getEvent(this.eventId);
      return res;
    },
  },
  async created() {
    this.singleEvent = await this.getSingleEvent();
  },
};
</script>

<style scoped>
    .event-container {
      margin: 3rem;
      display: grid;
      grid-template: 20% 30% 50% / 40% 40% 20%;
      justify-items: start;
    }
    .event-name {
      grid-row: 1 / 2;
    }
    .event-description{
      grid-row: 2 / 3;
      grid-column: 1 / 3;
    }
    .event-buttons {
      grid-row: 2 / 3;
      grid-column: 3 / end;
      display: flex;
      flex-direction: column;
    }
    .event-info {
      grid-row: 3 / end;
      grid-column: 1 / 2;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .event-img {
      grid-row: 3 / end;
      grid-column: 2 / end;
      justify-self: end;
    }
    img {
      width: 70%;
    }
</style>

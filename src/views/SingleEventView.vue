<template>
  <div class="event-container">
    <div class="event-name float-right">
      <h1>{{ singleEvent.title }}</h1>
    </div>
    <div class="event-img">
      <img :src="singleEvent.img" alt="Event Image">
    </div>
     <div class="event-info">
      <p>Location: {{ singleEvent.details.location }}</p>
      <p>Time: {{ date }}, {{startTime}}-{{endTime}}</p>
      <p>Event Announcements:</p>
      <div class="announcements-list__container">
        <announcements-list :eventID="eventId"/>
      </div>
    </div>
    <div class="event-description">
      <p>Event Description: {{ singleEvent.details.description }}</p>
    </div>
    <div class="event-buttons">
      <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
        <button v-if="registered" class="btn--primary">Unregister</button>
        <button v-else class="btn--primary">Register!</button>
        <router-link to="/events" tag="button" class="btn--tertiary">
          Back To Events
        </router-link>
      </access-control>
      <access-control :roles="[USER[ROLE.ADMIN]]">
        <button
          class="btn--primary"
          v-on:click="$router.push(`/edit-event/${singleEvent.id}`)">
          Edit Event
        </button>
        <button
          class="btn--tertiary"
          v-on:click="deleteEvent(singleEvent.id), $router.push('/events')">
          Delete Event
        </button>
        <router-link to="/events" tag="button" class="btn--tertiary">
          Back To Events
        </router-link>
      </access-control>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import api from '../api/api';
import AccessControl from '../components/AccessControl/AccessControl.vue';
import {
  USER, ROLE,
} from '../utils/constants/user';
import AnnouncementsList from '../components/Announcements/AnnouncementsList.vue';

export default {
  name: 'SingleEvent',
  components: {
    AccessControl,
    AnnouncementsList,
  },
  props: {
    eventId: { // id is a number, but props are always passed as strings
      type: Number,
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
    date() {
      return moment(this.singleEvent.details.start).format('dddd, MMMM Do YYYY');
    },
    startTime() {
      return moment(this.singleEvent.details.start).format('h:ma');
    },
    endTime() {
      return moment(this.singleEvent.details.end).format('h:ma');
    },
  },
  methods: {
    ...mapActions('events', {
      deleteEvent: 'deleteEvent',
    }),
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

<style lang="less" scoped>
@import '../../assets/global-classes.less';

.event-container {
  display: grid;
  height: 100%;
  max-width: 40em;
  margin: auto;
  grid-template-rows: 10% 25em auto;
  grid-template-columns: 60% 40%;
  font-family: 'Montserrat';
}
.event-name {
  grid-row: 1 ;
  grid-column: 1;
  text-align: left;
  h1 {
    margin: 0em;
  }
}
.event-description{
  grid-row: 3;
  grid-column: 1;
  text-align: left;
}
.event-buttons {
  grid-row: 3;
  grid-column: 2;
  button {
    width: 8em;
    display: block;
    padding: 8px;
    font-size: 16px;
    border-radius: 2px;
    border: none;
    color: white;
    margin: 1em auto 1em auto;
    cursor: pointer;
  }
}
.event-info {
  grid-row: 2;
  grid-column: 2;
  text-align: left;
  padding-left: 2em;
}
/* .event-announcements {
  grid-row: 3 / 4;
  grid-column: 2 / 3;
} */
.event-img {
  grid-row: 2;
  grid-column: 1;
  width: 100%;
  height: 100%;
  background-color: grey;
}
img {
  width: 70%;
}


</style>

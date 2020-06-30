<template>
  <div class="event-container">
    <div class="top-content">
      <div class="event-title">
        {{ singleEvent.title }}
      </div>
      <div>
        <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
          <div v-if="singleEvent.ticketCount > 0" class="signed-up-message">
            You've signed up and have {{ singleEvent.ticketCount }} tickets!
          </div>
          <div v-else-if="singleEvent.spotsAvailable === 0" class="sold-out-message">
            Sold Out!
          </div>
          <div v-else-if="singleEvent.canRegister">
            <div v-if="ticketsInCart > 0">
              <span class="cart-text">
                You have {{ ticketsInCart }} tickets in your cart
              </span>
              <button class="btn--primary-orange register-button"
                      @click="openEventModal">
                Edit Tickets
              </button>
            </div>
            <button v-else
                    class="btn--primary-blue register-button"
                    @click="openEventModal">
              Sign Up!
            </button>
          </div>
          <div v-else>
            You can buy tickets on {{ gpRegisterDateString(singleEvent) }}
            <span><button class="info-btn" @click="openRoleModal">?</button></span>
          </div>
        </access-control>
      </div>
    </div>
    <div class="announcement-container" v-if="announcements.length > 0">
      <event-announcements-list :announcementsProp="announcements" />
    </div>
    <div class="middle-content">
      <div class="event-img">
        <img v-if="singleEvent.thumbnail" :src="singleEvent.thumbnail" />
        <img v-else src="https://lucys-love-bus.s3.us-east-2.amazonaws.com/events/lucys-1.600x400.jpg" />
      </div>
      <div class="event-info">
        <div class="info-block">
          <p class="subheader">Who</p>
          There are
          <span class="spotsAvailable">{{ singleEvent.spotsAvailable }}</span>
          open spots of
          <span class="capacity">{{ singleEvent.capacity }}</span>
          total
        </div>
        <div class="info-block">
          <p class="subheader">When</p>
          {{ date }}, {{startTime}}-{{endTime}}
        </div>
        <div class="info-block">
          <p class="subheader">Where</p>
          {{ singleEvent.details.location }}
        </div>
        <div class="info-block">
          <p class="subheader">What</p>
          {{ singleEvent.details.description }}
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <div class="event-buttons">
        <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF], USER[ROLE.ADMIN]]">
          <router-link
              to="/upcoming-events"
              tag="button"
              class="btn--secondary-orange">
            Back To Events
          </router-link>
        </access-control>
        <access-control :roles="[USER[ROLE.ADMIN]]">
          <router-link tag="button"  class="btn--primary-blue"
                       :to="{name: 'create-announcement',
                       params: {eventName: singleEvent.title, eventId: singleEvent.id}}"
          >
            Make Announcement
          </router-link>
        </access-control>
        <access-control :roles="[USER[ROLE.ADMIN]]">
          <button
              class="btn--primary-blue"
              v-on:click="$router.push(`/edit-event/${singleEvent.id}`)">
            Edit Event
          </button>
        </access-control>
        <access-control :roles="[USER[ROLE.ADMIN]]">
          <button
              class="btn--primary-blue"
              v-on:click="viewRSVP(singleEvent)">
            Download RSVPs
          </button>
        </access-control>
        <access-control v-if="ticketsInCart > 0" :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
          <router-link tag="button" to="/checkout" class="btn--primary-blue">
            Proceed to Cart
          </router-link>
        </access-control>
        <access-control v-if="singleEvent.ticketCount > 0" :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
          <button @click="openRegistrationModal"
                  class="btn--primary-orange">
            Edit Registration
          </button>
        </access-control>
        <access-control :roles="[USER[ROLE.ADMIN]]">
          <button
              class="btn--primary-orange"
              v-on:click="deleteEvent(singleEvent.id), $router.push('/upcoming-events')">
            Delete Event
          </button>
        </access-control>
      </div>
    </div>
    <EventModal :open="openModal"
                :event="singleEvent"
                :cartTickets="ticketsInCart"
                @close-event-modal="closeEventModal"
                @add-to-cart="addEventToCart"
    />
    <event-registration-modal
        :open="registrationModalOpen"
        :event="singleEvent"
        @close-registration-modal="closeRegistrationModal"
        @update-event="getSingleEvent" />
    <account-role-modal :open="roleModalOpen" @close-role-modal="closeRoleModal" />
  </div>
</template>


<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import moment from 'moment';
import api from '../api/api';
import AccessControl from '../components/AccessControl/AccessControl.vue';
import EventModal from '../components/Modals/EventModal.vue';
import EventAnnouncementsList from '../components/Announcements/EventAnnouncementsList.vue';
import {
  USER, ROLE,
} from '../utils/constants/user';
import DateUtils from '../utils/DateUtils';
import AccountRoleModal from '../components/Modals/AccountRoleModal.vue';
import EventRegistrationModal from '../components/Modals/EventRegistrationModal.vue';

export default {
  name: 'SingleEvent',
  components: {
    EventRegistrationModal,
    AccountRoleModal,
    EventAnnouncementsList,
    AccessControl,
    EventModal,
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
      announcements: [],
      USER,
      ROLE,
      openModal: false,
      roleModalOpen: false,
      registrationModalOpen: false,
    };
  },
  computed: {
    ...mapGetters('cart', {
      cartTickets: 'cartTickets',
    }),
    ticketsInCart() {
      return this.cartTickets(this.eventId);
    },
    date() {
      return moment(this.singleEvent.details.start).format('dddd, MMMM Do YYYY');
    },
    startTime() {
      return moment(this.singleEvent.details.start).format('h:mma');
    },
    endTime() {
      return moment(this.singleEvent.details.end).format('h:mma');
    },
  },
  methods: {
    ...mapActions('events', {
      deleteEvent: 'deleteEvent',
    }),
    ...mapMutations('cart', {
      registerForEvent: 'registerForEvent',
    }),
    gpRegisterDateString(event) {
      return DateUtils.stringDateFiveDaysBefore(event.details.start);
    },
    openEventModal() {
      this.openModal = true;
    },
    closeEventModal() {
      this.openModal = false;
    },
    addEventToCart(payload) {
      this.openModal = false;
      this.registerForEvent(payload);
    },
    openRoleModal() {
      this.roleModalOpen = true;
    },
    closeRoleModal() {
      this.roleModalOpen = false;
    },
    openRegistrationModal() {
      this.registrationModalOpen = true;
    },
    closeRegistrationModal() {
      this.registrationModalOpen = false;
    },
    async getSingleEvent() {
      this.singleEvent = await api.getEvent(this.eventId);
    },
    async getEventAnnouncements() {
      this.announcements = await api.getEventAnnouncements(this.eventId);
    },
    async viewRSVP(event) {
      const resp = await api.getEventRSVP(this.eventId);
      const isErr = (resp == null) || (resp.response && resp.response.status !== 200);
      if (!isErr) {
        const fileName = event.title ? `Event ${event.title} RSVPs` : `Event ${this.eventId} RSVPs`;
        this.forceFileDownload(resp, fileName);
      }
    },
    forceFileDownload(data, fileName) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
  async created() {
    await this.getSingleEvent();
    await this.getEventAnnouncements();
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/global-classes.less';

.event-container {
  display: flex;
  flex-direction: column;
}

.top-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.event-title {
  text-align: left;
  font-size: 2.3rem;
}
.signed-up-message {
  font-size: 1.5rem;
  color: green;
  font-weight: bold;
}
.cart-text {
  margin-right: 12px;
}
.sold-out-message {
  font-size: 1.5rem;
  color: red;
  font-weight: bold;
}
.register-button {
  font-size: 1.3rem;
  border: none;
  border-radius: 6px;
  padding: 3px 12px;
  cursor: pointer;
}

.middle-content {
  display: inline;
  margin-top: 10px;
}
.event-img {
  position: relative;
  float: left;
  max-width: 50%;
  height: auto;
}
.event-img > img {
  float: left;
  width: 90%;
}

.event-info {
  text-align: left;
}
.info-block {
  margin-bottom: 10px;
}
.subheader {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.spotsAvailable {
  font-weight: bold;
}
.capacity {
  font-weight: bold;
}


.event-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: baseline;
  margin-top: 6px;
  margin-bottom: 20px;
}
.event-buttons > div {
  width: 15%;
}
.single-event-btn {
  width: 100%;
  font-size: 1rem;
  border-radius: 4px;
  padding: 0 6px;
  cursor: pointer;
}


</style>

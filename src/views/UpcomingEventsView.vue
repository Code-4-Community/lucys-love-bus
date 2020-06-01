<template>
  <div>
    <div class="page-header">
      <p class="page-title">Our Upcoming Events</p>
      <div v-if="cartHasEvents">
        <div>
          You have
          {{ this.cartEvents.length }}
          event{{ this.cartEvents.length > 1 ? 's' : '' }}
          in your cart.
        </div>
        <router-link to="checkout">
          Proceed to cart?
        </router-link>
      </div>
    </div>
    <events-list :events="upcomingEvents">
      <template v-slot:NoEventsMsg>
        <h3>Sorry, there are currently no available events!</h3>
      </template>
      <template v-slot:eventBtns="slotProps">
        <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
          <div v-if="slotProps.event.ticketCount > 0">
            You're Signed Up!
          </div>
          <button
              v-else-if="slotProps.event.spotsAvailable === 0"
              class="event-side-btn sold-out"
              disabled>
            Sold Out
          </button>
          <button
            v-else-if="slotProps.event.canRegister"
            v-on:click="openEventModal(slotProps.event)"
            class="event-side-btn btn--primary" >
            Register
          </button>
          <div v-else>
            You can buy tickets on {{ gpRegisterDateString(slotProps.event) }}
            <span><button class="info-btn" @click="openRoleModal">?</button></span>
          </div>
        </access-control>
        <access-control :roles="[USER[ROLE.ADMIN]]">
          <router-link
              :to="{ name: 'edit-event', params: { eventId: slotProps.event.id}}"
              class="event-side-btn btn--primary" tag="button">
            Edit
          </router-link>
        </access-control>
        <access-control :roles="[USER[ROLE.ADMIN]]">
          <router-link
              class="event-side-btn btn--primary"
              tag="button"
              :to="{name: 'create-announcement',
                    params: {eventName: slotProps.event.title, eventId: slotProps.event.id}}"
          >
            Announce
          </router-link>
        </access-control>
        <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF], USER[ROLE.ADMIN]]">
          <router-link
            :to="{ name: 'single-event', params: { eventId: slotProps.event.id}}"
            class="event-side-btn btn--secondary" tag="button">
            Learn More
          </router-link>
        </access-control>
      </template>
    </events-list>
    <EventModal :open="openModal"
                :event="modalEvent"
                @close-event-modal="closeEventModal"
                @add-to-cart="addEventToCart"
    />
    <account-role-modal :open="roleModalOpen" @close-role-modal="closeRoleModal" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import EventsList from '../components/Events/EventsList.vue';
import AccessControl from '../components/AccessControl/AccessControl.vue';
import { ROLE, USER } from '../utils/constants/user';
import EventModal from '../components/Modals/EventModal.vue';
import DateUtils from '../utils/DateUtils';
import AccountRoleModal from '../components/Modals/AccountRoleModal.vue';

export default {
  name: 'UpcomingEventsView',
  components: {
    AccountRoleModal,
    EventModal,
    EventsList,
    AccessControl,
  },
  data() {
    return {
      USER,
      ROLE,
      openModal: false,
      modalEvent: {},
      roleModalOpen: false,
    };
  },
  async created() {
    await this.setUpcomingEvents();
  },
  computed: {
    ...mapState('events', {
      upcomingEvents: 'upcomingEvents',
    }),
    ...mapState('cart', {
      cartEvents: 'cartEvents',
    }),
    cartHasEvents() {
      return this.cartEvents.length > 0;
    },
  },
  methods: {
    ...mapActions('events', {
      setUpcomingEvents: 'setUpcomingEvents',
    }),
    ...mapMutations('cart', {
      registerForEvent: 'registerForEvent',
    }),
    gpRegisterDateString(event) {
      return DateUtils.stringDateFiveDaysBefore(event.details.start);
    },
    openEventModal(event) {
      this.openModal = true;
      this.modalEvent = event;
    },
    closeEventModal() {
      this.openModal = false;
    },
    openRoleModal() {
      this.roleModalOpen = true;
    },
    closeRoleModal() {
      this.roleModalOpen = false;
    },
    addEventToCart(payload) {
      this.openModal = false;
      this.registerForEvent(payload);
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';


  .sold-out {
    background-color: #AAA;
    border: 1px solid #777;
    cursor: not-allowed;
  }
</style>

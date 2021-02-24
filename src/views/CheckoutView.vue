<template>
  <div>
    <p class="page-title">My Cart</p>
    <div v-if="hasEvents">
      <p class="subtitle">You have the following events ready to checkout:</p>
      <div class="events component-wrapper">
        <events-list-checkout :events="cartEvents">
          <template v-slot:NoEventsMsg>
            <!-- TODO: This is unused since we're doing our own empty checking in this component -->
            <h3>You have no events in your cart!</h3>
          </template>
          <template v-slot:eventBtns="slotProps">
            <div>
              {{ slotProps.event.tickets }} Tickets Reserved
            </div>
            <button v-on:click="openEventModal(slotProps.event)"
                    class="btn--primary-orange">
              Edit Reservation
            </button>
            <button
                v-on:click="cancelRegistration({event: slotProps.event})"
                class="btn--primary-orange">
              Remove
            </button>
            <router-link
                :to="{ name: 'single-event', params: { eventId: slotProps.event.id}}"
                class="btn--secondary-orange" tag="button">
              Event Page
            </router-link>
          </template>
        </events-list-checkout>
      </div>
      <div class="checkout-btn" @click="checkout">
        Ready to Checkout?
      </div>
    </div>
    <div v-else>
      <p class="subtitle"></p>
      <div class="subtitle">
        You don't have any events in your cart.
        See what's coming up
        <router-link to="/upcoming-events">here</router-link>.
      </div>
    </div>
    <EventModal :open="openModal"
                :event="modalEvent"
                :cart-tickets="modalEvent.tickets"
                @close-event-modal="closeEventModal"
                @add-to-cart="addEventToCart"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import EventsListCheckout from '../components/Events/EventsListCheckout.vue';
import api from '../api/api';
import { USER, ROLE } from '../utils/constants/user';
import EventModal from '../components/Modals/EventModal.vue';

export default {
  name: 'Checkout',
  components: {
    EventModal,
    EventsListCheckout,
  },
  data() {
    return {
      openModal: false,
      modalEvent: {},
    };
  },
  computed: {
    ...mapState('cart', {
      cartEvents: 'cartEvents',
    }),
    ...mapState('user', {
      adminLevel: 'adminLevel',
    }),
    hasEvents() {
      return this.cartEvents.length > 0;
    },
    hasPaidEvents() {
      return this.cartEvents.some((event) => event.price > 0);
    },
  },
  methods: {
    ...mapMutations('cart', {
      cancelRegistration: 'cancelRegistration',
      registerForEvent: 'registerForEvent',
    }),
    async checkout() {
      if (USER[this.adminLevel] === USER[ROLE.ADMIN]
          || USER[this.adminLevel] === USER[ROLE.PF]
          || !this.hasPaidEvents) {
        try {
          await api.createEventRegistration(this.cartEvents);
          this.$router.push('/event-registration-confirmation/success');
        } catch (e) {
          // eslint-disable-next-line
          alert("Error: " + e);
        }
      } else {
        try {
          await api.createEventRegistrationAndCheckoutSession(this.cartEvents);
          // TODO: Push to stripe page
        } catch (e) {
          // eslint-disable-next-line
          alert("Error: " + e);
        }
      }
    },
    openEventModal(event) {
      this.openModal = true;
      this.modalEvent = event;
    },
    closeEventModal() {
      this.openModal = false;
    },
    addEventToCart(payload) {
      this.openModal = false;
      this.registerForEvent(payload);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/color-constants.less';
@import '../../assets/global-classes.less';

.subtitle {
  text-align: left;
  font-size: 1.5rem;
}
.subtitle > a {
  text-decoration: underline;
}

.checkout-btn {
  float: right;
  text-align: left;

  margin-top: 24px;
  padding: 12px 12px;
  padding-right: 40px;

  font-size: 1.3rem;
  border: 1px solid @green-apple;
  background-color: @green-apple;
  color: white;
  cursor: pointer;

  clip-path: polygon(0 15%, 80% 15%, 80% 0, 100% 50%, 80% 100%, 80% 85%, 0 85%);
}

</style>

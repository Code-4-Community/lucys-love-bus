<template>
  <div>
    <h1>My Cart</h1>
    <h3>You signed up for the following events:</h3>
    <div class="component-container">
      <div class="events component-wrapper">
        <events-list-scroll :events="registeredEvents">
          <template v-slot:NoEventsMsg>
            <h3>You have no events in your cart!</h3>
          </template>
          <template v-slot:eventBtn1="slotProps">
            <router-link
              :to="{ name: 'single-event', params: { eventId: slotProps.event.id}}"
              class="event-btn" tag="button">
              Event Page
            </router-link>
          </template>
          <template v-slot:eventBtn2="slotProps">
            <button
              v-on:click="cancelRegistration({event: slotProps.event})"
              class="event-btn btn--secondary">
              Remove
            </button>
          </template>
        </events-list-scroll>
      </div>
      <payment-summary
        class="payment component-wrapper"
        v-on:onClickCheckout="onClickCheckout" />
      <promo-code class="codes component-wrapper"></promo-code>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import EventsListScroll from '../components/Events/EventsListScroll.vue';
import PaymentSummary from '../components/Checkout/PaymentSummary.vue';
import PromoCode from '../components/Checkout/PromoCode.vue';
import API from '../api/api';
import { USER, ROLE } from '../utils/constants/user';

export default {
  name: 'Checkout',
  components: {
    EventsListScroll,
    PaymentSummary,
    PromoCode,
  },
  computed: {
    ...mapState('cart', {
      registeredEvents: 'registeredEvents',
    }),
    ...mapState('user', {
      adminLevel: 'adminLevel',
    }),
  },
  methods: {
    ...mapMutations('cart', {
      cancelRegistration: 'cancelRegistration',
    }),
    onClickCheckout() {
      if (USER[this.adminLevel] === USER[ROLE.ADMIN] || USER[this.adminLevel] === USER[ROLE.PF]) {
        try {
          API.createEventRegistration(this.registeredEvents);
          // eslint-disable-next-line
          alert('Successfully placed order');
        } catch (e) {
          // eslint-disable-next-line
          alert("Error: " + e);
        }
      } else {
        API.createEventRegistrationAndCheckoutSession(this.registeredEvents);
      }
    },
  },
};
</script>

<style lang="less">
@import '../../assets/color-constants.less';
  .component-container {
    margin: 0 auto;
    display: grid;
    grid-template-areas: 'events payment'
                         'events codes'
                         'events _';
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 2fr 1fr 1fr;
    grid-gap: 1rem;
    max-height: 60vh;
  }
  .component-wrapper {
    border: 1px solid @notes-form-color;
    padding: 1rem;
  }
  .events {
    grid-area: events;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  .payment {
    grid-area: payment;
  }
  .codes {
    grid-area: codes;
  }
</style>

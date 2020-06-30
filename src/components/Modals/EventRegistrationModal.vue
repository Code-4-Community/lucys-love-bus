<template>
  <transition name="modal-fade">
    <div v-show="open" class="modal-backdrop">
      <div class="modal">
        <div class="modal-title">
          Edit your Registration for {{ event.title }}!
        </div>
        <div class="modal-subheader">
          You have {{ event.ticketCount }} tickets and there are {{ event.spotsAvailable }}
          tickets available.
        </div>
        <div class="modal-body">
          <access-control :roles="[USER[ROLE.ADMIN], USER[ROLE.PF]]">
            Select how many tickets you need and press checkout when you're ready.
          </access-control>
          <access-control :roles="[USER[ROLE.GP]]">
            Select how many tickets you need and press checkout when you're ready. Tickets are not
            refundable, additional tickets can be purchased at the standard price.
          </access-control>
        </div>
        <div class="select-row">
          <select v-model="tickets" class="ticket-select">
            <option disabled value="-1">-- Select --</option>
            <option v-for="ticket in ticketOptions"
                    :value="ticket.value"
                    v-bind:key="ticket.value">{{ticket.text}}</option>
          </select>
          <span>
            Tickets
          </span>
        </div>
        <div class="btn-bar">
          <button
              class="btn--secondary-orange"
              @click="cancel"
          >
            Cancel
          </button>
          <button class="btn--primary-blue"
                  @click="checkout"
                  :disabled="ticketDelta === 0">
            {{ checkoutMessage }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import AccessControl from '../AccessControl/AccessControl.vue';
import {
  USER, ROLE,
} from '../../utils/constants/user';
import api from '../../api/api';

export default {
  name: 'EventRegistrationModal',
  components: { AccessControl },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      USER,
      ROLE,
      tickets: this.event.ticketCount,
    };
  },
  computed: {
    ...mapState('user', {
      adminLevel: 'adminLevel',
    }),
    ticketDelta() {
      return this.tickets - this.event.ticketCount;
    },
    checkoutMessage() {
      if (this.ticketDelta === 0) {
        return 'Checkout';
      } if (this.tickets === 0) {
        return 'Unregister';
      } if (this.ticketDelta < 0) {
        return `Release ${this.ticketDelta * -1} Tickets`;
      }
      return `Checkout ${this.ticketDelta} Tickets`;
    },
    ticketOptions() {
      return [
        { value: 0, text: '0' },
        { value: 1, text: '1' },
        { value: 2, text: '2' },
        { value: 3, text: '3' },
        { value: 4, text: '4' },
        { value: 5, text: '5' },
        { value: 6, text: '6' },
        { value: 7, text: '7' },
        { value: 8, text: '8' },
        { value: 9, text: '9' },
        { value: 10, text: '10' },
      ].slice(0, this.event.spotsAvailable + this.event.ticketCount + 1);
    },
  },
  watch: {
    open(newOpen) {
      if (newOpen) {
        this.tickets = this.event.ticketCount;
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('close-registration-modal');
      this.tickets = 0;
    },
    async checkout() {
      if (USER[this.adminLevel] === USER[ROLE.ADMIN] || USER[this.adminLevel] === USER[ROLE.PF]) {
        try {
          await api.updateRegistration(this.event.id, this.tickets);
        } catch (e) {
          // eslint-disable-next-line
          alert("Error: " + e);
        }
      } else {
        try {
          await api.updateRegistration(this.event.id, this.tickets);
          // TODO: Push to stripe page
        } catch (e) {
          // eslint-disable-next-line
          alert("Error: " + e);
        }
      }
      this.$emit('update-event');
      this.$emit('close-registration-modal', this.tickets);
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';
  @import '../../../assets/global-classes.less';

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    position: fixed;
    top: 22.5%;
    background: white;
    /* this works as a border, except now we can round the inner corners. */
    box-shadow: 0 0 0 12px rgba(248, 134, 52, 0.5), 0 0 0 12px white;
    border-radius: 6px;
    width: 50%;
    max-height: 500px;
    overflow-x: visible;
    display: flex;
    flex-direction: column;
    padding: 32px 32px 8px;
  }

  .modal-title {
    font-size: 1.7rem;
    font-weight: bold;
    text-align: left;
  }

  .modal-subheader {
    margin-top: 16px;
    font-size: 1.3rem;
    font-weight: lighter;
    text-align: left;
    color: #333;
  }

  .modal-body {
    margin-top: 8px;
    margin-bottom: 16px;
    text-align: left;
    font-size: 1.3rem;
  }
  .ticket-select {
    text-align: center;
    width: 5em;
    padding: 5px 35px 5px 5px;
    border: 1px solid #CCC;
    font-size: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: 96% / 15% no-repeat #F3F3F3;
    overflow-y: auto;
    cursor: pointer;
  }

  .btn-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .event-modal-btn {
    border-radius: 6px;
    padding: 3px 24px;
    font-size: 1rem;
    cursor: pointer;
  }

  .select-row {
    text-align: center;
  }
</style>

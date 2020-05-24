<template>
  <transition name="modal-fade">
    <div v-show="open" class="modal-backdrop">
      <div class="modal">
        <div class="modal-title">
          Sign Up for {{ event.title }}!
        </div>
        <div class="modal-subheader">
          There are {{ event.spotsAvailable }} tickets available.
        </div>
        <div class="modal-body">
          <div>
            How many tickets would you like to reserve?
          </div>
          <select v-model="tickets" class="ticket-select">
            <option disabled value="0">-- Select --</option>
            <option v-for="ticket in ticketOptions"
                    :value="ticket.value"
                    v-bind:key="ticket.value">{{ticket.text}}</option>
          </select>
        </div>
        <div class="btn-bar">
          <button
              class="cancel-btn btn"
              @click="cancel"
          >
            Cancel
          </button>
          <button
              class="add-btn btn"
              @click="add"
              :disabled="tickets < 1"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import DateUtils from '../../utils/DateUtils';

export default {
  name: 'EventModal',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    event: {
      type: Object,
    },
  },
  data() {
    return {
      tickets: 0,
    };
  },
  computed: {
    createdString() {
      return DateUtils.toStringDate(this.announcement.created);
    },
    ticketOptions() {
      return [
        { value: 1, text: 'One' },
        { value: 2, text: 'Two' },
        { value: 3, text: 'Three' },
        { value: 4, text: 'Four' },
        { value: 5, text: 'Five' },
        { value: 6, text: 'Six' },
        { value: 7, text: 'Seven' },
        { value: 8, text: 'Eight' },
        { value: 9, text: 'Nine' },
        { value: 10, text: 'Ten' },
      ].slice(0, this.event.spotsAvailable);
    },
  },
  methods: {
    cancel() {
      this.$emit('close-event-modal');
      this.tickets = 0;
    },
    add() {
      this.$emit('add-to-cart', { tickets: this.tickets, event: this.event });
      this.tickets = 0;
    },
    toStringDate(date) {
      return DateUtils.toStringDate(date);
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';

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
    border: solid 12px rgba(248, 134, 52, 0.5);
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 1.3rem;
  }
  .ticket-select {
    text-align: center;
    width: 30%;
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
  .btn {
    border: none;
    border-radius: 6px;
    padding: 3px 24px;
    font-size: 1rem;
    cursor: pointer;
  }
  .cancel-btn {
    color: @tangerine;
    background-color: white;
    border: 1px solid @tangerine;
  }
  .add-btn {
    color: white;
    background-color: @button-bg;
    border: 1px solid @button-bg;
  }
  .add-btn:disabled {
    cursor: auto;
    background-color: @button-bg-disabled;
    border: 1px solid @button-bg-disabled;
  }

</style>

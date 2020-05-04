<template>
    <div>
        <h3>Payment Summary</h3>
        <h3>Subtotal: ${{subtotal.toFixed(2)}}</h3>
        <h3>Taxes: ${{taxes.toFixed(2)}}</h3>
        <h3>Total: ${{totalPrice.toFixed(2)}}</h3>
        <button
          class="event-btn btn--primary"
          v-on:click="onClickCheckout">Proceed to checkout</button>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import API from '../../api/api';
import { USER } from '../../utils/constants/user';

export default {
  name: 'PaymentSummary',
  computed: {
    ...mapGetters('cart', {
      subtotal: 'getSubTotal',
    }),
    ...mapState('cart', {
      registeredEvents: 'registeredEvents',
    }),
    ...mapState('user', {
      adminLevel: 'adminLevel',
    }),
    taxes() {
      return 0;
    },
    totalPrice() {
      return this.subtotal + this.taxes;
    },
  },
  methods: {
    onClickCheckout() {
      API.handleClickCheckout(this.registeredEvents, USER[this.adminLevel]);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../../assets/color-constants.less';
    .btn--primary {
        color: white;
        background-color: @green-apple;
    }
</style>

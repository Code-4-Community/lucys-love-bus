<template>
    <div>
        <h3>Payment Summary</h3>
        <h3>Subtotal: ${{subtotal.toFixed(2)}}</h3>
        <h3>Taxes: ${{taxes.toFixed(2)}}</h3>
        <h3>Total: ${{totalPrice.toFixed(2)}}</h3>
        <button
          class="btn--primary-blue"
          v-on:click="clicked">Proceed to checkout</button>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'PaymentSummary',
  computed: {
    ...mapGetters('cart', {
      subtotal: 'getSubTotal',
    }),
    ...mapState('cart', {
      registeredEvents: 'registeredEvents',
    }),
    taxes() {
      return 0;
    },
    totalPrice() {
      return this.subtotal + this.taxes;
    },
  },
  methods: {
    clicked() {
      this.$emit('onClickCheckout');
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../../assets/color-constants.less';
</style>

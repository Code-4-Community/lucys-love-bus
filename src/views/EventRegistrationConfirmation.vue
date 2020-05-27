<template>
  <div>
    <div v-if="isSuccess">
      <confirmation-page>
        <template v-slot:header-text>
          Success! You're all signed up!
        </template>
        <template v-slot:body-text>
          You'll receive a confirmation email soon. Meanwhile, you can view or edit your
          upcoming events
          <router-link to="/my-events">here</router-link>.
        </template>
      </confirmation-page>
    </div>
    <div v-else>
      <confirmation-page>
        <template v-slot:header-text>
          Uh-Oh! Looks like there was an error signing you up!
        </template>
        <template v-slot:body-text>
          We're sorry for the error, see your upcoming events
          <router-link to="/my-events">here</router-link>.
        </template>
      </confirmation-page>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import ConfirmationPage from '../components/Confirmation/ConfirmationPage.vue';

export default {
  name: 'EventRegistrationConfirmation',
  components: {
    ConfirmationPage,
  },
  computed: {
    isSuccess() {
      return this.$route.params.success === 'success';
    },
  },
  methods: {
    ...mapMutations('cart', {
      clearCart: 'clearCart',
    }),
  },
  mounted() {
    if (this.isSuccess) {
      this.clearCart();
    }
  },
};
</script>

<style scoped>
  .icon {
    height: 100px;
    width: 100px;
  }

  .header-text {
    font-family: 'Dekko';
    font-size: 2rem;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .body-text {
    font-size: 1rem;
  }
</style>

<template>
  <div>
    <div>
      <img class="icon" src="https://api.macaronikid.com/assets/uploads/width_810,height_350,crop_false/da903fe7-49ff-40e6-9608-ca040b64fdec.png"/>
    </div>
    <div v-if="isSuccess">
      <div class="header-text">
        Success! You're all signed up!
      </div>
      <div class="body-text">
        You'll receive a confirmation email soon. Meanwhile, you can view or edit your
        upcoming events
        <router-link to="/my-events">here</router-link>.
      </div>
    </div>
    <div v-else>
      <div class="header-text">
        Uh-Oh! Looks like there was an error signing you up!
      </div>
      <div class="body-text">
        We're sorry for the error, see your upcoming events
        <router-link to="/my-events">here</router-link>.
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'EventRegistrationConfirmation',
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

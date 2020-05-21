<template>
  <div v-if="done">
    <div>
      <img class="icon" src="https://api.macaronikid.com/assets/uploads/width_810,height_350,crop_false/da903fe7-49ff-40e6-9608-ca040b64fdec.png"/>
    </div>
    <div v-if="success">
      <div class="header-text">
        Success! Your email has been verified!
      </div>
      <div class="body-text">
        Your email is now confirmed and you're ready to go. You can go back to login by clicking
        <router-link to="/login">here</router-link>.
      </div>
    </div>
    <div v-else>
      <div class="header-text">
        Uh-Oh! Looks like the verification link you followed is invalid!
      </div>
      <div class="body-text">
        You can send another link from the settings page on your profile.
        Log in to access it
        <router-link to="/login">here</router-link>.
      </div>
    </div>
  </div>
</template>

<script>
import authApi from '../api/authApi';

export default {
  name: 'VerifyEmailView',
  computed: {
    secret_key() {
      return this.$route.params.secret_key;
    },
  },
  mounted() {
    this.verify();
  },
  data() {
    return {
      done: false,
      success: false,
    };
  },
  methods: {
    verify() {
      authApi.verifyEmail(this.secret_key).then(() => {
        this.done = true;
        this.success = true;
      }).catch(() => {
        this.done = true;
        this.success = false;
      });
    },
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

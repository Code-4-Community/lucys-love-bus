<template>
  <div v-if="done">
    <div v-if="success">
      <confirmation-page>
        <template v-slot:header-text>
          Success! Your email has been verified!
        </template>
        <template v-slot:body-text>
          Your email is now confirmed and you're ready to go. You can go back to login by clicking
          <router-link to="/login">here</router-link>.
        </template>
      </confirmation-page>
    </div>
    <div v-else>
      <confirmation-page>
        <template v-slot:header-text>
          Uh-Oh! Looks like the verification link you followed is invalid!
        </template>
        <template v-slot:body-text>
          You can send another link from the settings page on your profile.
          Log in to access it
          <router-link to="/login">here</router-link>.
        </template>
      </confirmation-page>
    </div>
  </div>
</template>

<script>
import authApi from '../api/authApi';
import ConfirmationPage from '../components/Confirmation/ConfirmationPage.vue';

export default {
  name: 'VerifyEmailView',
  components: {
    ConfirmationPage,
  },
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

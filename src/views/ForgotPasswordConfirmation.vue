<template>
  <div>
    <div v-if="request">
      <confirmation-page>
        <template v-slot:header-text>
          Your password reset link is on the way!
        </template>
        <template v-slot:body-text>
          Keep an eye on your inbox (and check your spam folder as well).
          If you still haven’t received an email, click
          <span class="resend-link" @click="resend">here</span> to resend it.
        </template>
      </confirmation-page>
      <div v-if="emailResent" class="resend-text">
        Email Resent!
      </div>
    </div>
    <div v-else>
      <confirmation-page>
        <template v-slot:header-text>
          Your password has been reset!
        </template>
        <template v-slot:body-text>
          An email to confirm this change is on its way. Ready to log in? Click
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
  name: 'ForgotPasswordConfirmation',
  components: { ConfirmationPage },
  data() {
    return {
      emailResent: false,
    };
  },
  props: {
    request: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
  },
  methods: {
    async resend() {
      if (this.request && this.email) {
        const body = {
          email: this.email,
        };
        await authApi.requestPasswordReset(body);
        this.emailResent = true;
      }
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

  .resend-link {
    cursor: pointer;
    text-decoration: underline;
  }
  .resend-text {
    color: green;
    margin-top: 10px;
  }
</style>

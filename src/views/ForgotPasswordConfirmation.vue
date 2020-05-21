<template>
  <div>
    <div>
      <img class="icon" src="https://api.macaronikid.com/assets/uploads/width_810,height_350,crop_false/da903fe7-49ff-40e6-9608-ca040b64fdec.png"/>
    </div>
    <div v-if="request">
      <div class="header-text">
        Your password reset link is on the way!
      </div>
      <div class="body-text">
        Keep an eye on your inbox (and check your spam folder as well).
        If you still haven’t received an email, click
        <span class="resend-link" @click="resend">here</span> to resend it.
      </div>
      <div v-if="emailResent" class="resend-text">
        Email Resent!
      </div>
    </div>
    <div v-else>
      <div class="header-text">
        Your password has been reset!
      </div>
      <div class="body-text">
        An email to confirm this change is on its way. Ready to log in? Click
        <router-link to="/login">here</router-link>.
      </div>
    </div>
  </div>
</template>

<script>
import authApi from '../api/authApi';

export default {
  name: 'ForgotPasswordConfirmation',
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

  .resend-link {
    cursor: pointer;
    text-decoration: underline;
  }
  .resend-text {
    color: green;
    margin-top: 10px;
  }

  .body-text {
    font-size: 1rem;
  }
</style>

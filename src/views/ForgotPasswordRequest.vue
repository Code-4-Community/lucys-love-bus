<template>
  <div class="background">
    <div class="page-header">
      <div class="page-title">
        Reset Password
      </div>
      <router-link tag="button" class="btn--secondary-orange" to="/login">
        Back
      </router-link>
    </div>
    <div class="auth-container">
      <div class="form-subheader">
        Enter the email address associated with your account and you will receive an email
        with a link to reset your password.
      </div>
      <div class="input-box">
        <input
            v-model="email"
            class="input-primary"
            :class="{ 'error-input': error }"
            type="email"
            placeholder="Email Address"
        />
        <div v-if="error" class="error-text">{{ errorMessage }}</div>
      </div>
      <button @click="submit" class="btn--primary-orange">Send Link</button>
    </div>
  </div>
</template>

<script>
import { requestPasswordReset } from '../auth/authAPI';

export default {
  name: 'forgot-password-request',
  data() {
    return {
      email: '',
      error: false,
      errorMessage: '',
    };
  },
  methods: {
    async submit() {
      this.submitted = true;
      if (this.validateInput()) {
        const body = {
          email: this.email,
        };
        try {
          await requestPasswordReset(body);
          this.$router.push({
            name: 'forgot-password-confirmation',
            params: {
              request: true,
              email: this.email,
            },
          });
          this.resetInput();
        } catch (error) {
          this.error = true;
          this.errorMessage = error.message;
        }
      } else {
        this.error = true;
        this.errorMessage = 'Please enter a valid email address';
      }
    },
    validateInput() {
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(this.email);
    },
    resetInput() {
      this.email = '';
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';

  .auth-container {
    margin-top: 30px;
  }

  .form-title {
    font-weight: bold;
    font-size: 1.3rem;
    margin-bottom: 6px;
  }
  .form-subheader {
    color: #979494;
    margin-bottom: 24px;
  }

  .input-box {
    width: 100%;
    margin-bottom: 22px;
  }
  .input-box > input {
    margin-bottom: 0;
    width: 100%;
  }
</style>

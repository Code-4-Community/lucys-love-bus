<template>
  <div class="background">
    <div class="auth-container">
      <div class="form-title">Reset your password</div>
      <div class="form-subheader">Enter the email address associated with your account</div>
      <div class="input-box">
        <input
            v-model="email"
            class="input-primary"
            type="email"
            placeholder="Email Address"
        />
        <div v-if="error" class="error-message">{{ errorMessage }}</div>
      </div>
      <button @click="submit" class="submit-btn btn--tertiary">Send Link</button>
    </div>
  </div>
</template>

<script>
import authApi from '../api/authApi';

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
          await authApi.requestPasswordReset(body);
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

  .background {
    position: absolute;
    left: 0;
    right: 0;
    background-color: #C4C4C4;
    padding: 3em 0;
  }
  .auth-container {
    text-align: left;
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
  .input-box > .error-message {
    color: red;
    font-size: 0.8rem;
  }

  .submit-btn {
    padding: 5px 0;
    border-radius: 6px;
    max-width: 30%;
  }

</style>

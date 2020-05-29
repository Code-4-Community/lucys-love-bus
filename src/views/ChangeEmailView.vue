<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        Change Account Email
      </div>
      <router-link tag="button" class="btn--secondary back-btn" to="/settings">
        Back
      </router-link>
    </div>
    <div class="page-subtitle">
      Note that this will change the email associated with the primary account owner that receives
      all notifications and updates.
    </div>
    <div class="auth-container">
      <div class="form-subtitle">
        This will also change the email you use to sign into your account with.
      </div>
      <form @submit="changeEmail" class="inputs-container">
        <div class="input-box">
          <label class="input-label">
            New Email
            <input
                v-model="email"
                class="input-primary"
                type="email"
                placeholder="New Email"
            />
          </label>
          <div v-if="submitErrors[0]" class="error-text">
            {{ submitErrors[0] }}
          </div>
        </div>
        <div class="input-box">
          <label class="input-label">
            Current Password
            <input
                v-model="password"
                class="input-primary"
                type="password"
                placeholder="Current Password"
            />
          </label>
          <div class="error-text">
            {{ submitErrors[1] }}
          </div>
        </div>
        <button type="submit" class="submit-btn btn--tertiary">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../api/api';

export default {
  name: 'ChangeEmailView',
  data() {
    return {
      email: '',
      password: '',
      submitErrors: ['', ''],
    };
  },
  methods: {
    resetInput() {
      this.email = '';
      this.password = '';
      this.submitErrors = ['', ''];
    },
    validateInput() {
      const newSubmitErrors = ['', ''];
      if (this.email.length === 0) {
        newSubmitErrors[0] = 'Please enter an email';
      }
      if (this.password.length === 0) {
        newSubmitErrors[1] = 'Please enter a password';
      }
      this.submitErrors = newSubmitErrors;
      const hasError = this.submitErrors.reduce((acc, cur) => !!acc || !!cur);
      return !hasError;
    },
    async changeEmail(event) {
      event.preventDefault();
      if (this.validateInput()) {
        const body = {
          newEmail: this.email,
          password: this.password,
        };
        try {
          await api.changeEmail(body);
          await this.$router.push({
            name: 'change-login-info-confirmation',
            params: { newEmail: this.email },
          });
          this.resetInput();
        } catch (e) {
          const newSubmitErrors = [...this.submitErrors];
          if (e.response.status === 401) {
            newSubmitErrors[1] = 'Your password is incorrect!';
          } else if (e.response.status === 409) {
            newSubmitErrors[0] = 'This email is already being used by a different account!';
          } else {
            // eslint-disable-next-line no-alert
            alert(`Caught an error: ${e}`);
          }
          this.submitErrors = newSubmitErrors;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';

  .page-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .inputs-container {
    text-align: left;
  }

  .page-subtitle {
    text-align: left;
    font-size: 1.3rem;
    max-width: 50%;
    padding-left: 16px;
  }
  .form-subtitle {
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .auth-container {
    margin-top: 24px;
  }

  .input-box {
    margin-bottom: 12px;
  }
  .input-primary {
    margin-bottom: 0;
  }
  .error-text {
    font-size: 0.8rem;
    color: red;
    text-align: left;
  }
</style>

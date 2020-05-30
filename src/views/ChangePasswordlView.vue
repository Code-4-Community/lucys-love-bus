<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        Change Account Password
      </div>
      <router-link tag="button" class="btn--secondary back-btn" to="/settings">
        Back
      </router-link>
    </div>
    <div class="auth-container">
      <div class="form-subtitle">
        This will change the password you use to sign into your account with.
      </div>
      <form @submit="changePassword" class="inputs-container">
        <div class="input-box">
          <label class="input-label">
            Current Password
            <input
                v-model="currentPassword"
                class="input-primary"
                type="password"
                placeholder="Current Password"
            />
          </label>
          <div v-if="submitErrors[0]" class="error-text">
            {{ submitErrors[0] }}
          </div>
        </div>
        <div class="input-box">
          <label class="input-label">
            New Password
            <input
                v-model="newPassword[0]"
                class="input-primary"
                type="password"
                placeholder="New Password"
            />
          </label>
          <div class="error-text">
            {{ submitErrors[1] }}
          </div>
        </div>
        <div class="input-box">
          <label class="input-label">
            Confirm New Password
            <input
                v-model="newPassword[1]"
                class="input-primary"
                type="password"
                placeholder="Confirm New Password"
            />
          </label>
          <div class="error-text">
            {{ submitErrors[2] }}
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
      currentPassword: '',
      newPassword: ['', ''],
      submitErrors: ['', '', ''],
    };
  },
  methods: {
    resetInput() {
      this.currentPassword = '';
      this.newPassword = ['', ''];
      this.submitErrors = ['', '', ''];
    },
    validateInput() {
      const newSubmitErrors = ['', '', ''];
      if (this.currentPassword.length === 0) {
        newSubmitErrors[0] = 'Please enter your password';
      }
      if (this.newPassword[0].length < 8) {
        newSubmitErrors[1] = 'Your password must be at least 8 characters';
      }
      if (this.newPassword[0].length === 0) {
        newSubmitErrors[1] = 'Please enter a new password';
      }
      if (this.newPassword[0] !== this.newPassword[1]) {
        newSubmitErrors[2] = 'Your passwords must match';
      }
      this.submitErrors = newSubmitErrors;
      const hasError = this.submitErrors.reduce((acc, cur) => !!acc || !!cur);
      return !hasError;
    },
    async changePassword(event) {
      event.preventDefault();
      if (this.validateInput()) {
        const body = {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword[0],
        };
        try {
          await api.changePassword(body);
          await this.$router.push({
            name: 'sign-up-confirmation',
            params: { newEmail: null },
          });
          this.resetInput();
        } catch (e) {
          const newSubmitErrors = [...this.submitErrors];
          if (e.response.status === 401) {
            newSubmitErrors[0] = 'Your password is incorrect!';
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

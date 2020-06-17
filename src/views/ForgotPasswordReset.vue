<template>
  <div class="background">
    <div class="page-title">
      Reset your password
    </div>
    <div class="auth-container">
      <div class="form-subheader">Enter and confirm your new password.</div>
      <div class="input-box">
        <input
            v-model="password[0]"
            class="input-primary"
            :class="{ 'error-input': error }"
            type="password"
            placeholder="New Password"
        />
        <input
            v-model="password[1]"
            class="input-primary"
            :class="{ 'error-input': error }"
            type="password"
            placeholder="Confirm Password"
        />
        <div v-if="error" class="error-text">{{ errorMessage }}</div>
      </div>
      <button @click="submit" class="btn--primary-orange">Reset</button>
    </div>
  </div>
</template>

<script>
import authApi from '../api/authApi';

export default {
  name: 'ForgotPasswordReset',
  data() {
    return {
      password: ['', ''],
      error: false,
      errorMessage: '',
    };
  },
  computed: {
    secret_key() {
      return this.$route.params.secret_key;
    },
  },
  methods: {
    async submit() {
      this.submitted = true;
      if (this.validateInput()) {
        const body = {
          secretKey: this.secret_key,
          newPassword: this.password[0],
        };
        try {
          await authApi.doPasswordReset(body);
          this.$router.push({
            name: 'forgot-password-confirmation',
            params: {
              request: false,
            },
          });
          this.resetInput();
        } catch (err) {
          this.error = true;
          if (err.response.status === 401) {
            this.errorMessage = 'This url looks like it\'s invalid, please return to login.';
          } else {
            this.errorMessage = err.response.data;
          }
        }
      }
    },
    validateInput() {
      if (this.password[0] !== this.password[1]) {
        this.error = true;
        this.errorMessage = 'Your passwords don\'t match!';
      } else if (this.password[0].length < 8) {
        this.error = true;
        this.errorMessage = 'Your password must be at least 8 characters';
      } else {
        this.error = false;
        this.errorMessage = '';
      }
      return !this.error;
    },
    resetInput() {
      this.password = ['', ''];
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
  .input-box > .error-message {
    color: red;
    font-size: 0.8rem;
  }
</style>

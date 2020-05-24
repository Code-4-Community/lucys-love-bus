<template>
  <div class="login">
    <div class="welcome center">
      <p class="welcome-header">Welcome!</p>
      <p class="welcome-body">
        The Sajni Center: A space of hope and healing. We are excited to invite you and
        your family to view the wide selection of group interactive therapies that we offer.
      </p>
    </div>
    <div class="auth-container">
      <span class="form-title">Sign in to your account</span>
      <input
        v-model="email"
        @focus="resetSubmit"
        class="input-primary"
        type="text"
        placeholder="Email Address"
      />
      <input
        v-model="password"
        @focus="resetSubmit"
        class="input-primary"
        type="password"
        placeholder="Password"
      />
      <div class="error">
        <p v-if="submitted && error" class="error-message">{{error}}</p>
      </div>
      <button @click="submit" class="login-btn submit-btn btn--tertiary">Login</button>
      <router-link class="forgot-password" to="forgot-password-request" tag="a">
        Forgot your password?
      </router-link>
      <router-link to="sign-up-landing" tag="a">
        Don't have an account?
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import authService from '../utils/service/authService';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      submitted: false,
      inputValid: false,
      error: '',
    };
  },
  methods: {
    ...mapMutations('user', {
      setUser: 'setUser',
    }),
    resetInput() {
      this.email = '';
      this.password = '';
      this.resetSubmit();
    },
    resetSubmit() {
      this.submitted = false;
      this.error = '';
    },
    validateInput() {
      this.inputValid = this.email && this.password;
      if (!this.inputValid) {
        this.error = 'Please enter an email and password';
      }
      return this.inputValid;
    },
    async submit() {
      this.submitted = true;
      if (this.validateInput()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        try {
          await authService.actions.login(user);
          this.$router.push('/profile');
          this.resetInput();
          this.setUser();
        } catch (error) {
          if (error.response.status === 401) {
            this.error = 'The email address or password you entered is incorrect.';
          } else {
            this.error = error.response.data;
          }
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
@import '../../assets/global-classes.less';

.welcome {
  margin-bottom: 20px;
}
.welcome-header {
  font-family: 'Dekko';
  margin: 0;
  font-size: 1.6rem;
  font-weight: bold;
}
.welcome-body {
  font-size: 1rem;
  max-width: 80%;
  margin: 0 auto;
}

.auth-container {
  text-align: left;
  background-color: white;
}

.login {
  background-color: #C4C4C4;
  width: 100%;
  height: 100%;
  padding: 1em 0 3em 0;
}

.form-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.login-btn {
}

.forgot-password {
  margin-bottom: 3px;
}

.error-message {
  color: red;
  text-align: left;
  font-size: 0.8rem;
  margin-top: 0;
}

a {
  color: gray;
}
</style>

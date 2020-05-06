<template>
  <div class="login">
    <div class="center">
      <router-link :to="{name: 'home'}" tag="div" class="left-tab">
        Back to Landing Page
      </router-link>
      <h4>Welcome!</h4>
      <p>A very detailed login description</p>
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
      <div class="remember-me">
        <input type="checkbox" id="rememberMe" v-model="rememberMe" />
        <label for="rememberMe">Remember me</label>
      </div>
      <button @click="submit" class="btn--tertiary">Login</button>
      <router-link to="sign-up" tag="a">Don't have an account? Sign up here!</router-link>
    </div>
    <div class="error">
      <p v-if="submitted && !inputValid">Enter an email and password</p>
      <p v-if="submitted && error">{{error}}</p>
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
          // switch this to the profile component once it's made.
          this.$router.push('/profile');
          this.resetInput();
          this.setUser();
        } catch (error) {
          this.error = error.message;
        }
      }
    },
  },
};
</script>

<style lang='less' scoped>
@import '../../assets/global-classes.less';

.login {
  background-color: #bbbbbb;
  width: 100%;
  padding: 1em 0 3em 0;
}

.remember-me {
  margin: 1em 0 1em 0;
}

a {
  text-decoration: none;
  color: gray;
}
</style>

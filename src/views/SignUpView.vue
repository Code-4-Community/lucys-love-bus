<template>
  <div>
    <router-link :to="{name: 'login'}" tag="div" class="left-tab">
        Back to Log In
    </router-link>
    <div class="center">
      <h4> Join the Sajni Center! </h4>
      <p class="text-wrap">
        If you wish to join events for free and learn about more opportunities,
        sign this form to request to be appoved by our team!
      </p>
    </div>
    <div class="auth-container">
      <span class="form-title"> Sign up for a family account </span>
      <div class="h-fields">
        <input
          v-model="firstName"
          class="input-primary half-input"
          type="text"
          placeholder="First Name">
        <input
        v-model="lastName"
        class="input-primary half-input"
        type="text"
        placeholder="Last Name">
      </div>
      <input v-model="email" class="input-primary" type="text" placeholder="Email">
      <input type="text" class="input-primary" placeholder="Some other field">
      <input type="text"  class="input-primary" placeholder="Some other field">
      <div class="h-fields">
        <input
          v-model="password[0]"
          class="input-primary half-input"
          type="password"
          placeholder="Password">
        <input
          v-model="password[1]"
          class="input-primary half-input"
          type="password"
          placeholder="Retype Password">
      </div>
      <div>
        <button @click="signup" class="btn--tertiary"> Request </button> &nbsp;
        <router-link :to="{name: 'login'}" class="med-pad-left" tag="a">
          Already have an account? Log in here!
        </router-link>
      </div>
    </div>
    <ul class="error">
      <li v-for="(err, index) in inputError" :key="index"> {{err}} </li>
      <li v-if="this.serverError"> {{this.serverError}} </li>
    </ul>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';
import authService from '../utils/service/authService';

export default {
  name: 'SignupForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ['', ''],
      inputError: [],
      serverError: '',
    };
  },
  methods: {
    ...mapMutations('user', {
      setUser: 'setUser',
    }),
    resetInput() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = ['', ''];
      this.inputError = [];
      this.serverError = '';
    },
    validate() {
      this.inputError = [];
      const err1 = this.validateUser();
      const err2 = this.validateEmail();
      const err3 = this.validatePassword();
      return err1 && err2 && err3;
    },
    validateUser() {
      if (!this.firstName || !this.lastName[1]) {
        this.inputError.push('Name cannot be empty');
      } else {
        return true;
      }
      return false;
    },
    validateEmail() {
      // eslint-disable-next-line no-useless-escape
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email) {
        this.inputError.push('Email cannot be empty');
      } else if (!emailRegex.test(this.email)) {
        this.inputError.push('Invalid Email');
      } else {
        return true;
      }
      return false;
    },
    validatePassword() {
      if (!this.password[0] && !this.password[1]) {
        this.inputError.push('Password cannot be empty');
      } else if (this.password[0] !== this.password[1]) {
        this.inputError.push('Passwords do not match');
      } else {
        return true;
      }
      return false;
    },
    async signup() {
      this.submitted = true;
      this.serverError = '';
      if (this.validate()) {
        const user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password[0],
        };
        try {
          await authService.actions.signup(user);
          this.$router.push('/profile');
          this.resetInput();
          this.setUser();
        } catch (error) {
          this.serverError = error.message;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/global-classes.less';

.auth-container {
  background-color: #fff1d4;
}

.text-wrap {
  margin: auto;
  width: 30em;
  padding-bottom: 1em;
}
.half-input {
  width: 43%;
}

a {
  text-decoration: none;
  color: gray;
}

</style>

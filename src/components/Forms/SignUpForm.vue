<template>
  <div class="auth-container">
    <div class="h-fields">
      <div class="half-input">
        <label class="input-label">
          First Name
          <input
              v-model="firstName"
              class="input-primary"
              type="text"
              placeholder="First Name*">
        </label>
      </div>
      <div class="half-input">
        <label class="input-label">
          Last Name
          <input
              v-model="lastName"
              class="input-primary"
              type="text"
              placeholder="Last Name*">
        </label>
      </div>
    </div>
    <div class="full-input">
      <label class="input-label">
        Email Address
        <input v-model.trim="email" class="input-primary" type="email" placeholder="Email Address*">
      </label>
    </div>
    <div class="half-input">
      <label class="input-label">
        Phone
        <input v-model="phone"
              class="input-primary"
              type="text"
              placeholder="Phone Number">
      </label>
    </div>
    <div class="full-input">
      <label class="input-label">
        Address
        <input v-model="address" class="input-primary" type="text"  placeholder="Address">
      </label>
    </div>
    <div class="h-fields">
      <div class="third-input">
        <label class="input-label">
          City
          <input v-model="city" class="input-primary" type="text" placeholder="City">
        </label>
      </div>
      <div class="third-input">
        <label class="input-label">
          State
          <input v-model="state" class="input-primary" type="text" placeholder="State">
        </label>
      </div>
      <div class="third-input">
        <label class="input-label">
          Zip code
          <input v-model="zip" class="input-primary" type="text"  placeholder="Zip Code">
        </label>
      </div>
    </div>
    <div>
      <label class="input-label">
        Password
        <input
            v-model="password[0]"
            class="input-primary"
            type="password"
            placeholder="Password*">
      </label>
    </div>
    <div>
      <label class="input-label">
        Retype Password
        <input
            v-model="password[1]"
            class="input-primary"
            type="password"
            placeholder="Confirm Password*">
      </label>
    </div>
    <div>
      <button @click="formCompleted" class="submit-btn btn--tertiary"> Next Page </button> &nbsp;
      <router-link :to="{name: 'login'}" class="small-pad-left" tag="a">
        Already have an account? Log in here!
      </router-link>
    </div>
    <ul class="error">
      <li v-for="(err, index) in inputError" :key="index"> {{err}} </li>
      <li v-if="this.serverError"> {{this.serverError}} </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'SignupForm',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      allergies: '',
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
      this.phone = '';
      this.address = '';
      this.city = '';
      this.state = '';
      this.zip = '';
      this.allergies = '';
      this.password = ['', ''];
      this.inputError = [];
      this.serverError = '';
    },
    validate() {
      // TODO check if a user with same email already exists in DB
      this.inputError = [];
      const err1 = this.validateUser();
      const err2 = this.validateEmail();
      const err3 = this.validatePassword();
      return err1 && err2 && err3;
    },
    validateUser() {
      if (!this.firstName || !this.lastName) {
        this.inputError.push('Please include a first and last name');
      } else {
        return true;
      }
      return false;
    },
    validateEmail() {
      // eslint-disable-next-line no-useless-escape
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email) {
        this.inputError.push('Please include an email address');
      } else if (!emailRegex.test(this.email)) {
        this.inputError.push('Invalid Email');
      } else {
        return true;
      }
      return false;
    },
    validatePassword() {
      if (!this.password[0]) {
        this.inputError.push('Please include a password');
      } else if (this.password[0].length < 8) {
        this.inputError.push('Password must be at least 8 characters');
      } else if (this.password[0] !== this.password[1]) {
        this.inputError.push('Passwords do not match');
      } else {
        return true;
      }
      return false;
    },
    formCompleted() {
      if (this.validate()) {
        const user = {
          email: this.email,
          password: this.password[0],
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phone,
          location: {
            address: this.address,
            city: this.city,
            state: this.state,
            zipCode: this.zip,
          },
        };
        this.$emit('formCompleted', user);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../../assets/global-classes.less';

.center h2 {
  font-family: Dekko, cursive;
}

a {
  text-decoration: none;
  color: gray;
}

.input-primary {
  width: 100%;
}
</style>

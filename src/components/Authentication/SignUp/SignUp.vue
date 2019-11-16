<template>
  <div>
    <h1> Signup </h1>
    <h4> Join the Sajni Center Community! </h4>
    <p> A very detailed signup description </p>
    <div class="auth-container">
      <strong> Sign up for a family account </strong>
      <input v-model="name[0]" type="text" placeholder="First Name">
      <input v-model="name[1]" type="text" placeholder="Last Name">
      <input v-model="email" type="text" placeholder="Email">
      <input v-model="password[0]" type="password" placeholder="Password">
      <input v-model="password[1]" type="password" placeholder="Retype Password">
      <button @click="signup"> Signup </button>
    </div>
    <div class="error">
      <p v-show="inputError[0]"> {{inputError[0]}} </p>
      <p v-show="inputError[1]"> {{inputError[1]}} </p>
      <p v-show="inputError[2]"> {{inputError[2]}} </p>
      <p v-if="this.serverError"> {{this.serverError}} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignupForm',
  data() {
    return {
      name: ['', ''],
      email: '',
      password: ['', ''],
      inputError: ['', '', ''],
      serverError: '',
    };
  },
  methods: {
    resetInput() {
      this.name = ['', ''];
      this.email = '';
      this.password = ['', ''];
      this.inputError = ['', '', ''];
      this.serverError = '';
    },
    validate() {
      const err1 = this.validateUser();
      const err2 = this.validateEmail();
      const err3 = this.validatePassword();
      return err1 && err2 && err3;
    },
    validateUser() {
      if (!this.name[0] || !this.name[1]) {
        this.inputError.splice(0, 1, 'Name cannot be empty');
      } else {
        this.inputError.splice(0, 1, '');
        return true;
      }
      return false;
    },
    validateEmail() {
      // eslint-disable-next-line no-useless-escape
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email) {
        this.inputError.splice(1, 1, 'Email cannot be empty');
      } else if (!emailRegex.test(this.email)) {
        this.inputError.splice(1, 1, 'Invalid Email');
      } else {
        this.inputError.splice(1, 1, '');
        return true;
      }
      return false;
    },
    validatePassword() {
      if (!this.password[0] && !this.password[1]) {
        this.inputError.splice(2, 1, 'Password cannot be empty');
      } else if (this.password[0] !== this.password[1]) {
        this.inputError.splice(2, 1, 'Passwords do not match');
      } else {
        this.inputError.splice(2, 1, '');
        return true;
      }
      return false;
    },
    async signup() {
      this.submitted = true;
      this.serverError = '';
      if (this.validate()) {
        const user = {
          firstName: this.name[0],
          lastName: this.name[1],
          email: this.email,
          password: this.password[0],
        };
        try {
          await this.$store.dispatch('signup', user);
          this.resetInput();
          this.$router.push('/home');
        } catch (error) {
          this.serverError = error.message;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>

<template>
  <div class="auth-container">
    <h1>Login</h1>
    <h4> Welcome! </h4>
    <p> A very detailed login description </p>
    <div class="auth-container">
      <strong> Sign in to your account </strong>
      <input v-model="email" @focus="resetSubmit" type="text" placeholder="Email Address" />
      <input v-model="password" @focus="resetSubmit" type="password" placeholder="Password"/>
      <button @click="submit"> Login </button>
      <label for="keepSignedIn"> Keep me signed in </label>
      <input type="checkbox" id="rememberMe" v-model="rememberMe">
      <router-link to="sign-up" tag="a"> Don't have an account? Sign up here! </router-link>
    </div>
    <div class="error">
      <p v-if="submitted && !inputValid"> Enter an email and password </p>
      <p v-if="submitted && error">{{error}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: '',
      submitted: false,
      inputValid: false,
      error: '',
    };
  },
  methods: {
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
          remember_me: this.rememberMe,
        };
        try {
          await this.$store.dispatch('login', user);
          this.resetInput();
          this.$router.push('/');
        } catch (error) {
          if (error.status === 401) {
            this.error = `Incorrect Email/Password: ${error.message}.`;
          } else {
            this.error = 'Bad request.';
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/global-classes.less';

</style>
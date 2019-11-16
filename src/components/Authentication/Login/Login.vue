<template>
  <div>
    <h1>Login</h1>
    <h4> Welcome! </h4>
    <p> A very detailed login description </p>
    <div class="auth-container">
      <strong> Sign in to your account </strong>
      <input v-model="email" @focus="resetSubmit" type="text" placeholder="Email Address" />
      <input v-model="password" @focus="resetSubmit" type="password" placeholder="Password"/>
      <button @click="submit"> Login </button>
      <router-link to="sign-up" tag="a"> Don't have an account? Sign up here! </router-link>
    </div>
    <div class="error">
      <p v-if="submitted && !inputValid()"> Enter an email and password </p>
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
      submitted: false,
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
    inputValid() {
      return this.email && this.password;
    },
    async submit() {
      this.submitted = true;
      if (this.inputValid()) {
        const user = { email: this.email, password: this.password };
        try {
          await this.$store.dispatch('login', user);
          this.resetInput();
          this.$router.push('/home');
        } catch (error) {
          this.error = `Incorrect Email/Password: ${error.message}`;
        }
      }
    },
  },
};
</script>


<style lang="less" scoped>
</style>

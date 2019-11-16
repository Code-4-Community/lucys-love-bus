<template>
  <div>
    <h1>Login</h1>
    <slot name="login-header"> default header </slot>
    <slot name="login-description"> default description </slot>
    <div class="login-container">
      <slot name="login-prompt"> default prompt </slot>
      <input v-model="email" @focus="resetSubmit" type="text" placeholder="Email Address" />
      <input v-model="password" @focus="resetSubmit" type="password" placeholder="Password"/>
      <button @click="submit"> Login </button>
      <router-link to="sign-up" tag="a"> Don't have an account? Sign up here! </router-link>
    </div>
    <div class="error">
      <p v-if="!inputValid() && submitted"> Enter an email and password </p>
      <p v-if="error && submitted">{{error}}</p>
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
  .login-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: gray;
  }
</style>

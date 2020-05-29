<template>
  <div>
    <router-link :to="{name: 'login'}" tag="div" class="left-tab">
        Back to Log In
    </router-link>
    <div class="center">
      <h2> Join the Sajni Center! </h2>
      <p class="text-wrap">
        If you wish to join events for free and learn about more opportunities,
        sign this form to request to be approved by our team!
      </p>
    </div>
    <SignUpForm @formCompleted="signup"/>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';
import authService from '../utils/service/authService';
import SignUpForm from '../components/Forms/SignUpForm.vue';

export default {
  name: 'SignupForm',
  components: {
    SignUpForm,
  },
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
    async signup(user) {
      try {
        await authService.actions.signup(user);
        this.$router.push('/form-agreements');
        // this.resetInput();
        // this.setUser();
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/global-classes.less';

.text-wrap {
  margin: auto;
  width: 30em;
  padding-bottom: 1em;
}

.half-input {
  width: 43%;
}

.center h2 {
  font-family: Dekko, cursive;
}

a {
  text-decoration: none;
  color: gray;
}

</style>

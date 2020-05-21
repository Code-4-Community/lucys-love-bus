<template>
  <div>
    <router-link :to="{name: 'login'}" tag="div" class="left-tab">
      Back to Login
    </router-link>
    <div class="center">
      <h2> Registering as a Participating Family! </h2>
      <p class="text-wrap">
        Participating Families have early access to view events and are
        elligible to attend free of charge.
        After creating an account, your request will be reviewed by a member of our administration.
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
  name: 'SignupPFForm',
  components: {
    SignUpForm,
  },
  methods: {
    ...mapMutations('user', {
      setUser: 'setUser',
    }),
    async signup(user) {
      try {
        await authService.actions.signup(user);
        this.$router.push({
          name: 'sign-up-pf-2',
          params: {
            user,
          },
        });
        // this.resetInput();
        this.setUser();
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
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

  .add-btn {
    padding: 0 1rem 1rem 0;
    background: 0;
    border: 0;
    cursor: pointer;
    font-size: 1rem;
  }

  .remove-btn {
    padding: .25rem;
    border-radius: 2px;
    background: grey;
    border: 0;
    cursor: pointer;
    font-size: .75rem;
    color: white;
  }

  .pronoun-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pronoun-wrapper h4 {
    font-weight: normal;
  }

  .invalid_form--container {
    margin-top: 1rem;
    text-align: left;
    background: rgba(255, 0, 0, 0.4);
    border-radius: 5px;
    padding: 1rem;
  }

</style>

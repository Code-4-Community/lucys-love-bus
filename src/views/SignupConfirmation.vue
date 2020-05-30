<template>
  <div class="confirmation-container">
    <div v-if="accountType === 'participating-family'">
      <confirmation-page>
        <template v-slot:header-text>
          Your account has been created and your request to be a Participating Family submitted!
        </template>
        <template v-slot:body-text>
          You can still use your account as a General Public account but you won't have full
          free access to upcoming events until an admin reviews your request. You can check the
          status of your request from the account settings page.
        </template>
      </confirmation-page>
    </div>
    <div v-else>
      <confirmation-page>
        <template v-slot:header-text>
          Your General Public account has been created!
        </template>
        <template v-slot:body-text>
          You'll be able to register for events five days before their start date for $5 per person.
          If you want to apply to become a Participating Family and get full access to events,
          you can do that from your account settings page.
        </template>
      </confirmation-page>
    </div>
    <div class="profile-route-text">
      Proceed to your profile <router-link to="/profile">here</router-link>.
    </div>
  </div>
</template>

<script>
import ConfirmationPage from '../components/Confirmation/ConfirmationPage.vue';

export default {
  name: 'SignupConfirmation',
  components: { ConfirmationPage },
  props: {
    accountType: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>

  .confirmation-container {
    width: 60%;
    margin: auto;
  }

  .profile-route-text {
    margin-top: 24px;
    font-size: 1.2rem;
  }
</style>

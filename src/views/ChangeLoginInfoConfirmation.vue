<template>
  <div>
    <div v-if="newEmail">
      <confirmation-page>
        <template v-slot:header-text>
          Your primary email address has been changed!
        </template>
        <template v-slot:body-text>
          You'll use {{ newEmail }} to login next time you come to the site and all essential
          account communication will be sent to this address. You'll receive an email confirming
          this soon!
        </template>
      </confirmation-page>
    </div>
    <div v-else>
      <confirmation-page>
        <template v-slot:header-text>
          Your password has been changed!
        </template>
        <template v-slot:body-text>
          The next time you login you can use your new password.
        </template>
      </confirmation-page>
    </div>
  </div>
</template>

<script>
import ConfirmationPage from '../components/Confirmation/ConfirmationPage.vue';

export default {
  name: 'ChangeLoginInfoConfirmation',
  components: { ConfirmationPage },
  props: {
    newEmail: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>

</style>

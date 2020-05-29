<template>
  <div>
    <div class="confirmation-container">
      <div v-if="this.success">
        <confirmation-page>
          <template v-slot:header-text>
            The
            {{ firstName }}
            {{ lastName }}
            Family has been Approved!
          </template>
          <template v-slot:body-text>
            An email to congratulate the new Participating Family is on its way.
            Use the account owner’s details below for additional communications.
          </template>
        </confirmation-page>
      </div>
      <div v-else>
        <confirmation-page>
          <template v-slot:header-text>
            The
            {{ firstName }}
            {{ lastName }}
            Family has not been Approved
          </template>
          <template v-slot:body-text>
            Is more information needed? Did you spot a mistake? Use the account owner’s details
            below to reach out and clarify, or inquire.
          </template>
        </confirmation-page>
      </div>
      <div class="flex-horizontal contact-row">
        <div class="contact-info-box">
          <div class="contact-info-label">
            Email
          </div>
          <div class="contact-info-container">
            {{ email }}
          </div>
        </div>
        <div v-if="!!this.phoneNumber" class="contact-info-box">
          <div class="contact-info-label">
            Phone Number
          </div>
          <div class="contact-info-container">
            {{ formattedPhoneNumber }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="btn-row">
        <router-link to="/family-requests" class="btn--tertiary action-btn">
          Back To Requests
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PhoneUtils from '../utils/PhoneUtils';
import ConfirmationPage from '../components/Confirmation/ConfirmationPage.vue';

export default {
  name: 'FamilyRequestConfirmation',
  components: {
    ConfirmationPage,
  },
  props: {
    success: {
      type: Boolean,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
  },
  computed: {
    formattedPhoneNumber() {
      return PhoneUtils.formatPhoneString(this.phoneNumber);
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';

  .confirmation-container {
    max-width: 40em;
    margin: 0 auto;
  }

  .icon {
    height: 100px;
    width: 100px;
  }

  .header-text {
    font-family: 'Dekko';
    font-size: 2rem;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .body-text {
    font-size: 1.3rem;
    margin-bottom: 30px;
  }

  .btn-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .contact-row {
    margin-top: 24px;
  }
  .contact-info-box {
    width: 40%;
  }
  .contact-info-label {
    text-align: left;
  }
  .contact-info-container {
    padding: 0.5em 1em;
    border: 2px solid #888;
    border-radius: 4px;
  }

  .action-btn {
    font-size: 0.9rem;
    border-radius: 4px;
    padding: 6px 2em;
    margin-top: 30px;
    text-decoration: none;
    cursor: pointer;
  }
</style>

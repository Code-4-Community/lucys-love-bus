<template>
  <div>
    <div class="confirmation-container">
      <div>
        <img class="icon" src="https://api.macaronikid.com/assets/uploads/width_810,height_350,crop_false/da903fe7-49ff-40e6-9608-ca040b64fdec.png"/>
      </div>
      <div v-if="this.success">
        <div class="header-text">
          The
          {{ firstName }}
          {{ lastName }}
          Family has been Approved!
        </div>
        <div class="body-text">
          An email to congratulate the new Participating Family is on its way.
          Use the account owner’s details below for additional communications.
        </div>
      </div>
      <div v-else>
        <div class="header-text">
          The
          {{ firstName }}
          {{ lastName }}
          Family has not been Approved
        </div>
        <div class="body-text">
          Is more information needed? Did you spot a mistake? Use the account owner’s details
          below to reach out and clarify, or inquire.
        </div>
      </div>
      <div class="flex-horizontal">
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

export default {
  name: 'FamilyRequestConfirmation',
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

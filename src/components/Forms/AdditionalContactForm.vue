<template>
  <div>
    <div class="h-fields">
      <div class="half-input">
        <div class="input-box">
          <label class="input-label">
            First Name
            <input
                v-model="value.firstName"
                :disabled="disableChange"
                class="input-primary"
                :class="{ 'error-input': !!submitErrors.firstName }"
                type="text"
                placeholder="First Name *">
          </label>
          <div class="error-text">
            {{ submitErrors.firstName }}
          </div>
        </div>
      </div>
      <div class="half-input">
        <div class="input-box">
          <label class="input-label">
            Last Name
            <input
                v-model="value.lastName"
                :disabled="disableChange"
                class="input-primary"
                :class="{ 'error-input': !!submitErrors.lastName }"
                type="text"
                placeholder="Last Name *">
          </label>
          <div class="error-text">
            {{ submitErrors.lastName }}
          </div>
        </div>
      </div>
    </div>
    <div class="input-box">
      <div class="pronoun-wrapper">
        <h4>Preferred Pronouns</h4>
        <button v-on:click="value.pronouns = 'HE/HIM'"
                :class="{'pronoun-btn' : value.pronouns !== 'HE/HIM',
                           'pronoun-btn-selected' : value.pronouns === 'HE/HIM',
                           'error-input': !!submitErrors.pronouns && !value.pronouns}"
                :disabled="disableChange">
          He/Him</button>
        <button v-on:click="value.pronouns = 'SHE/HER'"
                :class="{'pronoun-btn' : value.pronouns !== 'SHE/HER',
                           'pronoun-btn-selected' : value.pronouns === 'SHE/HER',
                           'error-input': !!submitErrors.pronouns && !value.pronouns}"
                :disabled="disableChange">
          She/Her</button>
        <button v-on:click="value.pronouns = 'THEY/THEM'"
                :class="{'pronoun-btn' : value.pronouns !== 'THEY/THEM',
                           'pronoun-btn-selected' : value.pronouns === 'THEY/THEM',
                           'error-input': !!submitErrors.pronouns && !value.pronouns}"
                :disabled="disableChange">
          They/Them</button>
      </div>
      <div v-if="!!submitErrors.pronouns && !value.pronouns" class="error-text">
        {{ submitErrors.pronouns }}
      </div>
    </div>
    <div class="input-box">
      <div class="h-fields email-input-row">
        <div class="two-third-input">
            <label class="input-label">
              Email Address
              <input v-model.trim="value.email"
                     :disabled="disableChange"
                     type="email"
                     class="input-primary"
                     :class="{ 'error-input': !!submitErrors.email }"
                     placeholder="Email Address *">
            </label>
        </div>
        <div class="checkbox-container" v-if="!disableChange">
          <label class="checkbox-label input-primary">
            <input type="checkbox" checked="checked" v-model="value.shouldSendEmails">
            <span class="checkmark"/>
            <span class="checkbox-message">
                    Receive News & Updates?
                  </span>
          </label>
        </div>
      </div>
      <div class="error-text">
        {{ submitErrors.email }}
      </div>
    </div>
    <div class="h-fields">
      <div class="half-input">
        <div class="input-box">
          <label class="input-label">
            Phone Number
            <input v-model="value.phoneNumber"
                   :disabled="disableChange"
                   type="text"
                   class="input-primary"
                   :class="{ 'error-input': !!submitErrors.phoneNumber }"
                   placeholder="PhoneNumber">
          </label>
          <div class="error-text">
            {{ submitErrors.phoneNumber }}
          </div>
        </div>
      </div>
      <div class="half-input">
        <div class="input-box">
          <label class="input-label">
            Date of Birth
            <input v-model="value.dateOfBirth"
                   :disabled="disableChange"
                   type="date"
                   class="input-primary"
                   :class="{ 'error-input': !!submitErrors.dateOfBirth }"
                   placeholder="Date of Birth    DD/MM/YYYY">
          </label>
          <div class="error-text">
            {{ submitErrors.dateOfBirth }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <label class="input-label">
        Allergies
        <textarea v-model="value.allergies"
                  :disabled="disableChange"
                  type="text"
                  class="input-primary"
                  placeholder="Allergies"/>
      </label>
    </div>
    <div>
      <label class="input-label">
        Diagnosis (if applicable)
        <textarea v-model="value.diagnosis"
                  :disabled="disableChange"
                  type="text"
                  class="input-primary"
                  placeholder="Diagnosis (if applicable)"/>
      </label>
    </div>
    <div>
      <label class="input-label">
        Medications (if applicable)
        <textarea v-model="value.medications"
                  :disabled="disableChange"
                  type="text"
                  class="input-primary"
                  placeholder="Medications (if applicable)"/>
      </label>
    </div>
    <div>
      <label class="input-label">
        Other Notes
        <textarea v-model="value.notes"
                  :disabled="disableChange"
                  type="text"
                  class="input-primary"
                  placeholder="Other Notes"/>
      </label>
    </div>
  </div>
</template>

<script>
import DateUtils from '../../utils/DateUtils';

export default {
  name: 'AdditionalContactForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
    disableChange: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      submitErrors: {},
    };
  },
  methods: {
    validateInput() {
      const newSubmitErrors = {};
      if (this.value.firstName.length === 0) {
        newSubmitErrors.firstName = 'required';
      }
      if (this.value.lastName.length === 0) {
        newSubmitErrors.lastName = 'required';
      }
      if (this.value.pronouns.length === 0) {
        newSubmitErrors.pronouns = 'required';
      }
      if (this.value.phoneNumber.length > 0 && !/^\d{10}$/.test(this.value.phoneNumber)) {
        newSubmitErrors.phone = 'phone must be exactly 10 digits, do not include dashes or other punctuation';
      }
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(this.value.email)) {
        newSubmitErrors.email = 'please enter a valid email address';
      }
      if (this.value.email.length === 0) {
        newSubmitErrors.email = 'required';
      }

      if (!this.atLeast18(this.value.dateOfBirth)) {
        newSubmitErrors.dateOfBirth = 'contacts must be at least 18 years old';
      }
      if (!this.inPast(this.value.dateOfBirth)) {
        newSubmitErrors.dateOfBirth = 'birth date must be in the past';
      }
      if (this.value.dateOfBirth.length === 0) {
        newSubmitErrors.dateOfBirth = 'required';
      }

      this.submitErrors = newSubmitErrors;
      return Object.keys(newSubmitErrors).length === 0 && newSubmitErrors.constructor === Object;
    },
    inPast(birthDate) {
      return DateUtils.isInPast(birthDate);
    },
    atLeast18(birthDate) {
      return DateUtils.is18YearsInPast(birthDate);
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/global-classes.less';

  .email-input-row {
    align-items: flex-end;
  }

  .checkbox-container {
    margin-left: 6px;
  }
  .checkbox-label {
    border: none;
    padding: 0 6px;
  }
  .checkbox-message {
    font-size: 1rem;
    margin-left: 6px;
  }

  .input-box {
    margin-bottom: 0.5em;
  }
  .input-primary {
    margin-bottom: 0;
  }
</style>

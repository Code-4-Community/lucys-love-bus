<template>
  <div>
    <div class="h-fields">
      <div class="half-input">
        <label class="input-label">
          First Name
          <input
              v-model="value.firstName"
              :disabled="disableChange"
              class="input-primary"
              type="text"
              placeholder="First Name">
        </label>
      </div>
      <div class="half-input">
        <label class="input-label">
          Last Name
          <input
              v-model="value.lastName"
              :disabled="disableChange"
              class="input-primary"
              type="text"
              placeholder="Last Name">
        </label>
      </div>
    </div>
    <div class="pronoun-wrapper">
      <h4>Preferred Pronouns</h4>
      <button v-on:click="value.pronouns = 'HE/HIM'"
              :class="{'pronoun-btn' : value.pronouns !== 'HE/HIM',
                         'pronoun-btn-selected' : value.pronouns === 'HE/HIM'}"
              :disabled="disableChange">
        He/Him</button>
      <button v-on:click="value.pronouns = 'SHE/HER'"
              :class="{'pronoun-btn' : value.pronouns !== 'SHE/HER',
                         'pronoun-btn-selected' : value.pronouns === 'SHE/HER'}"
              :disabled="disableChange">
        She/Her</button>
      <button v-on:click="value.pronouns = 'THEY/THEM'"
              :class="{'pronoun-btn' : value.pronouns !== 'THEY/THEM',
                         'pronoun-btn-selected' : value.pronouns === 'THEY/THEM'}"
              :disabled="disableChange">
        They/Them</button>
    </div>
    <div class="h-fields email-input-row">
      <div class="two-third-input">
        <label class="input-label">
          Email Address
          <input v-model="value.email"
                 :disabled="disableChange"
                 type="text"
                 class="input-primary"
                 placeholder="Email Address">
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
    <div class="h-fields">
      <div class="half-input">
        <label class="input-label">
          Phone Number
          <input v-model="value.phoneNumber"
                 :disabled="disableChange"
                 type="text"
                 class="input-primary"
                 placeholder="PhoneNumber">
        </label>
      </div>
      <div class="half-input">
        <label class="input-label">
          Date of Birth
          <input v-model="value.dateOfBirth"
                 :disabled="disableChange"
                 type="date"
                 class="input-primary"
                 placeholder="Date of Birth    DD/MM/YYYY">
        </label>
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
  methods: {
    validateInput() {
      // eslint-disable-next-line no-alert
      alert('Validating an additional contact now');
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/global-classes.less';

  .email-input-row {
    align-items: flex-end;
  }
  .email-input-row > .checkbox-container {
    margin-bottom: 8px;
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

</style>

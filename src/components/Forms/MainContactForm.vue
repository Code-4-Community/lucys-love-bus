<template>
  <div>
    <h3>More About You (Account Owner)</h3>
    <div class="h-fields">
      <div class="half-input">
        <label>
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
        <label>
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
    <div>
      <label>
        Email
        <input
            class="input-primary"
            type="text"
            v-bind:placeholder="value.email"
            :disabled="true">
      </label>
    </div>
    <div class="h-fields">
      <div class="half-input">
        <label>
          Phone Number
          <input
              v-model="value.phoneNumber"
              :disabled="disableChange"
              class="input-primary"
              type="text"
              placeholder="Phone Number">
        </label>
      </div>
      <div class="half-input">
        <label>
          Date of Birth
          <input
              v-model="value.dateOfBirth"
              :disabled="disableChange"
              class="input-primary"
              type="date">
        </label>
      </div>
    </div>
    <div>
      <label>
        Allergies
        <textarea v-model="value.allergies"
                  type="text"
                  :disabled="disableChange"
                  class="input-primary"
                  placeholder="Allergies"/>
      </label>
    </div>
    <div>
      <label>
        Diagnosis (if applicable)
        <textarea v-model="value.diagnosis"
                  type="text"
                  :disabled="disableChange"
                  class="input-primary"
                  placeholder="Diagnosis (if applicable)"/>
      </label>
    </div>
    <div>
      <label>
        Medications (if applicable)
        <textarea v-model="value.medications"
                  type="text"
                  :disabled="disableChange"
                  class="input-primary"
                  placeholder="Medications (if applicable)"/>
      </label>
    </div>
    <div>
      <label>
        Other Notes
        <textarea v-model="value.notes"
                  type="text"
                  :disabled="disableChange"
                  class="input-primary" placeholder="Other Notes"/>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainContactForm',
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
};
</script>

<style lang="less" scoped>
  @import '../../../assets/global-classes.less';

  label > .input-primary {
    margin-top: 0;
  }

  label {
    font-size: 0.7rem;
    cursor: pointer;
  }

</style>

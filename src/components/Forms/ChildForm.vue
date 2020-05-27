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
    <div class="half-input">
      <label class="input-label">
        Date of Birth
        <input
            v-model="value.dateOfBirth"
            :disabled="disableChange"
            class="input-primary"
            type="date"
            placeholder="Date of Birth  DD/MM/YYYY">
      </label>
    </div>
    <div class="h-fields">
      <div class="half-input">
        <label class="input-label">
          School
          <input v-model="value.school"
                 :disabled="disableChange"
                 type="text"
                 class="input-primary"
                 placeholder="School">
        </label>
      </div>
      <div class="half-input">
        <label class="input-label">
          School Year
          <input v-model="value.schoolYear"
                 :disabled="disableChange"
                 type="text"
                 class="input-primary"
                 placeholder="School Year">
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
                  placeholder="Other notes"/>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildForm',
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

</style>

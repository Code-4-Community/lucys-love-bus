<template>
  <div>
    <h3>Agreements</h3>
    <div class="auth-container">
      <p style="font-weight: bold">Please carefully read, review, and check the
        agreement boxes below in order to participate
        in programs through Lucy’s Love Bus to ensure
        the safety and comfort of all participants. </p>
      <label class="checkbox-container">
        <input type="checkbox" checked="checked" v-model="noVisitAfterSick">
        <span class="checkmark"></span>
        No family member or attendee will visit The
        Sajni Center if they have been sick in the past 24 hours,
        are feeling ill, have been exposed to a virus,
        or do not have the appropriate age required immunizations.
      </label>
      <label class="checkbox-container">
        <input type="checkbox" checked="checked" v-model="parentsRemain">
        <span class="checkmark"></span>
        All parents are to remain at
        The Sajni Center during programs.
      </label>
      <label class="checkbox-container">
        <input type="checkbox" checked="checked" v-model="upToDateVaccination">
        <span class="checkmark"></span>
        My children are up to date on all vaccinations
        and I will provide a copy of my children’s immunization records prior to
        attending any programs. (Children who are being treated for cancer often
        have severely compromised immune systems, so we are required to collect
        this information for their safety. All medical information will be stored
        in a HIPPA-compliant manner.)
      </label>
      <p style="font-weight:bold">Photo/Video Release</p>
      <p>I
        <button style="margin-right: .75rem; margin-bottom: .5rem"
                v-on:click="photoVideoReleaseConsent = true"
                :class="{'btn--secondary-selected' : photoVideoReleaseConsent,
                           'btn--secondary' : photoVideoReleaseConsent !== true}">consent</button>
        <button v-on:click="photoVideoReleaseConsent = false"
                :class="{'btn--secondary-selected' : photoVideoReleaseConsent === false,
                           'btn--secondary' : photoVideoReleaseConsent !== false}">
          do not consent</button>
        and authorize the use
        and reproduction by Lucy’s Love Bus of any and all photographs and any
        other audio-visual materials taken of me for promotional material,
        educational activities, exhibitions or for any other use for the benefit
        of the organization. </p>
      <div>
        <button v-on:click="validate"
                class="btn--secondary-selected">Sign Up!</button>
      </div>
      <div v-if="isValidForm === false" class="invalid_form--container">
        <h4>There were one or more issues with the form:</h4>
        <ul>
          <li v-for="(err, index) in inputError" :key="index"> {{err}} </li>
          <li v-if="this.serverError"> {{this.serverError}} </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FormAgreements.vue',
  data() {
    return {
      noVisitAfterSick: false,
      parentsRemain: false,
      upToDateVaccination: false,
      photoVideoReleaseConsent: undefined,
      parentGuardianName: '',
      parentGuardianInitials: '',
      dateOfSignature: '',
      inputError: [],
      serverError: '',
      isValidForm: true,
    };
  },
  methods: {
    validate() {
      this.inputError = [];
      const validForm = this.validateAgreements();
      if (validForm) {
        this.$router.push('/login');
      }
    },
    validateAgreements() {
      let isValid = true;
      if (!this.noVisitAfterSick) {
        this.inputError.push('Missing agreement to sick policy');
        isValid = false;
      }
      if (!this.parentsRemain) {
        this.inputError.push('Missing agreement to parent policy');
        isValid = false;
      }
      if (!this.upToDateVaccination) {
        this.inputError.push('Missing agreement to vaccination policy');
        isValid = false;
      }
      if (!this.photoVideoReleaseConsent) {
        this.inputError.push('Must consent to photo/video release');
        isValid = false;
      }
      this.isValidForm = isValid;
      return isValid;
    },
  },
};
</script>

<style scoped>
@import '../../../assets/global-classes.less';
@import '../../../assets/color-constants.less';

label > .input-primary {
  margin-top: 0;
}

label {
  font-size: 10px;
  cursor: pointer;
}
</style>

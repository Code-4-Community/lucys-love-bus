<template>
  <div>
    <h2>Agreements</h2>
    <div class="auth-container">
      <p style="font-weight: bold">
        Please carefully read, review, and check the
        agreement boxes below in order to participate
        in programs through Lucy’s Love Bus to ensure
        the safety and comfort of all participants.
      </p>
      <div>
        <div class="checkbox-container">
          <label class="checkbox-label">
            <input type="checkbox" v-model="noVisitAfterSick">
            <span class="checkmark" />
            <span class="checkbox-message">
            No family member or attendee will visit The
            Sajni Center if they have been sick in the past 24 hours,
            are feeling ill, have been exposed to a virus,
            or do not have the appropriate age required immunizations.
          </span>
          </label>
        </div>
        <div class="checkbox-container">
          <label class="checkbox-label">
            <input type="checkbox" v-model="parentsRemain">
            <span class="checkmark" />
            <span class="checkbox-message">
            All parents are to remain at
            The Sajni Center during programs.
          </span>
          </label>
        </div>
        <div class="checkbox-container">
          <label class="checkbox-label">
            <input type="checkbox" v-model="upToDateVaccination">
            <span class="checkmark" />
            <span class="checkbox-message">
            My children are up to date on all vaccinations
            and I will provide a copy of my children’s immunization records prior to
            attending any programs. (Children who are being treated for cancer often
            have severely compromised immune systems, so we are required to collect
            this information for their safety. All medical information will be stored
            in a HIPPA-compliant manner.)
          </span>
          </label>
        </div>
      </div>
      <p style="font-weight:bold">Photo/Video Release</p>
      <p>
        I
        <button v-on:click="photoVideoReleaseConsent = true"
                :class="{'btn--secondary-selected inline-btn' : photoVideoReleaseConsent,
                           'btn--secondary inline-btn' : photoVideoReleaseConsent !== true}">
          consent
        </button>
        <button v-on:click="photoVideoReleaseConsent = false"
                :class="{'btn--secondary-selected inline-btn' : photoVideoReleaseConsent === false,
                           'btn--secondary inline-btn' : photoVideoReleaseConsent !== false}">
          do not consent
        </button>
        and authorize the use
        and reproduction by Lucy’s Love Bus of any and all photographs and any
        other audio-visual materials taken of me for promotional material,
        educational activities, exhibitions or for any other use for the benefit
        of the organization.
      </p>
      <div>
        <button v-on:click="validate"
                class="btn--tertiary submit-btn">Sign Up!</button>
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
  name: 'SignupFormAgreements.vue',
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

<style lang="less" scoped>
  @import '../../assets/global-classes.less';
  @import '../../assets/color-constants.less';

  .checkbox-container {
    margin-top: 16px;
  }
  .checkbox-container:first-child {
    margin-top: 0;
  }
  .checkbox-label {
    align-items: flex-start;
  }
  .checkmark {
    margin-top: 8px;
    height: 25px;
    width: 25px;
  }
  .checkbox-message {
    width: 90%;
  }
  .checkbox-label .checkmark:after {
    left: 20px;
    top: 15px;
  }

  .inline-btn {
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    margin: 0 0.25rem 0 0.5rem;
    font-size: 1rem;
  }
</style>

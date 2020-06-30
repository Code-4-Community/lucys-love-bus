<template>
  <div>
    <div class="instruction-text">
      Please carefully read, review, and check the
      agreement boxes below in order to participate
      in programs through Lucy’s Love Bus to ensure
      the safety and comfort of all participants.
    </div>
    <div class="primary-agreements">
      <div class="checkbox-container">
        <label class="checkbox-label">
          <input type="checkbox" v-model="value.noVisitAfterSick">
          <span class="checkmark"
                :class="{ 'error-input': !!submitErrors.noVisitAfterSick }"/>
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
          <input type="checkbox" v-model="value.parentsRemain">
          <span class="checkmark"
                :class="{ 'error-input': !!submitErrors.parentsRemain }"/>
          <span class="checkbox-message">
            All parents are to remain at
            The Sajni Center during programs.
          </span>
        </label>
      </div>
      <div class="checkbox-container">
        <label class="checkbox-label">
          <input type="checkbox" v-model="value.upToDateVaccination">
          <span class="checkmark"
                :class="{ 'error-input': !!submitErrors.upToDateVaccination }"/>
          <span class="checkbox-message">
            My children are up to date on all vaccinations.
          </span>
        </label>
      </div>
    </div>
    <div class="instruction-text">
      Photo and Video Release
    </div>
    <div class="secondary-agreements">
      <div class="checkbox-container">
        <label class="checkbox-label">
          <input type="checkbox" v-model="value.photoVideoReleaseConsent">
          <span class="checkmark"
                :class="{ 'error-input': !!submitErrors.photoVideoReleaseConsent }"/>
          <span class="checkbox-message">
            I consent and authorize the use
            and reproduction by Lucy’s Love Bus of any and all photographs and any
            other audio-visual materials taken of me for promotional material,
            educational activities, exhibitions or for any other use for the benefit
            of the organization.
          </span>
        </label>
      </div>
    </div>
    <div v-if="submitErrors.formErrorMessage" class="form-error-message">
      {{ submitErrors.formErrorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgreementsForm',
  props: {
    value: {
      type: Object,
      required: true,
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

      if (!this.value.noVisitAfterSick) {
        newSubmitErrors.noVisitAfterSick = 'required';
      }
      if (!this.value.parentsRemain) {
        newSubmitErrors.parentsRemain = 'required';
      }
      if (!this.value.upToDateVaccination) {
        newSubmitErrors.upToDateVaccination = 'required';
      }
      if (!this.value.photoVideoReleaseConsent) {
        newSubmitErrors.photoVideoReleaseConsent = 'required';
      }

      const noErrors = Object.keys(newSubmitErrors).length === 0
        && newSubmitErrors.constructor === Object;

      if (!noErrors) {
        newSubmitErrors.formErrorMessage = 'All terms must be agreed to to register '
          + 'for the Sajni  center';
      }

      this.submitErrors = newSubmitErrors;
      return noErrors;
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/global-classes.less';
  @import '../../../assets/color-constants.less';

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

  .instruction-text {
    font-weight: bold;
    margin-bottom: 12px;
  }

  .primary-agreements {
    margin-bottom: 24px;
  }

  .error-input {
    border-color: red;
  }
  .form-error-message {
    text-align: center;
    color: red;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 16px;
  }
</style>

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
          <input type="checkbox" v-model="value.parentsRemain">
          <span class="checkmark" />
          <span class="checkbox-message">
          All parents are to remain at
          The Sajni Center during programs.
        </span>
        </label>
      </div>
      <div class="checkbox-container">
        <label class="checkbox-label">
          <input type="checkbox" v-model="value.upToDateVaccination">
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
    <div class="instruction-text">
      Photo and Video Release
    </div>
    <div class="secondary-agreements">
      <div class="checkbox-container">
        <label class="checkbox-label">
          <input type="checkbox" v-model="value.photoVideoReleaseConsent">
          <span class="checkmark" />
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
  methods: {
    validateInput() {
      // eslint-disable-next-line no-alert
      alert('Validating an agreements now');
      return true;
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
  .secondary-agreements {
  }
</style>

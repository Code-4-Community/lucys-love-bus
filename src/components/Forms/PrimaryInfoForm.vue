<template>
  <div>
    <div class="h-fields">
      <div class="half-input">
        <div class="input-box">
          <label class="input-label">
            First Name
            <input
                v-model="value.firstName"
                class="input-primary"
                :class="{ 'error-input': !!submitErrors.firstName }"
                type="text"
                placeholder="First Name*">
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
                class="input-primary"
                :class="{ 'error-input': !!submitErrors.lastName }"
                type="text"
                placeholder="Last Name*">
          </label>
          <div class="error-text">
            {{ submitErrors.lastName }}
          </div>
        </div>
      </div>
    </div>
    <div class="full-input">
      <div class="input-box">
        <label class="input-label">
          Email Address
          <input v-model="value.email"
                 class="input-primary"
                 :class="{ 'error-input': !!submitErrors.email }"
                 type="text"
                 placeholder="Email Address*">
        </label>
        <div class="error-text">
          {{ submitErrors.email }}
        </div>
      </div>
    </div>
    <div class="half-input">
      <label class="input-label">
        Phone
        <input v-model="value.phone"
               class="input-primary"
               type="text"
               placeholder="Phone Number">
      </label>
    </div>
    <div class="full-input">
      <label class="input-label">
        Address
        <input v-model="value.address" class="input-primary" type="text"  placeholder="Address">
      </label>
    </div>
    <div class="h-fields">
      <div class="third-input">
        <label class="input-label">
          City
          <input v-model="value.city" class="input-primary" type="text" placeholder="City">
        </label>
      </div>
      <div class="third-input">
        <label class="input-label">
          State
          <input v-model="value.state" class="input-primary" type="text" placeholder="State">
        </label>
      </div>
      <div class="third-input">
        <label class="input-label">
          Zip code
          <input v-model="value.zip" class="input-primary" type="text"  placeholder="Zip Code">
        </label>
      </div>
    </div>
    <div>
      <div class="input-box">
        <label class="input-label">
          Password
          <input
              v-model="value.password"
              class="input-primary"
              :class="{ 'error-input': !!submitErrors.password }"
              type="password"
              placeholder="Password*">
        </label>
        <div class="error-text">
          {{ submitErrors.password }}
        </div>
      </div>
    </div>
    <div>
      <div class="input-box">
        <label class="input-label">
          Confirm Password
          <input
              v-model="value.passwordConfirmation"
              class="input-primary"
              :class="{ 'error-input': !!submitErrors.passwordConfirmation }"
              type="password"
              placeholder="Confirm Password*">
        </label>
        <div class="error-text">
          {{ submitErrors.passwordConfirmation }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrimaryInfoForm',
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
      if (this.value.firstName.length === 0) {
        newSubmitErrors.firstName = 'required';
      }
      if (this.value.lastName.length === 0) {
        newSubmitErrors.lastName = 'required';
      }
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(this.value.email)) {
        newSubmitErrors.email = 'please enter a valid email address';
      }
      if (this.value.email.length === 0) {
        newSubmitErrors.email = 'required';
      }
      if (this.value.password.length < 8) {
        newSubmitErrors.password = 'must be at least 8 characters';
      }
      if (this.value.password.length === 0) {
        newSubmitErrors.password = 'required';
      }
      if (this.value.passwordConfirmation !== this.value.password) {
        newSubmitErrors.passwordConfirmation = 'must match password';
      }
      if (this.value.passwordConfirmation.length === 0) {
        newSubmitErrors.passwordConfirmation = 'required';
      }

      this.submitErrors = newSubmitErrors;
      return Object.keys(newSubmitErrors).length === 0 && newSubmitErrors.constructor === Object;
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/global-classes.less';

  .input-box {
    margin-bottom: 0.5em;
  }
  .input-primary {
    margin-bottom: 0;
  }

  .error-input {
    border-color: red;
  }
  .error-text {
    font-size: 0.8rem;
    color: red;
    text-align: left;
  }
</style>

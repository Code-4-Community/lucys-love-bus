<template>
  <div>
    <div class="h-fields">
      <div class="half-input">
        <label class="input-label">
          First Name
          <input
              v-model="value.firstName"
              class="input-primary"
              type="text"
              placeholder="First Name*">
        </label>
      </div>
      <div class="half-input">
        <label class="input-label">
          Last Name
          <input
              v-model="value.lastName"
              class="input-primary"
              type="text"
              placeholder="Last Name*">
        </label>
      </div>
    </div>
    <div class="full-input">
      <label class="input-label">
        Email Address
        <input v-model="value.email" class="input-primary" type="text" placeholder="Email Address*">
      </label>
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
      <label class="input-label">
        Password
        <input
            v-model="value.password"
            class="input-primary"
            type="password"
            placeholder="Password*">
      </label>
    </div>
    <div>
      <label class="input-label">
        Confirm Password
        <input
            v-model="value.passwordConfirmation"
            class="input-primary"
            type="password"
            placeholder="Confirm Password*">
      </label>
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
  methods: {
    validateInput() {
      // eslint-disable-next-line no-alert
      alert('Validating now');
      return true;
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/global-classes.less';

</style>

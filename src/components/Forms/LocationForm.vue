<template>
  <div>
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
          <input v-model="value.zipCode" class="input-primary" type="text"  placeholder="Zip Code">
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationForm',
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

  .input-primary {
    width: 100%;
  }

</style>

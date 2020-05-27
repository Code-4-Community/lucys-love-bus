<template>
  <div>
    <div>
      <img class="icon" src="https://api.macaronikid.com/assets/uploads/width_810,height_350,crop_false/da903fe7-49ff-40e6-9608-ca040b64fdec.png"/>
    </div>
    <div class="header-text">
      <slot name="header-text"></slot>
    </div>
    <div class="body-text">
      <slot name="body-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationPage',
};
</script>

<style scoped>
  .icon {
    height: 100px;
    width: 100px;
  }

  .header-text {
    font-family: 'Dekko';
    font-size: 2rem;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .body-text {
    font-size: 1rem;
  }
</style>

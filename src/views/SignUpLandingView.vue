<template>
  <div class="sl-container">
    <div class="page-header">
      <div class="page-title">
        Create an Account
      </div>
      <router-link tag="button" class="btn--secondary back-btn" to="/login">
        Back
      </router-link>
    </div>
    <div>
      <div class="options-container">
        <div class="option-container auth-container">
          <div>
            <div class="form-title">
              General Member
            </div>
            <div class="form-body">
              General Members may navigate the event calendar and purchase
              tickets once registration is open. Anyone can sign up as a General Member at
              any time.
            </div>
          </div>
          <div class="btn-row">
            <router-link tag="button" to="sign-up-gp" class="submit-btn btn--tertiary">
              Sign Up
            </router-link>
          </div>
        </div>
        <div class="option-container auth-container">
          <div>
            <div class="form-title">
              Participating Family
            </div>
            <div class="form-body">
              Participating Families have early access to all events and
              can sign up free of charge. Participating Family accounts must be reviewed and
              approved by a Lucy's Love Bus admin.
            </div>
          </div>
          <div class="btn-row">
            <router-link tag="button" to="sign-up-pf" class="submit-btn btn--tertiary">
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpLandingView',
};
</script>

<style scoped lang="less">
  @import '../../assets/global-classes.less';

  .options-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    margin-top: 30px
  }

  .option-container {
    box-sizing: border-box;
    margin-top: 0;
    width: 40%;
    height: 15rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .form-title {
    font-weight: bold;
  }

  .btn-row {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .submit-btn {
    box-sizing: border-box;
    margin-bottom: 0;
  }
</style>

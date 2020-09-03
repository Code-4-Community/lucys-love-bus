<template>
  <div class="sl-container">
    <div class="page-header">
      <div class="page-title">
        Create an Account
      </div>
      <router-link tag="button" class="btn--secondary-orange" to="/login">
        Back
      </router-link>
    </div>
    <div>
      <div class="options-container">
        <div class="option-container auth-container">
          <div>
            <div class="form-title">
              Participating Family
            </div>
            <div class="form-body">
              Participating Families have early access to all events and
              can sign up free of charge. Families who have or had a child with cancer or
              life-threatening illness, as well as adults with cancer are eligible to apply.
              Participating Family accounts must be reviewed and
              approved by a Lucy's Love Bus admin.
            </div>
          </div>
          <div class="btn-row">
            <router-link tag="button" to="sign-up-pf" class="btn--primary-orange">
              Sign Up
            </router-link>
          </div>
        </div>
        <div class="option-container auth-container">
          <div>
            <div class="form-title">
              General Member
            </div>
            <div class="form-body">
              General Members may navigate the event calendar and purchase
              tickets once registration is open to the public.
              Anyone can sign up as a General Member at any time.
            </div>
          </div>
          <div class="btn-row">
            <router-link tag="button" to="sign-up-gp" class="btn--primary-orange">
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
    margin: 10px 0 10px 0;
  }
  .submit-btn {
    box-sizing: border-box;
    margin-bottom: 0;
  }
</style>

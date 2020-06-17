<template>
  <div>
    <div class="page-title">
      Settings
    </div>
    <div class="auth-container">
      <div class="settings-box">
        <router-link class="btn--primary-orange" tag="button" to="/change-email">
          Change Primary Account Email
        </router-link>
      </div>
      <div class="settings-box">
        <router-link class="btn--primary-orange" tag="button" to="/change-password">
          Change Password
        </router-link>
      </div>
      <access-control class="settings-box" :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
        <router-link class="btn--primary-orange" tag="button" to="/edit-family-information">
          Add or Edit Family Information
        </router-link>
      </access-control>
      <access-control class="settings-box" :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
        <router-link class="btn--primary-orange" tag="button" to="/personal-requests">
          Request to Become a Participating Family
        </router-link>
      </access-control>
      <access-control class="settings-box" :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
        <router-link class="btn--primary-orange" tag="button" to="/deactivate-account">
          Deactivate Account
        </router-link>
      </access-control>
    </div>
  </div>
</template>

<script>
import { USER, ROLE } from '../utils/constants/user';
import AccessControl from '../components/AccessControl/AccessControl.vue';

export default {
  name: 'Settings',
  components: {
    AccessControl,
  },
  data() {
    return {
      USER,
      ROLE,
    };
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';

  .auth-container {
    background-color: transparent;
    padding-bottom: 0;
    padding-top: 0;
  }

  .settings-box {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .setting-btn {
    cursor: pointer;
    border-radius: 6px;
    width: 100%;
    font-size: 1.3rem;
    padding: 0.75em 0;
  }
</style>

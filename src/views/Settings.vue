<template>
  <div>
    <div class="page-title">
      Settings
    </div>
    <div>
      <div>
        <div>
          Change Primary Account Email
        </div>
        <router-link tag="button" to="/change-email">
          GO
        </router-link>
      </div>
      <div>
        <div>
          Change Password
        </div>
        <router-link tag="button" to="/password-change">
          GO
        </router-link>
      </div>
      <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
        <div>
          Add or Edit Family Information
        </div>
        <router-link tag="button" to="/edit-family-info">
          GO
        </router-link>
      </access-control>
      <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
        <div>
          Request to Become a Participating Family
        </div>
        <router-link tag="button" to="/personal-requests">
          GO
        </router-link>
      </access-control>
      <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
        <div>
          Deactivate Account
        </div>
        <router-link tag="button" to="/deactivate-account">
          GO
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
</style>

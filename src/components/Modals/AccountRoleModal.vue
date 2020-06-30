<template>
  <transition name="modal-fade">
    <div v-show="open" class="modal-backdrop">
      <div class="modal">
        <div class="modal-title">
          <div>
            Your Account Role is:
          </div>
          <div class="account-role">
            <access-control :roles="[USER[ROLE.ADMIN]]">
              Admin
            </access-control>
            <access-control :roles="[USER[ROLE.PF]]">
              Participating Family
            </access-control>
            <access-control :roles="[USER[ROLE.GP]]">
              General Public
            </access-control>
          </div>
        </div>
        <div class="modal-body">
          <access-control :roles="[USER[ROLE.ADMIN]]">
            An Admin  is in charge of creating events and announcements for users of the
            application. Admin accounts can not be created or deleted but the owners email and
            password can be changed from the
            <router-link to="/settings">account settings page</router-link>.
          </access-control>
          <access-control :roles="[USER[ROLE.PF]]">
            A Participating Family account has a family member that is suffering from an ailment
            that Lucy's Love Bus can help with their therapeutic events. You have full access
            to all LLB events for free or reduced price.
          </access-control>
          <access-control :roles="[USER[ROLE.GP]]">
            A General Public account can be created by anyone and allows users to sign up for
            events within 5 days of their start date for $5 per ticket. If you believe you qualify
            as a Participating Family with full event access you can apply on the
            <router-link to="/personal-requests">requests page of account settings</router-link>.
          </access-control>
        </div>
        <div
            class="close-btn"
            @click="close"
        >
          X
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AccessControl from '../AccessControl/AccessControl.vue';
import { ROLE, USER } from '../../utils/constants/user';

export default {
  name: 'AccountRoleModal',
  components: { AccessControl },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      USER,
      ROLE,
    };
  },
  methods: {
    close() {
      this.$emit('close-role-modal');
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';
  @import '../../../assets/global-classes.less';

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    position: fixed;
    top: 22.5%;
    background: white;
    /* this works as a border, except now we can round the inner corners. */
    box-shadow: 0 0 0 12px rgba(248, 134, 52, 0.5), 0 0 0 12px white;
    border-radius: 6px;
    width: 50%;
    max-height: 500px;
    overflow-x: visible;
    display: flex;
    flex-direction: column;
    padding: 32px 32px 8px;
  }

  .modal-title {
    font-size: 1.7rem;
    font-weight: bold;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: left;
  }

  .account-role {
    margin-left: 0.5em;
  }

  .modal-subheader {
    margin-top: 16px;
    font-size: 1.3rem;
    font-weight: lighter;
    text-align: left;
    color: #333;
  }

  .modal-body {
    margin-top: 8px;
    margin-bottom: 16px;
    text-align: left;
    font-size: 1rem;
  }

  .close-btn {
    background: rgb(252,195,154);
    cursor: pointer;
    position: absolute;
    right: -20px;
    bottom: -20px;
    height: 50px;
    line-height: 50px;
    width: 50px;
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;
    font-weight: bolder;
  }

</style>

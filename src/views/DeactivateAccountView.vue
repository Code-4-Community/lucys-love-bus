<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        Deactivate Account
      </div>
      <router-link tag="button" class="btn--secondary back-btn" to="/settings">
        Back
      </router-link>
    </div>
    <div>
      <div class="auth-container">
        <div class="box-title">
          Warning: This action is permanent and cannot be undone
        </div>
        <div class="checkbox-container">
          <label class="checkbox-label">
            <input type="checkbox" checked="checked" v-model="acknowledged">
            <span class="checkmark" />
            <span class="checkbox-message">
              By checking this box you acknowledge that your information will be erased from our
              system and cannot be recovered including any registrations for future events or
              requests for Participating Family status.
          </span>
          </label>
        </div>
        <div class="btn-row">
          <button class="submit-btn deactivate-btn"
                  :disabled="!acknowledged"
                  @click="deactivateAccount">
            Deactivate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/api';
import authService from '../utils/service/authService';

export default {
  name: 'DeactivateAccountView',
  data() {
    return {
      acknowledged: false,
    };
  },
  methods: {
    async deactivateAccount() {
      await api.deactivateAccount();
      await authService.actions.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';

  .page-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .auth-container {
    margin-top: 24px;
    padding-bottom: 0.5em;
  }

  .box-title {
    font-size: 1.5rem;
    text-align: center;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .checkbox-label {
    align-items: flex-start;
    cursor: auto;
  }
  .checkmark {
    margin-top: 8px;
    height: 25px;
    width: 25px;
    cursor: pointer;
  }
  .checkbox-message {
    width: 90%;
  }
  .checkbox-label .checkmark:after {
    left: 20px;
    top: 15px;
  }

  .btn-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .deactivate-btn {
    margin-top: 16px;
    background-color: red;
    color: white;
    font-weight: bold;
  }
  .deactivate-btn:disabled {
    background-color: #FF8888;
    cursor: not-allowed;
  }

</style>

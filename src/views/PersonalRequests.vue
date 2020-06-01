<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        Participating Family Requests
      </div>
      <router-link tag="button" class="btn--secondary back-btn" to="/settings">
        Back
      </router-link>
    </div>
    <div class="account-role-row">
      <div>
        Your current account status is:
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
      <button class="info-btn" @click="openRoleModal">
        ?
      </button>
    </div>
    <div v-if="loaded" class="page-content">
      <div class="previous-requests-container">
        <div class="requests-table-title">
          Previous Requests
        </div>
        <div v-if="requests.length === 0">
          <div class="no-requests-title">
            You have not made any previous requests to be a Participating Family.
          </div>
        </div>
        <div v-else class="requests-table">
          <div class="requests-row requests-header">
            <div class="date-column">
              Date Created
            </div>
            <div class="status-column">
              Request Status
            </div>
          </div>
          <div class="requests-list" v-for="request in requests" :key="request.id">
            <div class="requests-row">
              <div class="date-column">
                {{ formatCreatedString(request.created) }}
              </div>
              <div class="status-column">
                {{ request.status }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="current-request-container">
        <div class="current-request-box">
          <div class="requests-table-title">
            Current Request
          </div>
          <div class="current-request-panel">
            <access-control :roles="[USER[ROLE.PF]]">
              Congratulations! You have been accepted as a participating family.
            </access-control>
            <access-control :roles="[USER[ROLE.GP]]">
              <div v-if="hasPendingRequest">
                You have a currently pending request.
              </div>
              <div v-else class="new-request-box">
                <div class="new-request-text">
                  If you would like to apply to become a participating family, please be sure to
                  update your family information
                  <router-link class="text-link" to="/edit-family-information">here</router-link>
                </div>
                <div class="new-request-text">
                  Once you are sure your family information is up to date you can apply to
                  become a participating family by clicking the button below.
                </div>
                <div class="new-request-text">
                  Your request will be reviewed by a Lucy's Love Bus admin and you will hear back
                  once they have made a decision.
                </div>
                <div class="submit-btn-row">
                  <button @click="submitRequest" class="submit-btn btn--primary">
                    Apply
                  </button>
                </div>
              </div>
            </access-control>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
    <account-role-modal :open="openModal" @close-role-modal="closeRoleModal" />
  </div>
</template>

<script>
import api from '../api/api';
import AccessControl from '../components/AccessControl/AccessControl.vue';
import { ROLE, USER } from '../utils/constants/user';
import DateUtils from '../utils/DateUtils';
import AccountRoleModal from '../components/Modals/AccountRoleModal.vue';

export default {
  name: 'MakeRequestView',
  components: { AccountRoleModal, AccessControl },
  data() {
    return {
      USER,
      ROLE,
      loaded: false,
      requests: [],
      openModal: false,
    };
  },
  computed: {
    hasPendingRequest() {
      return this.requests.reduce((acc, cur) => acc || cur.status === 'PENDING', false);
    },
  },
  methods: {
    async getRequests() {
      const res = await api.getRequestStatuses(this.eventId);
      return res.requests;
    },
    async submitRequest() {
      await api.makePfRequest();
      this.$router.go();
    },
    formatCreatedString(dateTime) {
      return DateUtils.toStringDateTime(dateTime);
    },
    openRoleModal() {
      this.openModal = true;
    },
    closeRoleModal() {
      this.openModal = false;
    },
  },
  async created() {
    this.requests = await this.getRequests();
    this.loaded = true;
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';
  @import '../../assets/color-constants.less';

  .page-content {
    margin-top: 32px;
  }

  .account-role-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.3rem;
  }
  .account-role {
    margin-left: 1em;
    font-weight: bold;
  }

  .no-requests-title {
    font-size: 12pt;
    background-color: #F3F3F3;
    border: 2px solid black;
    border-radius: 6px;
    width: auto;
    padding: 1em 1em;
  }

  .previous-requests-container {
    float: left;
    width: 60%;
  }
  .current-request-container {
    float: right;
    width: 40%;
  }

  .requests-table-title {
    text-align: left;
    font-size: 1.5rem;
    margin-bottom: 6px;
  }

  .requests-table {
    background-color: #F3F3F3;
    border: 2px solid black;
    border-bottom-width: 1px;
    border-radius: 6px;
  }
  .requests-row {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-areas: "date status";
    border-bottom: 1px solid black;
    text-align: center;

    padding: 0.5em 0;
  }
  .requests-header {
    border-bottom-width: 2px;
    font-weight: bold;
  }

  .date-column {
    grid-area: date;
  }
  .status-column {
    grid-area: status;
  }

  .current-request-box {
    width: 60%;
    margin: 0 auto;
    text-align: left;
  }
  .current-request-panel {
    background-color: #F3F3F3;
    border: 2px solid black;
    border-radius: 6px;
    padding: 1em 1em 0.5em;
  }

  .new-request-box {
    text-align: center;
  }
  .new-request-text {
    margin-bottom: 12px;
  }

  .submit-btn-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .text-link {
    text-decoration: none;
    color: @tangerine;
    border: 1px solid @tangerine;
    border-radius: 4px;
    padding: 0 0.5em;
    outline: none;
  }
  .text-link:hover {
    background-color: white;
  }

</style>

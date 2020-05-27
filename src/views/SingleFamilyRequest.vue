<template>
  <div>
    <p class="title">Request to Become a Participating Family</p>
    <div v-if="loaded">
      <div>
        <div class="side-annotated-block">
          <div class="side-label">
            Contact Information
          </div>
          <div class="right-content-row contact-info-row">
            <div class="flex-horizontal">
              {{ mainContact.firstName }}
              {{ mainContact.lastName }}
            </div>
            <div class="flex-vertical">
              <div>
                {{ mainContact.email }}
              </div>
              <div v-if="mainContact.phoneNumber">
                {{ formatPhoneString(mainContact.phoneNumber) }}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="side-annotated-block">
          <div class="side-label">
            Members
          </div>
          <div class="right-content-row">
            <div>
              Account Owner
            </div>
            <div>
              {{ additionalContacts.length }}
              Additional Parents / Guardians
            </div>
            <div>
              {{ children.length }}
              Children
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div class="side-annotated-block">
            <div class="side-label">
              Account Owner
            </div>
            <div class="right-content-block">
              <main-contact-form :value="mainContact" :disable-change="true" />
            </div>
          </div>
        </div>
        <hr />
        <div v-for="(contact, idx) in additionalContacts" :key="contact.id">
          <div class="side-annotated-block">
            <div class="side-label">
              Additional Adult or Guardian {{ idx + 1 }}
            </div>
            <div class="right-content-block">
              <additional-contact-form :value="contact" :disable-change="true" />
            </div>
          </div>
        </div>
        <hr />
        <div v-for="(child, idx) in children" :key="child.id">
          <div class="side-annotated-block">
            <div class="side-label">
              Child {{ idx + 1 }}
            </div>
            <div class="right-content-block">
              <child-form :value="child" :disable-change="true" />
            </div>
          </div>
        </div>
        <hr />
        <div class="button-row">
          <button class="action-btn btn--secondary" @click="reject">
            Reject
          </button>
          <button class="action-btn btn--primary" @click="approve">
            Approve
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import api from '../api/api';
import ChildForm from '../components/Forms/ChildForm.vue';
import AdditionalContactForm from '../components/Forms/AdditionalContactForm.vue';
import MainContactForm from '../components/Forms/MainContactForm.vue';
import PhoneUtils from '../utils/PhoneUtils';

export default {
  name: 'SingleFamilyRequest',
  components: {
    MainContactForm,
    AdditionalContactForm,
    ChildForm,
  },
  data() {
    return {
      mainContact: {
      },
      additionalContacts: [],
      children: [],
      loaded: false,
    };
  },
  computed: {
    request_id() {
      return this.$route.params.request_id;
    },
  },
  methods: {
    ...mapActions('requests', {
      approveRequest: 'approveRequest',
      rejectRequest: 'rejectRequest',
    }),
    approve() {
      this.approveRequest({ requestId: this.request_id });
      this.$router.push({
        name: 'family-request-confirmation',
        params: {
          success: true,
          firstName: this.mainContact.firstName,
          lastName: this.mainContact.lastName,
          email: this.mainContact.email,
          phoneNumber: this.mainContact.phoneNumber,
        },
      });
    },
    reject() {
      this.rejectRequest({ requestId: this.request_id });
      this.$router.push({
        name: 'family-request-confirmation',
        params: {
          success: false,
          firstName: this.mainContact.firstName,
          lastName: this.mainContact.lastName,
          email: this.mainContact.email,
          phoneNumber: this.mainContact.phoneNumber,
        },
      });
    },
    formatPhoneString(phone) {
      return PhoneUtils.formatPhoneString(phone);
    },
    async loadRequestData() {
      const response = await api.getRequestData(this.request_id);
      return response.data;
    },
  },
  async created() {
    const data = await this.loadRequestData();
    this.mainContact = data.mainContact;
    this.additionalContacts = data.additionalContacts;
    this.children = data.children;
    this.loaded = true;
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';
  @import '../../assets/color-constants.less';

  .title {
    text-align: left;
    font-size: 2.3rem;
  }

  .side-annotated-block {
    display: grid;
    grid-template-columns: 5% 15% 75% 5%;
    grid-template-rows: auto;
    grid-template-areas: ". side main .";
    margin: 18px 0;
  }
  .side-label {
    grid-area: side;
    text-align: right;
    font-weight: bold;
    padding: 0.5em;
  }
  .right-content-block {
    grid-area: main;
    box-sizing: border-box;
    text-align: left;
    width: 100%;
    padding: 0.5em;
    background-color: @form-bg-color;
    border-radius: 6px;
  }
  .right-content-row {
    grid-area: main;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background-color: @form-bg-color;
    border-radius: 6px;
    padding: 6px 0;
  }
  .contact-info-row {
    justify-content: space-between;
    padding: 6px 10%;
  }

  .button-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-right: 5%;
  }
  .action-btn {
    border-radius: 4px;
    padding: 6px 3em;
    margin-left: 32px;
    cursor: pointer;
  }


</style>

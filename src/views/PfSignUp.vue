<template>
  <div>
    <div class="center">
      <h2> Join the Sajni Center! </h2>
    </div>
    <div class="form-page-container auth-container">
      <div class="forms-container">
        <div v-if="pageNum === 0">
          <div class="form-title">
            Primary Account Holder Information
          </div>
          <primary-info-form v-model="primaryInfo" ref="geninfo" />
        </div>
        <div v-else-if="pageNum === 1">
          <div class="form-title">
            Agreements
          </div>
          <div>
            <div>
              <h3>More About You (Account Owner)</h3>
              <main-contact-form v-model="mainContact" ref="maincontact"/>
            </div>
            <div class="contacts">
              <h3>Additional Adults (18+ yrs)</h3>
              <div v-for="(contact, idx) in additionalContacts" :key="idx">
                <div>
                  <h3>
                    Guardian or Parent {{ idx + 1}}
                  </h3>
                  <additional-contact-form v-model="additionalContacts[idx]"
                                           ref="additionalcontacts"/>
                </div>
              </div>
              <div class="button-row">
                <button class="add-remove-btn" v-on:click="addContact">
                  + Add Adult
                </button>
                <button class="add-remove-btn"
                        v-if="additionalContacts.length"
                        v-on:click="removeParent">
                  - Remove Adult
                </button>
              </div>
            </div>
            <div class="children">
              <h3>Children</h3>
              <div v-for="(child, idx) in children" :key="idx">
                <h3>
                  Child {{ idx + 1}}
                </h3>
                <child-form v-model="children[idx]" ref="children"/>
              </div>
              <div class="button-row">
                <button class="add-remove-btn" v-on:click="addChild">
                  + Add Child
                </button>
                <button class="add-remove-btn"
                        v-if="children.length"
                        v-on:click="removeChild">
                  - Remove Child
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="pageNum === 2">
          <div class="form-title">
            Agreements
          </div>
          <agreements-form v-model="agreements" ref="agreements" />
        </div>
        <div v-else>
          Something went wrong here...
        </div>
      </div>
      <div class="nav-row">
        <div class="back-btn-box">
          <button v-if="pageNum > 0" @click="backPage" class="btn--tertiary submit-btn">
            Previous Page
          </button>
        </div>
        <div class="page-track-box">
          <div class="page-indicator"
               :class="{ 'current-page': pageNum === 0 }"
          />
          <div class="page-indicator"
               :class="{ 'current-page': pageNum === 1 }"
          />
          <div class="page-indicator"
               :class="{ 'current-page': pageNum === 2 }"
          />
        </div>
        <div class="next-btn-box">
          <div v-if="pageNum < maxPage">
            <button @click="nextPage" class="btn--tertiary submit-btn">
              Next Page
            </button>
          </div>
          <div v-else>
            <button @click="submitForm" class="btn--primary submit-btn">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import PrimaryInfoForm from '../components/Forms/PrimaryInfoForm.vue';
import AgreementsForm from '../components/Forms/AgreementsForm.vue';
import authService from '../utils/service/authService';
import MainContactForm from '../components/Forms/MainContactForm.vue';
import AdditionalContactForm from '../components/Forms/AdditionalContactForm.vue';
import ChildForm from '../components/Forms/ChildForm.vue';
import api from '../api/api';

export default {
  name: 'GpSignUp',
  components: {
    ChildForm,
    AdditionalContactForm,
    MainContactForm,
    AgreementsForm,
    PrimaryInfoForm,
  },
  data() {
    // TODO: Unify primaryInfo and mainContact objects (set in nextPage & backPage?)
    return {
      pageNum: 0,
      maxPage: 2,
      primaryInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        allergies: '',
        password: '',
        passwordConfirmation: '',
      },
      mainContact: {
        firstName: '',
        lastName: '',
        pronouns: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        allergies: '',
        diagnosis: '',
        medications: '',
        notes: '',
      },
      additionalContacts: [],
      children: [],
      agreements: {
        noVisitAfterSick: false,
        parentsRemain: false,
        upToDateVaccination: false,
        photoVideoReleaseConsent: false,
      },
    };
  },
  methods: {
    ...mapMutations('user', {
      setUser: 'setUser',
    }),
    resetInput() {
      this.primaryInfo = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        allergies: '',
        password: '',
        passwordConfirmation: '',
      };
      this.mainContact = {
        firstName: '',
        lastName: '',
        pronouns: '',
        phoneNumber: '',
        email: '',
        allergies: '',
        diagnosis: '',
        medications: '',
        notes: '',
      };
      this.additionalContacts = [];
      this.children = [];
      this.agreements = {
        noVisitAfterSick: false,
        parentsRemain: false,
        upToDateVaccination: false,
        photoVideoReleaseConsent: false,
      };
      // TODO: Maybe clear components?
    },
    nextPage() {
      if (this.pageNum === 0) {
        if (this.$refs.geninfo.validateInput()) {
          // TODO: Maybe set main contact?
          this.pageNum = 1;
        } else {
          // There were errors the user must fix
        }
      } else if (this.pageNum === 1) {
        // We want to avoid any short circuiting so every form is validated
        const formRefs = [
          this.$refs.maincontact,
          ...this.$refs.additionalcontacts,
          ...this.$refs.children,
        ];
        const formValidations = formRefs.map(ref => ref.validateInput());

        if (formValidations.reduce((acc, cur) => acc && cur, true)) {
          this.pageNum = 2;
        } else {
          // eslint-disable-next-line no-alert
          alert('This page bad');
        }
      }
    },
    backPage() {
      if (this.pageNum > 0) {
        this.pageNum = this.pageNum - 1;
      }
    },
    addContact() {
      this.additionalContacts.push({
        firstName: '',
        lastName: '',
        pronouns: '',
        phoneNumber: '',
        email: '',
        shouldSendEmails: false,
        allergies: '',
        diagnosis: '',
        medications: '',
        notes: '',
      });
    },
    addChild() {
      this.children.push({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        pronouns: '',
        schoolYear: '',
        school: '',
        allergies: '',
        diagnosis: '',
        medications: '',
        notes: '',
      });
    },
    removeParent() {
      this.additionalContacts = this.additionalContacts.slice(0, -1);
    },
    removeChild() {
      this.children = this.children.slice(0, -1);
    },
    async submitForm() {
      if (this.pageNum === this.maxPage) {
        if (this.$refs.agreements.validateInput()) {
          const user = {
            email: this.primaryInfo.email,
            password: this.primaryInfo.password,
            firstName: this.primaryInfo.firstName,
            lastName: this.primaryInfo.lastName,
            phoneNumber: this.primaryInfo.phone,
            location: {
              address: this.primaryInfo.address,
              city: this.primaryInfo.city,
              state: this.primaryInfo.state,
              zipCode: this.primaryInfo.zip,
            },
          };
          const contactInfo = {
            mainContact: this.mainContact,
            additionalContacts: this.additionalContacts,
            children: this.children,
          };
          try {
            await authService.actions.signup(user);
            await api.addContactInfo(contactInfo);
            await api.makePfRequest();
            this.$router.push('/profile'); // TODO: Push to confirmation page
            this.resetInput();
            this.setUser();
          } catch (error) {
            if (error.response.status === 409) {
              // TODO: Show error on primary info page
              // eslint-disable-next-line no-alert
              alert('Email Already in use');
            } else {
              // eslint-disable-next-line no-alert
              alert(`Error: ${error}`);
            }
          }
        } else {
          // eslint-disable-next-line no-alert
          alert('This page has errors on it');
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';
  @import '../../assets/color-constants.less';

  .button-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .add-remove-btn {
    padding: 0 1rem 1rem 0;
    background: 0;
    border: 0;
    cursor: pointer;
    font-size: 1rem;
    outline: none;
  }

  .nav-row {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 25% 12.5% 25% 12.5% 25%;
    grid-template-areas: "back-btn . page-track . next-btn";
    box-sizing: border-box;
    text-align: center;
    align-items: center;
  }
  .back-btn-box {
    grid-area: back-btn;
    width: 100%;
  }
  .page-track-box {
    grid-area: page-track;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .next-btn-box {
    grid-area: next-btn;
    width: 100%;
  }

  .submit-btn {
    width: 100%;
    margin: 0;
  }

  .page-indicator {
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid #888;
    background-color: transparent;
    width: 1em;
    height: 1em;
    margin: 0 5px;
  }
  .current-page {
    background-color: @tangerine;
  }

</style>

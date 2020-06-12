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
          <primary-info-form v-model="primaryInfo" :server-errors="serverErrors" ref="geninfo" />
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
          <div v-if="pageNum > 0">
            <button @click="backPage" class="btn--tertiary submit-btn">
              Previous Page
            </button>
          </div>
          <div v-else>
            <router-link to="/login" tag="button" class="btn--tertiary submit-btn">
              Back to Login
            </router-link>
          </div>
        </div>
        <div class="page-track-box">
          <div class="page-indicator"
               :class="{ 'current-page': pageNum === 0, 'error-page': hasServerErrors }"
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
      <div v-if="hasServerErrors" class="server-error-message">
        There was an error signing you up! Please go back to correct your information.
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import PrimaryInfoForm from '../components/Forms/PrimaryInfoForm.vue';
import AgreementsForm from '../components/Forms/AgreementsForm.vue';
import MainContactForm from '../components/Forms/MainContactForm.vue';
import AdditionalContactForm from '../components/Forms/AdditionalContactForm.vue';
import ChildForm from '../components/Forms/ChildForm.vue';
import api from '../api/api';
import { signup } from '../auth/authAPI';

export default {
  name: 'PfSignUp',
  components: {
    ChildForm,
    AdditionalContactForm,
    MainContactForm,
    AgreementsForm,
    PrimaryInfoForm,
  },
  data() {
    return {
      pageNum: 0,
      maxPage: 2,
      serverErrors: {},
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
  computed: {
    hasServerErrors() {
      return !(Object.keys(this.serverErrors).length === 0
        && this.serverErrors.constructor === Object);
    },
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
        dateOfBirth: '',
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
      this.serverErrors = {};
      // TODO: Maybe clear components?
    },
    nextPage() {
      if (this.pageNum === 0) {
        if (this.$refs.geninfo.validateInput()) {
          this.mainContact.firstName = this.primaryInfo.firstName;
          this.mainContact.lastName = this.primaryInfo.lastName;
          this.mainContact.email = this.primaryInfo.email;
          this.mainContact.phoneNumber = this.primaryInfo.phone;
          this.mainContact.allergies = this.primaryInfo.allergies;
          this.pageNum = 1;
        } else {
          // There were errors the user must fix
        }
      } else if (this.pageNum === 1) {
        // We want to avoid any short circuiting so every form is validated
        const formRefs = [
          this.$refs.maincontact,
          ...(this.$refs.additionalcontacts || []),
          ...(this.$refs.children || []),
        ];
        const formValidations = formRefs.map(ref => ref.validateInput());

        if (formValidations.reduce((acc, cur) => acc && cur, true)) {
          this.pageNum = 2;
        } else {
          // There are errors the user must correct
        }
      }
    },
    backPage() {
      if (this.pageNum > 0) {
        if (this.pageNum === 1) {
          this.primaryInfo.firstName = this.mainContact.firstName;
          this.primaryInfo.lastName = this.mainContact.lastName;
          this.primaryInfo.email = this.mainContact.email;
          this.primaryInfo.phone = this.mainContact.phoneNumber;
          this.primaryInfo.allergies = this.mainContact.allergies;
        }
        this.pageNum = this.pageNum - 1;
      }
    },
    addContact() {
      this.additionalContacts.push({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
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
            await signup(user);
            await api.addContactInfo(contactInfo);
            await api.makePfRequest();
            await this.$router.push({
              name: 'sign-up-confirmation',
              params: { accountType: 'participating-family' },
            });

            this.resetInput();
            this.setUser();
          } catch (error) {
            if (error.response.status === 409) {
              this.serverErrors = {
                email: `The email ${this.primaryInfo.email} is already in use`,
              };
            } else {
              // eslint-disable-next-line no-alert
              alert(`Error: ${error}`);
            }
          }
        } else {
          // The user has errors they need to fix
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
  .error-page {
    border-color: red;
  }

  .server-error-message {
    margin-top: 16px;
    text-align: center;
    font-weight: bold;
    color: red;
  }

</style>

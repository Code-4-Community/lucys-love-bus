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
          <agreements-form v-model="agreements" ref="agreements" />
        </div>
        <div v-else>
          Something went wrong here...
        </div>
      </div>
      <div v-if="hasServerErrors" class="server-error-message">
        There was an error signing you up! Please go back to correct your information.
      </div>
      <div class="nav-row">
        <div class="back-btn-box">
          <div v-if="pageNum > 0">
            <button @click="backPage" class="btn--primary-orange">
              Previous Page
            </button>
          </div>
          <div v-else>
            <router-link to="/login" tag="button" class="btn--primary-orange">
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
        </div>
        <div class="next-btn-box">
          <div v-if="pageNum < maxPage">
            <button @click="nextPage" class="btn--primary-orange">
              Next Page
            </button>
          </div>
          <div v-else>
            <button @click="submitForm" class="btn--primary-blue">
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
import { signup } from '../auth/authAPI';

export default {
  name: 'GpSignUp',
  components: { AgreementsForm, PrimaryInfoForm },
  data() {
    return {
      pageNum: 0,
      maxPage: 1,
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
      this.agreements = {
        agreements: {
          noVisitAfterSick: false,
          parentsRemain: false,
          upToDateVaccination: false,
          photoVideoReleaseConsent: false,
        },
      };
      this.serverErrors = {};
      // TODO: Maybe clear components?
    },
    nextPage() {
      if (this.pageNum === 0) {
        if (this.$refs.geninfo.validateInput()) {
          this.pageNum = 1;
        } else {
          // There were errors the user must fix
        }
      }
    },
    backPage() {
      if (this.pageNum > 0) {
        this.pageNum -= 1;
      }
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
          try {
            await signup(user);
            await this.$router.push({
              name: 'sign-up-confirmation',
              params: { accountType: 'general-public' },
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

  .nav-row {
    margin: 0 auto;
    margin-top: 24px;
    display: grid;
    grid-template-columns: 40% 20% 40%;
    grid-template-areas: "back-btn page-track next-btn";
    box-sizing: border-box;
    text-align: center;
    align-items: center;
    width: 30em;
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

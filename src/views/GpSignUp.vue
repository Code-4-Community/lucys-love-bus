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

export default {
  name: 'GpSignUp',
  components: { AgreementsForm, PrimaryInfoForm },
  data() {
    return {
      pageNum: 0,
      maxPage: 1,
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
      // TODO: Maybe clear components?
    },
    nextPage() {
      if (this.pageNum === 0) {
        if (this.$refs.geninfo.validateInput()) {
          this.pageNum = 1;
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
    async submitForm() {
      if (this.pageNum === this.maxPage) {
        if (this.$refs.agreements.validateInput()) {
          const user = {
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phone,
            location: {
              address: this.address,
              city: this.city,
              state: this.state,
              zipCode: this.zip,
            },
          };
          try {
            await authService.actions.signup(user);
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

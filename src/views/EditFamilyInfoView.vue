<template>
  <div>
    <div class="page-header">
      <div class="page-title">
        Edit Family Information
      </div>
      <router-link tag="button" class="btn--secondary back-btn" to="/settings">
        Back
      </router-link>
    </div>
    <div class="page-subtitle">
      Edit or add to your family information. This will be shown to Lucy's Love Bus admins
      when you register for an event or when requesting to be upgraded to a Participating
      Family.
    </div>
    <div v-if="loaded">
      <div>
        <hr />
        <div class="side-annotated-block">
          <div class="side-label">
            <div v-if="saveMessage">
              {{ saveMessage }}
            </div>
          </div>
          <div class="right-content-block save-row">
            <div class="save-label">
              Ready to save?
            </div>
            <button class="submit-btn btn--primary"
                    @click="saveInformation">
              Save
            </button>
          </div>
        </div>
        <hr />
        <div class="side-annotated-block">
          <div class="side-label">
            Location Information
          </div>
          <div class="right-content-block">
            <div class="form-block">
              <location-form v-model="locationData" />
            </div>
          </div>
        </div>
        <hr />
        <div class="side-annotated-block">
          <div class="side-label">
            Main Contact Information
          </div>
          <div class="right-content-block">
            <div class="form-block">
              <main-contact-form v-model="mainContact" ref="maincontact" />
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div v-for="(contact, idx) in additionalContacts" :key="idx">
            <div class="side-annotated-block">
              <div class="side-label">
                Guardian or Parent {{ idx + 1}}
              </div>
              <div class="right-content-block">
                <div class="form-block">
                  <additional-contact-form v-model="additionalContacts[idx]"
                                           ref="additionalcontacts" />
                </div>
              </div>
            </div>
          </div>
          <div class="side-annotated-block">
            <div class="right-content-block">
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
          </div>
        </div>
        <hr />
        <div>
          <div v-for="(child, idx) in children" :key="idx">
            <div class="side-annotated-block">
              <div class="side-label">
                Child {{ idx + 1}}
              </div>
              <div class="right-content-block">
                <div class="form-block">
                  <child-form v-model="children[idx]" ref="children" />
                </div>
              </div>
            </div>
          </div>
          <div class="side-annotated-block">
            <div class="right-content-block">
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
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import api from '../api/api';
import MainContactForm from '../components/Forms/MainContactForm.vue';
import AdditionalContactForm from '../components/Forms/AdditionalContactForm.vue';
import ChildForm from '../components/Forms/ChildForm.vue';
import LocationForm from '../components/Forms/LocationForm.vue';

export default {
  name: 'EditFamilyInfoView',
  components: {
    LocationForm,
    ChildForm,
    AdditionalContactForm,
    MainContactForm,
  },
  data() {
    return {
      locationData: {},
      mainContact: {},
      additionalContacts: [],
      children: [],
      loaded: false,
      saveMessage: '',
    };
  },
  methods: {
    async getAccountInformation() {
      const response = await api.getAccountInformation();
      return response.data;
    },
    async saveInformation() {
      this.saveMessage = 'Saving...';
      if (this.validate()) {
        const body = {
          mainContact: this.mainContact,
          additionalContacts: this.additionalContacts,
          children: this.children,
          location: this.locationData,
        };
        try {
          await api.updateAccountInfo(body);
          this.saveMessage = 'Success!';
        } catch (error) {
          this.saveMessage = `Error: ${error.message}`;
        }
      } else {
        this.saveMessage = 'There are some errors on this page!';
      }
    },
    validate() {
      const formRefs = [
        this.$refs.maincontact,
        ...(this.$refs.additionalcontacts || []),
        ...(this.$refs.children || []),
      ];
      const formValidations = formRefs.map(ref => ref.validateInput());

      return formValidations.reduce((acc, cur) => acc && cur, true);
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
    replaceNullFields(obj) {
      return Object.fromEntries(
        Object.entries(obj).map(
          ([k, v]) => {
            if (v == null) {
              return [k, ''];
            }
            return [k, v];
          },
        ),
      );
    },
  },
  async created() {
    const payload = await this.getAccountInformation();
    this.locationData = this.replaceNullFields(payload.location);
    this.mainContact = this.replaceNullFields(payload.mainContact);
    this.additionalContacts = payload.additionalContacts;
    this.children = payload.children;
    this.loaded = true;
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';

  .page-subtitle {
    text-align: left;
    font-size: 1.5rem;
    padding: 0 1em;
    margin-bottom: 30px;
  }

  .save-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .save-message {
    font-size: 1.2rem;
    flex: 1;
  }
  .save-action {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-right: 16px;
    flex: 1;
  }
  .save-label {
    font-size: 1.2rem;
    margin-right: 16px;
  }
  .submit-btn {
    width: 30%;
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
  }
  .form-block {
    padding: 0.5em;
    background-color: @form-bg-color;
    border-radius: 6px;
  }

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
</style>

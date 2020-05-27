<template>
  <div>
    <div class="center">
      <h2> Registering as a Participating Family! </h2>
      <p class="text-wrap">
        Tell us more about you, your children, and/or
        any other members you are registering under this account.
      </p>
    </div>
    <div class="auth-container">
      <main-contact-form v-model="mainContact" />
      <div class="contacts">
        <h3>Additional Adults (18+ yrs)</h3>
        <div v-for="(contact, idx) in additionalContacts" :key="contact.id">
          <additional-contact-form v-model="additionalContacts[idx]" :idx="idx" />
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
        <div v-for="(child, idx) in children" :key="child.id">
          <child-form v-model="children[idx]" :idx="idx" />
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
      <div class="next-page-btn-row">
        <button class="btn--tertiary submit-btn"
                v-on:click="signup">Next Page</button>
      </div>
      <div v-if="isValidForm === false" class="invalid_form--container">
        <h4>There were one or more issues with the form:</h4>
        <ul>
          <li v-for="(err, index) in inputError" :key="index"> {{err}} </li>
          <li v-if="this.serverError"> {{this.serverError}} </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';
import api from '../api/api';
import MainContactForm from '../components/Forms/MainContactForm.vue';
import AdditionalContactForm from '../components/Forms/AdditionalContactForm.vue';
import ChildForm from '../components/Forms/ChildForm.vue';

export default {
  name: 'SignupPFForm',
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  components: {
    MainContactForm,
    AdditionalContactForm,
    ChildForm,
  },
  data() {
    return {
      mainContact: {
        firstName: this.user.firstName || '',
        lastName: this.user.lastName || '',
        pronouns: '',
        email: this.user.email || '',
        phoneNumber: this.user.phoneNumber || '',
        dateOfBirth: '',
        allergies: this.user.allergies || '',
        diagnosis: '',
        medications: '',
        notes: '',
      },
      additionalContacts: [],
      children: [],
      password: ['', ''],
      inputError: [],
      serverError: '',
      isValidForm: undefined,
    };
  },
  methods: {
    ...mapMutations('user', {
      setUser: 'setUser',
    }),
    resetInput() {
      this.additionalContacts = [];
      this.children = [];
      this.inputError = [];
      this.serverError = '';
    },
    addContact() {
      let tempId;
      if (this.additionalContacts.length > 0) {
        tempId = this.additionalContacts[this.additionalContacts.length - 1].id + 1;
      } else {
        tempId = 0;
      }
      this.additionalContacts.push({
        id: tempId,
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
      let tempId;
      if (this.children.length > 0) {
        tempId = this.children[this.children.length - 1].id + 1;
      } else {
        tempId = 0;
      }
      this.children.push({
        id: tempId,
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
    validate() {
      this.inputError = [];
      const validParents = this.validateParents();
      const validChildren = this.validateChildren();
      this.isValidForm = validParents && validChildren;
      return validParents && validChildren;
    },
    validateParents() {
      const missingMsg = (who, id, what) => `${who} ${id} is missing ${what}`;
      let validParents = true;
      this.additionalContacts.forEach((contact) => {
        if (!contact.firstName) {
          this.inputError.push(missingMsg('Parent/Guardian', contact.id + 1, 'a first name'));
          validParents = false;
        }
        if (!contact.lastName) {
          this.inputError.push(missingMsg('Parent/Guardian', contact.id + 1, 'a last name'));
          validParents = false;
        }
        if (!contact.phoneNumber) {
          this.inputError.push(missingMsg('Parent/Guardian', contact.id + 1, 'a phone number'));
          validParents = false;
        }
        if (!contact.email) {
          this.inputError.push(`Parent/Guardian ${contact.id + 1}'s email is not valid`);
          validParents = false;
        }
        return 1;
      });
      return validParents;
    },
    validateChildren() {
      const missingMsg = (who, id, what) => `${who} ${id} is missing ${what}`;
      let validChildren = true;
      this.children.forEach((child) => {
        if (!child.firstName) {
          this.inputError.push(missingMsg('Child', child.id + 1, 'a first name'));
          validChildren = false;
        }
        if (!child.lastName) {
          this.inputError.push(missingMsg('Child', child.id + 1, 'a last name'));
          validChildren = false;
        }
        if (!child.pronouns) {
          this.inputError.push(missingMsg('Child', child.id + 1, 'preferred pronouns'));
          validChildren = false;
        }
        if (!child.dateOfBirth) {
          this.inputError.push(missingMsg('Child', child.id + 1, 'a date of birth'));
          validChildren = false;
        }
        if (!child.school) {
          this.inputError.push(missingMsg('Child', child.id + 1, 'a school'));
          validChildren = false;
        }
        if (!child.schoolYear) {
          this.inputError.push(missingMsg('Child', child.id + 1, 'a school year (grade)'));
          validChildren = false;
        }
        return 1;
      });
      return validChildren;
    },
    async signup() {
      this.serverError = '';
      if (this.validate()) {
        const body = {
          mainContact: this.mainContact,
          additionalContacts: this.additionalContacts,
          children: this.children,
        };
        try {
          await api.addContactInfo(body);
          await api.makePfRequest();
          this.$router.push('/form-agreements');
          this.resetInput();
          this.setUser();
        } catch (error) {
          this.serverError = error.message;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';

  .text-wrap {
    margin: auto;
    width: 30em;
    padding-bottom: 1em;
  }

  .center h2 {
    font-family: Dekko, cursive;
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

  .next-page-btn-row {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .invalid_form--container {
    margin-top: 1rem;
    text-align: left;
    background: rgba(255, 0, 0, 0.4);
    border-radius: 5px;
    padding: 1rem;
  }

</style>

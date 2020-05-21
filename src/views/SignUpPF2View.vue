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
      <h3>More About You (Account Owner)</h3>
      <div class="h-fields">
        <div class="half-input">
          <input
              v-model="mainContact.firstName"
              class="input-primary"
              type="text"
              placeholder="First Name">
        </div>
        <div class="half-input">
          <input
              v-model="mainContact.lastName"
              class="input-primary"
              type="text"
              placeholder="Last Name">
        </div>
      </div>
      <div class="pronoun-wrapper">
        <h4>Preferred Pronouns</h4>
        <button v-on:click="mainContact.pronouns = 'HE/HIM'"
                :class="{'btn--secondary' : mainContact.pronouns !== 'HE/HIM',
                         'btn--secondary-selected' : mainContact.pronouns === 'HE/HIM'}">
          He/Him</button>
        <button v-on:click="mainContact.pronouns = 'SHE/HER'"
                :class="{'btn--secondary' : mainContact.pronouns !== 'SHE/HER',
                         'btn--secondary-selected' : mainContact.pronouns === 'SHE/HER'}">
          She/Her</button>
        <button v-on:click="mainContact.pronouns = 'THEY/THEM'"
                :class="{'btn--secondary' : mainContact.pronouns !== 'THEY/THEM',
                         'btn--secondary-selected' : mainContact.pronouns === 'THEY/THEM'}">
          They/Them</button>
      </div>
      <div>
        <input
            class="input-primary"
            type="text"
            v-bind:placeholder="this.user.email"
            disabled="True">
      </div>
      <div class="h-fields">
        <div class="half-input">
          <input
              v-model="mainContact.phoneNumber"
              class="input-primary"
              type="text"
              placeholder="Phone Number">
        </div>
        <div class="half-input">
          <input
              v-model="mainContact.dateOfBirth"
              class="input-primary"
              type="text"
              placeholder="Date of Birth    DD/MM/YYYY">
        </div>
      </div>
      <div>
        <textarea v-model="mainContact.allergies" type="text"
                  class="input-primary" placeholder="Allergies"
                  style="min-width: 100%; max-width: 100%; box-sizing: border-box;"/>
      </div>
      <div>
        <textarea v-model="mainContact.diagnosis" type="text"
                  class="input-primary" placeholder="Diagnosis (if applicable)"
                  style="min-width: 100%; max-width: 100%; box-sizing: border-box"/>
      </div>
      <div>
        <textarea v-model="mainContact.medications" type="text"
                  class="input-primary" placeholder="Medications (if applicable)"
                  style="min-width: 100%; max-width: 100%; box-sizing: border-box"/>
      </div>
      <div>
        <textarea v-model="mainContact.notes" type="text"
                  class="input-primary" placeholder="Other Notes"
                  style="min-width: 100%; max-width: 100%; box-sizing: border-box;"/>
      </div>
      <div class="contacts">
        <h3>Additional Adults (18+ yrs)</h3>
        <div v-for="contact in additionalContacts" :key="contact.id">
          <h4>
            Guardian/Parent {{contact.id + 1}}
          </h4>
          <div class="h-fields">
            <div class="half-input">
              <input
                  v-model="contact.firstName"
                  class="input-primary"
                  type="text"
                  placeholder="First Name">
            </div>
            <div class="half-input">
              <input
                  v-model="contact.lastName"
                  class="input-primary"
                  type="text"
                  placeholder="Last Name">
            </div>
          </div>
          <div class="h-fields">
            <input v-model="contact.email" type="text"
              class="input-primary"
              placeholder="Email Address"
              style="width: 60%">
            <label class="checkbox-container input-primary"
                    style="margin-bottom: .5rem;
                    display: flex; border: none">
              <input type="checkbox" checked="checked" v-model="contact.shouldSendEmails">
              <span class="checkmark"
                    style="margin-right: 1rem; position: relative;
                    height: 1.7rem; width: 2rem;"></span>
              Receive News & Updates?
            </label>
          </div>
          <div class="h-fields">
            <div class="half-input">
              <input v-model="contact.phoneNumber" type="text"
                     class="input-primary"
                     placeholder="PhoneNumber">
            </div>
            <div class="half-input">
              <input v-model="contact.dateOfBirth" type="text"
                     class="input-primary"
                     placeholder="Date of Birth    DD/MM/YYYY">
            </div>
          </div>
          <div>
            <textarea v-model="contact.allergies" type="text"
                      class="input-primary" placeholder="Allergies"
                      style="min-width: 100%; max-width: 100%; box-sizing: border-box"/>
          </div>
          <div>
            <textarea v-model="contact.diagnosis" type="text"
                      class="input-primary" placeholder="Diagnosis (if applicable)"
                      style="min-width: 100%; max-width: 100%; box-sizing: border-box"/>
          </div>
          <div>
            <textarea v-model="contact.medications" type="text"
                      class="input-primary" placeholder="Medications (if applicable)"
                      style="min-width: 100%; max-width: 100%; box-sizing: border-box"/>
          </div>
          <div>
            <textarea v-model="contact.notes" type="text"
                      class="input-primary" placeholder="Other Notes"
                      style="min-width: 100%; max-width: 100%; box-sizing: border-box;"/>
          </div>
        </div>
        <div class="button-row">
          <button class="add-btn" v-on:click="addContact">
            + Add Adult
          </button>
          <button class="remove-btn"
                  v-if="additionalContacts.length"
                  v-on:click="removeParent">
            - Remove Adult
          </button>
        </div>
      </div>

      <div class="children">
        <h3>Children</h3>
        <div v-for="child in children" :key="child.id">
          <h4>
            Child {{child.id + 1}}
          </h4>
          <div class="h-fields">
            <div class="half-input">
              <input
                  v-model="child.firstName"
                  class="input-primary"
                  type="text"
                  placeholder="First Name">
            </div>
            <div class="half-input">
              <input
                  v-model="child.lastName"
                  class="input-primary"
                  type="text"
                  placeholder="Last Name">
            </div>
          </div>
          <div class="pronoun-wrapper">
            <h4>Preferred Pronouns</h4>
            <button v-on:click="child.pronouns = 'HE/HIM'"
                    :class="{'btn--secondary' : child.pronouns !== 'HE/HIM',
                         'btn--secondary-selected' : child.pronouns === 'HE/HIM'}">
              He/Him</button>
            <button v-on:click="child.pronouns = 'SHE/HER'"
                    :class="{'btn--secondary' : child.pronouns !== 'SHE/HER',
                         'btn--secondary-selected' : child.pronouns === 'SHE/HER'}">
              She/Her</button>
            <button v-on:click="child.pronouns = 'THEY/THEM'"
                    :class="{'btn--secondary' : child.pronouns !== 'THEY/THEM',
                         'btn--secondary-selected' : child.pronouns === 'THEY/THEM'}">
              They/Them</button>
          </div>
          <div class="half-input">
            <input
                v-model="child.dateOfBirth"
                class="input-primary"
                type="text"
                placeholder="Date of Birth  DD/MM/YYYY">
          </div>
          <div class="h-fields">
            <div class="half-input">
              <input v-model="child.school" type="text"
                     class="input-primary" placeholder="School">
            </div>
            <div class="half-input">
              <input v-model="child.schoolYear" type="text"
                     class="input-primary" placeholder="School Year">
            </div>
          </div>
          <div>
            <textarea v-model="child.allergies" type="text"
                      class="input-primary" placeholder="Allergies"
                      style="min-width: 100%; max-width: 100%; box-sizing: border-box;"/>
          </div>
          <div>
            <textarea v-model="child.diagnosis" type="text"
                      class="input-primary" placeholder="Diagnosis (if applicable)"
                      style="min-width: 100%; max-width: 100%; box-sizing: border-box"/>
          </div>
          <div>
            <textarea v-model="child.medications" type="text"
                      class="input-primary" placeholder="Medications (if applicable)"
                      style="min-width: 100%; max-width: 100%; box-sizing: border-box"/>
          </div>
          <div>
            <textarea v-model="child.notes" type="text"
                      class="input-primary" placeholder="Other notes"
                      style="min-width: 100%; max-width: 100%; box-sizing: border-box;"/>
          </div>
        </div>
        <div class="button-row">
          <button class="add-btn" v-on:click="addChild">
            + Add Child
          </button>
          <button class="remove-btn"
                  v-if="children.length"
                  v-on:click="removeChild">
            - Remove Child
          </button>
        </div>
      </div>
      <button style="margin-top: 1rem" class="btn btn--secondary-selected"
              v-on:click="signup">Next Page</button>
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
// import authService from '../utils/service/authService';

export default {
  name: 'SignupPFForm',
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      mainContact: {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        pronouns: '',
        email: '',
        phoneNumber: this.user.phoneNumber,
        dateOfBirth: '',
        location: {
          address: '',
          city: '',
          state: '',
          zipCode: '',
        },
        allergies: '',
        diagnosis: '',
        medications: '',
        notes: '',
      },
      additionalContacts: [
      ],
      children: [
      ],
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
      this.additionalContacts = [
      ];
      this.children = [
      ];
      this.password = ['', ''];
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
        phoneNumber: '',
        email: '',
        shouldSendEmails: false,
        allergies: '',
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
        name: '',
        dateOfBirth: '',
        pronouns: '',
        schoolYear: '',
        school: '',
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
      // TODO when backend routes are set up
      // this is old code from the other sign up form. Must be adjusted.
      this.serverError = '';
      if (this.validate()) {
        // const family = {
        //   firstName: this.mainContact.firstName,
        //   lastName: this.mainContact.lastName,
        //   email: this.email,
        //   password: this.password[0],
        // };
        try {
          // await authService.actions.signup(family);
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

  .input-primary {
    box-sizing: border-box;
    width: 100%;
  }

  .text-wrap {
    margin: auto;
    width: 30em;
    padding-bottom: 1em;
  }

  .half-input {
    width: 43%;
  }

  .center h2 {
    font-family: Dekko, cursive;
  }

  a {
    text-decoration: none;
    color: gray;
  }

  .button-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .add-btn {
    padding: 0 1rem 1rem 0;
    background: 0;
    border: 0;
    cursor: pointer;
    font-size: 1rem;
  }
  .remove-btn {
    padding: 0 1rem 1rem 0;
    background: 0;
    border: 0;
    cursor: pointer;
    font-size: 1rem;
  }

  .pronoun-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .pronoun-wrapper h4 {
    font-weight: normal;
  }

  .invalid_form--container {
    margin-top: 1rem;
    text-align: left;
    background: rgba(255, 0, 0, 0.4);
    border-radius: 5px;
    padding: 1rem;
  }

</style>

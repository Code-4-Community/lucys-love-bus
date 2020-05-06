<template>
    <form @submit.prevent="onSubmit">
    <div class="container">
        <span class="header">Make an Announcement</span>
        <div class="subheader">
            <span v-if="eventName == 'sitewide'">
                This announcement will be shown to all users.
            </span>
            <span v-else>
                This announcement will be shown to anyone that has signed up or will sign up for
                {{ this.eventName }}.
            </span>
        </div>
        <div class="form">
            <div class="form-element">
                <input
                    v-validate="'required|max:80'"
                    v-model="a.title"
                    name="title"
                    type="text"
                    size="60"
                    placeholder="Title">
            </div>
            <div class="form-errors">
                <span v-show="errors.has('title')">{{ errors.first('title') }}</span>
            </div>
            <div class="form-element">
                <textarea v-validate="'required'" v-model="a.description" rows="10" cols="100"
                name="description" placeholder="Description"></textarea>
            </div>
            <div class="form-errors">
                <span v-show="errors.has('description')">{{ errors.first('description') }}</span>
            </div>
        </div>
        <div class="buttons">
            <button class="button btn--primary">Save</button>
            <router-link
                v-if="this.eventName == sitewide"
                :to="{ name: 'profile'}"
                class="button btn--secondary" tag="button">
                Cancel
            </router-link>
            <router-link
                v-else
                :to="{ name: 'events'}"
                class="button btn--secondary" tag="button">
                Cancel
            </router-link>
        </div>
    </div>
    </form>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import api from '../api/api';

Vue.use(VeeValidate);
export default {
  name: 'CreateAnnouncement',
  props: {
    // ID of event being announced (if -1, sitewide announcement)
    eventName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      event: {},
      a: {},
      error: '',
      singleEvent: {
        details: {},
      },
    };
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          try {
            await api.createAnnouncement(this.a);
            this.a = {};
          } catch (err) {
            this.error = err;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
@import '../../assets/color-constants.less';
@import '../../assets/global-classes.less';

.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.header {
    font-size: 30pt;
    font-family: 'Quicksand';
}

.subheader {
    margin: 0.8em;
    font-size: 11pt;
    font-weight: bold;
    font-family: 'Quicksand';
}

.form {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    border: 1px solid #ccc;
    padding: 0.4rem;
}

.form-element {
    display: flex;
    flex-direction: row;
    margin-right: 1rem;
    font-family: 'Montserrat';
}

input[type=text], textarea {
    margin: 0.8rem;
    padding: 0.8rem;
    border: 0.1rem solid #ccc;
    box-sizing: border-box;
    font-family: 'Montserrat';
    font-size: 12pt;
}

input[type=text] {
    font-size: 16pt;
    font-weight: bold;
}

.button {
    margin: 1rem;
    font-family: 'Raleway';
    border-radius: 5pt;
    font-size: 13pt;
}

.form-errors {
    margin: 0.3rem;
    font-family: 'Montserrat';
    color: red;
    font-weight: bold;
}

</style>

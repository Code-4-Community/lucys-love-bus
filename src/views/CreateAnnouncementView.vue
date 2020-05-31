<template>
    <div>
        <div class="page-title">
            <div class="header">
                Make an Announcement
            </div>
            <div class="subheader">
                <span v-if="eventId == null">
                    This announcement will be shown to all users.
                </span>
                    <span v-else>
                    This announcement will be shown to anyone that has signed up or will sign up for
                    <span class="event-title">{{ this.eventName }}</span>.
                </span>
            </div>
        </div>
        <form @submit.prevent="onSubmit">
            <div class="announcement-form-container">
                <div class="form-element">
                    <input v-validate="'required|max:80'"
                           v-model="a.title"
                           name="title"
                           class="announcement-title"
                           type="text"
                           placeholder="Title">
                    <div class="form-errors">
                        <span v-show="errors.has('title')">{{ errors.first('title') }}</span>
                    </div>
                </div>
                <div class="form-element description">
                    <textarea v-validate="'required'"
                              v-model="a.description"
                              rows="10"
                              cols="100"
                              name="description"
                              class="announcement-description"
                              placeholder="Description" />
                    <div class="form-errors">
                        <span v-show="errors.has('description')">
                            {{ errors.first('description') }}
                        </span>
                    </div>
                </div>
                <div class="btn-row">
                    <router-link
                        :to="{ name: 'profile'}"
                        class="create-form-btn btn--secondary" tag="button">
                        Cancel
                    </router-link>
                    <button class="create-form-btn btn--primary"
                            type="submit"
                            :disabled="!formComplete">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import api from '../api/api';

Vue.use(VeeValidate);
export default {
  name: 'CreateAnnouncement',
  props: {
    eventName: {
      type: String,
      default: '',
    },
    eventId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      event: {},
      a: {},
      error: '',
    };
  },
  computed: {
    formComplete() {
      return this.a.title && this.a.description;
    },
  },
  methods: {
    async onSubmit() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          try {
            const body = {
              title: this.a.title,
              description: this.a.description,
            };
            await api.createAnnouncement(body, this.eventId);
            if (this.eventId !== null) {
              this.$router.push(`/event/${this.eventId}`);
            } else {
              this.$router.push('/profile');
            }
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

<style lang="less" scoped>
@import '../../assets/global-classes.less';

.subheader {
    font-size: 1.3rem;
}
.event-title {
    text-decoration: underline;
}

.announcement-form-container {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    padding: 1rem;
    background-color: rgba(255, 201, 91, 0.31);
    text-align: left;
    border-radius: 12px;
}

.form-element {
    display: flex;
    flex-direction: column;
}

.form-errors {
    text-align: left;
    color: red;
    font-family: Montserrat;
}

.announcement-title {
    width: 50%;
    padding: 1rem;
    box-sizing: border-box;

    font-family: 'Quicksand';
    font-size: 2.3rem;
    border: .1rem solid #ccc;
    border-radius: 3px;
}

.announcement-description {
    margin-top: 16px;
    padding: 1rem;
    box-sizing: border-box;

    font-family: Montserrat;
    font-size: 12pt;
    border: .1rem solid #ccc;
    border-radius: 3px;
}

.btn-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
}
</style>

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
                <div class="input-box">
                    <input v-model="a.title"
                           name="title"
                           class="input-primary announcement-title"
                           :class="{ 'error-input': !!submitErrors.title }"
                           type="text"
                           placeholder="Title">
                    <div class="error-text">
                        {{ submitErrors.title }}
                    </div>
                </div>
                <div class="input-box">
                    <label class="input-label">
                        Description
                        <textarea v-model="a.description"
                                  rows="10"
                                  cols="100"
                                  name="description"
                                  class="input-primary announcement-description"
                                  :class="{ 'error-input': !!submitErrors.description }"
                                  placeholder="Description" />
                    </label>
                    <div class="error-text">
                        {{ submitErrors.description }}
                    </div>
                </div>
                <div class="btn-row">
                    <router-link
                        :to="{ name: 'profile'}"
                        class="create-form-btn btn--secondary" tag="button">
                        Cancel
                    </router-link>
                    <button class="create-form-btn btn--primary"
                            type="submit">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import api from '../api/api';

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
      a: {
        title: '',
        description: '',
      },
      submitErrors: {},
    };
  },
  methods: {
    resetInput() {
      this.event = {};
      this.a = {
        title: '',
        description: '',
      };
      this.submitErrors = {};
    },
    async onSubmit() {
      if (this.validateInput()) {
        try {
          const body = {
            title: this.a.title,
            description: this.a.description,
          };
          await api.createAnnouncement(body, this.eventId);
          if (this.eventId !== null) {
            await this.$router.push(`/event/${this.eventId}`);
          } else {
            await this.$router.push('/profile');
          }
          this.resetInput();
        } catch (err) {
          this.error = err;
        }
      }
    },
    validateInput() {
      const newSubmitErrors = {};
      if (this.a.title.length === 0) {
        newSubmitErrors.title = 'required';
      }
      if (this.a.description.length === 0) {
        newSubmitErrors.description = 'required';
      }

      this.submitErrors = newSubmitErrors;
      return Object.keys(newSubmitErrors).length === 0 && newSubmitErrors.constructor === Object;
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
.announcement-form-container input {
    box-sizing: border-box;
}

.announcement-title {
    font-size: 2rem;
}

.input-box {
    margin-bottom: 0.5em;
}
.input-primary {
    margin-bottom: 0;
}
.error-input {
    border-color: red;
}
.error-text {
    font-size: 0.8rem;
    color: red;
    text-align: left;
}

.btn-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
}
</style>

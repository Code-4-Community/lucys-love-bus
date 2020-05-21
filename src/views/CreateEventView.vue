<template>
    <form @submit.prevent="onSubmit">
    <div class="container">
        <input v-validate="'required|max:80'" v-model="event.title"
        name="name" class="event-name" placeholder="Name of Event">
        <span class="form-errors" v-show="errors.has('title')">{{ errors.first('title') }}</span>
        <div class="form">
            <div class="form-element">
                <input
                    v-validate="'required|max:80'"
                    v-model="event.details.location"
                    name="location"
                    type="text"
                    size="60"
                    placeholder="Location">
            </div>
            <div class="form-errors">
                <span v-show="errors.has('location')">{{ errors.first('location') }}</span>
            </div>
            <div class="form-element">
                <input
                    v-on:change="updateStartDate"
                    v-model="event.details.start"
                    name="start time"
                    type="datetime-local"
                    step="300"
                    size="30">
                <p>to</p>
                <input
                    v-on:change="updateEndDate"
                    v-model="event.details.end"
                    name="end time"
                    type="datetime-local"
                    step="300"
                    size="30">
            </div>
            <div class="time-errors">
                <p class="form-errors error" v-show="invalidStartDate">
                    The start date/time is required
                </p>
                <p class="form-errors error" v-show="invalidEndDate">
                    The end date/time is required
                </p>
            </div>
            <div class="form-element">
                <input v-validate="'required|integer'" v-model="event.spotsAvailable"
                 name="name"  type="number" placeholder="Spots Availible">
            </div>
            <div class="form-element">
                <textarea v-validate="'required'" v-model="event.details.description" rows="10"
                cols="100" name="description" placeholder="Description"></textarea>
            </div>
            <div class="form-element img-upload">
                <label>Event Image (Optional):</label>
                <input id="input-img-upload"
                       name="event image"
                       type="file"
                       v-on:change="updateEventImage"
                       accept="image/*"/>
                <div v-if="imageUploaded === 1">Loading image...</div>
                <div v-else-if="imageUploaded === 2">Loading complete!</div>
                <div v-else-if="imageUploaded === 3">An error occurred, please try again!</div>
                <div v-else-if="imageUploaded === 4">Please select an image smaller than 8 Mb.</div>
            </div>
        </div>
        <div class="buttons">
            <button type="submit"
                   :class="(errors.items.length > 0 || invalidStartDate || invalidEndDate)
                            ? 'button btn-disabled' : 'button'"
                   :disabled="(errors.items.length > 0 || invalidStartDate || invalidEndDate)">
                Create
            </button>
        </div>
    </div>
    </form>
</template>

<script>
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import { mapGetters } from 'vuex';
import moment from 'moment';
import api from '../api/api';

Vue.use(VeeValidate);
export default {
  name: 'CreateEvent',
  props: {
    eventId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      /*
        "title": STRING,
        "spotsAvailable": INT,
        "thumbnail": URL,
        "details": {
            "description": STRING,
            "location": STRING,
            "start": TIMESTAMP,
            "end": TIMESTAMP
        }
      */
      imageUploaded: 0,
      event: {
        details: {},
      },
      error: '',
      invalidStartDate: false,
      invalidEndDate: false,
    };
  },
  computed: {
    ...mapGetters('events', {
      getEventById: 'getEventById',
    }),
    isEditing() {
      // eventId is a string because its a prop from the url
      return parseInt(this.eventId, 10) > -1;
    },
  },
  watch: {
    eventId: {
      immediate: true,
      async handler() {
        if (this.isEditing) {
          // eventId is a string because its a prop from the url
          const eventCopy = await api.getEvent(parseInt(this.eventId, 10));
          eventCopy.details.start = moment(eventCopy.details.start).format('YYYY-MM-DDTHH:mm');
          eventCopy.details.end = moment(eventCopy.details.end).format('YYYY-MM-DDTHH:mm');
          this.event = { ...eventCopy };
        }
      },
    },
  },
  methods: {
    /**
     * Encode the given file in base64 format.
     *
     * @param file the file to encode.
     * @returns {Promise<unknown>} returns the base64 encoding of the file on a
     *  successful encoding, otherwise returns the error.
     */
    convertImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    /**
     * Called the user selects an image for the event thumbnail.
     * Encodes the image as a base64 String and saves
     * the encoded string to this.event.thumbnail.
     *
     * @param event the change event for the file input.
     */
    updateEventImage(event) {
      const { files } = event.target;
      if (files.length > 0) {
        this.imageUploaded = 1; // Indicates the selected image is loading
        const file = files[0];
        if (file.size > 8388608) {
          this.imageUploaded = 4; // Indicates image is too large
          return;
        }

        this.convertImage(files[0]).then((result) => {
          this.imageUploaded = 2; // Indicates the selected image was loaded successfully
          this.event = {
            ...this.event,
            thumbnail: result.toString(),
          };
        }).catch(() => {
          this.imageUploaded = 3; // Indicates the selected image failed to load
        });
      }
    },
    /**
    * Handles on change for start date.
    */
    updateStartDate() {
      this.invalidStartDate = !this.event.details.start;
    },
    /**
     * Handles on change for start date.
     */
    updateEndDate() {
      this.invalidEndDate = !this.event.details.end;
    },
    /**
     * Validates and sends the event (included the encoded image) to the web server,
     * where the web server will validate and upload the image to S3 and return the URL.
     */
    onSubmit() {
      this.updateStartDate();
      this.updateEndDate();
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          if (this.invalidStartDate || this.invalidEndDate) {
            return;
          }

          try {
            let resp;

            this.event.details.start = moment(this.event.details.start).valueOf();
            this.event.details.end = moment(this.event.details.end).valueOf();

            if (this.event.thumbnail === undefined) {
              this.event.thumbnail = null;
            }

            if (!this.isEditing) {
              resp = await api.createEvent(this.event);
            } else {
              resp = await api.editEvent(this.event);
            }

            if (resp.status && resp.status === 200) {
              const eventId = this.event.id;
              this.event = {};
              this.$router.push(`/event/${eventId}`);
              this.imageUploaded = 0; // Reset image load status
              document.getElementById('input-img-upload').value = null; // Deselect image
            } // else display error
          } catch (err) {
            this.error = err;
          }
        }
      }).catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error);
      });
    },
  },
};
</script>

<style scoped>
@import '../../assets/color-constants.less';
.container {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.event-name {
    margin: 1rem;
    padding: 1rem;
    font-size: 30pt;
    font-family: 'Quicksand';
}

.form {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    border: 1px solid #ccc;
    margin: 1rem;
}

.form-element {
    display: flex;
    flex-direction: row;
    margin-top: 0.4rem;
    margin-right: 1rem;
    font-family: 'Montserrat';
}

.error {
    margin: 1rem 75px 1rem 1rem;
    text-align: left;
    font-family: 'Montserrat';
    color: red;
    font-weight: bold;
}

.time-errors {
    display: flex;
}

input[type=text], input[type=datetime-local], input[type=number], textarea {
    margin: 0.8rem;
    padding: 0.8rem;
    border: 0.1rem solid #ccc;
    box-sizing: border-box;
    font-family: 'Montserrat';
    font-size: 12pt;
}

input[type=file] {
    margin: 0 0.8rem;
    font-family: 'Montserrat';
    font-size: 12pt;
}

.img-upload {
    margin: 0.8rem;
    font-family: 'Montserrat';
    font-size: 12pt;
}


.button {
    margin: 1rem;
    font-family: 'Raleway';
    font-size: 18pt;
    border-radius: 6pt;
    background-color: black;
    color: #eeeeee;
}

.btn-disabled {
    cursor: not-allowed;
    background-color: #454545;
}

span {
    margin: 1rem;
    font-family: 'Montserrat';
    color: red;
    font-weight: bold;
}

</style>

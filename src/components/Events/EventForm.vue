<template>
  <form @submit.prevent="onSubmit">
    <div class="event-form-container">
      <div class="box-title input-box">
        <input v-model="event.title"
               name="name"
               class="input-primary"
               :class="{ 'error-input': !!submitErrors.title }"
               placeholder="Name of Event">
        <div class="error-text">
          {{ submitErrors.title }}
        </div>
      </div>
      <div class="input-box box-location">
        <label class="input-label">
          Event Location
          <input class="input-primary"
                 :class="{ 'error-input': !!submitErrors.location }"
                 v-model="event.details.location"
                 name="location"
                 type="text"
                 placeholder="Location">
        </label>
        <div class="error-text">
          {{ submitErrors.location }}
        </div>
      </div>
      <div class="box-time">
        <div class="date-group">
          <div class="input-box">
            <label class="input-label">
              Event Date
              <input class="date-input input-primary"
                     :class="{ 'error-input': !!submitErrors.eventDate }"
                     v-model="eventDate"
                     type="date"
                     name="event date">
            </label>
            <div class="error-text">
              {{ submitErrors.eventDate }}
            </div>
          </div>
        </div>
        <div class="time-inputs">
          <div class="input-box">
            <label class="input-label">
              <span class="time-label">Start Time</span>
              <input
                  class="input-primary time-input"
                  :class="{ 'error-input': !!submitErrors.startTime }"
                  v-model="startTime"
                  name="start time"
                  type="time"
                  step="300" />
               to
            </label>
            <div class="error-text">
              {{ submitErrors.startTime }}
            </div>
          </div>
          <div class="input-box">
            <label class="input-label">
              <span class="time-label">End Time</span>
              <input
                  class="input-primary time-input"
                  :class="{ 'error-input': !!submitErrors.endTime }"
                  v-model="endTime"
                  name="end time"
                  type="time"
                  step="300">
            </label>
            <div class="error-text">
              {{ submitErrors.endTime }}
            </div>
          </div>
        </div>
      </div>
      <div class="box-spots">
        <div class="input-box">
          <label class="input-label">
            Spots Available
            <input class="input-primary"
                   :class="{ 'error-input': !!submitErrors.spotsAvailable }"
                   v-validate="'required|integer'"
                   v-model="event.spotsAvailable"
                   name="name"
                   type="number"
                   placeholder="Spots Availible">
          </label>
          <div class="error-text">
            {{ submitErrors.spotsAvailable }}
          </div>
        </div>
      </div>
      <div class="box-description">
        <div class="input-box">
          <label class="input-label">
            Event Description
                <textarea class="input-primary"
                          :class="{ 'error-input': !!submitErrors.description }"
                          v-model="event.details.description"
                          rows="10"
                          cols="100"
                          name="description"
                          placeholder="Description" />
          </label>
          <div class="error-text">
            {{ submitErrors.description }}
          </div>
        </div>
      </div>
      <div class="form-box box-img-upload">
        <div class="img-upload">
          <input id="event-image-input"
                 name="event-image-input"
                 type="file"
                 v-on:change="updateEventImage"
                 accept="image/*"/>
          <label class="file-label" for="event-image-input">+ Add Image</label>
          <span v-if="imageName !== ''" class="img-name">
            {{ imageName }}
          </span>
          <span class="img-progress">
            <span v-if="imageUploaded === 1">Loading image...</span>
            <span v-else-if="imageUploaded === 2">Image Loaded Successfully!</span>
            <span v-else-if="imageUploaded === 3">An error occurred, please try again!</span>
            <span v-else-if="imageUploaded === 4">Please select an image smaller than 8 Mb.</span>
          </span>
        </div>
      </div>
      <div class="form-box box-buttons">
        <button type="submit"
                class="create-form-btn btn--primary"
                :disabled="imageUploaded === 1 || imageUploaded === 4">
          {{ submitName }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import moment from 'moment';
import DateUtils from '../../utils/DateUtils';

export default {
  name: 'EventForm',
  props: {
    submitName: {
      type: String,
      required: true,
    },
    eventProp: {
      type: Object,
      required: false,
      default() {
        return {
          title: '',
          spotsAvailable: null,
          thumbnail: null,
          details: {
            description: '',
            location: '',
            start: null,
            end: null,
          },
        };
      },
    },
  },
  data() {
    return {
      imageUploaded: 0,
      imageName: '',
      event: {
        title: this.eventProp.title,
        spotsAvailable: this.eventProp.spotsAvailable,
        thumbnail: this.eventProp.thumbnail,
        details: {
          description: this.eventProp.details.description,
          location: this.eventProp.details.location,
          start: this.eventProp.details.start,
          end: this.eventProp.details.end,
        },
      },
      eventDate: this.unixToDateTimeArray(this.eventProp.details.start)[0],
      startTime: this.unixToDateTimeArray(this.eventProp.details.start)[1],
      endTime: this.unixToDateTimeArray(this.eventProp.details.end)[1],
      submitErrors: {},
    };
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

        this.imageName = files[0].name;
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
    unixToDateTimeArray(unixTime) {
      if (unixTime == null) {
        return ['', ''];
      }
      const date = moment(unixTime).format('YYYY-MM-DD');
      const time = moment(unixTime).format('HH:mm');
      return [date, time];
    },
    dateTimeToUnix(date, time) {
      return moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').valueOf();
    },
    /**
     * Validates and sends the event (included the encoded image) to the web server,
     * where the web server will validate and upload the image to S3 and return the URL.
     */
    onSubmit() {
      if (this.validateInput()) {
        this.event.details.start = this.dateTimeToUnix(this.eventDate, this.startTime);
        this.event.details.end = this.dateTimeToUnix(this.eventDate, this.endTime);

        this.$emit('submit-event-form', { event: this.event });
      }
    },
    validateInput() {
      const newSubmitErrors = {};
      if (this.event.title.length === 0) {
        newSubmitErrors.title = 'required';
      }
      if (this.event.details.location.length === 0) {
        newSubmitErrors.location = 'required';
      }
      if (this.event.spotsAvailable < 0) {
        newSubmitErrors.spotsAvailable = 'spots available must be positive';
      }
      if (this.event.spotsAvailable == null) {
        newSubmitErrors.spotsAvailable = 'required';
      }

      this.submitErrors = this.validateTime(newSubmitErrors);
      return Object.keys(this.submitErrors).length === 0
        && this.submitErrors.constructor === Object;
    },
    validateTime(submitErrors) {
      const newSubmitErrors = { ...submitErrors };

      if (this.eventDate.length === 0) {
        newSubmitErrors.eventDate = 'required';
      } else if (DateUtils.isInPast(this.eventDate)) {
        newSubmitErrors.eventDate = 'event date must be in the future';
      }

      if (this.startTime.length !== 0
        && this.endTime.length !== 0
        && !DateUtils.timeBefore(this.startTime, this.endTime)) {
        newSubmitErrors.endTime = 'must be after start time';
      }
      if (this.startTime.length === 0) {
        newSubmitErrors.startTime = 'required';
      }
      if (this.endTime.length === 0) {
        newSubmitErrors.endTime = 'required';
      }

      return newSubmitErrors;
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';
  @import '../../../assets/global-classes.less';

  .event-form-container {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
    padding: 1rem;
    background-color: rgba(255, 201, 91, 0.31);
    text-align: left;
    border-radius: 5px;
  }

  .event-form-container input {
    box-sizing: border-box;
  }

  .box-title {
    width: 60%;
  }
  .box-title input {
    font-size: 2rem;
  }

  .box-location {
    width: 30%;
  }

  .box-time {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;

  }
  .date-group {
    width: 25%;
  }
  .date-input {
    width: 90%;
  }

  .time-inputs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .time-inputs > * {
    margin: 0 6px;
  }


  .box-spots {
    width: 20%;
  }

  .box-description {
    width: 100%;
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

  .img-upload {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  #event-image-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  .file-label {
    cursor: pointer;
  }
  .img-name {
    margin-left: 12px;
    text-decoration: underline;
  }
  .img-progress {
    margin-left: 12px;
  }

  .box-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .time-label {
    display: block;
    width: 100%;
  }

  .time-input {
    width: 10rem;
    margin-right: .5rem;
  }
</style>

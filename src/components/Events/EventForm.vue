<template>
  <form @submit.prevent="onSubmit">
    <div class="event-form-container">
      <div class="form-box box-title">
        <div>
          <input v-validate="'required|max:80'"
                 v-model="event.title"
                 name="name"
                 class="event-name"
                 placeholder="Name of Event">
          <span class="form-errors" v-show="errors.has('title')">{{ errors.first('title') }}</span>
        </div>
      </div>
      <div class="form-box box-location">
        <div>
          <div>
            Event Location
          </div>
          <div class="form-element">
            <input
                class="secondary-input"
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
        </div>
      </div>
      <div class="form-box box-time">
        <div class="date-group">
          <div>
            Event Date
          </div>
          <input class="date-input secondary-input"
                 v-model="eventDate"
                 type="date"
                 name="event date">
          <div class="form-errors error" v-show="invalidStartDate">
            Bad Date
          </div>
        </div>
        <div class="time-inputs">
          <div>
            <div>
              Start Time
            </div>
            <input
                class="secondary-input"
                v-model="startTime"
                name="start time"
                type="time"
                step="300"
                size="30">
          </div>
          <div>to</div>
          <div>
            <div>
              End Time
            </div>
            <input
                class="secondary-input"
                v-model="endTime"
                name="end time"
                type="time"
                step="300"
                size="30">
          </div>
        </div>
      </div>
      <div class="form-box box-spots">
        <div>
          <div>
            Spots Available
          </div>
          <div class="form-element">
            <input class="secondary-input"
                   v-validate="'required|integer'"
                   v-model="event.spotsAvailable"
                   name="name"
                   type="number"
                   placeholder="Spots Availible">
          </div>
        </div>
      </div>
      <div class="form-box box-description">
        <div>
          <div>
            Event Description
          </div>
          <div class="form-element">
                <textarea class="secondary-input"
                          v-validate="'required'"
                          v-model="event.details.description"
                          rows="10"
                          cols="100"
                          name="description"
                          placeholder="Description" />
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
                :disabled="(errors.items.length > 0 || invalidStartDate || invalidEndDate)">
          {{ submitName }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import moment from 'moment';

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
      error: '',
      invalidStartDate: false,
      invalidEndDate: false,
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
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.event.details.start = this.dateTimeToUnix(this.eventDate, this.startTime);
          this.event.details.end = this.dateTimeToUnix(this.eventDate, this.endTime);

          this.$emit('submit-event-form', { event: this.event });
        }
      }).catch((error) => {
        // eslint-disable-next-line no-alert
        alert(error);
      });
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';
  @import '../../../assets/global-classes.less';

  .event-form-container {
    margin-top: 16px;
    padding: 1rem;
    background-color: rgba(255, 201, 91, 0.31);
    text-align: left;
    border-radius: 12px;
  }

  .form-box {
    margin: 16px 0;
  }
  .form-box:first-child {
    margin-top: 0;
  }
  .form-box:last-child {
    margin-bottom: 0;
  }

  .box-title {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .event-name {
    width: 100%;
    padding: 1rem;
    font-size: 2.3rem;
    font-family: 'Quicksand';
    border: .1rem solid #ccc;
    border-radius: 3px;
  }


  .secondary-input {
    padding: .8rem;
    border: .1rem solid #ccc;
    box-sizing: border-box;
    font-family: Montserrat;
    font-size: 12pt;
    border-radius: 3px;
  }

  .box-location {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
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
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .box-description {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
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
</style>

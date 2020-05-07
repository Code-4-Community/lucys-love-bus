<template>
    <form @submit.prevent="onSubmit">
    <div class="container">
        <input v-validate="'required|max:80'" v-model="event.name"
        name="name" class="event-name" placeholder="Name of Event">
        <span class="form-errors" v-show="errors.has('name')">{{ errors.first('name') }}</span>
        <div class="form">
            <div class="form-element">
                <input
                    v-validate="'required'"
                    v-model="event.date"
                    name="date"
                    type="date"
                    size="50">
                <input
                    v-validate="'required|max:80'"
                    v-model="event.location"
                    name="location"
                    type="text"
                    size="60"
                    placeholder="Location">
            </div>
            <div class="form-errors">
                <span v-show="errors.has('date')">{{ errors.first('date') }}</span>
                <span v-show="errors.has('location')">{{ errors.first('location') }}</span>
            </div>
            <div class="form-element">
                <input
                    v-validate="'required'"
                    v-model="event.startTime"
                    name="start time"
                    type="time"
                    step="300"
                    size="30">
                <p>to</p>
                <input
                    v-validate="'required'"
                    v-model="event.endTime"
                    name="end time"
                    type="time"
                    step="300"
                    size="30">
            </div>
            <div class="form-errors">
                <span v-show="errors.has('start time')">{{ errors.first('start time') }}</span>
                <span v-show="errors.has('end time')">{{ errors.first('end time') }}</span>
            </div>
            <div class="form-element">
                <textarea v-validate="'required'" v-model="event.description" rows="10" cols="100"
                name="description" placeholder="Description"></textarea>
            </div>
            <div class="form-errors">
                <span v-show="errors.has('description')">{{ errors.first('description') }}</span>
            </div>
            <div class="form-element">
                <textarea v-validate="'required'" v-model="event.whatToBring" rows="7" cols="100"
                name="what to bring" placeholder="What to Bring"></textarea>
            </div>
            <div class="form-errors">
                <span v-show="errors.has('what to bring')">
                    {{ errors.first('what to bring') }}
                </span>
            </div>

            <div class="form-element img-upload">
                <label>Event Image:</label>
                <input id="input-img-upload"
                       name="event image"
                       type="file"
                       v-on:change="updateEventImage"
                       v-validate="'required'"
                       accept="image/*"/>
                <div v-if="imageUploaded === 1">Loading image...</div>
                <div v-else-if="imageUploaded === 2">Loading complete!</div>
                <div v-else-if="imageUploaded === 3">An error occurred, please try again!</div>
            </div>
            <div class="form-errors">
                <span v-show="errors.has('event image')">
                    {{ errors.first('event image') }}
                </span>
            </div>
        </div>
        <div class="buttons">
            <input type="submit" class="button" value="Create">
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
  name: 'CreateEvent',
  data() {
    return {
      /*
        name: String,
        date: Date,
        location: String,
        startTime: String,
        endTime: String,
        description: String,
        whatToBring: String,
      */
      imageUploaded: 0,
      event: {},
      error: '',
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
     * Validates and sends the event (included the encoded image) to the web server,
     * where the web server will validate and upload the image to S3 and return the URL.
     */
    onSubmit() {
      this.$validator.validateAll().then(async (result) => {
        if (result && this.imageUploaded) {
          try {
            const resp = await api.createEvent(this.event);
            if (resp.status && resp.status === 200) {
              this.event = {};
              this.imageUploaded = 0; // Reset image load status
              document.getElementById('input-img-upload').value = null; // Deselect image
            } // else display error
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

input[type=text], input[type=date], input[type=time], textarea {
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

span {
    margin: 1rem;
    font-family: 'Montserrat';
    color: red;
    font-weight: bold;
}

</style>

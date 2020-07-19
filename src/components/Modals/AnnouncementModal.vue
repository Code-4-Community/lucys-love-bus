<template>
  <transition name="modal-fade">
    <div v-if="open" class="modal-backdrop">
      <div class="modal">
        <div class="announce-header">
          <div class="announce-title">{{announcement.title}}</div>
          <div class="announce-date">{{ createdString }}</div>
        </div>
        <div class="announce-body">
          {{announcement.description}}
          <access-control :roles="[USER[ROLE.ADMIN]]">
            <button class="delete-btn" @click="deleteAnnouncement">Delete Announcement</button>
          </access-control>
        </div>
        <div
            class="close-btn"
            @click="close"
            >
          X
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import DateUtils from '../../utils/DateUtils';
import AccessControl from '../AccessControl/AccessControl.vue';
import api from '../../api/api';

export default {
  name: 'AnnouncementModal',
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    announcement: {
      type: Object,
    },
  },
  components: {
    AccessControl,
  },
  computed: {
    createdString() {
      return DateUtils.toStringDate(this.announcement.created);
    },
  },
  methods: {
    close() {
      this.$emit('close-announcement');
    },
    toStringDate(date) {
      return DateUtils.toStringDate(date);
    },
    async deleteAnnouncement() {
      const res = await api.deleteAnnouncement(this.announcement.id);
      console.log(res);
    },
  },
};
</script>

<style scoped>
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    position: fixed;
    background: white;
    /* this works as a border, except now we can round the inner corners. */
    box-shadow: 0 0 0 12px rgba(248, 134, 52, 0.5), 0 0 0 12px white;
    border-radius: 6px;
    width: 500px;
    max-height: 500px;

    overflow-x: visible;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  .announce-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .announce-title {
    flex-grow: 3;
    font-weight: bold;
    font-size: 1.1rem;
    text-align: left;
  }
  .announce-date {
    text-align: right;
  }
  .announce-body {
    margin-top: 16px;
    text-align: left;
  }

  .close-btn {
    background: rgb(252,195,154);
    cursor: pointer;
    position: absolute;
    right: -20px;
    bottom: -20px;
    height: 50px;
    line-height: 50px;
    width: 50px;
    border-radius: 50%;
    text-align: center;
    vertical-align: middle;
    font-weight: bolder;
  }

  .delete-btn {
    cursor: pointer;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    text-decoration: none;
    border-radius: 6px;
    padding: .5rem 1rem .5rem 1rem;
    color: white;
    transition: .3s;
    min-width: 10rem;
    box-sizing: border-box;
    background-color: red;
    border: 1px solid red;
  }

</style>

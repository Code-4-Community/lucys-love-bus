<template>
  <div class="announcements-container">
    <div v-if="announcements.length === 0">
      <div class="blank-card">
        <p>There is nothing to be announced!</p>
      </div>
    </div>
    <div v-else v-for="a in announcements" v-bind:key="a.id" @click="showAnnouncement(a)" >
      <div class="announcement-card">
        <div class="announce-header">
          <div class="announce-title">{{a.title}}</div>
          <div class="announce-date">{{ toStringDate(a.created) }}</div>
        </div>
        <div class="announce-body">{{a.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DateUtils from '../../utils/DateUtils';
import api from '../../api/api';

export default {
  /*
  This component now works for both sitewide and event-specific announcements.
  If being used for sitewide, boolean is true and a count is passed.
  If being used for event-specific, boolean is false and an event id is passed.
  */
  name: 'AnnouncementsList',
  props: {
    count: Number, // given a value if and only if sitewide
    eventID: Number, // given a value if and only if NOT sitewide
  },
  data() {
    return {
      announcements: [],
    };
  },
  methods: {
    async getAnnouncements() {
      let res;
      if (!(this.eventId >= 0)) {
        res = await api.getSitewideAnnouncements({
          count: this.count,
        });
      } else {
        res = await api.getEventAnnouncements(this.eventID);
      }
      return res.announcements;
    },
    toStringDate(date) {
      return DateUtils.toStringDate(date);
    },
    showAnnouncement(a) {
      this.$emit('open-announcement', a);
    },
  },
  async created() {
    this.announcements = await this.getAnnouncements();
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';
  @import '../../../assets/global-classes.less';

  .blank-card {
    width: 90%;
    height: 80px;
    padding: 1rem;
    border-radius: 2px;
    margin: 0 auto;
    background: white;
    text-align: center;
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
    margin-top: 6px;
    text-align: left;
  }
  .announce-body:after {
    content:"";
    top:0;
    left:0;
    position: absolute;
    width:100%;
    height:100%;
    background: linear-gradient(rgba(255, 255, 255, 0) 20px, rgba(255, 255, 255, 1));
  }

  .announcement-card {
    position: relative;
    width: 90%;
    max-height: 100px;
    padding: 1rem;
    border-radius: 4px;
    margin: 16px auto;
    overflow: hidden;
    background:white;
    cursor: pointer;
  }

  .announcements-container {
    box-sizing: border-box;
    position: absolute;
    overflow-y: scroll;
    width: 100%;
    max-height: 100%;
    border: none;
    border-radius: 6px;
    padding: 1rem;
    background: linear-gradient(180deg, rgba(248, 134, 52, 0.5) 0%, rgba(255, 201, 102, 0.5) 100%);
  }
  .announcements-container::-webkit-scrollbar {
    display: none;
  }
</style>

<template>
  <div class="scroll-container">
    <div v-for="(a, idx) in announcements" v-bind:key="a.id" >
      <div class="announcement-block">
        <div class="header-bar">
          <div class="title-date">
            <div class="announcement-title">
              {{ a.title }}
            </div>
            <div class="announcement-date">
              {{ toStringDate(a.created) }}
            </div>
          </div>
          <div class="hide-button" @click="hideAnnouncement(idx)">
            X
          </div>
        </div>
        <div class="announcement-description">
          {{ a.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DateUtils from '../../utils/DateUtils';

export default {
  name: 'EventAnnouncementsList',
  props: {
    announcementsProp: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      announcements: this.announcementsProp,
    };
  },
  methods: {
    hideAnnouncement(idx) {
      this.announcements.splice(idx, 1);
    },
    toStringDate(date) {
      return DateUtils.toStringDate(date);
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';

  .announcement-block {
    border: 3px solid @button-bg;
    border-radius: 4px;
    padding: 6px 6px 6px 12px;
    text-align: left;
    margin: 6px 0;
  }

  .header-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  .title-date {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
  }

  .announcement-title {
    font-size: 1.3rem;
    margin-right: 12px;
  }
  .announcement-date {
    font-size: 1rem;
  }

  .hide-button {
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 16pt;
    overflow: hidden;
    text-align: center;
    background-color: @button-bg;
    border: 1px solid @button-bg;
    color: white;
    border-radius: 50%;
    cursor: pointer;
  }

  .announcement-description {
    padding-right: 6px;
  }

</style>

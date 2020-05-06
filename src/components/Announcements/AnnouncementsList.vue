<template>
  <div class="scroll-container announcements-container" v-bind:style="{ 'maxHeight': '20rem' }">
      <div v-for="a in announcements" v-bind:key="a.id" class="announcement-wrapper">
        <h3>{{a.title}}</h3>
        <p>{{ toStringDate(a.created) }}</p>
        <p>{{a.description}}</p>
      </div>
  </div>
</template>

<script>
import DateUtils from '../../utils/DateUtils';
import api from '../../api/api';

export default {
  name: 'AnnouncementsList',
  props: {
    number: Number,
  },
  data() {
    return {
      announcements: [],
    };
  },
  methods: {
    async getAnnouncements() {
      const res = await api.getSitewideAnnouncements({});
      return res.announcements;
    },
    toStringDate(date) {
      return DateUtils.toStringDate(date);
    },
  },
  async created() {
    this.announcements = await this.getAnnouncements();
  },
};
</script>

<style scoped>
  @import '../../../assets/color-constants.less';
  @import '../../../assets/global-classes.less';

  .announcements-container {
    border: 1px solid grey;
    padding: 1rem;
  }

  .announcement-wrapper {
    border: 1px solid grey;
    margin: 1rem 0;
  }
</style>

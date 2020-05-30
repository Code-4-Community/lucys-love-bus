<template>
  <div class="profile">
    <div class="flex-vertical">
    <Welcome :name="username"/>
    <div class="content-wrapper">
      <div class="announcements-list__container">
        <h4 class="dekko-label sub-header">Announcements</h4>
        <announcements-list
            sitewide
            :count="announcementsCount"
            @open-announcement="openAnnouncementModal"/>
      </div>
      <div class='flex-vertical'>
        <h4 class="dekko-label sub-header">Explore</h4>
        <router-link class="explore-btn top" tag="button" to='/upcoming-events'>
            Our Events
        </router-link>
        <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
          <router-link class="explore-btn" tag="button" to='/my-events'>
              My Events
          </router-link>
        </access-control>
        <access-control :roles="[USER[ROLE.ADMIN]]">
          <router-link class="explore-btn" tag="button"
          :to='{name: "create-announcement", params: {eventName: "sitewide"}}'>
            Make Announcement
          </router-link>
        </access-control>
        <access-control :roles="[USER[ROLE.ADMIN]]">
          <router-link class="explore-btn" tag="button"
                       :to='{name: "family-requests"}'>
            View Account Requests
          </router-link>
        </access-control>
        <router-link class="explore-btn" tag="button" to='/settings'>
            Settings
        </router-link>
      </div>
      </div>
      <AnnouncementModal
          :open="openModal"
          :announcement="modalAnnouncement"
          @close-announcement="closeAnnouncementModal"/>
    </div>
  </div>
</template>

<script>
import Welcome from '../components/Profile/Welcome.vue';
import AnnouncementsList from '../components/Announcements/AnnouncementsList.vue';
import AnnouncementModal from '../components/Announcements/AnnouncementModal.vue';
import ANNOUNCEMENT_COUNT from '../utils/constants/announcements';
import { USER, ROLE } from '../utils/constants/user';
import AccessControl from '../components/AccessControl/AccessControl.vue';

export default {
  name: 'profile',
  data() {
    return {
      USER,
      ROLE,
      openModal: false,
      modalAnnouncement: null,
    };
  },
  components: {
    Welcome,
    AnnouncementsList,
    AnnouncementModal,
    AccessControl,
  },
  computed: {
    announcementsCount() {
      return ANNOUNCEMENT_COUNT;
    },
  },
  methods: {
    openAnnouncementModal(announcement) {
      this.openModal = true;
      this.modalAnnouncement = announcement;
    },
    closeAnnouncementModal() {
      this.openModal = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/color-constants.less';

.content-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.sub-header {
  font-size: 1.5rem;
}

.explore-btn {
  width: 12rem;
  margin: 1em;
  background-color: @green-apple;
  color: black;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  clip-path: polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%);
}

.top {
  margin-top: 0;
}

</style>

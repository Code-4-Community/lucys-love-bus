<template>
  <div class="profile">
    <div class="left-side-bar">
      <div class="profile-nav-btns">
        <div class="profile-btn-box">
          <router-link class="profile-btn top" tag="button" to='/upcoming-events'>
            Upcoming Events
          </router-link>
        </div>
        <access-control class="profile-btn-box" :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
          <router-link class="profile-btn" tag="button" to='/my-events'>
            My Events
          </router-link>
        </access-control>
        <access-control class="profile-btn-box" :roles="[USER[ROLE.ADMIN]]">
          <router-link class="profile-btn" tag="button" to="/create-event">
            Create Event
          </router-link>
        </access-control>
        <access-control class="profile-btn-box" :roles="[USER[ROLE.ADMIN]]">
          <router-link class="profile-btn" tag="button"
                       :to='{name: "create-announcement", params: {eventName: "sitewide"}}'>
            Make Announcement
          </router-link>
        </access-control>
        <access-control class="profile-btn-box" :roles="[USER[ROLE.ADMIN]]">
          <router-link class="profile-btn" tag="button"
                       :to='{name: "family-requests"}'>
            View Requests
          </router-link>
        </access-control>
        <div class="profile-btn-box">
          <router-link class="profile-btn" tag="button" to='/settings'>
            Account Settings
          </router-link>
        </div>
      </div>
      <div>
        <div class="profile-btn-box">
          <button class="profile-btn" @click="logout">
            Log Out
          </button>
        </div>
      </div>
    </div>
    <div class="right-side-bar">
      <div class="page-title">
        Homepage
      </div>
      <div class="page-subtitle">
        Welcome, family!
      </div>
      <div class="welcome-description">
        The Sajni Center invites you to use this page as your portal to view and
        register for events, and stay up to date with our community!
      </div>
      <div class="page-subtitle">
        Recent Announcements
      </div>
      <div class="announcement-list">
        <announcements-list
            sitewide
            :count="announcementsCount"
            @open-announcement="openAnnouncementModal"/>
      </div>
    </div>
    <AnnouncementModal
        :open="openModal"
        :announcement="modalAnnouncement"
        @close-announcement="closeAnnouncementModal"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AnnouncementsList from '../components/Announcements/AnnouncementsList.vue';
import AnnouncementModal from '../components/Modals/AnnouncementModal.vue';
import ANNOUNCEMENT_COUNT from '../utils/constants/announcements';
import { USER, ROLE } from '../utils/constants/user';
import AccessControl from '../components/AccessControl/AccessControl.vue';
import { logout } from '../auth/authAPI';

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
    ...mapActions({
      clearAll: 'clearAll',
    }),
    openAnnouncementModal(announcement) {
      this.openModal = true;
      this.modalAnnouncement = announcement;
    },
    closeAnnouncementModal() {
      this.openModal = false;
    },
    async logout() {
      try {
        await logout();
        this.clearAll();
        await this.$router.push('/');
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert(`Error: ${err}`);
      }
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/global-classes.less';

  .profile {
    display: grid;
    grid-template-columns: 35% 65%;
    grid-template-areas: "right left";

    position: absolute;
    height: calc(100vh - 85px);
    top: 0;
    left: 0;
    right: 0;
  }

  .left-side-bar {
    box-sizing: border-box;
    grid-area: right;
    width: 100%;
    // End percent =  ((100% / left-side-bar.width) * 100%)
    background: linear-gradient(90deg, rgba(61,168,72,0.92) 0%, rgba(151,244,86,0.83) 250%);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .profile-btn-box {
    width: 100%;
    border-top: 2px solid white;
  }
  .profile-nav-btns > .profile-btn-box:last-child {
    border-bottom: 2px solid white;
  }

  .profile-btn {
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    padding: 1em;
    font-size: 1.3rem;
    color: white;
  }
  .profile-btn:hover {
    background-color: white;
    color: black;
  }

  .right-side-bar {
    box-sizing: border-box;
    grid-area: left;
    width: 100%;
    padding: 30px 45px;
    position: relative;
    text-align: left;

    max-height: calc(100vh - 85px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .page-subtitle {
    margin-top: 30px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .announcement-list {
    position: relative;
    margin-top: 12px;
    width: 100%;
    height: 100%;
    min-height: 20vh;
    border-radius: 6px;
  }

</style>

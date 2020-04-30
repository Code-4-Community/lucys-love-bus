<template>
  <div>
    <h1>My Profile</h1>

    <Welcome :name="username"/>
    <div class="flex-horizontal">
      <div class='dash'>
        <router-link to='/events'>
          <div class='dash-item'>
            <img class="thumb" src='https://images.pexels.com/photos/273011/pexels-photo-273011.jpeg?cs=srgb&dl=black-calendar-close-up-composition-273011.jpg&fm=jpg'/>
            <button class="btn--tertiary">New Events</button>
          </div>
        </router-link>
        <router-link :to='{name: "my-events", params: {username: username}}'>
          <div class='dash-item'>
            <img class="thumb" src='https://static5.depositphotos.com/1037987/476/i/450/depositphotos_4767995-stock-photo-couple-giving-two-young-children.jpg'/>
            <button class="btn--tertiary">My Events</button>
          </div>
        </router-link>
        <router-link :to='{name: "account", params: {username: username}}'>
          <div class='dash-item'>
            <img class="thumb" src='https://static.thenounproject.com/png/17337-200.png'/>
            <button class="btn--tertiary">Account Info</button>
          </div>
        </router-link>
        <router-link :to='{name: "create-announcement", params: {eventName: sitewide}}'>
          <div class='dash-item'>
            <img class="thumb" src='https://images.pexels.com/photos/273011/pexels-photo-273011.jpeg?cs=srgb&dl=black-calendar-close-up-composition-273011.jpg&fm=jpg'/>
            <button class="btn--tertiary">Sitewide Announcement</button>
          </div>
        </router-link>
      </div>
      <div class="announcements-list__container">
        <announcements-list />
      </div>
    </div>
  </div>
</template>

<script>
import Welcome from '../components/Profile/Welcome.vue';
import AnnouncementsList from '../components/Announcements/AnnouncementsList.vue';

export default {
  name: 'Profile',
  components: {
    Welcome,
    AnnouncementsList,
  },
  props: {
    username: {
      required: true,
      type: String,
    },
  },
};
</script>

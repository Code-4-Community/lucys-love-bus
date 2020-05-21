<template>
  <div class="header">
    <div class="title">
      <router-link to="/" tag="h3">
        <img class="header-logo" src="https://cdn.firespring.com/images/d8b7f14f-5a80-445d-96e7-49cfd18526f7.png" height="75px"/>
      </router-link>
    </div>
    <access-control :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
      <div class="navlinks">
          <router-link to="/events" tag="button">Events</router-link>
          <router-link to="/my-events" tag="button">Registrations</router-link>
          <router-link to="/checkout" tag="button">Checkout</router-link>
          <router-link to="/profile" tag="button">Profile</router-link>
          <button v-on:click="logout">Log Out</button>
      </div>
    </access-control>
    <access-control :roles="[USER[ROLE.ADMIN]]">
      <div class="navlinks">
          <router-link to="/events" tag="button">Events</router-link>
          <router-link to="/my-events" tag="button">Registrations</router-link>
          <router-link to="/checkout" tag="button">Checkout</router-link>
          <router-link to="/create-event" tag="button">Create Event</router-link>
          <router-link to="/profile" tag="button">Profile</router-link>
          <button v-on:click="logout">Log Out</button>
      </div>
    </access-control>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import authService from '../utils/service/authService';
import AccessControl from './AccessControl/AccessControl.vue';
import { USER, ROLE } from '../utils/constants/user';

export default {
  name: 'the-navigation',
  data() {
    return {
      USER,
      ROLE,
    };
  },
  components: {
    AccessControl,
  },
  methods: {
    ...mapMutations('user', {
      setUser: 'setUser',
    }),
    async logout() {
      let res = '';
      try {
        res = await authService.actions.logout();
        // eslint-disable-next-line no-alert
        alert('You successfully logged out!');
        this.setUser();
        this.$router.push('/');
      } catch (err) {
        res = err;
      }
      return res;
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../assets/global-classes.less';

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 8vh;
  background-color: @header-color;
  background: linear-gradient(90deg, rgba(61,168,72,0.92) 0%, rgba(151,244,86,0.83) 100%);
  font-family: var(--main-font);
  .title {
    text-transform: uppercase;
    letter-spacing: 6px;
  }
  .navlinks {
    display: flex;
    justify-content: space-between;
    white-space: nowrap;
    button {
      display: block;
      width: 100%;
      height: 5em;
      letter-spacing: 1px;
      font-weight: bold;
      background: none;
      text-decoration: none;
      border: none;
      outline: none;
      font-family: var(--main-font);
    }
    button:hover {
      color: @button-hover-color;
    }
  }
}
</style>

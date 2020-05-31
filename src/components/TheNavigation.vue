<template>
  <div class="header">
    <div class="title">
      <router-link to="/" tag="div">
        <img class="header-logo" src="https://cdn.firespring.com/images/d8b7f14f-5a80-445d-96e7-49cfd18526f7.png" height="75px"/>
      </router-link>
    </div>
    <access-control class="navlinks" :roles="[USER[ROLE.GP], USER[ROLE.PF], USER[ROLE.ADMIN]]">
      <access-control class="header-btn" :roles="[USER[ROLE.GP], USER[ROLE.PF]]">
        <router-link to="/my-events" tag="button">My Events</router-link>
      </access-control>
      <access-control class="header-btn" :roles="[USER[ROLE.ADMIN]]">
        <router-link to="/create-event" tag="button">Create Event</router-link>
      </access-control>
      <div class="header-btn">
        <router-link to="/upcoming-events" tag="button">Upcoming Events</router-link>
      </div>
      <div class="header-btn">
        <router-link to="/profile" tag="button">Home</router-link>
      </div>
      <div class="header-btn logout">
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
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;
    background: linear-gradient(90deg, rgba(61,168,72,0.92) 0%, rgba(151,244,86,0.83) 100%);

    .title {
      text-transform: uppercase;
      letter-spacing: 6px;
      margin-top: 6px;
    }
  }


  .navlinks {
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    .header-btn {
      margin: 0 1em;
      box-sizing: border-box;

      button {
        border: none;
        outline: none;
        background: transparent;
        width: 100%;
        height: 100%;

        cursor: pointer;
        font-size: 1rem;
        padding: 1rem;
      }

      button:hover {
        color: white;
      }
    }
  }
</style>

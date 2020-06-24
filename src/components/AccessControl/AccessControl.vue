<template>
  <div v-if="hasRole" :class="_class">
    <slot />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import tokenService from '../../auth/token';
import {
  USER,
} from '../../utils/constants/user';

export default {
  name: 'access-control',
  props: {
    roles: { type: Array, required: true },
    _class: { type: Array, default: () => [] },
  },
  data() {
    return {
      userRoleNum: -1,
    };
  },
  watch: {
    adminLevel: {
      immediate: true,
      handler() {
        this.userRoleNum = tokenService.getPrivilegeLevel();

        if (this.adminLevel !== this.userRoleNum) {
          this.setUser();
        }
      },
    },
  },
  computed: {
    ...mapState('user', {
      adminLevel: 'adminLevel',
    }),
    userRole() {
      return USER[this.userRoleNum];
    },
    hasRole() {
      return (this.roles.length === 0 || this.roles.includes(this.userRole));
    },
  },
  methods: {
    ...mapMutations('user', {
      setUser: 'setUser',
    }),
  },
};
</script>

<template>
  <div>
    <p class="title">Requests to Become Participating Families</p>
    <div class="requests-container">
      <div v-if="numberOfRequests === 0" class="no-requests-message">
        There are no outstanding requests to review!
      </div>
      <div v-else>
        <div v-bind:key="request.id" v-for="request in pfRequests" class="request-list">
          <request :request="request" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Request from '../components/FamilyRequests/Request.vue';

export default {
  name: 'FamilyRequests',
  components: {
    Request,
  },
  async created() {
    await this.setPfRequests();
  },
  computed: {
    ...mapState('requests', {
      pfRequests: 'pfRequests',
    }),
    numberOfRequests() {
      return this.pfRequests.length;
    },
  },
  methods: {
    ...mapActions('requests', {
      setPfRequests: 'setPfRequests',
    }),
  },
};
</script>

<style lang="less" scoped>
  @import '../../assets/color-constants.less';

  .title {
    text-align: left;
    font-size: 2.3rem;
  }

  .no-requests-message {
    text-align: left;
    font-size: 1.7rem;
    color: #C4C4C4;
  }

  .request-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
</style>

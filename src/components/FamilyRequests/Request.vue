<template>
  <div class="request-block">
    <div class="request-info">
      <div class="user-name">
        {{ request.user.firstName }} {{ request.user.lastName }}
      </div>
      <div class="user-email">
        {{ request.user.email }}
      </div>
      <div v-if="formattedPhoneString !== null" class="user-phone">
        {{ formattedPhoneString }}
      </div>
    </div>
    <div class="request-action-buttons">
      <button class="action-btn approve-btn" @click="approve">
        Approve
      </button>
      <button class="action-btn reject-btn" @click="reject">
        Reject
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Request',
  props: {
    request: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedPhoneString() {
      const cleaned = String(this.request.user.phoneNumber).replace(/\D/g, '');
      const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        const intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
      }
      return null;
    },
  },
  methods: {
    ...mapActions('requests', {
      approveRequest: 'approveRequest',
      rejectRequest: 'rejectRequest',
    }),
    approve() {
      this.approveRequest({ requestId: this.request.id });
    },
    reject() {
      this.rejectRequest({ requestId: this.request.id });
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';

  .request-block {
    display: grid;
    grid-template-columns: 5fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "content actions";

    width: 100%;
    border: 1px solid black;
    border-radius: 6px;
    padding: 6px 12px;
    margin: 12px 0;
  }

  .request-info {
    grid-area: content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
  }

  .user-name {
    font-size: 1.6rem;
    font-weight: bold;
  }
  .user-email {
    font-size: 1.3rem;
    padding-left: 12px;
  }
  .user-phone {
    font-size: 1.3rem;
    padding-left: 12px;
  }

  .request-action-buttons {
    grid-area: actions;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .action-btn {
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
  }
  .approve-btn {
    color: @button-color;
    background-color: @button-bg;
    border: 1px solid @button-bg;
  }
  .reject-btn {
    color: @tangerine;
    background-color: white;
    border: 1px solid @tangerine;
  }
</style>

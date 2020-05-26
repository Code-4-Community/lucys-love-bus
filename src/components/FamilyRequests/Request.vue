<template>
  <div class="request-block">
    <div class="request-info">
      <div class="user-name">
        {{ request.user.firstName }} {{ request.user.lastName }}
      </div>
      <div class="user-email">
        {{ request.user.email }}
      </div>
    </div>
    <div class="request-action-buttons">
      <div class="arrow" @click="viewRequest()">
        <svg viewBox="0 0 63 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M62.7071 8.70711C63.0976 8.31658 63.0976 7.68342 62.7071 7.29289L56.3431
          0.928932C55.9526 0.538408 55.3195 0.538408 54.9289 0.928932C54.5384 1.31946 54.5384
          1.95262 54.9289 2.34315L60.5858 8L54.9289 13.6569C54.5384 14.0474 54.5384 14.6805
          54.9289 15.0711C55.3195 15.4616 55.9526 15.4616 56.3431 15.0711L62.7071 8.70711ZM0
          9H62V7H0V9Z" />
        </svg>
      </div>
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
    viewRequest() {
      this.$emit('viewRequest', { id: this.request.id });
    },
  },
};
</script>

<style lang="less" scoped>
  @import '../../../assets/color-constants.less';
  @import '../../../assets/global-classes.less';

  .request-block {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;

    width: 100%;
    padding: 1rem 12px;
  }

  .request-info {
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding-left: 3rem;
  }

  .user-name {
    font-size: 1.6rem;
    font-weight: bold;
  }
  .user-email {
    font-size: 1.3rem;
    padding-left: 12px;
  }

  .request-action-buttons {
    width: 30%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .arrow {
    width: 40%;
    fill: black;
    cursor: pointer;
  }
  .arrow:hover {
    fill: #FBA34A;
  }
</style>

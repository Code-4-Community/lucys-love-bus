<template>
  <div>
    <div v-if="loaded">
      <div>
        {{ mainContact.firstName }}
        {{ mainContact.lastName }}
      </div>
      <div v-for="contact in additionalContacts" :key="contact.id">
        {{ contact.firstName }}
        {{ contact.lastName }}
      </div>
      <div v-for="child in children" :key="child.id">
        {{ child.firstName }}
        {{ child.lastName }}
      </div>
    </div>
    <div v-else>
      Loading
    </div>
  </div>
</template>

<script>
import api from '../api/api';

export default {
  name: 'SingleFamilyRequest',
  data() {
    return {
      mainContact: {
      },
      additionalContacts: [],
      children: [],
      loaded: false,
    };
  },
  computed: {
    request_id() {
      return this.$route.params.request_id;
    },
  },
  methods: {
    async loadRequestData() {
      const response = await api.getRequestData(this.request_id);
      return response.data;
    },
  },
  async created() {
    const data = await this.loadRequestData();
    this.mainContact = data.mainContact;
    this.additionalContacts = data.additionalContacts;
    this.children = data.children;
    this.loaded = true;
  },
};
</script>

<style scoped>

</style>

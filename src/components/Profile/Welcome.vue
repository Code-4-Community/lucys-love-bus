<template functional>
  <div class="welcome flex-horizontal">
    <img class="circle-img" src="http://www.vectorfreak.com/images/preview/circle-clip-art.jpg">
    <div class="flex-vertical">
      <span class="title">Welcome, {{ name }} family!</span>
      <span class="description">
        The Sajni Center invites you to use this page as your portal to view and
        register for events, and stay up to date with our community!
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    name: String,
  },
};
</script>

<style scoped>

.welcome {
  text-align: left;
}

.circle-img {
  width: 150px;
  height: 150px;
}

.title {
  font-family: 'Dekko';
  font-size: 26px;
  margin: 1rem;
}

.description {
  font-size: 14px;
  margin-left: 1.5rem;
}

</style>

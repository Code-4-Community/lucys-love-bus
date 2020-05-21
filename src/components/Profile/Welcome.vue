<template functional>
  <div class="welcome">
    <div>
      <img class="profile-img" src="https://www.jumpstarttech.com/files/2018/08/Network-Profile.png">
    </div>
    <div class="intro-text">
      <div class="title">
        Welcome, {{ name }} family!
      </div>
      <div class="description">
        The Sajni Center invites you to use this page as your portal to view and
        register for events, and stay up to date with our community!
      </div>
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
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: left;
  padding: 1rem;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.intro-text {
  margin-left: 20px;
}

.title {
  font-family: 'Dekko';
  font-size: 40px;
}

.description {
  font-size: 20px;
}

</style>

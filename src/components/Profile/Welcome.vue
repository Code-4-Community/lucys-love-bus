<template functional>
  <div class="welcome">
    <img :src="familyImg"/>
    <div>
      <span class="title">Welcome to the Lucy's Love Bus event site!</span>
      <p>Lorem ipsum...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    name: String,
  },
  data() {
    return {
      familyImg: 'https://www.kiplinger.com/kipimages/pages/18048.jpg',
    };
  },
};
</script>

<style scoped>
.welcome {
  display: grid;
  grid-template-columns: 20% auto;
}

.welcome img {
  width: 100%;
  border-radius: 50%;
}

.welcome div {
  text-align: left;
}

.welcome .title {
  font-size: 24px;
}
</style>

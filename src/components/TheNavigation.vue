<template>
  <div class="header">
    <div class="title">
      <router-link to="home" tag="h3">[LOGO]</router-link>
    </div>

    <div class="navlinks">
      <router-link to="/about-us" tag="button">About Us</router-link>
      <router-link to="/events" tag="button">Events</router-link>
      <router-link to="/authentication" tag="button">Log In</router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 8vh;
  background-color: var(--header-color);
  font-family: var(--main-font);
  .title {
    text-transform: uppercase;
    letter-spacing: 6px;
  }
  .navlinks {
    display: flex;
    justify-content: space-between;
    width: 25%;
    white-space: nowrap;
    button {
      display: block;
      width: 5em;
      height: 5em;
      letter-spacing: 4px;
      font-weight: bold;
      background: none;
      text-decoration: none;
      border: none;
      outline: none;
      font-family: var(--main-font);
    }
    button:hover {
      color: white;
    }
  }
}
</style>

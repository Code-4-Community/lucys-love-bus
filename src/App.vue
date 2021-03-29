<template>
  <div id="app">
    <div class="content-wrap-for-footer">
      <the-navigation />
      <div class="main-content center">
        <router-view />
      </div>
      <the-footer />
    </div>
  </div>
</template>

<script>
import Bowser from 'bowser';
import TheNavigation from './components/TheNavigation.vue';
import TheFooter from './components/TheFooter.vue';
import { refresh } from './auth/authAPI';
import tokenService from './auth/token';

const browser = Bowser.getParser(window.navigator.userAgent);

const isValidBrowser = browser.satisfies({
  // or in general
  chrome: '>86',
  firefox: '>80',
});

if (!isValidBrowser) {
  // eslint-disable-next-line
  alert("Hi there! We noticed that you're not running the most up to date version of Chrome or Firefox.\n\nIts extremely important to use an updated modern browser for this and many other websites to work properly. We strongly encourage you to update to avoid potential errors. Thank you!");
}

export default {
  name: 'App',
  components: {
    TheNavigation,
    TheFooter,
  },
  beforeCreate() {
    if (tokenService.isRefreshTokenVaid()) {
      refresh().catch(() => this.$router.push('/login'));
    }
  },
};
</script>

<style lang="less">
@import '../assets/color-constants.less';

:root {
  --main-font: "Quicksand", sans-serif;
  --header-color: @header-color;
  --body-color: @body-color;
  --notes-form-color: @notes-form-color;
}
html {
  overflow-y: scroll;
  body {
    margin: 0;
    padding: 0;
    font-family: Quicksand,serif;
  }
}

button {
  font-family: Quicksand,serif;
}
textarea {
  font-family: Quicksand,serif;
}
input {
  font-family: Quicksand,serif;
}

#app {
  font-family: var(--main-font);
  min-height: 100%;
  background-color: var(--body-color);
  display: flex;
  flex-direction: column;
}

.content-wrap-for-footer {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
}

.main-content {
  position: relative;
  padding: 2em;
  flex: 1 0 auto;
}
</style>

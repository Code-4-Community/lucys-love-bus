<template>
  <div id="app">
    <div class="content-wrap-for-footer">
      <the-navigation />
      <div class="main-content center">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TheNavigation from './components/TheNavigation.vue';
import authService from './utils/service/authService';

export default {
  name: 'App',
  components: {
    TheNavigation,
  },
  beforeCreate() {
    authService.actions.persistUser();
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
  min-height: 100vh;
  width: 100%;
}

.main-content {
  position: relative;
  margin: auto;
  padding: 2em;
}
</style>

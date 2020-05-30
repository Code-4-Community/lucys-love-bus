<template>
  <div class="sl-container">
    <div>
      <p class="header">Choose an account type & register your family!</p>
      <div class="sign-up-container">
        <router-link to="/sign-up-gp">
          <div class="btn-container">
            <div class="btn-image"></div>
            <h4>General Member</h4>
            <p>
              General Members may navigate the event calendar and purchase
              tickets once registration is open
            </p>
          </div>
        </router-link>
        <router-link to="/sign-up-pf">
          <div class="btn-container">
            <div class="btn-image"></div>
            <h4>Participating Family</h4>
            <p>
              Participating Families have early access to view events and
              are eligible to attend free of charge
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpLandingView',
};
</script>

<style scoped lang="less">

.sl-container {
  background-color: #C4C4C4;
  position: absolute;
  left: 0;
  right: 0;
}

.header {
  font-family: 'Dekko';
  text-align: center;
  font-size: 2.5rem;
}

.sign-up-container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.btn-container {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  width: 15rem;
  justify-content: center;
}

.btn-image {
  background-color: white;
  border-radius: 50%;
  width: 12rem;
  height: 12rem;
}
</style>

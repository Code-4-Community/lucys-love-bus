<template>
    <div class="center">
        <p class="title">401 Route Not Found</p>
        <div>
            It looks like this route leads nowhere...
            Head back to safety by clicking
            <router-link to="profile">here</router-link>.
        </div>
    </div>
</template>

<script>
export default {
  name: 'not-found',
};
</script>

<style scoped>
@import '../../assets/global-classes.less';

.title {
    font-size: 3rem;
}

</style>

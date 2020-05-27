<template>
    <div class="center">
        <p class="page-title">404 Route Not Found</p>
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

<style lang="less" scoped>
@import '../../assets/global-classes.less';

</style>

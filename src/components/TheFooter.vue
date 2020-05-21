<template>
  <footer class="footer">
    <div>
        <p>The Sajni Center</p>
    </div>
    <div class="links">
        <p>MOBILE APP</p>
        <p>FAQs</p>
        <p>SUPPORT</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: space-around;
  height: 6em;
  margin-top: 6em;

  .links {
    display: flex;
    text-transform: uppercase;
    justify-content: space-around;
    width: 50%;
  }
}
</style>

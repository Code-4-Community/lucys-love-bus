<template>
  <footer class="footer">
    <div class="content">
      <img class="image-container" src="../../public/img/icons/bug_icon.png"  alt="bug"/>
      Notice something off?
      <a class="link" href="https://forms.gle/y9dMTMugskHYPWyM6" target="_blank">Submit a Bug Report!</a>
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
  flex-shrink: 0;
  position: relative;
  background: rgba(151,244,86,0.83);
  padding: 5px;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    .image-container {
      width: 1em;
      height: 1em;
    }
    .link {
      margin-left: 5px;
    }
  }
}
</style>

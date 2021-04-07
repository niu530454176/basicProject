<template>
  <div class="http404-container">
    <img src="./image/404.jpg">
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said that you can not enter this page...'
    }
  }
}
</script>

<style lang="scss" scoped>
.http404-container{
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 84px);
  position: relative;
  img {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translate(-50%, 0);
  }
}
</style>

<template>
  <section class="app-main">
    <el-card :body-style="{ padding: '8px' }">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </el-card>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  padding: 8px;
  position: relative;
  overflow: hidden;
  font-size: 14px;
  color: #323232
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

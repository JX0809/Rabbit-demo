<template>
  <!-- 顶部通栏 -->
  <NavTop></NavTop>

  <br />
  <hr />
  <!-- 头部 -->
  <header>头部</header>
  <!-- 主体 -->
  <div class="main">
    <!-- 二级路由占位符 -->
    <router-view></router-view>
  </div>
  <!-- 底部 -->
  <footer>底部</footer>
</template>

<script>
import NavTop from '@/components/NavTop.vue'
export default {
  name: 'Layout',
  components: {
    NavTop
  }
}
</script>

<style lang="less" scoped></style>

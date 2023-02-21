<template>
  <!-- 顶部通栏 -->
  <nav>顶部通栏</nav>
  <!-- 头部 -->
  <header>头部</header>
  <!-- 主体 -->
  <div class="main">
    主体
    <!-- 二级路由占位符 -->
    <router-view></router-view>
  </div>
  <!-- 底部 -->
  <footer>底部</footer>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="less" scoped></style>

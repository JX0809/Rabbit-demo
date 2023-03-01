<template>
  <!-- 整个首页容器 -->
  <div class="home_container">
    <!-- 首页分类和轮播图  entry通栏-->
    <div class="home_entry">
      <!-- container 居中1240px -->
      <div class="container">
        <HomeCategory></HomeCategory>
        <HomeBanner></HomeBanner>
      </div>
    </div>

    <!-- 好物 -->
    <!-- 人气推荐 -->
  </div>
</template>

<script>
import HomeCategory from '@/components/HomePage/HomeCategory.vue'
import HomeBanner from '@/components/HomePage/HomBanner.vue'

export default {
  name: 'Home',
  components: {
    HomeCategory,
    HomeBanner
  }
}
</script>

<style lang="less" scoped>
.home_container {
  width: 100%;
  .home_entry {
    width: 100%;
    height: 500px;

    .container {
      width: 1240px;
      height: 100%px;
      margin: 0 auto;
      position: relative;
    }
  }
}
</style>

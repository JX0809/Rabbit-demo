<template>
  <div class="home_container">
    <!-- 首页分类和轮播图 -->
    <div class="home_entry">
      <HomeCategory></HomeCategory>
    </div>

    <!-- 好物 -->
    <!-- 人气推荐 -->
  </div>
</template>

<script>
import HomeCategory from '@/components/HomePage/HomeCategory.vue'
export default {
  name: 'Home',
  components: {
    HomeCategory
  }
}
</script>

<style lang="less" scoped>
.home_container {
  width: 100%;
  min-height: 600px;
  .home_container {
    width: 100%;
  }
}
</style>

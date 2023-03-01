<template>
  <!-- 整个首页容器 -->
  <div class="home_container">
    <!-- 首页分类和轮播图  entry通栏-->
    <div class="home_entry">
      <!-- container 居中1240px -->
      <div class="container">
        <!-- 组件直接1240px -->
        <HomeCategory></HomeCategory>
        <HomeBanner></HomeBanner>
      </div>
    </div>

    <!-- 新鲜好物 -->
    <div class="home_newGoods_container">
      <div class="container">
        <HomeNewGoods></HomeNewGoods>
      </div>
    </div>

    <!-- 人气推荐 -->
    <div class="home_recommend_container">
      <div class="container">
        <HomeRecommend></HomeRecommend>
      </div>
    </div>

    <!-- 热门品牌 -->
    <div class="home_brand_container">
      <div class="container">
        <HomeBrand></HomeBrand>
      </div>
    </div>
  </div>
</template>

<script>
import HomeCategory from '@/components/HomePage/HomeCategory.vue'
import HomeBanner from '@/components/HomePage/HomBanner.vue'
import HomeNewGoods from '@/components/HomePage/HomeNewGoods.vue'
import HomeRecommend from '@/components/HomePage/HomeRecommend.vue'
import HomeBrand from '@/components/HomePage/HomeBrand.vue'

export default {
  name: 'Home',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNewGoods,
    HomeRecommend,
    HomeBrand
  }
}
</script>

<style lang="less" scoped>
.home_container {
  width: 100%;

  .container {
    width: 1240px;
    margin: 0 auto;
  }
  .home_entry {
    width: 100%;
    height: 500px;

    .container {
      height: 100%;
      position: relative;
    }
  }
  .home_newGoods_container,
  .home_recommend_container {
    width: 100%;
    height: 541px;
    background-color: #fff;
    .container {
      height: 100%;
    }
  }
  .home_brand_container {
    width: 100%;
    height: 460px;
    background-color: #f5f5f5;
    .container {
      height: 100%;
    }
  }
}
</style>

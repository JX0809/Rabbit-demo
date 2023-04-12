<template>
  <div class="project_header_container">
    <!-- 一级分类UI结构 -->
    <div class="header">
      <h1 class="logo">
        <!-- 设置为背景图 -->
        <router-link to="/"></router-link>
      </h1>
      <ProjectHeaderNav></ProjectHeaderNav>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜一搜" />
      </div>

      <!-- 购物车 -->
      <HeaderCart></HeaderCart>
    </div>
  </div>
</template>

<script>
import ProjectHeaderNav from '@/components/ProjectHeader/ProjectHeaderNav.vue'
import HeaderCart from '../Cart/HeaderCart.vue'
import { ref } from 'vue'

export default {
  name: 'ProjectHeader',
  components: {
    ProjectHeaderNav,
    HeaderCart
  },
  setup() {
    const isVisible = ref(false)

    return { isVisible }
  }
}
</script>

<style lang="less" scoped>
.project_header_container {
  width: 100%;
  height: 132px;
  background-color: #ffffff;

  .header {
    width: 1240px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .logo {
      a {
        display: block;
        width: 200px;
        height: 132px;
        background: url(../../assets/images/logo.png) no-repeat center 18px /
          contain;
      }
    }
    .search {
      width: 170px;
      height: 32px;
      border-bottom: 1px solid #e7e7e7;

      input {
        width: 140px;
        padding-left: 5px;
      }
      i {
        font-size: 20px;
      }
    }
  }
}
</style>

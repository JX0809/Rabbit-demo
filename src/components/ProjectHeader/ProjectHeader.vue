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
      <div class="shop_cart">
        <a href="">
          <i class="iconfont icon-gouwuche"></i>
          <em>2</em>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectHeaderNav from '@/components/ProjectHeader/ProjectHeaderNav.vue'

export default {
  name: 'ProjectHeader',
  components: {
    ProjectHeaderNav
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
    .shop_cart {
      margin-left: 10px;
      a {
        position: relative;

        i {
          font-size: 18px;
        }

        em {
          position: absolute;
          top: -8px;
          right: -10px;
          width: 14px;
          height: 14px;
          font-size: 12px;
          color: #ffffff;
          font-style: normal;
          text-align: center;
          line-height: 14px;
          background-color: #e26237;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>

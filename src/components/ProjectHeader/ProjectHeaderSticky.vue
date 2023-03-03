<template>
  <div class="project_header_sticky" :class="{ show: y >= 78 }">
    <!-- 一级分类UI结构 -->
    <div class="header" v-show="y >= 78">
      <h1 class="logo">
        <router-link to="/"></router-link>
      </h1>
      <ProjectHeaderNav></ProjectHeaderNav>
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectHeaderNav from '@/components/ProjectHeader/ProjectHeaderNav.vue'
// import { onMounted, ref } from '@vue/runtime-core'
// 导入吸顶API
import { useWindowScroll } from '@vueuse/core'

export default {
  name: 'ProjectHeaderSticky',
  components: {
    ProjectHeaderNav
  },
  setup() {
    // 传统方式实现吸顶
    // const y = ref(0)
    // onMounted(() => {
    //   window.addEventListener('scroll', () => {
    //     const scrollTop = window.pageYOffset // 页面被卷去的头部距离
    //     console.log(scrollTop)
    //     y.value = scrollTop
    //     console.log(y)
    //   })
    // })
    // 组合API 实现吸顶
    const { y } = useWindowScroll()

    return { y }
  }
}
</script>

<style lang="less" scoped>
.project_header_sticky {
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  position: fixed;
  left: 0;
  top: 0;
  border-bottom: 1px solid #e4e4e4;
  z-index: 100;
  transform: translateY(-100%);
  opacity: 0;

  &.show {
    transition: all 0.3s, linear;
    transform: none;
    opacity: 1;
  }

  .header {
    width: 1240px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .logo {
      a {
        display: block;
        width: 200px;
        height: 80px;
        background: url(../../assets/images/logo.png) no-repeat right 2px;
        background-size: 160px auto;
      }
    }
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>

<template>
  <!-- 吸顶头部 -->
  <ProjectHeaderSticky></ProjectHeaderSticky>

  <!-- 顶部通栏 -->
  <NavTop></NavTop>

  <!-- 头部 -->
  <ProjectHeader></ProjectHeader>

  <!-- 主体 默认子路由 home首页-->
  <!-- 展示 首页， 一级分类， 二级分类，商品详情 -->
  <div class="project_body">
    <!-- 二级路由占位符 -->
    <router-view></router-view>
  </div>

  <!-- 底部 -->
  <ProjectFooter></ProjectFooter>
</template>

<script>
// 导入store
import { useStore } from 'vuex'

// 导入组件
import NavTop from '@/components/NavTop.vue'
import ProjectHeader from '@/components/ProjectHeader/ProjectHeader.vue'
import ProjectFooter from '@/components/ProjectFooter.vue'
import ProjectHeaderSticky from '@/components/ProjectHeader/ProjectHeaderSticky.vue'

export default {
  name: 'Layout',
  components: {
    NavTop,
    ProjectHeader,
    ProjectFooter,
    ProjectHeaderSticky
  },
  setup() {
    const store = useStore()
    store.dispatch('category/getCategoryList')
  }
}
</script>

<style lang="less" scoped></style>

<template>
  <!-- 吸顶头部 -->
  <ProjectHeaderSticky></ProjectHeaderSticky>

  <!-- 顶部通栏 -->
  <NavTop></NavTop>

  <!-- 头部 -->
  <ProjectHeader></ProjectHeader>

  <!-- 主体 -->
  <div class="main">
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
import ProjectHeader from '@/components/Header/ProjectHeader.vue'
import ProjectFooter from '@/components/ProjectFooter.vue'
import ProjectHeaderSticky from '@/components/Header/ProjectHeaderSticky.vue'

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

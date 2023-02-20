import { createRouter, createWebHashHistory } from 'vue-router'

const routes = []

// 创建 路由 实例
const router = createRouter({
  // createWebHistory 代表使用 hash模式的路由
  history: createWebHashHistory(),
  // 配置路由规则， 写法和 vue2 一样
  routes
})

export default router

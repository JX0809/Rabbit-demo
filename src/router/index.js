import { createRouter, createWebHashHistory } from 'vue-router'

// 导入组件
const Layout = () => import('@/views/Layout.vue')
// 二级路由
const Home = () => import('@/views/Home/Home.vue')
const MainCategory = () => import('@/views/Category/MainCategory.vue')
const SubCategory = () => import('@/views/Category/SubCategory.vue')
const Goods = () => import('@/views/Goods/Goods.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: MainCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods }

    ]
  }
]

// 创建 路由 实例
const router = createRouter({
  // createWebHistory 代表使用 hash模式的路由
  history: createWebHashHistory(),
  // 配置路由规则， 写法和 vue2 一样
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

export default router

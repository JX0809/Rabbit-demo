import store from '@/store/index'
import { createRouter, createWebHashHistory } from 'vue-router'
// import { h } from 'vue'

// 导入组件
const Layout = () => import('@/views/Layout.vue')
// 二级路由
const Home = () => import('@/views/Home/Home.vue')
const MainCategory = () => import('@/views/Category/MainCategory.vue')
const SubCategory = () => import('@/views/Category/SubCategory.vue')
const Goods = () => import('@/views/Goods/Goods.vue')
const Login = () => import('@/views/Login/Login.vue')
const LoginCallback = () => import('@/views/Login/LoginCallback.vue')
const Cart = () => import('@/views/Cart/Cart.vue')
const Checkout = () => import('@/views/Checkout/Checkout.vue')
const XtxPayPage = () => import('@/views/Checkout/xtx-pay-page.vue')
const XtxPayResult = () => import('@/views/Checkout/xtx-pay-result.vue')
const Member = () => import('@/views/Member/Member.vue')
const UserCenter = () => import('@/views/Member/MemberDetail/UserCenter.vue')
const Order = () => import('@/views/Member/MemberDetail/Order.vue')
const OrderDetail = () => import('@/views/Member/MemberDetail/OrderDetail.vue')
const Footprint = () => import('@/views/Member/MemberDetail/FootPrint.vue')
const AddressManage = () => import('@/views/Member/MemberDetail/AddressManage.vue')
const UserProfile = () => import('@/views/Member/MemberDetail/UserProfile.vue')
const Register = () => import('@/views/Login/Register.vue')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: MainCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: Checkout },
      { path: '/member/pay', component: XtxPayPage },
      { path: '/pay/callback', component: XtxPayResult },
      // 用户中心
      {
        path: '/member',
        component: Member,
        children: [
          { path: '/member', component: UserCenter },
          { path: '/member/order', component: Order },
          // vue3.0 需要有嵌套关系才能模糊匹配
          // {
          //   path: '/member/order',
          //   component: { render: () => h(<router-link></router-link>) },
          //   children: [
          //     { path: '', component: Order }
          //   ]
          // }
          { path: '/member/order/:id', component: OrderDetail, name: 'orderDetail' },
          { path: '/member/footprint', component: Footprint },
          { path: '/member/address', component: AddressManage },
          { path: '/member/profile', component: UserProfile }
        ]
      },
      { path: '/register', component: Register }

    ]
  },
  { path: '/login', component: Login },
  { path: '/login/callback', component: LoginCallback }
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

router.beforeEach((to, from, next) => {
  // if (to.path === '/member/checkout') {
  if (to.path.startsWith('/member')) {
    const token = store.state.user.profile.token
    if (token) {
      next()
    } else {
      // console.log(to.fullPath) // '/member/checkout'
      next(`/login?pre=${to.fullPath}`) // /login?pre=/member/checkout
    }
  } else {
    next()
  }
}
)

// 路由全局前置守卫
export default router

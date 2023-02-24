import { createStore } from 'vuex'
// 导入数据持久化插件
import createPersistedstate from 'vuex-persistedstate'
// 导入模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

export default createStore({
  // 模块化
  modules: {
    user,
    cart,
    category
  },
  plugins: [
    createPersistedstate({ // 默认存储到 localStorage
      key: 'rabbit-eshopping-store',
      paths: ['user', 'cart'] // path 是存储在 state的数据
    })
  ]
})

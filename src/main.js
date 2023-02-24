import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入初始化样式
import 'normalize.css'
import '@/assets/styles/common.less'

// 全局前置路由守卫beforeEach

createApp(App).use(store).use(router).mount('#app')

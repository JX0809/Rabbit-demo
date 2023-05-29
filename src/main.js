import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入初始化样式
import 'normalize.css'
import '@/assets/styles/common.less'

// 导入全局插件
import plugin from '@/components/library/plugin.js'

createApp(App).use(store).use(router).use(plugin).mount('#app')

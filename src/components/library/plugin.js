// 导入文件
import XtxSkeleton from './xtx-skeleton.vue'

export default {
  install(App) {
    // 注册为全局组件 App.component（vue2 Vue.component）
    App.component('XtxSkeleton', XtxSkeleton)
  }
}

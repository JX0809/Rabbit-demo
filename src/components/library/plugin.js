// 导入文件
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'

export default {
  install(App) {
    // 注册为全局组件 App.component（vue2 Vue.component）
    App.component('XtxSkeleton', XtxSkeleton) // 骨架屏
    App.component('XtxCarousel', XtxCarousel) // 轮播图
  }
}

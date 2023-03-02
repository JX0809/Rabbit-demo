/**
 * 自定义插件
 */

// 导入文件
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'

export default {
  install(App) {
    // 注册为全局组件 App.component（vue2 Vue.component）
    App.component('XtxSkeleton', XtxSkeleton) // 骨架屏
    App.component('XtxCarousel', XtxCarousel) // 轮播图
    App.component('XtxMore', XtxMore)
    defineDirective(App)
  }
}

// 图片懒加载
const defineDirective = (App) => {
  App.directive('lazyload', {
    mounted(el, binding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0.001
      })
      observer.observe(el)
    }
  })
}

/**
 * 自定义插件
 */

// 导入文件
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// 导入默认 图片
import defaultImg from '@/assets/images/200.png'
// import messageBox from '@/components/library/xtx-message.vue'

// 自动批量导入注册全局组件
// require.context()加载 library 目录下的所有.vue文件
const importFn = require.context('./', false, /\.vue$/)

export default {
  install(App) {
    // 注册为全局组件 App.component（vue2 Vue.component）
    // App.component('XtxSkeleton', XtxSkeleton) // 骨架屏
    // App.component('XtxCarousel', XtxCarousel) // 轮播图
    // App.component('XtxMore', XtxMore)
    // 批量注册全局组件 keys属性 获取所有文件的路径
    importFn.keys().forEach(key => {
      const component = importFn(key).default
      // component.name 就是 script 标签里的 name 选项
      App.component(component.name, component) // 自定义组件名, 被注册的组件
    })

    // 自定义指令
    defineDirective(App)

    // 把消息提醒函数 挂载到 vue原型上
    // App.config.globalProperties.$message = messageBox
  }
}

// 图片懒加载
const defineDirective = (App) => {
  App.directive('lazyLoad', {
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

/**
 * 自定义插件
 */

// 导入文件
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'

// 消息提示组件挂在原型
// import messageBox from '@/components/library/xtx-message.vue'

// 导入默认 图片
import defaultImg from '@/assets/images/200.png'

// 自动批量导入注册全局组件
// require.context()加载 library 目录下的所有.vue文件
const importFn = require.context('./', false, /\.vue$/) // 是一个函数
// console.dir(importFn) // 保存了加载的 所有文件

export default {
  install(App) {
    // 普通 注册为全局组件 App.component
    // App.component('XtxSkeleton', XtxSkeleton) // 骨架屏
    // App.component(自定义组件名, 被注册的组件（同导入的名称）) // 自定义组件名, 被注册的组件（同导入的名称）

    // 批量自动 注册全局组件
    // console.log(importFn.keys()) // keys 是函数， 调用返回一个 匹配文件的 文件路径数组 [0: "./xtx-bread.vue", ...]
    importFn.keys().forEach(key => {
      // console.log(importFn(key)) // 里有一个 default 属性
      const component = importFn(key).default // 根据路径导入组件对象
      // component.name 就是 script 标签里的 name 选项
      App.component(component.name, component) // 自定义组件名, 被注册的组件
    })

    // 调用自定义指令 函数
    defineDirective(App)

    // 把消息提醒函数 挂载到 vue原型上
    // App.config.globalProperties.$message = messageBox
  }
}

// 图片懒加载 函数
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
      observer.observe(el) // 观察绑定 的元素
    }
  })
}

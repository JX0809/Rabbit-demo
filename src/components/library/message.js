// 导入消息提示组件
import XtxMessage from '@/components/library/xtx-message.vue'
import { createVNode, render } from 'vue'

// 装虚拟节点的容器
// 创建元素
const div = document.createElement('div')
div.setAttribute('class', 'xtx_message_box')

// 添加元素： 添加在 body标签 子元素的最后面
document.body.appendChild(div)

let timer = null

export default ({ type, text }) => {
  // 把组件编译成虚拟节点createVNode(组件， props 属性)
  const vnode = createVNode(XtxMessage, { type, text })
  // 把虚拟节点 渲染到 DOM 容器
  render(vnode, div)
  // 开启定时器前先清除定时器
  clearTimeout(timer)
  // 3s 后移除 DOM 容器内容
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}

/**
 * 使用
 * 1. 导入使用：vue3
 * 2. 挂载到 原型上， 通过 $confirm 使用： vue2
 */

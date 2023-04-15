import XtxConfirm from '@/components/library/xtx-confirm'
import { createVNode, render } from 'vue'

// 创建,添加 DOM 容器, 添加属性
const div = document.createElement('div')
div.setAttribute('class', 'xtx_confirm_box')
document.body.appendChild(div)

export default ({ title, text }) => {
  return new Promise((resolve, reject) => {
    // 点击确认的回调: 关闭对话框
    const submitCallback = () => {
      render(null, div)
      resolve()
    }
    // 点击取消的回调: 关闭对话框
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    // 创建虚拟节点：createVNode(组件， props 属性)
    const vnode = createVNode(XtxConfirm, { title, text, submitCallback, cancelCallback }) // (组件名, 传输的props属性)
    // 渲染虚拟节点到 DOM 容器
    render(vnode, div)
  })
}

/**
 * 使用
 * 1. 导入使用：vue3
 * 2. 挂载到 原型上， 通过 $confirm 使用： vue2
 */

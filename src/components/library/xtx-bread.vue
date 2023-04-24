<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  // 通过 render函数 把 h函数指定的元素 渲染为  html 结构
  render() {
    // render(){} 在 vue2 是 一个 选项式API
    // 获取默认插槽内容 x-bread-item
    // 不是在 vue3 组件 setup()里， 可以使用 vue2 的 this
    const items = this.$slots.default() // items 就是 xtx-bread-item
    // 生成动态结构
    const dynamicItems = []
    items.forEach((item, i) => {
      dynamicItems.push(item)
      if (i < items.length - 1) {
        dynamicItems.push(h('i', { class: 'iconfont icon-arrow-right' }))
      }
    })
    return h('div', { class: 'xtx_bread' }, dynamicItems) // bread组件根容器，类名，子节点
  }
}
</script>

<style lang="less" scoped>
.xtx_bread {
  display: flex;
  width: 100%;
  height: 72px;
  padding: 25px 10px;

  &_item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式，不合理
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>

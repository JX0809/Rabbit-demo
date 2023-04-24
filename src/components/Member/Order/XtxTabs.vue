<script>
// import { ref } from 'vue'
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
export default {
  name: 'XtxTabs',
  props: {
    modelValue: {
      type: String,
      default: 'all'
    }
  },
  setup(props, { emit }) {
    const activeName = useVModel(props, 'modelValue', emit)
    const clickTabs = (item, index) => {
      activeName.value = item
      // 触发自定义事件
      emit('changeTab', { item, index })
    }
    provide('activeName', activeName)

    return { activeName, clickTabs }
  },

  render() {
    // 获取默认插槽内容： 得到选项的面板组件数量 7
    const panels = this.$slots.default()
    // v-for生成的子组件， 信息存放在 children
    const dynamicPanels = []
    panels.forEach((item) => {
      if (item.type.name === 'XtxTabsPanel') {
        // 不是循环生成的
        dynamicPanels.push(item)
      } else {
        item.children.forEach((com) => {
          dynamicPanels.push(com)
        })
      }
    })

    // 根据面板组件数量生成选项
    // 动态生成头部的选项导航栏: 包含选项标签：
    const nav = (
      // arr.map() 一一映射，与原数组的长度，位置一样
      <nav>
        {dynamicPanels.map((item, i) => {
          return (
            <a
              href="javascript:;"
              onClick={() => this.clickTabs(item.props.name, i)}
              class={{ active: item.props.name === this.activeName }}
            >
              {item.props.label}
            </a>
          )
        })}
      </nav>
    )

    return <div class="xtx_tabs">{[nav, panels]}</div> // tab组件的 的根容器，class类名， 子节点(子标签)
  }
}
</script>

<style lang="less" scoped>
.xtx_tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>

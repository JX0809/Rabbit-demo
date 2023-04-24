<template>
  <div class="xtx_tabs_panel" v-show="activeName === name">
    <!-- 面板内容插槽 -->
    <slot></slot>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'XtxTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      // 选项的唯一标识
      type: [String, Number],
      default: ''
    }
  },
  setup() {
    const activeName = inject('activeName')

    return { activeName }
  }
}
</script>

<style lang="less" scoped>
.xtx_tabs_panel {
  padding: 20px;
}
</style>

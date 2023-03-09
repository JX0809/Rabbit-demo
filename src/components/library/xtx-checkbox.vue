<template>
  <div class="xtx-checkbox" @click="changeChecked">
    <i v-if="checked" class="iconfont icon-checkbox-checked icon-checked"></i>
    <i v-else class="iconfont icon-checkbox-unchecked"></i>
    <!-- 获取默认插槽: $slots.default -->
    <span v-if="$slots.default"> <slot></slot> </span>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'

export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    // const checked = ref(false)
    // const changeChecked = () => {
    //   checked.value = !checked.value
    // }

    // 使用 useVModel 实现双向数据绑定： 是一个响应式数据
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      // 通知父组件： 给useVModel 定义的 数据 重新赋值时， 会自动通知父组件实现双向数据绑定
      checked.value = newVal
      // 让组件支持 change 自定义事件
      emit('checkboxChange', newVal)
    }

    return {
      checked,
      changeChecked
    }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>

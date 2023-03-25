<template>
  <div class="xtx_number_box">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="numbox">
      <a href="javascript:;" @click="changeNum(-1)">-</a>
      <input type="text" readonly :value="countValue" @click="show = true" />
      <a href="javascript:;" @click="changeNum(1)">+</a>
    </div>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxNumberBox',
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    },
    label: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 和父组件实现双向数据绑定
    const countValue = useVModel(props, 'modelValue', emit)
    const changeNum = (num) => {
      const newVal = countValue.value + num
      if (newVal < props.min) return
      if (newVal > props.max) return
      countValue.value = newVal

      emit('change', newVal)
    }
    return {
      changeNum,
      countValue
    }
  }
}
</script>

<style lang="less" scoped>
.xtx_number_box {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>

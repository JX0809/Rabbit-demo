<template>
  <!-- 遮罩层 -->
  <div class="xtx_dialog" :class="{ fade: show }" v-show="visible">
    <!-- 对话框 -->
    <div class="wrapper" :class="{ fade: show }">
      <div class="dialog_title">
        <h3>{{ title }}</h3>
        <!-- 关闭按钮 X -->
        <i class="iconfont icon-close" @click="closeDialog"></i>
      </div>

      <div class="dialog_body">
        <slot></slot>
      </div>

      <div class="dialog_footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxDialog',
  props: {
    title: {
      type: String,
      default: '添加收货地址'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const show = ref(false)
    watch(
      () => props.visible,
      () => {
        setTimeout(() => {
          show.value = props.visible
        }, 0)
      },
      {
        immediate: true
      }
    )
    const closeDialog = () => {
      show.value = false
      emit('update:visible', false)
    }

    return { show, closeDialog }
  }
}
</script>

<style lang="less" scoped>
.xtx_dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 400;
  &.fade {
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.4s;
  }

  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    opacity: 1;
    background-color: #fff;
    z-index: 400;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    .dialog_title {
      width: 100%;
      height: 70px;
      padding: 0 20px;
      line-height: 70px;
      display: flex;
      justify-content: space-between;
      color: #333;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: 400;
        font-size: 18px;
      }
      .iconfont {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .dialog_body {
      width: 100%;
      padding: 20px 40px;
    }

    .dialog_footer {
      width: 100%;
      height: 90px;
      padding: 10px 0 30px 0;
      text-align: center;
      display: flex;
      justify-content: center;
    }
  }
}
</style>

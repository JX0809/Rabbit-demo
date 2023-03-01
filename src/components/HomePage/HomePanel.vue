<template>
  <div class="home_panel_container">
    <div class="head">
      <h3>
        {{ title }}
        <small>{{ subTitle }}</small>
      </h3>
      <!-- 具名插槽 占位 查看更多组件 -->
      <slot name="more"></slot>
    </div>

    <div class="body">
      <!-- 默认插槽展示 主体内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePanel',
  props: {
    title: {
      type: String,
      default: null
    },
    subTitle: {
      type: String,
      default: null
    }
  },
  setup() {}
}
</script>

<style lang="less" scoped>
.home_panel_container {
  width: 100%;
  height: 100%;
  .head {
    display: flex;
    width: 100%;
    height: 115px;
    padding: 40px 0;
    line-height: 35px;

    > h3 {
      flex: 1;
      margin-left: 6px;
      color: #333;
      font-weight: 400;
      font-size: 32px;

      > small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
  .body {
    width: 100%;
  }
}
</style>

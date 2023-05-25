<template>
  <div class="user_panel_container">
    <div class="panel_header">
      <h4>{{ title }}</h4>
      <!-- 具名插槽 占位 查看更多组件 -->
      <slot name="more"></slot>
    </div>

    <div class="panel_body">
      <!-- 主体内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPanel',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.user_panel_container {
  width: 100%;
  padding: 0 20px;
  margin-top: 20px;
  background-color: #fff;
  .panel_header {
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    h4 {
      font-size: 22px;
      color: #333;
      font-weight: 400;
    }
  }
  .panel_body {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 0;
  }
}
</style>

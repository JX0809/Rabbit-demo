<template>
  <div class="subcategory_bread_container">
    <!-- bread 和 breaditem 的父组件都是 catebread。 父组件把 item 以插槽的形式填充到 bread -->
    <XtxBread>
      <XtxBreadItem to="/">首页</XtxBreadItem>
      <XtxBreadItem> xx</XtxBreadItem>
      <XtxBreadItem>信息</XtxBreadItem>
    </XtxBread>
  </div>
</template>

<script>
export default {
  name: 'SubCategoryBread',
  setup() {}
}
</script>

<style lang="less" scoped>
.category_bread_container {
  width: 1240px;
}
</style>

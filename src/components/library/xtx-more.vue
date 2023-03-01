<template>
  <div class="xtx_more_container">
    <router-link to="/">
      <span>
        {{ title }}
        <i class="iconfont icon-arrow-right"></i>
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'XtxMore',
  props: {
    title: {
      type: String,
      default: '查看全部'
    }
  },
  setup() {}
}
</script>

<style lang="less" scoped>
.xtx_more_container {
  height: 100%;
  span {
    font-size: 16px;
    color: #999;
    margin-right: 4px;
  }
}
</style>

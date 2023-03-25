<template>
  <div class="goods_tab_container">
    <div class="tab_header">
      <a
        href="javascript:;"
        @click="changeComponent('GoodsDetails')"
        :class="{ active: comName === 'GoodsDetails' }"
        >商品详情</a
      >
      <a
        href="javascript:;"
        @click="changeComponent('GoodsComment')"
        :class="{ active: comName === 'GoodsComment' }"
        >商品评价 <span>(100+)</span></a
      >
    </div>

    <div class="tab_body">
      <component :is="comName"></component>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import GoodsDetails from './GoodsDetails.vue'
import GoodsComment from './GoodsComment.vue'
export default {
  name: 'GoodsTab',
  components: {
    GoodsDetails,
    GoodsComment
  },
  setup() {
    const comName = ref('GoodsDetails')
    const changeComponent = (name) => {
      comName.value = name
    }

    return {
      comName,
      changeComponent
    }
  }
}
</script>

<style lang="less" scoped>
.goods_tab_container {
  width: 100%;
  min-height: 400px;
  background-color: #fff;
  .tab_header {
    width: 100%;
    height: 70px;
    padding: 0 40px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      height: 70px;
      width: 1px;
      background: #f5f5f5;
      top: 0;
      left: 152px;
    }
    a {
      font-size: 18px;
      color: #333;
      margin-right: 80px;
      position: relative;

      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>

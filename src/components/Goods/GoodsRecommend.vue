<template>
  <div class="goods_recommend_container">
    <div class="header">
      <i class="icon"></i>
      <span class="title">
        {{ goodsInfoId ? '同类商品推荐' : '猜你喜欢' }}</span
      >
    </div>
    <div class="recommend_carousel">
      <XtxCarousel :sliders="sliders" autoPlay></XtxCarousel>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getGoodsRecommendAPI } from '@/api/GoodsInfoAPI/getGoodsInfoAPI'

export default {
  name: 'GoodsRecommend',
  props: {
    goodsInfoId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    // 获取商品同类推荐-未传入ID为猜你喜欢
    const sliders = ref([])
    // 获取 同类推荐数据
    getGoodsRecommendAPI(props.goodsInfoId).then(({ data }) => {
      // 共 16条数据， 每个li 里 4条。 轮播图先循环4个里， 再循环每个li 里的 4条商品数据
      // [li:[1：{}, 2, 3, 4],li... ]
      const size = 4
      const total = Math.ceil(data.result.length / size)
      for (let i = 0; i < total; i++) {
        // arr.slice(开始的位置， 结束的位置) ： 不包括结束
        sliders.value.push(data.result.slice(i * size, (i + 1) * size))
      }
    })

    return {
      sliders
    }
  }
}
</script>

<style lang="less" scoped>
.goods_recommend_container {
  width: 100%;
  height: 100%;
  padding: 0 28px 30px 28px;
  background-color: #fff;

  .header {
    height: 80px;
    padding: 0 20px;
    line-height: 80px;
    font-size: 20px;
    .title {
      padding-left: 5px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
  .recommend_carousel {
    width: 100%;
    height: 380px;
  }
}
</style>

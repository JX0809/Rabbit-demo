<template>
  <div class="goods_container">
    <div class="container" v-if="goodsInfo">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goodsInfo.categories[1].id}`">{{
          goodsInfo.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goodsInfo.categories[0].id}`">{{
          goodsInfo.categories[0].name
        }}</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem> {{ goodsInfo.name }} </XtxBreadItem>
        </transition>
      </XtxBread>

      <!-- 商品图片信息和 规格 -->
      <div class="goods_info">
        <!-- 商品图片 -->
        <div class="goods_media">
          <!-- 商品图片 -->
          <GoodsInfoImg :goodsImg="goodsInfo.mainPictures"></GoodsInfoImg>
          <!-- 商品反馈：评价收藏 -->
          <GoodsInfoFeedback></GoodsInfoFeedback>
        </div>
        <!-- 商品规格 -->
        <div class="goods_spec">
          <GoodsSpec></GoodsSpec>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsInfoAPI } from '@/api/GoodsInfoAPI/getGoodsInfoAPI'
import { useRoute } from 'vue-router'
import { nextTick, ref, watch } from 'vue'

import GoodsInfoImg from '@/components/Goods/GoodsInfoImg.vue'
import GoodsInfoFeedback from '@/components/Goods/GoodsInfoFeedback.vue'
import GoodsSpec from '@/components/Goods/GoodsSpec.vue'

export default {
  name: 'Goods',
  components: {
    GoodsInfoImg,
    GoodsInfoFeedback,
    GoodsSpec
  },
  setup() {
    const goodsInfo = useGoods()

    return {
      goodsInfo
    }
  }
}

const useGoods = () => {
  const route = useRoute()
  const goods = ref(null)
  // 监听地址变化， 重新调用请求函数
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && route.path === `/product/${newVal}`) {
        getGoodsInfoAPI(route.params.id).then(({ data }) => {
          // 商品数据为空， 让后使用 v-if 的组件可以重新销毁和创建
          goods.value = null
          nextTick(() => {
            goods.value = data.result
          })
          console.log(data)
        })
      }
    },
    {
      immediate: true
    }
  )
  return goods
}
</script>

<style lang="less" scoped>
.goods_container {
  width: 100%;

  .container {
    width: 1240px;
    margin: 0 auto;

    .goods_info {
      width: 100%;
      height: 600px;
      display: flex;
      background-color: #fff;

      .goods_media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
      }

      .goods_spec {
        // width: 660px;
        // height: 600px;
        flex: 1;
        padding: 30px 30px 30px 0;
      }
    }
  }
}
</style>

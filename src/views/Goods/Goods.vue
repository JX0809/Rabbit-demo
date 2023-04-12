<template>
  <div class="goods_container">
    <div class="container" v-if="goodsInfo">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goodsInfo.categories[1].id}`">
          {{ goodsInfo.categories[1].name }}
        </XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goodsInfo.categories[0].id}`">
          {{ goodsInfo.categories[0].name }}
        </XtxBreadItem>
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
          <!-- 商品信息 -->
          <GoodsSpec :goodsSpec="goodsInfo"></GoodsSpec>
          <!-- 商品sku -->
          <!-- 默认选中一个规格: 传入skuid -->
          <GoodsSku :goodsInfo="goodsInfo" @changeSpecs="change"> </GoodsSku>

          <!-- 商品数量按钮 -->
          <XtxNumberBox
            v-model="countNum"
            :max="goodsInfo.inventory"
            label="数量"
          >
          </XtxNumberBox>

          <!-- 加入购物车 -->
          <XtxButton size="middle" type="primary" @click="addToCart">
            加入购物车
          </XtxButton>
        </div>
      </div>

      <!-- 同类商品推荐 -->
      <div class="goods_recommend" v-if="goodsInfo">
        <GoodsRecommend :goodsInfoId="goodsInfo.id"></GoodsRecommend>
      </div>

      <!-- 详情和 热榜 -->
      <div class="goods_details">
        <div class="goods_main">
          <!-- 商品详情和 商品评价 -->
          <GoodsTab> </GoodsTab>
          <!-- 注意事项 -->
          <GoodsNotice></GoodsNotice>
        </div>

        <!-- 24小时热榜和 周热榜 -->
        <div class="goods_aside">
          <!-- 数据类型：要求数字型： 数字转字符串+； 字符串转数字 - -->
          <GoodsHot :type="1 - 0" :goodsInfo="goodsInfo"></GoodsHot>
          <GoodsHot :type="2 - 0" :goodsInfo="goodsInfo"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsInfoAPI } from '@/api/GoodsInfoAPI/getGoodsInfoAPI'
import { useRoute } from 'vue-router'
import { nextTick, ref, watch, provide } from 'vue'

import GoodsInfoImg from '@/components/Goods/GoodsInfoImg.vue'
import GoodsInfoFeedback from '@/components/Goods/GoodsInfoFeedback.vue'
import GoodsSpec from '@/components/Goods/GoodsSpec.vue'
import GoodsSku from '@/components/Goods/GoodsSku.vue'
import GoodsRecommend from '@/components/Goods/GoodsRecommend.vue'
import GoodsTab from '@/components/Goods/GoodsTab.vue'
import GoodsHot from '@/components/Goods/GoodsHot.vue'
import GoodsNotice from '@/components/Goods/GoodsNotice.vue'

import messageBox from '@/components/library/message'
import { useStore } from 'vuex'

export default {
  name: 'Goods',
  components: {
    GoodsInfoImg,
    GoodsInfoFeedback,
    GoodsSpec,
    GoodsSku,
    GoodsRecommend,
    GoodsTab,
    GoodsHot,
    GoodsNotice
  },
  setup() {
    const goodsInfo = useGoods()
    // 传递数据给 details 组件
    provide('goodsInfo', goodsInfo)

    // 自定义事件处理函数： 用户选择的sku 的信息： 不同sku 组合， 价格，库存不一样
    const change = (spec) => {
      // 如果选择了 完整的 sku， 就有数据
      if (spec.skuId) {
        // 重新赋值最新的价格库存
        goodsInfo.value.price = spec.price
        goodsInfo.value.oldPrice = spec.oldPrice
        goodsInfo.value.inventory = spec.inventory

        currSku.value = spec
      } else {
        // 没有选择完整的sku信息， 等于 null
        // currSku.value = {} // 商品只选中其中一个规则, 也会提示加入购物车成功
        currSku.value = null // 提示选择商品规格
      }
    }

    const currSku = ref(null)
    // 数量按钮组价默认值
    const countNum = ref(1)
    // 存储选中的SKU 的所有信息

    const store = useStore()
    // 加入购物车功能
    const addToCart = () => {
      if (currSku.value === null) {
        return messageBox({ type: 'warn', text: '请选择商品规格' })
      }
      if (countNum.value > goodsInfo.value.inventory) {
        return messageBox({ type: 'warn', text: '库存不足' })
      }
      // 调用vuex actions， 往 state 添加商品数据
      store
        .dispatch('cart/addToShoppingCart', {
          id: goodsInfo.value.id,
          skuId: currSku.value.skuId,
          name: goodsInfo.value.name,
          picture: goodsInfo.value.mainPictures[0],
          price: currSku.value.oldPrice,
          nowPrice: currSku.value.price,
          count: countNum.value,
          attrsText: currSku.value.specsText,
          selected: true,
          isEffective: true,
          stock: currSku.value.inventory
        })
        .then(() => {
          messageBox({ type: 'success', text: '加入购物车成功' })
        })
    }

    return {
      goodsInfo,
      change,
      countNum,
      addToCart
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
    .goods_recommend {
      width: 100%;
      height: 460px;
      margin-top: 20px;
    }
    .goods_details {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .goods_main {
        width: 942px;
      }
      .goods_aside {
        width: 278px;
      }
    }
  }
}
</style>

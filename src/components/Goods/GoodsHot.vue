<template>
  <div class="goods_hot_container">
    <div class="hot_title">
      {{ title }}
    </div>
    <div class="hot_item" v-if="goods">
      <RouterLink
        :to="`/product/${item.id}`"
        class="goods-item"
        v-for="item in goods"
        :key="item.id"
      >
        <img :src="item.picture" />
        <p class="name ellipsis">{{ item.name }}</p>
        <p class="desc ellipsis">{{ item.desc }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { getHotGoodsList } from '@/api/GoodsInfoAPI/getGoodsInfoAPI.js'
export default {
  name: 'GoodsHot',
  props: {
    goodsInfo: {
      type: Object,
      default: () => {}
    },
    type: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    // 处理标题
    const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(() => {
      return titleObj[props.type]
    })

    const goods = ref(null)
    getHotGoodsList(props.goodsInfo.id, props.type).then(({ data }) => {
      goods.value = data.result
    })

    return {
      title,
      goods
    }
  }
}
</script>

<style lang="less" scoped>
.goods_hot_container {
  width: 100%;
  min-height: 400px;
  .hot_title {
    width: 100%;
    height: 70px;
    margin-bottom: 25px;
    background-color: @helpColor;
    color: #fff;
    font-size: 18px;
    padding-left: 25px;
    line-height: 70px;
  }
  .hot_item {
    margin-bottom: 20px;
    > a {
      background-color: #fff;
      margin-bottom: 15px;
    }
    .goods-item {
      display: block;
      width: 100%;
      padding: 20px 30px;
      text-align: center;
      .hoverShadow();
      img {
        width: 160px;
        height: 160px;
      }
      p {
        padding-top: 10px;
      }
      .name {
        font-size: 16px;
      }
      .desc {
        color: #999;
        height: 29px;
      }
      .price {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
</style>

<template>
  <RouterLink to="/" class="goods-item">
    <img :src="itemGoods.picture" />
    <p class="name ellipsis">{{ itemGoods.name }}</p>
    <p class="desc ellipsis">{{ itemGoods.desc }}</p>
    <p class="price">&yen;{{ itemGoods.price }}</p>
  </RouterLink>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    itemGoods: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
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
</style>

<template>
  <!-- 购物车为空时显示 -->
  <div class="null_cart">
    <div class="img">
      <img src="../../assets/images//none.png" alt="" />
      <p>购物车内暂时没有商品</p>
    </div>
    <xtx-button type="primary" @click="$router.push('/')">继续逛逛</xtx-button>
  </div>
</template>

<script>
export default {
  name: 'CartNull',
  setup() {}
}
</script>

<style lang="less" scoped>
.null_cart {
  width: 100%;
  background-color: #fff;
  padding: 150px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .img {
    display: flex;
    flex-direction: column;
    img {
      width: 180px;
      height: 120px;
    }
    p {
      font-size: 14px;
      color: #999999;
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>

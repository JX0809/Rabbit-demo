<template>
  <div class="home_product_goods_container">
    <ul class="goods_list">
      <li v-for="goods in productList" :key="goods.id">
        <div class="goods_item">
          <router-link :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt="" />
          </router-link>
          <p class="goods_name ellipsis-2">{{ goods.name }}</p>
          <p class="goods_desc ellipsis">{{ goods.desc }}</p>
          <p class="goods_price">￥{{ goods.price }}</p>

          <div class="goods_similar">
            <router-link to="/">
              <span>找相似</span>
              <span>发现更多宝贝> </span>
            </router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeProductsGoods',
  props: {
    productList: {
      type: Array,
      default: () => []
    }
  },
  setup() {}
}
</script>

<style lang="less" scoped>
.home_product_goods_container {
  width: 990px;
  height: 610px;
  > .goods_list {
    width: 1000px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;

    > li {
      .goods_item {
        width: 240px;
        height: 300px;
        padding: 10px 30px;
        position: relative;
        margin-right: 10px;
        transition: all 0.5s;

        &:hover {
          border: 1px solid @xtxColor;

          .goods_similar {
            opacity: 1;
          }
        }

        img {
          display: block;
          width: 160px;
          height: 160px;
          margin: 0 10px;
        }
        .goods_name {
          margin-top: 6px;
          height: 44px;
          color: #333;
        }
        .goods_desc {
          margin-top: 6px;
          color: #666;
        }
        .goods_price {
          margin-top: 10px;
          color: @priceColor;
          font-size: 20px;
        }

        .goods_similar {
          position: absolute;
          left: 0;
          bottom: 86px;
          height: 86px;
          width: 100%;
          background: @xtxColor;
          text-align: center;
          transform: translate3d(0, 100%, 0);
          transition: opacity 0.5s linear;
          opacity: 0;
          a {
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            span {
              display: block;
              width: 120px;
              margin: 0 auto;
            }
            span:first-child {
              font-size: 18px;
              border-bottom: 1px solid #fff;
              line-height: 40px;
              margin-top: 5px;
            }
            span:last-child {
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>

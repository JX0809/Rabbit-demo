<template>
  <div class="shop_cart">
    <router-link to="/cart">
      <i class="iconfont icon-gouwuche"></i>
      <em> {{ $store.getters['cart/validGoodsTotal'] }}</em>
    </router-link>
    <div
      class="layer"
      v-if="$store.getters['cart/validGoodsTotal'] && $route.path !== '/cart'"
    >
      <div class="list">
        <div
          class="item"
          v-for="item in $store.getters['cart/validGoodsList']"
          :key="item.skuId"
        >
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="" />

            <div class="center">
              <p class="name ellipsis-2">
                {{ item.name }}
              </p>

              <p class="attr ellipsis">{{ item.attrsText }}</p>
            </div>

            <div class="right">
              <p class="price">&yen;{{ item.nowPrice }}</p>
              <p class="count">X{{ item.count }}</p>
            </div>
          </RouterLink>

          <!-- 删除商品 -->
          <i
            class="iconfont icon-close"
            @click.stop="deleteCurrGoods(item.skuId)"
          >
          </i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共 {{ $store.getters['cart/validGoodsTotal'] }} 件商品</p>
          <p>&yen;{{ $store.getters['cart/validGoodsAmount'] }}</p>
        </div>
        <XtxButton type="plain" @click="$router.push('/cart')"
          >去购物车结算</XtxButton
        >
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import MessageBox from '@/components/library/message'

export default {
  name: 'HeaderCart',
  setup() {
    const store = useStore()
    // 组件初始化, 更新购物车的商品信息
    store.dispatch('cart/updateGoodsInCart')

    // 删除商品
    const deleteCurrGoods = (skuId) => {
      store
        .dispatch('cart/deleteGoodsInCart', skuId)
        .then(() => {
          MessageBox({ type: 'success', text: '删除成功' })
        })
        .catch((e) => {
          MessageBox({ type: 'error', text: '删除失败' })
        })
    }
    return { deleteCurrGoods }
  }
}
</script>
<style scoped lang="less">
.shop_cart {
  margin-left: 10px;
  position: relative;
  a {
    position: relative;

    i {
      font-size: 24px;
    }

    em {
      position: absolute;
      top: -12px;
      right: -10px;
      width: 20px;
      height: 20px;
      font-size: 8px;
      color: #ffffff;
      font-style: normal;
      text-align: center;
      line-height: 20px;
      background-color: #e26237;
      border-radius: 50%;
      border: 1px solid;
    }
  }
  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }
  .layer {
    opacity: 0;
    transition: all 0.4s 0.2s;
    transform: translateY(-200px) scale(1, 0);
    width: 400px;
    height: 400px;
    position: absolute;
    top: 50px;
    right: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4px;
    padding-top: 10px;
    z-index: 666;
    &::before {
      content: '';
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }
    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;
      .total {
        padding-left: 10px;
        color: #999;
        p {
          &:last-child {
            font-size: 18px;
            color: @priceColor;
          }
        }
      }
    }
  }
  .list {
    height: 310px;
    overflow: auto;
    padding: 0 10px;
    &::-webkit-scrollbar {
      // 滚动条样式
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #ccc;
    }
    .item {
      border-bottom: 1px solid #f5f5f5;
      padding: 10px 0;
      position: relative;
      display: flex;
      i {
        position: absolute;
        bottom: 38px;
        right: 0;
        opacity: 0;
        color: #666;
        transition: all 0.5s;
        width: 20px;
      }
      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }
      a {
        display: flex;
        align-items: center;

        img {
          height: 80px;
          width: 80px;
        }
        .center {
          padding: 0 10px;
          width: 170px;
          .name {
            font-size: 16px;
          }
          .attr {
            color: #999;
            padding-top: 5px;
          }
        }
        .right {
          width: 100px;
          padding-right: 15px;
          text-align: center;
          .price {
            font-size: 16px;
            color: @priceColor;
          }
          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less" scoped></style>

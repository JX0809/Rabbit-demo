<template>
  <div class="cart_container">
    <div class="container">
      <!-- 面包屑导航 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item>购物车</xtx-bread-item>
      </xtx-bread>

      <div class="cart" v-if="$store.getters['cart/validGoodsList']">
        <table>
          <thead>
            <tr>
              <th width="120">
                <XtxCheckbox
                  :modelValue="$store.getters['cart/selectedAllGoodsInCart']"
                  @checkboxChange="changeAllSelectedStatus"
                >
                  全选
                </XtxCheckbox>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>

          <!-- 有效商品 -->
          <tbody>
            <tr
              v-for="item in $store.getters['cart/validGoodsList']"
              :key="item.skuId"
            >
              <td>
                <XtxCheckbox
                  :modelValue="item.selected"
                  @checkboxChange="changeSelectedStatus(item.skuId, $event)"
                ></XtxCheckbox>
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`"
                    ><img :src="item.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ item.name }}
                    </p>

                    <!-- 选择规格组件 -->
                    <CartSku
                      :skuText="item.attrsText"
                      :skuId="item.skuId"
                      @changeSku="updateGoodsSkuInfoInCart(item.skuId, $event)"
                    ></CartSku>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
                <p v-if="item.price - item.nowPrice > 0">
                  比加入时降价
                  <span class="red"
                    >&yen;{{ (item.price - item.nowPrice).toFixed(2) }}</span
                  >
                </p>
              </td>

              <!-- 商品数量 -->
              <td class="tc">
                <XtxNumberBox
                  :modelValue="item.count"
                  @changeNum="changeNumber(item.skuId, $event)"
                ></XtxNumberBox>
              </td>

              <td class="tc">
                <p class="f16 red">
                  &yen;{{ (item.nowPrice * item.count).toFixed(2) }}
                </p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="deleteGoodsInCart(item.skuId)"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>

            <!-- 购物车没有商品时显示 -->
            <tr v-if="$store.getters['cart/validGoodsList'].length === 0">
              <td colspan="6">
                <CartNull></CartNull>
              </td>
            </tr>
          </tbody>

          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidGoodsList'].length">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr
              v-for="item in $store.getters['cart/invalidGoodsList']"
              :key="item.id"
            >
              <td><XtxCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`"
                    ><img :src="item.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ item.name }}
                    </p>
                    <p class="attr">{{ item.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
              </td>
              <td class="tc">{{ item.count }}</td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice * item.count }}</p>
              </td>
              <td class="tc">
                <p>
                  <a
                    class="green"
                    href="javascript:;"
                    @click="deleteGoodsInCart(item.skuId)"
                  >
                    删除
                  </a>
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox
            :modelValue="$store.getters['cart/selectedAllGoodsInCart']"
            @checkboxChange="changeAllSelectedStatus"
          >
            全选
          </XtxCheckbox>
          <a href="javascript:;" @click="batchDeleteGoodsInCart()">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteGoodsInCart(true)"
            >清空失效商品</a
          >
        </div>
        <div class="total">
          共 {{ $store.getters['cart/validGoodsTotal'] }} 件商品，已选择
          {{ $store.getters['cart/selectedGoodsTotal'] }}
          件，商品合计：
          <span class="red"
            >¥ {{ $store.getters['cart/selectedGoodsAmount'] }}</span
          >
          <XtxButton type="primary" @click="goToCheckOut">下单结算</XtxButton>
        </div>
      </div>

      <!-- 猜你喜欢 -->
      <GoodsRecommend></GoodsRecommend>
    </div>
  </div>
</template>

<script>
import GoodsRecommend from '@/components/Goods/GoodsRecommend.vue'
import CartNull from '@/components/Cart/CartNull.vue'
import CartSku from '@/components/Cart/CartSku.vue'
import Confirm from '@/components/library/confirm'
import MessageBox from '@/components/library/message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  components: { GoodsRecommend, CartNull, CartSku },
  name: 'Cart',
  setup() {
    const store = useStore()
    // 单个复选框自定义事件的事件处理函数
    const changeSelectedStatus = (skuId, selected) => {
      store.dispatch('cart/reviseGoodsInfo', { skuId, selected })
    }

    // 全选复选框
    const changeAllSelectedStatus = (val) => {
      store.dispatch('cart/selectedAllGoodsInCart', val)
    }

    // 删除当前单个购物车商品
    const deleteGoodsInCart = (skuId) => {
      Confirm({ text: '确认从购物车中删除该商品吗?' })
        .then(() => {
          store.dispatch('cart/deleteGoodsInCart', skuId)
          MessageBox({ type: 'success', text: '删除成功' })
        })
        .catch((e) => {})
    }

    //  批量删除商品：根据复选框选中状态删除商品
    const batchDeleteGoodsInCart = (isClear) => {
      if (
        store.getters[
          isClear ? 'cart/invalidGoodsList' : 'cart/selectedGoodsList'
        ].length
      ) {
        Confirm({
          text: `确认从购物车中删除${isClear ? '失效' : '选中'}的商品吗?`
        })
          .then(() => {
            store.dispatch('cart/batchDeleteGoodsInCart', isClear)
            MessageBox({ type: 'success', text: '删除成功' })
          })
          .catch((e) => {})
      } else {
        MessageBox({
          type: 'warn',
          text: `${isClear ? '暂无失效' : '请选择需要删除的'}商品`
        })
      }
    }

    // 更改商品数量自定义事件 处理函数
    const changeNumber = (skuId, count) => {
      store.dispatch('cart/reviseGoodsInfo', { skuId, count })
    }

    // 更改购物车商品的sku:  有bug 未完成
    const updateGoodsSkuInfoInCart = (oldSkuId, newSku) => {
      // TODO
      store.dispatch('cart/updateGoodsSkuInfo', { oldSkuId, newSku })
    }

    const router = useRouter()
    // 点击下单
    const goToCheckOut = () => {
      if (store.getters['cart/selectedGoodsList'].length === 0) {
        return MessageBox({ type: 'warn', text: '请选择要下单的商品' })
      }
      if (!store.state.user.profile.token) {
        Confirm({ text: '下单结算需要登录，请点击确认前往登录页面' })
          .then(() => {
            router.push('member/checkout')
          })
          .catch((e) => {})
      } else {
        router.push('/member/checkout')
      }
    }

    return {
      changeSelectedStatus,
      changeAllSelectedStatus,
      deleteGoodsInCart,
      batchDeleteGoodsInCart,
      changeNumber,
      updateGoodsSkuInfoInCart,
      goToCheckOut
    }
  }
}
</script>

<style lang="less" scoped>
.cart_container {
  width: 100%;
  min-height: 500px;

  .container {
    width: 1240px;
    margin: 0 auto;

    .cart {
      background: #fff;
      color: #666;
      table {
        border-spacing: 0;
        border-collapse: collapse;
        line-height: 24px;
        th,
        td {
          padding: 10px;
          border-bottom: 1px solid #f5f5f5;
          &:first-child {
            text-align: left;
            padding-left: 30px;
            color: #999;
          }
        }
        th {
          font-size: 16px;
          font-weight: normal;
          line-height: 50px;
        }
      }
    }
  }
  .tc {
    text-align: center;
    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }
  .red {
    color: @priceColor;
  }
  .green {
    color: @xtxColor;
  }
  .f16 {
    font-size: 16px;
  }
  .goods {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
    > div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;
      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .action {
    display: flex;
    background: #fff;
    margin: 20px 0px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;
    .xtx-checkbox {
      color: #999;
    }
    .batch {
      a {
        margin-left: 20px;
      }
    }
    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }
  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }
}
</style>

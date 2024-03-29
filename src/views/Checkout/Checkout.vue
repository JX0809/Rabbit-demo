<template>
  <div class="checkout_container">
    <div class="checkout">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/"> 首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>填写订单</XtxBreadItem>
      </XtxBread>

      <div class="wrapper" v-if="checkoutInfo">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <UserAddress
            :address="checkoutInfo.userAddresses"
            @change="getAddressId"
          ></UserAddress>
        </div>

        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in checkoutInfo.goods" :key="item.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="item.picture" alt="" />
                    <div class="right">
                      <p>{{ item.name }}</p>
                      <p>{{ item.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ item.price }}</td>
                <td>{{ item.count }}</td>
                <td>&yen;{{ item.totalPrice }}</td>
                <td>&yen;{{ item.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;"
            >不限送货时间：周一至周日</a
          >
          <a class="my-btn" href="javascript:;">工作日送货：周一至周五</a>
          <a class="my-btn" href="javascript:;">双休日、假日送货：周六至周日</a>
        </div>
        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
          <a class="my-btn" href="javascript:;">货到付款</a>
          <span style="color: #999">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkoutInfo.summary.goodsCount }}</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ checkoutInfo.summary.totalPrice }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥{{ checkoutInfo.summary.postFee }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">¥{{ checkoutInfo.summary.totalPayPrice }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <XtxButton type="primary" @click="submitOrder">提交订单</XtxButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAddress from '@/components/Checkout/UserAddress.vue'
import { createOrderAPI, submitOrderAPI } from '@/api/checkoutAPI/checkoutAPI'
import { repurchaseAPI } from '@/api/memberAPI/memberAPI'
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MessageBox from '@/components/library/message'

export default {
  name: 'Checkout',
  components: {
    UserAddress
  },
  setup() {
    // 定义提交订单 需要的参数
    const checkoutAPIParams = reactive({
      goods: null,
      addressId: null,
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: ''
    })

    //  生成 订单
    const checkoutInfo = ref(null)
    // TODO 订单列表的再次购买生成订单
    //  根据购物车选中的商品 生成订单
    const route = useRoute()
    if (route.query.orderId) {
      repurchaseAPI(route.query.orderId).then(({ data }) => {
        checkoutInfo.value = data.result
        checkoutAPIParams.goods = data.result.goods.map((item) => {
          return {
            skuId: item.skuId,
            count: item.count
          }
        })
      })
    } else {
      createOrderAPI().then(({ data }) => {
        checkoutInfo.value = data.result
        checkoutAPIParams.goods = data.result.goods.map((item) => {
          return {
            skuId: item.skuId,
            count: item.count
          }
        })
      })
    }

    const getAddressId = (id) => {
      checkoutAPIParams.addressId = id
    }

    const router = useRouter()
    const submitOrder = () => {
      submitOrderAPI(checkoutAPIParams).then(({ data }) => {
        console.log(data)
        MessageBox({ type: 'success', text: '提交订单成功，请及时支付' })
        router.push({ path: '/member/pay', query: { orderId: data.result.id } })
      })
    }

    return {
      checkoutInfo,
      checkoutAPIParams,
      getAddressId,
      submitOrder
    }
  }
}
</script>

<style lang="less" scoped>
.checkout_container {
  width: 100%;
  .checkout {
    width: 1240px;
    margin: 0 auto;

    .wrapper {
      background: #fff;
      padding: 0 20px;
      .box-title {
        font-size: 16px;
        font-weight: normal;
        padding-left: 10px;
        line-height: 70px;
        border-bottom: 1px solid #f5f5f5;
      }
      .box-body {
        padding: 20px 0;
      }
    }
  }

  .goods {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    .info {
      display: flex;
      text-align: left;
      img {
        width: 70px;
        height: 70px;
        margin-right: 20px;
      }
      .right {
        line-height: 24px;
        p {
          &:last-child {
            color: #999;
          }
        }
      }
    }
    tr {
      th {
        background: #f5f5f5;
        font-weight: normal;
      }
      td,
      th {
        text-align: center;
        padding: 20px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          border-left: 1px solid #f5f5f5;
        }
        &:last-child {
          border-right: 1px solid #f5f5f5;
        }
      }
    }
  }
  .my-btn {
    width: 228px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-right: 25px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @xtxColor;
    }
  }
  .total {
    dl {
      display: flex;
      justify-content: flex-end;
      line-height: 50px;
      dt {
        i {
          display: inline-block;
          width: 2em;
        }
      }
      dd {
        width: 240px;
        text-align: right;
        padding-right: 70px;
        &.price {
          font-size: 20px;
          color: @priceColor;
        }
      }
    }
  }
  .submit {
    text-align: right;
    padding: 60px;
    border-top: 1px solid #f5f5f5;
  }
}
</style>

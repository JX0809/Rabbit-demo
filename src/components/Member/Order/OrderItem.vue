<template>
  <div class="order_item">
    <header class="head">
      <div class="left">
        <span>下单时间：{{ orderList.createTime }}</span>
        <span>订单编号：{{ orderList.id }} </span>
      </div>
      <div class="right">
        <span v-if="orderList.orderState === 1"
          ><i class="iconfont icon-shijian_o"></i>付款截止：{{ timeTxt }}</span
        >
        <span
          v-if="[5, 6].includes(orderList.orderState)"
          class="delete"
          @click="$emit('on-delete-order')"
          >删除</span
        >
      </div>
    </header>

    <div class="body">
      <div class="goods">
        <!-- 遍历商品 -->
        <ul>
          <li
            v-for="goods in orderList.skus"
            :key="goods.id"
            :class="{ border: orderList.skus.length > 1 }"
          >
            <a href="javascript:;">
              <img :src="goods.images" />
            </a>
            <div class="info">
              <p class="title">{{ goods.name }}</p>
              <p class="sku">{{ goods.attrsText }}</p>
            </div>
            <div class="price">￥{{ goods.curPrice }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="status">
        <p v-if="orderList.orderState === 1"><span>待付款</span></p>
        <p v-if="orderList.orderState === 2"><span>待发货</span></p>
        <p v-if="orderList.orderState === 3"><span>待收货</span></p>
        <p v-if="orderList.orderState === 4"><span>待评价</span></p>
        <p v-if="orderList.orderState === 5"><span>已完成</span></p>
        <p v-if="orderList.orderState === 6"><span>已取消</span></p>
        <p>
          <a
            v-if="orderList.orderState === 3"
            class="green"
            @click="$emit('on-check-logistic')"
            >查看物流</a
          >
        </p>
        <p>
          <a v-if="orderList.orderState === 4" class="green">评价商品</a>
        </p>
        <p v-if="orderList.orderState === 5">
          <a class="green">查看评价</a>
        </p>
      </div>
      <div class="amount">
        <p class="red">￥{{ orderList.payMoney }}</p>
        <p>（含运费：￥{{ orderList.postFee }}）</p>
        <p>在线支付</p>
      </div>

      <div class="action">
        <XtxButton size="small" type="primary" v-if="orderList.orderState === 1"
          >立即付款</XtxButton
        >
        <XtxButton
          size="small"
          type="primary"
          v-if="orderList.orderState === 3"
          @click="$emit('on-confirm-received-order')"
          >确认收货</XtxButton
        >
        <!-- 其他写法 -->
        <p>
          <!-- @click="$router.push(`/member/order/${orderList.id}`)" -->
          <!-- @click="$router.push({ path: `/member/order/${orderList.id}` })" -->
          <!-- @click="$router.push({ name: 'orderDetail', params:{id: orderList.id }})" -->
          <a
            href="javascript:;"
            @click="$router.push(`/member/order/${orderList.id}`)"
            >查看详情</a
          >
        </p>
        <p v-if="[2, 3, 4, 5].includes(orderList.orderState)">
          <a
            href="javascript:;"
            @click="$router.push(`/member/checkout?orderId=${orderList.id}`)"
            >再次购买</a
          >
        </p>
        <p v-if="orderList.orderState === 1">
          <a href="javascript:;" @click="$emit('on-cancel-order')">取消订单</a>
        </p>
        <p>
          <a href="javascript:;" v-if="[4, 5].includes(orderList.orderState)"
            >申请售后</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { usePayTimeCountdown } from '@/hook'

export default {
  name: 'OrderItem',
  props: {
    orderList: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    // 付款倒计时
    const { start, timeTxt } = usePayTimeCountdown()
    if (props.orderList.countdown > -1) {
      start(props.orderList.countdown)
    }

    return {
      start,
      timeTxt
    }
  }
}
</script>

<style lang="less" scoped>
.order_item {
  width: 100%;
  margin-bottom: 20px;
  .head {
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #333;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    .left {
      > span {
        margin-right: 20px;
      }
    }
    .right {
      span {
        .iconfont {
          color: #999999;
        }
      }
      .delete {
        cursor: pointer;
        color: #999;
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }

  .body {
    width: 100%;
    display: flex;
    border: 1px solid #f5f5f5;
    border-top: none;
    > div {
      ~ div {
        border-left: 1px solid #f5f5f5;
      }
    }
    .border {
      border-bottom: 1px solid #f5f5f5;
    }
    .goods {
      flex: 1;
      height: 100%;
      align-self: center;
      ul {
        display: flex;
        flex-direction: column;
        height: 100%;
        li {
          padding: 10px;
          display: flex;
          &:last-child {
            border: none;
          }

          > a {
            width: 70px;
            height: 70px;
            bottom: 1px solid #f5f5f5;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .info {
            padding: 0 10px;
            width: 220px;
            > p {
              margin-bottom: 5px;
              text-align: left;
              &.title {
                height: 38px;
              }
            }
          }
          .price {
            width: 100px;
            text-align: center;
          }
          .count {
            width: 80px;
            text-align: center;
          }
        }
      }
    }
    .status {
      width: 120px;
      padding: 20px;
      text-align: center;
      > p {
        padding-top: 10px;
        a:hover {
          cursor: pointer;
        }
      }
    }
    .amount {
      width: 200px;
      padding: 20px;
      text-align: center;
      p {
        padding-top: 10px;
      }
    }
    .action {
      width: 140px;
      border-right: 0;
      padding: 20px;
      text-align: center;
      > p {
        padding-top: 10px;
        > a:hover {
          color: @xtxColor;
        }
      }
    }
  }
  .red {
    color: red;
  }
  .green {
    color: @xtxColor;
  }
}
</style>

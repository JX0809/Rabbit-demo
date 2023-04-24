<template>
  <div class="detail_Header" v-if="order">
    <div class="state">
      <span class="iconfont icon-money"></span>
      <p v-if="order.orderState === 1">待支付</p>
      <p v-if="order.orderState === 2">待发货</p>
      <p v-if="order.orderState === 3">待收货</p>
      <p v-if="order.orderState === 4">待评价</p>
      <p v-if="order.orderState === 5">已完成</p>
      <p v-if="order.orderState === 6">已取消</p>
    </div>
    <div class="info">
      <p>订单编号：{{ order.id }}</p>
      <p>下单时间：{{ order.createTime }}</p>
    </div>
    <div class="btn">
      <template v-if="order.orderState === 1">
        <XtxButton type="primary" size="small">立即付款</XtxButton>
        <XtxButton type="gray" size="small" @click="openCancelDialog(order)"
          >取消订单</XtxButton
        >
      </template>
      <template v-if="order.orderState === 2">
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买</XtxButton
        >
      </template>
      <template v-if="order.orderState === 3">
        <XtxButton
          type="primary"
          size="small"
          @click="confirmReceiveOrder(order)"
          >确认收货</XtxButton
        >
        <XtxButton
          type="plain"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买</XtxButton
        >
      </template>
      <template v-if="order.orderState === 4">
        <XtxButton type="primary" size="small">评价商品</XtxButton>
        <XtxButton
          type="plain"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买</XtxButton
        >
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <template v-if="order.orderState === 5">
        <XtxButton type="plain" size="small">查看评价</XtxButton>
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          >再次购买</XtxButton
        >
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
    </div>
  </div>
  <Teleport to="#dialog">
    <OrderCancel ref="orderCancelCom"></OrderCancel>
  </Teleport>
</template>

<script>
import OrderCancel from './OrderCancel.vue'
import {
  useCancelOrder,
  useReceivedOrder
} from '@/views/Member/MemberDetail/Order.vue'
export default {
  name: 'HeaderDetail',
  components: {
    OrderCancel
  },
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    return { ...useCancelOrder(), ...useReceivedOrder() }
  }
}
</script>

<style lang="less" scoped>
.detail_Header {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx_btn {
      margin-left: 20px;
    }
  }
}
</style>

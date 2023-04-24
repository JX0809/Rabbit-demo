<template>
  <div class="detail_step" v-if="order">
    <OrderStep :active="order.orderState === 6 ? 1 : order.orderState">
      <OrderStepItem name="提交订单" :time="order.createTime"></OrderStepItem>

      <OrderStepItem name="付款成功" :time="order.payTime"></OrderStepItem>

      <OrderStepItem name="商品发货" :time="order.consignTime"></OrderStepItem>

      <OrderStepItem
        name="确认收货"
        :time="order.arrivalEstimatedTime"
      ></OrderStepItem>

      <OrderStepItem name="订单完成" :time="order.endTime"></OrderStepItem>
    </OrderStep>
  </div>
</template>

<script>
import OrderStep from '@/components/Member/Order/OrderStep.vue'
import OrderStepItem from '@/components/Member/Order/OrderStepItem.vue'
export default {
  name: 'DetailStep',
  components: {
    OrderStep,
    OrderStepItem
  },
  props: {
    order: {
      type: Object,
      default: () => {}
    }
  },
  setup() {}
}
</script>

<style lang="less" scoped>
.detail_step {
  width: 100%;
}
</style>

<template>
  <div class="order_detail">
    <div class="container">
      <!-- 头部 -->
      <DetailHeader :order="order"></DetailHeader>

      <!-- 步骤条 -->
      <DetailStep :order="order"></DetailStep>

      <!-- 物流信息 -->
      <DetailLogistics v-if="order" :order="order"></DetailLogistics>

      <!-- 商品信息 -->
      <OrderDetailInfo v-if="order" :order="order"></OrderDetailInfo>
    </div>
  </div>
</template>

<script>
import DetailHeader from '@/components/Member/Order/DetailHeader.vue'
import DetailStep from '@/components/Member/Order/DetailStep.vue'
import DetailLogistics from '@/components/Member/Order/DetailLogistics.vue'
import OrderDetailInfo from '@/components/Member/Order/OrderDetailInfo.vue'

import { getOrderDetailAPI } from '@/api/memberAPI/memberAPI'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'OrderDetail',
  components: {
    DetailHeader,
    DetailStep,
    DetailLogistics,
    OrderDetailInfo
  },
  setup() {
    const route = useRoute()
    const order = ref(null)
    // 获取订单详情
    getOrderDetailAPI(route.params.id).then(({ data }) => {
      console.log(data)
      order.value = data.result
    })

    return {
      order
    }
  }
}
</script>

<style lang="less" scoped>
.order_detail {
  width: 100%;
  height: 100%;

  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;

    .detail_step {
      width: 100%;
      padding: 20px;
    }
  }
}
</style>

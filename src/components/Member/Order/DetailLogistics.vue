<template>
  <div class="detail_logistics" v-if="logistics">
    <p>
      <span>{{ logistics.list[0].time }}</span>
      <span>{{ logistics.list[0].text }}</span>
    </p>
    <a @click="checkLogistic(order)"> 查看物流 </a>
  </div>

  <Teleport to="#dialog">
    <LogisticsDialog ref="checkLogisticsCom"></LogisticsDialog>
  </Teleport>
</template>

<script>
import LogisticsDialog from '@/components/Member/Order/LogisticsDialog.vue'
import { checkLogisticsAPI } from '@/api/memberAPI/memberAPI'
import { useCheckLogistics } from '@/views/Member/MemberDetail/Order.vue'
import { ref } from 'vue'
export default {
  name: 'DetailLogistics',
  components: { LogisticsDialog },
  props: {
    order: {
      // 当前订单详情的订单信息
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const logistics = ref(null)
    checkLogisticsAPI(props.order.id).then(({ data }) => {
      logistics.value = data.result
    })

    return { logistics, ...useCheckLogistics() }
  }
}
</script>

<style lang="less" scoped>
.detail_logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    line-height: 30px;
    background-color: #f5f5f5;

    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: @xtxColor;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>

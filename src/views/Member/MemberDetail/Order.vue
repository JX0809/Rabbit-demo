<template>
  <div class="order_container">
    <XtxTabs v-model="activeName" @changeTab="toggleTabFn">
      <XtxTabsPanel
        v-for="item in orderOptions"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <template v-if="orderList && orderList.items.length >= 1">
          <!-- 1. 接收取消订单按钮的自定义事件 -->
          <!-- 1. 接收删除订单按钮的自定义事件 -->
          <OrderItem
            v-for="item in orderList.items"
            :key="item.id"
            :orderList="item"
            @on-cancel-order="openCancelDialog(item)"
            @on-delete-order="deleteOrder(item)"
            @on-confirm-received-order="confirmReceiveOrder(item)"
            @on-check-logistic="checkLogistic(item)"
          ></OrderItem>
        </template>

        <!-- 点击切换，返回数据的items为 []时显示 -->
        <template v-if="orderList && orderList.items.length === 0">
          <div class="none_data">
            <p>暂无数据</p>
          </div>
        </template>

        <!-- 数据为空时， 显示loading -->
        <template v-if="orderList === null">
          <div class="loading">
            <img src="@/assets/images/loading.gif" alt="" />
          </div>
        </template>

        <XtxPagination
          v-if="orderList && orderList.items.length >= 1"
          :myTotal="orderList.counts"
          :myCurrPage="orderList.page"
          @current-change="nextPageFn"
        ></XtxPagination>
      </XtxTabsPanel>
    </XtxTabs>
  </div>

  <!-- 取消订单对话框组件 -->
  <Teleport to="#dialog">
    <OrderCancel ref="orderCancelCom"></OrderCancel>
  </Teleport>
  <!-- 查看物流对话框 -->
  <LogisticsDialog ref="checkLogisticsCom"></LogisticsDialog>
</template>

<script>
import XtxTabs from '@/components/Member/Order/XtxTabs.vue'
import XtxTabsPanel from '@/components/Member/Order/XtxTabsPanel.vue'
import OrderItem from '@/components/Member/Order/OrderItem.vue'
import LogisticsDialog from '@/components/Member/Order/LogisticsDialog.vue'
import { orderOptions } from '@/api/constant'
import { reactive, ref, watch } from 'vue'
import {
  getMyOrderListAPI,
  deleteOrderAPI,
  receivedGoodsAPI
} from '@/api/memberAPI/memberAPI'
import OrderCancel from '@/components/Member/Order/OrderCancel.vue'
import Confirm from '@/components/library/confirm'
import MessageBox from '@/components/library/message'

export default {
  name: 'Order',
  components: {
    XtxTabs,
    XtxTabsPanel,
    OrderItem,
    OrderCancel,
    LogisticsDialog
  },
  setup() {
    // 当前激活项
    const activeName = ref('all')

    // 获取我的订单
    const orderList = ref(null)
    const orderParams = reactive({
      page: 1,
      pageSize: 10,
      orderState: 0
    })
    const getLatestOrderList = () => {
      getMyOrderListAPI(orderParams).then(({ data }) => {
        orderList.value = data.result
      })
    }

    watch(
      orderParams,
      () => {
        getLatestOrderList()
      },
      {
        immediate: true
      }
    )

    // 切换选项，获取对应的 订单列表
    const toggleTabFn = (params) => {
      orderParams.page = 1
      orderParams.orderState = params.index
      orderList.value = null
    }
    // 分页 页码下一页上一页获取订单数据
    const nextPageFn = (val) => {
      orderParams.page = val
      orderList.value = null
    }

    // 删除订单
    const deleteOrder = (item) => {
      Confirm({ text: '您确认删除该条订单吗？' })
        .then(() => {
          deleteOrderAPI([item.id]).then(() => {
            MessageBox({ text: '删除订单成功', type: 'success' })
            orderList.value = null
            getLatestOrderList()
          })
        })
        .catch((e) => {})
    }

    return {
      orderOptions,
      activeName,
      orderList,
      toggleTabFn,
      nextPageFn,
      ...useCancelOrder(),
      deleteOrder,
      ...useReceivedOrder(),
      ...useCheckLogistics()
    }
  }
}

// 提取业务逻辑
// 确认收货
export const useReceivedOrder = () => {
  const confirmReceiveOrder = (item) => {
    Confirm({ text: '确认收货，表示您已收到货物，订单已完成' })
      .then(() => {
        receivedGoodsAPI(item.id).then(() => {
          MessageBox({ text: '确认收货成功', type: 'success' })
          // 确认收货,代表订单已完成, 应该显示申请售后按钮
          item.orderState = 4
        })
      })
      .catch((e) => {})
  }
  return { confirmReceiveOrder }
}

// // 查看物流自定义事件函数
// // 提取逻辑 给订单详情的查看物流使用： 同时要setup中 return 给当前组价的模版使用
export const useCheckLogistics = () => {
  // 物流对话框组件实例
  const checkLogisticsCom = ref(null)
  const checkLogistic = (item) => {
    checkLogisticsCom.value.openLogisticsDialog(item)
  }

  return { checkLogisticsCom, checkLogistic }
}

// 取消订单
// 提取取消订单逻辑，方便复用
export const useCancelOrder = () => {
  // 获取取消订单对话框组件的实例
  const orderCancelCom = ref(null)
  // 定义方法， 在方法里调用实例提供的打开对话框的 open 方法
  const openCancelDialog = (item) => {
    orderCancelCom.value.open(item)
  }
  // 把方法和 组件实例， 返回给模板使用
  return { openCancelDialog, orderCancelCom }
}
</script>

<style lang="less" scoped>
.order_container {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.loading {
  height: 400px;
  line-height: 400px;
  text-align: center;
}

.none_data {
  width: 100%;
  height: 400px;
  padding: 100px 0;
  line-height: 200px;
  p {
    text-align: center;
    color: #999;
    font-size: 16px;
  }
}
</style>

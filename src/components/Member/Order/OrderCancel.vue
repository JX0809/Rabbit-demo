<template>
  <!-- 取消订单对话框 -->
  <XtxDialog title="取消订单" v-model:visible="visibleDialog">
    <div class="cancel_info">
      <p>取消订单后，本订单享有的优惠可能会一并取消， 是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="reason">
        <a
          href="javascript:;"
          :class="{ active: cancelTxt === item }"
          v-for="item in cancelReason"
          :key="item"
          @click="cancelTxt = item"
          >{{ item }}</a
        >
      </div>
    </div>

    <template v-slot:footer>
      <XtxButton size="middle" type="gray" @click="visibleDialog = false"
        >取消</XtxButton
      >
      <XtxButton size="middle" type="primary" @click="submitCancelOrderRequest"
        >确认</XtxButton
      >
    </template>
  </XtxDialog>
</template>

<script>
import { cancelReason } from '@/api/constant'
import { cancelOrderAPI } from '@/api/memberAPI/memberAPI'
import MessageBox from '@/components/library/message'
import { ref } from 'vue'
export default {
  name: 'OrderCancel',
  setup() {
    // 取消订单
    const visibleDialog = ref(false)
    // 取消原因
    const cancelTxt = ref('')
    const order = ref(null)

    // 提供方法打开取消订单对话框
    const open = (item) => {
      visibleDialog.value = true
      order.value = item
      cancelTxt.value = ''
    }

    // 点击确认按钮取消订单
    const submitCancelOrderRequest = () => {
      if (!cancelTxt.value) {
        return MessageBox({ type: 'warn', text: '请选择取消订单的原因' })
      }
      cancelOrderAPI(order.value.id, cancelTxt.value).then(() => {
        MessageBox({ type: 'success', text: '取消订单成功' })
        order.value.orderState = 6
        visibleDialog.value = false
      })
    }
    return {
      cancelReason,
      visibleDialog,
      open,
      cancelTxt,
      submitCancelOrderRequest
    }
  }
}
</script>

<style lang="less" scoped>
.xtx_btn {
  margin-right: 20px;
}
.xtx_dialog {
  /deep/.wrapper {
    width: 620px;
  }
  .cancel_info {
    font-size: 16px;

    p {
      line-height: 35px;
    }
    .tip {
      color: #999;
    }

    .reason {
      padding-top: 21px;
      display: flex;
      flex-wrap: wrap;

      > a {
        width: 256px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #e4e4e4;
        margin-right: 20px;
        margin-bottom: 20px;
        color: #666;

        &:nth-child(2n) {
          margin-right: 0;
        }

        &:hover {
          background-color: #e3f9f4;
          border-color: @xtxColor;
        }
      }
      .active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
      }
    }
  }
}
</style>

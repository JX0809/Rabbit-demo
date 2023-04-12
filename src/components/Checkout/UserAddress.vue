<template>
  <div class="checkout-address">
    <div class="text">
      <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
      <ul v-if="showAddress">
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li><span>联系方式：</span>{{ telStrFn(showAddress.contact) }}</li>
        <li>
          <span>收货地址：</span>{{ showAddress.fullLocation }}
          {{ showAddress.address }}
        </li>
      </ul>

      <!-- 没有地址时显示 -->
      <div class="none" v-if="!showAddress">
        您需要先添加收货地址才可提交订单。
      </div>

      <a href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn">切换地址</XtxButton>
      <XtxButton class="btn">添加地址</XtxButton>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  name: 'UserAddress',
  props: {
    address: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    // 定义成计算属性
    const addressList = computed(() => {
      return props.address
    })

    const showAddress = ref(null)
    if (addressList.value.length) {
      const defaultAddress = props.address.find((item) => item.isDefault === 0)
      if (defaultAddress) {
        showAddress.value = defaultAddress
      }
    } else {
      showAddress.value = addressList.value[0]
    }

    // 处理手机号码隐藏
    const telStrFn = (tel) => {
      return tel.substr(0, 3) + '****' + tel.substr(-3)
    }

    return { showAddress, telStrFn }
  }
}
</script>

<style lang="less" scoped>
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
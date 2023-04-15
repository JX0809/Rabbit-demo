<template>
  <div class="checkout-address">
    <div class="text">
      <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
      <ul v-if="showedAddress">
        <li>
          <span>收<i />货<i />人：</span>{{ showedAddress.receiver }}
        </li>
        <li><span>联系方式：</span>{{ telStrFn(showedAddress.contact) }}</li>
        <li>
          <span>收货地址：</span>{{ showedAddress.fullLocation }}
          {{ showedAddress.address }}
        </li>
      </ul>

      <!-- 没有地址时显示 -->
      <div class="none" v-if="!showedAddress">
        您需要先添加收货地址才可提交订单。
      </div>

      <a href="javascript:;" @click="openEditAddressDialog(showedAddress)"
        >修改地址</a
      >
    </div>
    <div class="action">
      <XtxButton class="btn" @click="showAddressDialog">切换地址</XtxButton>
      <XtxButton class="btn" @click="openEditAddressDialog">添加地址</XtxButton>
    </div>
  </div>

  <!-- 切换收货地址 -->
  <XtxDialog v-model:visible="visibleDialog" title="切换收货地址">
    <!-- 默认插槽---收获地址 -->
    <div class="address_text" v-if="addressList">
      <ul
        class="item"
        :class="{ active: selectedAdd && item.id === selectedAdd.id }"
        v-for="item in addressList"
        :key="item.id"
        @click="selectedAdd = item"
      >
        <li class="close">收货人：{{ item.receiver }}</li>
        <li>联系方式：{{ item.contact }}</li>
        <li>收获地址：{{ item.fullLocation }}{{ item.address }}</li>
      </ul>
    </div>

    <!-- 具名插槽--按钮 -->
    <template v-slot:footer>
      <XtxButton size="middle" type="gray" @click="visibleDialog = false"
        >取消</XtxButton
      >
      <XtxButton size="middle" type="primary" @click="submitChangeAdd"
        >确认</XtxButton
      >
    </template>
  </XtxDialog>

  <!-- 添加地址 -->
  <AddressEdit
    ref="showEditComponent"
    :title="addBtn === 1 ? '修改收货地址' : '添加收货地址'"
    @updateAddressId="addAddress"
  ></AddressEdit>

  <!-- ... -->
</template>

<script>
import { computed, ref } from 'vue'
import AddressEdit from './AddressEdit.vue'
export default {
  name: 'UserAddress',
  components: { AddressEdit },
  props: {
    address: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change'], // vue3 组件如果每页根元素，使用emit时， 需配置 emits选项，声明要emit的所以自定义事件名
  setup(props, { emit }) {
    // 定义成计算属性： 切换地址的 渲染数据
    const addressList = computed(() => {
      return props.address
    })

    // 获取地址列表里的 默认地址 或者第一个地址
    const showedAddress = ref(null)
    const defaultAddress = addressList.value.find(
      (item) => item.isDefault === 0
    )
    if (defaultAddress) {
      showedAddress.value = defaultAddress
    } else {
      if (addressList.value.length) {
        showedAddress.value = addressList.value[0]
      }
    }
    emit('change', showedAddress.value?.id)

    // 处理手机号码隐藏
    const telStrFn = (tel) => {
      return tel.substr(0, 3) + '*****' + tel.substr(-3)
    }
    // 控制切换地址对话框的显示隐藏
    const visibleDialog = ref(false)
    const showAddressDialog = () => {
      selectedAdd.value = null
      visibleDialog.value = true
    }
    // 选中地址
    const selectedAdd = ref(null)

    // 确认切换地址
    const submitChangeAdd = () => {
      showedAddress.value = selectedAdd.value
      // 提交订单需要 地址id
      // emit('change', showedAddress.value && showedAddress.value.id) // 逻辑运算符的 短路运算
      emit('change', showedAddress.value?.id) // ES6 ? 取值的前置判断
      visibleDialog.value = false
    }

    const addBtn = ref(null)
    // 添加地址  / 修改
    // 获取子组件实例
    const showEditComponent = ref(null)

    const openEditAddressDialog = (selectedAdd) => {
      /**
       * 区分：修改地址 有 id, 添加 地址 没有id
       * 点击修改地址， 把默认选中的地址数据 传递给表单数据，赋值
       * 点击添加地址， 传 数据 为 null
       */
      if (selectedAdd.id) {
        addBtn.value = 1 // 修改地址
        // 调用子组件的 openEditDialog() 方法，显示对话框， 修改地址表单的值， 重置表单内容为空/ 给表单赋值，清空校验规则
        showEditComponent.value.openEditDialog(selectedAdd)
      } else {
        addBtn.value = 2 // 添加地址
        showEditComponent.value.openEditDialog({
          id: null,
          receiver: null,
          contact: null,
          provinceCode: null,
          cityCode: null,
          countyCode: null,
          fullLocation: null,
          address: null,
          postalCode: null,
          addressTags: null,
          isDefault: 1
        })
      }
    }

    // 编辑对话框的 自定义事件处理函数
    const addAddress = (newAddress) => {
      const address = addressList.value.findIndex(
        (item) => item.id === newAddress.id
      )
      if (address !== -1) {
        for (const key in addressList.value[address]) {
          addressList.value[address][key] = newAddress[key]
        }
      } else {
        addressList.value.unshift(newAddress)
      }
    }

    return {
      showedAddress,
      telStrFn,
      visibleDialog,
      showAddressDialog,
      addressList,
      selectedAdd,
      submitChangeAdd,
      openEditAddressDialog,
      showEditComponent,
      addAddress,
      addBtn
    }
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
      position: relative;
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

.xtx_btn {
  &:first-child {
    margin-right: 20px;
  }
}

.address_text {
  width: 100%;

  background-color: #fff;
  .item {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 14px;
    line-height: 30px;
    border: 1px solid #f5f5f5;
    &.active,
    &:hover {
      background: lighten(@xtxColor, 50%);
      border: 1px solid @xtxColor;
      cursor: pointer;
    }
  }
}
</style>

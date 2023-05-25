<template>
  <div class="address_container" v-if="address">
    <UserPanel title="收货地址">
      <template v-slot:more>
        <XtxMore title="+添加地址" @click="openEditAddress"></XtxMore>
      </template>

      <div class="address">
        <div class="item" v-for="item in address" :key="item.id">
          <div class="info">
            <p class="close">
              收货人：<span>{{ item.receiver }}</span>
            </p>
            <p>
              联系方式：<span>{{ item.contact }}</span>
            </p>
            <p>
              收获地址：<span>{{ item.fullLocation }}{{ item.address }}</span>
            </p>
          </div>
          <div class="action">
            <XtxButton
              :class="{ active: item.isDefault === 0 }"
              size="small"
              type="gray"
              @click="setDefaultAddress(item)"
              >设为默认</XtxButton
            >
            <p>
              <a class="edit" href="javascript:;" @click="openEditAddress(item)"
                >编辑</a
              >
              <a
                class="delete"
                href="javascript:;"
                @click="deleteCurrAddress(item)"
                >删除</a
              >
            </p>
          </div>
        </div>
      </div>
    </UserPanel>
  </div>

  <!-- 复用结算部门的地址组件 -->
  <AddressEdit
    ref="showEditComponent"
    :title="addBtn === 1 ? '修改收货地址' : '添加收货地址'"
    @updateAddressId="newAdd"
  ></AddressEdit>
</template>

<script>
import UserPanel from '@/components/Member/User/UserPanel.vue'
import {
  getAddressListAPI,
  updateAddressAPI,
  deleteAddressAPI
} from '@/api/memberAPI/memberAPI'
import { ref } from 'vue'
import Message from '@/components/library/message'
import Confirm from '@/components/library/confirm'
import AddressEdit from '@/components/Checkout/AddressEdit.vue'

export default {
  name: 'AddressManage',
  components: {
    UserPanel,
    AddressEdit
  },
  setup() {
    // 所有地址数据
    const address = ref(null)
    getAddressListAPI().then(({ data }) => {
      address.value = data.result
    })

    // 设置默认地址
    const setDefaultAddress = (item) => {
      if (item.isDefault === 0) {
        return Message({ type: 'warn', text: '该地址已经是默认地址' })
      }
      address.value.forEach((address) => {
        address.isDefault = 1
      })
      item.isDefault = 0
      updateAddressAPI(item).then(() => {
        Message({ type: 'success', text: '设置默认地址成功' })
      })
    }

    // 编辑或添加地址
    const showEditComponent = ref(null)
    const addBtn = ref(null)
    const openEditAddress = (item) => {
      if (item.id) {
        addBtn.value = 1
        showEditComponent.value.openEditDialog(item)
      } else {
        addBtn.value = 2
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

    // 编辑或添加地址后的自定义事件处理函数
    // 编辑或添加操作后--更新当前页面数据 而不用刷新页面
    const newAdd = (newVal) => {
      // 找出当前修改的项
      const currAddIndex = address.value.findIndex((item) => {
        return item.id === newVal.id
      })
      if (currAddIndex !== -1) {
        for (const key in address.value[currAddIndex]) {
          address.value[currAddIndex][key] = newVal[key]
        }
      } else {
        address.value.unshift(newVal)
      }
    }

    // 删除地址
    const deleteCurrAddress = (item) => {
      Confirm({ text: '确认删除当前地址码？' }).then(() => {
        deleteAddressAPI(item.id).then(() => {
          Message({ type: 'success', text: '删除地址成功' })
          getAddressListAPI().then(({ data }) => {
            address.value = data.result
          })
        })
      })
    }

    return {
      address,
      setDefaultAddress,
      showEditComponent,
      openEditAddress,
      addBtn,
      newAdd,
      deleteCurrAddress
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .xtx_btn {
  color: #333;
}
/deep/.xtx_more_container {
  a {
    span {
      color: @xtxColor;
    }
  }
}

/deep/ .user_panel_container {
  margin-top: 0;
  .panel_body {
    padding-top: 0;
  }
}

.active {
  background-color: @xtxColor;
  color: #fff;
}
.address_container {
  width: 100%;
  height: 100%;
  .address {
    width: 100%;
    .item {
      margin: 25px 0 0 0;
      padding: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #f5f5f5;

      .info {
        p {
          line-height: 30px;
          color: #999;
          > span {
            color: #333;
          }
        }
      }

      .action {
        > p {
          margin-top: 15px;
          a {
            padding: 0 10px;
          }
          .edit {
            color: @xtxColor;
          }
          .delete {
            color: @priceColor;
          }
        }
      }
    }
  }
}
</style>

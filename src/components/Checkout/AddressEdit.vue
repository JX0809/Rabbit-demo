<template>
  <XtxDialog v-model:visible="visible">
    <!-- 默认插槽, 表单主体 -->
    <Form
      class="address_edit"
      :validation-schema="mySchema"
      v-slot="{ errors }"
      ref="formTarget"
    >
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <Field
              name="receiver"
              class="input"
              :class="{ error: errors.receiver }"
              placeholder="请输入收货人"
              v-model="addNewAddress.receiver"
            />
          </div>
        </div>
        <!-- 校验失败提示 -->
        <div class="errorTxt" v-if="errors.receiver">{{ errors.receiver }}</div>

        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <Field
              name="contact"
              class="input"
              :class="{ error: errors.contact }"
              placeholder="请输入手机号"
              v-model="addNewAddress.contact"
            />
          </div>
        </div>
        <!-- 校验失败提示 -->
        <div class="errorTxt" v-if="errors.contact">{{ errors.contact }}</div>

        <div class="xtx-form-item location">
          <div class="label">地区：</div>
          <div class="field">
            <Field
              as="XtxCity"
              name="city"
              v-model:fullLocation="addNewAddress.fullLocation"
              :class="{ error: errors.city }"
              placeholder="请选择所在地区"
              @change="getSelectedLocation"
            />
          </div>
        </div>
        <!-- 校验失败提示 -->
        <div class="errorTxt" v-if="errors.city">{{ errors.city }}</div>

        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <Field
              name="address"
              class="input"
              :class="{ error: errors.address }"
              placeholder="请输入详细地址"
              v-model="addNewAddress.address"
            />
          </div>
        </div>
        <!-- 校验失败提示 -->
        <div class="errorTxt" v-if="errors.address">{{ errors.address }}</div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <Field
              name="postalCode"
              class="input"
              :class="{ error: errors.postalCode }"
              placeholder="请输入邮政编码"
              v-model="addNewAddress.postalCode"
            />
          </div>
        </div>
        <!-- 校验失败提示 -->
        <div class="errorTxt" v-if="errors.postalCode">
          {{ errors.postalCode }}
        </div>

        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <Field
              name="label"
              class="input"
              :class="{ error: errors.label }"
              placeholder="请输入地址标签，逗号分隔"
              v-model="addNewAddress.addressTags"
            />
          </div>
        </div>
        <!-- 校验失败提示 -->
        <div class="errorTxt" v-if="errors.label">{{ errors.label }}</div>
      </div>
    </Form>

    <template v-slot:footer>
      <XtxButton size="middle" type="gray" @click="closeDialog">取消</XtxButton>
      <XtxButton size="middle" type="primary" @click="submitAddress"
        >确认</XtxButton
      >
    </template>
  </XtxDialog>
</template>

<script>
import { ref, reactive } from 'vue'
// 表单验证库
import { Form, Field } from 'vee-validate'
// 表单验证规则
import schema from '@/utils/vee-validate-schemas'
import {
  addNewAddressAPI,
  updateAddressAPI
} from '@/api/checkoutAPI/checkoutAPI'
import MessageBox from '@/components/library/message'

export default {
  name: 'AddressEdit',
  components: {
    Form,
    Field
  },
  setup(props, { emit }) {
    const visible = ref(false)

    // 暴露一个方法给父组件 点击 添加地址按钮时 修改visible 的值, 控制对话框的显示隐藏
    const openEditDialog = (addInfo) => {
      visible.value = true
      // 清除校验结果
      formTarget.value.resetForm()
      // 清除/修改表单数据
      for (const key in addNewAddress) {
        if (key === 'isDefault') {
          addNewAddress[key] = 1 // 1 非默认地址
        } else {
          addNewAddress[key] = addInfo[key]
        }
      }
    }
    // 添加或 修改地址提交的参数对象
    const addNewAddress = reactive({
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

    // 表单验证规则
    const mySchema = {
      receiver: schema.receiver,
      contact: schema.mobile,
      city: schema.city,
      postalCode: schema.postalCode,
      address: schema.address,
      label: schema.label
    }

    // 城市组件自定义事件
    const getSelectedLocation = (res) => {
      addNewAddress.provinceCode = res.provinceCode
      addNewAddress.cityCode = res.cityCode
      addNewAddress.countyCode = res.countryCode
      addNewAddress.fullLocation = res.fullLocation
    }

    // 点击确认，验证表单，完成添加或修改功能
    const formTarget = ref(null)
    const submitAddress = async () => {
      const valid = await formTarget.value.validate()
      if (!valid) {
        if (addNewAddress.id) {
          MessageBox({ type: 'warn', text: '修改收货地址失败, 请检查列表信息' })
        } else {
          MessageBox({ type: 'warn', text: '添加收货地址失败, 请检查列表信息' })
        }
      } else {
        if (addNewAddress.id) {
          updateAddressAPI(addNewAddress).then(({ data }) => {
            MessageBox({ type: 'success', text: '修改收货地址成功' })
            emit('updateAddressId', addNewAddress)
            visible.value = false
          })
        } else {
          addNewAddressAPI(addNewAddress).then(({ data }) => {
            MessageBox({ type: 'success', text: '添加收货地址成功' })
            addNewAddress.id = data.result.id
            emit('updateAddressId', addNewAddress)
            visible.value = false
          })
        }
      }
    }

    const closeDialog = () => {
      visible.value = false
    }

    return {
      visible,
      openEditDialog,
      addNewAddress,
      mySchema,
      getSelectedLocation,
      submitAddress,
      closeDialog,
      formTarget
    }
  }
}
</script>

<style lang="less" scoped>
.xtx_dialog {
  /deep/.wrapper {
    width: 780px;
  }
}

.xtx_btn {
  &:first-child {
    margin-right: 20px;
  }
}
.xtx-form {
  padding: 0;
  .xtx-form-item {
    padding-bottom: 0;
    margin-top: 20px;
    .location {
      > .field {
        width: 320px;
        height: 50px;
      }
    }
  }

  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }

    &.error {
      border-color: @priceColor;
    }
  }
  .errorTxt {
    font-size: 12px;
    line-height: 28px;
    color: @priceColor;
    padding-left: 178px;
    i {
      font-size: 14px;
      margin-right: 2px;
    }
  }
}
.xtx_city_container {
  width: 320px;
  padding-left: 0;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;

    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
      color: #333;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>

<template>
  <div class="register_container">
    <h3>新用户注册</h3>
    <Form
      class="xtx-form"
      :validation-schema="mySchema"
      v-slot="{ errors }"
      autocomplete="off"
      ref="formTarget"
    >
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-yonghu"></i>
          <Field
            class="input"
            type="text"
            placeholder="请输入用户名"
            name="account"
            v-model="bindFormData.account"
          />
        </div>
        <!-- 校验失败提示 -->
        <div class="error" v-if="errors.account">
          {{ errors.account }}
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-shouji"></i>
          <Field
            class="input"
            type="text"
            placeholder="请输入手机号"
            name="mobile"
            v-model="bindFormData.mobile"
          />
        </div>
        <!-- 校验失败提示 -->
        <div class="error" v-if="errors.mobile">{{ errors.mobile }}</div>
      </div>

      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-baohu"></i>
          <Field
            class="input"
            type="text"
            placeholder="请输入验证码"
            name="code"
            v-model="bindFormData.code"
          />
          <span class="code" @click="sendCode">
            {{ time === 0 ? '发送验证码' : `${time}秒后发送` }}</span
          >
        </div>
        <!-- 校验失败提示 -->
        <div class="error" v-if="errors.code">{{ errors.code }}</div>
      </div>

      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-mima"></i>
          <Field
            class="input"
            type="password"
            placeholder="请输入密码"
            name="password"
            v-model="bindFormData.password"
          />
        </div>
        <!-- 校验失败提示 -->
        <div class="error" v-if="errors.password">{{ errors.password }}</div>
      </div>

      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-mima"></i>
          <Field
            class="input"
            type="password"
            placeholder="请确认密码"
            name="reconfirmPsw"
            v-model="bindFormData.reconfirmPsw"
          />
        </div>
        <!-- 校验失败提示 -->
        <div class="error" v-if="errors.reconfirmPsw">
          {{ errors.reconfirmPsw }}
        </div>
      </div>

      <!-- 用户协议 -->
      <div class="xtx-form-item">
        <div class="field isAgree">
          <!-- 复选框组件 替换为 Field， 添加as属性指定为 组件-->
          <Field
            as="XtxCheckbox"
            name="isAgree"
            v-model="bindFormData.isAgree"
          ></Field>
          <span>我已阅读并同意</span>
          <a href="javascript:;">《用户服务协议》</a>
        </div>
        <!-- 校验失败提示 -->
        <div class="error" v-if="errors.isAgree">
          {{ errors.isAgree }}
        </div>
      </div>

      <!-- 注册按钮 -->
      <a href="javascript:;" class="submit" @click="registerLogin">立即注册</a>
    </Form>
  </div>
</template>

<script>
import { reactive, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import veeSchema from '@/utils/vee-validate-schemas'
import { Form, Field } from 'vee-validate'
import MessageBox from '@/components/library/message'
import { useIntervalFn } from '@vueuse/core'
import { QQRegisterCodeAPI, registerAPI } from '@/api/loginAPI/loginAPI'

export default {
  name: 'Register',
  components: { Form, Field },
  props: {
    unionId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const bindFormData = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      reconfirmPsw: null,
      isAgree: false
    })

    const mySchema = {
      account: veeSchema.accountChecked,
      mobile: veeSchema.mobile,
      code: veeSchema.code,
      password: veeSchema.password,
      reconfirmPsw: veeSchema.reconfirmPsw,
      isAgree: veeSchema.isAgree
    }

    const time = ref(0)
    const { resume, pause } = useIntervalFn(
      () => {
        time.value--
        if (time.value <= 0) {
          time.value = 0
          pause()
        }
      },
      1000,
      false
    )

    onUnmounted(() => {
      // 组件销毁时停止定时器
      pause()
    })

    const sendCode = async () => {
      const valid = mySchema.mobile(bindFormData.mobile)
      if (valid !== true) {
        MessageBox({ type: 'warn', text: valid })
      } else {
        if (time.value === 0) {
          await QQRegisterCodeAPI(bindFormData.mobile)
          MessageBox({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      }
    }

    const formTarget = ref(null)
    const router = useRouter()
    const store = useStore()

    // 验证整个表单
    const registerLogin = async () => {
      const valid = await formTarget.value.validate()
      if (valid) {
        registerAPI(bindFormData)
          .then(({ data }) => {
            console.log(data)
            MessageBox({ type: 'success', text: '注册成功' })

            // 注册成功， 不是登录状态， 需要登录
            router.push('/login' || store.state.user.redirectUrl || '/')
          })
          .catch(({ e }) => {
            if (e.response.data.message) {
              MessageBox({ type: 'error', text: e.response.data.message })
            } else {
              MessageBox({ type: 'error', text: '注册失败' })
            }
          })
      }
    }

    return {
      bindFormData,
      mySchema,
      time,
      sendCode,
      registerLogin,
      formTarget
    }
  }
}
</script>

<style lang="less" scoped>
.register_container {
  width: 1240px;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 20px;

  > h3 {
    color: #999;
    font-size: 26px;
    font-weight: 400;
    padding-left: 50px;
    height: 100px;
    line-height: 100px;
  }

  .code {
    position: absolute;
    background-color: #f2f2f2;
    text-align: center;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 100px;
    color: #999;
    &:hover {
      cursor: pointer;
    }
  }
  .isAgree {
    height: 25px;
    text-align: center;
  }
}
</style>

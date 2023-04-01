<template>
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
          name="accountChecked"
          v-model="bindFormData.accountChecked"
        />
      </div>
      <!-- 校验失败提示 -->
      <div class="error" v-if="errors.accountChecked">
        {{ errors.accountChecked }}
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
    <a href="javascript:;" class="submit" @click="registerLogin">立即提交</a>
  </Form>
</template>

<script>
import { reactive, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import veeSchema from '@/utils/vee-validate-schemas'
import { Form, Field } from 'vee-validate'
import messageBox from '@/components/library/message'
import { useIntervalFn } from '@vueuse/core'
import { QQRegisterCodeAPI, QQRegisterLoginAPI } from '@/api/loginAPI/loginAPI'

export default {
  name: 'CallbackPatch',
  components: { Form, Field },
  props: {
    unionId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const bindFormData = reactive({
      id: null,
      accountChecked: null,
      mobile: null,
      code: null,
      password: null,
      reconfirmPsw: null
    })

    const mySchema = {
      accountChecked: veeSchema.accountChecked,
      mobile: veeSchema.mobile,
      code: veeSchema.code,
      password: veeSchema.password,
      reconfirmPsw: veeSchema.reconfirmPsw
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
        messageBox({ type: 'warn', text: valid })
      } else {
        if (time.value === 0) {
          await QQRegisterCodeAPI(bindFormData.mobile)
          messageBox({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      }
    }

    const formTarget = ref(null)
    const router = useRouter()
    const store = useStore()

    const registerLogin = async () => {
      const valid = await formTarget.value.validate()
      if (valid) {
        QQRegisterLoginAPI(props.unionId, bindFormData)
          .then(({ data }) => {
            const { id, account, nickname, avatar, token, mobile } = data.result
            store.commit('user/updatedUserProfile', {
              id,
              account,
              nickname,
              avatar,
              token,
              mobile
            })
            messageBox({ type: 'success', text: 'QQ绑定成功' })
            router.push(store.state.user.redirectUr || '/')
          })
          .catch(({ e }) => {
            console.log(e)
            if (e.response.data.message) {
              messageBox({ type: 'error', text: e.response.data.message })
            } else {
              messageBox({ type: 'error', text: '登录失败' })
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

<style scoped lang="less">
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
</style>

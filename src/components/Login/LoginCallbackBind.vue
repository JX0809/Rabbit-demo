<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickname }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <Form
      :validation-schema="mySchema"
      v-slot="{ errors }"
      autocomplete="off"
      ref="formTarget"
    >
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-shouji"></i>
          <Field
            class="input"
            type="text"
            placeholder="绑定的手机号"
            v-model="mobile"
            name="mobile"
          />
        </div>
        <div class="error"></div>
      </div>

      <!-- 校验失败提示 -->
      <div class="error" v-if="errors.mobile">{{ errors.mobile }}</div>

      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-baohu"></i>
          <Field
            class="input"
            type="text"
            placeholder="短信验证码"
            v-model="code"
            name="code"
          />
          <span class="code" @click="sendLoginCode">
            {{ time === 0 ? '发送验证码' : `${time}秒后重发` }}
          </span>
        </div>
        <div class="error"></div>
      </div>

      <!-- 校验失败提示 -->
      <div class="error" v-if="errors.code">{{ errors.code }}</div>

      <a href="javascript:;" class="submit" @click="login">立即绑定</a>
    </Form>
  </div>
</template>

<script>
import { reactive, toRefs, ref, onUnmounted } from 'vue'
import veeSchema from '@/utils/vee-validate-schemas'
import { Form, Field } from 'vee-validate'
import { getMobileCodeAPI, QQBindLoginAPI } from '@/api/loginAPI/loginAPI'
import { useIntervalFn } from '@vueuse/core'
import messageBox from '@/components/library/message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'CallbackBind',
  components: {
    Form,
    Field
  },
  props: {
    nickname: {
      type: String,
      default: 'Tom'
    },
    avatar: {
      type: String,
      default:
        'http://qzapp.qlogo.cn/qzapp/101941968/57C7969540F9D3532451374AA127EE5B/50'
    },
    unionId: {
      type: String,
      default: null
    }
  },
  setup(props) {
    // 定义表单及  表单校验规则
    const form = reactive({
      mobile: null,
      code: null
    })
    // 验证规则
    const mySchema = {
      mobile: veeSchema.mobile,
      code: veeSchema.code
    }

    // 定时器
    const time = ref(0)
    const { pause, resume } = useIntervalFn(
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

    //  有账号，未绑定手机号
    const sendLoginCode = async () => {
      // 验证手机号是否 为空
      const valid = mySchema.mobile(form.mobile)
      if (valid !== true) {
        messageBox({ type: 'warn', text: valid })
      } else {
        if (time.value === 0) {
          await getMobileCodeAPI(form.mobile, props.unionId)
          messageBox({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      }
    }

    const store = useStore()
    const router = useRouter()

    // 点击绑定登录
    const formTarget = ref(null)
    const login = async () => {
      // 验证整个表单

      const valid = await formTarget.value.validate()
      if (valid) {
        QQBindLoginAPI(props.unionId, form.mobile, form.code)
          .then(({ data }) => {
            // 存储数据
            const { id, account, nickname, avatar, token, mobile } = data.result
            store.commit('user/updatedUserProfile', {
              id,
              account,
              nickname,
              avatar,
              token,
              mobile
            })
            messageBox({ type: 'success', text: '登录成功' })
            router.push(store.state.user.redirectUr || '/')
          })
          .catch((e) => {
            if (e.response.data.message) {
              messageBox({ type: 'error', text: e.response.data.message })
            } else {
              messageBox({ type: 'error', text: '登录失败' })
            }
          })
      }
    }

    return {
      ...toRefs(form),
      mySchema,
      formTarget,
      sendLoginCode,
      login,
      time
    }
  }
}
</script>

<style scoped lang="less">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  margin-bottom: 25px;
  padding: 0 10px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 100px;
  text-align: center;
  color: #999;
  background-color: #f2f2f2;
  padding: 0 5px;

  &:hover {
    cursor: pointer;
  }
}

.xtx-form-item {
  padding-bottom: 0;
  ~ .xtx-form-item {
    margin-top: 20px;
  }
}
.submit {
  margin-top: 25px;
}

.error {
  width: 320px;
  height: 28px;
  margin: 0 auto;
  font-size: 12px;
  line-height: 28px;
  color: @priceColor;
  i {
    font-size: 14px;
    margin-right: 2px;
  }
}
</style>

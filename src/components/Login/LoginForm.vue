<template>
  <div class="login_form">
    <!-- 账户登录 -->
    <div class="form_toggle">
      <a href="javascript:;" @click="isMsgLogin = false" v-if="isMsgLogin">
        <i class="iconfont icon-email"></i>
        <span> 使用短信登录</span>
      </a>
      <a href="javascript:;" @click="isMsgLogin = true" v-if="!isMsgLogin">
        <i class="iconfont icon-jurassic_user"></i>
        <span> 使用账号登录</span>
      </a>
    </div>
    <!-- 表单区域 -->
    <!-- 接受校验规则 -->
    <Form
      class="form"
      ref="target"
      :validation-schema="mySchema"
      v-slot="{ errors }"
    >
      <!-- 账号登录 -->
      <template v-if="isMsgLogin === true">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-jurassic_user"></i>
            <!-- name属性绑定对应的校验规则 -->
            <Field
              type="text"
              :class="{ error: errors.account }"
              v-model="account"
              name="account"
              placeholder="请输入用户名"
              autocomplete="off"
            />
          </div>
        </div>
        <!-- 校验失败提示 -->
        <div class="error" v-if="errors.account">{{ errors.account }}</div>

        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-mima"></i>
            <Field
              type="password"
              :class="{ error: errors.password }"
              v-model="password"
              name="password"
              placeholder="请输入密码"
            />
          </div>
        </div>

        <!-- 校验失败提示 -->
        <div class="error" v-if="errors.password">{{ errors.password }}</div>
      </template>
      <!-- <XtxMessage type="success" text="成功"></XtxMessage> -->

      <!-- 手机号码登录 -->
      <template v-if="isMsgLogin === false">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-shouji"></i>
            <Field
              type="text"
              :class="{ error: errors.mobile }"
              v-model="mobile"
              name="mobile"
              placeholder="请输入手机号"
              autocomplete="off"
            />
          </div>
        </div>

        <!-- 校验失败提示 -->
        <div class="error" v-if="errors.mobile">{{ errors.mobile }}</div>

        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-mima"></i>
            <Field
              type="password"
              :class="{ error: errors.code }"
              v-model="code"
              name="code"
              placeholder="请输入验证码"
            />
            <span class="code" @click="sendLoginCode">
              {{ time === 0 ? '发送验证码' : `${time} 秒后发送` }}
            </span>
          </div>
        </div>

        <!-- 校验失败提示 -->
        <div class="error" v-if="errors.code">{{ errors.code }}</div>
      </template>

      <!-- 隐私条款 -->
      <div class="form-item">
        <div class="agree">
          <!-- 复选框组件 替换为 Field， 添加as属性指定为 组件-->
          <Field as="XtxCheckbox" name="isAgree" v-model="isAgree"></Field>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
      </div>

      <!-- 登录按钮 -->
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>

    <!-- QQ 登录 -->
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
      >
        <img
          src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
          alt=""
        />
      </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watch, onMounted, onUnmounted } from 'vue'
// 导入验证
import veeSchema from '@/utils/vee-validate-schemas'
import { Form, Field } from 'vee-validate'

import {
  loginAccountAPI,
  loginMsgAPI,
  getLoginCodeAPI
} from '@/api/loginAPI/loginAPI'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import messageBox from '@/components/library/message'
import { useIntervalFn } from '@vueuse/core'
import QC from 'qc'

export default {
  name: 'LoginForm',
  components: {
    Field,
    Form
  },
  setup() {
    // 账号登录， 短信登录 切换, 默认显示短信登录
    const isMsgLogin = ref(true)

    // 登录提交的表单信息
    const loginData = reactive({
      // 隐私条款
      isAgree: true,
      account: null,
      password: null,
      mobile: null,
      code: null
    })

    const mySchema = {
      account: veeSchema.account,
      password: veeSchema.password,
      mobile: veeSchema.mobile,
      code: veeSchema.code,
      isAgree: veeSchema.isAgree
    }
    // 切换登录方式， 重置表单， 清空错误信息
    const target = ref(null)
    watch(isMsgLogin, () => {
      loginData.isAgree = true
      loginData.account = null
      loginData.password = null
      loginData.mobile = null
      loginData.code = null

      // 清除错误的校验效果
      target.value.resetForm()
    })

    // 点击登录， 对整个表单进行验证
    const store = useStore()
    const router = useRouter()
    // const route = useRoute()

    // 定义 短信验证码定时器
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
      false // 是否立刻开启
    )

    // 组件渲染完毕，使用QC生成QQ登录按钮
    onMounted(() => {
      QC.Login({
        btnId: 'qqLoginBtn'
      })
    })

    // 组件销毁时停止定时器
    onUnmounted(() => {
      pause()
    })

    // 点击发送短信
    const sendLoginCode = async () => {
      // 验证手机号是否为空
      const valid = mySchema.mobile(loginData.mobile)
      if (valid !== true) {
        messageBox({ type: 'warn', text: valid })
      } else {
        if (time.value === 0) {
          await getLoginCodeAPI(loginData.mobile)
          messageBox({ type: 'success', text: '发送成功' })
          time.value = 60
          resume()
        }
      }
    }

    const login = async () => {
      const valid = await target.value.validate()
      // 判断是账户登录还是 手机号登录

      if (valid) {
        let data = null // 存储登录成功后的用户信息
        try {
          // 合并了相同的代码： 请求接口API
          if (!isMsgLogin.value) {
            // 判断短信登录还是 账号登录, 调用不同的API, 给同一个data赋值
            data = await loginMsgAPI(loginData.mobile, loginData.code)
          } else {
            data = await loginAccountAPI(loginData.account, loginData.password)
          }

          // 登录成功的 操作
          // 登录成功, 合并 购物车
          store.dispatch('cart/mergeCart')
          // 存储用户信息
          const { id, account, nickname, avatar, token, mobile } =
            data.data.result
          store.commit('user/updatedUserProfile', {
            id,
            account,
            nickname,
            avatar,
            token,
            mobile
          })

          messageBox({ type: 'success', text: '登录成功' })
          // 登录成功后， 跳转到 访问未遂 的页面或者首页
          // router.push(route.query.pre || '/')
          router.push(store.state.user.redirectUrl || '/')
        } catch (e) {
          // 请求失败的回调
          if (e.response.data.message) {
            messageBox({ type: 'error', text: e.response.data.message })
          } else {
            messageBox({ type: 'error', text: '登录失败' })
          }
        }
      }
    }

    return {
      isMsgLogin,
      ...toRefs(loginData),
      mySchema,
      target,
      login,
      sendLoginCode,
      time
    }
  }
}
</script>

<style lang="less" scoped>
.login_form {
  width: 100%;
  height: 100%;

  .form_toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
    }
  }

  .form {
    padding: 0 40px;
    &-item {
      margin-top: 20px;
      &:first-child {
        margin-top: 0;
      }
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>

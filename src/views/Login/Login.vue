<template>
  <div class="login_container">
    <!-- 头部 -->
    <LoginHeader>
      <!-- 插槽 -->
      欢迎登录
    </LoginHeader>

    <!-- 主体--登录区域-->
    <section class="login_function">
      <div class="login_form_wrapper">
        <div class="wrapper_header">
          <a
            href="javascript:;"
            :class="{ active: loginWay === 'account' }"
            @click="loginWay = 'account'"
            >账户登录</a
          >
          <a
            href="javascript:;"
            :class="{ active: loginWay === 'qrCode' }"
            @click="loginWay = 'qrCode'"
            >扫码登录</a
          >
        </div>
        <!-- 表单 -->
        <div class="account-box" v-if="loginWay === 'account'">
          <LoginForm></LoginForm>
        </div>

        <!-- 二维码 -->
        <div class="qrcode-box" v-if="loginWay === 'qrCode'">
          <img src="@/assets/images/qrcode.jpg" alt="" />
          <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <LoginFooter></LoginFooter>
  </div>
</template>

<script>
import { ref } from 'vue'
import LoginHeader from '@/components/Login/LoginHeader.vue'
import LoginFooter from '@/components/Login/LoginFooter.vue'
import LoginForm from '@/components/Login/LoginForm.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginFooter,
    LoginForm
  },
  setup() {
    const loginWay = ref('account')
    const store = useStore()
    const route = useRoute()
    store.commit('user/setRedirectUrl', route.query.redirectUrl)

    return { loginWay }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 100%;
  background-color: #fff;

  .login_function {
    width: 100%;
    height: 488px;
    position: relative;
    background: url(../../assets/images/login-bg.png) no-repeat center;

    .login_form_wrapper {
      position: absolute;
      top: 54px;
      left: 50%;
      width: 380px;
      min-height: 400px;
      background-color: #fff;
      transform: translate3d(100px, 0, 0);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

      .wrapper_header {
        display: flex;
        height: 55px;
        width: 100%;
        text-align: right;
        line-height: 55px;
        border-bottom: 1px solid #f5f5f5;
        padding: 0 40px;

        > a {
          flex: 1;
          font-size: 18px;
          color: #333;
          &:first-child {
            border-right: 1px solid #f5f5f5;
            text-align: left;
          }
          &.active {
            color: #27ba9b;
            font-weight: 700;
          }
        }
      }
      .wrapper_body {
        width: 100%;
        height: 100%;
      }
    }

    .qrcode-box {
      text-align: center;
      padding-top: 40px;
      p {
        margin-top: 20px;
        a {
          color: @xtxColor;
          font-size: 16px;
        }
      }
    }
  }
}
</style>

<template>
  <LoginHeader>联合登录</LoginHeader>

  <!-- loading 效果 -->

  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>

  <!-- w未绑定/未注册 -->
  <section class="container-form" v-else>
    <div class="form">
      <nav class="tab">
        <a
          @click="hasAccount = true"
          :class="{ active: hasAccount }"
          href="javascript:;"
        >
          <i class="iconfont icon-attachment" />
          <span>已有小兔鲜账号，请绑定手机</span>
        </a>
        <a
          @click="hasAccount = false"
          :class="{ active: !hasAccount }"
          href="javascript:;"
        >
          <i class="iconfont icon-edit" />
          <span>没有小兔鲜账号，请完善资料</span>
        </a>
      </nav>

      <div class="tab-content" v-if="hasAccount">
        <LoginCallbackBind
          :nickname="nickname"
          :avatar="avatar"
          :unionId="unionId"
        ></LoginCallbackBind>
      </div>

      <div class="tab-content" v-else>
        <LoginCallbackRegister :unionId="unionId" />
      </div>
    </div>
  </section>

  <LoginFooter />
</template>

<script>
import { ref } from 'vue'
import LoginHeader from '@/components/Login/LoginHeader.vue'
import LoginFooter from '@/components/Login/LoginFooter.vue'
import LoginCallbackBind from '@/components/Login/LoginCallbackBind.vue'
import LoginCallbackRegister from '@/components/Login/LoginCallbackRegister.vue'
import QC from 'qc'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import messageBox from '@/components/library/message'
import { QQLoginAPI } from '@/api/loginAPI/loginAPI'

export default {
  name: 'PageCallback',
  components: {
    LoginHeader,
    LoginFooter,
    LoginCallbackBind,
    LoginCallbackRegister
  },
  setup() {
    const hasAccount = ref(true)
    const nickname = ref(null)
    const avatar = ref(null)

    const isBind = ref(true)

    const router = useRouter()
    const store = useStore()

    /**
     * 1. 默认已注册小兔鲜账号， 已绑定手机号:  QQ扫码成功后， 跳回联合登录页， 先先显示loading效果， 再跳回来源页或首页
     * 2. 有账号，未绑定手机号
     * 3. 没有小兔仙账号， 没绑定手机号
     */
    const unionId = ref(null)
    //  QQ 扫码成功的状态下
    if (QC.Login.check()) {
      // 获取QQ 用户的 用户名和头像
      QC.api('get_user_info').success((res) => {
        avatar.value = res.data.figureurl_1
        nickname.value = res.data.nickname
      })

      // 1. 默认已注册小兔鲜账号， 已绑定手机号
      // 获取QQ的 id 发起 登录请求
      QC.Login.getMe((openId) => {
        unionId.value = openId
        QQLoginAPI(openId)
          .then(({ data }) => {
            // 存储用户信息
            const { id, account, avatar, mobile, nickname, token } = data.result
            store.commit('user/updatedUserProfile', {
              id,
              account,
              avatar,
              mobile,
              nickname,
              token
            })

            // 登录成功, 合并 购物车
            store.dispatch('cart/mergeCart')
            router.push(store.state.user.redirectUrl)
            messageBox({ type: 'success', text: '登录成功' })
            // 登录成功显示loading后 直接跳转页面
          })
          .catch((e) => {
            // 登录失败， 不显示loading
            isBind.value = false
          })
      })
    }

    return { hasAccount, nickname, avatar, isBind, unionId }
  }
}
</script>

<style scoped lang="less">
.container-form {
  padding: 25px 0;
  background-color: #f2f2f2;
  .form {
    width: 1240px;
    margin: 0 auto;
    background-color: #fff;
  }
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}

.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/images/load.gif) no-repeat center /
        100px 100px;
    }
  }
}

.login_header_container {
  background-color: #fff;
}
</style>

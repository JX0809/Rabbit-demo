<template>
  <div class="nav_top_container">
    <ul>
      <template v-if="profile.token">
        <li>
          <a href="#">{{ $store.state.user.profile.nickname }}</a>
        </li>
        <li><a href="javascript:;" @click="logout">退出登录</a></li>
      </template>
      <template v-else>
        <li><router-link to="/login">请先登录</router-link></li>
        <li><a href="">免费注册</a></li>
      </template>
      <li>
        <a href="javascript:;" @click="$router.push('/member/order')"
          >我的订单</a
        >
      </li>
      <li>
        <a href="javascript:;" @click="$router.push('/member')">会员中心</a>
      </li>
      <li><a href="">帮助中心</a></li>
      <li><a href="">关于我们</a></li>
      <li>
        <a href=""> <i class="iconfont icon-shouji"></i> 手机版</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'NavTop',
  setup() {
    const store = useStore()
    const router = useRouter()

    // 退出登录
    const profile = computed(() => {
      return store.state.user.profile
    })
    const logout = () => {
      // 清空用户信息
      store.commit('user/clearState', {})
      // 清空购物车数据
      store.commit('cart/setCartList', [])
      router.push('/login')
    }
    return { logout, profile }
  }
}
</script>

<style lang="less" scoped>
.nav_top_container {
  width: 100%;
  background-color: #333333;
}
ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1240px;
  margin: 0 auto;
  height: 53px;
  font-size: 14px;

  li {
    a {
      color: #cdcdcd;
      padding: 0 15px;

      i {
        font-size: 14px;
      }
    }
    a:hover {
      color: @xtxColor;
      cursor: pointer;
    }

    ~ li {
      a {
        border-left: 2px solid #666;
      }
    }
  }
}
</style>

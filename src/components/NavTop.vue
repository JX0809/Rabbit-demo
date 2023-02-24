<template>
  <div class="nav_top_container">
    <ul>
      <template v-if="$store.state.user.profile.token">
        <li><a href="#">用户名</a></li>
        <li><a href="">退出登录</a></li>
      </template>
      <template v-else>
        <li><a href="#">请先登录</a></li>
        <li><a href="">免费注册</a></li>
      </template>
      <li><a href="">我的订单</a></li>
      <li><a href="">会员中心</a></li>
      <li><a href="">帮助中心</a></li>
      <li><a href="">关于我们</a></li>
      <li>
        <a href=""> <i class="iconfont icon-shouji"></i> 手机版</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavTop'
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

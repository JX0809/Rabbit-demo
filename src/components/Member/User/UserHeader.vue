<template>
  <div class="user_Header">
    <div class="user_meta">
      <div class="avatar">
        <img :src="$store.state.user.profile.avatar" />
      </div>
      <h4>
        {{
          $store.state.user.profile.nickname ||
          $store.state.user.profile.account
        }}
      </h4>
    </div>
    <div class="item">
      <a href="javascript:;">
        <span><i class="iconfont icon-huiyuanzhongxin"></i></span>
        <p>会员中心</p>
      </a>
      <a href="javascript:;">
        <span><i class="iconfont icon-shezhi"></i></span>
        <p>安全设置</p>
      </a>
      <a href="javascript:;">
        <span><i class="iconfont icon-shouhuodizhi"></i></span>
        <p>地址管理</p>
      </a>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.user_Header {
  width: 100%;
  height: 132px;
  background: url('@/assets/images/center-bg.png') no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: space-between;

  .user_meta {
    display: flex;
    align-items: center;
    flex: 1;
    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      margin-left: 60px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    h4 {
      padding-left: 26px;
      color: #fff;
      font-size: 18px;
    }
  }
  .item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;

    > a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      color: #fff;

      > span {
        .iconfont {
          font-size: 32px;
        }
      }
      p {
        font-size: 16px;
      }
    }
  }
}
</style>

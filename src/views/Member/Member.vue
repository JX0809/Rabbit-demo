<template>
  <div class="member_container">
    <div class="container">
      <!-- 左侧菜单选项栏 -->
      <MemberAside></MemberAside>

      <!-- 右侧主题内容栏 -->
      <div class="member_body">
        <!-- 默认子路由为 个人中心 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import MemberAside from '@/components/Member/MemberAside.vue'
</script>

<style lang="less" scoped>
.member_container {
  width: 100%;
  height: 100%;

  .container {
    width: 1240px;
    height: 100%;
    padding: 20px 0 0 0;
    margin: 0 auto;
    display: flex;

    .member_body {
      width: 100%;
      // background-color: #fff;
    }
  }
}
</style>

<template>
  <div class="user_info_container">
    <nav class="tab_head">
      <a
        href="javascript:;"
        @click="currentCom = 'UserInfo'"
        :class="{ active: currentCom === 'UserInfo' }"
        >基本信息</a
      >
      <a
        href="javascript:;"
        @click="currentCom = 'UserLike'"
        :class="{ active: currentCom === 'UserLike' }"
        >兴趣爱好</a
      >
      <a
        href="javascript:;"
        @click="currentCom = 'UserSize'"
        :class="{ active: currentCom === 'UserSize' }"
        >我的尺码</a
      >
    </nav>
    <section class="tab_body">
      <component :is="currentCom"></component>
    </section>
  </div>
</template>

<script>
import UserInfo from '@/components/Member/User/UserInfo.vue'
import UserLike from '@/components/Member/User/UseLike.vue'
import UserSize from '@/components/Member/User/UserSize.vue'
import { ref } from 'vue'

export default {
  name: 'UserProfile',
  components: {
    UserInfo,
    UserSize,
    UserLike
  },
  setup() {
    const currentCom = ref('UserInfo')

    return { currentCom }
  }
}
</script>

<style lang="less" scoped>
.user_info_container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .tab_head {
    height: 60px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    border-bottom: 1px solid #f5f5f5;
    > a {
      height: 100%;
      width: 100px;
      padding: 0 20px;
      line-height: 59px;
      text-align: center;
      border-top: 2px solid transparent;
      border-right: 1px solid #f5f5f5;

      &.active {
        color: @xtxColor;
        border-top-color: @xtxColor;
      }
    }
  }
}
</style>

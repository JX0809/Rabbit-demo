<template>
  <div class="user_center">
    <!-- 头部概览 -->
    <UserHeader></UserHeader>

    <!-- 面板组件--我的足迹，我的收藏 -->
    <UserPanel title="我的收藏" v-if="collectList">
      <GoodsItem
        v-for="item in collectList.items"
        :key="item.id"
        :itemGoods="item"
      ></GoodsItem>
    </UserPanel>

    <UserPanel title="我的足迹" v-if="historyList">
      <GoodsItem
        v-for="item in historyList.items"
        :key="item.id"
        :itemGoods="item"
      ></GoodsItem>
    </UserPanel>

    <!-- 猜你喜欢 -->
    <GoodsRecommend></GoodsRecommend>
  </div>
</template>

<script setup>
import UserHeader from '@/components/Member/User/UserHeader.vue'
import UserPanel from '@/components/Member/User/UserPanel.vue'
import GoodsItem from '@/components/CategoryPage/GoodsItem.vue'
import GoodsRecommend from '@/components/Goods/GoodsRecommend.vue'
import { ref } from 'vue'
import {
  getMyCollectListAPI,
  getMyViewHistoryListAPI
} from '@/api/memberAPI/memberAPI'

// 获取我的收藏
const collectList = ref(null)
const reqParams = {
  page: 1,
  pageSize: 4,
  collectType: 1
}
getMyCollectListAPI(reqParams).then(({ data }) => {
  collectList.value = data.result
})

// 获取我的足迹
const historyList = ref(null)
const historyParams = {
  page: 1,
  pageSize: 4
}

getMyViewHistoryListAPI(historyParams).then(({ data }) => {
  historyList.value = data.result
})
</script>

<style lang="less" scoped>
/deep/.goods_recommend_container {
  margin-top: 20px;
}
</style>

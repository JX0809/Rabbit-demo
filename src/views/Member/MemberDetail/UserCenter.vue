<template>
  <div class="user_center">
    <!-- 头部概览 -->
    <UserHeader></UserHeader>

    <!-- 面板组件--我的足迹，我的收藏 -->
    <!-- 我的收藏 -->
    <UserPanel title="我的收藏" v-if="collectList">
      <!-- 具名插槽查看更多组件 -->
      <template v-slot:more>
        <XtxMore></XtxMore>
      </template>
      <template v-if="collectList.items.length">
        <GoodsItem
          v-for="item in collectList.items"
          :key="item.id"
          :itemGoods="item"
        ></GoodsItem>
      </template>
      <template v-else>
        <h3>
          暂无收藏商品，
          <router-link to="/">点击查看更多商品信息</router-link>
        </h3>
      </template>
    </UserPanel>

    <UserPanel title="我的足迹" v-if="historyList">
      <!-- 具名插槽查看更多组件 -->
      <template v-slot:more>
        <XtxMore to="/member/footprint"></XtxMore>
      </template>
      <template v-if="historyList.items.length">
        <GoodsItem
          v-for="item in historyList.items"
          :key="item.id"
          :itemGoods="item"
        ></GoodsItem>
      </template>
      <template v-else>
        <h3>
          暂无浏览记录，
          <router-link to="/">点击查看更多商品信息</router-link>
        </h3>
      </template>
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

/deep/ .goods-item {
  display: block;
  width: 249px;
}

h3 {
  width: 100%;
  font-size: 18px;
  color: #999999;
  text-align: center;
  font-weight: 400;

  > a {
    color: @xtxColor;
    font-size: 16px;
  }
}
</style>

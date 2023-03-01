<template>
  <div class="home_recommend_container">
    <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
      <template v-slot:more>
        <XtxMore></XtxMore>
      </template>

      <!-- 主体内容 -->
      <div class="goods_body">
        <ul class="goods_list">
          <li class="hoverShadow" v-for="item in recommendList" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" alt="" />
              <p class="goods_name">{{ item.title }}</p>
              <p class="goods_desc">{{ item.alt }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from '@/components/HomePage/HomePanel.vue'

import { homeRecommendAPI } from '@/api/homeAPI/homeAPI'
import { ref } from 'vue'

export default {
  name: 'HomeRecommend',
  components: {
    HomePanel
  },
  setup() {
    const recommendList = ref([])
    homeRecommendAPI().then((data) => {
      recommendList.value = data.data.result
    })
    return {
      recommendList
    }
  }
}
</script>

<style lang="less" scoped>
.home_recommend_container {
  width: 100%;
  height: 541px;

  .goods_body {
    width: 100%;
    height: 426px;
    padding-bottom: 20px;
  }
  .goods_list {
    width: 100%;
    height: 406px;
    display: flex;
    > li {
      width: 306px;
      height: 100%;
      text-align: center;
      a {
        font-size: 22px;
        img {
          width: 306px;
          height: 306px;
        }
        .goods_name {
          padding-top: 12px;
          color: #333;
        }
        .goods_desc {
          font-size: 18px;
          padding-top: 12px;
          color: #999;
        }
      }
      ~ li {
        margin-left: 5px;
      }
    }
  }
}
</style>

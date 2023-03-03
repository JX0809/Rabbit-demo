<template>
  <div class="home_product_container" ref="lazyBox">
    <HomePanel v-for="item in productList" :key="item.id" :title="item.name">
      <template v-slot:more>
        <!-- 二级标题 -->
        <div class="sub">
          <router-link
            to="/"
            v-for="subItem in item.children"
            :key="subItem.id"
          >
            {{ subItem.name }}
          </router-link>
        </div>
        <!-- 查看全部 -->
        <XtxMore></XtxMore>
      </template>

      <!-- 面板主体 -->

      <div class="goods_body" v-if="productList.length">
        <!-- 左侧图片 -->
        <div class="cover_img">
          <router-link to="/">
            <!-- <img :src="item.picture" alt="" /> -->
            <img v-lazyLoad="item.picture" alt="" />
            <strong class="label">
              <span>{{ item.name }}馆</span>
              <span>{{ item.saleInfo }}</span>
            </strong>
          </router-link>
        </div>

        <!-- 右侧商品信息 -->
        <HomeProductsGoods :productList="item.goods"></HomeProductsGoods>
      </div>
      <!-- 骨架 -->
      <div class="skeleton" v-else>
        <XtxSkeleton width="1240px" height="610px" animated> </XtxSkeleton>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from '@/components/HomePage/HomePanel.vue'
import XtxMore from '../library/xtx-more.vue'
import HomeProductsGoods from '@/components/HomePage/HomeProductGoods.vue'
import { homeProductsAPI } from '@/api/homeAPI/homeAPI'
import { useLazyLoadData } from '@/hook'
import { ref } from 'vue'

export default {
  name: 'HomeProducts',
  components: { HomePanel, XtxMore, HomeProductsGoods },
  setup() {
    const lazyBox = ref(null)
    const { result } = useLazyLoadData(homeProductsAPI, lazyBox)

    return {
      productList: result,
      lazyBox
    }
  }
}
</script>

<style lang="less" scoped>
.home_product_container {
  width: 100%;
  .sub {
    margin-right: 80px;
    a {
      padding: 5px;
    }
  }
  .goods_body {
    width: 100%;
    height: 610px;
    display: flex;

    .cover_img {
      width: 240px;
      height: 610px;
      margin-right: 10px;

      > a {
        position: relative;
        img {
          width: 240px;
          height: 610px;
          object-fit: cover;
        }

        > strong {
          position: absolute;
          top: 50%;
          left: 94px;
          width: 188px;
          height: 66px;
          display: flex;
          transform: translateX(-50%);
          font-size: 18px;
          color: #fff;
          text-align: center;
          line-height: 66px;
          span {
            padding: 0 5px;
          }
          span:first-child {
            background-color: rgba(0, 0, 0, 1);
          }
          span:last-child {
            flex: 1;
            background-color: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
  }
}
</style>

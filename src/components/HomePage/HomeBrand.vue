<template>
  <div class="home_brand_container">
    <HomePanel title="热门品牌" subTitle="国际经典 品质保证">
      <template v-slot:more>
        <!-- router-link 改为 span： 路由跳转 默认页面滚动回顶部 -->
        <span
          class="preBtn"
          :class="{ disable: index === 0 }"
          @click="toggle(-1)"
        >
          <i class="iconfont icon-arrow-left"></i>
        </span>
        <span
          class="nextBtn"
          :class="{ disable: index === 1 }"
          @click="toggle(1)"
        >
          <i class="iconfont icon-arrow-right"></i>
        </span>
      </template>

      <!-- 主体内容 -->
      <div class="goods_body" ref="lazyBox">
        <transition name="fade">
          <ul
            class="goods_list"
            :style="{ transform: `translateX(${-index * 1240}px)` }"
            v-if="brandList.length"
          >
            <li
              class="goods_item hoverShadow"
              v-for="item in brandList"
              :key="item.id"
            >
              <router-link to="/">
                <img :src="item.picture" alt="" />
              </router-link>
            </li>
          </ul>

          <!-- 骨架 -->
          <div v-else class="skeleton">
            <XtxSkeleton
              v-for="i in 5"
              :key="i"
              width="240px"
              height="305px"
              animated
            >
            </XtxSkeleton>
          </div>
        </transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from '@/components/HomePage/HomePanel.vue'

import { homeBrandAPI } from '@/api/homeAPI/homeAPI'
import { ref } from 'vue'
import { useLazyLoadData } from '@/hook'

export default {
  name: 'HomeRecommend',
  components: {
    HomePanel
  },
  setup() {
    // const brandList = ref([])
    // homeBrandAPI().then((data) => {
    //   brandList.value = data.data.result
    // })
    const lazyBox = ref(null)
    const { result } = useLazyLoadData(() => homeBrandAPI(10), lazyBox)

    // 点击按钮切换图片
    const index = ref(0)
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }

    return {
      brandList: result,
      lazyBox,
      toggle,
      index
    }
  }
}
</script>

<style lang="less" scoped>
.home_brand_container {
  width: 100%;
  height: 345px;

  .preBtn,
  .nextBtn {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    background-color: @xtxColor;
  }
  .disable {
    cursor: not-allowed;
    background-color: #ccc;
  }
  .goods_body {
    // width: 100%;
    height: 305px;
    padding-bottom: 40px;
    overflow: hidden;
  }

  .goods_list {
    width: 2500px;
    height: 305px;
    transition: all 0.5s linear;

    > li {
      width: 240px;
      height: 100%;
      margin-right: 10px;
      text-align: center;
      float: left;

      a {
        font-size: 22px;
        img {
          width: 240px;
          height: 305px;
        }
      }
    }
  }

  .skeleton {
    width: 2500px;
    overflow: hidden;
    .xtx-skeleton {
      margin-right: 10px;
    }
  }
}
</style>

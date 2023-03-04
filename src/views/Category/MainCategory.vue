<template>
  <div class="main_category_container">
    <div class="container">
      <!-- 面包屑 -->
      <!-- bread 和 breaditem 的父组件都是 MainCate 父组件把 item 以插槽的形式填充到 bread -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="currCateList.id">
            {{ currCateList.name }}
          </XtxBreadItem>
        </transition>
      </XtxBread>

      <!-- 轮播图 -->
      <xtx-carousel
        style="height: 500px"
        :sliders="sliders"
        autoPlay
      ></xtx-carousel>

      <!-- 所有二级分类 -->
      <div class="sub_list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in currCateList.children" :key="item.id">
            <router-link :to="`/category/sub/${item.id}`">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 不同分类商品 -->
      <div
        class="goods_item_container"
        v-for="item in subCateList"
        :key="item.id"
      >
        <div class="head">
          <h3>{{ item.name }}</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <!-- <p class="tag">{{ item.decs }}</p> -->
          <XtxMore></XtxMore>
        </div>
        <div class="goods_body">
          <!-- goods 是数组， 里面的每一项是 对象。 props 传参， 格式应该是对象 -->
          <GoodsItem
            v-for="goods in item.goods"
            :key="goods.id"
            :itemGoods="goods"
          ></GoodsItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/CategoryPage/GoodsItem.vue'
import { homeCarouselAPI } from '@/api/homeAPI/homeAPI'
import { mainCateListAPI } from '@/api/categoryAPI/cateListAPI'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'MainCategory',
  components: { GoodsItem },
  setup() {
    // 轮播图
    const sliders = ref([])
    homeCarouselAPI().then((data) => {
      sliders.value = data.data.result
    })

    // 所有二级分类
    // 从vuex获取分类数据
    const store = useStore()
    const route = useRoute()

    //  获取当前一级分类数据
    const currCateList = computed(() => {
      // 在所有分类数据中找出当前项： id相等： 当前id=路径id
      let cate = {}
      // array.find() 找到 返回该项
      const currentItem = store.state.category.list.find((item) => {
        return item.id === route.params.id
      })
      if (currentItem) cate = currentItem
      return cate
    })

    // 所有二级分类商品
    const subCateList = ref([])
    const getSubList = () => {
      mainCateListAPI(route.params.id).then((data) => {
        subCateList.value = data.data.result.children
      })
    }
    // 切换一级分类。 只有面包屑导航变了，内容不变：只有路由跳转时，才会初始化组件。 切换一级分类路由是相同的，只是数路径参数变了
    watch(
      // 一级路径参数变化时
      () => route.params.id,
      (newVal) => {
        // route.path 路径含路径参数， 不含查询参数
        if (newVal && `/category/${newVal}` === route.path) getSubList()
      },
      {
        immediate: true
      }
    )
    return {
      sliders,
      currCateList,
      subCateList
    }
  }
}
</script>

<style lang="less" scoped>
.main_category_container {
  width: 100%;
  .container {
    width: 1240px;
    margin: 0 auto;

    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }
    .sub_list {
      width: 100%;
      margin-top: 20px;
      background-color: #fff;
      ul {
        display: flex;
        padding: 0 32px;
        flex-wrap: wrap;
        li {
          width: 168px;
          height: 160px;
          a {
            text-align: center;
            display: block;
            font-size: 16px;
            img {
              width: 100px;
              height: 100px;
            }
            p {
              line-height: 40px;
            }
            &:hover {
              color: @xtxColor;
            }
          }
        }
      }
    }
    .goods_item_container {
      width: 100%;
      background-color: #fff;
      margin-top: 20px;

      .head {
        position: relative;
        height: 128px;
        .tag {
          position: relative;
          top: -20px;
          text-align: center;
          color: #999;
          font-size: 20px;
        }
        .xtx_more_container {
          position: absolute;
          top: 20%;
          right: 0px;
        }
      }
      .goods_body {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0 65px 30px;
      }
    }
  }
}
</style>

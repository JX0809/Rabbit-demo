<template>
  <div class="sub_category_container">
    <div class="container">
      <SubCategoryBread></SubCategoryBread>

      <!-- 筛选区 -->
      <SubFilter @filterChange="changeFilter"></SubFilter>

      <!-- 商品列表区 -->
      <div class="subCate_Goods">
        <!-- 头部排序 -->
        <SubSort @sortChange="changeSort"></SubSort>
        <!-- 商品列表 -->
        <ul v-if="goodsList">
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :itemGoods="item"></GoodsItem>
          </li>
        </ul>

        <!-- loading 效果 -->
        <XtxInfiniteLoading
          @infinite="geCateGoodsList"
          :loading="loading"
          :finished="finished"
        ></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import SubCategoryBread from '@/components/CategoryPage/SubCategoryBread.vue'
import SubFilter from '@/components/CategoryPage/SubFilter.vue'
import SubSort from '@/components/CategoryPage/SubSort.vue'
import GoodsItem from '@/components/CategoryPage/GoodsItem.vue'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getSubCateGoodsListAPI } from '@/api/categoryAPI/cateListAPI'

export default {
  name: 'SubCategory',
  components: {
    SubCategoryBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup() {
    const route = useRoute()

    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 基本请求参数
    let apiParams = {
      pagesize: 20,
      page: 1
    }
    // 进入无限加载组件 可视区就会触发函数: 请求得到10条数据，往下拉又进入可视区，又触发函数
    const geCateGoodsList = () => {
      loading.value = true
      apiParams.categoryId = route.params.id
      getSubCateGoodsListAPI(apiParams).then(({ data }) => {
        if (data.result.items.length) {
          // 请求的结果不为空
          goodsList.value.push(...data.result.items)
          apiParams.page++ // 请求页码++
        } else {
          // 请求结果为空，代表加载完毕
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }

    // 切换二级分类， 商品列表数据不变问题
    watch(
      () => route.params.id,
      (newVal) => {
        console.log(11)
        if (newVal && route.path === `/category/sub/${newVal}`) {
          goodsList.value = []
          apiParams = {
            page: 1,
            pageSize: 20
          }
          finished.value = false
        }
      },
      {
        immediate: true
      }
    )

    // 点击筛选区，请求数据
    const changeFilter = (filterParams) => {
      apiParams = { ...apiParams, ...filterParams }
      apiParams.page = 1
      goodsList.value = []
      finished.value = false
    }

    // 点击排序区， 请求数据
    const changeSort = (sortParams) => {
      apiParams = { ...apiParams, ...sortParams }
      apiParams.page = 1
      goodsList.value = []
      finished.value = false
    }

    return {
      geCateGoodsList,
      loading,
      finished,
      goodsList,
      changeFilter,
      changeSort
    }
  }
}
</script>

<style lang="less" scoped>
.sub_category_container {
  width: 100%;
  .container {
    width: 1240px;
    margin: 0 auto;

    .subCate_Goods {
      width: 100%;
      padding: 0 25px;
      margin-top: 25px;
      background-color: #fff;

      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 5px;
        li {
          margin-right: 20px;
          margin-bottom: 20px;
          &:nth-child(5n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>

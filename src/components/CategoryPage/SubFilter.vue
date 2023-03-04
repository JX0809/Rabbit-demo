<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterList">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          :class="{ active: filterList.activeId === item.id }"
          v-for="item in filterList.brands"
          :key="item.id"
          @click="filterList.activeId = item.id"
          >{{ item.name }}
        </a>
      </div>
    </div>
    <!-- 销售属性 -->
    <div class="item" v-for="prop in filterList.saleProperties" :key="prop.id">
      <div class="head">{{ prop.name }}</div>
      <div class="body">
        <a
          href="javascript:;"
          :class="{ active: filterList.activeId === item.id }"
          v-for="item in prop.properties"
          :key="item.id"
          @click="filterList.activeId = item.id"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { subFilterListAPI } from '@/api/categoryAPI/cateListAPI'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubFilter',
  setup() {
    const route = useRoute()
    const filterList = ref(null)
    const getFilterList = () =>
      subFilterListAPI(route.params.id).then(({ data }) => {
        // 解构
        data.result.activeId = null
        data.result.brands.unshift({ id: null, name: '全部' })
        data.result.saleProperties.forEach((item) => {
          item.properties.unshift({ id: null, name: '全部' })
        })
        filterList.value = data.result
      })

    watch(
      // 监听二级分类切换， 调用API 函数
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) getFilterList()
      },
      { immediate: true }
    )

    return {
      filterList
    }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  width: 100%;
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>

<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterList">
    <!-- 品牌： -->
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:;"
          :class="{ active: filterList.activeBrand === item.id }"
          v-for="item in filterList.brands"
          :key="item.id"
          @click="changeBrand(item.id)"
          >{{ item.name }}
        </a>
      </div>
    </div>
    <!-- 销售属性 -->
    <div class="item" v-for="prop in filterList.saleProperties" :key="prop.id">
      <div class="head">{{ prop.name }}</div>
      <div class="body">
        <!-- 销售属性的属性 -->
        <a
          href="javascript:;"
          :class="{ active: prop.activeProp === item.id }"
          v-for="item in prop.properties"
          :key="item.id"
          @click="changeAttr(prop, item.id)"
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
  setup(props, { emit }) {
    const route = useRoute()
    const filterList = ref(null)
    const getFilterList = () =>
      // 获取当前 二级分类下的 品牌数据 和 销售属性: 品牌和销售属性里的属性都有一个全部属性， 请求的数据里没有。 获取到数据后 forEach 添加
      subFilterListAPI(route.params.id).then(({ data }) => {
        // 解构
        // 当前选中的品牌
        data.result.activeBrand = null
        data.result.brands.unshift({ id: null, name: '全部' })
        data.result.saleProperties.forEach((item) => {
          // 当前选中的属性
          item.activeProp = null
          item.properties.unshift({ id: null, name: '全部' })
        })
        filterList.value = data.result
      })
    watch(
      // 监听二级分类切换， 调用API 函数获取当前二级分类数据
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) getFilterList()
      },
      { immediate: true }
    )

    // 获取筛选区选中激活的品牌id， 和 属性id, 传给父组件当做API 请求数据
    // 数据格式: filterParams:{brandId:xxx, attr: [{ groupName: xx, propertyName: xx }]}
    const getFilterParams = () => {
      const filterParams = {}
      const attrs = []
      // 获取品牌id
      filterParams.brandId = filterList.value.activeBrand
      // saleProperties.p里都有一个激活属性activeProp = 属性property.item.id
      filterList.value.saleProperties.forEach((prop) => {
        // 找到所有 激活的属性项  项id=激活属性
        const attr = prop.properties.find((attr) => attr.id === prop.activeProp)
        // 给请求参数赋值
        if (attr && attr.id !== undefined) {
          attrs.push({ groupName: prop.name, propertyName: attr.name })
        }
      })
      if (attrs.length) filterParams.attrs = attrs
      return filterParams
    }
    // 点击筛选条件，选中当前项， 触发自定义事件， 请求API 函数获取对应的商品数据
    const changeBrand = (brandId) => {
      if (filterList.value.activeBrand === brandId) return
      filterList.value.activeBrand = brandId
      emit('filterChange', getFilterParams())
    }

    const changeAttr = (prop, attrId) => {
      if (prop.activeProp === attrId) return
      prop.activeProp = attrId
      emit('filterChange', getFilterParams())
    }

    return {
      filterList,
      getFilterParams,
      changeBrand,
      changeAttr
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

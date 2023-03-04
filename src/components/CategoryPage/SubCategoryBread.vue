<template>
  <div class="subcategory_bread_container">
    <!-- 面包屑 -->
    <XtxBread>
      <XtxBreadItem to="/">首页</XtxBreadItem>
      <XtxBreadItem
        v-if="subCategory.mainCate"
        :to="`/category/${subCategory.mainCate.id}`"
      >
        {{ subCategory.mainCate.name }}
      </XtxBreadItem>
      <transition name="fade-right">
        <XtxBreadItem
          v-if="subCategory.subCate"
          :to="`/category/sub/${subCategory.subCate.id}`"
          :key="subCategory.subCate.id"
        >
          {{ subCategory.subCate.name }}</XtxBreadItem
        >
      </transition>
    </XtxBread>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { computed } from 'vue'

export default {
  name: 'SubCategoryBread',

  setup() {
    const store = useStore()
    const route = useRoute()
    const subCategory = computed(() => {
      const cateObj = {}
      // 获取一二级分类
      store.state.category.list.forEach((item) => {
        item.children &&
          item.children.forEach((sub) => {
            if (sub.id === route.params.id) {
              cateObj.mainCate = { id: item.id, name: item.name }
              cateObj.subCate = { id: sub.id, name: sub.name }
            }
          })
      })
      return cateObj
    })

    return {
      subCategory
    }
  }
}
</script>

<style lang="less" scoped>
.category_bread_container {
  width: 1240px;
}
</style>

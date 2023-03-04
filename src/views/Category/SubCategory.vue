<template>
  <div class="sub_category_container">
    <div class="container">
      <SubCategoryBread></SubCategoryBread>

      <!-- 筛选区 -->
      <SubFilter></SubFilter>
    </div>
  </div>
</template>

<script>
import SubCategoryBread from '@/components/CategoryPage/SubCategoryBread.vue'
import SubFilter from '@/components/CategoryPage/SubFilter.vue'

export default {
  name: 'SubCategory',
  components: {
    SubCategoryBread,
    SubFilter
  }
}
</script>

<style lang="less" scoped>
.sub_category_container {
  width: 100%;
  .container {
    width: 1240px;
    margin: 0 auto;
  }
}
</style>

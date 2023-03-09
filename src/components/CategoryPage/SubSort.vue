<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        >默认排序</a
      >
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        >最新商品</a
      >
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        >最高人气</a
      >
      <a
        href="javascript:;"
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        >评论最多</a
      >
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc'
          }"
        >
        </i>
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc'
          }"
        >
        </i>
      </a>
    </div>

    <!-- 复选框排序组件  -->
    <div class="check">
      <XtxCheckbox
        v-model="sortParams.inventory"
        @checkboxChange="changeCheckbox"
        >仅显示有货商品</XtxCheckbox
      >
      <XtxCheckbox
        v-model="sortParams.onlyDiscount"
        @checkboxChange="changeCheckbox"
        >仅显示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'

export default {
  name: 'SubSort',
  setup(props, { emit }) {
    // 定义排序参数：请求API 携带的 数据: 点击不同的按钮,发送对应参数请求对应的数据
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null, // [publishTime,orderNum,price,evaluateNum]
      sortMethod: null // asc, desc
    })

    const changeCheckbox = (checkboxVal) => {
      emit('sortChange', sortParams)
    }

    // 点击按钮传参API 函数
    const changeSort = (sortField) => {
      // 判断 价格排序时是升序还是降序
      if (sortField === 'price') {
        sortParams.sortField = sortField
        if (sortParams.sortMethod === null) {
          // 第一次点击默认是降序
          sortParams.sortMethod = 'desc'
        } else {
          sortParams.sortMethod =
            sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 点击的不是价格
        if (sortParams.sortField === sortField) return
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
      emit('sortChange', sortParams)
    }

    return {
      sortParams,
      changeCheckbox,
      changeSort
    }
  }
}
</script>

<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>

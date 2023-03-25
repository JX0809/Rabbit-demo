<template>
  <div class="xtx-pagination" v-if="myTotal > 0">
    <!-- 上一页禁用 -->
    <a href="javascript:;" class="disabled" v-if="currPage <= 1">上一页</a>
    <a href="javascript:;" v-else @click="changePages(currPage - 1)">上一页</a>
    <span v-if="pager.startBtn > 1">...</span>
    <!-- 渲染按钮数组 -->
    <a
      href="javascript:;"
      :class="{ active: item === currPage }"
      v-for="item in pager.btnArr"
      :key="item"
      @click="changePages(item)"
      >{{ item }}</a
    >
    <span v-if="pager.endBtn < pager.pagesTotal">...</span>

    <!-- 下一页禁用 -->
    <a href="javascript:;" class="disabled" v-if="currPage >= pager.pagesTotal">
      下一页
    </a>
    <a href="javascript:;" v-else @click="changePages(currPage + 1)">
      下一页
    </a>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    // 总条数
    myTotal: {
      type: Number,
      default: 100
    },
    // 每页条数
    myPageSize: {
      type: Number,
      default: 10
    },
    // 当前页码
    myCurrPage: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    // 分页按钮个数
    const btnNum = 5
    const total = ref(100)
    const pageSize = ref(10)
    const currPage = ref(1)

    // 确认起始按钮， 结束按钮
    const pager = computed(() => {
      // 总页数
      const pagesTotal = Math.ceil(total.value / pageSize.value)

      let startBtn = currPage.value - Math.floor(btnNum / 2)
      let endBtn = startBtn + btnNum - 1
      if (startBtn < 1) {
        startBtn = 1
        endBtn =
          startBtn + btnNum - 1 > pagesTotal
            ? pagesTotal
            : startBtn + btnNum - 1
      }
      if (endBtn > pagesTotal) {
        endBtn = pagesTotal
        startBtn = endBtn - btnNum + 1 < 1 ? 1 : endBtn - btnNum + 1
      }

      const btnArr = []
      for (let i = startBtn; i <= endBtn; i++) {
        btnArr.push(i)
      }

      return { pagesTotal, startBtn, endBtn, btnArr }
    })

    watch(
      props,
      () => {
        total.value = props.myTotal
        pageSize.value = props.myPageSize
        currPage.value = props.myCurrPage
      },
      { immediate: true }
    )

    // 点击上一页， 下一页, 点击页码
    const changePages = (val) => {
      if (currPage.value !== val) {
        currPage.value = val

        emit('current-change', val)
      }
    }

    return {
      changePages,
      currPage,
      pager
    }
  }
}
</script>

<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>

<template>
  <div class="infinite_loading_container" ref="container">
    <div class="loading" v-if="loading">
      <span class="img">
        <img src="@/assets/images/load.gif" alt="" />
      </span>
      <span class="text">正在加载中...</span>
    </div>
    <div class="finished" v-if="finished">
      <span class="img">
        <img src="@/assets/images/none.png" alt="" />
      </span>
      <span class="text">没有更多了~</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export default {
  name: 'XtxInfiniteLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    // 进入loading组件可视区， 自定义事件通知父组件请求数据，渲染页面
    const container = ref(null)
    useIntersectionObserver(
      container,
      ([{ isIntersecting }], dom) => {
        if (isIntersecting) {
          if (props.loading === false && props.finished === false) {
            emit('infinite')
          }
        }
      },
      {
        threshold: 0
      }
    )
    return {
      container
    }
  }
}
</script>

<style lang="less" scoped>
.infinite_loading_container {
  width: 100%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  .text {
    font-size: 16px;
    color: #999;
  }
  .loading {
    img {
      width: 60px;
      height: 60px;
    }
  }
  .finished {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    > .img {
      width: 200px;
      height: 134px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

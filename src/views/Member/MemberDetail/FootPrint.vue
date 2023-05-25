<template>
  <div class="foot-print">
    <div class="container" v-if="list">
      <UserPanel title="我的足迹">
        <!-- 具名插槽查看更多组件 -->
        <template v-slot:more>
          <XtxMore title="清除全部" @click="showDeleteDialog"></XtxMore>
        </template>
        <!-- 默认插槽 -->
        <div class="body">
          <GoodsItem
            v-for="item in list"
            :key="item.id"
            :itemGoods="item"
          ></GoodsItem>
        </div>
      </UserPanel>
    </div>

    <!-- 无限加载效果 -->
    <XtxInfiniteLoading
      :loading="loading"
      :finished="finished"
      @infinite="getFootPrintList()"
    ></XtxInfiniteLoading>
  </div>
</template>

<script>
import UserPanel from '@/components/Member/User/UserPanel.vue'
import GoodsItem from '@/components/CategoryPage/GoodsItem.vue'
import {
  getMyViewHistoryListAPI,
  deleteFootPrintAPI
} from '@/api/memberAPI/memberAPI'
import { ref } from 'vue'
import Confirm from '@/components/library/confirm'
import Message from '@/components/library/message'

export default {
  name: 'FootPrint',
  components: {
    UserPanel,
    GoodsItem
  },
  setup() {
    const historyParams = {
      page: 1,
      pageSize: 20
    }
    const list = ref([])

    const loading = ref(false)
    const finished = ref(false)
    // 组件被创建后， 没有数据不显示， 发起API 请求
    // loading组件进入可视区， 触发自定义事件
    const getFootPrintList = () => {
      loading.value = true
      getMyViewHistoryListAPI(historyParams).then(({ data }) => {
        // 判断请求结果里的items 有没有数据， 没有数据代表时最后一页
        if (data.result.items.length) {
          list.value.push(...data.result.items)
          historyParams.page++
        } else {
          finished.value = true
        }
        loading.value = false
      })
    }

    const showDeleteDialog = () => {
      Confirm({ text: '确认清空所有浏览足迹吗？' })
        .then(() => {
          // 成功的回调
          deleteFootPrintAPI().then(() => {
            Message({ type: 'success', text: '已清空所有浏览历史' })
            getFootPrintList()
          })
        })
        .catch((e) => {})
    }

    return {
      loading,
      finished,
      list,
      getFootPrintList,
      showDeleteDialog
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  /deep/.goods-item {
    width: 249px;
    margin-bottom: 20px;
  }
}

/deep/.infinite_loading_container {
  .finished {
    span {
      margin-right: 20px;
    }
  }
}

/deep/.xtx_more_container {
  a {
    span {
      color: @xtxColor;
    }
    i {
      display: none;
    }
  }
}
</style>

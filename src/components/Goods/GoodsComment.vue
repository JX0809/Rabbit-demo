<template>
  <div class="goods_comment_container">
    <!-- 筛选 -->
    <div class="comment_header" v-if="commentTags">
      <div class="data">
        <p class="buy">
          <span>{{ commentTags.salesCount }}</span>
          <span>人购买</span>
        </p>
        <p class="like">
          <span> {{ commentTags.praisePercent }}</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="comment_title">大家都在说：</div>
        <div class="tags_item">
          <a
            href="javascript:;"
            v-for="(item, i) in commentTags.tags"
            :key="item.i"
            @click="selectedTags(i)"
            :class="{ active: currentTagIndex === i }"
          >
            {{ item.title }} ({{ item.tagCount }})
          </a>
        </div>
      </div>
    </div>

    <!-- 排序： -->
    <div class="sort">
      <span>排序：</span>
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortFiled === null }"
        @click="sortComment(null)"
        >默认</a
      >
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortFiled === 'createTime' }"
        @click="sortComment('createTime')"
        >最新</a
      >
      <a
        href="javascript:;"
        :class="{ active: reqParams.sortFiled === 'praiseCount' }"
        @click="sortComment('praiseCount')"
        >最热</a
      >
    </div>

    <!-- 评论 -->
    <div class="comment_list" v-if="commentList">
      <div class="item" v-for="list in commentList" :key="list.id">
        <div class="user">
          <img :src="list.member.avatar" alt="" />
          <span>{{ formatUserName(list.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              class="iconfont icon-xingxing2"
              v-for="i in list.score"
              :key="i + '1'"
            >
            </i>
            <i
              class="iconfont icon-xingxing1"
              v-for="i in 5 - list.score"
              :key="i + '2'"
            >
            </i>
            <span class="attr">{{ formatSpecs(list.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ list.content }}
          </div>
          <!-- 评价图片及图片预览组件 -->
          <GoodsCommentImg
            v-if="list.pictures.length"
            :pictures="list.pictures"
          ></GoodsCommentImg>

          <div class="time">
            <span>{{ list.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-like"></i> {{ list.praiseCount }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页组件 -->
    <XtxPagination
      v-if="commentList"
      :myTotal="total"
      :myPageSize="reqParams.pageSize"
      :myCurrPage="reqParams.page"
      @current-change="changePage"
    ></XtxPagination>
  </div>
</template>

<script>
import { inject, ref, reactive, watch } from 'vue'
import {
  getGoodsCommentTagsAPI,
  getGoodsCommentListAPI
} from '@/api/GoodsInfoAPI/getGoodsInfoAPI'
import GoodsCommentImg from '@/components/Goods/GoodsCommentImg.vue'

export default {
  name: 'GoodsComment',
  components: {
    GoodsCommentImg
  },
  setup() {
    // 接收goods 组件传递的信息
    const goodsInfo = inject('goodsInfo')
    const commentTags = ref(null)
    getGoodsCommentTagsAPI(goodsInfo.value.id).then(({ data }) => {
      // 处理数据， 添加全部和有图
      data.result.tags.unshift({
        tagCount: data.result.hasPictureCount,
        title: '有图评价',
        type: 'img'
      })
      data.result.tags.unshift({
        tagCount: data.result.evaluateCount,
        title: '全部评价',
        type: 'all'
      })
      commentTags.value = data.result
    })

    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortFiled: null
    })
    const currentTagIndex = ref(0)

    // 点击选择标签 筛选： 每次点击标签， 页码重置为第一页
    const selectedTags = (i) => {
      currentTagIndex.value = i
      const tagName = commentTags.value.tags[i]
      reqParams.page = 1
      if (tagName.type === 'all') {
        reqParams.hasPicture = false
        reqParams.tag = null
      } else if (tagName.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = false
        reqParams.tag = tagName.title
      }
    }

    // 排序： 每次点击排序， 页码重置为第一页
    const sortComment = (req) => {
      reqParams.page = 1
      reqParams.sortFiled = req
    }

    // 请求 评论列表数据
    const commentList = ref(null)
    // 评论总条数
    const total = ref(0)
    getGoodsCommentListAPI(goodsInfo.value.id, reqParams).then(({ data }) => {
      commentList.value = data.result.items
      total.value = data.result.counts
    })

    // 处理规格参数
    const formatSpecs = (specs) => {
      return specs
        .reduce((pre, curr) => `${pre} ${curr.name}：${curr.nameValue}`, '')
        .trim()
    }

    // 处理用户名
    const formatUserName = (name) => {
      return name.substr(0, 1) + '****' + name.substr(-1)
    }

    // 如果数据发生变化。 重新请求评论列表
    watch(
      reqParams,
      // 可以用 async await 简化
      (newVal) => {
        getGoodsCommentListAPI(goodsInfo.value.id, newVal).then(({ data }) => {
          commentList.value = data.result.items
        })
      },
      { immediate: true }
    )

    // 点击 分页器， 改变页码 重新获取数据
    const changePage = (newPage) => {
      reqParams.page = newPage
    }

    return {
      goodsInfo,
      commentTags,
      currentTagIndex,
      selectedTags,
      reqParams,
      sortComment,
      commentList,
      formatSpecs,
      formatUserName,
      total,
      changePage
    }
  }
}
</script>

<style lang="less" scoped>
.goods_comment_container {
  width: 100%;
  .comment_header {
    width: 100%;
    height: 184px;
    padding: 30px 0;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    .data {
      width: 340px;
      padding: 20px;
      border-right: 1px solid #f5f5f5;
      display: flex;
      p {
        flex: 1;
        text-align: center;
        > span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      display: flex;
      flex: 1;
      .comment_title {
        width: 100px;
        font-weight: bold;
        font-size: 14px;
        color: #333;
        text-align: right;
        line-height: 42px;
      }
      .tags_item {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin: 0 0 20px 20px;
          font-size: 14px;
          color: #999;
          text-align: center;
          line-height: 40px;
          background-color: #f5f5f5;
          border-radius: 5px;
          border: 1px solid #e4e4e4;
          &.active {
            background-color: @xtxColor;
            color: #fff;
          }
          &:hover {
            background-color: lighten(@xtxColor, 50%);
            color: @xtxColor;
            border: 1px solid @xtxColor;
          }
        }
      }
    }
  }
  .sort {
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }

  .comment_list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>

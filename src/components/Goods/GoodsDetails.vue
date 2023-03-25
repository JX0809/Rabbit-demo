<template>
  <div class="goods_details_container">
    <!-- 属性 -->
    <ul class="attrs" v-if="goodsInfo">
      <li v-for="item in goodsInfo.details.properties" :key="item.value">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img
      v-for="item in goodsInfo.details.pictures"
      :key="item"
      :src="item"
      alt=""
    />
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'GoodsDetails',
  setup() {
    // 接收goods 组件传递的信息
    const goodsInfo = inject('goodsInfo')

    return {
      goodsInfo
    }
  }
}
</script>

<style lang="less" scoped>
.goods_details_container {
  background-color: #fff;
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      padding-right: 15px;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>

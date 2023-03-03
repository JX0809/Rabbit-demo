<template>
  <ul class="header_category">
    <li><a href="javascript">首页</a></li>
    <li
      v-for="item in list"
      :key="item.id"
      @mouseenter="showLayer(item)"
      @mouseleave="hideLayer(item)"
    >
      <router-link :to="`/category/${item.id}`" @click="hideLayer(item)">{{
        item.name
      }}</router-link>
      <!-- 二级分类UI 结构 -->
      <div class="subHeader_layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link
              :to="`/category/sub/${sub.id}`"
              @click="hideLayer(item)"
            >
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  name: ' ProjectHeaderNav',
  setup() {
    const store = useStore()

    // 计算属性
    // 把请求到的一级分类数据通过计算属性形成新数据，渲染到页面
    const list = computed(() => {
      return store.state.category.list
    })

    // 方法
    function showLayer(item) {
      store.commit('category/show', item)
    }
    function hideLayer(item) {
      store.commit('category/hide', item)
    }

    return {
      list,
      showLayer,
      hideLayer
    }
  }
}
</script>

<style lang="less" scoped>
.header_category {
  display: flex;
  width: 820px;
  padding: 0 0 0 40px;
  align-items: centers;
  justify-content: space-around;
  position: relative;
  z-index: 99;

  > li {
    padding: 0 40px 0 0;
    line-height: 32px;

    > a {
      font-size: 16px;
      color: #333333;
    }

    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      //  鼠标经过li, 二级分类高度 0 -- 132px
    }
  }
  // 二级分类样式
  .subHeader_layer {
    position: absolute;
    width: 1240px;
    height: 0;
    top: 56px;
    left: -200px;
    background-color: #ffffff;
    opacity: 0;
    overflow: hidden;
    box-shadow: 0 0 5px #ccc;
    transition: all 0.2s 0.1s;
    &.open {
      height: 132px;
      opacity: 1;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      width: 100%;
      height: 132px;
      padding: 0 70px;

      li {
        text-align: center;
        padding: 0 10px;
        a {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        img {
          width: 60px;
          height: 60px;
        }
        p {
          padding-top: 10px;
          font-size: 14px;
        }
      }
      li:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>

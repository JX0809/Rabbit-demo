<template>
  <div class="home_category_container" @mouseleave="currentId = null">
    <ul>
      <!-- 左侧分类 -->
      <li
        :class="{ active: currentId === item.id }"
        v-for="item in homeCateList"
        :key="item.id"
        @mouseenter="currentId = item.id"
      >
        <!-- 一级分类 -->
        <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>

        <!-- 2个二级分类 -->
        <template v-if="item.children">
          <router-link
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
            >{{ sub.name }}</router-link
          >
        </template>

        <!-- 骨架屏 -->
        <span v-else>
          <!-- 传递数据给子组件 -->
          <XtxSkeleton
            width="60px"
            height="18px"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
          ></XtxSkeleton>
          <XtxSkeleton
            width="50px"
            height="18px"
            bg="rgba(255,255,255,0.2)"
          ></XtxSkeleton>
        </span>
      </li>
    </ul>

    <!-- 分类商品弹层 : 计算属性： 要先判断计算属性是否为空-->
    <div class="home_layer">
      <h4 v-if="homeGoodsInfo">
        <small>
          <span>{{
            homeGoodsInfo.id === 'brand' ? '品牌推荐' : '分类推荐'
          }}</span>
          根据购买或浏览记录推荐</small
        >
      </h4>
      <ul v-if="homeGoodsInfo && homeGoodsInfo.goods">
        <!-- 还没有获取到  xxx.goods， 页面就渲染了 -->
        <li v-for="item in homeGoodsInfo.goods" :key="item.id">
          <router-link to="/">
            <div class="goods_img">
              <img :src="item.picture" alt="" />
            </div>
            <div class="goods_info">
              <p class="name">{{ item.name }}</p>
              <p class="desc">{{ item.desc }}</p>
              <p class="price"><i>￥</i>{{ item.price }}</p>
            </div>
          </router-link>
        </li>
      </ul>

      <ul v-if="homeGoodsInfo && homeGoodsInfo.brands">
        <li class="brand" v-for="item in homeGoodsInfo.brands" :key="item.id">
          <router-link to="/">
            <div class="goods_img">
              <img :src="item.picture" alt="" />
            </div>
            <div class="goods_info">
              <p class="place">{{ item.place }}</p>
              <p class="name">{{ item.name }}</p>
              <p class="desc">{{ item.desc }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { homeBrandCateAPI } from '@/api/homeAPI/homeAPI'

export default {
  name: 'HomeCategory',
  setup() {
    const store = useStore()

    // 返回数据只有九个一级分类，首页分类有十个， 自定义第十个
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-child', name: '品牌推荐' }],
      brands: []
    })

    // 计算属性获取分类数据: 只需要渲染一级分类和二级分类的前两个
    const homeCateList = computed(() => {
      const list = store.state.category.list.map((item) => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })

    // // 1.  找出当前分类的商品
    // const goods = ref(0)
    // // 鼠标经过， 获取一级分类id
    // function showGoodsInfo(category) {
    //   const goodsList = homeCateList.value.find(
    //     (item) => item.id === category.id
    //   )
    //   // 通过id 获取当前分类下的商品信息
    //   goods.value = goodsList
    // }

    // 2. 鼠标经过， 获取一级分类id
    const currentId = ref(0)
    // 通过id 获取当前分类下的所有信息(children, goods, brand)
    const homeGoodsInfo = computed(() => {
      return homeCateList.value.find((item) => item.id === currentId.value)
    })

    // 请求接口，获取品牌推荐数据: setup 不支持异步promise
    homeBrandCateAPI().then((data) => {
      brand.brands = data.data.result
    })

    return {
      homeCateList,
      homeGoodsInfo,
      currentId
    }
  }
}
</script>

<style lang="less" scoped>
.home_category_container {
  margin: 0 auto;
  width: 1240px;
  height: 500px;
  display: flex;
  position: relative;

  > ul {
    width: 250px;
    height: 500px;
    background-color: #333333;

    > li {
      width: 100%;
      height: 50px;
      padding-left: 40px;
      line-height: 50px;

      a {
        color: #ffff;
        font-size: 14px;
        margin-right: 4px;

        &:first-child {
          font-size: 16px;
        }
      }

      &:hover,
      &.active {
        background-color: @xtxColor;
      }
    }
  }
  .xtx-skeleton {
    animation: fade 1s linear infinite alternate;
  }
  @keyframes fade {
    from {
      opacity: 0.2;
    }
    to {
      opacity: 1;
    }
  }
}

.home_layer {
  // display: flex;
  width: 990px;
  height: 500px;
  padding: 0 15px;
  // background: hsla(0, 0%, 100%, 0.8);
  position: absolute;
  top: 0px;
  left: 250px;

  > h4 {
    font-size: 20px;
    font-weight: 400;
    line-height: 80px;
    span {
      font-size: 22px;
    }
  }
  > ul {
    width: 100%;
    height: 418px;
    display: flex;
    flex-wrap: wrap;
    > li {
      width: 310px;
      height: 120px;
      margin-right: 8px;
      margin-bottom: 15px;
      border: 1px solid #eee;
      background-color: #fff;
      border-radius: 8px;

      a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        padding: 10px;
        &:hover {
          background: #e3f9f4;
        }
        .goods_img {
          img {
            width: 95px;
            height: 95px;
          }
        }
        .goods_info {
          padding-left: 10px;
          line-height: 24px;
          width: 190px;
          .name {
            font-size: 14px;
            color: #666;
          }
          .desc {
            font-size: 12px;
            color: #999;
          }
          .price {
            font-size: 22px;
            color: @priceColor;
            i {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>

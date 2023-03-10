<template>
  <div class="newGoods_container">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <!-- 填写具名插槽和作用域插槽时， 要设置根标签 template -->
      <template v-slot:more>
        <XtxMore></XtxMore>
      </template>

      <!-- 主体内容 -->
      <div class="goods_body" ref="lazyBox">
        <!-- 添加动画效果： 动画样式定义在 common.less -->
        <transition name="fade">
          <ul class="goods_list" v-if="goodsList.length">
            <li class="hoverShadow" v-for="item in goodsList" :key="item.id">
              <router-link :to="`/product/${item.id}`">
                <!-- <img :src="item.picture" alt="" /> -->
                <!-- 图片懒加载 -->
                <img v-lazyLoad="item.picture" alt="" />
                <p class="goods_name ellipsis">{{ item.name }}</p>
                <p class="goods_price">￥{{ item.price }}</p>
              </router-link>
            </li>
          </ul>
          <!-- 骨架效果 -->
          <HomeSkeleton v-else></HomeSkeleton>
        </transition>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from '@/components/HomePage/HomePanel.vue'
import HomeSkeleton from '@/components/HomePage/HomeSkeleton.vue'
import { homeNewGoodsAPI } from '@/api/homeAPI/homeAPI'
import { ref } from 'vue'
import { useLazyLoadData } from '@/hook'

export default {
  name: 'HomeNewGoods',
  components: {
    HomePanel,
    HomeSkeleton
  },
  setup() {
    // homeNewGoodsAPI().then((data) => {
    //   goodsList.value = data.data.result
    // })

    // 懒加载
    const lazyBox = ref(null)
    // 传入API函数 和 被观察的元素
    // 同时解构处 API 函数的返回值： 重命名为 goodsList
    const { result } = useLazyLoadData(homeNewGoodsAPI, lazyBox)

    return {
      goodsList: result,
      lazyBox
    }
  }
}
</script>

<style lang="less" scoped>
.newGoods_container {
  width: 100%;
  height: 541px;

  .goods_body {
    width: 100%;
    height: 426px;
    padding-bottom: 20px;
  }
  .goods_list {
    width: 100%;
    height: 406px;
    display: flex;
    > li {
      width: 306px;
      height: 100%;
      text-align: center;
      background-color: #f0f9f4;
      a {
        font-size: 22px;
        img {
          width: 306px;
          height: 306px;
        }
        .goods_name {
          padding: 12px 30px 0;
          color: #333;
        }
        .goods_price {
          padding: 12px 30px 0;
          color: @priceColor;
        }
      }
      ~ li {
        margin-left: 5px;
      }
    }
  }
}
</style>

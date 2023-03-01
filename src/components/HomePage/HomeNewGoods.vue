<template>
  <div class="newGoods_container">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <!-- 填写具名插槽和作用域插槽时， 要设置根标签 template -->
      <template v-slot:more>
        <XtxMore></XtxMore>
      </template>

      <!-- 主体内容 -->
      <div class="goods_body">
        <ul class="goods_list">
          <li class="hoverShadow" v-for="item in goodsList" :key="item.id">
            <router-link to="/">
              <img :src="item.picture" alt="" />
              <p class="goods_name ellipsis">{{ item.name }}</p>
              <p class="goods_price">￥{{ item.price }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from '@/components/HomePage/HomePanel.vue'
import { homeNewGoodsAPI } from '@/api/homeAPI/homeAPI'
import { ref } from 'vue'

export default {
  name: 'HomeNewGoods',
  components: { HomePanel },
  setup() {
    const goodsList = ref([])
    homeNewGoodsAPI().then((data) => {
      goodsList.value = data.data.result
    })

    return {
      goodsList
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

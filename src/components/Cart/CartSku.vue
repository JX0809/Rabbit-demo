<template>
  <div class="cart_sku" ref="target">
    <div class="attrs" @click="toggle()">
      <span class="ellipsis">{{ skuText }}</span>
      <i class="iconfont icon-xiangxiajiantou"></i>
    </div>

    <!-- sku规则 -->
    <div class="layer" v-if="visible">
      <!-- SKU组件 -->
      <GoodsSku
        v-if="cartGoodsSku"
        :skuId="skuId"
        :goodsInfo="cartGoodsSku"
        @changeSpecs="changeSku"
      >
      </GoodsSku>
      <!-- 按钮组件 -->
      <xtxButton
        size="mini"
        type="primary"
        v-if="cartGoodsSku"
        @click="submitNewSku"
        >确认</xtxButton
      >

      <!-- loading -->
      <div class="loading" v-if="!cartGoodsSku">
        <img src="@/assets/images/loading.gif" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import GoodsSku from '@/components/Goods/GoodsSku.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { getCartGoodsSkuAPI } from '@/api/cartAPI/cartAPI'
export default {
  name: 'CartSku',
  components: {
    GoodsSku
  },
  props: {
    skuText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const visible = ref(false)
    // 打开
    const cartGoodsSku = ref(null)
    // 获取购物车商品的 规格信息， 渲染页面
    const show = async () => {
      visible.value = true
      getCartGoodsSkuAPI(props.skuId).then((res) => {
        cartGoodsSku.value = res.data.result
      })
    }
    // 打开
    const close = () => {
      visible.value = false
      cartGoodsSku.value = null
    }
    // 切换
    const toggle = () => {
      if (visible.value) {
        close()
      } else {
        show()
      }
    }
    // 点击外面关闭sku组件
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })

    // 子组件的自定义事件处理函数
    // 用户在购物车页面修改了商品的sku, 存储新的sku信息
    const currSku = ref(null)
    const changeSku = (newSku) => {
      currSku.value = newSku
    }

    // 点击确认提交新选择的sku
    const submitNewSku = () => {
      if (
        currSku.value &&
        currSku.value.skuId &&
        currSku.value.skuId !== props.skuId // 修改后的sku 规格的ID 不等于 商品原本来的规格Id
      ) {
        emit('changeSku', currSku.value)
        close()
      }
    }

    return { visible, target, toggle, cartGoodsSku, changeSku, submitNewSku }
  }
}
</script>

<style lang="less" scoped>
.cart_sku {
  margin-top: 10px;
  height: 28px;
  padding: 0 6px;
  display: inline-block;
  border: 1px solid #f5f5f5;
  position: relative;
  .attrs {
    width: 100%;
    font-size: 14px;
    color: #999;
    span {
      max-width: 230px;
      margin-right: 5px;
    }
  }
  .loading {
    img {
      display: block;
      margin: 0 auto;
    }
  }
  .layer {
    position: absolute;
    top: 40px;
    left: -1px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    padding: 20px;
    font-size: 14px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 4px #e6faf6;

    &::before {
      content: '';
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background-color: #fff;
      transform: scaleX(0.8) rotate(45deg);
    }
  }
}
</style>

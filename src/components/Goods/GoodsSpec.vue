<template>
  <div class="goods_spec_container">
    <div class="goods_spec">
      <p class="g-name">{{ goodsSpec.name }}</p>
      <p class="g-desc">{{ goodsSpec.desc }}</p>
      <p class="g-price">
        <span>{{ goodsSpec.price }}</span>
        <span>{{ goodsSpec.oldPrice }}</span>
      </p>
      <div class="g-service">
        <dl>
          <dt>促销</dt>
          <dd>12月好物放送，App领券购买直降120元</dd>
        </dl>
        <dl>
          <dt>配送</dt>
          <dd>至</dd>
          <dd class="city">
            <XtxCity
              :fullLocation="fullLocation"
              @change="changeCity"
            ></XtxCity>
          </dd>
        </dl>
        <dl>
          <dt>服务</dt>
          <dd>
            <span>无忧退货</span>
            <span>快速退款</span>
            <span>免费包邮</span>
            <a href="javascript:;">了解详情</a>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodsSpec',
  props: {
    goodsSpec: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    // 未登录， 设置默认的地址
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countryCode = ref('110101')
    const fullLocation = ref('北京市 市辖区 东城区')

    // 判断登录后是否有默认地址， 重新赋值
    if (props.goodsSpec.userAddresses) {
      const defaultAddress = props.goodsSpec.userAddresses.find(
        (addr) => addr.isDefault === 1
      )
      if (defaultAddress) {
        provinceCode.value = defaultAddress.provinceCode
        cityCode.value = defaultAddress.cityCode
        countryCode.value = defaultAddress.countryCode
        fullLocation.value = defaultAddress.fullLocation
      }
    }
    // 自定义事件的处理函数
    const changeCity = (res) => {
      provinceCode.value = res.provinceCode
      cityCode.value = res.cityCode
      countryCode.value = res.countryCode
      fullLocation.value = res.fullLocation
    }

    return {
      fullLocation,
      changeCity
    }
  }
}
</script>

<style lang="less" scoped>
.g-name {
  font-size: 22px;
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: '¥';
      font-size: 14px;
    }
    &:first-child {
      color: @priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: '•';
            color: @xtxColor;
            margin-right: 2px;
          }
        }
        a {
          color: @xtxColor;
        }
      }
    }
  }
}
.city {
  margin-left: 5px;
}
</style>

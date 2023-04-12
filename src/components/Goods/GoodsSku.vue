<template>
  <div class="goods_sku">
    <dl v-for="item in goodsInfo.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            :src="val.picture"
            :title="val.name"
            v-if="val.picture"
            @click="selectItem(item, val)"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="selectItem(item, val)"
            v-else
          >
            {{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<script>
import getPowerSet from '@/vendor/power-set'

export default {
  name: 'GoodsSku',
  props: {
    goodsInfo: {
      type: Object,
      // default: () => ({ specs: [], skus: [] })
      default: () => {}
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 调用路径字典函数
    const pathMap = getPathMap(props.goodsInfo.skus)

    // 组件初始化时更新状态
    updatedDisabledStatus(props.goodsInfo.specs, pathMap)
    initSelectedStatus(props.goodsInfo, props.skuId)

    const selectItem = (item, val) => {
      if (val.disabled) return false
      // 已经选中， 取消选中
      if (val.selected) {
        val.selected = false
      } else {
        // 给每个values的每一项添加 selected 属性
        item.values.find((item) => (item.selected = false))
        // 单独给点击的 val 赋值
        val.selected = true
      }

      // 点击规格按钮时更新状态
      updatedDisabledStatus(props.goodsInfo.specs, pathMap)

      // 将 用户选择的sku 信息 传递给父组件: 有自己的价格，库存信息等： 不同规格价格不一样
      // 判断信息长度是否完整
      const selectedArr = getSelectedArr(props.goodsInfo.specs).filter((v) => v)
      if (selectedArr.length === props.goodsInfo.specs.length) {
        // 在路径字典里找到 用户选中的这一项规格的id ： 路径字典存储了sku.id
        const skuID = pathMap[selectedArr.join(spliter)]
        const sku = props.goodsInfo.skus.find((sku) => sku.id === skuID[0])

        // 触发自定义事件
        if (sku) {
          emit('changeSpecs', {
            skuId: sku.id,
            inventory: sku.inventory,
            oldPrice: sku.oldPrice,
            price: sku.price,
            // arr.reduce 得到一个值
            specsText: sku.specs
              .reduce(
                (p, currItem) => `${p} ${currItem.name}:${currItem.valueName}`,
                ''
              )
              .trim()
          })
        }
      } else {
        emit('changeSpecs', {})
      }
    }

    return {
      selectItem,
      pathMap
    }
  }
}
// 定义函数组成路径字典
const spliter = '★'
const getPathMap = (skus) => {
  // 存储路径字典
  const pathMap = {}
  // 遍历SKUS 数组中的每一项
  skus.forEach((sku) => {
    // 过滤出有库存的 有效SKU, inventory 不为 null
    if (sku.inventory) {
      // 得到有库存的skus 下的 属性的 属性值  skus: 颜色: 褐色; 尺码:37cm, 返回一个新数组
      const specs = sku.specs.map((spec) => spec.valueName) // []
      // 得到sku 属性值数组的子集
      const powerSet = getPowerSet(specs)
      // console.log(powerSet)  [[],[],[],[]]

      // 设置子级路径字典
      powerSet.forEach((set) => {
        // 数组拼接成字符串
        const key = set.join(spliter) // xx☆xx

        if (pathMap[key]) {
          // 如果路径字典里存在该项， 追加 SKU.ID
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}

// 得到用户选中的规格参数的集合: 遍历数据goodsInfo 中 specs 数组: 找到数组中 selected 为 true的那一项
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach((spec) => {
    const selectedVal = spec.values.find((item) => item.selected === true) // find 返回那一项
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  console.log(selectedArr)

  return selectedArr
}

// 更新按钮的禁用状态
const updatedDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    // 选中规格属性的集合: 调用函数
    const selectedArr = getSelectedArr(specs)

    spec.values.forEach((val) => {
      if (val.name === selectedArr[i]) return false
      // ???
      selectedArr[i] = val.name

      /**
       * 数组转成字符串 arr.join('分隔符')
       * 字符串转成数组  string.split('原 字符串分隔符')
       * 过滤 无效值 undefined: eg: selectedArr = ['黑色'，'20cm', undefined]
       */
      const key = selectedArr.filter((v) => v).join(spliter) // key = [ 黑色， 20cm] ==> key = 黑色☆20cm

      /**
       *添加disabled 属性: 设置禁用状态
       * 获取对象的属性值 obj.key  / obj[key]
       * pathMap里有没有 key值
       */
      // val.disabled = !pathMap[key]
      if (!pathMap[key]) {
        val.disabled = true
      }
    })
  })
}

// 组件初始化时，根据给定的skuid,在skus 找到这一项， 循环specs 默认选中规格
const initSelectedStatus = (goods, id) => {
  if (!id) return false // 商品详情sku 没有传入默认选中的规格id；购物车传入用户选择的商品的规格的skuId

  const sku = goods.skus.find((sku) => (sku.id = id))
  if (sku) {
    // 购物车页面插入的SKUID 对应的的商品规则inventory 为0
    goods.specs.forEach((spec, i) => {
      const valName = sku.specs[i].valueName
      spec.values.forEach((val) => {
        // val.selected = val.name === value
        if (val.name === valName) val.selected = true
      })
    })
  }
}
</script>

<style lang="less" scoped>
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  margin-bottom: 2px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods_sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>

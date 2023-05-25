<template>
  <div class="goods_img_container">
    <div class="goods_img">
      <!-- 预览图是 背景图格式 -->
      <div
        class="large"
        :style="[
          { backgroundImage: `url(${goodsImg[currentIndex]})` },
          bgPosition
        ]"
        v-show="showImg"
      ></div>
      <!-- 主图 -->
      <div class="middle" ref="target">
        <img :src="goodsImg[currentIndex]" alt="" />
        <div class="layer" v-show="showImg" :style="position"></div>
      </div>
      <!-- 小图 -->
      <ul class="small">
        <li
          :class="{ active: i === currentIndex }"
          v-for="(img, i) in goodsImg"
          :key="i"
          @mouseenter="toggleImg(i)"
        >
          <img :src="img" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
// 导入获取鼠标偏移量的方法
import { useMouseInElement } from '@vueuse/core'

export default {
  name: 'GoodsInfoImg',
  props: {
    goodsImg: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const { currentIndex, toggleImg } = useToggleImg()
    const { target, position, bgPosition, showImg } = usePreviewingImg()
    return {
      currentIndex,
      toggleImg,
      showImg,
      target,
      position,
      bgPosition
    }
  }
}
// 鼠标经过小图， 选中当前小图
const useToggleImg = () => {
  const currentIndex = ref(0)
  const toggleImg = (i) => {
    currentIndex.value = i
  }
  return { currentIndex, toggleImg }
}

// 获取鼠标偏移的位置
const usePreviewingImg = () => {
  // 观察的对象
  const target = ref(null)
  // 遮罩块、预览图 显示隐藏
  const showImg = ref(true)
  // 遮罩块的位置
  const position = reactive({
    top: 0,
    left: 0
  })
  // 预览图的位置
  const bgPosition = reactive({
    backgroundPositionX: 0,
    backgroundPositionY: 0
  })
  const { elementX, elementY, isOutside } = useMouseInElement(target)
  watch([elementX, elementY, isOutside], () => {
    // 控制遮罩块的位置x轴
    if (elementX.value < 100) position.left = 0
    else if (elementX.value > 300) position.left = 200
    else position.left = elementX.value - 100
    // 控制遮罩块的位置y轴
    if (elementY.value < 100) position.top = 0
    else if (elementY.value > 300) position.top = 200
    else position.top = elementY.value - 100

    bgPosition.backgroundPositionX = -position.left * 2 + 'px'
    bgPosition.backgroundPositionY = -position.top * 2 + 'px'

    // 控制预览图的位置x坐标

    // 控制预览图的位置Y坐标

    position.left = position.left + 'px'
    position.top = position.top + 'px'

    showImg.value = !isOutside.value
  })

  return { target, position, bgPosition, showImg }
}
</script>

<style lang="less" scoped>
.goods_img_container {
  width: 480px;
  height: 400px;
  .goods_img {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
  }
  .large,
  .middle {
    width: 400px;
    height: 400px;
  }
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    z-index: 999;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    position: relative;
    cursor: move;

    .layer {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin: 0 0 15px 12px;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>

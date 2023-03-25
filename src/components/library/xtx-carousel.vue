<template>
  <div class="xtx_carousel" @mouseenter="stop()" @mouseleave="start()">
    <!-- 主体 -->
    <ul class="carousel_body">
      <li
        class="carousel_item"
        :class="{ fade: index === i }"
        v-for="(item, i) in sliders"
        :key="i"
      >
        <!-- 渲染首页轮播图 -->
        <!-- <router-link :to="item.hrefUrl"> -->
        <router-link :to="item.hrefUrl" v-if="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </router-link>

        <!-- 渲染商品详情轮播图 -->
        <div class="sliders" v-else>
          <router-link
            :to="`/product/${goods.id}`"
            v-for="goods in item"
            :key="goods.id"
            class="item"
          >
            <img :src="goods.picture" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </router-link>
        </div>
      </li>
    </ul>
    <!-- 上一张下一张按钮 -->
    <a
      href="javascript:"
      class="carousel_btn carousel_pre_btn"
      @click="toggle(-1)"
    >
      <i class="iconfont icon-arrow-left"></i>
    </a>
    <a
      href="javascript:"
      class="carousel_btn carousel_next_btn"
      @click="toggle(1)"
    >
      <i class="iconfont icon-arrow-right"></i>
    </a>
    <!-- 圆点 -->
    <div class="carousel_indicator">
      <span
        :class="{ active: index === i }"
        v-for="(item, i) in sliders"
        :key="i"
        @click="toggleIndicator(i)"
      ></span>
    </div>
  </div>
</template>

<script>
import { onUnmounted, ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup(props) {
    let timer = null
    const index = ref(0)
    // 自动播放定时器函数
    function carouselAutoPlay() {
      clearTimeout(timer)
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }

    watch(
      () => props.sliders,
      (newVal) => {
        // 有图片数据开启自动播放，调用定时器
        if (newVal.length && props.autoPlay) {
          index.value = 0
          carouselAutoPlay()
        }
      }
    )
    // 鼠标进入离开 开启 停止 自动播放
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        carouselAutoPlay()
      }
    }

    const toggle = (step) => {
      const newVal = index.value + step
      // 没有下一张， 返回第一张
      if (newVal >= props.sliders.length) {
        index.value = 0
        return
      }
      if (newVal < 0) {
        // 没有上一张， 返回最后一张
        index.value = props.sliders.length - 1
        return
      }
      index.value = newVal
    }

    const toggleIndicator = (i) => {
      index.value = i
    }
    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      index,
      stop,
      start,
      toggle,
      toggleIndicator
    }
  }
}
</script>

<style lang="less" scoped>
// 根据父组件容器的大小而不变化， 不单独指定大小，提高复用
.xtx_carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;

  .carousel {
    &_body {
      width: 100%;
      height: 100%;
    }
    &_item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.5s linear;

      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }

      .sliders {
        display: block;
        float: left;
        width: 100%;
        height: 100%;
        padding: 20px 30px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        > a {
          width: 240px;
          height: 300px;
          padding-top: 20px;
          .hoverShadow();
        }

        img {
          width: 160px;
          height: 160px;
        }
        p {
          padding-top: 10px;
        }
        .name {
          font-size: 16px;
          padding: 10px 20px;
        }
        .price {
          color: @priceColor;
          font-size: 20px;
        }
      }
    }
    &_indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      text-align: center;
      z-index: 100;

      > span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background-color: #dfcc8c;
        }
      }
    }
    &_btn {
      width: 44px;
      height: 44px;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all, 0.5s;
    }
    &_pre_btn {
      left: 20px;
    }
    &_next_btn {
      right: 20px;
    }
  }
  &:hover {
    .carousel_btn {
      opacity: 1;
    }
  }

  /deep/.carousel_pre_btn {
    top: 140px;
    left: 5px;
  }
  /deep/.carousel_next_btn {
    top: 140px;
    right: 5px;
  }
}
</style>

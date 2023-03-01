<template>
  <div class="home_banner_container">
    <XtxCarousel :sliders="sliders" :autoPlay="false"></XtxCarousel>
  </div>
</template>

<script>
import { homeCarouselAPI } from '@/api/homeAPI/homeAPI'
import { ref } from 'vue'
export default {
  name: 'HomeBanner',
  setup() {
    const sliders = ref([])
    // 获取轮播图数据
    homeCarouselAPI().then((data) => {
      sliders.value = data.data.result
    })

    return {
      sliders
    }
  }
}
</script>

<style lang="less" scoped>
.home_banner_container {
  position: absolute;
  top: 0;
  left: 0;
  width: 1240px;
  height: 500px;
  z-index: 98;
}
/deep/ .xtx_carousel {
  .carousel_pre_btn {
    left: 270px;
  }
  .carousel_indicator {
    padding-left: 250px;
  }
}
</style>

<template>
  <div class="xtx_city_container" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active: visible }">
      <span class="placeholder">{{ fullLocation }}</span>
      <span class="value"></span>
      <i class="iconfont icon-xiangxiajiantou"></i>
    </div>
    <div class="option" v-if="visible">
      <div class="loading" v-if="loading"></div>
      <template v-else>
        <span
          class="ellipsis"
          v-for="item in currentList"
          :key="item.code"
          @click="changeCity(item)"
        >
          {{ item.name }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: null
    }
  },
  setup(props, { emit }) {
    // 显示隐藏逻辑
    const visible = ref(false)
    const loading = ref(false)
    const cityData = ref([])
    const showDialog = () => {
      visible.value = true
      loading.value = true
      getCityData().then((data) => {
        //  赋值resolve 的回调
        cityData.value = data
        loading.value = false
      })
      // 弹出窗口前 清空数据: 遍历对象
      for (const key in updatedLocation) {
        updatedLocation[key] = ''
      }
    }
    const closeDialog = () => {
      visible.value = false
    }
    const toggleDialog = () => {
      if (visible.value) {
        closeDialog()
      } else {
        showDialog()
      }
    }
    // 对话框外点击隐藏对话框
    const target = ref(null)
    onClickOutside(target, () => closeDialog())

    // 计算属性获取当前的省市
    const currentList = computed(() => {
      // 所有省市数据： 默认显示第一级
      let currList = cityData.value

      // 点击当前的省或市， 获取 当前省/市下面的数据
      if (updatedLocation.provinceCode) {
        currList = currList.find(
          (item) => item.code === updatedLocation.provinceCode
        ).areaList
      }

      if (updatedLocation.cityCode) {
        currList = currList.find(
          (item) => item.code === updatedLocation.cityCode
        ).areaList
      }

      return currList
    })

    // 切换 省市区
    const updatedLocation = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countryCode: '',
      countryName: '',
      fullLocation: ''
    })
    const changeCity = (item) => {
      // 点击的是省
      if (item.level === 0) {
        updatedLocation.provinceCode = item.code
        updatedLocation.provinceName = item.name
      }

      // 点击的是市
      if (item.level === 1) {
        updatedLocation.cityCode = item.code
        updatedLocation.cityName = item.name
      }

      if (item.level === 2) {
        updatedLocation.countryCode = item.code
        updatedLocation.countryName = item.name
        updatedLocation.fullLocation = `${updatedLocation.provinceName} ${updatedLocation.cityName} ${updatedLocation.countryName}`
        closeDialog()
        // 把处理好的数据 传递给 父组件
        emit('change', updatedLocation)
      }
    }

    return {
      toggleDialog,
      target,
      visible,
      loading,
      currentList,
      changeCity
    }
  }
}

// 获区地址数据
const getCityData = () => {
  // 可能时同步操作： 本地有数据； 可能时异步操作： 本地没有数据，请求接口获取数据
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      const url =
        'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(({ data }) => {
        console.log(data)
        window.cityData = data
        resolve(window.cityData) // 成功的回调的 数据
      })
    }
  })
}
</script>

<style lang="less" scoped>
.xtx_city_container {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .active {
    background: #fff;
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>

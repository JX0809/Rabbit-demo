import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'

// 数据懒加载
export const useLazyLoadData = (apiFn, target) => { // 可以直接传入target实参， 也可以在加载函数中声明target，return给组件使用
  // 存放请求回来的数据
  const result = ref([])
  // useIntersectionObserver 有 3个参数：懒加载的target, 处理函数， 触发懒加载的临界值
  // isIntersecting 是否进入可视区
  const { stop } = useIntersectionObserver(target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        // 调用API 获取数据
        apiFn().then(data => {
          result.value = data.data.result
        })
      }
    }, {
      threshold: 0
    }
  )
  // 返回数据
  return {
    result
  }
}

// 支付倒计时

export const usePayTimeCountdown = () => {
  const time = ref(0)
  const timeTxt = ref('')

  // 定义定时器
  const { resume, pause } = useIntervalFn( // callback, 间隔时间， 是否立即开启
    () => {
      time.value--
      timeTxt.value = dayjs.unix(time.value).format('mm分ss秒')
      if (time.value <= 0) {
        pause()
      }
    },
    1000,
    false
  )
  onUnmounted(() => {
    pause()
  })

  // 定义开启定时器方法
  const start = (countdown) => {
    time.value = countdown
    timeTxt.value = dayjs.unix(time.value).format('mm分ss秒')
    resume() // 调用定时器
  }

  return {
    start, timeTxt
  }
}

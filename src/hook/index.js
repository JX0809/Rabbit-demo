import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

// 数据懒加载
export const useLazyLoadData = (apiFn, target) => {
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

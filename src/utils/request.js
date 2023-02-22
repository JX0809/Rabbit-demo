import axios from 'axios'
import store from '../store/index'
import router from '../router/index'

// 设置请求 根路径
// 避免有请求不需要经过 axios
const baseUrl = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 5000
})

// axios 拦截器
// 请求拦截器设置token
instance.interceptors.request.use(
  config => {
    // 设置token 解构赋值
    const { token } = store.state.user.profile
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

// 响应拦截器更新token
instance.interceptors.response.use(
  response => {
    return response.data
  }, error => {
    // 响应结果出错的操作
    if (error.response && error.response.status === 401) {
      // 清除用户信息
      store.commit('user/clearState')
      // 登录成功后跳转到 访问失败的页面： router.currentRoute.fullPath 获取当前的路由地址
      // vue3 的 router.currentRoute 是 ref 定义的响应式数据
      router.replace('/login?pre=' + router.currentRoute.value.fullPath)
    }
    return Promise.reject(error)
  })

export default instance

// // 导出 请求工具函数
// export default (url, method, submitData) => {
//   return instance({
//     url,
//     method,
//     [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
//   })
// }

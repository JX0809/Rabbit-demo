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
    // return response : 返回Promise包裹的数据， data才是真实的数据
    return response
    // 返回真实的data， 不用再去解构
    // return response.data
  }, error => {
    // token过期，响应结果出错的操作
    if (error.response && error.response.status === 401) {
      // 清除用户信息
      store.commit('user/clearState', {})
      // 登录成功后跳转到 访问失败的页面： router.currentRoute.fullPath 获取当前的路由地址
      // vue3 的 router.currentRoute 是 ref 定义的响应式数据
      const fullPath = router.currentRoute.value.fullPath
      router.replace('/login?pre=' + fullPath)
    }
    return Promise.reject(error)
  })
// 1. 直接导出instance 实例
export default instance
// 使用
// export const getAllCategoryListAPI = () => {
//   return instance.get('/home/category/head')
// }

// //2.  导出 请求工具函数的写法
// export default (url, method, submitData) => {
//   return instance({
//     url,
//     method,
//     [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
//   })
// }
// 使用
// import request from '@、xx/xxx'
// export const xxx = () => {
//   return request('url', 'get', 'data')
// }

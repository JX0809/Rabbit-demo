import instance from '@/utils/request'

// 生成订单
export const createOrderAPI = () => {
  return instance.get('/member/order/pre')
}

/**
 * 添加收货地址
 * @param {Object}-- params 添加地址的表单对象
 */
export const addNewAddressAPI = (params) => {
  return instance.post('/member/address', params)
}

/**
 * 修改收货地址
 * @param {Object}-- params 修改地址的表单对象
 */
export const updateAddressAPI = (params) => {
  return instance.put(`/member/address/${params.id}`, params)
}

/**
 * 提交订单
 * @param {Object<Array/>String/Integer/} --params
 */
export const submitOrderAPI = (params) => {
  return instance.post('/member/order', params)
}

// 获取提交的订单详情
export const getOrderDetailsAPI = (id) => {
  return instance.get(`/member/order/${id}`)
}

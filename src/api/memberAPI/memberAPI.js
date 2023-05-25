import instance from '@/utils/request'

/**
 * 获取我的收藏
 * @param {Object} paramsObj 参数集合
 */
export const getMyCollectListAPI = (paramsObj) => {
  return instance.get('/member/collect', {
    params: paramsObj
  })
}

/**
 * 获取我的足迹
 * @param {Object} paramsObj 参数集合
 */
export const getMyViewHistoryListAPI = (paramsObj) => {
  return instance.get('/member/browseHistory', {
    params: paramsObj
  })
}

/**
 * 获取 我的订单
 * @param {Object} paramsObj 参数集合：page, pageSize, orderState(0：全部订单)
 */
export const getMyOrderListAPI = (ParamsObj) => {
  return instance.get('/member/order', { params: ParamsObj })
}

/**
 * 取消订单
 * @param{Number} id:订单ID
 * @param{String} reason 取消原因
 */
export const cancelOrderAPI = (id, reason) => {
  return instance.put(`/member/order/${id}/cancel`, {
    cancelReason: reason
  })
}

/**
 * 取消订单
 * @param{Array} id:订单ID集合
 */
export const deleteOrderAPI = (id) => {
  return instance.delete('/member/order', { data: { ids: id } })
}

// 确认收货
export const receivedGoodsAPI = (id) => {
  return instance.put(`/member/order/${id}/receipt`)
}

// 查看物流
export const checkLogisticsAPI = (id) => {
  return instance.get(`/member/order/${id}/logistics`)
}

// 获取订单详情
export const getOrderDetailAPI = (id) => {
  return instance.get(`/member/order/${id}`)
}

// 再次购买
export const repurchaseAPI = (id) => {
  return instance.get(`/member/order/repurchase/${id}`)
}

/**
 * 删除我的足迹
 * @param {Array} ids: id集合
 * @returns
 */
export const deleteFootPrintAPI = (ids) => {
  return instance.delete('/member/browseHistory/batch', { data: { ids } })
}

// 获取所有收货地址
export const getAddressListAPI = () => {
  return instance.get('/member/address')
}

// 更新收货地址--设置默认地址
// export const updateAddressAPI = (item) => {
//   return instance.put(`/member/address/${item.id}`, {
//     receiver: item.receiver,
//     contact: item.contact,
//     provinceCode: item.provinceCode,
//     cityCode: item.cityCode,
//     countyCode: item.countyCode,
//     address: item.address,
//     postalCode: item.postalCode,
//     addressTags: item.address,
//     isDefault: 0
//   })
// }

// 更新地址--设置默认地址
export const updateAddressAPI = (item) => {
  return instance.put(`/member/address/${item.id}`,
    item
  )
}

// 删除地址
export const deleteAddressAPI = (id) => {
  return instance.delete(`/member/address/${id}`)
}

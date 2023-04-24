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

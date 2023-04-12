import instance from '@/utils/request'

// 更新购物车商品的 信息: 购物车中的商品失效或者没有了库存
export const updateGoodsInCartAPI = (skuId) => {
  return instance.get(`/goods/stock/${skuId}`)
}

// 获取当前商品的spec 和 skus
export const getCartGoodsSkuAPI = (skuId) => {
  return instance.get(`/goods/sku/${skuId}`)
}

// 修改购物车商品中 已选中的 sku 规格
export const updateGoodsSkuInCartAPI = (skuId, { selected, count }) => {
  return instance.put(`/member/cart/${skuId}`, { selected, count })
}

// 登录后的请求接口
// 合并购物车
export const mergeCartAPI = (cartList) => {
  return instance.post('/member/cart/merge', cartList)
}
// 登陆后， 获取购物车数据
export const getCartListAPI = () => {
  return instance.get('/member/cart')
}

// 加入购物车
export const addToCartAPI = ({ skuId, count }) => {
  return instance.post('/member/cart', { skuId, count })
}

/**
 * 删除购物车商品API 接口
 * @param{Array<String} ids 是一个 skuI的的集合： 单个删除 和 批量删除（多个id） 共用接口
 */
export const deleteGoodsInCartAPI = (ids, isClear) => {
  return instance.delete('/member/cart', { data: { ids } })
}

// 修改购物车商品： 数量， 选中状态:共用接口
export const reviseGoodsInCartAPI = (goods) => {
  return instance.put(`/member/cart/${goods.skuId}`, goods)
}

/**
 * 购物车全选和取消全选
 *@param{Boolean} selected-选中状态
 @param{Array<String} ids-skuId 集合： 不传ids， 表示用户访问的是全选和取消全选操作
 */
export const selectedAllAPI = (selected, ids) => {
  return instance.put('/member/cart/selected', { selected, ids })
}

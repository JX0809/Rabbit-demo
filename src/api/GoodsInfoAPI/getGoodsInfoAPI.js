import instance from '@/utils/request'

// 获取商品详情
export const getGoodsInfoAPI = (id) => {
  return instance.get('/goods', { params: { id } })
}

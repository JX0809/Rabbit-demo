import instance from '@/utils/request.js'

export const mainCateListAPI = (id) => {
  return instance.get('/category', { params: { id } })
}

// 筛选
export const subFilterListAPI = (id) => {
  return instance.get('/category/sub/filter', { params: { id } })
}

// 获取二级分类下的商品列表
export const getSubCateGoodsListAPI = (params) => {
  return instance.post('/category/goods/temporary', params)
}

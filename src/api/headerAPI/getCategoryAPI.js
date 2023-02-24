import instance from '@/utils/request.js'

// 获取一级分类、二级分类 和 分类下的商品信息
export const getAllCategoryListAPI = () => {
  return instance.get('/home/category/head')
}

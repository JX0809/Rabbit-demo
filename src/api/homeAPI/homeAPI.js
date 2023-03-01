import instance from '@/utils/request.js'

// 首页左侧分类数据
export const homeBrandCateAPI = (data) => {
  return instance.get('/home/brand', {
    params: {
      limit: data
    }
  })
}

// 首页 轮播图数据
export const homeCarouselAPI = () => {
  return instance.get('/home/banner')
}

// 新鲜好物
export const homeNewGoodsAPI = () => {
  return instance.get('/home/new')
}

// 人气推荐
export const homeRecommendAPI = () => {
  return instance.get('/home/hot')
}

// 热门品牌
export const homeBrandAPI = () => {
  return instance.get('/home/brand')
}

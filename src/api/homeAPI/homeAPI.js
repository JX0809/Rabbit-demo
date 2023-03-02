import instance from '@/utils/request.js'

// 首页左侧分类数据
export const homeBrandCateAPI = (val) => {
  return instance.get('/home/brand', {
    params: {
      limit: val
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
export const homeBrandAPI = (val) => {
  return instance.get('/home/brand',
    {
      params: {
        limit: val
      }
    }
  )
}

// 产品区块
export const homeProductsAPI = () => {
  return instance.get('/home/goods')
}

// 专题
export const homeSpecialAPI = (val) => {
  return instance.get('/home/special', {
    params: {
      limit: val
    }
  })
}

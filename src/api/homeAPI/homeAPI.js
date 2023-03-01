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

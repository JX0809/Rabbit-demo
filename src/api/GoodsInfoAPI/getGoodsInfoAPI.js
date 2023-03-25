import instance from '@/utils/request'
import axios from 'axios'

// 获取商品详情
export const getGoodsInfoAPI = (id) => {
  return instance.get('/goods', { params: { id } })
}

// 同类推荐 / 猜你喜欢:     // 获取商品同类推荐-未传入ID为猜喜欢
export const getGoodsRecommendAPI = (id) => {
  return instance.get('/goods/relevant', {
    params: {
      id,
      limit: 16
    }
  })
}

//  热榜
// type:  1为24小时，2为周榜，3为总榜，默认为1
export const getHotGoodsList = (id, type) => {
  return instance.get('/goods/hot', {
    params: {
      id,
      type,
      limit: 4
    }
  })
}

// 商品评价标签
export const getGoodsCommentTagsAPI = (id) => {
  return instance.get(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`)
}

// 商品评论列表
export const getGoodsCommentListAPI = (id, req) => {
  return axios.get(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, { params: req })
}

import instance from '@/utils/request.js'

export const homeBrandCateAPI = () => {
  return instance.get('/home/brand', {
    params: {
      limit: 9
    }
  })
}

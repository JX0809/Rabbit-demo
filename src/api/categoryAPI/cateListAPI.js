import instance from '@/utils/request.js'

export const MainCateListAPI = (id) => {
  return instance.get('/category', { params: { id } })
}

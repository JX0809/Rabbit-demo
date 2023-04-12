import instance from '@/utils/request'

// 生成订单
export const createOrderAPI = () => {
  return instance.get('/member/order/pre')
}

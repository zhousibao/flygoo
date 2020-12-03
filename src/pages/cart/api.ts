import request from '@/utils/axios'

// 购物车列表
export function cartList(params){
  return request({
    url: '/api/cart/list',
    method: 'GET',
    json: true,
    params,
  })
}


import request from '@/utils/axios'

// 商品详情
export function goodsDetail(params){
  return request({
    url: '/api/home/goodsDetail',
    method: 'GET',
    json: true,
    params,
  })
}


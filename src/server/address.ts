import request from '@/utils/axios'

// 地址列表
export function addresslist(params){
  return request({
    url: '/api/address/list',
    method: 'GET',
    json: true,
    params,
  })
}

// 地址详情
export function addressDetail(params){
  return request({
    url: '/api/address/detail',
    method: 'GET',
    json: true,
    params,
  })
}

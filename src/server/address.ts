import request from '@/utils/axios'

// 获取首页tabs
export function addresslist(params){
  return request({
    url: '/api/address/list',
    method: 'GET',
    json: true,
    params,
  })
}

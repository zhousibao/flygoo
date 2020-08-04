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

// 新增收获地址
export function addressCreate(data){
  return request({
    url: '/api/address/create',
    method: 'POST',
    json: true,
    data,
  })
}

// 编辑收获地址
export function addressEdit(data){
  return request({
    url: '/api/address/edit',
    method: 'POST',
    json: true,
    data,
  })
}

// 删除收获地址
export function addressDelete(data){
  return request({
    url: '/api/address/delete',
    method: 'POST',
    json: true,
    data,
  })
}

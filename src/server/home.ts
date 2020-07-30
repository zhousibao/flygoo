import request from '@/utils/axios'

// 获取首页tabs
export function commonTags(){
  return request({
    url: '/api/home/getCommonTags',
    method: 'GET',
    json: true,
  })
}

// 获取首页tabs
export function menuContent(params){
  return request({
    url: '/api/home/getMenuContent',
    method: 'GET',
    json: true,
    params,
  })
}


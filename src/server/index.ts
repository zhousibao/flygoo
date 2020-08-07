import request from '@/utils/axios'

/**
 * 全局api
 */


// 权限 获取省市区地址
export function addressSelect(){
  return request({
    url: '/api/common/addressSelect',
    method: 'GET',
    json: true,
  })
}


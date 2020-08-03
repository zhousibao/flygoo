import request from '@/utils/axios'

/**
 * 全局api
 */

/** *
 * ajax({url,method,content,params,data})
 *
 * @param {string}  url，(必填)
 * @param {string}  method,默认post
 * @param {boolean} json, content-type类型
 * @param {object}  params
 * @param {object}  data
 *
 */


// 权限 获取省市区地址
export function addressSelect(){
  return request({
    url: '/api/common/addressSelect',
    method: 'GET',
    json: true,
  })
}


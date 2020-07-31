import request from '@/utils/axios'

// 获取验证码
export function getCode(){
  return request({
    url: '/api/user/getCode',
    method: 'POST',
    json: true,
  })
}

// 登录
export function login(data){
  return request({
    url: '/api/user/login',
    method: 'POST',
    json: true,
    data,
  })
}


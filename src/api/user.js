import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取验证码
export function getCodeImg(params) {
  return request({
    url: '/captcha',
    responseType: 'blob',
    params
  })
}

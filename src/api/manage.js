import request from '@/utils/request'
// getAction
export function getAction (url, params) {
  return request({
    url,
    method: 'get',
    params,
  })
}
export function postAction (url, data) {
  return request({
    url,
    method: 'post',
    data,
  })
}
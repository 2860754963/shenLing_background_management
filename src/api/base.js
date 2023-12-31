import request from '@/utils/request'

export function getDepartTree () {
  return request({
    url: '/business-hall/tree'
  })
}

// 获取机构详情

export function getDepartDetail (id) {
  return request({
    url: `/business-hall/${id}`
  })
}

// 根据机构id获取用户列表
export function getUserListByDepartId (params) {
  return request({
    url: `/business-hall/user/page`,
    params
  })
}
// 获取城市列表
export function getCityList (params) {
  return request({
    url: `/areas/children`,
    params
  })
}

export function saveDepart (data) {
  return request({
    url: '/business-hall',
    method: 'post',
    data
  })
}
// 运费模板列表
export function freightManage () {
  return request({
    url: '/carriages'
  })
}

// 新增/修改运费模板列表
export function saveFreight (data) {
  return request({
    url: '/carriages',
    method: 'post',
    data
  })
}
// 删除运费模板
export function deleteFreight (id) {
  return request({
    url: `/carriages/${id}`,
    method: 'delete'
  })
}


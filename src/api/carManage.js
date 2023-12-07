import request from '@/utils/request'

// 车型管理
// 获取车辆类型分页数据
export function getCarTypeList (params) {
  return request({
    url: '/truckType/page',
    method: 'get',
    params
  })
}
// 添加车辆类型
export function addCarType (data) {
  return request({
    url: '/truckType',
    method: 'post',
    data
  })
}
// 删除车辆类型
export function deleteCarType (id) {
  return request({
    url: `/truckType/${id}`,
    method: 'delete'
  })
}
// 修改车辆类型
export function updateCarType (data) {
  return request({
    url: `/truckType/${data.id}`,
    method: 'put',
    data
  })
}
// 获取车辆类型信息列表

export function truckTypesimple () {
  return request({
    url: '/truckType/simple',
    method: 'get'
  })
}
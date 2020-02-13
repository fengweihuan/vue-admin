import request from '@/utils/request'

export function getMaterialData(params) {
  return request({
    url: '/material/list',
    method: 'get',
    params
  })
}
export function createMaterialData(data) {
  return request({
    url: '/material/create',
    method: 'post',
    data
  })
}
export function editMaterialData(payload) {
  const { _id, ...data } = payload
  return request({
    url: `/material/${_id}`,
    method: 'put',
    data
  })
}
export function deleteMaterialData(id) {
  return request({
    url: `/material/${id}`,
    method: 'delete'
  })
}

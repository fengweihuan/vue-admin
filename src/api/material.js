import request from '@/utils/request'

export function getMaterialData(data) {
  return request({
    url: '/material/list',
    method: 'post',
    data
  })
}
export function createMaterialData(data) {
  return request({
    url: '/material/create',
    method: 'post',
    data
  })
}
export function editMaterialData(data) {
  return request({
    url: '/material/edit',
    method: 'post',
    data
  })
}
export function deleteMaterialData(id) {
  return request({
    url: '/material/delete',
    method: 'get',
    params: { id }
  })
}

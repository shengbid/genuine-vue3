import request from '@/utils/request'
import {handlePage} from'@/utils'

export function getList(params) {
  return request({
    url: '/gsh/listByTGshUser',
    method: 'get',
    params: handlePage(params)
  })
}

export function toFreeze(id, type) {
  return request({
    url: `/gsh/freeze/${id}/${type}`,
    method: 'delete',
  })
}

export function toBatchMassage(data) {
  return request({
    url: '/gsh/batchMassage',
    method: 'post',
    data,
  })
}

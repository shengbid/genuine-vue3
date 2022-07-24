import request from '@/utils/request'
import { handlePage } from '@/utils'

export function getList(params) {
  return request({
    url: '/gsh/listByTRequirement',
    method: 'get',
    params: handlePage(params),
  })
}

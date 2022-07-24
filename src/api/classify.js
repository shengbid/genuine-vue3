import request from '@/utils/request'
import { handlePage } from '@/utils'

export function getList(params) {
  return request({
    url: '/gsh/listByTIndustry',
    method: 'get',
    params: handlePage(params),
  })
}

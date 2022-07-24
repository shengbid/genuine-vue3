import request from '@/utils/request'
import { handlePage } from '@/utils'

export function getList(params) {
  return request({
    url: '/gsh/listByTSugestion',
    method: 'get',
    params: handlePage(params),
  })
}

export async function setSugestionStatus(id) {
  return request(`/gsh/setSugestionStatus/${id}`, {
    method: 'put',
  })
}

import request from '@/utils/request'
import { handlePage } from '@/utils'

export function getList(params) {
  return request({
    url: '/gsh/listByTReport',
    method: 'get',
    params: handlePage(params),
  })
}

export async function setSugestionStatus(id) {
  return request(`/gsh/setReportStatus/${id}`, {
    method: 'put',
  })
}

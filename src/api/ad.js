import request from '@/utils/request'
import { handlePage } from '@/utils'

export function getList(params) {
  return request({
    url: '/gsh/listByTAdvertisement',
    method: 'get',
    params: handlePage(params),
  })
}

export async function deleteAd(id) {
  return request(`/gsh/setReportStatus/${id}`, {
    method: 'put',
  })
}

import http from '@/utils/http-client'
const collection = 'hddt'

export function getHDDT(params) {
  // return new Promise((resolve, reject) => {
  return http.post(collection, params)
  // .then((res) => {
  //   resolve(res)
  // })
  // .catch((err) => {
  //   message.error(err)
  // })
  // .finally(() => {
  //   if (callback) callback()
  // })
  // })
}
export function getKyHoaDon(params) {
  return http.get(collection, params)
}
export function getHDDTOld(params) {
  return http.post(`${collection}/old`, params)
}
export function getTableHDDT(params) {
  return http.get(`${collection}/table`, { params: params.data })
}
export function getHDDTDULIEU(params) {
  return http.post(`${collection}/dulieucbg`, params)
}

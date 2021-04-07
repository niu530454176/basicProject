import request from '@/utils/request'
import {requestParameter} from '@/api/config'
let serviceApi = {}
for (let obj of Object.values(requestParameter)) {
  for (let [k, v] of Object.entries(obj)) {
    serviceApi[k] = function (body, formData) {
      return request[v.type]({
        url: v.url,
        body,
        formData: formData
      })
    }
  }
}
export const service = serviceApi

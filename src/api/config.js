/**
 * 根据需要引入多文件配置
 * */
import * as test from './test'

/**
 * type 请求方式
 * 1. get   get  请求数据
 * 2. postJson   json 数据请求    添加参数  formData  请求数据携带  formData数据（ formData: true）
 * 3. post   form 数据请求
 * 4. postFile 提交文件
 */
let importStr = {
  test
}
let parameter = {
  // 协议
  agreement: {
    // 列表查询
    agreementList: {
      url: `/agreement-service/agreement/list`,
      type: 'postJson'
    },
  }
}

Object.entries(importStr).forEach(([key, value]) => {
  Object.values(value).forEach(item => {
    parameter[key] = item
  })
})
export const requestParameter = parameter

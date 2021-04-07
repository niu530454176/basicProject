import {fileDomain} from '@/utils'
import {service} from '@/api/index.js'
import * as dd from 'dingtalk-jsapi'
import messagebox from '@/utils/commonMessagebox'
import store from "@/store";

/**
 * 正则验证
 * phone: 手机号码
 * tel: 固定电话
 * email: 邮箱
 * trustworthiness：统一社会信用代码
 * */
export function regularVerification(verifiedString, type) {
  let pattern;
  if (type === 'phone') {
    pattern = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  } else if (type === 'tel') {
    pattern = /^\d{3}-\d{8}$|^\d{4}-\d{7}$/;
  } else if (type === 'email') {
    pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  } else if (type === 'trustworthiness') {
    pattern = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/
  }
  return pattern.test(verifiedString)
}

/**
 * 通过值对应选项
 * */
export function transformMap(option, value = 'value', label = 'label') {
  let str = {};
  option.forEach(item => {
    str[item[value]] = item[label]
    str[`${item[value]}icon`] = item.icon
  })
  return str
}

/**
 * 检测必填项
 * */
export function checkRequired(form, requiredForm) {
  let tips = '';
  for (let str in requiredForm) {
    if (!form[str] && form[str] !== 0 && form[str] !== '0') {
      tips = requiredForm[str]
      return tips
    }
  }
  return tips
}

/**
 * 通过值对应选项
 * */
export function transformRequest(option) {
  let str = {};
  option.forEach(item => {
    str[item.dataKey] = item.dataValue
  })
  return str
}


/**
 * 通过属性排序
 * */
export function sortFun(property, changeNum) {
  return (a, b) => {
    return a[property] - b[property]
  }
}

export default {
  fileDomain,
  regularVerification,
  transformMap,
  checkRequired,
  transformRequest,
  sortFun,
  service,
}

import axios from 'axios'
import qryStr from "query-string"
import qs from 'qs'
import router from '../router'
import Vue from "vue"
import MessageBox from "./commonMessagebox";
import store from "../store";
import { getToken } from '@/utils/auth'
axios.defaults.timeout = 60000;
/**
 * 封装get方法
 */
let defaultHeaders = {
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
}

const warning = (res) => {
  if (res.code === 60000) {
    MessageBox.MessageError(res.message)
    // setTimeout(() => {
    //   store.dispatch('user/logout')
    //   router.push(`/login`)
    // })
  } else if (res.code === 10000) {
    MessageBox.MessageWarning(res.message)
  } else if (res.code === 40401) {
    MessageBox.MessageError(res.message)
  } else {
    MessageBox.MessageError(res.message)
  }
}

const err = (error) => {
  if (error.response) {
    const data = error.response.data;
    if (data) {
      console.log(data);
      if (data.code === 401) {
        MessageBox.MessageError(data.message || '签名错误!')
        // setTimeout(() => {
        //   router.push('/login')
        // })
      } else if (data.code === 400) {
        MessageBox.MessageError(data.message || '无效的请求:缺少参数或类型不匹配!')
      } else if (data.code === 404) {
        MessageBox.MessageError(data.message || '无效的访问地址！')
      }  else if (data.code === 405) {
        MessageBox.MessageError(data.message || '请求方式不支持!')
      }  else if (data.code === 406) {
        MessageBox.MessageError(data.message || '媒体类型不支持!')
      }  else if (data.code === 429) {
        MessageBox.MessageError(data.message || '访问太过频繁，请稍后再试!')
      } else if (data.code === 40101) {
        MessageBox.MessageError(data.message || '账户名与密码不匹配，请重新输入！')
      } else if (data.code === 40102) {
        MessageBox.MessageError('账号已过期!')
        setTimeout(() => {
          router.push('/login')
        })
      } else if (data.code === 40103) {
        MessageBox.MessageError('账号已过期!')
        setTimeout(() => {
          router.push('/login')
        })
      } else if (data.code === 40104) {
        MessageBox.MessageError('凭证已过期!')
        setTimeout(() => {
          router.push('/login')
        })
      } else if (data.code === 40105) {
        MessageBox.MessageError('账号已被锁定!')
        setTimeout(() => {
          router.push('/login')
        })
      } else if (data.code === 403) {
        MessageBox.MessageError('访问权限不足!')
        setTimeout(() => {
          router.push('/login')
        })
      } else if (data.code === 40301) {
        MessageBox.MessageError('IP或域名拒绝访问!')
        setTimeout(() => {
          router.push('/login')
        })
      } else if (data.code === 40301) {
        MessageBox.MessageError('IP或域名拒绝访问!')
        setTimeout(() => {
          router.push('/login')
        })
      } else if (data.code === 40302) {
        MessageBox.MessageError('IP或域名不在白名单内!')
        setTimeout(() => {
          router.push('/login')
        })
      } else if (data.code === 40303) {
        MessageBox.MessageError('权限不足,授权已过期!')
        setTimeout(() => {
          router.push('/login')
        })
      } else if (data.code === 500) {
        MessageBox.MessageError('系统繁忙!')
      } else if (data.code === 503) {
        MessageBox.MessageError('服务暂时无法访问!')
      } else if (data.code === 504) {
        MessageBox.MessageError('服务请求超时!')
      } else {
        MessageBox.MessageError(data.message || '网络异常')
      }
    } else {
      MessageBox.MessageError('系统繁忙!')
    }
  }
  return Promise.reject(error)
}
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30000,
});
service.interceptors.response.use(function (response, error) {
  const status = response.status
  if (status === 200) {
    return Promise.resolve(response)
  } else if (status === 401) {
    router.push('/login')
  } else {
    return Promise.reject(response)
  }
})
export default {
  defaultHeaders: defaultHeaders,
  defaultOptions: {
    credentials: 'same-origin'
  },
  _toQs(body) {
    let qsUrl = {}
    Object.keys(body).forEach((key) => {
      if (body[key] !== undefined) {
        qsUrl[key] = body[key]
      }
    })
    return qryStr.stringify(qsUrl)
  },
  get({url, body = {}, headers = {}, options = {}, resType = 'json'}) {
    if (body && this._toQs(body)) {
      url += `?${this._toQs(body)}`
    }
    options = Object.assign(this.defaultOptions, options)
    return new Promise((resolve, reject) => {
      axios.get( process.env.VUE_APP_BASE_API + url, {
        headers: {
          Authorization: getToken(),
          ...this.defaultHeaders,
          headers
        },
        responseType: resType,
        ...options
      }).then(response => {
        if (resType === 'blob') {
          if (response.data.type === 'application/json' && url.indexOf('/excel/') === -1) {
            let reader = new FileReader()
            reader.onload = e => {
              warning(JSON.parse(e.target.result));
            }
            reader.readAsText(response.data)
            Vue.Message.closeAll()
          } else {
            resolve(response.data);
          }
        } else {
          if (response.data.code === 200 || response.data.type && response.data.type.indexOf('application') !== -1) {
            resolve(response.data);
          } else {
            resolve({})
            warning(response.data);
          }
        }
      }).catch(response => {
        err(response)
        reject(response.data);
      })
    })
  },
  /**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  postJson({url, body = {}, headers = {}, options = {}, resType = 'json', formData}) {
    options = Object.assign(this.defaultOptions, options)
    let fetchOptions = {
      method: 'POST',
      body: body,
      headers: {
        Authorization: getToken(),
        ...this.defaultHeaders,
        ...headers
      },
      ...options
    }
    fetchOptions.headers['Content-Type'] = 'application/json;charset=UTF-8'
    headers = fetchOptions.headers
    headers.Authorization = getToken()
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.VUE_APP_BASE_API + url,
        method: 'post',
        data: fetchOptions.body,
        headers: headers,
        responseType: resType,
      }).then(response => {
        if (formData) {
          resolve(response);
        } else if (!response.data) {
          resolve(response);
        } else if (response.data.code === 200 || response.data.type && response.data.type.indexOf('application') !== -1) {
          resolve(response.data);
        } else {
          resolve({})
          warning(response.data);
        }
      }).catch(response => {
        err(response)
        reject(response.data);
      })
    })
  },
  post({url, body = {}, headers = {}, options = {}, resType = 'json', formData}) {
    options = Object.assign(this.defaultOptions, options)
    let fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: getToken(),
        ...this.defaultHeaders,
        ...headers,
      },
      ...options
    }
    fetchOptions.body = qs.stringify({...body});
    defaultHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    headers = defaultHeaders
    headers.Authorization = getToken()
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.VUE_APP_BASE_API + url,
        method: 'post',
        data: fetchOptions.body,
        headers: headers,
        responseType: resType
      }).then(response => {
        if (formData) {
          resolve(response);
        } else if (response.data.code === 200 || response.data.type && response.data.type.indexOf('application') !== -1) {
          resolve(response.data);
        } else {
          resolve({})
          warning(response.data);
        }
      }).catch(response => {
        err(response)
        reject(response.data);
      })
    })
  },
  postFile({url, body = {}, headers = {}, options = {}, resType = 'json', formData}) {
    options = Object.assign(this.defaultOptions, options)
    let fetchOptions = {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      ...options
    }
    fetchOptions.body = qs.stringify({...body});
    defaultHeaders['Content-Type'] = 'multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq';
    headers = defaultHeaders
    headers.Authorization = getToken()
    return new Promise((resolve, reject) => {
      axios({
        url: process.env.VUE_APP_BASE_API + url,
        method: 'post',
        data: body,
        headers: headers
      }).then(response => {
        resolve(response.data);
      }).catch(response => {
        err(response)
        reject(response.data);
      })
    })
  },
}

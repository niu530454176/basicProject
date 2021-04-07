import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
const whiteList = ['/login', '/auth-redirect', '/satisfactionSurvey'] // 跳过登录页面集合
router.beforeEach(async(to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    next()
  } else {
    next()
  }
})

router.afterEach(() => {
  // finish progress bar
})

import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import '@/assets/css/iconfont.css'
import messagebox from '@/utils/commonMessagebox'
import _ from 'lodash'
Vue.prototype._ = _
Vue.prototype.$MessageBox = messagebox
import App from './App'
import router from './router'
import store from './store'
import './utils/error-log' // error log
import VXEUtils from 'vxe-utils'
import XEUtils from 'xe-utils'
import * as dd from 'dingtalk-jsapi'
import elTableInfiniteScroll from 'el-table-infinite-scroll';
Vue.use(elTableInfiniteScroll);
import vuedraggable from 'vuedraggable';
Vue.component('vuedraggable', vuedraggable);
if(dd.env.platform !== "notInDingTalk") {
  localStorage.setItem('userInfo', '')
}
Vue.use(VXEUtils, XEUtils, {mounts: ['cookie']})
import * as filters from './filters' // global filters
import * as publicMethod from '@/utils/publicMethod'
Object.keys(publicMethod).forEach((item) => {
  Object.keys(publicMethod[item]).forEach((itemNxt) => {
    Vue.prototype[`$${itemNxt}`] = publicMethod[item][itemNxt]
  })
})

Element.Dialog.props.closeOnClickModal.default = false
Element.Dialog.props.closeOnPressEscape.default = false

Vue.directive('alterELDialogMarginTop'/*修改elementUI中el-dialog顶部的距离,传入值eg:{marginTop:'5vh'} */, {
  inserted(el, binding, vnode) {
    let ua = navigator.userAgent.toLowerCase();
    let s;
    s = ua.match(/iPad/i);
    el.firstElementChild.style.marginTop = binding.value.marginTop
  }
})
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
})

const context = require.context('@/components/common', true, /\.vue$/);
context.keys().forEach((key) => {
  const component = context(key).default;
  Vue.component(component.name, component);
});

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})


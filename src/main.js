import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import * as filters from './filters' // global filters
import * as directives from './directive'

import App from './App'
import store from './store'
import router from './router'

// import xtUi from './xt-components/xt-ui/index.js'
import xtUi from './xt-components/xt-ui/index'
import '@/icons' // icon
import '@/permission' // permission control
import api from '@/api'

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.use(xtUi)
Vue.prototype.$api = api

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 自定义指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

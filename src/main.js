import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import slideshows from './slideshows/slideshows.js'

import imagePreloader from 'vue-image-preloader'
import Eagle, { Options } from 'eagle.js'
import 'eagle.js/dist/eagle.css'
import hljs from 'highlight.js'
import VueMoment from 'vue-moment'
const moment = require('moment')

/* eslint-disable no-new */
require('moment/locale/pt-br')
Vue.use(VueMoment, { moment })
Vue.use(imagePreloader)
Vue.use(Eagle)
Vue.use(Router)
Vue.config.productionTip = false
Options.hljs = hljs

let routes = []
slideshows.list.forEach(function (slideshow) {
  routes.push({
    path: `/${slideshow.infos.path}`,
    component: slideshow,
    props: slideshow.props
  })
})
routes.push({ path: '*', redirect: { path: '/' } })

let router = new Router({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h('App'),
  components: { App }
})

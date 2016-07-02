/*
* @Author: DOKI
* @Date:   2016-06-03 13:44:17
* @Last Modified by:   fengyun2
* @Last Modified time: 2016-06-23 10:54:05
*/

'use strict';

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import lazyload from 'vue-lazyload'
import { timeToNow } from './api/filters'
import LyApp from './api/lyapp'

import { configRouter } from './router'

Vue.filter('timeToNow', timeToNow)

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(LyApp, {
  win: window,
  doc: document
})
Vue.use(lazyload, {
  error: './static/img/error.png',
  loading: './static/img/loading.gif',
  try: 3 // default 1
})

let router = new VueRouter({
  hashbang: true,
  history: false,
  saveScrollPosition: true,
  transitionOnLoad: true,
  suppressTransitionError: true,
  linkActiveClass: 'active'
})

configRouter(router)

const App = Vue.extend(require('./App.vue'))

router.start(App, '#app')




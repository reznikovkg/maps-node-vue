import Vue from 'vue'

import AtComponents from 'at-ui'
import 'at-ui-style'

import Router from 'vue-router'

import Login from '../components/auth/Login'

Vue.use(Router)
Vue.use(AtComponents)

export default new Router({
  mode: 'history',
  routes: [

    {
        path: '/login',
        name: 'auth-login',
        component: Login
    },
  ]
})

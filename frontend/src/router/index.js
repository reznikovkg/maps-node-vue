import Vue from 'vue'

import AtComponents from 'at-ui'
import 'at-ui-style'

import Router from 'vue-router'


import Login from '../components/auth/Login'
import Page from '../components/Page'

Vue.use(Router)
Vue.use(AtComponents)








export default new Router({
  mode: 'history',
  routes: [

    {
        path: '/login',
        name: 'auth-login',
        component: Login,
    },


    {
        path: '/page',
        name: 'page',
        component: Page,
    },
    // {
    //     path: '/register',
    //     name: 'auth-register',
    //     component: Register
    // },
  ]
})

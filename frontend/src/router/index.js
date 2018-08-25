import Vue from 'vue'

import Router from 'vue-router'
import AtComponents from 'at-ui'
import VueCookie from 'vue-cookie';

import 'at-ui-style'

Vue.use(Router);
Vue.use(AtComponents);
Vue.use(VueCookie);


import Auth from '../components/Auth'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'

import Page from '../components/Page'
import EditProfile from '../components/Page/EditProfile'
import EditPassword from '../components/Page/EditPassword'

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        redirect: 'login',
        name: 'auth',
        component: Auth,
        children: [
            {
                path: 'login',
                name: 'auth-login',
                components: {
                    default: Login,
                }
            },
            {
                path: 'register',
                name: 'auth-register',
                components: {
                    default: Register,
                }
            },
        ]
    },

    {
        path: '/page',
        name: 'page',
        component: Page,
        children: [
            {
                path: 'edit',
                name: 'edit-profile',
                component: EditProfile,
            },
            {
                path: 'edit-password',
                name: 'edit-password',
                components: {
                    default: EditPassword,
                },
            },
        ]
    },
    // {
    //     path: '/register',
    //     name: 'Auth-register',
    //     component: Register
    // },
  ]
})

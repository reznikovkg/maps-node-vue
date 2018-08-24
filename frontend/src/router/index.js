import Vue from 'vue'

import Router from 'vue-router'
import AtComponents from 'at-ui'
import VueCookie from 'vue-cookie';

import 'at-ui-style'

Vue.use(Router);
Vue.use(AtComponents);
Vue.use(VueCookie);

import Login from '../components/auth/Login'
import Page from '../components/Page'
import EditProfile from '../components/Page/EditProfile'

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
        children: [
            {
                path: 'edit',
                name: 'edit-profile',
                components: {
                    default: EditProfile,
                }
            },
            // {
            //     path: 'edit',
            //     name: 'edit-profile',
            //     components: {
            //         default: EditProfile,
            //     }
            // },
        ]
    },
    // {
    //     path: '/register',
    //     name: 'auth-register',
    //     component: Register
    // },
  ]
})

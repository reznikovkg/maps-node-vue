import Vue from 'vue'

import Router from 'vue-router'
import AtComponents from 'at-ui'
import VueCookie from 'vue-cookie';

import 'at-ui-style'


Vue.use(Router);
Vue.use(AtComponents);
Vue.use(VueCookie);

// import 'vue-googlemaps/dist/vue-googlemaps.css'
// import VueGoogleMaps from 'vue-googlemaps'
//
// Vue.use(VueGoogleMaps, {
//     load: {
//         // Google API key
//         apiKey: 'AIzaSyAus17T4GYjhlS9cQ-iRWaE09t788ot3es',
//         // Enable more Google Maps libraries here
//         libraries: ['places'],
//         // Use new renderer
//         useBetaRenderer: false,
//     },
// });


import Auth from '../components/Auth'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import Active from '../components/Auth/Active'

import Page from '../components/Page'
import EditProfile from '../components/Page/EditProfile'
import EditPassword from '../components/Page/EditPassword'

import Map from '../components/Page/Maps/Map'
import Notify from '../components/Page/Notify'

import Locations from '../components/Page/Maps/Locations'

import UserList from '../components/Admin/UserList'
import UserEdit from '../components/Admin/UserEdit'
import AdminLocations from '../components/Admin/Locations'

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
                    component: Login,
                    meta: {
                        title: 'Авторизация'
                    }
                },
                {
                    path: 'register',
                    name: 'auth-register',
                    component: Register,
                    meta: {
                        title: 'Регистрация'
                    }
                },
                {
                    path: 'active',
                    name: 'auth-active',
                    component: Active,
                    meta: {
                        title: 'Активировано'
                    }
                },
            ]
        },

        {
            path: '/page',
            name: 'page',
            component: Page,
            meta: {
                title: 'Добро пожаловать!'
            },
            children: [
                {
                    path: 'edit',
                    name: 'edit-profile',
                    component: EditProfile,
                    meta: {
                        title: 'Редактировать профиль'
                    }
                },
                {
                    path: 'edit-password',
                    name: 'edit-password',
                    component: EditPassword,
                    meta: {
                        title: 'Сменить пароль'
                    }
                },

                {
                    path: 'maps',
                    name: 'maps-map',
                    component: Map,
                    meta: {
                        title: 'Карта'
                    }
                },
                {
                    path: 'locations',
                    name: 'maps-locations',
                    component: Locations,
                    meta: {
                        title: 'Локации'
                    }
                },
                {
                    path: 'notify',
                    name: 'notify',
                    component: Notify,
                    meta: {
                        title: 'Уведомления'
                    }
                },

                //admin
                {
                    path: 'user-list',
                    name: 'user-list',
                    component: UserList,
                    meta: {
                        title: 'Список пользователей'
                    }
                },
                {
                    path: 'user-edit/:userId',
                    name: 'user-edit',
                    component: UserEdit,
                    meta: {
                        title: 'Редактировать пользователя'
                    }
                },
                {
                    path: 'admin-locations',
                    name: 'admin-locations',
                    component: AdminLocations,
                    meta: {
                        title: 'Локации'
                    }
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

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAus17T4GYjhlS9cQ-iRWaE09t788ot3es',
        libraries: 'places,geometry',
    },
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data () {
    return {
      domain: 'http://localhost:8888',
      user: {
          id: null,
          token: null,

          isAuthenticated: false,
          isActivate: false,
          isAdmin: false,

          username: '',
          birthday: ''
      }
    }
  },
  components: { App },
  template: '<App/>',
  methods: {
      viewNotify (_type,_title, _message) {
          this.$Notify({
              title: _title,
              message: _message,
              type: _type
          })
      },
      userOut: function () {
          this.user.token = null;
      },

      authenticated : function () {
            axios.get(`${this.domain}/api/Auth/connect`, {
                params: {
                    token: this.user.token
                }
            })
            .then((response) => {
                this.$cookie.set('token', this.user.token, 3);
                this.user.isAuthenticated = true;

                this.user.id = response.data.id;
                this.user.isActivate = response.data.isActivate;
                this.user.isAdmin = response.data.isAdmin;
                this.user.username = response.data.username;
                this.user.birthday = response.data.birthday;
            })
                .catch((error) => {
                    this.$cookie.delete('token');
                    this.user.isAuthenticated = false;

                    this.user.id = '';
                    this.user.isActivate = '';
                    this.user.isAdmin = '';
                    this.user.username = '';
                    this.user.birthday = '';
                    this.$router.push('/login');
                })
    }
  },
    mounted: function () {


    },
    watch: {
      'user.token' : {
          handler: function (val, oldVal) {
              this.authenticated();
              this.$root.viewNotify('success','Успешно', 'Вы успешно вошли');
          },
          deep: true
      },
        '$route' : {
            handler: function (val, oldVal) {
                document.title = this.$route.meta.title;
            },
            deep: true,
            immediate: true
        }
    },
    created: function () {
        if (this.$cookie.get('token')) {
            this.user.token = this.$cookie.get('token');
        }
    }

})

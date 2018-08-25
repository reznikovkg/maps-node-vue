// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data () {
    return {
      domain: 'http://localhost:8888',
      user: {
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
            axios.get(this.domain + '/api/Auth/connect', {
                params: {
                    token: this.user.token
                }
            })
            .then((response) => {
                this.$cookie.set('token', this.user.token, 3);
                this.user.isAuthenticated = true;

                this.user.isActivate = response.data.isActivate;
                this.user.isAdmin = response.data.isAdmin;
                this.user.username = response.data.username;
                this.user.birthday = response.data.birthday;

                this.$root.viewNotify('success','Успешно', 'Вы успешно вошли под именем - ' + this.user.username);
            })
                .catch((error) => {
                    this.$cookie.delete('token');
                    this.user.isAuthenticated = false;

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
          handler: function (val, oldVal) { this.authenticated() },
          deep: true
      }
    },
    created: function () {
        if (this.$cookie.get('token')) {
            console.log(11111);
            this.user.token = this.$cookie.get('token');
            console.log(211111);
        }
    }

})

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import Axios from 'axios'

import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'

Vue.prototype.$http = Axios;

Vue.prototype.$eventBus = new Vue();
// sync(store, router)
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  router,
  created () {
    const token = localStorage.getItem('token')
    const user_id = localStorage.getItem('user_id')
    
    if (token) {
      // const userData = JSON.parse(userInfo)
      this.$store.commit('setToken', token)
    }
    if (user_id) {
      // const userData = JSON.parse(userInfo)
      this.$store.commit('setUserId', user_id)
    }
    let me = this;
    Axios.interceptors.response.use(
      response => response,
      error => {
        
        if (error.response.status === 401 || error.response.status === 403) {
          // user logout
          me.$store.commit('logout');
          
        }else
        return Promise.reject(error)
      }
    )
  },
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

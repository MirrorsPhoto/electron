import Vue from 'vue'
import VueElectron from 'vue-electron'
import Axios from './plugins/axios'

import store from './store'

Vue.use(VueElectron)
Vue.config.productionTip = false
Vue.config.performance = true

new Vue({
  el: '#app',
  store,
  template: '<App ref="app"></App>',
  components: {
    App: require('./App')
  },
  beforeCreate() {
    Vue.prototype.$http = Axios(this)
  }
})
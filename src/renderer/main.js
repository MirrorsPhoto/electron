import Vue from 'vue'
import VueElectron from 'vue-electron'
import Online from 'online-js'
import axios from './plugins/axios'
import store from './plugins/store'
import config from './config'

Vue.use(VueElectron)
Vue.config.productionTip = false
Vue.config.performance = true
Vue.prototype.$online = process.env.NODE_ENV !== 'development' && Online({ url: config.url.api })

new Vue({
  el: '#app',
  store,
  template: '<App ref="app"></App>',
  components: {
    App: require('./App')
  },
  beforeCreate() {
    Vue.prototype.$http = axios(this, config.url.api)
  }
})

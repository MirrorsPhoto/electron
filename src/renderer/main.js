import Vue from 'vue'
import VueElectron from 'vue-electron'
import Axios from './plugins/axios'
import Online from 'online-js'
import store from './store'

const url = 'http://api.jonkofee.ru'

Vue.use(VueElectron)
Vue.config.productionTip = false
Vue.config.performance = true
Vue.prototype.$online = process.env.NODE_ENV !== 'development' && Online({ url })

new Vue({
  el: '#app',
  store,
  template: '<App ref="app"></App>',
  components: {
    App: require('./App')
  },
  beforeCreate() {
    // Запрет на зум
    this.$electron.webFrame.setZoomLevelLimits(1, 1)

    Vue.prototype.$http = Axios(this, url)
  }
})
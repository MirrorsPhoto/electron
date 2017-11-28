import Vue from 'vue'
import VueElectron from 'vue-electron'
import Online from 'online-js'
import axios from './plugins/axios'
import store from './plugins/store'
import filters from './plugins/filters'
import config from './config'

Vue.use(VueElectron)

for (const filter in filters) {
  const cb = filters[filter]
  Vue.filter(filter, cb)
}

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
    // Запрет на зум
    this.$electron.webFrame.setZoomLevelLimits(1, 1)

    Vue.prototype.$http = axios(this, config.url.api)
  }
})

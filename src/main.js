import Vue from 'vue'
import VueElectron from 'vue-electron'
import Axios from './plugins/axios'
import Online from './plugins/online'
import store from './store'

const url = 'http://31.131.129.126'

Vue.use(VueElectron)
Vue.config.productionTip = false
Vue.config.performance = true
Vue.prototype.$online = Online({ url })

new Vue({
  el: '#app',
  store,
  template: '<App ref="app"></App>',
  components: {
    App: require('./App')
  },
  beforeCreate() {
    Vue.prototype.$http = Axios(this, url)
  },
  created() {
    this.$online.onUpdateStatus(status => this.$store.commit('setConnectStatus', status))
  }
})
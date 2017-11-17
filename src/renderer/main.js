import Vue from 'vue'
import VueElectron from 'vue-electron'
import Online from 'online-js'
import Axios from './plugins/axios'
import { VAnimate, styles } from './plugins/v-animate/'
import store from './plugins/store'

const url = 'http://api.jonkofee.ru'

Vue.use(VueElectron)
Vue.use(VAnimate)
Vue.prototype.$online = process.env.NODE_ENV !== 'development' && Online({ url })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: {
    App: require('./App')
  },
  beforeCreate() {
    Vue.prototype.$http = Axios(this, url)
  }
})

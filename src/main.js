import Vue from 'vue'
import VueElectron from 'vue-electron'
import Axios from './plugins/axios'

import store from './store'


Vue.use(VueElectron)
Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.config.performance = true


const vm = new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: { App: require('./App') }
})
import Vue from 'vue'
import electron from 'vue-electron'
import Axios from './plugins/axios'

import router from './plugins/router'
import store from './plugins/store'

import App from './App'

Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.use(electron)

const vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});

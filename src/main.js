import Vue from 'vue'
import axios from './plugins/axios';

import App from './App'
import router from './plugins/router';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$http = axios;

/* eslint-disable no-new */
const vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});

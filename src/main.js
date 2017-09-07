import Vue from 'vue';

import router from './plugins/router';
import axios from './plugins/axios';

import App from './App';

Vue.prototype.$http = axios;

const vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
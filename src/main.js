import Vue from 'vue';

import router from './router';
import App from './App';
import axios from './axios';

Vue.prototype.$http = axios;

const vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
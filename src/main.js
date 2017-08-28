import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';

import routes from './routes';

import App from './App';


//  Vue-Router
Vue.use(VueRouter);
const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.private)) {
        const token = localStorage.getItem('token');
        (!token) ? next({ path: '/login' }) : next();
    }
    else next();
});

//  Axios
Vue.prototype.$http = Axios.create({
    baseURL: 'http://mirrors.local'
});

Vue.prototype.$http.interceptors.request.use(
    response => {
        const token = localStorage.getItem('token');
        if (token) response.headers['Authorization'] = 'Bearer ' + token;
        return response;
    },
    error => Promise.reject(error)
);

Vue.prototype.$http.interceptors.response.use(
    response => response,
    error => {
        if (error.request.status === 401) {
            if (localStorage.getItem('token')) localStorage.removeItem('token');
            vm.$router.push('/login');
        }
        return Promise.reject(error);
    }
);

const vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
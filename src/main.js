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
    baseURL: 'http://jonkofee.ru',
    transformRequest: data => {
        let res = '';
        Object.keys(data).forEach(key => res += key + '=' + data[key] + '&');
        return res;
    }
});

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
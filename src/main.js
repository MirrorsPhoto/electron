import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import mixins from './mixins';

var instanceAxios = axios.create({
    baseURL: 'http://jonkofee.ru',
    onDownloadProgress: progressEvent => {
        if (progressEvent.currentTarget.status === 401) {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }
});

Vue.use(VueAxios, instanceAxios);
Vue.use(VueRouter);
Vue.mixin(mixins);

import App from './App';
import { routes } from './routes.js';

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.private)) {
    const token = localStorage.getItem('token');
    (!token) ? next({ path: '/login' }) : next();
  } else next();
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
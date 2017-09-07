import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import routes from './routes';

const vueRouter = new Router({ routes });

vueRouter.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.private)) {
        const token = localStorage.getItem('token');
        (!token) ? next({ path: '/login' }) : next();
    }
    else next();
});

export default vueRouter;
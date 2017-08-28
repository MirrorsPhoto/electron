import Auth from './components/pages/auth.vue';
import Index from './components/pages/index.vue';

export default [
    {
        path: '/login',
        component: Auth
    },
    {
        path: '/',
        component: Index,
        meta: { private: true }
    }
];

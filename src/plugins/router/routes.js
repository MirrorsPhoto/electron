import Index from '../../components/pages/Index.vue';
import Auth from '../../components/pages/Auth.vue';

export default [
    {
        path: '/',
        component: Index,
        meta: { private: true }
    },
    {
        path: '/login',
        component: Auth
    }
];
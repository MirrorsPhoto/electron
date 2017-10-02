import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import jwtDecode from 'jwt-decode'

export default new Vuex.Store({
    state: {
        token: ''
    },
    getters: {
        userData: state => state.token ? jwtDecode(state.token) : null
    },
    mutations: {
        setToken: (state, token) => state.token = token
    }
})
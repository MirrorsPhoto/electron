import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import jwtDecode from 'jwt-decode'

export default new Vuex.Store({
    state: {
        token: '',
        counts: {
            money: 0,
            clients: 0
        }
    },
    getters: {
        userData: state => state.token ? jwtDecode(state.token) : null
    },
    mutations: {
        setToken: (state, token) => state.token = token,
        addSale: (state, summ) => {
            state.counts.money += summ
            state.counts.clients++
        }
    }
})
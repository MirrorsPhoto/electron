import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import jwtDecode from 'jwt-decode'

const initialState = {
    token: '',
    counts: {
        money: 0,
        clients: 0
    }
}

export default new Vuex.Store({
    state: {},
    getters: {
        userData: state => state.token ? jwtDecode(state.token) : null        
    },
    mutations: {
        initState: state => {
            for (let key in initialState) {
                const value = initialState[key]
                Vue.set(state, key, (typeof value === 'object') ? Object.assign({}, value) : value)
            }
        },
        setToken: (state, token) => state.token = token,
        addSale: (state, summ) => {
            state.counts.money += summ
            state.counts.clients++
        }
    }
})
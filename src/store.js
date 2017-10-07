import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const initialState = {
    user: {},
    counts: {
        money: 0,
        clients: 0
    }
}

export default new Vuex.Store({
    state: {},
    mutations: {
        initState: state => {
            for (let key in initialState) {
                const value = initialState[key]
                Vue.set(state, key, (typeof value === 'object') ? Object.assign({}, value) : value)
            }
        },
        initUser: (state, data) => state.user = data,
        addSale: (state, summ) => {
            state.counts.money += summ
            state.counts.clients++
        }
    }
})

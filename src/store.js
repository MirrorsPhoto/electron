import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//  Состояние, которое должно обнуляться при авторизации
const initialState = {
  user: {},
  clients: 0,
  stats: {
    'Фотография': 0,
    'Продажа': 0,
    'Ксерокопия': 0,
    'Ламинация': 0
  }
}

export default new Vuex.Store({
  state: {
    online: null
  },
  getters: {
    moneySumm: ({ stats }) => Object.keys(stats).reduce((sum, key) => sum += stats[key], 0)
  },
  mutations: {
    setConnectStatus: (state, status) => state.online = status,
    initState: state => {
      for (let key in initialState) {
        const value = initialState[key]
        Vue.set(state, key, (typeof value === 'object') ? Object.assign({}, value) : value)
      }
    },
    initUser: (state, data) => state.user = data,
    addSale: (state, items) => {
      items.forEach(({ title, summ }) => {
        const prop = state.stats.hasOwnProperty(title) ? title : 'Продажа'
        state.stats[prop] += summ 
      })
      state.clients = state.clients + 1
    }
  }
})
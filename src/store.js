import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//  Состояние, которое должно обнуляться при авторизации
const initialState = {
  user: {},
  counts: {
    money: 0,
    clients: 0
  },
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
  mutations: {
    setConnectStatus: (state, status) => state.online = status,
    initState: state => {
      for (let key in initialState) {
        const value = initialState[key]
        Vue.set(state, key, (typeof value === 'object') ? Object.assign({}, value) : value)
      }
    },
    initUser: (state, data) => state.user = data,
    addSale: (state, { summ, items }) => {
      state.counts.money += summ
      state.counts.clients++
      items.forEach(item => {
        state.stats[item.title] += item.count
      })
    }
  }
})
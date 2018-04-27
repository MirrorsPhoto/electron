import Vue from 'vue'
import Vuex from 'vuex'
import locale from '../locales'

Vue.use(Vuex)

//  Состояние, которое должно обнуляться при авторизации
const initialState = {
  user: {},
  clients: 0,
  stats: {
    photo: {
      name: locale('services.photo'),
      cash: 0
    },
    good: {
      name: locale('services.good'),
      cash: 0
    },
    copy: {
      name: locale('services.copy'),
      cash: 0
    },
    lamination: {
      name: locale('services.lamin'),
      cash: 0
    }
  }
}

export default new Vuex.Store({
  state: {
    online: null
  },
  getters: {
    moneySumm: ({ stats }) => Object.keys(stats).reduce((sum, key) => sum += stats[key].cash, 0)
  },
  mutations: {
    setConnectStatus: (state, status) => state.online = status,
    initState: state => {
      for (let prop in initialState) {
        Vue.set(state, prop, JSON.parse(JSON.stringify(initialState[prop])))
      }
    },
    initUser: (state, data) => state.user = data,
    addSale: (state, data) => {
      for (let type in data.cash) {
        state.stats[type].cash = data.cash[type]
      }
      state.clients = data.client_count
    }
  }
})

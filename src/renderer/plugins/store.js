import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//  Состояние, которое должно обнуляться при авторизации
const initialState = {
  user: {},
  clients: 0,
  stats: {
    photo: {
      name: 'Фотография',
      cash: 0
    },
    good: {
      name: 'Продажа',
      cash: 0
    },
    copy: {
      name: 'Ксерокопия',
      cash: 0
    },
    lamination: {
      name: 'Ламинация',
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
      
      for (let type in data.cash.today) {
        if (state.stats.hasOwnProperty(type)) {
          state.stats[type].cash = data.cash.today[type]
        }
      }
      state.clients = data.client.today
    }
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//  Состояние, которое должно обнуляться при авторизации
const initialState = {
  user: {},
  clients: {
    today: 0,
    week: 0,
    month: 0,
    year: 0
  },
  cash: {
    today: {
      photo: {
        name: 'Фотография',
        val: 0,
        icon: 'photo',
        color: '#e74c3c'
      },
      good: {
        name: 'Продажа',
        val: 0,
        icon: 'bag',
        color: '#f1c40f'
      },
      copy: {
        name: 'Ксерокопия',
        val: 0,
        icon: 'copy',
        color: '#2ecc71'
      },
      service: {
        name: 'Услуга',
        val: 0,
        icon: 'service',
        color: '#8860d0'
      },
      document: {
        name: 'Документ',
        val: 0,
        icon: 'passport',
        color: '#EC407A'
      },
      lamination: {
        name: 'Ламинация',
        val: 0,
        icon: 'lamination',
        color: '#3498db'
      }
    },
    yesterday: 0,
    week: 0,
    month: 0,
    year: 0
  }
}

export default new Vuex.Store({
  state: {
    online: null
  },
  getters: {
    moneySumm: ({ cash }) => Object.keys(cash.today).reduce((sum, key) => sum += cash.today[key].val, 0),
    getPercent: ({ cash }, getters) => (period) => {
      return cash[period]
        ? Math.floor(getters.moneySumm * 100 / cash[period] - 100)
        : undefined
    },
    isDefinedDiffCash: ({ cash }) => (cash.week + cash.month + cash.year + cash.yesterday) > 0
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
        if (state.cash.today.hasOwnProperty(type)) {
          state.cash.today[type].val = data.cash.today[type]
        }
      }
      state.clients = data.client

      for (let type in data.cash) {
        if (type === 'today') {
          continue
        }

        state.cash[type] = data.cash[type]
      }
    }
  }
})

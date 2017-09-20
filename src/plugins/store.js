import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import jwtDecode from 'jwt-decode'

export default new Vuex.Store({
    getters: {
        userData: state => jwtDecode(localStorage.getItem('token'))
    },
})
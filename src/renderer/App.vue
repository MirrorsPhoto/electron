<template>
  <component
    :is="page"
    @logIn="logIn($event)"
    @logOut="logOut()"
  ></component>
</template>

<script>
import jwtDecode from 'jwt-decode'
import config from './config'

export default {
  data() {
    return {
      page: '',
      socket: null,
      token: null
    }
  },
  methods: {
    logIn(token) {
      this.token = token
      this.$store.commit('initState')
      this.$store.commit('initUser', jwtDecode(token))
      this.page = 'index'
      this.connectWS()

      window.addEventListener('online',  this.connectWS)
      window.addEventListener('offline', this.disconnectWS)
    },
    logOut() {
      localStorage.removeItem('token')
      this.token = null
      this.page = 'auth'
      this.disconnectWS()
      window.removeEventListener('online',  this.connectWS)
      window.removeEventListener('offline', this.disconnectWS)
    },
    connectWS() {
      if (!this.socket) {
        this.socket = new WebSocket(`${config.url.socket}?token=${this.token}`)
        this.socket.onopen = () => this.$http.get('/socket/update')
        this.socket.onmessage = ({ data }) => this.$store.commit('addSale', JSON.parse(data))
        this.socket.onerror = console.error
      }
    },
    disconnectWS() {
      if (this.socket) {
        this.socket.close()
        this.socket = null
      }
    },
  },
  created() {

    process.env.NODE_ENV !== 'development'
      ? this.$online.onUpdateStatus(status => this.$store.commit('setConnectStatus', status))
      : this.$store.commit('setConnectStatus', true)

    const token = localStorage.getItem('token')
    token ? this.logIn(token) : this.page = 'auth'
  },
  components: {
    auth : require('./components/auth'),
    index: require('./components/index')
  }
}
</script>


<style lang="sass">
@import './assets/font.css'
@import './config/colors'

*, *:after, *:before
  -webkit-font-smoothing: antialiased
  -webkit-user-select: none
  -webkit-user-drag: none
  font-family: 'SF'
  margin: 0
  padding: 0
  box-sizing: border-box
  cursor: default

body
  color: #333
  font-size: 14px
  font-weight: normal

  & a, & button, & [type="submit"]
    cursor: pointer

  & button, & input
    font-size: 1em

h1, h2, h3, h4, h5, h6
  font-weight: normal

h3
  font-size: 1.3em
  margin: .5em auto 0

h4
  font-size: 1.2em

input, button, a
  -webkit-app-region: no-drag
</style>

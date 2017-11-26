<template>
  <div class="bg">

    <transition name="scale" mode="out-in" appear>
      <component
        :is="page"
        @logIn="logIn($event)"
        @logOut="logOut()"
      ></component>
    </transition>

    <update-modal></update-modal>

  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import config from './config'

export default {
  data() {
    return {
      page: '',
      socket: null
    }
  },
  methods: {
    logIn(token) {
      this.$store.commit('initState')
      this.$store.commit('initUser', jwtDecode(token))
      this.page = 'index'

      // Обновляем суммы позиций и кол-во клиетов
      this.socket = new WebSocket(`${config.url.socket}?token=${token}`)
      this.socket.onopen = () => this.$http.get('/socket/update')
      this.socket.onmessage = ({ data }) => this.$store.commit('addSale', JSON.parse(data))
      this.socket.onerror = err => console.error(err)
    },
    logOut() {
      localStorage.removeItem('token')
      this.page = 'auth'
      if (this.socket !== null) this.socket.close()
    }
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
    index: require('./components/index'),
    updateModal: require('./components/UI/updateModal')
  }
}
</script>


<style lang="sass">
@import './assets/SF_font/FontFace.css'
@import './config/colors'

*, *:after, *:before
  -webkit-font-smoothing: antialiased
  -webkit-user-select: none
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

.bg
  background: url(./assets/DSC_6015.jpg) bottom center no-repeat
  background-size: cover
  height: 100vh
  display: flex
  align-items: center
  justify-content: center

.release_info

  & #user-content-bug + h3:before, & #user-content-feature + h3:before
    display: inline-block
    width: 20px
    margin-right: 10px
    vertical-align: text-top

  & #user-content-bug

    & + h3:before
      content: url('./assets/bug.svg')

    & ~ ul > li:before
      color: $red

  & #user-content-feature

    & + h3:before
      content: url('./assets/feature.svg')

    & ~ ul > li:before
      color: $green

  & ul
    list-style: none
    margin-bottom: 5px
    padding-left: 30px

    & li
      text-indent: -18px

      &:before
        content: '•'
        font-size: 1.3em
        margin-right: 10px

      & > ul
        list-style: none
        padding-left: 0

        & li
          text-indent: 0

          &:before
            content: '-'
            color: #333
            margin-right: 10px

.scale-enter-active, .scale-leave-active
  transition: all .3s ease

.scale-enter, .scale-leave-to
  opacity: 0
  transform: scale(1.5)
  & > *
    opacity: 0

</style>

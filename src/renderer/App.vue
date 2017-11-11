<template>
  <div class="bg">

    <transition :name="page !== 'auth' ? 'login' : 'logout'" mode="out-in">
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
      this.socket = new WebSocket('ws://jonkofee.ru:8000?token=' + token)
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
    // Запрет на зум
    this.$electron.webFrame.setZoomLevelLimits(1, 1)

    process.env.NODE_ENV !== 'development'
      ? this.$online.onUpdateStatus(status => this.$store.commit('setConnectStatus', status))
      : this.$store.commit('setConnectStatus', true)

    const token = localStorage.getItem('token')
    token ? this.logIn(token) : this.page = 'auth'
  },
  components: {
    auth: require('./components/auth'),
    index: require('./components/index'),
    updateModal: require('./components/UI/updateModal')
  }
}
</script>


<style lang="sass">
@import './assets/SF_font/FontFace.css'
@import './styles_config'

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
      color: $primary-color

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
@keyframes rotate
  from
    transform: rotateY(0)
  to
    transform: rotateY(180deg)

@keyframes scale
  from
    width: 300px
    height: 400px
  to
    width: 1280px
    height: 720px

.login-leave-active
  animation: rotate 1s ease-in

.login-enter-active
  animation: scale .6s ease-in-out
  overflow: hidden

.logout-leave-active
  animation: scale .6s ease reverse
  overflow: hidden
  & *
    opacity: 0
    transition: opacity 1s

.logout-enter-active
  animation: rotate 1s ease-in reverse

</style>

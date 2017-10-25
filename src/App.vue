<template>
  <div class="bg">

    <component
      :is="page"
      @logIn="logIn($event)"
      @logOut="logOut()"
    ></component>

    <update-modal></update-modal>

  </div>
</template>

<script>
import jwtDecode from 'jwt-decode' 

export default {
  data() {
    return {
      page: ''
    }
  },
  methods: {
    logIn(token) {
      this.$store.commit('initState')
      this.$store.commit('initUser', jwtDecode(token))
      this.page = 'index'
    },
    logOut() {
      localStorage.removeItem('token')
      this.page = 'auth'
    }
  },
  created() {
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

.release_info ul
  list-style: none
  margin-bottom: 5px
  padding-left: 17px

  & li
    text-indent: -6px

    &:before
      content: '⚫'
      font-size: .5em
      color: $primary-color
      position: relative
      top: -2px
      left: -10px

    & > ul
      list-style: none
      padding-left: 10px

      & li
        text-indent: 0

        &:before
          content: '-'
          color: #333

</style>

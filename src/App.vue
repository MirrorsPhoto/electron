<template>
  <div class="bg">
    <component
      :is="page"
      @logIn="logIn($event)"
      @logOut="logOut()"
    ></component>
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
    index: require('./components/index')
  }
}
</script>


<style lang="sass">
@import './assets/SF_font/FontFace.css'

*
  font-family: 'SF'
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #333
  margin: 0
  padding: 0
  box-sizing: border-box

body
  font-size: 14px
  font-weight: normal
  
h1, h2, h3, h4, h5, h6
  font-weight: normal

.bg
  background: url(./assets/DSC_6015.jpg) bottom center no-repeat
  background-size: cover
  height: 100vh
  display: flex
  align-items: center
  justify-content: center

</style>

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
import auth from './components/pages/auth'
import index from './components/pages/index'

export default {
  data() {
    return {
      page: ''
    }
  },
  methods: {
    logIn(token) {
      localStorage.setItem('token', token)
      this.$store.commit('setToken', token)
      this.page = 'index'
    },
    logOut() {
      localStorage.removeItem('token')
      this.$store.commit('setToken', '')
      this.page = 'auth'
    }
  },
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('setToken', token)
      this.page = 'index'
    } else this.page = 'auth'
  },
  components: { auth, index }
}
</script>


<style lang="sass">
  *
    font-family: sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #333
    margin: 0
    padding: 0
    box-sizing: border-box

  body
    font-size: 14px
    -webkit-app-region: drag

  input, button, textarea
    -webkit-app-region: no-drag

  .bg
    background: url(./assets/DSC_6015.jpg) bottom center no-repeat
    background-size: cover
    height: 100vh
    display: flex
    align-items: center
    justify-content: center

</style>

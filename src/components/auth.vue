<template>
  <form :class="{ error: errorMessages.length > 0 }" @submit.prevent="auth()">
  
    <window-buttons></window-buttons>
  
    <logo class="logo"></logo>
    
    <field
      placeholder="Логин"
      v-model="user.login"
      autofocus
    ></field>
    
    <field
      placeholder="Пароль"
      type="password"
      v-model="user.password"
    ></field>
    
    <input type="submit">

    <p>
      <span v-for="m in errorMessages" :key="m">{{ m }}<br></span>
    </p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        login: '',
        password: ''
      },
      errorMessages: []
    }
  },
  watch: {
    user: {
      handler() {
        this.errorMessages.splice(0);
      },
      deep: true
    }
  },
  methods: {
    auth() {
      const { login, password } = this.user;

      if (login && password) {
        this.$http({
          method: 'post',
          url: 'login',
          data: { login, password }
        })
        .then(({ data: { token: response } }) => {
          localStorage.setItem('token', token)
          this.$emit('logIn', token)
        })
        .catch(({ r: request }) => this.errorMessages = JSON.parse(r.responseText).message)
      } else {
        this.errorMessages.splice(0, 1, 'Заполните все поля формы')
      }
    }
  },
  components: {
    field: require('./UI/field'),
    logo : require('./UI/logo'),
    windowButtons: require('./UI/windowButons')
  }
}
</script>

<style lang="sass" scoped>
@import '../styles_config.sass'

form 
  background: #fff
  width: 350px
  padding: 50px 50px 70px
  position: relative
  color: #fff
  box-shadow: 1px 5px 10px rgba(0, 0, 0, .2)

  & .logo
    display: block
    width: 350px
    height: 200px
    margin: 0 -50px

  & div
    margin-top: 25px

    & [type="submit"]
      display: none

  & p
    color: $primary-color
    text-align: center
    position: absolute
    top: 410px
    left: 0
    right: 0
    
    & span 
      color: inherit

    &.error
      animation: shake 0.2s ease-in-out 0s 2
    
@keyframes shake 
  0% 
    margin-left: 0rem
  25% 
    margin-left: 0.5rem
  75%
    margin-left: -0.5rem
  100% 
    margin-left: 0rem

</style>
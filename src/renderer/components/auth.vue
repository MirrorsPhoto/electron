<template>
  <form :class="{ error: errorMessages.length > 0 }" @submit.prevent="auth()">

    <window-buttons
      v-animate="{ name: 'fadeInTop', del: 500 }"
    />

    <logo
      class="logo"
      v-animate="{ name: 'fadeInBottom', del: 400 }"
    />

    <field
      placeholder="Логин"
      v-model="user.login"
      autofocus
      v-animate="{
        name: 'fadeInBottom', del: 500,
        leave: { name: 'fadeOutBottom', del: 100, dur: 350 }
      }"
    />

    <field
      placeholder="Пароль"
      type="password"
      v-model="user.password"
      v-animate="{
        name: 'fadeInBottom', del: 700,
        leave: { name: 'fadeOutBottom', del: 0, dur: 350 }
      }"
    />

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
    async auth() {
      const { user } = this

      if (user.login && user.password) {
        try {
          const
            { data }  = await this.$http.post('login', user),
            { token } = data.response
          
          localStorage.setItem('token', token)
          this.$emit('logIn', token)
        } catch(err) {
          this.errorMessages = JSON.parse(err.request.responseText).message
        }
      } else {
        this.errorMessages.splice(0, 1, 'Заполните все поля формы')
      }
    }
  },
  components: {
    field: require('./UI/field'),
    logo: require('./UI/logo'),
    windowButtons: require('./UI/windowButtons')
  }
}
</script>

<style lang="sass" scoped>
@import '../styles_config.sass'

form 
  background: #fff
  width: 300px
  padding: 50px 50px 60px
  position: relative
  color: #fff
  box-shadow: 1px 5px 10px rgba(0, 0, 0, .2)

  & .logo
    display: block
    width: 300px
    height: 170px
    margin: 0 -50px

  & div
    margin-top: 20px

  & [type="submit"]
    display: none

  & p
    color: $primary-color
    text-align: center
    position: absolute
    top: 360px
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
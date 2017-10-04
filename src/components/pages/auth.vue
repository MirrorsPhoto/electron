<template>
    <form :class="{ error: errorMessages.length > 0 }" @submit.prevent="auth()">
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
            <span v-for="message in errorMessages" :key="message">{{ message }}<br></span>
        </p>
    </form>
</template>

<script>
import field from '../UI/field.vue';
import logo from '../UI/logo.vue';

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
                .then(({ data }) => {
                    const { token } = data.response
                    localStorage.setItem('token', token)
                    this.$emit('logIn', token)
                })
                .catch(error => this.errorMessages = JSON.parse(error.request.responseText).message)
            }
            else this.errorMessages.splice(0, 1, 'Заполните все поля формы');
        }
    },
    components: { field, logo }
}
</script>

<style lang="sass">
@import '../../styles_config.sass'

form 
    width: 350px
    padding: 50px 50px 70px
    position: relative
    color: #fff
    background: #fff
    box-shadow: 1px 5px 10px rgba(0, 0, 0, .2)

    & .logo
        width: 350px
        height: 200px
        display: block
        margin: 0 -50px

    & div
        margin-top: 25px

    & [type="submit"]
        display: none

    & p 
        text-align: center
        position: absolute
        left: 0
        right: 0
        top: 410px
        color: $primary-color

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
<template>
    <div class="bg">
        <form :class="{ error }" action="" @submit.prevent="auth()">
            <img src="../../assets/logo.svg"/>
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

            <p v-if="error">{{ errorText }}</p>
        </form>
    </div>
</template>

<script>
    import field from '../UI/field.vue';

    export default {
        data() {
            return {
                user: {
                    login: '',
                    password: ''
                },
                error: false,
                errorText: ''
            }
        },
        watch: {
            user: {
                handler() {
                    this.error = false;
                },
                deep: true
            }
        },
        computed: {
            isValid() {
                return !!this.user.login && !!this.user.password;
            }
        },
        methods: {
            auth() {
                if (this.isValid) {
                    const { login, password } = this.user;

                    this.ajax({
                        url: 'login',
                        method: 'post',
                        data: { login, password },
                        success: response => {
                            const token = response.data.response.token;
                            localStorage.setItem('token', token);
                            this.$router.push('/');
                        },
                        error: error => {
                            const message = JSON.parse(error.request.responseText).message;
                            this.error = true;
                            this.errorText = message;
                        }
                    });

                }
                else {
                    this.error = true;
                    this.errorText = 'Заполните все поля формы';
                }
            }
        },
        components: {
            field
        },
        beforeRouteEnter(to, from, next) {
            const token = localStorage.getItem('token');
            (token) ? next({ path: '/' }) : next()
        }
    }
</script>

<style lang="sass">
@import '../../styles_config.sass'

.bg
    background: url(../../assets/bg.jpg) center center no-repeat
    background-size: cover
    height: 100vh
    display: flex
    align-items: center
    justify-content: center

form 
    width: 350px
    padding: 70px 50px
    position: relative
    color: #fff
    background: #fff
    box-shadow: 1px 5px 10px rgba(0, 0, 0, .2)

    & img 
        width: 180px
        display: block
        margin: 0 auto 10px

    & div
        margin-top: 25px

    & [type="submit"]
        display: none

    & p 
        text-align: center
        position: absolute
        left: 0
        right: 0
        bottom: 30px
        color: $primary-color

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
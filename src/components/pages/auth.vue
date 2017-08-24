<template>
    <div class="bg">
        <form ref="form" action="" @submit.prevent="auth()">
            <img src="../../assets/logo.svg"/>
            <field
                placeholder="Логин"
                v-model="login"
                autofocus
            ></field>
            <field
                placeholder="Пароль"
                type="password"
                v-model="password"
            ></field>
            <input type="submit">
        </form>
    </div>
</template>

<script>
    import field from '../UI/field.vue'

    export default {
        data() {
            return {
                login: '',
                password: ''
            }
        },
        computed: {
            isValid() {
                return !!this.login && !!this.password
            }
        },
        methods: {
            auth() {
                if (this.isValid) {
                    const { login, password, $router, shakeForm } = this

                    this.ajax({
                        url: 'login',
                        method: 'post',
                        data: { login, password },
                        success(response) {
                            const token = response.data.response.token
                            localStorage.setItem('token', token)
                            $router.push('/')
                        },
                        error(error) {
                            shakeForm();
                            const message = JSON.parse(error.request.responseText).message;
                            alert(message);
                        }
                    })

                   
                }
            },
            shakeForm() {
                this.$refs.form.classList.add('error');
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
.bg
    background: url(../../assets/bg.jpg) center center no-repeat
    background-size: cover
    height: 100vh
    display: flex
    align-items: center
    justify-content: center

form 
    width: 350px
    padding: 50px
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

    &.error 
        animation: shake-little 1s ease-in-out

@keyframes shake-little 
    2% 
        transform: translate(1px, 0px) rotate(0.5deg)

    4% 
        transform: translate(0px, 0px) rotate(0.5deg)


    6% 
        transform: translate(0px, 1px) rotate(0.5deg)


    8% 
        transform: translate(1px, 0px) rotate(0.5deg)

    10% 
        transform: translate(0px, 1px) rotate(0.5deg)


    12% 
        transform: translate(0px, 0px) rotate(0.5deg)


    14% 
        transform: translate(0px, 1px) rotate(0.5deg)


    16% 
        transform: translate(0px, 0px) rotate(0.5deg)


    18% 
        transform: translate(0px, 1px) rotate(0.5deg)


    20% 
        transform: translate(0px, 1px) rotate(0.5deg)


    22% 
        transform: translate(0px, 1px) rotate(0.5deg)


    24% 
        transform: translate(0px, 0px) rotate(0.5deg)


    26% 
        transform: translate(1px, 0px) rotate(0.5deg)


    28% 
        transform: translate(0px, 1px) rotate(0.5deg)


    30% 
        transform: translate(1px, 0px) rotate(0.5deg)


    32% 
        transform: translate(1px, 0px) rotate(0.5deg)


    34% 
        transform: translate(1px, 1px) rotate(0.5deg)


    36% 
        transform: translate(0px, 0px) rotate(0.5deg)


    38% 
        transform: translate(1px, 1px) rotate(0.5deg)


    40% 
        transform: translate(1px, 1px) rotate(0.5deg)

    42% 
        transform: translate(0px, 0px) rotate(0.5deg)


    44% 
        transform: translate(1px, 1px) rotate(0.5deg)


    46% 
        transform: translate(1px, 1px) rotate(0.5deg)

    48% 
        transform: translate(1px, 0px) rotate(0.5deg)


    50% 
        transform: translate(1px, 0px) rotate(0.5deg)


    52% 
        transform: translate(0px, 0px) rotate(0.5deg)


    54% 
        transform: translate(1px, 0px) rotate(0.5deg)


    56% 
        transform: translate(1px, 0px) rotate(0.5deg)


    58% 
        transform: translate(1px, 1px) rotate(0.5deg)


    60% 
        transform: translate(1px, 1px) rotate(0.5deg)


    62% 
        transform: translate(0px, 1px) rotate(0.5deg)


    64% 
        transform: translate(1px, 0px) rotate(0.5deg)


    66% 
        transform: translate(0px, 1px) rotate(0.5deg)


    68% 
        transform: translate(0px, 1px) rotate(0.5deg)


    70% 
        transform: translate(1px, 1px) rotate(0.5deg)


    72% 
        transform: translate(1px, 0px) rotate(0.5deg)


    74% 
        transform: translate(1px, 0px) rotate(0.5deg)


    76% 
        transform: translate(1px, 1px) rotate(0.5deg)


    78% 
        transform: translate(1px, 1px) rotate(0.5deg)


    80% 
        transform: translate(1px, 1px) rotate(0.5deg)


    82% 
        transform: translate(0px, 0px) rotate(0.5deg)


    84% 
        transform: translate(0px, 0px) rotate(0.5deg)


    86% 
        transform: translate(1px, 1px) rotate(0.5deg)


    88% 
        transform: translate(1px, 1px) rotate(0.5deg)


    90% 
        transform: translate(0px, 0px) rotate(0.5deg)


    92% 
        transform: translate(1px, 0px) rotate(0.5deg)


    94% 
        transform: translate(0px, 1px) rotate(0.5deg)


    96% 
        transform: translate(1px, 0px) rotate(0.5deg)


    98% 
        transform: translate(1px, 1px) rotate(0.5deg)

    100% 
        transform: translate(0, 0) rotate(0)
  

</style>
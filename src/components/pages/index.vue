<template>
    <div class="wrap">
        <aside>
            <img src="../../assets/logo.svg">

            <div class="user_photo" :style="'background-image: url(' + user.img + ')'"></div>
            <h4>{{ user.name }}</h4>
            <p>{{ user.role }}</p>

            <nav>
                <router-link to="/"><span></span>Главный экран</router-link>
                <router-link to="/items"><span></span>Товары</router-link>
                <router-link to="/stat"><span></span>Статистика</router-link>
                <router-link to="/settings"><span></span>Настройки</router-link>
            </nav>

            <a class="link_logout" href="#" @click.prevent="logOut()"><span></span>Выйти</a>
        </aside>

        <div class="content">
            <div></div>
            <time-bar></time-bar>
            <div></div>
            <div></div>
        </div>
 
    </div>
</template>

<script>
import timeBar from '../modules/timeBar'
export default {
    data() {
        return {
            user: {
                name: 'Дымченко Алина',
                role: 'администратор',
                img: 'https://www.trickscity.com/wp-content/uploads/2016/11/41873_orig.jpg'
            }
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    },
    components: {
        timeBar
    }
}
</script>

<style lang="sass" scoped>
@import '../../styles_config.sass'

.wrap 
    width: 1280px
    height: 720px
    background: #f6f6f6
    box-shadow: 1px 5px 10px rgba(0, 0, 0, .2)
    display: grid
    grid-template-columns: 230px auto

    & aside 
        background: #fff
        width: 230px
        padding: 30px 0
        box-shadow: 5px 5px 32px rgba(0, 0, 0, .2)

        & img
            display: block
            width: 100%
            margin-bottom: 20px

        & .user_photo
            width: 125px
            height: 125px
            border-radius: 50%
            background-position: center center
            background-size: cover
            margin: auto

        & h4
            text-align: center
            margin: 20px auto 5px
            font-size: 18px

        & p 
            text-align: center
            color: $hard

        & a
            display: block
            font-size: 16px
            line-height: 20px
            text-decoration: none

            & span
                display: inline-block
                width: 20px
                height: 20px
                margin-left: 40px
                margin-right: 20px

        & nav
            margin: 30px auto

            & a 
                padding: 15px 0
                border-top: 1px solid $light

            & a:last-child 
                border-bottom: 1px solid $light

            & a.active 
                border-left: 4px solid $primary-color
                background: $light

                & span 
                    margin-left: 36px

        .link_logout
            color: $hard
            transition: all .3s ease

            &:hover
                color: #333

    & .content
        margin: 40px
        display: grid
        grid-template-columns: 1fr 1fr
        grid-gap: 30px

        & div
            box-shadow: 2px 2px 5px rgba(0, 0, 0, .2)



</style>
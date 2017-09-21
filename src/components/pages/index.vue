<template>
    <div class="wrap">
        <aside>
            <img src="../../assets/logo.svg">

            <div class="user_photo" :style="'background-image: url(' + user.avatar + ')'"></div>
            <h4>{{ user.first_name + ' ' + user.last_name }}</h4>
            <p>{{ user.role_name.toLowerCase() }}</p>

            <nav>
                <a click.prevent="page = 'home'"><span></span>Главный экран</a>
                <a click.prevent="page = 'items'"><span></span>Товары</a>
                <a click.prevent="page = 'stat'"><span></span>Статистика</a>
                <a click.prevent="page = 'settings'"><span></span>Настройки</a>
            </nav>

            <a class="link_logout" href="#" @click.prevent="$emit('logOut')"><span></span>Выйти</a>
        </aside>

        <component :is="page"></component>
 
    </div>
</template>

<script>
import home from './home'

export default {
    data() {
        return {
            page: 'home',
            user: this.$store.getters.userData
        }
    },
    components: { home }
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
</style>
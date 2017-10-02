<template>
    <div class="wrap">
        <aside>
            <logo class="logo"></logo>
          
            <div class="user_photo" :style="user.avatar ? 'background-image: url(' + user.avatar + ')' : false">
                <icon v-if="!user.avatar" name="user" size="55"></icon>
            </div>
            <h4>{{ user.first_name + ' ' + user.last_name }}</h4>
            <p>{{ user.role_name }}</p>

            <nav>
                <a @click.prevent="page = 'home'">
                    <icon name="dashboard"></icon>Главный экран
                </a>
                <a @click.prevent="page = 'items'">
                    <icon name="bag"></icon>Товары
                </a>
                <a @click.prevent="page = 'stat'">
                    <icon name="chart"></icon>Статистика
                </a>
                <a @click.prevent="page = 'settings'">
                    <icon name="settings"></icon>Настройки
                </a>
            </nav>

            <a class="link_logout" @click.prevent="$emit('logOut')">
                <icon name="logout"></icon>Выйти
            </a>
        </aside>

        <component :is="page"></component>
 
    </div>
</template>

<script>
import home from './home'
import logo from '../UI/logo.vue'
import icon from '../UI/icon'

export default {
    data() {
        return {
            page: 'home',
            user: this.$store.getters.userData
        }
    },
    components: { home, logo, icon }
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

        & .logo
            display: block
            height: 143px
            width: 100%
            margin-bottom: 20px

        & .user_photo
            width: 125px
            height: 125px
            border-radius: 50%
            background-color: $light
            background-position: center center
            background-size: cover
            margin: auto

            & .icon
                margin: 35px
                fill: darken($light, 15%)

        & h4
            text-align: center
            margin: 20px auto 5px
            font-size: 18px

        & p 
            text-align: center
            color: $hard
            text-transform: lowercase

        & a
            display: block
            font-size: 16px
            line-height: 20px
            text-decoration: none

            & .icon
                margin-left: 40px
                margin-right: 20px
                position: relative
                top: 4px
                fill: $primary-color

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

            & .icon
                fill: $hard
                transform: scale(-1)

            &:hover
                color: #333

                & .icon
                    fill: $primary-color

</style>
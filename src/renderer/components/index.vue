<template>
  <div class="wrap">

    <window-buttons></window-buttons>

    <aside>
      <logo class="logo"></logo>

      <div class="user_photo_wrap">
        <div v-if="user.avatar" class="user_photo" :style="`background-image: url(${user.avatar})`"></div>
        <div v-else class="no_photo">
          <icon name="user" size="55"></icon>
        </div>
      </div>
      <h4>{{ user.first_name + ' ' + user.last_name }}</h4>
      <p>{{ user.role_name }}</p>

      <nav>
        <a
          v-for="(item, i) in menu" :key="i"
          href="#"
          :class="{ active: item.component === page }"
          @click.prevent="page = item.component"
          >
          <icon :name="item.icon"></icon>
          {{ item.title }}
        </a>
      </nav>

      <a href="#" class="link_logout" @click.prevent="$emit('logOut')">
        <icon name="logout"></icon>Выйти
      </a>
    </aside>

    <keep-alive>
      <component :is="page"></component>
    </keep-alive>

  </div>
</template>

<script>
export default {
  data() {
    return {
      page: '',
      menu: [
        {
          title: 'Главный экран',
          component: 'dashboard',
          icon: 'dashboard'
        },
        {
          title: 'Товары',
          component: 'storehouse',
          icon: 'bag'
        },
        {
          title: 'Статистика',
          component: 'statistic',
          icon: 'chart'
        },
        {
          title: 'Настройки',
          component: 'settings',
          icon: 'settings'
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  created() {
    this.page = this.menu[0].component
  },
  mounted() {
    this.$electron.ipcRenderer.send('setWindowSize', {
      width: 1280,
      height: 800
    })
  },
  destroyed() {
    this.$electron.ipcRenderer.removeAllListeners('photoshop-connect, photoshop-message')
  },
  components: {
    dashboard: require('./dashboard/_index'),
    storehouse: require('./storehouse/_index'),
    statistic: require('./statistic/_index'),
    settings: require('./settings/_index'),

    logo: require('./UI/logo'),
    icon: require('./UI/icon'),
    windowButtons: require('./UI/windowButtons')
  }
}
</script>

<style lang="sass" scoped>
@import '../config/colors'

.wrap
  width: 1280px
  height: 800px
  background: #f6f6f6
  box-shadow: 1px 5px 10px rgba(0, 0, 0, .2)
  display: grid
  grid-template-columns: 230px auto
  position: relative
  overflow: hidden

  & aside
    background: #fff
    width: 230px
    padding: 33px 0
    box-shadow: 5px 5px 32px rgba(0, 0, 0, .2)

    & .logo
      display: block
      height: 143px
      width: 100%
      margin-bottom: 30px

    & .user_photo_wrap
      width: 125px
      height: 125px
      border-radius: 50%
      margin: auto
      overflow: hidden

      & > div
        height: 100%

      & .user_photo
        background-position: center center
        background-size: cover

      & .no_photo
        background-color: $light

        & .icon
          margin: 35px
          fill: $medium

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
      color: #333
      font-size: 16px
      line-height: 20px
      text-decoration: none

      & .icon
        margin-left: 40px
        margin-right: 20px
        position: relative
        top: 4px
        fill: $red

    & nav
      margin: 40px auto 30px

      & a
        padding: 15px 0
        border-top: 1px solid $light

      & a:last-child
        border-bottom: 1px solid $light

      & a.active
        border-left: 3px solid $red
        background: $light

        & > .icon
          left: -3px
          margin-right: 17px

    .link_logout
      color: $hard
      transition: all .3s ease
      padding-top: 75px

      & .icon
        fill: $hard
        transform: scale(-1)

      &:hover
        color: #333

        & .icon
          fill: $red

</style>

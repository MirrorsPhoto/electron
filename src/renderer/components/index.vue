<template>
  <div class="wrap">

    <window-buttons
      v-animate="{ name: 'fadeInTop', del: 2000 }"
    />

    <aside
      v-animate="{ name: 'moveFromLeft', del: 500, dur: 1000 }"
    >
      <logo
        class="logo"
        v-animate="{ name: 'moveFromTop', del: 1000 }"
      />

      <div
        class="user_photo_wrap"
        v-animate="{ name: 'rotateXIn', del: 1200 }"
      >
        <!-- <div v-if="user.avatar" class="user_photo" :style="`background-image: url(${user.avatar})`"></div> -->
        <div class="no_photo">
          <icon name="user" size="55"></icon>
        </div>
      </div>
      <h4 v-animate="{ name: 'rotateXIn', del: 1200 }">{{ user.first_name + ' ' + user.last_name }}</h4>
      <p v-animate="{ name: 'fadeInBottom', del: 1200 }">{{ user.role_name }}</p>

      <nav>
        <a
          v-for="({ title, icon, page }, i) in menu" :key="i"
          href="#"
          @click.prevent="setPage(page)"
          v-animate="{ name: 'fadeInLeft', del: 1200 + i * 100 }"
        >
          <icon :name="icon"></icon>
          {{ title }}
        </a>
      </nav>

      <a
        href="#"
        class="link_logout"
        @click.prevent="$emit('logOut')"
        v-animate="{ name: 'fadeInLeft', del: 1700 }"
      >
        <icon name="logout"></icon>Выйти
      </a>
    </aside>

    <transition :duration="500" mode="out-in">
      <keep-alive>
        <component :is="page" :key="page"></component>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 'dashboard',
      menu: [
        {
          title: 'Главный экран',
          icon: 'dashboard',
          page: 'dashboard'
        },
        {
          title: 'Товары',
          icon: 'bag',
          page: 'storehouse'
        },
        {
          title: 'Статистика',
          icon: 'chart',
          page: 'statistic'
        },
        {
          title: 'Настройки',
          icon: 'settings',
          page: 'settings'
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    setPage(page) {
      this.page = page
    }
  },
  destroyed() {
    this.$electron.ipcRenderer.removeAllListeners()
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
@import '../styles_config.sass'

.wrap 
  width: 1280px
  height: 720px
  background: #f6f6f6
  box-shadow: 1px 5px 10px rgba(0, 0, 0, .2)
  display: grid
  grid-template-columns: 230px auto
  position: relative
  overflow: hidden

  & aside 
    background: #fff
    width: 230px
    padding: 30px 0
    box-shadow: 1px 5px 10px rgba(0, 0, 0, .2)

    & .logo
      display: block
      height: 143px
      width: 100%
      margin-bottom: 20px

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
      transition: all .3s ease

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
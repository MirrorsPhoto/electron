<template>
  <div :class="['widget_wrap', { offline: !online}]">
    <div>
      <h2>{{ time.hours }}<span class="separator">:</span>{{ time.minutes }}</h2>
      <p>{{ date }}</p>
    </div>
    <template v-if="online">
      <div>
        <h2><weather-icon :code="weather.code"></weather-icon>{{ weather.temp }}°</h2>
        <p>{{ weather.desc }}</p>
      </div>
      <div>
        <h2><count-upper :value="counts.money"></count-upper>₽</h2>
        <p>касса сегодня</p>
      </div>
      <div>
        <h2><count-upper :value="counts.clients"></count-upper></h2>
        <p>{{ clientsWord }}</p>
      </div>
    </template>
    <div v-else>
      <icon name="disconnected" size="40"></icon>
      <span>Нет соединения с интернетом...</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      time: {
        hours: "",
        minutes: ""
      },
      weather: {
        temp: 0,
        desc: "",
        code: 0
      },
      timer: null,
      weatherTimer: null
    }
  },
  watch: {
    online(online) {
      this.updatingWeather(online ? 'start' : 'stop')
    }
  },
  computed: {
    online() {
      return this.$store.state.online
    },
    counts() {
      return this.$store.state.counts
    },
    date() {
      const
        date = new Date(),
        day = date.getDate(),
        weekDay = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][date.getDay()],
        month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"][date.getMonth()]

      return `${day} ${month}, ${weekDay}`
    },
    clientsWord() {
      const
        n = this.counts.clients,
        words = ["клиент", "клиента", "клиентов"],
        cases = [2, 0, 1, 1, 1, 2]

      return words[n % 100 > 4 && n % 100 < 20 ? 2 : cases[n % 10 < 5 ? n % 10 : 5]]
    }
  },
  methods: {
    updateTime() {
      const
        date = new Date(),
        getHours = date.getHours(),
        getMinutes = date.getMinutes(),
        hours = getHours >= 10 ? getHours : `0${getHours}`,
        minutes = getMinutes >= 10 ? getMinutes : `0${getMinutes}`

      this.time = { hours, minutes }
    },
    async updateWeather() {
      const { data } = await axios.get("http://api.openweathermap.org/data/2.5/weather?id=713504&lang=ru&units=metric&APPID=3408cd554acba183a966bd9cfa69b9d2")
      this.weather = {
        temp: parseInt(data.main.temp),
        desc: data.weather[0].description,
        code: +data.weather[0].id
      }
    },
    updatingWeather(param) {
      if (param === 'start') {
        this.updateWeather()
        this.weatherTimer = setInterval(this.updateWeather, 1000 * 60 * 60)
      } else if (param === 'stop' && this.weatherTimer !== null) {
        clearInterval(this.weatherTimer)
      }
    }
  },
  created() {
    this.updateTime()
    if (this.online) this.updatingWeather('start')
    this.timer = setInterval(this.updateTime, 1000 * 60)
  },
  destroyed() {
    clearInterval(this.timer)
    this.updatingWeather('stop')
  },
  components: {
    icon: require('../UI/icon'),
    countUpper: require('../UI/countUpper'),
    weatherIcon: require('../UI/weatherIcon')
  }
}
</script>


<style lang="sass" scoped>
@import '../../styles_config.sass'

.widget_wrap
  background: $light!important
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 1fr 1fr
  grid-gap: 1px

  &.offline
    display: block

    & > div
      height: 50%

      & + div
        padding-top: 45px
        border-top: 1px solid $light

      & .icon
        fill: $primary-color
        margin-right: 20px

      & span
        display: inline-block
        height: 40px
        line-height: 40px
        vertical-align: top

  & div
    background: #fff
    text-align: center
    padding: 30px 0
    
    & h2
      font-size: 48px
      font-weight: 200

      & i
        color: $primary-color
        margin-right: 10px
        font-size: .8em

      & .separator
        position: relative
        top: -4px
        animation: separator 2s linear infinite

    & p
      color: $hard

      &:first-letter
        text-transform: uppercase

@keyframes separator
  50%
    color: rgb(51, 51, 51)
  51%
    color: rgba(51, 51, 51, 0)
  100%
    color: rgba(51, 51, 51, 0)

</style>


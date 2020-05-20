<template>
  <table :class="['widget_wrap', { offline: !online }]">
    <template v-if="online !== null">

      <tr>
        <!-- Время -->
        <td>
          <h2>{{ time.hours }}<span class="separator">:</span>{{ time.minutes }}</h2>
          <p>{{ date }}</p>
        </td>

        <!-- Погода -->
        <td v-if="online">
          <h2>
            <weather-icon
              :code="weather.code"
              :time-of-day="weather.timeOfDay"
            />
            {{ weather.temp }}°
          </h2>
          <p>{{ weather.desc }}</p>
        </td>

        <!-- Заглушка, если нет интернета -->
        <td v-else>
          <icon v-if="!online" name="disconnected" size="45"></icon>
          <p>Нет соединения...</p>
        </td>
      </tr>

      <tr v-if="online">
        <!-- Касса -->
        <td>
          <h2><count-upper :value="counts.money"></count-upper>₽</h2>
          <p>Касса сегодня</p>
        </td>

        <!-- Кол-во клиентов -->
        <td>
          <h2><count-upper :value="counts.clients"></count-upper></h2>
          <p>{{ counts.clients | decline(['клиент', 'клиента', 'клиентов'], false) }}</p>
        </td>
      </tr>

    </template>
  </table>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      time: {
        hours: '',
        minutes: ''
      },
      date: new Date().toLocaleString('ru', { weekday: 'short', day: 'numeric', month: 'long' }),
      weather: {
        temp: 0,
        desc: '',
        code: 0,
        timeOfDay: ''
      },
      percentDiff: '',

      timer: null,
      weatherTimer: null,
      percentDiffTimer: null,
    }
  },
  watch: {
    online: 'updatingWeather'
  },
  computed: {
    online() {
      return this.$store.state.online
    },
    // Счетчики клиентов и кассы
    counts() {
      return {
        clients: this.$store.state.clients.today,
        money: this.$store.getters.moneySumm
      }
    },
    // Склонения слова 'клиентов', зависящее от кол-ва
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
      const { sunrise, sunset } = data.sys
      const time = Math.round(new Date().getTime() / 1000)
      this.weather = {
        temp: parseInt(data.main.temp),
        desc: data.weather[0].description,
        code: +data.weather[0].id,
        timeOfDay: (time >= sunrise && time < sunset) ? 'day' : 'night'
      }
    },
    updatingWeather(isUpdate) {
      if (isUpdate) {
        this.updateWeather()
        this.weatherTimer = setInterval(this.updateWeather, 1000 * 60 * 60) // Обновление погоды каждый час
      } else if (this.weatherTimer !== null) {
        clearInterval(this.weatherTimer)
      }
    }
  },
  created() {
    this.updateTime()
    this.updatingWeather(this.online)
    this.timer = setInterval(this.updateTime, 1000)
  },
  components: {
    icon: require('../UI/icon'),
    countUpper: require('../UI/countUpper'),
    weatherIcon: require('../UI/weatherIcon')
  }
}
</script>


<style lang="sass" scoped>
@import '../../config/colors'

.widget_wrap
  width: 100%
  height: 100%
  border-collapse: collapse
  margin: -1px

  & tr

    & + tr
      border-top: 1px solid $light

    & td:first-child
      border-right: 1px solid $light

  & td
    width: 50%
    text-align: center
    padding: 30px 0

    & h2
      font-size: 48px
      font-weight: 200

      & i
        color: $red
        margin-right: 10px
        font-size: .8em

      & .separator
        position: relative
        top: -4px
        animation: separator 2s linear infinite

    & p
      color: $hard

      &.cash-diff
        cursor: pointer

      &:first-letter
        text-transform: uppercase

  &.offline
    display: block

    & .separator
      top: 3px

    & .icon
      display: block
      fill: $red
      margin: 0 auto 10px

    & span
      display: inline-block
      height: 40px
      line-height: 40px
      vertical-align: top

    & td
      width: 235px
      height: 270px


@keyframes separator
  50%
    color: rgb(51, 51, 51)
  51%
    color: rgba(51, 51, 51, 0)
  100%
    color: rgba(51, 51, 51, 0)

</style>


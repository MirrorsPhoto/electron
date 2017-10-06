<template>
    <div class="widget_wrap">
        <div>
            <h2>{{ time.hours }}<span class="separator">:</span>{{ time.minutes }}</h2>
            <p>{{ date }}</p>
        </div>
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
    </div>
</template>

<script>
import axios from 'axios'

import countUpper from '../UI/countUpper'
import weatherIcon from '../UI/weatherIcon'

export default {
    data() {
        return {
            time: {
                hours: '',
                minutes: ''
            },
            weather: {
                temp: 0,
                desc: '',
                code: 0
            },
            counts: this.$store.state.counts,
            timer: null,
            weatherTimer : null
        }
    },
    computed: {
        date() {
            const
                date    = new Date(),
                day     = date.getDate(),
                weekDay = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][date.getDay()],
                month   = ['января', 'февраля', 'марта',  'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'][date.getMonth()]

            return `${day} ${month}, ${weekDay}`
        },
        clientsWord() {
            const { clients } = this.counts
            if (clients > 10 && clients < 20) {
                return 'клиентов'
            }
            else {
                const lastNum = +[...String(clients)].pop()
                const words = [
                    { word: 'клиент', endings: [1] },
                    { word: 'клиента', endings: [2, 3, 4] },
                    { word: 'клиентов', endings: [5, 6, 7, 8, 9, 0] }
                ]
                return words.find(({ endings }) => endings.includes(lastNum)).word
            }
        }
    },
    methods: {
        updateTime() {
            const
                date       = new Date(),
                getHours   = date.getHours(),
                getMinutes = date.getMinutes(),
                hours      = getHours >= 10 ? getHours : `0${getHours}`,
                minutes    = getMinutes >= 10 ? getMinutes : `0${getMinutes}`
            
            this.time = { hours, minutes }
        },
        updateWeather() {
            axios.get('http://api.openweathermap.org/data/2.5/weather?id=713504&lang=ru&units=metric&APPID=3408cd554acba183a966bd9cfa69b9d2')
            .then(({ data }) => data, () => false)
            .then(data => {
                this.weather = {
                    temp: data ? parseInt(data.main.temp) : '?',
                    desc: data ? data.weather[0].description : 'Нет интернета...',
                    code: data ? +data.weather[0].id : 800
                }
                if (!data) setTimeout(this.updateWeather, 1000 * 60)
            })
        }
    },
    created() {
        this.updateTime()
        this.updateWeather()

        this.timer = setInterval(this.updateTime, 1000 * 60)
        this.weatherTimer = setInterval(this.updateWeather, 1000 * 60 * 60)
    },
    destroyed() {
        clearInterval(this.timer)
        clearInterval(this.weatherTimer)
    },
    components: { countUpper, weatherIcon }
}
</script>


<style lang="sass" scoped>
@import '../../styles_config.sass'

.widget_wrap
    background: $light
    display: grid
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr 1fr
    grid-gap: 1px

    & div
        background: #fff
        text-align: center
        padding: 30px 0
        
        & h2
            font-size: 48px
            font-weight: 300

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


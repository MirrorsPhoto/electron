<template>
  <div class="widget_wrap">
        <div>
            <h2>{{ time.hours }}<span class="separator">:</span>{{ time.minutes }}</h2>
            <p>{{ date }}</p>
        </div>
      <div></div>
      <div></div>
      <div></div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            time: {
                hours: '',
                minutes: ''
            }
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
        }
    },
    mounted() {
        this.updateTime()
        setInterval(() => this.updateTime(), 1000 * 60)
    }
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
        padding: 30px
        
        & h2
            font-size: 48px
            font-weight: normal

            & .separator
                position: relative
                top: -4px
                animation: separator 2s linear infinite

        & p
            color: $hard

@keyframes separator
    50%
        color: rgb(51, 51, 51)
    51%
        color: rgba(51, 51, 51, 0)
    100%
        color: rgba(51, 51, 51, 0)

</style>


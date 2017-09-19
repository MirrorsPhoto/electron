<template>
  <div class="main_wrap">
        <div>
            <h2>{{ dateTime.time }}</h2>
            <p>{{ dateTime.date }}</p>
        </div>
      <div></div>
      <div></div>
      <div></div>
  </div>
</template>

<script>
export default {
    computed: {
        dateTime() {
            const
                date = new Date(),
                monthsList = ['января', 'февраля', 'марта',  'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
                week = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        
            let hours   = date.getHours(),
                minutes = date.getMinutes(),
                month   = monthsList[date.getMonth()],
                day     = date.getDate(),
                weekDay = week[date.getDay()]

            if (hours < 10) hours = '0' + hours
            if (minutes < 10) minutes = '0' + minutes

            return {
                time: `${hours}:${minutes}`,
                date: `${day} ${month}, ${weekDay}`
            } 
        },
        date() {

        }
    }
}
</script>


<style lang="sass" scoped>
@import '../../styles_config.sass'

.main_wrap
    background: $light
    display: grid
    grid-template-columns: 1fr 1fr
    grid-template-rows: 1fr 1fr
    grid-gap: 1px

    & div
        background: #fff
        text-align: center
        
        & h2
            font-size: 48px
            font-weight: normal

        & p
            color: $hard
</style>


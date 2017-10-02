<template>
  <div class="content">
            <pie-bar></pie-bar>
            <time-bar></time-bar>
            <div class="widgets_bar">
                <widget></widget>
                <widget></widget>
                <widget></widget>
                <widget></widget>
            </div>
            <check></check>
        </div>
</template>

<script>
import timeBar from '../modules/timeBar'
import pieBar from '../modules/pieBar'
import widget from '../modules/widget'
import check from '../modules/check'

export default {
    components: { timeBar, pieBar, widget, check }
}
</script>

<style lang="sass" scoped>
.content
    margin: 40px
    display: grid
    grid-template-columns: 1fr 1fr
    grid-template-rows: 270px 1fr
    grid-gap: 30px

    & .widget_wrap
        box-shadow: 2px 2px 5px rgba(0, 0, 0, .2)
</style>

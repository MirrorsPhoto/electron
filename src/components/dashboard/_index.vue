<template>
  <div class="content">
            <chart></chart>
            <counts></counts>
            <div class="widgets_bar">
                <widget
                    name="Фотография"
                    icon="photo"
                ></widget>
                <widget
                    name="Продажа"
                    icon="bag"
                ></widget>
                <widget
                    name="Ксерокопия"
                    icon="copy"
                ></widget>
                <widget
                    name="Ламинация"
                    icon="lamination"
                ></widget>
            </div>
            <check></check>
        </div>
</template>

<script>
export default {
    components: {
        chart : require('./chart'),
        counts: require('./counts'),
        widget: require('./widget'),
        check : require('./check')
    }
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

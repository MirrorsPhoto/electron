<template>
  <div class="content">

    <chart v-animate="{ name: topWidgetAnimation, del }"/>
    <counts v-animate="{ name: topWidgetAnimation, del }"/>

    <div class="widgets_bar" v-animate="{ name: bottomWidgetAnimation, del }">
      <widget-photo/>
      <widget-good/>
      <widget-copy/>
      <widget-lamin/>
    </div>

    <check v-animate="{ name: bottomWidgetAnimation, del }"/>

  </div>
</template>

<script>
export default {
  data() {
    return {
      active: true,
      isInitial: true
    }
  },
  computed: {
    del() {
      return this.isInitial ? 2300 : 0
    },
    topWidgetAnimation() {
      return this.active ? 'fadeInTop' : 'fadeOutTop'
    },
    bottomWidgetAnimation() {
      return this.active ? 'fadeInBottom' : 'fadeOutBottom'
    }
  },
  activated() {
    this.active = true
  },
  deactivated() {
    this.isInitial && (this.isInitial = false)
    this.active = false
 },
 components: {
   chart : require('./chart'),
   counts: require('./counts'),
   check : require('./check'),
   widgetPhoto: require('./widgetPhoto'),
   widgetGood : require('./widgetGood'),
   widgetCopy : require('./widgetCopy'),
   widgetLamin: require('./widgetLamin')
 }
}
</script>

<style lang="sass">
@import '../../styles_config.sass'

.content
  margin: 40px
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 270px 1fr
  grid-gap: 30px

  & .widget_wrap
    background: #fff
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .2)

  .widgets_bar .widget_wrap
    height: 70px
    display: flex
    justify-content: space-between
    position: relative

    & + .widget_wrap
        margin-top: 20px

    & > *
        height: 100%

    & .name
      padding: 15px 0
      border-right: 1px solid $light
      float: left
      text-align: center
      flex-basis: 130px
      position: relative
      overflow: hidden

      & .icon
        fill: $primary-color

      & h4
        font-size: 14px

    & .fields_wrap
      padding: 15px 20px
      flex-grow: 1
      display: flex
      justify-content: space-between

    & [type="submit"]
      float: right
      border: none
      outline: none
      background: $light
      padding: 0 10px
      transition: all .3s ease

      & .icon
        transform: rotate(90deg)
        fill: $hard
        cursor: pointer

      &:hover
        background: $primary-color

        & .icon
          fill: #fff

</style>

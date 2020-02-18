<template>
  <div class="dashboard_wrap">
    <chart></chart>
    <counts></counts>
    <div class="widgets_bar">
      <widget-photo></widget-photo>
      <widget-good></widget-good>
      <widget-copy></widget-copy>
      <widget-service></widget-service>
      <widget-lamin></widget-lamin>
    </div>
    <check></check>
  </div>
</template>

<script>
export default {
  components: {
    chart : require('./chart'),
    counts: require('./counts'),
    check : require('./check'),
    widgetPhoto: require('./widgetPhoto'),
    widgetGood : require('./widgetGood'),
    widgetCopy : require('./widgetCopy'),
    widgetLamin: require('./widgetLamin'),
    widgetService: require('./widgetService')
  }
}
</script>

<style lang="sass">
@import '../../config/colors'

.dashboard_wrap
  margin: 40px
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 270px 1fr
  grid-gap: 30px

  & .widget_wrap
    background: #fff
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .2)

    @media (prefers-color-scheme: dark)
      background: #212121
      & *:not(button)
        color: white !important

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

      @media (prefers-color-scheme: dark)
        color: white

      & .icon
        fill: $red

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

      @media (prefers-color-scheme: dark)
        border-color: rgba(255, 255, 255, 0.25)

      & .icon
        transform: rotate(90deg)
        fill: $hard
        cursor: pointer

      &:hover
        background: $red

        & .icon
          fill: #fff

</style>

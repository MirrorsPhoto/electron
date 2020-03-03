<template>
  <div class="dashboard_wrap">
    <chart></chart>
    <counts></counts>
    <div class="widgets_bar">
      <widget-photo v-if="permissions.includes('photo')"/>
      <widget-good v-if="permissions.includes('good')"/>
      <widget-copy v-if="permissions.includes('copy')"/>
      <widget-service v-if="permissions.includes('service')"/>
      <widget-document v-if="permissions.includes('document')"/>
      <widget-lamin v-if="permissions.includes('lamination')"/>
    </div>
    <check></check>
  </div>
</template>

<script>
export default {
  computed: {
    permissions() {
      return this.$store.state.user.allowed_types;
    }
  },
  components: {
    chart: require('./chart'),
    counts: require('./counts'),
    check: require('./check'),
    widgetPhoto: require('./widgetPhoto'),
    widgetGood: require('./widgetGood'),
    widgetCopy: require('./widgetCopy'),
    widgetLamin: require('./widgetLamin'),
    widgetService: require('./widgetService'),
    widgetDocument: require('./widgetDocument'),
  },
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

      & .icon
        transform: rotate(90deg)
        fill: $hard
        cursor: pointer

      &:hover
        background: $red

        & .icon
          fill: #fff

.widgets_bar
  overflow-y: auto
  height: 450px
  padding: 10px
  margin: -10px

</style>

<template>
  <label>
    {{ text }}
    <input
      type="checkbox"
      :value="value"
      v-model="$parent[vModel]"
      :disabled="disabled"
      :checked="checked"
    >
    <div class="checkbox"></div>
  </label>
</template>

<script>
export default {
  props: {
    vModel: { // Свойство родителя, к которому привязать чекбокс
      type: String
    },
    value: {
      type: [Number, String, Boolean]
    },
    text: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../config/colors'

label
  display: inline-block
  height: 16px
  padding-left: 26px
  position: relative
  cursor: pointer

  & .checkbox
    position: absolute
    top: 0
    left: 0
    height: 16px
    width: 16px
    border: 1px solid $medium
    cursor: pointer

    &:after
      content: ''
      position: absolute
      display: none
      left: 6px
      top: 2px
      width: 5px
      height: 10px
      border: solid #fff
      border-width: 0 2px 2px 0
      transform: rotate(45deg)
      cursor: pointer

  & input
    position: absolute
    z-index: -1
    opacity: 0

    &:checked + .checkbox
      border: none
      background: $red
      &:after
        display: block

    &:disabled + .checkbox
      border-color: $light
      cursor: default

    &:checked:disabled + .checkbox
      background: $light
      &:after
        border-color: $medium

</style>

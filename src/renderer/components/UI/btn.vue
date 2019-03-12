<template>
  <button
    :class="type"
    v-text="text"
    :disabled="disabled"
    @click.prevent="$emit('click')"
  ></button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'confirm' // 2 типа кнопок, confirm и cancel
    },
    text: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../../config/colors'

button
  padding: 0 30px
  height: 40px
  border: none
  outline: none
  transition: all .3s ease

  &.confirm
    background: $red
    color: #fff
    &:hover
      background: darken($red, 10%)
    &:disabled
      background: $light
      color: $hard
      cursor: default
      &:hover
        background: $light

  &.cancel
    background: #fff
    color: $red
    &:hover
      text-decoration: underline
    &:disabled
      color: $hard
      cursor: default
      &:hover
        text-decoration: none

</style>

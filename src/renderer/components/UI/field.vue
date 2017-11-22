<template>
  <div
    :style="{ width }"
    @click="onClick"
    @mouseleave="onMouseLeave"
    >

    <input
      ref="input"
      v-model="innerValue"
      :type="type"
      :placeholder="selected"
      :disabled="disabled || (select && options.length <= 1 && !showList)"
      autocomplete="off"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @keydown.down="onKeyDown"
      @keydown.up="onKeyUp"
      @keydown.enter.prevent="onKeyEnter"
    >

    <label
      v-text="placeholder"
      :class="{ active: innerValue }"
    ></label>

    <span
      v-if="select && options.length > 1"
      :class="['arrow', { active: showList }]"
    ></span>

    <ul ref="list" v-if="showList">
      <li v-for="(option, i) in filteredOptions" :key="option">
        <a
          href="#"
          v-text="option"
          :class="{ active_item: i === selectIndex }"
          @mousedown.prevent="change(option)"
        ></a>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    value: {
      type: [Number, String],
      default: ''
    },
    numbersOnly: {
      type: Boolean,
      default: false
    },
    maxLen: {
      type: [Number, Boolean],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    select: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: this.select
    }
  },
  data() {
    return {
      innerValue: '',
      showList: false,
      selectIndex: 0,
      selected: ''
    }
  },
  watch: {
    value(value) {
      this.change(value)
    },
    options(options) {
      this.change(options[0])
    }
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option => {
        const text = this.innerValue
        const path = option.split('').slice(0, text.length).join('')
        if (text.toLowerCase() === path.toLowerCase()) {
          return option
        }
      })
    },
    validValue() {
      const { maxLen, numbersOnly, innerValue } = this
      let value = innerValue

      if (maxLen && value.length > maxLen) {
        value = value.substr(0, maxLen)
      }
      if (numbersOnly) {
        value = value.replace(/[^0-9]/g, '')
      }

      return value
    }
  },
  methods: {
    change(value) {
      this.innerValue = value
      this.selected = value
      this.$emit('input', value)
      this.select && this.$refs.input.blur()
    },
    onClick() {
      this.$refs.input.focus()
    },
    onMouseLeave() {
      setTimeout(() => this.$refs.input.blur(), 500)
    },
    onFocus() {
      if (this.select && this.options.length > 1) {
        this.showList = true
        this.innerValue = ''
      }
    },
    onBlur(e) {
      if (this.select) {
        this.showList = false
        this.innerValue = this.selected
        this.selectIndex = 0
      }
    },
    onInput() {
      if (this.select) {
        this.selectIndex = 0
        this.$refs.list.scrollTop = 0
      } else {
        this.change(this.validValue)
      }
    },
    onKeyDown() {
      if (this.selectIndex + 1 < this.filteredOptions.length) {
        this.selectIndex++
        if (this.selectIndex > 2) {
          this.$refs.list.scrollTop += 32
        }
      }
    },
    onKeyUp() {
      if (this.selectIndex > 0) {
        this.selectIndex--
        if (this.selectIndex < (this.filteredOptions.length - 2)) {
          this.$refs.list.scrollTop -= 32
        }
      }
    },
    onKeyEnter() {
      this.change(this.filteredOptions[this.selectIndex])
    }
  },
  mounted() {
    this.change(this.select ? this.options[0] || '' : this.value)
    this.autofocus && this.$refs.input.focus()
  }
}
</script>

<style lang="sass" scoped>
@import "../../styles_config.sass"

div
  display: inline-block
  height: 40px
  line-height: 40px
  position: relative

  & > *
    cursor: pointer

  & input
    background: transparent
    width: 100%
    height: 40px
    padding: 17px 0 7px
    border: none
    border-bottom: 1px solid $medium
    outline: none
    text-overflow: ellipsis
    transition: all .3s ease
    position: relative
    z-index: 1

    &:focus
      padding-bottom: 6px
      border-bottom: 2px solid $primary-color

    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
      -webkit-appearance: none
      margin: 0

  & label
    color: $hard
    line-height: 16px
    position: absolute
    top: 16px
    left: 0
    transition: .2s ease-out
    z-index: 0

  input:focus + label
    color: $primary-color

  input:focus + label, .active
    font-size: .8em
    position: absolute
    top: -2px

  & .arrow
    display: block
    width: 0
    height: 0
    border: 4px solid transparent
    border-top-color: $medium
    position: absolute
    top: 20px
    right: 5px
    z-index: 0

    &.active
      transform: rotate(-180deg)
      transform-origin: 50% 25%

  &:hover .arrow
    border-top-color: $hard

  & ul
    list-style: none
    background: #fff
    width: 100%
    max-height: 90px
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .2)
    font-size: 14px
    position: absolute
    top: 40px
    left: 0
    overflow-y: auto
    z-index: 3

    & li + li
      border-top: 1px solid $light

    & li a
      display: block
      padding-left: 15px
      color: #333
      line-height: 30px
      text-decoration: none

      &:hover, &.active_item
        background: $light

</style>

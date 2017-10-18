<template>
  <div ref="wrap" :style="{ width }">

    <input
      ref="input"
      :type="type"
      :value="innerValue"
      @input="change($event.target.value)"
      @mousedown="openList()"
      :disabled="disabled || (select && options.length <= 1 && !showList)"
      :autofocus="autofocus"
      autocomplete="off"
    >

    <label
      v-text="placeholder"
      :class="{ active: innerValue }"
      @click="select ? openList() : $refs.input.focus()"
    ></label>

    <span
      v-if="select && options.length > 1"
      class="arrow"
      @mousedown="openList()"
    ></span>

    <transition name="fade-in">
      <ul ref="list" v-if="select && showList">
        <li v-for="option in options" :key="option">
          <a href="#" v-text="option" @click.prevent="change(option)"></a>
        </li>
      </ul>
    </transition>

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
      default: () => []
    }
  },
  data() {
    return {
      innerValue: '',
      showList: false
    }
  },
  watch: {
    value(value) {
      this.innerValue = value
    },
    options(options) {
      this.change(options[0])
    },
    showList(isShow) {
      document[isShow ? 'addEventListener' : 'removeEventListener']('click', this.closeList)
    }
  },
  methods: {
    change(value) {
      this.innerValue = value
      this.$emit('input', value)
    },
    openList() {
      if (this.select && this.options.length > 1 && !this.showList) this.showList = true
    },
    closeList(e) {
      const el = e.target, { wrap, list } = this.$refs
      if (!wrap.contains(el) || list.contains(el)) this.showList = false
    }
  },
  mounted() {
    if (this.select) this.change(this.options[0])
  }
}
</script>

<style lang="sass" scoped>
@import "../../styles_config.sass"

.fade-in-enter-active, .fade-in-leave-active
  transition: all .2s ease

.fade-in-enter, .fade-in-leave-to
  opacity: 0
  transform: translateY(10px)

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

    &:focus
      padding-bottom: 6px
      border-bottom: 2px solid $primary-color

  & label
    color: $hard
    line-height: 16px
    position: absolute
    top: 16px
    left: 0
    transition: .2s ease-out

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
    transition: all .3s ease

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
    top: 0
    left: 0
    overflow-y: auto
    z-index: 9999

    & li + li
      border-top: 1px solid $light

    & li a
      display: block
      padding-left: 15px
      line-height: 30px
      text-decoration: none

      &:hover
        background: $light

</style>
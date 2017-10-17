<template>
    <div ref="wrap" :style="{ width }">

        <input
            ref="input"
            :disabled="disabled || (select && options.length <= 1 && !showList)"
            :type="type"
            :autofocus="autofocus"
            autocomplete="off"
            :value="innerValue"
            @input="change($event.target.value)"
            @mousedown="openList()"
        >

        <label
            @click="select ? openList() : $refs.input.focus()"
            :class="{ active: innerValue }"
        >{{ placeholder }}</label>

        <span v-if="select && options.length > 1" class="arrow" @mousedown="openList()"></span>

        <transition name="fade-in">
            <ul v-if="select && showList" ref="list">
                <li v-for="option in options" :key="option">
                    <a href="#" @click.prevent="change(option)">{{ option }}</a>
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
        select: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '100%'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: [Number, String],
            default: ''
        },
        options: {
            type: Array,
            default: () => []
        },
        autofocus: {
            type: Boolean,
            default: false
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
        showList(isShow) {
            document[isShow ? 'addEventListener' : 'removeEventListener']('click', this.closeList)
        },
        options(options) {
            this.change(options[0])
        }
    },
    methods: {
        change(value) {
            this.innerValue = value
            this.$emit('input', value)
        },
        closeList(e) {
            const el = e.target, { wrap, list } = this.$refs
            if (!wrap.contains(el) || list.contains(el)) this.showList = false
        },
        openList() {
            if (this.select && this.options.length > 1 && !this.showList) this.showList = true
        }
    },
    mounted() {
        if (this.select) this.change(this.options[0])
    }
}
</script>

<style lang="sass" scoped>
@import "../../styles_config.sass"

div
  position: relative
  height: 40px
  line-height: 40px
  display: inline-block
  cursor: pointer

input
  border: none
  box-shadow: none
  border-bottom: 1px solid $medium
  outline: none
  width: 100%
  background: transparent
  padding: 17px 0 7px
  height: 40px
  transition: all .3s ease
  text-overflow: ellipsis

  &:focus
    padding: 17px 0 6px
    border-bottom: 2px solid $primary-color

label
  top: 16px
  line-height: 16px
  color: $hard
  position: absolute
  left: 0
  transition: .2s ease-out
  cursor: text

input:focus + label
  color: $primary-color

input:focus + label, .active
  font-size: .8em
  position: absolute
  top: -2px

.arrow
    width: 0
    height: 0
    border: 4px solid transparent
    border-top-color: $medium
    position: absolute
    top: 20px
    right: 5px
    transition: all .3s ease

div:hover .arrow
    border-top-color: $hard

ul
  list-style: none
  width: 100%
  max-height: 90px
  background: #fff
  font-size: 14px
  position: absolute
  top: 0
  left: 0
  box-shadow: 2px 2px 5px rgba(0, 0, 0, .2)
  overflow-y: auto
  z-index: 9999

  & li + li
    border-top: 1px solid $light

  & a
    display: block
    text-decoration: none
    line-height: 30px
    padding-left: 15px

    &:hover
      background: $light

.fade-in-enter-active, .fade-in-leave-active
  transition: all .2s ease

.fade-in-enter, .fade-in-leave-to
  opacity: 0
  transform: translateY(10px)

</style>
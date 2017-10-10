<template>
    <div :style="{ width }">

        <input
            ref="input"
            :disabled="disabled || (select && options.length === 1)"
            :type="type" :value="value"
            autocomplete="off"
            @input="change($event.target.value)"
            @focus="showList = select"
            @blur="showList = false"
        >

        <label
            @click="$refs.input.focus()"
            :class="{ active: value }"
        >{{ placeholder }}</label>

        <transition name="fadeIn">
            <ul v-if="showList">
                <li v-for="(option, index) in options" :key="index">
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
            showList: false
        }
    },
    methods: {
        change(value) {
            this.$emit('update:value', value)
        }
    },
    created() {
        if (this.select) this.change(this.options[0])
    },
    mounted() {
        if (this.autofocus) this.$refs.input.focus()
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
  cursor: text
  transition: .2s ease-out

input:focus + label
  color: $primary-color

input:focus + label, .active
  font-size: .8em
  position: absolute
  top: -2px
  cursor: text

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

  & li + li
    border-top: 1px solid $light

  & a
    display: block
    text-decoration: none
    line-height: 30px
    padding-left: 15px

    &:hover
      background: $light

.fadeIn-enter-active, .fadeIn-leave-active
  transition: all .2s ease

.fadeIn-enter, .fadeIn-leave-to
  opacity: 0
  transform: translateY(10px)

</style>
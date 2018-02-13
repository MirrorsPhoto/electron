<template>
    <div class="count_wrap">
        <button @click.prevent="change(count + 1)">+</button>
        <input
            type="number"
            step="1"
            min="1"
            :value="count"
            @input="change($event.target.value)"
        >
        <button @click.prevent="change(count - 1)">-</button>
        <span v-text="$locale('units.count')"></span>
    </div>
</template>
<script>
export default {
    props: {
        count: {
            default: 1
        }
    },
    methods: {
        change(value) {
            this.$emit('update:count', value > 1 ? value : 1)
        }
    }
}
</script>
<style lang="sass" scoped>
@import '../../config/colors'
.count_wrap
    display: flex
    justify-content: space-between
    width: 120px
    height: 30px
    margin: 5px 0

    & > *
        display: block
        width: 30px

    & button, & input
        border: none
        outline: none

    & button
        border: 1px solid $light
        background: #fff
        color: $red
        transition: all .3s ease

        &:hover
            background: $red
            color: #fff

    & input
        border-top: 1px solid $light
        border-bottom: 1px solid $light
        text-align: center

        &::-webkit-outer-spin-button, &::-webkit-inner-spin-button
            -webkit-appearance: none
            margin: 0

    & span
        text-align: right
        padding: 6px 0

</style>


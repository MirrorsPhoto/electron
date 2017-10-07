<template>
    <div class="count_wrap">
        <button @click.prevent="inc()">+</button>
        <input
            type="number"
            step="1"
            min="1"
            v-model.number="count"
        >
        <button @click.prevent="dec()">-</button>
        <span>шт.</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            count: 1
        }
    },
    watch: {
        count(count) {
            this.$emit('input', count)
        }
    },
    methods: {
        inc() {
            this.count++
        },
        dec() {
            if (this.count > 1) this.count--
        }
    }
}
</script>
<style lang="sass" scoped>
@import '../../styles_config.sass'
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
        color: $primary-color
        cursor: pointer
        transition: all .3s ease

        &:hover
            background: $primary-color
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


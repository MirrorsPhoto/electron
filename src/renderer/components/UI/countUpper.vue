<template>
    <span></span>
</template>
<script>
import CountUp from 'countup.js'

export default {
    props: {
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            countUpper: null
        }
    },
    watch: {
        value(newVal) {
            this.countUpper.update(newVal)
        }
    },
    mounted() {
        this.countUpper = new CountUp(this.$el, 0, this.value, 0, 1.5, { useEasing: true })
    }
}
</script>
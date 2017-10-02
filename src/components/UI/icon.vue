<template>
    <svg :style="'width: ' + size + 'px; height: ' + size + 'px'" :class="classList">
        <use :xlink:href="'sprite.svg#' + name"></use>
    </svg>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        size: {
            default: 20
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        classList() {
            return 'icon ' + this.className
        }
    }
}
</script>

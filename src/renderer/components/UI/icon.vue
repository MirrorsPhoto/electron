<template>
    <svg :width="size" :height="size" :class="classList">
        <use :xlink:href="'imgs/iconsSprite.svg#' + name"/>
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

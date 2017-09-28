<template>
    <svg width="1800" height="1000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1000">
        <g class="bg">
            <polygon points="0 157, 1800 157, 1800 1000, 0 1000" transform="skewY(-5)" :fill-opacity=" percent ? '0.7' : '1'"/>
            <polygon :points="'0 157, ' + percent * 18 + ' 157, ' + percent * 18 + ' 1000, 0 1000'" transform="skewY(-5)"/>
        </g>
        <g class="label">
            <text x="150" y="500" fill="#FFF" font-family="Mirrors" font-size="190">Mirror's</text>
            <text x="150" y="650" fill="#FFF" font-family="Mirrors" font-size="120">Photo</text>
        </g>
    </svg>
</template>

<script>
    export default {
        data() {
            return {
                percent: 0,
            }
        },
        mounted() {
            this.$electron.ipcRenderer.on('au-download-progress', (data, listener) => {
                const add = setInterval(() => {
                    this.percent += 1
                    if (this.percent === listener.percent) clearInterval(add)
                }, 17)
            })
        },
        destroyed(){
            this.$electron.ipcRenderer.removeListener('au-download-progress', () => {});
        }
    }
</script>

<style lang="sass" scoped>
    @import "../../styles_config.sass"

    @font-face
        font-family: 'Mirrors'
        src: url('../../assets/mirrors.ttf')

    .bg
        fill: $primary-color

    .label text
        font-family: Mirrors !important

</style>

<template>
  <svg width="1800" height="1000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 1000">
    <g class="bg" transform="skewY(-5)">
      <polygon
        points="0 157, 1800 157, 1800 1000, 0 1000"
      />
    </g>
    <g class="label">
      <text x="200" y="500" font-size="180">Mirror's</text>
      <text x="200" y="700" font-size="120">Photo</text>
    </g>
  </svg>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
@import '../../config/colors'

@font-face
  font-family: 'Mirrors'
  src: url('../../assets/mirrors.ttf')

.bg
  fill: $red

.label text
  font-family: Mirrors
  fill: #fff

</style>

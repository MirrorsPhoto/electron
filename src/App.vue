<template>
  <div class="bg">
    <router-view></router-view>
  </div>
</template>

<style lang="sass">
  *
    font-family: sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #333
    margin: 0
    padding: 0
    box-sizing: border-box

  body
    font-size: 14px
    -webkit-app-region: drag

  input, button, textarea
    -webkit-app-region: no-drag

  .bg
    background: url(./assets/DSC_6015.jpg) bottom center no-repeat
    background-size: cover
    height: 100vh
    display: flex
    align-items: center
    justify-content: center

</style>

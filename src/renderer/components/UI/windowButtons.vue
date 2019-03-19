<template>
  <div>
    <a class="close" @click.prevent="w.hide()"></a>
    <a class="min"   @click.prevent="w.minimize()"></a>
    <a class="max"   @click.prevent="w[w.isMaximized() ? 'unmaximize' : 'maximize']()"></a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      w: this.$electron.remote.getCurrentWindow()
    }
  }
}
</script>

<style lang="sass" scoped>
div
  margin: 0!important
  position: absolute
  top: 6px
  left: 8px
  
  & a
    display: inline-block
    width: 12px
    height: 12px
    border-radius: 50%
    margin-right: 4px
    border-radius: 50%
    cursor: default
    transition: all .2s ease
    
    &.close
      background: #ff6058
      
      &:hover
        background: darken(#ff6058, 22%)
        
    &.min
      background: #ffbe2f
      
      &:hover
        background: darken(#ffbe2f, 12%)

    &.max
      background: #29cb42
      
      &:hover
        background: darken(#29cb42, 8%)
        
</style>
<template>
  <div>
    <a class="close" @click.prevent="action('close')"></a>
    <a class="min"   @click.prevent="action('min')"></a>
    <a class="max"   @click.prevent="action('max')"></a>
  </div>
</template>

<script>
export default {
  methods: {
    action(type) {
      const w = this.$electron.remote.getCurrentWindow()
      switch (type) {
        case 'close':
          w.close()
          break
        case 'min':
          w.minimize()
          break
        case 'max':
          w[w.isMaximized() ? 'unmaximize' : 'maximize']()
          break
      }
    }
  }
}
</script>

<style lang="sass" scoped>
div
  margin: 0!important
  position: absolute
  top: 5px
  left: 8px
  
  & a
    display: inline-block
    width: 10px
    height: 10px
    border-radius: 50%
    margin-right: 3px 
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
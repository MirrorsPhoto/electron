<template>
  <div>
    <button class="close" @click.prevent="do('close')"></button>
    <button class="max" @click.prevent="do('max')"></button>
    <button class="min" @click.prevent="do('min')"></button>
  </div>
</template>

<script>
  export defalt {
    methods: {
      do(action) {
        const w = this.$electron.remote.getCurrentWindow()
        switch (action) {
          case 'close':
            w.close()
            break
          case 'max':
            w[!w.isMaximized() ? 'maximize' : 'unmaximize']()
            break
          case 'min':
            w.minimize()
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
  top: 0
  left: 0
  
  & button
    width: 10px
    heigth: 10px
    border-radius: 50%
    margin: 5px 0 0 5px 
    border: none
    outline: none
    border-radius: 50%
    cursor: default
    transition: all .2s ease
    
    &.close
      background: #ff6058
      
      &:hover
        background: #bf4943
        
    &.max
      background: #29cb42
      
      &:hover
        background: #1e9b30
        
    &.min
      background: #ffbe2f
      
      &:hover
        background: #bf9023
        
</style>
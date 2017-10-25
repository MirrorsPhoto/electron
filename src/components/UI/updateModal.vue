<template> 
  <div v-if="open" class="overlay"> 
    <transition name="modal" appear>
      <div class="modal"> 
  
        <header> 
          <h2>Новая версия приложения!</h2> 
          <button @click.prevent="open = false" class="close">+</button> 
        </header> 
  
        <div class="release_info">
          <div v-for="(r, i) in releaseNotes" :key="i">
            <h2 v-text="'Версия ' + r.version"></h2>
            <div v-html="r.note"></div>
          </div>
        </div>
      
        <footer>
          <button @click.prevent="open = false" class="cancel">Позже</button>
          <button @click.prevent="confirm()" class="confirm">Загрузить и обновить</button>
        </footer>
      </div>
    </transition>
  </div>
</template> 
 
<script> 
export default { 
  data() { 
    return { 
      open: false, 
      releaseNotes: []  // [{ version: '', note: '<html>' }, ...]
    } 
  }, 
  methods: { 
    confirm() { 
      this.$electron.ipcRenderer.send('au-download-confirm')
      this.open = false
    } 
  },
  created() {
    this.$electron.ipcRenderer.on('au-update-available', (e, { releaseNotes }) => { 
      this.releaseNotes = releaseNotes
      this.open = true 
    }) 
    this.$electron.ipcRenderer.on('au-error', (e, err) => console.error(err)) 
  }
} 
</script>

<style lang="sass" scoped> 
@import '../../styles_config.sass' 

.overlay 
  background: rgba(0, 0, 0, .2) 
  display: flex
  align-items: center
  justify-content: center
  width: 100vw 
  height: 100vh 
  position: fixed 
  top: 0 
  left: 0 
  z-index: 10000 
 
.modal 
  background: #fff 
  width: 400px 
  box-shadow: 5px 5px 32px rgba(0, 0, 0, .2)
  transition: all .3s ease-out

  &-enter
    opacity: 0
    transform: scale(.5)
 
  & header 
    padding: 20px 30px
    border-bottom: 1px solid $light  
    position: relative
 
    & button 
      background: transparent 
      border: none 
      outline: none 
      color: $hard 
      font-size: 1.5em 
      position: absolute
      top: 5px 
      right: 10px 
      transform: rotate(45deg) 
      transition: all .2s ease 
 
      &:hover 
        color: $primary-color 
 
  & .release_info 
    padding: 0 30px
    max-height: 450px
    overflow-y: auto
    line-height: 1.5

    &::-webkit-scrollbar
      width: 0

    & h2
      color: $hard
      font-weight: 200
      letter-spacing: .04em

    & h4
      color: $hard
      margin-bottom: 5px

    & > div
      padding: 15px 0

      & + div
        border-top: 1px dashed $light
 
  & footer 
    text-align: right
    padding: 15px 30px 
    border-top: 1px solid $light 
 
    & button 
      padding: 0 30px 
      height: 40px 
      border: none 
      outline: none 
 
      &.confirm 
        background: $primary-color 
        color: #fff 
        transition: all .3s ease

        &:hover
          background: darken($primary-color, 15%)
 
      &.cancel 
        background: #fff 
        color: $primary-color 

        &:hover
          text-decoration: underline
 
</style> 
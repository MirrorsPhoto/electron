<template> 
  <div v-if="open" class="overlay"> 
    <transition name="modal" appear>
      <div class="modal"> 
  
        <header> 
          <h2>Новая версия приложения!</h2> 
          <button @click.prevent="open = false" class="close">+</button> 
        </header> 
  
        <div v-if="release.releaseNotes.length" class="release_info">
          <div class="last_release">
            <h3>Что нового</h3> 
            <div v-html="release.releaseNotes[0].note"></div> 
          </div>

          <h3>История изменений:</h3> 
          <div class="releases_history">
            <div v-for="(r, i) in release.releaseNotes" :key="i"> 
              <template v-if="i > 0 && i <= 5"> 
                <h4 v-text="r.version"></h4> 
                <div v-html="r.note"></div> 
              </template> 
            </div> 
          </div>
        
        </div> 
      
        <footer> 
          <button @click.prevent="open = false" class="cancel">Позже</button>
        </footer> 
      </div> 
          <button @click.prevent="confirm()" class="confirm">Загрузить и обновить</button> 
    </transition>
  </div>
</template> 
 
<script> 
export default { 
  data() { 
    return { 
      open: true, 
      release: { 
        releaseName: '', 
        releaseNotes: []  //  [{ version: '', note: '<html>' }, ...]
      } 
    } 
  }, 
  methods: { 
    confirm() { 
      this.$electron.ipcRenderer.send('au-download-confirm') 
    } 
  }, 
  mounted() { 
    this.$electron.ipcRenderer.on('au-update-available', (e, { releaseName, releaseNotes }) => { 
      this.release = { releaseName, releaseNotes } 
      this.open = true 
    }) 
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
    padding: 0 30px 20px 

    & .last_release
      padding: 15px 30px
      margin: 0 -30px 20px
      background: $light

    & h3
      margin-bottom: 10px

    & h4
      color: $hard
      margin-bottom: 5px

    & .releases_history, .last_release
      max-height: 200px
      overflow-y: auto

      & > div
        padding: 5px 0
        border-bottom: 1px solid $light
 
  & footer 
    display: flex 
    justify-content: space-between 
    padding: 15px 30px 
    border-top: 1px solid $light 
 
    & button 
      width: 120px 
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
<template>
  <form ref="widget" class="widget_wrap" @submit.prevent="submit()">

    <div class="name">
      <icon name="photo"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

      <!-- Индикатор подключения к Photoshop -->
      <span
        :class="['indicator', { active: isConnectPS }]"
        :title="(isConnectPS ? 'Есть соединение' : 'Нет соединения') + ' с Photoshop'"
      ></span>

      <field
        select
        placeholder="Размер"
        width="120px"
        :options="sizes"
        v-model="size"
      ></field>

      <field
        select
        placeholder="Кол-во"
        width="120px"
        :options="counts"
        v-model.number="count"
      ></field>
  
    </div>

    <button type="submit"><icon name="chevron"></icon></button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: 'Фотография',
      type: 'photo',
      photoData: [],
      size: '',
      count: 1,
      isConnectPS: false
    }
  },
  computed: {
    // Размеры фотографий строками для передачи в компонент field
    sizes() {
      return this.photoData.map(this.sizeToString)
    },
    // Данные выбранного размера
    selectedSizeData() {
      const { sizes, size } = this
      return sizes.length && size
        ? this.photoData[sizes.indexOf(size)]
        : {}
    },
    // Возможные кол-ва выбранного размера
    counts() {
      return Object.keys(this.selectedSizeData.variations || {}).sort((a, b) => a - b)
    },
    price() {
      return this.selectedSizeData.variations[this.count] || 0
    }
  },
  methods: {
    sizeToString(size) {
      return size.width + 'x' + size.height
    },
    submit() {
      const {
        id,
        title,
        type,
        size,
        price,
        count
      } = this

      this.$emit('add', {
        id,
        title,
        type,
        price,
        count,
        copies: 1,
        value: `${size} (${count} шт.)`
      })
    }
  },
  created() {
    // Получаем размеры фото
    this.$http.get('photo/size')
      .then(({ data: { response } }) => this.photoData = response.sort((a, b) => a.width - b.width))
      .catch(err => console.error(err))

    // Меняем статус подключения к Photoshop
    this.$electron.ipcRenderer.on('photoshop-connect', (e, status) => this.isConnectPS = status)

    // Продажа фото из Photoshop-расширения
    this.$electron.ipcRenderer.on('photoshop-message', (e, { height, width, count }) => {
      this.size  = this.sizeToString({ width, height })
      this.count = count
      this.submit()
    })
  },
  components: {
    icon : require('../UI/icon'),
    field: require('../UI/field')
  }
}
</script>
<style lang="sass" scoped>
@import '../../styles_config.sass'

.indicator
  display: block
  width: 0
  height: 0
  border-radius: 10px
  border: 10px solid transparent
  border-right-color: $primary-color
  transform: rotate(45deg)
  position: absolute
  left: -10px
  top: -10px

  &.active
    border-right-color: $green

</style>


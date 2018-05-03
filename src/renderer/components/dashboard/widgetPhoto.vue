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

      <field-select
        label="Размер"
        width="120px"
        :options="sizes"
        autoSelect
        v-model="size"
      ></field-select>

      <field-select
        label="Кол-во"
        width="120px"
        :options="counts"
        autoSelect
        v-model.number="count"
      ></field-select>

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
    id() {
       return this.photo.id || null
     },
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
      return Object.values(this.selectedSizeData.variations || {}).map(e => String(e.count)).sort((a, b) => a - b)
    },
    price() {
      return this.photo.price || 0
    },
    photo() {
      return this.selectedSizeData.variations.find(element => element.count == this.count)
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
    fieldSelect: require('../UI/fieldSelect')
  }
}
</script>
<style lang="sass" scoped>
@import '../../config/colors'

.indicator
  display: block
  width: 0
  height: 0
  border-radius: 10px
  border: 10px solid transparent
  border-right-color: $red
  transform: rotate(45deg)
  position: absolute
  left: -10px
  top: -10px

  &.active
    border-right-color: $green

</style>

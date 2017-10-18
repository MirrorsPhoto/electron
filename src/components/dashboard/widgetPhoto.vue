<template>
  <form ref="widget" class="widget_wrap" @submit.prevent="submit()">

    <div class="name">
      <icon name="photo"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

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
      photoData: [],
      size: '',
      count: 1,
      isConnectPS: false
    }
  },
  computed: {
    sizes() {
      return this.photoData.map(this.sizeToString)
    },
    variations() {
      if (this.sizes.length && this.size) {
        const index = this.sizes.findIndex(size => size === this.size)
        return this.photoData[index].variations
      } else return {}
    },
    counts() {
      return Object.keys(this.variations)
    },
    price() {
      return +this.variations[this.count] || 0
    }
  },
  methods: {
    sizeToString(size) {
      return size.width + 'x' + size.height
    },
    submit(msg) {
      const { title } = this
      const { size, price, count } = msg ? msg : this
      const value = `${size} (${count} шт.)`
      this.$emit('add', { title, value, price, count: 1 })
    }
  },
  created() {
    this.$http.get('photo/size')
      .then(({ data: { response } }) => this.photoData = response)
      .catch(err => console.error(err))

    this.$electron.ipcRenderer.on('photoshop-connect', (e, status) => this.isConnectPS = status)
    
    this.$electron.ipcRenderer.on('photoshop-message', (e, { height, width, count }) => {
      const size = this.sizeToString({ width, height })
      const price = this.photoData
        .find(s => s.height === height && s.width === width)
        .variations[count]

      this.submit({ size, count, price })
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


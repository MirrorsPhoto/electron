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
      return this.photoData.map(size => size.width + 'x' + size.height)
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
    submit() {
      const { title, price, count, size } = this
      const value = `${size} (${count} шт.)`
      this.$emit('add', { title, value, price, count: 1 })
    }
  },
  created() {
    this.$http.get('photo/size')
      .then(({ data: { response } }) => this.photoData = response)
      .catch(err => console.error(err))

    this.$electron.ipcRenderer.on('photoshop-connect', status => this.isConnectPS = status)
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


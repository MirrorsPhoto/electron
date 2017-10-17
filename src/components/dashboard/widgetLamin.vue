<template>
  <form ref="widget" class="widget_wrap" @submit.prevent="submit()">

    <div class="name">
      <icon name="lamination"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

      <field
        select
        placeholder="Размер"
        width="120px"
        :options="sizes"
        v-model="size"
      ></field>

      <count :count.sync="count"></count>

    </div>

    <button type="submit"><icon name="chevron"></icon></button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: 'Ламинация',
      variations: {
        'A4': 100,
        'A3': 250
      },
      size: '',
      count: 1
    }
  },
  computed: {
    sizes() {
      return Object.keys(this.variations)
    },
    price() {
      return this.variations[this.size]
    }
  },
  methods: {
    submit() {
      const { title, count, price, size: value } = this
      this.$emit('add', { title, value, count, price })
      this.count = 1
    }
  },
  components: {
    icon : require('../UI/icon'),
    field: require('../UI/field'),
    count: require('../UI/count')
  }
}
</script>


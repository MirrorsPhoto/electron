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
        :options="formats"
        v-model="selectedFormat"
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
      variations: [],
      selectedFormat: '',
      count: 1
    }
  },
  computed: {
    formats() {
      return this.variations.map(({ format }) => format).sort((a, b) => b[1] - a[1])
    },
    price() {
      return this.variations
        .find(({ format }) => format === this.selectedFormat)
        .price
    }
  },
  methods: {
    submit() {
      const { title, count, price, selectedFormat: value } = this
      this.$emit('add', { title, value, count, price })
      this.count = 1
    }
  },
  created() {
    this.$http.get('lamination/size')
      .then(({ data }) => this.variations = data.response)
      .catch(err => console.error(err))
  },
  components: {
    icon : require('../UI/icon'),
    field: require('../UI/field'),
    count: require('../UI/count')
  }
}
</script>


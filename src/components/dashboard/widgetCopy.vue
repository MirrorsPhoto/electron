<template>
  <form ref="widget" class="widget_wrap" @submit.prevent="submit()">

    <div class="name">
      <icon name="copy"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

      <field
        placeholder="Размер"
        width="120px"
        :value="size"
        disabled
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
      title: 'Ксерокопия',
      size : 'A4',
      count: 1,
      price: 0
    }
  },
  methods: {
    submit() {
      const { title, size: value, count, price } = this
      this.$emit('add', { title, value, count, price })
      this.count = 1
    }
  },
  created() {
    this.$http.get('copy/price')
      .then(({ data }) => this.price = data.response)
      .catch(err => console.err(err))
  },
  components: {
    icon : require('../UI/icon'),
    field: require('../UI/field'),
    count: require('../UI/count')
  }
}
</script>


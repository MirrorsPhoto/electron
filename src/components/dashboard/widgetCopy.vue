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

      <count :count.sync="copies"></count>

    </div>

    <button type="submit"><icon name="chevron"></icon></button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: 'Ксерокопия',
      type: 'copy',
      size : 'A4',
      copies: 1,
      price: 0
    }
  },
  methods: {
    submit() {
      const { title, type, size: value, copies, price } = this
      this.$emit('add', { title, type, value, copies, price })
      this.copies = 1
    }
  },
  created() {
    this.$http.get('copy/price')
      .then(({ data }) => this.price = data.response)
      .catch(err => console.error(err))
  },
  components: {
    icon : require('../UI/icon'),
    field: require('../UI/field'),
    count: require('../UI/count')
  }
}
</script>


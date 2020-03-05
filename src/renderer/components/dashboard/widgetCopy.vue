<template>
  <form ref="widget" class="widget_wrap" @submit.prevent="submit()">

    <div class="name">
      <icon name="copy"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

      <field-input
        label="Размер"
        width="120px"
        :value="size"
        disabled
      ></field-input>

      <count :count.sync="copies"></count>

    </div>

    <button type="submit" :disabled="!price"><icon name="chevron"></icon></button>
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
      const {
        title,
        type,
        copies,
        price,
        size: value
      } = this

      this.$emit('add', {
        id: 1,
        title,
        type,
        copies,
        price,
        value
      })

      this.copies = 1
    }
  },
  created() {
    // Получаем цену ксерокопии
    this.$http.get('copy/price/1')
      .then(({ data }) => this.price = data.response)
      .catch(err => console.error(err))
  },
  components: {
    icon: require('../UI/icon'),
    fieldInput: require('../UI/fieldInput'),
    count: require('../UI/count')
  }
}
</script>

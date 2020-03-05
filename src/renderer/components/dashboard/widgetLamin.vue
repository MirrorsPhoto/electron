<template>
  <form ref="widget" class="widget_wrap" @submit.prevent="submit()">

    <div class="name">
      <icon name="lamination"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

      <field-select
        label="Размер"
        width="120px"
        :options="formats"
        autoSelect
        v-model="selectedFormat"
      ></field-select>

      <count :count.sync="copies"></count>

    </div>

    <button type="submit" :disabled="!variations.length"><icon name="chevron"></icon></button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: 'Ламинация',
      type: 'lamination',
      variations: [],
      selectedFormat: '',
      copies: 1
    }
  },
  computed: {
    formats() {
      return this.variations.map(({ format }) => format).sort((a, b) => a[1] - b[1])
    }
  },
  methods: {
    submit() {
      const {
        title,
        type,
        copies,
        selectedFormat: value
      } = this

      const { id, price } = this.variations.find(({ format }) => format === this.selectedFormat)

      this.$emit('add', {
        id,
        title,
        type,
        value,
        copies,
        price
      })

      this.copies = 1
    }
  },
  created() {
    // Получаем форматы ламинации и их цены
    this.$http.get('lamination/size')
      .then(({ data }) => this.variations = data.response)
      .catch(err => console.error(err))
  },
  components: {
    icon : require('../UI/icon'),
    fieldSelect: require('../UI/fieldSelect'),
    count: require('../UI/count')
  }
}
</script>

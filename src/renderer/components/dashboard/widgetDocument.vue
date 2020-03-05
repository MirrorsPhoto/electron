<template>
  <form ref="widget" class="widget_wrap" @submit.prevent="submit()">

    <div class="name">
      <icon name="passport"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

      <field-select
        label="Тип"
        width="120px"
        :options="names"
        autoSelect
        v-model="value"
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
      title: 'Документ',
      type: 'document',
      variations: [],
      value: '',
      copies: 1
    }
  },
  computed: {
    names() {
      return this.variations.map(({ name }) => name)
    }
  },
  methods: {
    submit() {
      const {
        title,
        type,
        copies,
        value
      } = this

      const { id, price } = this.variations.find(({ name }) => name === this.value)

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
    this.$http.get('document')
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

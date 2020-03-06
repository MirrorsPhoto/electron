<template>
  <form ref="widget" class="widget_wrap" :class="{ 'widget_wrap--disabled': !data.length }" @submit.prevent="submit()">

    <div class="name">
      <icon name="service"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

      <field-select
        label="Тип"
        width="120px"
        :options="options"
        autoSelect
        v-model="selected"
      ></field-select>

      <count :count.sync="copies"></count>

    </div>

    <button type="submit"><icon name="chevron"></icon></button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: 'Услуга',
      type: 'service',
      data: [],
      selected: '',
      copies: 1
    }
  },
  computed: {
    options() {
      return this.data.map(({ name }) => name)
    }
  },
  methods: {
    submit() {
      const {
        title,
        type,
        copies,
        selected: value
      } = this

      const { id, price } = this.data.find(({ name }) => name === this.selected)

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
    this.$http.get('service')
      .then(({ data }) => this.data = data.response)
  },
  components: {
    icon : require('../UI/icon'),
    fieldSelect: require('../UI/fieldSelect'),
    count: require('../UI/count')
  }
}
</script>

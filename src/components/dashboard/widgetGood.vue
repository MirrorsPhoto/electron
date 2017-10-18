<template>
  <form ref="widget" class="widget_wrap" @submit.prevent="submit()">

    <div class="name">
      <icon name="bag"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

      <field
        type="number"
        :max-len="13"
        placeholder="Код товара"
        width="120px"
        v-model="code"
        @keypress.enter.native.prevent="submit()"
      ></field>

      <span v-text="errorText" class="error"></span>

      <count :count.sync="count"></count>
    </div>

    <button type="submit"><icon name="chevron"></icon></button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: 'Продажа',
      code: '',
      count: 1,
      errorText: ''
    }
  },
  watch: {
    code(code) {
      this.errorText = ''
    }
  },
  methods: {
    submit() {
      this.$http.get('good/' + this.code)
        .then(({ data: { response } }) => {
          const { name: title, description: value, price } = response
          const { count } = this

          this.$emit('add', { title, value, count, price })
          this.code = ''
          this.count = 1
        })
        .catch(({ response: { data }}) => this.errorText = data.message[0])
    }
  },
  components: {
    icon : require('../UI/icon'),
    field: require('../UI/field'),
    count: require('../UI/count')
  }
}
</script>
<style lang="sass" scoped>
@import '../../styles_config.sass'

.error
  color: $primary-color
  font-size: .7em
  position: absolute
  bottom: 3px
  left: 150px

</style>

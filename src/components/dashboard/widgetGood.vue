<template>
  <form ref="widget" class="widget_wrap" @submit.prevent="submit()">

    <div class="name">
      <icon name="bag"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

      <field
        numbersOnly
        :max-len="13"
        placeholder="Код товара"
        width="120px"
        v-model="code"
        @keypress.enter.native.prevent="submit()"
      ></field>

      <span v-text="errorText" class="error"></span>

      <count :count.sync="copies"></count>
    </div>

    <button type="submit"><icon name="chevron"></icon></button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: 'Продажа',
      type: 'good',
      code: '',
      copies: 1,
      errorText: ''
    }
  },
  watch: {
    code(code) {
      this.errorText = ''
    }
  },
  methods: {
    async submit() {
      const { code } = this

      if (code.length === 13) {
        try {
          const
            { data } = await this.$http.get('good/' + code),
            { name: title, description: value, price, id } = data.response,
            { type, copies } = this

          this.$emit('add', { id, title, type, value, copies, price })
          this.code = ''
          this.copies = 1
        } catch(err) {
          this.errorText = err.response.data.message[0]
        }
      } else {
        this.errorText = 'Код должен состоять из 13 цифр'
      }
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

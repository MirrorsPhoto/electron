<template>

  <!-- Виджет продажи товара -->

  <form ref="widget" class="widget_wrap" @submit.prevent="onSubmit">

    <div class="name">
      <icon name="bag"></icon>
      <h4>{{ title }}</h4>
    </div>

    <div class="fields_wrap">

      <!-- Если вводится код - поле меняется на input, если поиск товара по названию - на select -->
      <component
        :is="code ? 'fieldInput' : 'fieldSelect'"
        ref="field"
        label="Код или поиск"
        width="120px"
        :max-len="code && 13"
        :value="code"
        :options="!code && options"
        @input="onInput"
        @search="onSearch"
        @keydown.enter.native.prevent="onSubmit"
      />

      <!-- Кол-во штук -->
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
      code: null,
      id: null,   // id выбранного товара при поиске по названию
      copies: 1,  // Кол-во
      searchText: '',
      searchResults: []
    }
  },
  computed: {
    options() {
      if (!this.searchResults.length) return []
      return this.searchResults.map(({ name }) => name)
    }
  },
  methods: {

    // Ввод в поле input или выбор опции в поле select
    onInput(value) {
      if (!value) return

      // Если выбрана опция
      if (this.options.includes(value)) {
        this.code = null
        this.id = this.searchResults.find(({ name }) => name === value).id
        return
      }

      // Если в input введены буквы - меняем поле на select и вставляем значение в строку поиска
      if (isNaN(value)) {
        this.switchField('fieldSelect', value)
        return
      }

      this.code = value
    },

    // Поиск в поле select
    onSearch(value) {

      // Если введены цифры - меняем поле на input и вставляем значение
      if (!isNaN(value)) {
        this.switchField('fieldInput', value)
        return
      }

      // Записываем в поисковый запрос первые три буквы. При их смене - новый поисковый запрос
      if (value.length > 2 && value.toLowerCase().substr(0, 3) !== this.searchText) {
        this.searchText = value
        this.searchResults = []
        this.getSearchResults()
      }
    },

    // Переключение поля
    switchField(fildName, value) {
      const ifToSelect = fildName === 'fieldSelect'
      this.searchText = ifToSelect ? value : ''
      this.code = ifToSelect ? null : value

      // После перерисовки DOM ставим фокус на поле
      this.$nextTick(() => {
        this.$refs.field.$el.querySelector('input').focus()
        ifToSelect && (this.$refs.field.search = value)
      })
    },

    getSearchResults() {
      this.$http.get('good/search?query=' + this.searchText)
        .then(({ data }) => this.searchResults = data.response || [])
        .catch(err => console.error(err))
    },

    onSubmit() {
      const { code, id } = this
      const url = code ? `good/bar-code/${code}` : `good/${id}`

      if (code) {
        if (code.length !== 13) {
          return alert('Код должен состоять из 13 цифр')
        }
      } else if (!id) {
        return alert('Товар не найден...')
      }

      this.sendToCheck(url)
        .then(() => {
          this.code = null
          this.id = null
          this.copies = 1
          this.searchResults = []
          !code && this.$refs.field.select('')
        })
    },

    // Отправка в чек
    async sendToCheck(url) {
      try {
        const { data } = await this.$http.get(url)
        const {
          id,
          price,
          available,
          name,
          description
        } = data.response
        const { type } = this

        // Если указанное кол-во превышает доступное - меняем на доступное
        const copies = this.copies > available ? available : this.copies

        this.$emit('add', {
          id,
          type,
          copies,
          price,
          available,
          title: name,
          value: description
        })

      } catch(err) {
        console.error(err)
      }
    }
  },

  components: {
    icon : require('../UI/icon'),
    fieldInput: require('../UI/fieldInput'),
    fieldSelect: require('../UI/fieldSelect'),
    count: require('../UI/count')
  }
}
</script>

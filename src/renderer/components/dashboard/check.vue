<template>
  <form class="widget_wrap" @submit.prevent="submit()">
    <table>
      <thead>
        <tr>
          <td>#</td>
          <td>Наименование</td>
          <td>Кол-во</td>
          <td>Цена</td>
        </tr>
      </thead>

      <transition-group name="check" tag="tbody">
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ index + 1 }}.</td>
          <td>{{ row.title }}, {{ row.value }}</td>
          <td>
            <button class="displayOnHover" @click.prevent="setCount('dec', index)">-</button>
            <span class="count">{{ row.copies }}</span>
            <button class="displayOnHover" @click.prevent="setCount('inc', index)">+</button>
          </td>
          <td>{{ row.copies * row.price }}₽</td>
          <a href="#" class="displayOnHover" @click.prevent="removeRow(index)">+</a>
        </tr>
      </transition-group>

      <tfoot>
        <tr>
          <td align="left">
            <span v-if="total" class="total">Итого: {{ total }}₽</span>
          </td>
          <td align="right"><input type="submit" value="Оплачено" :disabled="disableButton || !rows.length"></td>
        </tr>
      </tfoot>
    </table>
  </form>
</template>
<script>
export default {
  data() {
    return {
      rows: [],
      disableButton: false
    }
  },
  computed: {
    // Общая стоимость позиций в чеке
    total() {
      return this.rows.reduce((res, row) => res += (row.copies * row.price), 0)
    }
  },
  methods: {
    // Добавление позиции в чек
    addRow(data) {
      const i = this.rows.findIndex(r => data.title === r.title && data.value === r.value)

      // Если в чеке нет такой позиции, то добавляем ее. Иначе суммируем кол-во
      if (i === -1) {
        this.rows.push(data)
        return
      }

      // Если общее кол-во в одинаковых позициях превышает допустимое - устанавливаем допустимое
      const { available = Infinity } = this.rows[i]
      const total = this.rows[i].copies + data.copies
      this.rows[i].copies = Math.min(total, available)
    },
    // Удаление позиции из чека
    removeRow(i) {
      this.rows.splice(i, 1)
    },
    // Изменение кол-ва
    setCount(method, i) {
      const { available, copies } = this.rows[i]
      if (method === 'inc') {
        if (available && available <= copies) return
        this.rows[i].copies = copies + 1
      } else if (copies > 1) {
        this.rows[i].copies = copies - 1
      }
    },
    // Отправление чека на сервер
    submit() {
      this.disableButton = true
      const items = this.rows.map(({ id, type, copies }) => ({ id, type, copies }))
      this.$http.post('/sale/batch', { items })
        .then(() => this.rows = [])
        .catch(err => console.error(err))
        .then(() => this.disableButton = false)
    }
  },
  created() {
    // Подписываемся на событие 'add' в виджетах
    this.$parent.$children
      .filter(({ $refs }) => $refs.widget)
      .forEach(widget => widget.$on('add', this.addRow))
  }
}
</script>
<style lang="sass" scoped>
@import '../../config/colors'

.check-enter, .check-leave-to
  opacity: 0
  transform: translateY(20px)

.check-leave-active, .check-enter-active
  transition: all .3s
  position: absolute

.widget_wrap
  padding: 70px 0
  position: relative

table, thead, tbody, tfoot, tr
  display: block

tbody td
  display: inline-block
  vertical-align: middle
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

thead, tbody, tfoot
  padding: 15px 30px

thead td:nth-child(1), tbody td:nth-child(1)
  width: 25px

thead td:nth-child(2), tbody td:nth-child(2)
  width: 240px

thead td:nth-child(3), tbody td:nth-child(3)
  width: 80px

thead td:nth-child(4), tbody td:nth-child(4)
  width: 50px

thead, tfoot
  height: 70px
  position: absolute
  left: 0

thead
  top: 0
  border-bottom: 1px solid $light

  & tr
    line-height: 35px

    & td
      color: $hard

tbody
  display: block
  height: 200px
  overflow-y: auto
  overflow-x: hidden
  position: relative

  &::-webkit-scrollbar
      width: 0

  &:after
    content: ''
    position: absolute
    display: block
    width: 100%
    height: 50px
    bottom: 0
    left: 0
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))

  & tr
    margin: 0 -30px
    padding: 0 30px
    position: relative
    transition: all 1s ease

    & td
      padding: 9px 0

    a
      text-decoration: none
      position: absolute
      right: 12px
      top: 6px
      transform: rotate(45deg)
      font-size: 1.5em

    & .displayOnHover
      opacity: 0
      transition: all .3s ease
      color: $red

    &:hover
      background: $light

      & .displayOnHover
        opacity: .5

        &:hover
          opacity: 1

    & button
      border: none
      outline: none
      background: transparent
      font-size: 1.2em

    & .count
      display: inline-block
      margin 0 5px
      width: 30px
      text-align: center

tfoot
  bottom: 0
  border-top: 1px solid $light

  & td
    width: 100%
    position: relative
    top: -2px

    & .total
      color: $hard

    & [type="submit"]
      height: 40px
      padding: 0 30px
      background: $red
      color: #fff
      border: none
      outline: none
      margin: 0
      transition: all .3s ease

      &:hover
        background: darken($red, 15%)

      &:disabled
        background: $light
        color: $hard

</style>

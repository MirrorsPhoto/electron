<template>
  <form class="widget_wrap" @submit.prevent="confirm()">
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
            <button class="displayOnHover" @click.prevent="setCount('inc', index, row.count)">+</button>
            <span class="count">{{ row.count }}</span>
            <button class="displayOnHover" @click.prevent="setCount('dec', index, row.count)">-</button>
          </td>
          <td>{{ row.count * row.price }}₽</td>
          <a href="#" class="displayOnHover" @click.prevent="removeRow(index)">+</a>
        </tr>
      </transition-group>
      <tfoot>
        <tr>
          <td align="left">
            <span v-if="total > 0" class="total">Итого: {{ total }}₽</span>
          </td>
          <td align="right"><input type="submit" value="Оплачено" :disabled="!rows.length"></td>
        </tr>
      </tfoot>
    </table>
  </form>
</template>
<script>
export default {
  data() {
    return {
      rows: []
    }
  },
  computed: {
    total() {
      return this.rows.reduce((res, row) => res += (row.count * row.price), 0)
    }
  },
  methods: {
    addRow(data) {
      const i = this.rows.findIndex(r => data.title === r.title && data.value === r.value)
      i !== -1
        ? this.rows[i].count += data.count
        : this.rows.push(data)
    },
    removeRow(index) {
      this.rows.splice(index, 1)
    },
    setCount(method, index, count) {
      if (method === 'inc') {
        this.rows[index].count = count + 1
      } else if (method === 'dec' && this.rows[index].count > 1) {
        this.rows[index].count = count - 1
      }
    },
    confirm() {
      this.$store.commit('addSale', this.total)
      this.rows = []
    }
  },
  created() {
    this.$parent.$children
      .filter(({ $refs }) => $refs.widget)
      .forEach(widget => widget.$on('add', this.addRow)) 
  }
}
</script>
<style lang="sass" scoped>
@import '../../styles_config.sass'

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
  background: #fff
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
      color: $primary-color

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
  box-shadow: 0 30px 70px #fff

  & td
    width: 100%
    position: relative
    top: -2px

    & .total
      color: $hard

    & [type="submit"]
      height: 40px
      padding: 0 30px
      background: $primary-color
      color: #fff
      border: none
      outline: none
      margin: 0
      transition: all .3s ease

      &:hover
        background: darken($primary-color, 15%)

      &:disabled
        background: $light
        color: $hard
            
</style>


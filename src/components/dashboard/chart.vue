<template>
  <div class="widget_wrap">

    <div class="chart_wrap">
      <svg class="donut">
        <g>
          <circle
            v-for="(da, i) in daList" :key="i"
            :stroke="colors[i]"
            :stroke-dasharray="da"
            :stroke-dashoffset="doList[i]"
          ></circle>   
        </g>
      </svg>
    </div>

    <table>
      <template v-for="(item, i) in items">
        <tr>
          <td rowspan="2"><icon :name="icons[item.name]" :style="{ fill: colors[i] }" size="30"></icon></td>
          <td colspan="3">{{ item.name }}</td>
        </tr>
        <tr>
          <td>{{ item.count | rubles }}</td>
          <td>• &nbsp;</td>
          <td>{{ percents[i] | percents }}</td>
        </tr>
      </template>
    </table>

  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: ['#2ecc71', '#f1c40f', '#e74c3c', '#3498db'],
      icons: {
        'Фотография': 'photo',
        'Продажа'   : 'bag',
        'Ксерокопия': 'copy',
        'Ламинация' : 'lamination'
      },

      // stroke-dasharray для каждого отрезка. Длина - 0, отступ = длина всего круга
      daList: ['0 502.65', '0 502.65', '0 502.65', '0 502.65'], 

      // stroke-dashoffset для каждого отрезка. Отступ = сумма длин отрезка и его предыдущих элементов
      doList: [0, 0, 0, 0]
    }
  },
  computed: {
    items() {
      const
        stats  = this.$store.state.stats,
        names  = Object.keys(stats),
        counts = Object.values(stats)

      return names.map((name, i) => {
        return { name, count: counts[i] }
      })
    },
    // Общая сумма
    total() {
      return this.items.reduce((sum, { count }) => sum += count, 0)
    },
    // Процентное соотношение всех сумм к общей
    percents() {
      return this.items.map(({ count }) => (count * 100 / this.total) || 0)
    }
  },
  watch: {
    percents(percents) {
      this.drawChart(percents)
    }
  },
  methods: {
    drawChart(percents) {

      this.daList = percents.map(p => {
        const
          circleLength = 502.65,           // Длина окружности = 2PIr
          length = p * circleLength / 100, // Длина отрезка
          offset = circleLength - length   // Оставшееся место

        return length + ' ' + offset
      })

      this.doList = this.daList.map((segment, i) => {
        return i !== 0
          ? this.daList.slice(0, i).reduce((sum, da) => sum += -da.split(' ')[0], 0) // '-' для порядка ПО часовой стрелке
          : 0
      })
    }
  },
  mounted() {
    setTimeout(() => {
      // Если общая сумма == 0, то рисуем график с равными отрезками
      this.drawChart(this.total ? this.percents : [25, 25, 25, 25])
    }, 500)
  },
  filters: {
    percents(val) {
      return Math.round(val) + '%'
    },
    rubles(val) {
      return val + '₽'
    }
  },
  components: {
    icon: require('../UI/icon')
  }
}
</script>
<style lang="sass" scoped>
@import '../../styles_config.sass'

.widget_wrap
  display: flex
  align-items: center
  padding-top: 5px
  position: relative

  & .donut
    width: 270px
    height: 270px
    transform: rotate(-90deg)

    & g
      stroke-width: 40px
      fill: none

      & circle
        cx: 135px
        cy: 135px
        r: 80px
        transition: all .5s ease

  & table
    padding-top: 10px

    & tr

      &:nth-child(odd) td:first-child
        padding: 0 15px 10px 0 

      &:nth-child(even)
        color: $hard
      
        & td
          font-size: .9em
          padding-bottom: 15px

</style>
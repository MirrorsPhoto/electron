<template>
  <div class="widget_wrap">

    <div class="chart_wrap">
      <h3 v-text="total"></h3>
      <svg class="donut">
        <g>
          <circle
            ref="circle"
            v-for="(item, i) in sortedItems" :key="i"
            :stroke="colors[i]"
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
          <td v-text="item.count + ' шт'"></td>
          <td style="font-size: .5em">⚫ &nbsp;</td>
          <td v-text="percents[i] + '%'"></td>
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
      }
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
    sortedItems() {
      return [...this.items].sort((a, b) => b.count - a.count)
    },
    // Общее кол-во
    total() {
      return this.items.reduce((sum, { count }) => sum += count, 0)
    },
    // Процентное соотношение всех кол-в к общему
    percents() {
      return this.items.map(({ count }) => Math.round(count * 100 / this.total) || 0)
    }
  },
  watch: {
    percents(percents) {
      this.drawChart(percents)
    }
  },
  methods: {
    drawChart(percents) {

      // Массив значений stroke-dasharray
      const daList = percents.map(p => {
        const
          circleLength = 502.65,           // Длина окружности = 2PIr
          length = p * circleLength / 100, // Длина отрезка
          offset = circleLength - length   // Оставшееся место
        return { length, offset }
      })

      // Массив значений stroke-dashoffset
      // Отступ отрезка от начала координат = сумма длин отрезка и его предыдущих элементов
      // Отступ отрицательный, чтобы порядок элементов шел ПО часовой стрелке
      const doList = daList.map((segment, i) => {
        return i !== 0
          ? daList.slice(0, i).reduce((sum, { length }) => sum += -length, 0)
          : 0
      })

      this.$refs.circle.forEach((circle, i) => {
        circle.style.strokeDasharray  = daList[i].length + ' ' + daList[i].offset
        circle.style.strokeDashoffset = doList[i]
      })
    }
  },
  mounted() {
    setTimeout(() => {
      // Если общее кол-во == 0, то рисуем график с равными отрезками
      this.drawChart(this.title ? this.percents : [25, 25, 25, 25])
    }, 200)
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

  & .chart_wrap
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
          stroke-dasharray: 0 502.65
          stroke-dashoffset: 0
          transition: all .5s ease
    
  & h3
    width: 50px
    height: 50px
    text-align: center
    line-height: 50px
    position: absolute
    top: 0
    bottom: 0
    right: 0
    left: 0
    margin: auto

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
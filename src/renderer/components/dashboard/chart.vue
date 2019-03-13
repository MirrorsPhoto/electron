<template>
  <div class="widget_wrap">

    <div class="chart_wrap">

      <transition name="tooltip">
        <p v-show="showTooltip">
          {{ dataToShow | currency }}
        </p>
      </transition>

      <svg class="donut">
        <g>
          <circle
            ref="circle"
            v-for="(circle, i) in circles" :key="i + 1"
            :r="radius"
            :stroke="colors[i]"
            :stroke-dasharray="circle.dashArray"
            :stroke-dashoffset="circle.dashOffset"
            @mouseover="hoverOnChart(i, true)"
            @mouseout="hoverOnChart(i, false)"
          ></circle>
        </g>
      </svg>
    </div>

    <div class="stats_names_wrap">
      <div
        v-for="(name, i) in stats.names" :key="i"
        @mouseover="hoverOnChart(i, true)"
        @mouseout="hoverOnChart(i, false)"
      >
        <icon
          :name="icons[name]"
          :style="{ fill: colors[i] }"
          size="30"
        ></icon>
        <span>{{ name }}</span>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: ['#e74c3c', '#f1c40f', '#2ecc71', '#8860d0', '#3498db'],
      icons: {
        'Фотография': 'photo',
        'Продажа'   : 'bag',
        'Ксерокопия': 'copy',
        'Услуга'    : 'service',
        'Ламинация' : 'lamination'
      },
      radius: 80,
      dataToShow: '', // Данные внутри графика
      showTooltip: false
    }
  },
  computed: {
    // Данные для отображения
    stats() {
      const stats = Object.values(this.$store.state.cash.today)
      return {
        names: stats.map(({ name }) => name),
        summs: stats.map(({ val }) => val)
      }
    },
    // Процентное соотношение всех сумм к общей
    percents() {
      const { summs } = this.stats
      const total = summs.reduce((res, s) => res += s, 0)
      return total
        ? summs.map(s => (s * 100 / total) || 0)
        : [20, 20, 20, 20, 20]  // Если общая сумма == 0, то рисуем график с одинаковыми отрезками
    },
    // Размеры и отступы отрезков графика
    circles() {
      const circleLength = 2 * Math.PI * this.radius  // Длина круга
      let summOfLengths = 0

      return this.percents.map(p => {
        const length = p * circleLength / 100  // Длина отрезка
        const offset = circleLength - length   // Оставшееся место
        const styles = {
          dashArray : length + ' ' + offset,
          dashOffset: -summOfLengths  // Сдвиг по кругу = сумма длин предыдущих элементов
        }
        summOfLengths += length
        return styles
      })
    }
  },
  methods: {
    // При наведении на отрезок или его имя - подсвечиваем его и выводим данные в центре
    hoverOnChart(i, isHover) {
      const summ = this.stats.summs[i]
      const percent = Math.round(this.percents[i])
      this.dataToShow  = `${percent}% • ${summ}`
      this.showTooltip = isHover

      for (let index in this.$refs.circle) {
        this.$refs.circle[index].style.opacity = isHover ? index == i ? 1 : 0.5 : 1
      }
    }
  },
  components: {
    icon: require('../UI/icon')
  }
}
</script>
<style lang="sass" scoped>

.tooltip
  &-enter-active, &-leave-active
    transition: all .2s ease

  &-enter, &-leave-to
    opacity: 0
    transform: translateY(5px)

.widget_wrap
  display: flex
  align-items: center
  padding-top: 5px
  position: relative

  & .chart_wrap
    position: relative

    & p
      height: 30px
      margin: auto
      font-size: 1.1em
      text-align: center
      line-height: 30px
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      transition: all .3s ease

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
          transition: all .5s ease

  & .stats_names_wrap
    padding-top: 10px

    & div + div
      padding-top: 5px

    & div, span
      vertical-align: top
      line-height: 30px

      & .icon
        margin-right: 15px


</style>

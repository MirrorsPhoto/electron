<template>
  <div class="widget_wrap">

    <div class="chart_wrap">

      <transition name="tooltip">
        <p v-show="showTooltip" v-text="dataToShow"></p>
      </transition>

      <svg class="donut">
        <transition-group tag="g" name="circle" appear>
          <circle
            ref="circle"
            v-for="(circle, i) in circles" :key="i"
            :r="radius"
            :stroke="colors[i]"
            :stroke-dasharray="circle.dashArray"
            :stroke-dashoffset="circle.dashOffset"
            @mouseover="hoverOnChart(i, true)"
            @mouseout="hoverOnChart(i, false)"
          ></circle>
        </transition-group>
      </svg>
    </div>

    <div class="stats_names_wrap">
      <div
        v-for="(name, i) in stats.names" :key="i"
        @mouseover="hoverOnChart(i, true)"
        @mouseout="hoverOnChart(i, false)"
      >
        <icon :name="icons[name]" :style="{ fill: colors[i] }" size="30"></icon>
        <span>{{ name }}</span>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: ['#e74c3c', '#f1c40f', '#2ecc71', '#3498db'],
      icons: {
        'Фотография': 'photo',
        'Продажа'   : 'bag',
        'Ксерокопия': 'copy',
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
      const stats = this.$store.state.stats
      return {
        names: Object.keys(stats),  // Позиции
        summs: Object.values(stats) // Суммы
      }
    },
    // Процентное соотношение всех сумм к общей
    percents() {
      const { summs } = this.stats
      const total = summs.reduce((res, s) => res += s, 0)
      return total
        ? summs.map(s => (s * 100 / total) || 0)
        : [25, 25, 25, 25]  // Если общая сумма == 0, то рисуем график с одинаковыми отрезками
    },
    // Размеры и отступы отрезков графика
    circles() {
      const circleLength = 2 * Math.PI * this.radius  // Длина круга
      let summOfLengths = 0

      return this.percents.map((p, i) => {
        const length = p * circleLength / 100  // Длина отрезка
        const offset = circleLength - length   // Оставшееся место
        summOfLengths += length
        return {
          dashArray : length + ' ' + offset,
          dashOffset:  -(summOfLengths - length)  // Сдвиг по кругу = сумма длин предыдущих элементов
        }
      })
    }
  },
  methods: {
    // При наведении на отрезок или его имя - подсвечиваем его и выводим данные в центре
    hoverOnChart(i, isHover) {
      const summ = this.stats.summs[i]
      const percent = Math.round(this.percents[i])
      const color = this.colors[i]
      this.$refs.circle[i].style.stroke = isHover ? this.switchColor(color, -25) : color
      this.dataToShow  = `${percent}% • ${summ}₽`
      this.showTooltip = isHover
    },
    // Затемнение/осветление цвета
    switchColor(color, amount) {
      const num = parseInt(color.slice(1), 16)
      const [r, g, b] = [
        (num >> 16) + amount,
        (num & 0x0000FF) + amount,
        ((num >> 8) & 0x00FF) + amount
      ].map(c => c > 255 ? 255 : c < 0 ? 0 : c)
      return '#' + (g | (b << 8) | (r << 16)).toString(16)
    }
  },
  components: {
    icon: require('../UI/icon')
  }
}
</script>
<style lang="sass" scoped>
@import '../../styles_config.sass'

.circle-enter
  stroke-dasharray: 0 500px
  stroke-dashoffset: 0

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
      background: rgba(0, 0, 0, .7)
      width: 80px
      height: 30px
      border-radius: 5px
      margin: auto
      color: #fff
      font-size: .9em
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
          transition: all .7s ease

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

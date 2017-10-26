<template>
  <div class="widget_wrap">

    <div class="chart_wrap">

      <transition name="tooltip">
        <p v-show="showTooltip" v-text="circleData"></p>
      </transition>

      <svg class="donut">
        <g>
          <circle
            ref="circle"
            v-for="(da, i) in daList" :key="i"
            :stroke="colors[i]"
            :stroke-dasharray="da"
            :stroke-dashoffset="doList[i]"
            @mouseover="hoverOnChart(i, true)"
            @mouseout="hoverOnChart(i, false)"
          ></circle>
        </g>
      </svg>
    </div>

    <div class="items_wrap">
      <div
        v-for="(item, i) in items" :key="i"
        @mouseover="hoverOnChart(i, true)"
        @mouseout="hoverOnChart(i, false)"
      >
        <icon :name="icons[item.name]" :style="{ fill: colors[i] }" size="30"></icon>
        <span>{{ item.name }}</span>
      </div>
    </div>

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
      doList: [0, 0, 0, 0],

      circleData: '',
      showTooltip: false
    }
  },
  computed: {
    items() {
      const
        stats  = this.$store.state.stats,
        names  = Object.keys(stats),
        summs = Object.values(stats)

      return names.map((name, i) => {
        return { name, summ: summs[i] }
      })
    },
    // Общая сумма
    total() {
      return this.items.reduce((sum, { summ }) => sum += summ, 0)
    },
    // Процентное соотношение всех сумм к общей
    percents() {
      return this.items.map(({ summ }) => (summ * 100 / this.total) || 0)
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
    },
    hoverOnChart(i, isHover) {
      const
        { summ } = this.items[i],
        percent = Math.round(this.percents[i]),
        circle = this.$refs.circle[i],
        color = isHover ? this.switchColor(this.colors[i], -25) : this.colors[i]

      this.circleData = `${summ}₽ | ${percent}%`
      circle.style.stroke = color
      this.showTooltip = isHover
    },
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
          r: 80px
          transition: all .5s ease

  & .items_wrap
    padding-top: 10px

    & div + div
      padding-top: 5px

    & div, span
      vertical-align: top
      line-height: 30px

      & .icon
        margin-right: 15px


</style>
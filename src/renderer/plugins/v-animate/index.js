/**
 *  Директива для присвоения анимаций элементам.
 *  Список анимаций и примеры: https://cssanimation.io/
 *
 *  Директива принимает либо строку с названием класса анимации либо объект со следующими свойствами:
 *  name {String} - Название анимации появления (класс), по умолчанию - fadeIn
 *  dur {Number} - Длительность в мс, по умолчанию - 500
 *  del {Number} - Задержка в мс, по умолчанию - 0
 *  leave {Object} - Опции для анимации исчезновения, такие же как и у анимации появления. Класс по умолчанию - fadeOut
 *
 *  Примеры использования:
 *
 *  <my-component
 *    v-animate="'fadeIn'"
 *  ></my-component>
 *
 *  <my-component
 *    v-animate="{
 *      name: 'fadeIn', dur: 1500, del: 500,
 *      leave: { name: 'zoomOut', dur: 800 }
*     }"
 *  ></my-component>
 */
export const styles = import('./cssanimation.css')
export const VAnimate = {
  install(Vue) {

    const validateValue = value => {
      return typeof value === 'object' ? value : { name: value }
    }

    // Применяем переданные класс и стили к элементу
    const addAnimation = ({ el, value, oldValue, type }) => {

      const {
        name = type !== 'unbind' ? 'fadeIn' : 'fadeOut',
        dur = 500,
        del = 0
      } = validateValue(value)
      const { name: prevName } = validateValue(oldValue)
      const props = {
        'animation-duration': `${dur}ms`,
        'animation-delay': `${del}ms`,
        'animation-fill-mode': 'both'
      }

      for (const prop in props) {
        const val = props[prop]
        if (el.style[prop] !== val) {
          ['-webkit-', '-moz-', '-ms-', '-o-', ''].forEach(prefix => {
            el.style[prefix + prop] = val
          })
        }
      }

      if (oldValue && el.classList.contains(prevName)) {
        el.classList.remove(prevName)
      }

      el.classList.add(name)
    }

    Vue.directive('animate', {
      bind(el, { value }) {
        value && addAnimation({ el, value })
      },
      update(el, { value, oldValue }) {
        value && addAnimation({ el, value, oldValue })
      },
      unbind(el, { value }) {
        value && addAnimation({ el, value: value.leave, type: 'unbind' })
      }
    })
  }
}

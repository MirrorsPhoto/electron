/**
 *  Директива для присвоения анимаций элементам
 *  Список анимаций и примеры: https://daneden.github.io/animate.css/
 *
 *  Директива принимает либо строку с названием класса анимации либо объект со следующими свойствами:
 *  name {String} - Название анимации (класс)
 *  dur {Number} - Длительность в мс, по умолчанию - 1000
 *  del {Number} - Задержка в мс, по умолчанию - 0
 *
 *  Примеры использования:
 *
 *  <my-component
 *    v-animate="'fadeIn'"
 *  ></my-component>
 *
 *  <my-component
 *    v-animate="{ name: 'fadeIn', dur: 1500, delay: 500 }"
 *  ></my-component>
 */

export default {
  install(Vue) {

    // Подключаем animate.css
    const cdnLink = Object.assign(document.createElement('link'), {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'
    })
    document.head.appendChild(cdnLink)

    const validateValue = value => {
      return typeof value === 'string'
        ? { name: value }
        : value || {}
    }

    // Применяем переданные класс и стили к элементу
    const addAnimation = (el, value, oldValue) => {
      const { name, dur, del } = validateValue(value)
      const { name: prevName } = validateValue(oldValue)

      if (name) {
        const props = {
          'animation-duration': `${ dur || 1000 }ms`,
          'animation-delay': `${ del || 0 }ms`,
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
    }

    Vue.directive('animate', {
      bind(el, { value }) {
        value && addAnimation(el, value)
      },
      update(el, { value, oldValue }) {
        value && addAnimation(el, value, oldValue)
      },
      unbind(el, { value }) {
        value && addAnimation(el, value.leave)
      }
    })
  }
}

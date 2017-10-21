import { create } from 'axios'

const defaultOptions = {
  url: 'favicon.ico',
  delay: 2
}

export default options => {

  const { url, delay } = Object.assign(defaultOptions, options)
  const { get } = create({ timeout: 1000 })

  const online = {
    timer: null,
    state: null,
    listeners: [],
    check(cb) {
      get(url)
        .then(() => true, err => Boolean(err.response))
        .then(status => {
          if (cb && typeof cb === 'function') cb(status)

          if (status !== online.state) {
            online.state = status
            online.listeners.forEach(fn => fn(status))
          }
        })
    },
    onUpdateStatus(fn) {
      if (fn && typeof fn === 'function') online.listeners.push(fn)
    },
    removeListener(param) {
      if (param === 'all') {
        online.listeners = []
      } else {
        const index = online.listeners.indexOf(param)
        if (index !== -1) online.listeners.splice(index, 1)
      }
    },
    init(delay) {
      if (!delay) throw new Error('Init method need argument "delay"')
      online.timer = setInterval(online.check, delay * 1000)
    },
    destroy() {
      clearInterval(online.timer)
    }
  }

  if (delay) {
    online.check()
    online.init(delay)
  }
  return online
}
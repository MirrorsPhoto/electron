import 'offline-js'

Offline.options = {

  // Проверка соединения сразу после загрузки страницы
  checkOnLoad: true,

  // Интервал повторных проверок в секундах
  reconnect: {
    initialDelay: 0,
    delay: 3
  },

  // Кэширование запросов
  requests: false,

  checks: { 
    xhr: {
      url: 'http://api.jonkofee.ru'
    }
  }

}
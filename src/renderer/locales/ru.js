module.exports = {
  auth: {
    login: {
      name: 'Логин',
      required: 'Введите логин'
    },
    password: {
      name: 'Пароль',
      required: 'Введите пароль'
    },
    invalid_login_or_pass: 'Неверный логин или пароль',
    empty_login_or_pass: 'Заполните все поля формы'
  },
  user: {
    roles: {
      admin: 'Администратор',
      staff: 'Оператор'
    }
  },
  menu: {
    dashboard: {
      name: 'Главный экран',
      check: {
        table: {
          head: {
            title: 'Наименование',
            count: 'Кол-во',
            price: 'Цена'
          },
          total: 'Итого: %total%₽'
        },
        send_button: 'Оплачено'
      },
      counts: {
        no_connection: 'Нет соединения...',
        cash_today: 'касса сегодня'
      },
      widget_photo: {
        size_field_label: 'Размер',
        count_field_label: 'Кол-во',
        photoshop_connection: {
          yes: 'Подключено к Photoshop',
          no: 'Нет соединения с Photoshop'
        }
      },
      widget_good: {
        field_label: 'Код или поиск',
        errors: {
          empty_field: 'Введите название или код товара',
          invalid_length: 'Код должен состоять из 13 цифр',
          not_found: 'Товар не найден...',
          good_expired: 'Товар закончился...'
        }
      },
      widget_lamin: {
        field_label: 'Размер'
      },
      widget_copy: {
        field_label: 'Размер'
      }
    },
    storehouse: {
      name: 'Товары'
    },
    statistic: {
      name: 'Статистика'
    },
    settings: {
      name: 'Настройки'
    },
    logout_button: 'Выйти'
  },
  units: {
    count: 'шт.',
    week: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    clients: ['клиент', 'клиента', 'клиентов']
  },
  ui: {
    select_not_found: 'Не найдено...',
    update_modal: {
      title: 'Новая версия приложения!',
      confirm_button: 'Загрузить и обновить',
      cancel_button: 'Позже',
      version: 'Версия %version%'
    }
  },
  services: {
    photo: 'Фотография',
    good: 'Продажа',
    copy: 'Ксерокопия',
    lamin: 'Ламинация'
  }
}

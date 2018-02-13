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
    dashboard: 'Главный экран',
    storehouse: 'Товары',
    statistic: 'Статистика',
    settings: 'Настройки',
    logout: 'Выйти'
  }
}

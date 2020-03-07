Клиентская сторона приложения построена на основе компонентной модели.
Фреймворк - [Vue.js](https://ru.vuejs.org) v2.2.6.  

# Начало работы

``` bash
# Установка зависимостей
yarn

# Сборка для разработки с hot-reload
yarn dev

# Сборка для продакшена
yarn build

# Релиз новой версии
yarn release
```

#Релиз

1. Сделать сборку
2. Деплойнуть в AppConnect
   - [Transporter](https://apps.apple.com/ru/app/transporter/id1450874784). Тут всё просто. Авторизируемся, выбираем `pkg`! из папки `./dist/mas/` и деплоим
   - [xcrun altool](https://help.apple.com/app-store-connect/#/devb1c185036). Необходимо найти `Issuer ID` и `KEY ID` на [этой странице](https://appstoreconnect.apple.com/access/api). Приватный ключ лежит в `./build/apple_connect_auth_key.p8`. По [этому гайду](https://help.apple.com/asc/appsaltool) деплоим

// Выключаем дебаг вебпака
process.noDeprecation = true

const HtmlWebpackPlugin = require('html-webpack-plugin')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const MinifyPlugin = require("babili-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development'

module.exports = {

  // Среда выполнения кода
  target: 'electron',

  // Точки входа
  entry: {
    main: __dirname + '/src/main/main.js',
    renderer: __dirname + '/src/renderer/main.js'
  },

  // Конечные файлы
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },

  module: {
    loaders: [
      { // Компиляция .vue файлов
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1'
          }
        }
      },
      { // Транпиляция ES6 в main.js процессе
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /(node_modules|src\/renderer)/,
         options: {
           cacheDirectory: true
         }
      },
      { // Копирование картинок
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: 'imgs/[name].[ext]?[hash]'
        }
      },
      { // Копирование шрифтов
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },

  resolve: {
    alias: {
      // Алиас для компиляции шаблонов vue
      vue: 'vue/dist/vue.js'
    },
    // Файлы для импорта без указания расширения, пример: import 'file'
    extensions: ['.js', '.vue', '.json', '.css']
  },

  plugins: [

    // Автоподключение бандла
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      chunks: ['renderer']
    }),

    // Создание спрайта из папки 'src/assets/icons/'
    new SVGSpritemapPlugin({
      src: 'src/renderer/assets/icons/*.svg',
      prefix: '',
      filename: 'imgs/iconsSprite.svg',
      svgo: {
        plugins: [{
          removeTitle: true,
          removeDimensions: true
        }]
      }
    }),

    isDev
      // Запускаем электрон
      ? new WebpackShellPlugin({ onBuildEnd: ['cross-env NODE_ENV=development electron .'] })
      : new MinifyPlugin({}, { comments: false })
  ],

  // Выводим в консоль только ошибки
  stats: 'errors-only',

  // Пересборка при изменении файлов в режиме разработки
  watch: isDev
}

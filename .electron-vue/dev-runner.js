'use strict'

const chalk = require('chalk')
const electron = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')

const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')

let electronProcess = null
let manualRestart = false
let hotMiddleware

function startRenderer() {
  return new Promise(resolve => {
    rendererConfig.entry.renderer = [path.join(__dirname, 'dev-client')].concat(rendererConfig.entry.renderer)

    const compiler = webpack(rendererConfig)
    hotMiddleware = webpackHotMiddleware(compiler, { 
      log: false, 
      heartbeat: 2500 
    })

    compiler.plugin('compilation', compilation => {
      compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({ action: 'reload' })
        cb()
      })
    })

    const server = new WebpackDevServer(
      compiler,
      {
        contentBase: path.join(__dirname, '../'),
        quiet: true,
        setup (app, ctx) {
          app.use(hotMiddleware)
          ctx.middleware.waitUntilValid(resolve)
        }
      }
    )

    server.listen(9080)
  })
}

function startMain() {
  return new Promise(resolve => {
    mainConfig.entry.main = [path.join(__dirname, '../electron/main.dev.js')].concat(mainConfig.entry.main)
    const compiler = webpack(mainConfig)

    compiler.plugin('watch-run', (compilation, done) => {
      hotMiddleware.publish({ action: 'compiling' })
      done()
    })

    compiler.watch({}, err => {
      if (err) {
        console.log(err)
        return
      }

      if (electronProcess && electronProcess.kill) {
        manualRestart = true
        process.kill(electronProcess.pid)
        electronProcess = null
        startElectron()

        setTimeout(() => manualRestart = false, 5000)
      }

      resolve()
    })
  })
}

function startElectron() {
  electronProcess = spawn(electron, ['--inspect=5858', path.join(__dirname, '../dist/electron/main.js')])

  electronProcess.stdout.on('data', data => electronLog(data, 'blue'))
  electronProcess.stderr.on('data', data => electronLog(data, 'red'))

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit()
  })
}

function electronLog(data, color) {
  const log = data
    .toString()
    .split(/\r?\n/)
    .reduce((res, line) => res += `\n  ${line}`, '')

  if (/[0-9A-z]+/.test(log)) {
    const
      wrapStart = chalk[color].bold('┏ Electron Log ---------------'),
      wrapEnd   = chalk[color].bold('┗ ----------------------------')

    console.log(`\n${wrapStart}\n${log}\n${wrapEnd}\n`)
  }
}

function init() {
  Promise
    .all([startRenderer(), startMain()])
    .then(startElectron)
    .catch(err => console.error(err))
}

init()
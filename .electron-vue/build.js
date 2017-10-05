'use strict'

process.env.NODE_ENV = 'production'

const chalk = require('chalk')
const del = require('del')
const { spawn } = require('child_process')
const webpack = require('webpack')
const Multispinner = require('multispinner')


const mainConfig = require('./webpack.main.config')
const rendererConfig = require('./webpack.renderer.config')
const webConfig = require('./webpack.web.config')

const doneLog = chalk.bgGreen.white(' DONE ') + ' '
const errorLog = chalk.bgRed.white(' ERROR ') + ' '
const okayLog = chalk.bgBlue.white(' OKAY ') + ' '
const isCI = process.env.CI || false

if (process.env.BUILD_TARGET === 'clean') clean()
else if (process.env.BUILD_TARGET === 'web') web()
else build()

function clean() {
  del.sync('build/*')
  console.log(`\n${doneLog}\n`)
  process.exit()
}

function web() {
  del.sync('dist/web/*')
  webpack(webConfig, (err, stats) => {
    const error = err || (stats.hasErrors() ? statsToText(stats) : false)    
    if (error) console.log(error)
    process.exit()
  })
}

function build() {
  del.sync('dist/electron/*')
  const tasks = [
    { name: 'main', config: mainConfig },
    { name: 'renderer', config: rendererConfig }
  ]
  const m = new Multispinner(
    tasks.map(({ name }) => name),
    { preText: 'Building', postText: 'process' }
  ).on('success', () => {
    console.log(`\n${okayLog} And now start ${chalk.yellow('electron-builder')}\n`)
    process.exit()
  })

  tasks.forEach(({ name, config }) => {
    webpack(config, (err, stats) => {
      const error = err || (stats.hasErrors() ? statsToText(stats) : false)
      if (error) {
        m.error(name)
        console.log(`\n  ${errorLog}failed to build ${name} process`)
        console.error(`\n${error}\n`)
        process.exit(1)
      } else m.success(name)
    })
  })
}

function statsToText(stats) {
  return stats
    .toString({ chunks: false, colors: true})
    .split(/\r?\n/)
    .reduce((res, line) => res += `    ${line}\n`, '')
}
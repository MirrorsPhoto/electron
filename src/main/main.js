import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import socket from './plugins/socket'

const isDev = process.env.NODE_ENV === 'development'
const appPath = `${app.getAppPath()}/dist`

let mainWindow = null
let isReadyToShow = false

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    width: 0,
    height: 0,
    frame: false,
    devTools: isDev,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: false,
    show: false
  })

  mainWindow.once('ready-to-show', () => {
    isReadyToShow = true

    mainWindow.show()
  })

  mainWindow.loadURL(`file://${appPath}/index.html`)
  mainWindow.on('closed', app.quit)

  ipcMain.on('setWindowSize', (e, data) => {
    const { width, height } = data
    
    mainWindow.setSize(width, height)
    mainWindow.center()
  })

  Menu.setApplicationMenu(Menu.buildFromTemplate(
    [
      {
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      },
      {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            { role: "selectall" }
        ]
      }
    ]
  ))

  if (isDev) {
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
    const { globalShortcut } = require('electron')
    await installExtension(VUEJS_DEVTOOLS)

    // Открытие devtools при нажатии CMD + D
    globalShortcut.register('Command+D', () => {
      mainWindow.webContents.openDevTools()
    })

    // При пересборке файлов обновлям страницу
    require('fs').watch(appPath, () => mainWindow.webContents.reload())
  }

  // Подключение по веб-сокету к Photoshop
  socket(mainWindow)
})

app.on('activate', () => {
  if (isReadyToShow) {
    mainWindow.show()
  }
})
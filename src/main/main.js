import { app, BrowserWindow, Menu } from 'electron'
import autoUpdater from './plugins/autoUpdater'
import socket from './plugins/socket'

const isDev = process.env.NODE_ENV === 'development'
const appPath = `${app.getAppPath()}/dist`

app.on('ready', async () => {
  let updater

  let mainWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    frame: false,
    center: true,
    devTools: isDev
  })

  mainWindow.maximize()
  mainWindow.loadURL(isDev ? 'http://localhost:1111' : `file://${appPath}/index.html`)
  mainWindow.on('closed', app.quit)

  Menu.setApplicationMenu(Menu.buildFromTemplate(
    [{
      label: app.getName(),
      submenu: [{ role: 'about' }, { type: 'separator' },
        {
          label: 'Проверить наличие обновлений',
          role: 'update',
          click: () => !isDev && updater.checkForUpdates()
        },
        { type: 'separator' }, { role: 'quit' }]
    }]
  ))

  if (isDev) {
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
    await installExtension(VUEJS_DEVTOOLS)
    mainWindow.webContents.openDevTools()
  } else {
    updater = autoUpdater(mainWindow)
    updater.checkForUpdates()
  }

  // Подключение по веб-сокету к Photoshop
  socket(mainWindow)
})

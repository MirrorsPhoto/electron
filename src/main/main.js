import { app, BrowserWindow, Menu } from 'electron'
import socket from './plugins/socket'

const isDev = process.env.NODE_ENV === 'development'
const appPath = `${app.getAppPath()}/dist`

app.on('ready', async () => {
  let mainWindow = new BrowserWindow({
    minWidth: 1280,
    minHeight: 720,
    frame: false,
    center: true,
    devTools: isDev,
    nodeIntegration: false
  })

  mainWindow.maximize()
  mainWindow.loadURL(`file://${appPath}/index.html`)
  mainWindow.on('closed', app.quit)

  Menu.setApplicationMenu(Menu.buildFromTemplate(
    [
      {
        label: app.getName(),
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }
    ]
  ))

  if (isDev) {
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
    await installExtension(VUEJS_DEVTOOLS)
    mainWindow.webContents.openDevTools()

    // При пересборке файлов обновлям страницу
    require('fs').watch(appPath, () => mainWindow.webContents.reload())
  }

  // Подключение по веб-сокету к Photoshop
  socket(mainWindow)
})

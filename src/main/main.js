import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import socket from './plugins/socket'

const isDev = process.env.NODE_ENV === 'development'
const appPath = `${app.getAppPath()}/dist`

app.on('ready', async () => {
  let width = 1280
  let height = 720

  let mainWindow = new BrowserWindow({
    width: width,
    height: height,
    frame: false,
    center: true,
    devTools: isDev,
    nodeIntegration: false,
    resizable: false
  })

  mainWindow.loadURL(`file://${appPath}/index.html`)
  mainWindow.on('closed', app.quit)

  ipcMain.on('setWindowSize', (e, data) => {
    const { width, height } = data
    
    mainWindow.setSize(width, height)
  })

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

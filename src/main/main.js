import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import socket from './plugins/socket'

const isDev = process.env.NODE_ENV === 'development'
const appPath = `${app.getAppPath()}/dist`

app.on('ready', async () => {
  let mainWindow = new BrowserWindow({
    width: 0,
    height: 0,
    frame: false,
    devTools: isDev,
    nodeIntegration: false,
    resizable: false,
    show: false
  })

  mainWindow.once('ready-to-show', () => {
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

import { app, BrowserWindow, Menu } from 'electron'
import path from 'path'
import url from 'url'
import autoUpdater from './plugins/autoUpdater';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}


const template = [
    {
        label: app.getName(),
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {
                role: 'update',
                label: 'Проверить наличие обновлений',
                click () {
                    if (process.env.NODE_ENV === 'production') updater.checkForUpdates()
                }
            },
            {type: 'separator'},
            {role: 'quit'}
        ]
    },
];

let mainWindow
let updater;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : url.format({
        pathname: path.resolve(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true
    })

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
      width: 900,
      height: 600,
      frame: false
  })

    mainWindow.maximize()

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') {
        updater = autoUpdater(mainWindow);
        updater.checkForUpdates();
    }
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
});


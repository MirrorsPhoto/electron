import { app, BrowserWindow, dialog, Menu } from 'electron'
import path from 'path'
import url from 'url'
import htmlToText from 'html-to-text'

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
                    if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
                }
            },
            {type: 'separator'},
            {role: 'quit'}
        ]
    },
];

let mainWindow
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

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */


import { autoUpdater } from 'electron-updater'

autoUpdater.on('error', (error) => {
    dialog.showMessageBox({
        type: "error",
        title: "Ошибка 😞",
        message: JSON.stringify(error)
    })
});

autoUpdater.on('update-downloaded', (response) => {
    const version = response.version,
        releaseNote = response.releaseNotes !== 'No content.' ? response.releaseNotes : undefined;

    dialog.showMessageBox({
        type: "question",
        title: "Вышла новая обнова 🤗",
        message: "Доступна новая версия " + version,
        detail: htmlToText.fromString(releaseNote),
        buttons: [
            'Установить и перезагрузить',
            'Позже'
        ],
        defaultId: 0,
        cancelId: 1
    }, (buttonId) => {
        if (buttonId === 1) return;

        autoUpdater.quitAndInstall();
    });
});

app.on('ready', () => {
    autoUpdater.setFeedURL({
        provider: 'github',
        owner: 'MirrorsPhoto',
        repo: 'electron'
    });

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
});


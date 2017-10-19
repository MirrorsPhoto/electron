import { autoUpdater } from 'electron-updater'
import { ipcMain } from 'electron'

export default function (mainWindow) {
    autoUpdater.on('error', (error) => {
      mainWindow.webContents.send('au-error', error)
    });

    autoUpdater.on('update-available', (info) => {
      mainWindow.webContents.send('au-update-available', info)
    })

    autoUpdater.on('update-downloaded', () => {
        autoUpdater.quitAndInstall()
    });

    autoUpdater.on('download-progress', (progress) => {
        mainWindow.webContents.send('au-download-progress', progress)
    })

    ipcMain.on('au-download-confirm', () => {
      autoUpdater.downloadUpdate()
    })

    autoUpdater.setFeedURL({
        provider: 'github',
        owner: 'MirrorsPhoto',
        repo: 'electron'
    });

    autoUpdater.autoDownload = false;
    autoUpdater.fullChangelog = true;

    return autoUpdater;
}

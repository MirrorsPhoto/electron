import { autoUpdater } from 'electron-updater'
import { ipcMain } from 'electron'

export default mainWindow => {
  const wc = mainWindow.webContents

  autoUpdater.autoDownload = false
  autoUpdater.fullChangelog = true

  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'MirrorsPhoto',
    repo: 'electron'
  })

  ipcMain.on('au-download-confirm', autoUpdater.downloadUpdate)

  autoUpdater.on('error', err => wc.send('au-error', err))
  autoUpdater.on('update-downloaded', autoUpdater.quitAndInstall)
  autoUpdater.on('update-available', info => wc.send('au-update-available', info))
  autoUpdater.on('download-progress', progress => {
    wc.send('au-download-progress', progress)
    mainWindow.setProgressBar(progress.percent / 100)
  })

  return autoUpdater
}

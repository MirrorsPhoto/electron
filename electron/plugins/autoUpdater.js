import { autoUpdater } from 'electron-updater'
import htmlToText from 'html-to-text'
import { dialog } from 'electron'

export default function (mainWindow) {
    autoUpdater.on('error', (error) => {
        dialog.showMessageBox({
            type: "error",
            title: "Ошибка 😞",
            message: JSON.stringify(error)
        })
    });

    autoUpdater.on('update-available', (info) => {
        const version = info.version,
            releaseNote = info.releaseNotes !== 'No content.' ? info.releaseNotes : undefined;

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

            autoUpdater.downloadUpdate();
        });
    })

    autoUpdater.on('update-downloaded', () => {
        autoUpdater.quitAndInstall();
    });

    autoUpdater.on('download-progress', (progress) => {
        mainWindow.webContents.send('au-download-progress', progress)
    })

    autoUpdater.setFeedURL({
        provider: 'github',
        owner: 'MirrorsPhoto',
        repo: 'electron'
    });

    autoUpdater.autoDownload = false;

    return autoUpdater;
}
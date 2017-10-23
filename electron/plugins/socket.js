import { Server } from "ws"
import { Notification } from 'electron'

export default (mainWindow) => {
  var webSocketServer = new Server({
    port: 8081
  });

  webSocketServer.on('connection', (ws) => {
    new Notification({
      title: 'Photoshop',
      sound: 'Ping',
      body: 'Соединение устновлено'
    }).show();

    mainWindow.webContents.send('photoshop-connect', true)

    ws.on('message', (message) => {
      mainWindow.webContents.send('photoshop-message', JSON.parse(message))
    });

    ws.on('close', () => {
      mainWindow.webContents.send('photoshop-connect', false)
    });

  });
}

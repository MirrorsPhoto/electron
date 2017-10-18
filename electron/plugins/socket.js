import { Server } from "ws"

export default (mainWindow) => {
  var webSocketServer = new Server({
    port: 8081
  });

  webSocketServer.on('connection', (ws) => {
    mainWindow.webContents.send('photoshop-connect', true)

    ws.on('message', (message) => {
      mainWindow.webContents.send('photoshop-message', JSON.parse(message))
    });

    ws.on('close', () => {
      mainWindow.webContents.send('photoshop-connect', false)
    });

  });
}

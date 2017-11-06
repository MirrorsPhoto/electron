import { Server } from 'ws'
import { Notification } from 'electron'

export default mainWindow => {
  const webSocketServer = new Server({ port: 8081 })
  const wc = mainWindow.webContents

  webSocketServer.on('connection', ws => {
    new Notification({
      title: 'Photoshop',
      sound: 'Ping',
      body: 'Соединение установлено'
    }).show()

    wc.send('photoshop-connect', true)
    ws.on('message', message => wc.send('photoshop-message', JSON.parse(message)))
    ws.on('close', () => wc.send('photoshop-connect', false))
  })
}

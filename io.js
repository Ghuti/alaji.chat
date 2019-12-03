const escapeHtml = require('escape-html');

module.exports = function (io, mongoose) {

  console.log("db OK")
  
  function sendClients () {
    const clients = []
    const connected = io.sockets.clients().connected
    for (const index in connected){
      const client = connected[index]
      clients.push({
        avatar: escapeHtml(client.handshake.query.avatar),
        pseudo: escapeHtml(client.handshake.query.pseudo)
      })
      //console.log(clients)
    }
    io.emit('clients', clients)
  }

  //message dans tableau
  const messages = []

  //client co
  io.on('connection', function(socket) {

    const pseudo = escapeHtml(socket.handshake.query.pseudo).substr(0, 30)
    const avatar = escapeHtml(socket.handshake.query.avatar)

    /**new mongoose.models.users({
      pseudo: "Yannick",
      email: "test@alalji.fr"
    }).save(console.log)**/

    socket.handshake.query.pseudo = pseudo
    socket.handshake.query.avatar = avatar

    console.log(`${pseudo} s'est connecté !`)

    sendClients()
    socket.emit('messages', messages)

    socket.on('message', function(value) {
      const data = {
        avatar: avatar,
        pseudo: pseudo,
        message: escapeHtml(value).substr(0, 1000),
        date: Date.now()
      }
      messages.push(data)
      io.emit('message', data)
    })

  // client deco
    socket.on('disconnect', function () {
      console.log(`${pseudo} s'est déconnecté !`)
      sendClients()
    })
  })
}

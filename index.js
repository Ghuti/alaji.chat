const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const escapeHtml = require('escape-html');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chat', {useNewUrlParser: true});

require(__dirname + '/mongoose/collections')(mongoose);
require(__dirname + '/mongoose/models')(mongoose);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  require(__dirname + '/io')(io, mongoose);
})

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
})

http.listen(3000, function() {
  console.log('http://localhost:3000');
})

const express = require('express');
const { createServer } = require('http');
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
var data = "Hello guest!";
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('message', data);
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
    data = msg;
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
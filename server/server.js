const express = require('express');
const app = express();
const http = require('http').Server(app);

const io = require('socket.io')(http);

const PORT = 5000;

const users = [];
io.on('connection',socket => {
  console.log('User connected');
  socket.on('setUserName',data => {
    if (users.indexOf(data) === -1) {
      users.push(data);
      socket.emit('userSet',{username: data});
    } else {
      socket.emit('userExists', `${data}: this username is taken`);
    }
  })

  socket.on('msg',data => {
    console.log('message received!',data);
    io.sockets.emit('newMessage',data)
  });
  socket.on('disconnect',() => console.log('User disconnected'))
})


app.use(express.static('server/public'));

http.listen(PORT,() => console.log(`Listening on port ${PORT}...`));
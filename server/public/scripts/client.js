socket = io();
function setName() {
  socket.emit('setUserName', document.getElementById('name').value)
}
let user;
socket.on('userExists', data => console.log(data));

socket.on('userSet', data => {
  user = data.username
  console.log(user);
  document.body.innerHTML =
    '<input type="text" id="message">\
    <button type="button" name="button" onclick="sendMessage()">Send</button>\
    <div id="message-container"></div>';
});

socket.on('newMessage', data => {
  if (user) {
    document.getElementById('message-container').appendChild(createMessageDiv(data.user, data.message));
  }
})


function sendMessage() {
  var message = document.getElementById('message').value;
  console.table({message, user});
  if (message) {
    socket.emit('msg', { message: message, user: user });
  }
}

function createMessageDiv(user, message) {
  const div = document.createElement('div');
  const username = document.createElement('b');
  username.textContent = user + ": ";
  div.appendChild(username);
  div.appendChild(document.createTextNode(message));
  return div;
}
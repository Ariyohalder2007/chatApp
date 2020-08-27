const socket = io('http://localhost:8000');

const append = (msg, position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=msg;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}

const form = document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer = document.querySelector(".messageContainer");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
})

const name = prompt("Enter user name");
socket.emit('new-user-joined', name);
socket.on('user-joined',name=>{
    append(`${name} joined the chat`, 'right');

})
socket.on('recieve',data=>{
    append(`${data.name} : ${data.message}`, 'left');

})
socket.on('left',name=>{
    append(`left the chat : ${name}`, 'left');

})
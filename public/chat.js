function getHtml (data) {
  if (typeof data === 'string') {
    const div = document.createElement('div')
    div.innerHTML = data
    data = div
  }
  return data
}

function addMessage (data) {
  const value = `<div class="message">
    <div class="avatar">
      <img src="${data.avatar}" width="40px" alt="avatar ${data.pseudo}">

    </div>
    <div class="content">
      <div class="pseudo">
        <strong>${data.pseudo}</strong>
      </div>
      ${data.message}
    </div>
  </div>
  <hr>`
  document.getElementById('messages').append(getHtml(value))
}

function addUser (data) {
  document.getElementById('users').append(getHtml(data))
}

const urlParams = new URLSearchParams(window.location.search)
const pseudo = urlParams.get('pseudo')
const avatar = urlParams.get('avatar')

const socket = io({
  query: {
    pseudo: pseudo,
    avatar: avatar
  }
})

socket.on('messages', function(data){
  data.forEach(function (messages){
    addMessage(messages)
  })
  console.log(data)
})

socket.on('message', function(value){
  //addMessage(value.avatar + value.pseudo + ': ' + value.message) // old
  //addMessage(`${value.avatar} ${value.pseudo}: ${value.message}`)
  addMessage(value)
})

document.querySelector('[data-avatar]').setAttribute('src', avatar)
document.querySelector('[data-pseudo]').textContent = pseudo

document.getElementById('send').addEventListener('submit', function (e) {
  e.preventDefault()
  const value = this.querySelector('input').value
  if (value) {
    // Send message
    socket.emit('message', value)

    console.log(value)
    this.querySelector('input').value = null
  }
})

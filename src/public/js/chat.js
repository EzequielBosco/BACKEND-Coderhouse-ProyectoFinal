socket = io()

const chatBox = document.getElementById('chat-box')

const userColors = {}
let user

function generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
}

const chat = async (chatBox) => {
    const swal = await Swal.fire({
        title: "Inicio de sesión",
        input: "text",
        text: "Ingresa con tu nombre",
        confirmButtonText: "Entrar",
        inputValidator: value => {
            return !value && "Necesitas ingresar un nombre"
        },
        allowOutsideClick: false
    })
    
    user = swal.value

    socket.emit('auth', user)

    chatBox.addEventListener('keyup', e => {
        if(e.key === 'Enter') {
            if (chatBox.value.trim().length > 0) {
                const message = chatBox.value
                socket.emit('message', {user, message})
                chatBox.value = ''
            }
        }
    })

    if (!userColors[user]) {
        userColors[user] = generateRandomColor()
    }

    socket.on('userColors', (colors) => {
        Object.assign(userColors, colors)
        updateMessageLogs()
    })

    socket.on('messageLogs', data => {
        messageLogs = data
        updateMessageLogs()
    })

    function updateMessageLogs() {
        const log = document.getElementById('message-logs')
        let messages = ''
    
        messageLogs.forEach(message => {
          const user = message.user.charAt(0).toUpperCase() + message.user.slice(1)
          const userColor = userColors[message.user]
    
          messages += `<span style="color: ${userColor};">${user}</span>: ${message.message}<br>`
        })
    
        log.innerHTML = messages
    }

    socket.on('newUser', data => {
        Swal.fire({
            text: `${data} se conectó`,
            toast: true,
            position: 'top-right',
            timer: 3000,
            showConfirmButton:false,
            timerProgressBar: true
        })
    })
}

chat(chatBox)

const {Server} = require('socket.io')

const messages = []
const userColors = {}

function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16)
}

const realTimeServer = httpServer => {
    const io = new Server (httpServer)
    
    io.on('connection', socket => {
        console.log(`Se conecto ${socket.id}`)

        socket.on('auth', (user) => {
            if (!userColors[user]) {
              userColors[user] = getRandomColor()
            }

            io.emit('userColors', userColors)
            io.emit('messageLogs', messages)
            socket.broadcast.emit('newUser', user)
        })

        socket.on('message', data => {
            messages.push(data)

            io.emit('messageLogs', messages)        
        })
    })
}

module.exports = realTimeServer
const {Server} = require('socket.io')
const Message = require('./models/messages.model')

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

        socket.on('message', async data => {

            const newMessage = {
                user: data.user,
                message: data.message,
                date: new Date(),
            }

            try {
                await Message.create(newMessage)

                messages.push(data);
                io.emit('messageLogs', messages);
            } catch (error) {
                console.error('Error al guardar el mensaje en la base de datos:', error);
            }       
        })
    })
}

module.exports = realTimeServer
const mongoose = require('mongoose')

const messagesCollection = 'message'

const messageSchema = new mongoose.Schema({
    user: String,
    message: String,
    date: Date,
})

const Message = mongoose.model(messagesCollection, messageSchema)

module.exports = Message
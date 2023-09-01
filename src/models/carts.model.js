const mongoose = require('mongoose')

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    id: String,
    quantity: Number,
})

const Carts = mongoose.model(cartCollection, cartSchema)

module.exports = Carts
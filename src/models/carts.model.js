const mongoose = require('mongoose')

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            },
            quantity: {
                type : Number, 
                default : 1
            },
        }
    ]
})

const Carts = mongoose.model(cartCollection, cartSchema)

module.exports = Carts
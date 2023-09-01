const mongoose = require('mongoose')

const productCollection = 'product'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: Number,
    price: Number,
    stock: Number,
    category: String,
})

const Products = mongoose.model(productCollection, productSchema)

module.exports = Products
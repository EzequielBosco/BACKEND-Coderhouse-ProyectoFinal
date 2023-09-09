const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productCollection = 'product'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: Number,
    price: Number,
    stock: Number,
    category: String,
})

productSchema.plugin(mongoosePaginate)

const Products = mongoose.model(productCollection, productSchema)

module.exports = Products
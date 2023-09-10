const Products = require("../models/product.model")

class ProductsDao {
    async findAll() {
        return await Products.find().lean()
    }

    async insertOne(newProductInfo) {
        const newProduct = Products.create(newProductInfo)
        return newProduct._id
    }
}

module.exports = ProductsDao
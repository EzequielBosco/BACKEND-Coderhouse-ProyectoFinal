const Products = require("../models/product.model")

class ProductsDao {
    async findAll() {
        // uso lean() para ahorrar memoria y que sea mas eficiente
        return await Products.find().lean()
    }

    async findById(productId) {
        return await Products.findById(productId)
    }

    async insertOne(newProductInfo) {
        const newProduct = Products.create(newProductInfo)
        return newProduct._id
    }
}

module.exports = ProductsDao
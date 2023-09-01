const fs = require('fs')

class ProductsDao {
    constructor(filePath) {
        this.filePath = filePath
    }

    async findAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    try {
                        resolve(JSON.parse(data))
                    } catch (parseError) {
                        reject(parseError)
                    }
                }
            })
        })
    }

    async insertOne(newProductInfo) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err)
                    return
                }

                try {
                    const products = JSON.parse(data)
                    const newProduct = { ...newProductInfo, _id: generateProductId() }
                    products.push(newProduct)

                    fs.writeFile(this.filePath, JSON.stringify(products, null, 2), (err) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(newProduct._id)
                        }
                    })
                } catch (parseError) {
                    reject(parseError)
                }
            })
        })
    }
}

module.exports = ProductsDao
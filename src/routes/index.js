const productsController = require('../products/controller')
const cartsController = require('../carts/controller')

const router = app => {
    app.use('/products', productsController.router)
    app.use('/carts', cartsController)
}

module.exports = router
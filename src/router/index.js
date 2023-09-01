const productsController = require('../products/controller')
const cartsController = require('../carts/controller')
const usersController = require('../users/controller')

const router = app => {
    app.use('/products', productsController.router)
    app.use('/carts', cartsController)
    app.use ('/users', usersController)
}

module.exports = router